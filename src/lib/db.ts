import Database from "better-sqlite3";

export const pollChoices = [
  "Pad Krapao",
  "Som Tum",
  "Noodle Soup",
  "Chicken Rice",
  "Pad Thai",
  "Shabu-shabu",
  "Pizza",
  "Skip lunch",
] as const;

export type VoteCount = {
  choice: string;
  count: number;
};

const database = new Database(process.env.POLL_DB_PATH ?? "poll.db");

database.exec(`
  CREATE TABLE IF NOT EXISTS votes (
    id INTEGER PRIMARY KEY,
    choice TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

const insertVote = database.prepare("INSERT INTO votes (choice) VALUES (?)");
const selectVotes = database.prepare<[], VoteCount>(
  "SELECT choice, COUNT(*) AS count FROM votes GROUP BY choice ORDER BY choice",
);

export function getDb(): Database.Database {
  return database;
}

export function getVotes(): VoteCount[] {
  return selectVotes.all();
}

export function addVote(choice: string): void {
  insertVote.run(choice);
}
