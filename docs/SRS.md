# Software Requirements Specification — Quick Poll

## Overview
Real-time voting application with WebSocket live updates.

## System Requirements
- Node.js 22+
- SQLite (via better-sqlite3)
- WebSocket (via ws)

## Functional Requirements
| ID | Requirement | Status |
|----|------------|--------|
| FR-1 | Display poll question with choices | Implemented |
| FR-2 | Accept votes via POST /api/vote | Implemented |
| FR-3 | Return poll data via GET /api/poll | Implemented |
| FR-4 | Broadcast vote updates via WebSocket | Implemented |
| FR-5 | Animated bar chart for results | Implemented |
