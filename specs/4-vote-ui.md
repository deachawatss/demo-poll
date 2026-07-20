# Spec 4: Vote UI + Live Chart

## Owner: codex-frontend

## Files to create/modify
- `src/app/page.tsx` — replace placeholder with full vote UI
- `src/app/globals.css` — Tailwind base + bar chart animations

## UI Flow

### Initial Load
1. Fetch GET /api/poll
2. Display question as heading
3. Show choice cards in a grid (2 columns on mobile, 4 on desktop)

### Vote Action
1. User clicks a choice card
2. POST /api/vote with { choice: "..." }
3. Optimistic update: increment the bar immediately
4. Disable the voted card (visual feedback)

### Real-time Updates via WebSocket
1. On mount, connect to `ws://` + window.location.host
2. Listen for messages with `type: 'vote-update'`
3. Update bar chart with new vote counts
4. Smooth CSS transition on bar width changes

### Bar Chart
- Horizontal bars, one per choice
- Width proportional to vote count (percentage of total)
- Show vote count number on each bar
- CSS transition: `transition: width 0.5s ease-out`

### Styling
- Clean, minimal design
- Background: subtle gradient or solid color
- Cards: rounded corners, hover effect, shadow
- Responsive: stack on mobile, grid on desktop
- Fun food emoji next to each choice name

## States
1. **Loading** — skeleton or spinner
2. **Ready** — choices visible, no vote yet
3. **Voted** — show results chart, voted choice highlighted
4. **Live update** — bars animate when new votes arrive via WebSocket
