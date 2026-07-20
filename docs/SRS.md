---
doc_id: "SRS-demo-poll-001"
type: SRS
standard: lean-6-docs
project: "demo-poll"
status: draft
owner: "wind"
created: "2026-07-20"
last_reviewed: "2026-07-20"
source_of_truth: code
---

# Software Requirements — demo-poll

<!-- AGENT GUIDANCE (invisible when rendered):
     Derive every row from code you have READ (/sop-cmmi §2b) or a merged PR — never invent.
     Requirements use EARS syntax (one requirement per row, singular, verifiable):
       Ubiquitous:   The <system> SHALL <response>.
       Event-driven: WHEN <trigger>, the <system> SHALL <response>.
       State-driven: WHILE <state>, the <system> SHALL <response>.
       Unwanted:     IF <failure>, THEN the <system> SHALL <response>.
       Optional:     WHERE <feature is present>, the <system> SHALL <response>.
     Every REQ is cited by ≥1 UAT row (that column IS the traceability — no separate RTM).
     Keep the doc scannable: rows, not paragraphs. -->

## Overview

| | |
|---|---|
| **Purpose** | Let participants cast a lunch vote and receive live poll totals. |
| **Users** | Voters connected to the demo poll in a browser. |
| **In scope** | Next.js HTTP routes, SQLite vote persistence, WebSocket result updates. |
| **Out of scope** | Authentication, multi-process broadcast coordination, and managed database hosting. |

## Functional Requirements

| REQ-id | Requirement (EARS) | Priority | Status | Verified by |
|--------|--------------------|----------|--------|-------------|
| REQ-DEMOPOLL-001 | WHEN _trigger_, the system SHALL _response_. | Must | draft | UAT-001 |
| REQ-DEMOPOLL-002 | WHEN the application starts, the system SHALL serve Next.js HTTP requests and accept WebSocket connections on the same configured port. | Must | implemented | UAT-002 |
| REQ-DEMOPOLL-003 | WHEN a voter submits one of the eight lunch choices, the system SHALL store the vote, return the fixed-order poll totals, and notify connected clients. | Must | implemented | UAT-003 |

Priority = MoSCoW (Must / Should / Could). Status = draft → approved → implemented.

## Non-Functional Requirements

| REQ-id | Quality | Measurable target | Verified by |
|--------|---------|-------------------|-------------|
| REQ-DEMOPOLL-N01 | Runtime | The application SHALL require a Node.js runtime, a writable SQLite database file, and WebSocket-capable clients. | UAT-002 |

## Revision History

| Version | Date | REQ/CR-id | Author | Change | PR |
|---------|------|-----------|--------|--------|----|
| 0.1.0 | 2026-07-20 | — | wind | Initial scaffold | — |
| 0.1.1 | 2026-07-20 | #2 | Oracle (Codex) | Added custom-server requirement. | pending |
| 0.1.2 | 2026-07-20 | #3 | Oracle (Codex) | Added poll API requirement. | pending |
| 0.1.3 | 2026-07-20 | #11 | Oracle (Codex) | Documented runtime requirements for the delivered foundation. | pending |
