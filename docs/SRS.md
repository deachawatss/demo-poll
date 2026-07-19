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

Priority = MoSCoW (Must / Should / Could). Status = draft → approved → implemented.

## Non-Functional Requirements

| REQ-id | Quality | Measurable target | Verified by |
|--------|---------|-------------------|-------------|
| REQ-DEMOPOLL-N01 | Performance | _e.g. list view renders ≤ 2 s at 10k rows_ | UAT-N01 |

## Revision History

| Version | Date | REQ/CR-id | Author | Change | PR |
|---------|------|-----------|--------|--------|----|
| 0.1.0 | 2026-07-20 | — | wind | Initial scaffold | — |
