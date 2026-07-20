import { getVotes, pollChoices } from "./db";

export type PollChoice = {
  name: string;
  votes: number;
};

export type Poll = {
  question: string;
  choices: PollChoice[];
};

export function getPoll(): Poll {
  const votesByChoice = new Map(getVotes().map(({ choice, count }) => [choice, count]));

  return {
    question: "What's for lunch today?",
    choices: pollChoices.map((name) => ({
      name,
      votes: votesByChoice.get(name) ?? 0,
    })),
  };
}

export function isPollChoice(choice: string): boolean {
  return pollChoices.some((pollChoice) => pollChoice === choice);
}
