# Spec 3: Poll API Routes

## Owner: codex-backend

## Files to create
- `src/app/api/poll/route.ts` — GET poll data
- `src/app/api/vote/route.ts` — POST vote

## API Contract

### GET /api/poll
Response:
```json
{
  "question": "What's for lunch today?",
  "choices": [
    { "name": "Pad Krapao", "votes": 5 },
    { "name": "Som Tum", "votes": 3 },
    ...
  ]
}
```

Uses `getVotes()` from `@/lib/db` to aggregate vote counts per choice.

### POST /api/vote
Request:
```json
{ "choice": "Pad Krapao" }
```

Response: `200 OK` with updated poll data (same shape as GET).

**After recording the vote**, broadcast to all WebSocket clients via loopback POST:
```typescript
await fetch(`http://localhost:${process.env.PORT || 3100}/_internal/broadcast`, {
  method: 'POST',
  body: JSON.stringify({
    type: 'vote-update',
    choices: updatedChoices
  })
})
```

**NEVER import `@/lib/ws` directly** — see spec 2 for the module identity mismatch explanation.

## Validation
- Reject unknown choices with 400
- Accept duplicate votes (no IP tracking for demo simplicity)
