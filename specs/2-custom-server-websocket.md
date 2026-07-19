# Spec: Issue #2 — Custom Server with WebSocket

## Files to create/modify

- `server.ts` — custom Next.js server with WebSocket
- `src/lib/db.ts` — SQLite connection + schema init + query helpers
- `src/lib/ws.ts` — WebSocket server setup + broadcast helper
- `package.json` — add tsx dep, update dev/start scripts

## server.ts

Custom server that:
1. Creates HTTP server
2. Attaches Next.js request handler
3. Attaches WebSocket server (ws library) to the same HTTP server
4. Listens on `PORT` env var or 3000

```typescript
// Key structure:
import { createServer } from "http";
import next from "next";
import { setupWebSocket } from "./src/lib/ws";

const server = createServer(handler);
setupWebSocket(server);
server.listen(port);
```

## src/lib/db.ts

- Use `better-sqlite3` (synchronous, no async needed)
- Auto-create `votes` table on import:
  ```sql
  CREATE TABLE IF NOT EXISTS votes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    choice TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  ```
- Export helper functions:
  - `getVotes(): { choice: string, count: number }[]`
  - `addVote(choice: string): void`
- Database file: `poll.db` (gitignored)
- All queries parameterized

## src/lib/ws.ts

- Export `setupWebSocket(server: HttpServer): void`
- Export `broadcast(data: object): void`
- On new connection: send current vote counts immediately
- `broadcast()` sends JSON to all connected clients

## package.json changes

```json
"scripts": {
  "dev": "tsx watch server.ts",
  "build": "next build",
  "start": "NODE_ENV=production tsx server.ts"
}
```
Add `tsx` to devDependencies.

## TDD seam

Test: start server, connect WebSocket, verify handshake + initial data message.
