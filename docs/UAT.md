# User Acceptance Test — Quick Poll

| ID | Scenario | Expected | Status |
|----|---------|----------|--------|
| UAT-1 | Open app → see poll question | Question and choices visible | Planned |
| UAT-2 | Click a choice → vote recorded | POST returns 200, choice count increments | Planned |
| UAT-3 | Vote on phone → desktop chart updates | WebSocket broadcast, bar animates | Planned |
| UAT-4 | Refresh page → votes persist | SQLite data survives restart | Planned |
