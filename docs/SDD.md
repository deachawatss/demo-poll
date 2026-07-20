# Software Design Document — Quick Poll

## Architecture
- Custom `server.ts` wraps Next.js HTTP handler + WebSocket on port 3100
- SQLite database (`poll.db`) with `votes` table
- API routes handle business logic; WebSocket broadcast via loopback POST

## Key Design Decision
API routes MUST NOT import the WebSocket server directly (module identity mismatch). Instead, POST to `/_internal/broadcast` which server.ts handles with the real WebSocket instance.
