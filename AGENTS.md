# Quick Poll — Codex Worker Rules

## Quick Poll-Specific Rules

- **Stack:** Next.js 15 (App Router) + TypeScript + SQLite (better-sqlite3) + WebSocket (ws) + Tailwind CSS 4
- **Port:** 3100 (custom server.ts, NOT default 3000)
- **DB:** SQLite `poll.db` at project root, auto-created
- **WebSocket:** Runs on same port as HTTP via custom server.ts
- **Critical:** API routes must NOT import WebSocket server directly — use loopback POST to `/_internal/broadcast`
- **Build:** `npm run build && npm start` (uses tsx for server.ts)
- **Test:** `npm test` (server startup + WebSocket handshake)
- **This is a demo project.** Commit when code works, push immediately, open PR with `maw pr`. Do not spend time on extended verification — basic build pass is sufficient.

Fleet doctrine is GLOBAL — do NOT copy it here.
