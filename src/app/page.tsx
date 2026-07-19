"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type PollChoice = {
  name: string;
  votes: number;
  percentage: number;
};

type Poll = {
  question: string;
  choices: PollChoice[];
  totalVotes: number;
};

type VoteUpdate = Omit<Poll, "question"> & { type: "vote-update" };

const BAR_COLORS = [
  "bg-emerald-500",
  "bg-sky-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-violet-500",
  "bg-orange-500",
  "bg-cyan-500",
  "bg-lime-500",
];

function isPollChoice(value: unknown): value is PollChoice {
  if (!value || typeof value !== "object") {
    return false;
  }

  const choice = value as Record<string, unknown>;
  return (
    typeof choice.name === "string" &&
    typeof choice.votes === "number" &&
    typeof choice.percentage === "number"
  );
}

function isVoteUpdate(value: unknown): value is VoteUpdate {
  if (!value || typeof value !== "object") {
    return false;
  }

  const update = value as Record<string, unknown>;
  return (
    update.type === "vote-update" &&
    typeof update.totalVotes === "number" &&
    Array.isArray(update.choices) &&
    update.choices.every(isPollChoice)
  );
}

export default function Home() {
  const [poll, setPoll] = useState<Poll | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPoll = useCallback(async () => {
    const response = await fetch("/api/poll");
    if (!response.ok) {
      throw new Error("Unable to load the poll.");
    }

    setPoll((await response.json()) as Poll);
  }, []);

  useEffect(() => {
    const initializePoll = async () => {
      try {
        await loadPoll();
        setHasVoted(window.localStorage.getItem("quick-poll-has-voted") === "true");
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Unable to load the poll.");
      } finally {
        setIsLoading(false);
      }
    };

    void initializePoll();
  }, [loadPoll]);

  useEffect(() => {
    let socket: WebSocket | undefined;
    let reconnectTimer: ReturnType<typeof setTimeout> | undefined;
    let isUnmounted = false;

    const connect = () => {
      const protocol = window.location.protocol === "https:" ? "wss" : "ws";
      socket = new WebSocket(`${protocol}://${window.location.host}`);

      socket.addEventListener("message", (event) => {
        if (typeof event.data !== "string") {
          return;
        }

        try {
          const update: unknown = JSON.parse(event.data);
          if (isVoteUpdate(update)) {
            setPoll((currentPoll) =>
              currentPoll
                ? { ...currentPoll, choices: update.choices, totalVotes: update.totalVotes }
                : currentPoll,
            );
          }
        } catch {
          // Ignore malformed messages; the API remains the authoritative source on refresh.
        }
      });

      socket.addEventListener("close", () => {
        if (!isUnmounted) {
          reconnectTimer = setTimeout(connect, 2000);
        }
      });
    };

    connect();

    return () => {
      isUnmounted = true;
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
      }
      socket?.close();
    };
  }, []);

  const sortedChoices = useMemo(
    () => [...(poll?.choices ?? [])].sort((left, right) => right.votes - left.votes),
    [poll],
  );

  const submitVote = async (choice: string) => {
    setIsVoting(true);
    setError(null);

    try {
      const response = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ choice }),
      });
      if (!response.ok) {
        throw new Error("Your vote could not be recorded. Please try again.");
      }

      window.localStorage.setItem("quick-poll-has-voted", "true");
      setHasVoted(true);
      await loadPoll();
    } catch (voteError) {
      setError(voteError instanceof Error ? voteError.message : "Your vote could not be recorded.");
    } finally {
      setIsVoting(false);
    }
  };

  if (isLoading) {
    return <main className="grid min-h-screen place-items-center bg-slate-50 p-6 text-slate-700">Loading poll…</main>;
  }

  if (!poll) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 p-6">
        <div className="max-w-md rounded-xl border border-rose-200 bg-white p-6 text-center shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">Poll unavailable</h1>
          <p className="mt-2 text-slate-600">{error ?? "Please refresh and try again."}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-12">
      <section className="mx-auto max-w-2xl rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Quick Poll</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{poll.question}</h1>

        {error && <p className="mt-5 rounded-lg bg-rose-50 p-3 text-sm font-medium text-rose-800" role="alert">{error}</p>}

        {!hasVoted ? (
          <div className="mt-8 space-y-3" aria-label="Lunch choices">
            {poll.choices.map((choice) => (
              <button
                className="flex min-h-14 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 text-left font-semibold text-slate-800 shadow-sm transition hover:border-emerald-500 hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 active:scale-[0.99] disabled:cursor-wait disabled:opacity-60"
                disabled={isVoting}
                key={choice.name}
                onClick={() => void submitVote(choice.name)}
              >
                <span>{choice.name}</span>
                <span aria-hidden="true" className="text-emerald-700">Vote →</span>
              </button>
            ))}
          </div>
        ) : (
          <section className="mt-8" aria-live="polite" aria-label="Live poll results">
            <div className="space-y-5">
              {sortedChoices.map((choice, index) => (
                <div key={choice.name}>
                  <div className="mb-2 flex items-baseline justify-between gap-4 text-sm">
                    <span className="font-semibold text-slate-800">{choice.name}</span>
                    <span className="shrink-0 tabular-nums text-slate-600">{choice.votes} · {choice.percentage.toFixed(1)}%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-label={`${choice.name}: ${choice.votes} votes, ${choice.percentage.toFixed(1)} percent`} aria-valuemax={100} aria-valuemin={0} aria-valuenow={choice.percentage}>
                    <div className={`h-full rounded-full transition-all duration-500 ease-out ${BAR_COLORS[index % BAR_COLORS.length]}`} style={{ width: `${choice.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 border-t border-slate-200 pt-5 text-sm font-semibold text-slate-700">{poll.totalVotes} total votes</p>
          </section>
        )}
      </section>
    </main>
  );
}
