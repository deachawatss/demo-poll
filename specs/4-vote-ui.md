# Spec: Issue #4 — Vote UI and Live Results Chart

## Files to create/modify

- `src/app/page.tsx` — main vote page (replace placeholder)
- `src/app/globals.css` — Tailwind base + any custom animations

## UI Flow

### State 1: Vote screen (before voting)
- Show question: "What's for lunch today?"
- 8 choice cards in a vertical list
- Each card: choice name, tappable, full-width
- Mobile-first: cards are large touch targets (min 48px height)
- No login required

### State 2: Results screen (after voting)
- Show question at top
- Animated horizontal bar chart:
  - Each bar: choice name (left), bar (proportional width), vote count + percentage (right)
  - Bars sorted by vote count descending
  - Smooth CSS transition on bar width (transition-all duration-500)
- Total votes count at bottom
- WebSocket auto-updates: bars animate when new votes arrive

### State transition
- User taps a choice → POST /api/vote → switch to results view
- Store "has voted" in localStorage to persist across refreshes
- On page load: check localStorage, if voted → show results directly

## WebSocket Client

- Connect to `ws://${window.location.host}` on mount
- On `vote-update` message: update the bar chart data (no page reload)
- Reconnect on disconnect (simple retry with 2s delay)

## Styling

- Tailwind CSS utility classes only (no external UI library)
- Clean, modern look
- Background: white or very light gray
- Cards: subtle shadow, rounded corners, hover/active states
- Bars: colored (use Tailwind palette — each choice a different color)
- Responsive: works on 320px mobile up to desktop

## Dependencies

- Fetches from `/api/poll` (GET) and `/api/vote` (POST)
- These are created by issue #3 — if not yet merged, develop against the API contract in specs/3-poll-api.md

## No TDD — use /sop-frontend live evidence instead
