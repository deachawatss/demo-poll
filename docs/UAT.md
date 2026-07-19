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
