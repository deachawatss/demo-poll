---
doc_id: "UAT-demo-poll-001"
type: UAT
standard: lean-6-docs
project: "demo-poll"
status: draft
owner: "wind"
created: "2026-07-20"
last_reviewed: "2026-07-20"
source_of_truth: code
---

# User Acceptance Tests — demo-poll

<!-- AGENT GUIDANCE (invisible when rendered):
     Scenarios are DECLARATIVE Given/When/Then — describe intent ("a picker with a valid
     run"), never UI mechanics ("click the third button"). One behavior per row.
     The REQ-id column IS the traceability (REQ → proof) — no separate RTM document.
     Every Must requirement needs ≥1 passing row before release. Evidence = screenshot
     path, test run link, or command output — a claim without evidence is not a pass. -->

## Test Cases

| UAT-id | REQ-id | Scenario (Given / When / Then) | Result | Evidence |
|--------|--------|-------------------------------|--------|----------|
| UAT-001 | REQ-DEMOPOLL-001 | **Given** _precondition_ · **When** _action_ · **Then** _observable outcome_ | ⬜ | — |
| UAT-002 | REQ-DEMOPOLL-002 | **Given** the production custom server is running · **When** two WebSocket clients connect and one sends a results message · **Then** each receives the initial results and the sent message. | ✅ pass | `npm test`; production WebSocket smoke test on port 3103 |
| UAT-003 | REQ-DEMOPOLL-003 | **Given** the server and a connected WebSocket client · **When** a valid choice is posted · **Then** GET returns its incremented total and the client receives a `vote-update`; invalid choices return 400. | ⬜ | `npm run build`; live broadcast verification pending |
| UAT-004 | REQ-DEMOPOLL-004 | **Given** a poll API and WebSocket server are available · **When** a visitor submits a choice or another visitor votes · **Then** the results view shows the persisted vote state and animated updated counts and percentages. | ❌ fail | Production server on port 3100: GET and POST succeed, but a second WebSocket client receives no `vote-update`. |

Result: ✅ pass · ❌ fail · ⬜ not yet run · ⛔ blocked.

## Test Environment

| | |
|---|---|
| **Environment** | _URL / host / device used for acceptance_ |
| **Data** | _dataset or account the scenarios assume_ |
| **Tester** | _who signs off_ |

## Revision History

| Version | Date | REQ/CR-id | Author | Change | PR |
|---------|------|-----------|--------|--------|----|
| 0.1.0 | 2026-07-20 | — | wind | Initial scaffold | — |
| 0.1.1 | 2026-07-20 | #2 | Oracle (Codex) | Added custom-server acceptance evidence. | pending |
| 0.1.2 | 2026-07-20 | #3 | Oracle (Codex) | Added poll API acceptance evidence. | pending |
| 0.1.3 | 2026-07-20 | UAT-004 | Oracle (Codex) | Added live-vote acceptance scenario. | pending |
| 0.1.4 | 2026-07-20 | UAT-004 | Oracle (Codex) | Recorded blocked real broadcast verification. | pending |
