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

Status: `[ ]`

Goal: create the real Expo/React Native app structure that will replace the browser mockups as the implementation target.

- [ ] Initialize Expo SDK 51+ app
- [ ] Enable TypeScript strict mode
- [ ] Add Expo Router file structure
- [ ] Add base app tabs: Decks and Journey
- [ ] Add app config, EAS config, and GPL-3.0 license
- [ ] Install required dependencies: AsyncStorage, Reanimated, expo-font, icons

Acceptance criteria:

- App launches on iOS and Android development targets.
- Project structure matches the shape defined in `techspec.md`.
- Browser prototypes remain available as references, not production code.

## M2 — Theme And Components

Status: `[ ]`

Goal: translate the approved Attune design system into reusable React Native theme tokens and components.

- [ ] Implement `theme/colors.ts`
- [ ] Implement `theme/typography.ts`
- [ ] Implement `theme/spacing.ts`
- [ ] Add Cormorant Garamond and Jost font assets
- [ ] Build `ProgressBar`
- [ ] Build `PillBadge`
- [ ] Build `CategoryTile`
- [ ] Build `StatCard`
- [ ] Build `CardFlip`

Acceptance criteria:

- Components match `designsystem.md` tokens and sizing.
- Touch targets meet the 44pt minimum.
- Text contrast meets the 4.5:1 requirement.
- Reduced-motion behavior is planned or implemented for animated components.

## M3 — Card Data Pipeline

Status: `[ ]`

Goal: convert the editorial card deck into typed app data with validation.

- [ ] Define card category and card type models
- [ ] Convert `attune-cards.md` into `data/cards.ts`
- [ ] Create `data/categories.ts`
- [ ] Preserve stable IDs and category totals
- [ ] Add validation for totals, duplicate IDs, empty text, categories, levels, and types

Acceptance criteria:

- All 200 cards are represented in app data.
- Category totals are 30 / 40 / 40 / 30 / 30 / 30.
- Validation catches malformed or incomplete card data.

## M4 — Local State Core

Status: `[ ]`

Goal: implement local-only persistence for preferences, sessions, streaks, stats, and deck draw order.

- [ ] Build `usePreferences`
- [ ] Build `useStats`
- [ ] Build `useSession`
- [ ] Build `useDeck`
- [ ] Persist stats under `@attune_stats`
- [ ] Persist preferences under `@attune_preferences`
- [ ] Persist deck state under `@attune_decks`
- [ ] Add streak tests for local dates, month boundaries, year boundaries, and daylight saving transitions
- [ ] Add deck tests for skip, next, exhaustion, reshuffle, and restart persistence

Acceptance criteria:

- No user accounts, backend, cloud sync, or analytics are introduced.
- Decks do not repeat within a cycle, even after app restart.
- Streaks use local calendar dates rather than UTC-only timestamps.

## M5 — Core Screens

Status: `[ ]`

Goal: implement the primary user journey from choosing a deck to drawing cards and viewing progress.

- [ ] Build Home / Decks screen
- [ ] Build Category Detail screen
- [ ] Build Card screen
- [ ] Build Journey / Stats screen
- [ ] Wire 2-tab bottom navigation
- [ ] Wire stack navigation for category and card routes
- [ ] Hide disabled Spicy content from navigation and screen reader reachability

Acceptance criteria:

- Users can pick any enabled category, draw cards, skip cards, and mark cards seen.
- Journey shows total cards drawn, current streak, sessions, favourite category, session timer, and deck progress.
- Back navigation is available on sub-screens.

## M6 — Adult Content And Privacy

Status: `[ ]`

Goal: meet the age gate, content control, privacy, and store review requirements for mature content.

- [ ] Build first-launch age confirmation
- [ ] Persist age confirmation locally
- [ ] Add Spicy content visibility toggle
- [ ] Add privacy screen copy
- [ ] Add content note copy
- [ ] Add store rating metadata
- [ ] Block direct route access to Spicy when disabled

Acceptance criteria:

- Spicy content is hidden until age confirmation and local preference allow it.
- Privacy copy clearly states no accounts, no backend, no analytics in V1, and local-only progress storage.
- Mature content requirements are represented in app metadata and in-app controls.

## M7 — Accessibility And Performance

Status: `[ ]`

Goal: harden the app for real device use before release packaging.

- [ ] Verify VoiceOver / TalkBack labels and state for card front and back
- [ ] Verify dynamic type support
- [ ] Verify reduced-motion fallback for card flip and transitions
- [ ] Verify tap target sizes
- [ ] Verify contrast across screens
- [ ] Test launch time target under 2 seconds on mid-range devices
- [ ] Test card flip at 60fps on iPhone 12 and equivalent Android
- [ ] Test category grid for scroll jank

Acceptance criteria:

- Core flows are usable with screen readers.
- Motion-sensitive users get non-3D fades instead of flips.
- App performance meets the PRD launch criteria.

## M8 — Release Readiness

Status: `[ ]`

Goal: prepare Attune for public open-source release and app store submission.

- [ ] Initialize git repository when ready
- [ ] Publish GitHub repository
- [ ] Confirm GPL-3.0 license
- [ ] Verify app name availability
- [ ] Configure app icons and splash assets
- [ ] Configure EAS builds
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
