# Demo Poll — Quick Poll SaaS

> Live voting app built by an AI team in minutes.

## Stack

- **Framework:** Next.js 15 (App Router)
- **Database:** SQLite via better-sqlite3
- **Real-time:** WebSocket (ws library)
- **Styling:** Tailwind CSS
- **Deploy:** Cloudflare Tunnel → demo.solutionlabth.com

## Architecture

```
Browser (vote/results) ←→ Next.js Server ←→ SQLite
                              ↕
                         WebSocket Server
                              ↕
                    All connected browsers (live updates)
```

## API

- `GET /api/poll` — returns poll question, choices, and current vote counts
- `POST /api/vote` — body: `{ choice: string }` — records vote, broadcasts via WebSocket

## Database

Single table:
```sql
CREATE TABLE votes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  choice TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Default Poll

"What's for lunch today?"
- Pad Krapao (Basil Stir-fry)
- Som Tum (Papaya Salad)
- Noodle Soup
- Chicken Rice
- Pad Thai
- Shabu-shabu
- Pizza
- Skip lunch (on a diet)
