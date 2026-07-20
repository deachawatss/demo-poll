"use client";

import { useEffect, useMemo, useState } from "react";

type PollChoice = {
  name: string;
  votes: number;
};

type Poll = {
  question: string;
  choices: PollChoice[];
};

type VoteSnapshot = {
  choice: string;
  count: number;
};

const VOTED_CHOICE_KEY = "quick-poll-voted-choice";

function mergeVoteSnapshot(choices: PollChoice[], votes: VoteSnapshot[]): PollChoice[] {
  const counts = new Map(votes.map(({ choice, count }) => [choice, count]));
  return choices.map((choice) => ({ ...choice, votes: counts.get(choice.name) ?? 0 }));
}

export default function Home() {
  const [poll, setPoll] = useState<Poll | null>(null);
  const [votedChoice, setVotedChoice] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedChoice = window.localStorage.getItem(VOTED_CHOICE_KEY);
    setVotedChoice(storedChoice);

    void fetch("/api/poll")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Unable to load the poll.");
        }

        return response.json() as Promise<Poll>;
      })
      .then(setPoll)
      .catch((loadError: unknown) => {
        setError(loadError instanceof Error ? loadError.message : "Unable to load the poll.");
      });
  }, []);

  useEffect(() => {
    let socket: WebSocket | undefined;
    let reconnectTimer: number | undefined;
    let isUnmounted = false;

    const connect = () => {
      socket = new WebSocket(`ws://${window.location.host}`);

      socket.addEventListener("message", (event) => {
        const message: unknown = JSON.parse(event.data as string);

        if (!message || typeof message !== "object" || !("type" in message)) {
          return;
        }

        if (message.type === "vote-update" && "choices" in message && Array.isArray(message.choices)) {
          setPoll((currentPoll) => currentPoll ? { ...currentPoll, choices: message.choices as PollChoice[] } : currentPoll);
        }

        if (message.type === "results" && "votes" in message && Array.isArray(message.votes)) {
          setPoll((currentPoll) => currentPoll ? {
            ...currentPoll,
            choices: mergeVoteSnapshot(currentPoll.choices, message.votes as VoteSnapshot[]),
          } : currentPoll);
        }
      });

      socket.addEventListener("close", () => {
        if (!isUnmounted) {
          reconnectTimer = window.setTimeout(connect, 2000);
        }
      });
    };

    connect();

    return () => {
      isUnmounted = true;
      window.clearTimeout(reconnectTimer);
      socket?.close();
    };
  }, []);

  const totalVotes = useMemo(
    () => poll?.choices.reduce((sum, choice) => sum + choice.votes, 0) ?? 0,
    [poll],
  );

  const sortedChoices = useMemo(
    () => [...(poll?.choices ?? [])].sort((left, right) => right.votes - left.votes),
    [poll],
  );

  const submitVote = async (choice: string) => {
    if (isSubmitting || votedChoice) {
      return;
    }

    setError(null);
    setIsSubmitting(true);
    setPoll((currentPoll) => currentPoll ? {
      ...currentPoll,
      choices: currentPoll.choices.map((currentChoice) => (
        currentChoice.name === choice ? { ...currentChoice, votes: currentChoice.votes + 1 } : currentChoice
      )),
    } : currentPoll);

    try {
      const response = await fetch("/api/vote", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ choice }),
      });

      if (!response.ok) {
        throw new Error("Unable to record your vote. Please try again.");
      }

      const updatedPoll = await response.json() as Poll;
      window.localStorage.setItem(VOTED_CHOICE_KEY, choice);
      setVotedChoice(choice);
      setPoll(updatedPoll);
    } catch (voteError: unknown) {
      setPoll((currentPoll) => currentPoll ? {
        ...currentPoll,
        choices: currentPoll.choices.map((currentChoice) => (
          currentChoice.name === choice ? { ...currentChoice, votes: Math.max(0, currentChoice.votes - 1) } : currentChoice
        )),
      } : currentPoll);
      setError(voteError instanceof Error ? voteError.message : "Unable to record your vote. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!poll) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <p className="text-base text-slate-600" role="status">Loading today&apos;s poll…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6">
      <section className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">Quick Poll</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{poll.question}</h1>

        {error && <p className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{error}</p>}

        {!votedChoice ? (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {poll.choices.map((choice, index) => (
              <button
                className="min-h-24 rounded-xl border border-slate-200 bg-white px-3 py-4 text-left text-base font-semibold shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 active:translate-y-0 disabled:cursor-wait disabled:opacity-60"
                disabled={isSubmitting}
                key={choice.name}
                onClick={() => void submitVote(choice.name)}
                type="button"
              >
                <span className="block text-2xl" aria-hidden="true">{["🍛", "🥗", "🍜", "🍗", "🍝", "🍲", "🍕", "🥪"][index]}</span>
                <span className="mt-2 block">{choice.name}</span>
              </button>
            ))}
          </div>
        ) : (
          <section className="mt-8" aria-live="polite">
            <p className="text-sm text-slate-600">You voted for <span className="font-semibold text-slate-900">{votedChoice}</span>.</p>
            <ol className="mt-5 space-y-4">
              {sortedChoices.map((choice) => {
                const percentage = totalVotes === 0 ? 0 : Math.round((choice.votes / totalVotes) * 100);

                return (
                  <li key={choice.name}>
                    <div className="mb-1 flex items-baseline justify-between gap-4 text-sm">
                      <span className="font-medium text-slate-800">{choice.name}</span>
                      <span className="shrink-0 text-slate-600">{choice.votes} vote{choice.votes === 1 ? "" : "s"} · {percentage}%</span>
                    </div>
                    <div className="h-8 overflow-hidden rounded-md bg-slate-100" aria-label={`${choice.name}: ${choice.votes} votes, ${percentage} percent`}>
                      <div className="h-full rounded-md bg-orange-500 transition-[width] duration-500 ease-out" style={{ width: `${percentage}%` }} />
                    </div>
                  </li>
                );
              })}
            </ol>
            <p className="mt-7 border-t border-slate-200 pt-5 text-sm font-semibold text-slate-700">{totalVotes} total vote{totalVotes === 1 ? "" : "s"}</p>
          </section>
        )}
      </section>
    </main>
  );
}
