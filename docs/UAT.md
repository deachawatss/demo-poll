# User Acceptance Test — Quick Poll

| ID | REQ | Given / When / Then | Evidence | Status |
|----|-----|-------------------|----------|--------|
| UAT-1 | FR-1 | Given the poll API is available, when the page loads, then the question and eight choices are shown. | `src/app/page.tsx` | Planned |
| UAT-2 | FR-2, FR-5 | Given a choice card, when a user selects it, then the UI posts the choice and immediately shows the results chart. | `src/app/page.tsx` | Planned |
| UAT-3 | FR-4, FR-5 | Given two connected clients, when either client votes, then the other client receives an animated chart update. | `src/app/page.tsx` | Planned |
| UAT-4 | FR-1, FR-5 | Given a previous selection in local storage, when the page reloads, then it opens directly to results. | `src/app/page.tsx` | Planned |
