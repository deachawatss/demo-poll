# Demo Poll — Codex Agent Context

## Project

Quick Poll SaaS — live voting with real-time animated bar chart results.

## Stack

- Next.js 15 App Router (`src/app/`)
- SQLite via better-sqlite3 (`poll.db`)
- WebSocket via ws library (same port 3000)
- Tailwind CSS
- TypeScript

## Key Files

- `src/app/page.tsx` — vote UI + live results
- `src/app/api/poll/route.ts` — GET poll data
- `src/app/api/vote/route.ts` — POST vote
- `src/lib/db.ts` — SQLite connection + schema init
- `src/lib/ws.ts` — WebSocket server setup
- `server.ts` — custom Next.js server with WebSocket

## Commands

```bash
npm run dev    # development
npm run build  # production build
npm start      # production server (custom server.ts)
```

## Rules

- No mock data
- No dead code
- All API routes parameterized (no SQL injection)
- Mobile-first responsive design
- WebSocket broadcasts to ALL connected clients on every vote
