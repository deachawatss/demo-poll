# Demo Poll — Quick Poll SaaS

> Live voting app — "What's for lunch today?" with real-time animated results.

## Stack

- **Framework:** Next.js 15 (App Router) — `src/app/`
- **Database:** SQLite via better-sqlite3
- **Real-time:** WebSocket (ws library) on same port as Next.js
- **Styling:** Tailwind CSS
- **Deploy:** Cloudflare Tunnel → demo.solutionlabth.com
- **Port:** 3000

## Architecture

```
Browser (vote/results) ←→ Next.js Server (port 3000) ←→ SQLite (poll.db)
                                    ↕
                              WebSocket Server
                                    ↕
                         All connected browsers (live updates)
```

## API

- `GET /api/poll` — returns poll question, choices, and current vote counts
- `POST /api/vote` — body: `{ choice: string }` — records vote, broadcasts via WebSocket

## Database

Single table in `poll.db`:
```sql
CREATE TABLE votes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  choice TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Default Poll Choices

Pad Krapao (Basil Stir-fry), Som Tum (Papaya Salad), Noodle Soup, Chicken Rice, Pad Thai, Shabu-shabu, Pizza, Skip lunch (on a diet)

## Docs Trust Rule

docs/ describe intent; code is truth. Verify against source before trusting stale docs.
