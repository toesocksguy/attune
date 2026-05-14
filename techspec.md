# Attune — Technical Specification
**Version 1.0 · May 2026**

---

## 1. Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Expo SDK 51+ (React Native) |
| Language | TypeScript (strict mode) |
| Navigation | Expo Router (file-based) |
| Storage | @react-native-async-storage/async-storage |
| Animation | React Native Reanimated 3 |
| Fonts | expo-font (Cormorant Garamond, Jost) |
| Icons | @expo/vector-icons |
| Build | EAS Build (Expo Application Services) |
| License | MIT |

---

## 2. Project Structure

```
attune/
  app/
    (tabs)/
      index.tsx           ← Home / Decks screen
      stats.tsx           ← Journey / Stats screen
    category/[id].tsx     ← Category detail screen
    card/[id].tsx         ← Card draw screen
    _layout.tsx           ← Root layout
  components/
    AgeGate.tsx           ← First-launch 18+ confirmation
    CardFlip.tsx          ← 3D flip animation component
    CategoryTile.tsx      ← Home grid tile
    ProgressBar.tsx       ← Thin progress bar
    StatCard.tsx          ← Stats screen metric card
    PillBadge.tsx         ← Streak / session pills
  data/
    cards.ts              ← All 200 cards
    categories.ts         ← Category metadata
  hooks/
    useStats.ts           ← Stats read/write via AsyncStorage
    useDeck.ts            ← Card shuffle & draw logic
    usePreferences.ts     ← Age gate and content visibility
    useSession.ts         ← Session timer
  theme/
    colors.ts             ← Full color palette
    typography.ts         ← Font styles
    spacing.ts            ← Spacing scale
  assets/
    fonts/                ← Cormorant Garamond, Jost
  app.json                ← Expo config
  eas.json                ← EAS build config
```

---

## 3. Data Models

### Card

```ts
type CardCategory =
  | 'warmup'
  | 'connection'
  | 'depth'
  | 'physical'
  | 'challenges'
  | 'spicy';

type CardType = 'question' | 'activity' | 'dare';

interface Card {
  id: number;
  category: CardCategory;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  type: CardType;
  text: string;
}
```

### Stats

```ts
interface AppStats {
  totalCardsDrawn: number;
  totalSessions: number;
  daysUsed: string[];           // local YYYY-MM-DD date strings
  sessionStartTime: number;     // Unix timestamp
  lastSessionStartedAt: number; // Unix timestamp
  categoryDraws: Record<CardCategory, number>;
  categorySeenIds: Record<CardCategory, number[]>;
}
```

### Deck State

```ts
interface CategoryDeckState {
  order: number[];      // card IDs in current shuffled cycle
  pointer: number;      // index of next card in order
  cycle: number;        // increments after every full deck exhaustion
}

type DeckState = Record<CardCategory, CategoryDeckState>;
```

### Preferences

```ts
interface AppPreferences {
  ageConfirmed: boolean;
  showSpicy: boolean;
  firstLaunchCompleted: boolean;
}
```

### Category Metadata

```ts
interface CategoryMeta {
  id: CardCategory;
  emoji: string;
  name: string;
  description: string;
  totalCards: number;
  accentColor: string;  // hex
  borderColor: string;  // hex with opacity
}
```

---

## 4. Core Logic

### 4.1 Card Data Import

`attune-cards.md` remains the editorial source of truth. Before release, card content is converted into `data/cards.ts` as a typed `Card[]`.

Implementation requirements:

- Every card has a stable ID, category, level, type, and text
- Category totals must match the PRD: 30 / 40 / 40 / 30 / 30 / 30
- A validation test fails if totals, duplicate IDs, empty text, invalid categories, invalid levels, or invalid types are found
- Editing copy may preserve IDs; deleting or replacing cards after release requires a migration note

### 4.2 Card Shuffle & Draw — `useDeck.ts`

Fisher-Yates shuffle on category card IDs. The shuffled order, pointer, and cycle count are persisted so no-repeat behavior survives app restart.

```ts
function shuffleDeck(cardIds: number[]): number[] {
  const arr = [...cardIds];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
```

Deck behavior:

1. Load `DeckState` from AsyncStorage key `@attune_decks`
2. If a category has no deck state, create a shuffled order from that category's card IDs
3. Current card is `order[pointer]`
4. Skip advances `pointer` without marking the card seen or incrementing `totalCardsDrawn`
5. Next marks the card seen, increments category and lifetime draw counts, then advances `pointer`
6. When `pointer >= order.length`, reshuffle that category, reset `pointer` to `0`, and increment `cycle`
7. Persist deck state immediately after each skip, next, or reshuffle

### 4.3 Stats Persistence — `useStats.ts`

All stats read/written via AsyncStorage under a single key: `@attune_stats`.

Stats behavior:

1. Load stats from storage
2. Compute today's local date string as `YYYY-MM-DD`
3. Append today to `daysUsed` if not already present
4. Start a new session only when there is no active session or the last recorded session start is more than 30 minutes old
5. Record `sessionStartTime` and `lastSessionStartedAt` when starting a new session
6. Increment `totalSessions` only when starting a new session
7. Persist immediately after session creation or card progress updates

### 4.4 Preferences Persistence — `usePreferences.ts`

All preferences read/written via AsyncStorage under key `@attune_preferences`.

Rules:

- Default preferences: `{ ageConfirmed: false, showSpicy: false, firstLaunchCompleted: false }`
- Age gate appears before deck access when `ageConfirmed` is false
- Confirming age sets `ageConfirmed`, `showSpicy`, and `firstLaunchCompleted` to true
- Users may later turn `showSpicy` off locally
- When `showSpicy` is false, Spicy is hidden from category lists, stats breakdown, and route access

### 4.5 Streak Calculation

Streak = count of consecutive local calendar days (most recent first) in `daysUsed`. Resets if gap > 1 day.

```ts
function calcStreak(days: string[]): number {
  const sorted = [...days].sort().reverse();
  let streak = 0;
  let prev = new Date();
  for (const d of sorted) {
    const diff = daysBetween(new Date(d), prev);
    if (diff <= 1) { streak++; prev = new Date(d); }
    else break;
  }
  return streak;
}
```

Use date-only local strings (`YYYY-MM-DD`) for `daysUsed`; do not derive streaks from UTC timestamps. Tests should cover same-day reuse, yesterday continuity, two-day gaps, month boundaries, year boundaries, and daylight saving transitions.

### 4.6 Card Flip Animation — `CardFlip.tsx`

Uses React Native Reanimated 3. Two animated values: `flipProgress` (0→1) and `isFlipped` (boolean). Interpolate `rotateY` for front (0→180deg) and back (180→360deg). `backfaceVisibility: hidden` on both faces.

When reduced motion is enabled, replace the 3D flip with an opacity crossfade and expose the same accessibility state.

---

## 5. Screen Specs

### 5.1 Home — `app/(tabs)/index.tsx`

- Load stats on mount via `useStats()`
- Load preferences via `usePreferences()`
- Compute `streakDays`, `sessionTime` from stats
- Render 2-column FlatList of category tiles
- Each tile receives: `meta`, `seenCount`, `totalCount`
- Hide Spicy tile when `showSpicy` is false
- Navigate to `/category/[id]` on tile press

### 5.2 Category — `app/category/[id].tsx`

- Receive `category` id from route params
- Fetch category meta + seen card count from stats
- Redirect to Decks if category is `spicy` and `showSpicy` is false
- Render progress bar: `seenCount / totalCards`
- Draw a Card button navigates to `/card/[id]`

### 5.3 Card — `app/card/[id].tsx`

- Init `useDeck(categoryId)` on mount
- Card renders face-down (`isFlipped = false`)
- Tap card → `triggerFlip()` → animate to back face
- Next Card: `markSeen(card.id)`, `advance()`, reset flip
- Skip: `advance()` without `markSeen()`
- Counter updates in header on each advance

### 5.4 Stats — `app/(tabs)/stats.tsx`

- Load stats on mount
- Compute: streak, favourite category, % per category
- Session timer: `Date.now() - stats.sessionStartTime`
- Update session timer every 60 seconds via `setInterval`
- Exclude Spicy from visible breakdown and favourite-category display when `showSpicy` is false

### 5.5 First Launch / Age Gate

- Root layout checks preferences before showing tabs
- If `ageConfirmed` is false, render age gate before app navigation
- Age gate copy states that Attune is for adults and may contain intimacy-focused prompts
- Confirm button stores preferences locally and enters the app
- Decline exits the flow to a static screen explaining that the app requires 18+ confirmation

### 5.6 Privacy / Content Screen

- Static screen reachable from Journey
- States that V1 has no accounts, backend, cloud sync, ads, analytics, or third-party tracking
- States that progress, preferences, and deck state are stored locally on device
- Includes content note for intimacy, sexuality, conflict, and emotionally sensitive prompts

---

## 6. Validation & Testing

### Unit Tests

- Card data validation: counts, IDs, categories, levels, types, non-empty text
- Deck logic: initial shuffle, skip behavior, next behavior, exhaustion reshuffle, persisted pointer restore
- Stats logic: session threshold, total sessions, total cards drawn, seen IDs, favourite category
- Streak logic: local date continuity, gaps, month/year boundaries, daylight saving edge cases
- Preferences: default state, age confirmation, Spicy visibility toggling

### Manual QA

- First launch age gate on iOS and Android
- Hide/show Spicy content and verify navigation guards
- Restart app mid-deck and verify next card does not repeat
- Complete a small test deck cycle and verify reshuffle behavior
- Verify reduced-motion mode replaces 3D flip
- Verify VoiceOver/TalkBack card reveal labels

---

## 7. Build & Deploy

### Local Development

```bash
npx create-expo-app attune --template blank-typescript
cd attune
npx expo install @react-native-async-storage/async-storage
npx expo install react-native-reanimated
npx expo install expo-font
npx expo start
```

### EAS Build

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform all    # iOS + Android
eas submit --platform all   # Submit to stores
```

### App Store Requirements

- **Apple:** 17+ age rating, developer account ($99/yr)
- **Google:** 18+ content rating, developer account ($25 one-time)
- Privacy policy required (no data collected — simple statement)
- Age gate and content note required before enabling Spicy content
- Store listing should avoid explicit screenshots from Spicy prompts
- Screenshots: 6.7" iPhone, 12.9" iPad, Pixel 7 Android

### GitHub Repository

- Public repo: `github.com/[username]/attune`
- `MIT LICENSE` file in root
- `README.md` with setup instructions, screenshots, feature list
- `CONTRIBUTING.md` for open source contributors

---

*Attune · Technical Specification · v1.0*
