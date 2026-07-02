# Attune Milestones

Status key: `[ ]` not started, `[~]` in progress, `[x]` done, `[!]` blocked.

## M0 — Planning Foundation

Status: `[x]`

Goal: lock the V1 scope, implementation direction, visual language, and editorial source of truth before app scaffolding.

- [x] Product requirements documented in `prd.md`
- [x] Technical specification documented in `techspec.md`
- [x] Design system documented in `designsystem.md`
- [x] V1 card copy drafted in `attune-cards.md`
- [x] Codex project context documented in `AGENTS.md`
- [x] Confirm final V1 scope and defer V2 items
- [x] Identify remaining planning gaps before implementation
- [x] M0 closeout documented in `m0-closeout.md`

Acceptance criteria:

- V1 goals, non-goals, risks, and launch criteria are clear.
- Every implementation milestone below can trace back to `prd.md`, `techspec.md`, `designsystem.md`, or `attune-cards.md`.

## M1 — Expo App Scaffold

Status: `[x]`

Goal: create the real Expo/React Native app structure that will replace the browser mockups as the implementation target.

- [x] Initialize Expo SDK 51+ app
- [x] Enable TypeScript strict mode
- [x] Add Expo Router file structure
- [x] Add base app tabs: Decks and Journey
- [x] Add app config, EAS config, and GPL-3.0 license
- [x] Install required dependencies: AsyncStorage, Reanimated, expo-font, icons

Acceptance criteria:

- App launches on iOS and Android development targets.
- Project structure matches the shape defined in `techspec.md`.
- Browser prototypes remain available as references, not production code.

## M2 — Theme And Components

Status: `[x]`

Goal: translate the approved Attune design system into reusable React Native theme tokens and components.

- [x] Implement `theme/colors.ts`
- [x] Implement `theme/typography.ts`
- [x] Implement `theme/spacing.ts`
- [x] Add Cormorant Garamond and Jost font assets
- [x] Build `ProgressBar`
- [x] Build `PillBadge`
- [x] Build `CategoryTile`
- [x] Build `StatCard`
- [x] Build `CardFlip`

Acceptance criteria:

- Components match `designsystem.md` tokens and sizing.
- Touch targets meet the 44pt minimum.
- Text contrast meets the 4.5:1 requirement.
- Reduced-motion behavior is planned or implemented for animated components.

## M3 — Card Data Pipeline

Status: `[x]`

Goal: convert the editorial card deck into typed app data with validation.

- [x] Define card category and card type models
- [x] Convert `attune-cards.md` into `data/cards.ts`
- [x] Create `data/categories.ts`
- [x] Preserve stable IDs and category totals
- [x] Add validation for totals, duplicate IDs, empty text, categories, levels, and types

Acceptance criteria:

- All 200 cards are represented in app data.
- Category totals are 30 / 40 / 40 / 30 / 30 / 30.
- Validation catches malformed or incomplete card data.

## M4 — Local State Core

Status: `[x]`

Goal: implement local-only persistence for preferences, sessions, streaks, stats, and deck draw order.

- [x] Build `usePreferences`
- [x] Build `useStats`
- [x] Build `useSession`
- [x] Build `useDeck`
- [x] Persist stats under `@attune_stats`
- [x] Persist preferences under `@attune_preferences`
- [x] Persist deck state under `@attune_decks`
- [x] Add streak tests for local dates, month boundaries, year boundaries, and daylight saving transitions
- [x] Add deck tests for skip, next, exhaustion, reshuffle, and restart persistence

Acceptance criteria:

- No user accounts, backend, cloud sync, or analytics are introduced.
- Decks do not repeat within a cycle, even after app restart.
- Streaks use local calendar dates rather than UTC-only timestamps.

## M5 — Core Screens

Status: `[x]`

Goal: implement the primary user journey from choosing a deck to drawing cards and viewing progress.

- [x] Build Home / Decks screen
- [x] Build Category Detail screen
- [x] Build Card screen
- [x] Build Journey / Stats screen
- [x] Wire 2-tab bottom navigation
- [x] Wire stack navigation for category and card routes
- [x] Hide disabled Spicy content from navigation and screen reader reachability

Acceptance criteria:

- Users can pick any enabled category, draw cards, skip cards, and mark cards seen.
- Journey shows total cards drawn, current streak, sessions, favourite category, session timer, and deck progress.
- Back navigation is available on sub-screens.

## M6 — Content Controls And Privacy

Status: `[x]`

Goal: ship the Spicy visibility toggle, privacy and content-note screens, and store rating metadata. V1 intentionally has no age gate — deck content is suggestive but not explicit.

- [x] Add Spicy content visibility toggle
- [x] Add privacy screen copy
- [x] Add content note copy
- [x] Block direct route access to Spicy when disabled

Store rating metadata for App Store Connect and Google Play Console is filled at submission time and tracked under M8.

Acceptance criteria:

- Spicy content is hidden from Decks, Journey, and direct route access when `showSpicy` is false.
- Privacy copy clearly states no accounts, no backend, no analytics in V1, and local-only progress storage.
- Content note covers intimacy, vulnerability, conflict-sensitive prompts and the Spicy deck disclosure.
- Store rating metadata is filled at App Store Connect / Play Console submission in M8.

## M7 — Accessibility And Performance

Status: `[x]`

Goal: harden the app for real device use before release packaging.

- [x] Verify VoiceOver / TalkBack labels and state for card front and back
- [x] Verify dynamic type support
- [x] Verify reduced-motion fallback for card flip and transitions
- [x] Verify tap target sizes
- [x] Verify contrast across screens
- [x] Test launch time target under 2 seconds on mid-range devices
- [x] Test card flip at 60fps on iPhone 12 and equivalent Android
- [x] Test category grid for scroll jank

Acceptance criteria:

- Core flows are usable with screen readers.
- Motion-sensitive users get non-3D fades instead of flips.
- App performance meets the PRD launch criteria.

## M8 — Release Readiness

Status: `[ ]`

Goal: prepare Attune for public open-source release and app store submission.

- [x] Initialize git repository when ready
- [x] Publish GitHub repository
- [x] Confirm GPL-3.0 license
- [ ] Verify app name availability
- [x] Configure app icons and splash assets
- [x] Configure EAS builds
- [ ] Run iOS release candidate build
- [ ] Run Android release candidate build
- [ ] Complete App Store submission checklist
- [ ] Complete Google Play submission checklist

Acceptance criteria:

- Release candidates build successfully for both platforms.
- Store review requirements from the PRD are satisfied.
- The public repository includes source, license, and enough setup documentation for contributors.

## Later / V2

These are explicitly out of scope for V1 unless the plan changes.

- [ ] Partner pairing / shared session sync
- [ ] Avoided category insights
- [ ] Relationship milestone badges
- [ ] Pattern-based insights
- [ ] Custom card creation
- [ ] Analytics-backed retention metrics
- [ ] Revisit age gate / 18+ confirmation if explicit content is added to Spicy or a new explicit deck lands
