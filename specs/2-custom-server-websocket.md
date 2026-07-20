# Spec 2: Custom Server + WebSocket Foundation

## Owner: codex-lead

## Files to create
- `server.ts` — custom Next.js server with WebSocket on same port (3100)
- `src/lib/db.ts` — SQLite connection, auto-create tables, query helpers
- `src/lib/ws.ts` — WebSocket server setup, broadcast helper
- `test/server.test.mjs` — server startup + WebSocket handshake test

## Files to update
- `package.json` — ensure tsx, better-sqlite3, ws are in dependencies; set dev/start scripts

## Architecture

### server.ts
```
import { createServer } from 'http'
import next from 'next'
import { setupWebSocket, broadcastDirect } from './src/lib/ws'

const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler()
const PORT = parseInt(process.env.PORT || '3100')

app.prepare().then(() => {
  const server = createServer((req, res) => {
    // Internal broadcast endpoint — only server.ts calls broadcastDirect
    if (req.method === 'POST' && req.url === '/_internal/broadcast') {
      let body = ''
      req.on('data', chunk => body += chunk)
      req.on('end', () => {
        broadcastDirect(body)
        res.writeHead(200)
        res.end('ok')
      })
      return
    }
    handle(req, res)
  })

  setupWebSocket(server)
  server.listen(PORT, () => console.log(`> Ready on http://localhost:${PORT}`))
})
```

### CRITICAL: WebSocket broadcast pattern
API routes MUST NOT import ws.ts directly — Next.js path alias (`@/lib/ws`) creates a different module instance from server.ts's relative import (`./src/lib/ws`). Two instances = two `wss` variables = broadcast never reaches clients.

**Solution:** API routes POST to `http://localhost:${PORT}/_internal/broadcast` with the message body. Only `server.ts` calls `broadcastDirect()` with the real WebSocket instance.

### src/lib/db.ts
- Use `better-sqlite3` (synchronous API)
- Auto-create `votes` table: `id INTEGER PRIMARY KEY, choice TEXT NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP`
- Export: `getDb()`, `getVotes()`, `addVote(choice: string)`

### src/lib/ws.ts
- Export: `setupWebSocket(server)` — attaches WebSocket.Server to the HTTP server
- Export: `broadcastDirect(message: string)` — sends to all connected clients
- Do NOT export the WebSocket server instance itself

### Default poll data
Question: "What's for lunch today?"
Choices: ["Pad Krapao", "Som Tum", "Noodle Soup", "Chicken Rice", "Pad Thai", "Shabu-shabu", "Pizza", "Skip lunch"]

Store choices in src/lib/db.ts as a constant. The votes table only tracks which choice was voted for.

## Test contract
- `test/server.test.mjs`: start server, verify HTTP 200 on `/`, verify WebSocket handshake on `ws://localhost:3100`
