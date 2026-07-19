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
| **Purpose** | _one sentence: the job this system does_ |
| **Users** | _who operates it, in what setting_ |
| **In scope** | _the core capabilities, comma-separated_ |
| **Out of scope** | _explicitly not built, to stop scope drift_ |

## Functional Requirements

| REQ-id | Requirement (EARS) | Priority | Status | Verified by |
|--------|--------------------|----------|--------|-------------|
| REQ-DEMOPOLL-001 | WHEN _trigger_, the system SHALL _response_. | Must | draft | UAT-001 |
| REQ-DEMOPOLL-002 | WHEN the application starts, the system SHALL serve Next.js HTTP requests and accept WebSocket connections on the same configured port. | Must | implemented | UAT-002 |
| REQ-DEMOPOLL-003 | WHEN a voter submits one of the eight lunch choices, the system SHALL store the vote, return the fixed-order poll totals, and notify connected clients. | Must | implemented | UAT-003 |
| REQ-DEMOPOLL-004 | WHEN a visitor opens the poll, the system SHALL load its choices and let the visitor submit one login-free vote; WHILE the visitor has voted, the system SHALL display live, animated results. | Must | implemented | UAT-004 |

Priority = MoSCoW (Must / Should / Could). Status = draft → approved → implemented.

## Non-Functional Requirements

| REQ-id | Quality | Measurable target | Verified by |
|--------|---------|-------------------|-------------|
| REQ-DEMOPOLL-N01 | Performance | _e.g. list view renders ≤ 2 s at 10k rows_ | UAT-N01 |

## Revision History

| Version | Date | REQ/CR-id | Author | Change | PR |
|---------|------|-----------|--------|--------|----|
| 0.1.0 | 2026-07-20 | — | wind | Initial scaffold | — |
| 0.1.1 | 2026-07-20 | #2 | Oracle (Codex) | Added custom-server requirement. | pending |
| 0.1.2 | 2026-07-20 | #3 | Oracle (Codex) | Added poll API requirement. | pending |
| 0.1.3 | 2026-07-20 | REQ-DEMOPOLL-004 | Oracle (Codex) | Added the vote and live-results requirement. | pending |
