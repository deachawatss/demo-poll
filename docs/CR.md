---
doc_id: "CR-demo-poll-001"
type: CR
standard: lean-6-docs
project: "demo-poll"
status: draft
owner: "wind"
created: "2026-07-20"
last_reviewed: "2026-07-20"
source_of_truth: code
---

# Change Requests — demo-poll

<!-- AGENT GUIDANCE (invisible when rendered):
     Append-only log: never edit a past row — append a new one. Amending an approved
     requirement always opens a CR. A behavior-changing PR appends its CR row in the
     same PR (/sop-cmmi §3 delta discipline). -->

## Change Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Proposed
    Proposed --> Approved: owner sign-off / ADR
    Proposed --> Rejected
    Approved --> Implemented: PR merged
    Implemented --> Verified: UAT passes
    Verified --> [*]
```

## Change Log

| CR-id | Date | REQ-id | Change | Reason | PR | Status |
|-------|------|--------|--------|--------|----|--------|
| CR-001 | 2026-07-20 | REQ-DEMOPOLL-NNN | _what changes_ | _why_ | #NN | Proposed |
| CR-002 | 2026-07-20 | REQ-DEMOPOLL-002 | Add a custom Next.js and WebSocket server. | Provide real-time connections on the application port. | pending | Implemented |

## Revision History

| Version | Date | REQ/CR-id | Author | Change | PR |
|---------|------|-----------|--------|--------|----|
| 0.1.0 | 2026-07-20 | — | wind | Initial scaffold | — |
| 0.1.1 | 2026-07-20 | #2 | Oracle (Codex) | Recorded custom-server delivery. | pending |
