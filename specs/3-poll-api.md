# Spec: Issue #3 — Poll API Routes

## Files to create

- `src/app/api/poll/route.ts` — GET poll data
- `src/app/api/vote/route.ts` — POST vote

## API Contract

### GET /api/poll

Response 200:
```json
{
  "question": "What's for lunch today?",
  "choices": [
    { "name": "Pad Krapao (Basil Stir-fry)", "votes": 5, "percentage": 25.0 },
    { "name": "Som Tum (Papaya Salad)", "votes": 3, "percentage": 15.0 },
    { "name": "Noodle Soup", "votes": 0, "percentage": 0.0 },
    { "name": "Chicken Rice", "votes": 4, "percentage": 20.0 },
    { "name": "Pad Thai", "votes": 2, "percentage": 10.0 },
    { "name": "Shabu-shabu", "votes": 1, "percentage": 5.0 },
    { "name": "Pizza", "votes": 3, "percentage": 15.0 },
    { "name": "Skip lunch (on a diet)", "votes": 2, "percentage": 10.0 }
  ],
  "totalVotes": 20
}
```

Choices are always returned in the fixed order above. Percentage = `(votes / totalVotes * 100)`, 0 if no votes.

### POST /api/vote

Request body:
```json
{ "choice": "Pad Krapao (Basil Stir-fry)" }
```

Response 200:
```json
{ "success": true, "totalVotes": 21 }
```

Response 400 (invalid choice):
```json
{ "error": "Invalid choice" }
```

Valid choices are the 8 strings listed above. Reject anything else.

### WebSocket boundary

After a successful POST /api/vote, the route calls `broadcast()` from `@/lib/ws` to push updated vote counts to all connected WebSocket clients.

The broadcast message format:
```json
{
  "type": "vote-update",
  "choices": [{ "name": "...", "votes": 5, "percentage": 25.0 }],
  "totalVotes": 21
}
```

## Dependencies

- Imports `getVotes`, `addVote` from `@/lib/db`
- Imports `broadcast` from `@/lib/ws`
- These are created by issue #2 — if not yet merged, stub the imports

## TDD seam

Test: POST a vote, GET poll, verify count incremented.
