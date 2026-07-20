# Quick Poll

## Stack

Next.js 15 (App Router), TypeScript, SQLite (better-sqlite3), WebSocket (ws), Tailwind CSS 4

## Database

SQLite — `poll.db` at project root. Auto-created on first run. Single `votes` table.

## Development

```bash
npm install
npm run dev     # custom server.ts — Next.js + WebSocket on same port
npm run build
npm start
```

Port: **3100** (dev and prod)

## Testing

```bash
npm test        # server startup + WebSocket handshake
curl http://localhost:3100/api/poll   # smoke
```

## Theme / UI

Tailwind CSS — no brand skill. Clean, minimal poll UI.

## Docs

Project docs live in `docs/` (SRS · SDD · CR · RISK · UXUI · UAT + `docs/adr/`), standard: `/sop-cmmi`.

- **Trust rule:** docs describe intent; **code is truth**.
- **Sync rule:** a behavior-changing PR updates the affected doc rows in the same PR.

## Project-Specific Rules

- Custom `server.ts` wraps Next.js + WebSocket on the same port (3100)
- API routes MUST NOT hold WebSocket state directly — loopback POST to `/_internal/broadcast` instead
- `better-sqlite3` is synchronous — no async/await needed for DB calls
