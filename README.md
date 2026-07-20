# Quick Poll

Real-time voting app — ask a question, collect votes, see results animate live via WebSocket.

## Status

Active — demo at `demo.solutionlabth.com`

## Quick Start

```bash
npm install
npm run dev
# Open http://localhost:3100
```

## Architecture

- **Next.js 15** App Router with custom `server.ts` (HTTP + WebSocket on port 3100)
- **SQLite** via `better-sqlite3` — zero-config persistent storage
- **WebSocket** via `ws` — real-time vote broadcast to all connected clients
- **Tailwind CSS 4** — utility-first styling

## Repository Structure

| Folder | Contents |
|--------|----------|
| `src/app/` | Next.js App Router pages and API routes |
| `src/lib/` | Shared utilities (db, ws, poll helpers) |
| `test/` | Server and integration tests |
| `specs/` | Issue design specs |
| `docs/` | SRS, SDD, CR, RISK, UXUI, UAT |

## Configuration

See `.env.example`. Default port is 3100.

## Development

```bash
npm run dev      # dev server with hot reload
npm run build    # production build
npm test         # run test suite
```

## Deployment

```bash
npm run build
PORT=3100 npm start
```

Tunneled via Cloudflare to `demo.solutionlabth.com`.

## Docs

- [SRS](docs/SRS.md) · [SDD](docs/SDD.md) · [CR](docs/CR.md)
- [RISK](docs/RISK.md) · [UXUI](docs/UXUI.md) · [UAT](docs/UAT.md)

## Ownership

Solution Lab — Wind

## License

Internal — proprietary
