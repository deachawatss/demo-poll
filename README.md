# demo-poll

Live voting app for "What's for lunch today?" — built by an AI team using professional SDLC.

## Status

Active — Demo application. Deploy: demo.solutionlabth.com

## Quick Start

```bash
git clone https://github.com/deachawatss/demo-poll.git
cd demo-poll
npm install
npm run dev
# Open http://localhost:3000
```

## Architecture

- **Next.js 15** App Router with custom server for WebSocket
- **SQLite** via better-sqlite3 for vote storage
- **WebSocket** for real-time vote broadcast to all connected clients
- **Tailwind CSS** for mobile-first responsive UI
- **Cloudflare Tunnel** for public deployment

## Repository Structure

| Folder | Contents |
|---|---|
| `src/app/` | Next.js App Router pages and API routes |
| `src/lib/` | Database and WebSocket utilities |
| `docs/` | Project documentation (6-doc standard) |
| `scripts/` | Build and deploy automation |

## Configuration

See `.env.example` for required environment variables.

## Development

```bash
npm run dev      # Start dev server on port 3000
npm run build    # Production build
npm start        # Production server
```

## Deployment

Via Cloudflare Tunnel to `demo.solutionlabth.com`. See docs/SDD.md.

## Docs

- [docs/REQ.md](docs/REQ.md) — Requirements
- [docs/SRS.md](docs/SRS.md) — Software Requirements Specification
- [docs/SDD.md](docs/SDD.md) — Software Design Document
- [docs/UAT.md](docs/UAT.md) — User Acceptance Testing
- [docs/RELEASE.md](docs/RELEASE.md) — Release Notes
- [docs/CHANGELOG.md](docs/CHANGELOG.md) — Change Log

## Ownership

Wind (rt@newlywedsfoods.co.th)

## License

Internal — proprietary
