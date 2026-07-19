---
doc_id: "SDD-demo-poll-001"
type: SDD
standard: lean-6-docs
project: "demo-poll"
status: draft
owner: "wind"
created: "2026-07-20"
last_reviewed: "2026-07-20"
source_of_truth: code
---

# Software Design — demo-poll

<!-- AGENT GUIDANCE (invisible when rendered):
     This doc is GENERATED from current code on demand (release/audit/onboarding) — never
     hand-maintained. Regenerate the diagrams as a snapshot; prior versions live in git history.
     Structure follows the Google design-doc frame: context → goals/non-goals → design →
     decisions. Diagrams are C4-style: context/container level only — no class diagrams.
     A design doc argues trade-offs; it does not narrate the code. -->

## Context

_One paragraph: what this system is, who depends on it, and the one constraint that most shaped the design._

## Goals / Non-Goals

| Goals | Non-Goals |
|-------|-----------|
| _what the design must achieve_ | _explicitly not solved here, and why_ |

## Architecture

```mermaid
flowchart LR
    U[User / device] --> FE[Frontend]
    FE --> API[API service]
    API --> DB[(Database)]
    API --> EXT[External system]
```

| Component | Responsibility | Realises | Key decision |
|-----------|----------------|----------|--------------|
| _name_ | _single-sentence responsibility_ | REQ-DEMOPOLL-001 | [ADR-0001](adr/0001-slug.md) |

## Data Model

```mermaid
erDiagram
    ENTITY_A ||--o{ ENTITY_B : has
    ENTITY_A {
        int    id   PK
        string name
    }
    ENTITY_B {
        int id   PK
        int a_id FK
    }
```

## Key Flow

```mermaid
sequenceDiagram
    actor User
    User->>Frontend: action
    Frontend->>API: request
    API->>Database: query
    Database-->>API: rows
    API-->>Frontend: response
    Frontend-->>User: result
```

## Deployment

| | |
|---|---|
| **Target** | _where it runs (host, container, service)_ |
| **Pipeline** | _how a merge reaches production_ |
| **Rollback** | _how a bad release is reverted_ |

## Alternatives Considered

_One line per rejected direction, each linking its ADR: what was rejected and the single deciding reason._

## Revision History

| Version | Date | REQ/CR-id | Author | Change | PR |
|---------|------|-----------|--------|--------|----|
| 0.1.0 | 2026-07-20 | — | wind | Initial scaffold | — |
