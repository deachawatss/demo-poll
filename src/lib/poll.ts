import { getVotes } from "./db";

export const pollQuestion = "What's for lunch today?";

export const pollChoices = [
  "Pad Krapao (Basil Stir-fry)",
  "Som Tum (Papaya Salad)",
  "Noodle Soup",
  "Chicken Rice",
  "Pad Thai",
  "Shabu-shabu",
  "Pizza",
  "Skip lunch (on a diet)",
] as const;

export type PollChoice = {
  name: string;
  votes: number;
  percentage: number;
};

export type Poll = {
  question: string;
  choices: PollChoice[];
  totalVotes: number;
};

export function getPoll(): Poll {
  const voteCounts = new Map(getVotes().map(({ choice, count }) => [choice, count]));
  const totalVotes = [...voteCounts.values()].reduce((total, count) => total + count, 0);

  return {
    question: pollQuestion,
    choices: pollChoices.map((name) => {
      const votes = voteCounts.get(name) ?? 0;

      return {
        name,
        votes,
        percentage: totalVotes === 0 ? 0 : (votes / totalVotes) * 100,
      };
    }),
    totalVotes,
  };
}

export function isPollChoice(choice: string): boolean {
  return pollChoices.some((pollChoice) => pollChoice === choice);
}
