import Database from "better-sqlite3";

export type VoteCount = {
  choice: string;
  count: number;
};

const database = new Database("poll.db");

database.exec(`
  CREATE TABLE IF NOT EXISTS votes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    choice TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

const addVoteStatement = database.prepare<[string]>(
  "INSERT INTO votes (choice) VALUES (?)",
);
const getVotesStatement = database.prepare<[], VoteCount>(
  "SELECT choice, COUNT(*) AS count FROM votes GROUP BY choice ORDER BY choice",
);

export function getVotes(): VoteCount[] {
  return getVotesStatement.all();
}

export function addVote(choice: string): void {
  addVoteStatement.run(choice);
}
