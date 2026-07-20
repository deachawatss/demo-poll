# Risk Register — Quick Poll

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|-----------|
| R-1 | SQLite concurrency under load | Low | Medium | Single-writer, WAL mode |
| R-2 | WebSocket module identity mismatch | High | High | Loopback POST pattern (P5 fix) |
