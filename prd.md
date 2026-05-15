# Attune — Product Requirements Document
**Version 1.0 · May 2026**

---

## 1. Product Overview

Attune is an open-source couples card deck app for iOS and Android — free as a direct APK download from GitHub releases, and a $0.99 one-time purchase on the App Store and Google Play. It provides a digital version of the science-backed conversation card experience — a private, offline tool for couples to deepen connection through guided questions, shared activities, and intimate prompts.

---

## 2. Vision

> "Make it easy for couples to have the conversations that matter."

Attune removes friction from meaningful connection. No subscription. No data collection. No internet required. Just open the app, pick a deck, and talk.

---

## 3. Target Audience

- Couples at any relationship stage — new to long-term
- Adults 18+ (app is rated for mature content)
- Users who value privacy — no accounts, no cloud sync
- Couples seeking structure for intentional time together

---

## 4. Platform

- iOS and Android via Expo (React Native)
- Single codebase, cross-platform
- No backend — fully offline capable
- GPL-3.0 licensed, open source

---

## 5. Goals

### V1

| # | Goal |
|---|------|
| G1 | Deliver all 200 cards across 6 categories with card flip animation |
| G2 | Persist stats locally: streak, sessions, cards drawn, category progress |
| G3 | Polished dark purple UI matching approved design system |
| G4 | Include age gate, adult-content controls, and privacy copy required for store review |
| G5 | Publish to App Store and Google Play as $0.99 one-time purchase; release free APK from GitHub |
| G6 | Open source repository on GitHub with GPL-3.0 license |

### Non-Goals — V1

- No user accounts or authentication
- No cloud sync or partner pairing
- No push notifications
- No in-app purchases or ads
- No custom card creation
- No social sharing features

### V2 Planned

- Partner pairing / shared session sync
- Avoided category insights
- Relationship milestone badges
- Pattern-based insights (e.g. day-of-week tendencies)
- Custom card creation

---

## 6. Features & Functional Requirements

### 6.1 Home Screen

- Display app name and greeting (time-of-day aware)
- Show streak pill and session time pill
- Display enabled category tiles in 2-column grid
- Each tile shows: emoji, name, X of Y seen, progress bar
- Each tile uses its unique category color accent
- Tap tile navigates to Category Detail screen
- Spicy tile is hidden until age confirmation is complete and the Spicy content toggle is enabled

### 6.2 Category Detail Screen

- Back navigation to Home
- Category emoji, name, description
- Progress block: bar, fraction, cards remaining
- Draw a Card CTA button
- Button navigates to Card screen with category context

### 6.3 Card Screen

- Header: back button, category label, card counter (X of Y)
- Card renders face-down on entry
- Tap card triggers 3D flip animation (Y-axis, 650ms)
- Card face shows: Attune wordmark, category, "tap to reveal" hint
- Card back shows: category label, question/prompt text
- Skip button: advances without counting as "seen"
- Next Card button: advances, marks card as seen, increments counter
- Cards drawn from persistent shuffled pool, no repeats until deck exhausted
- Deck state survives app restart so users do not see repeats from the same deck cycle
- Deck reshuffles automatically when exhausted and starts a new cycle

### 6.4 Stats / Journey Screen

- Total cards drawn (lifetime)
- Current streak (consecutive days app opened)
- Total sessions
- Favourite category (most cards drawn from)
- Session timer (active session duration)
- Deck progress: enabled categories with % seen and progress bar

### 6.5 Card Data

- 200 cards total across 6 categories
- `attune-cards.md` is the editorial source of truth for V1 content
- App implementation converts card content into a local TypeScript data file
- Card shape: `id`, `category`, `level`, `type`, `text`
- Types: `question`, `activity`, `dare`
- Card IDs are stable and category-scoped or globally unique; they must not change after release unless a migration is added

### 6.6 First Launch / Adult Content

- First launch displays an age confirmation screen before deck access
- User must confirm they are 18+ to continue
- Age confirmation is stored locally only
- Spicy deck is hidden until age confirmation is complete
- Settings include a local-only toggle to hide or show Spicy content after onboarding
- The app includes a plain-language privacy screen stating that Attune has no accounts, no backend, no analytics in V1, and stores progress only on the device
- The app includes a short content note: prompts may include intimacy, sexuality, conflict, and emotionally sensitive topics

---

## 7. Card Categories

| Emoji | Category | Cards | Type | Focus |
|-------|----------|-------|------|-------|
| 🌱 | Warmup | 30 | Questions | Low-stakes icebreakers, playful openers |
| 💬 | Connection | 40 | Questions | Progressive self-disclosure, emotional intimacy |
| 🌊 | Depth | 40 | Questions | Values, conflict, futures, unsaid things |
| 🔥 | Physical & Intimacy | 30 | Questions | Intimacy conversations, physical connection |
| 🎯 | Challenges | 30 | Activities | Things couples do together in the moment |
| 💑 | Spicy | 30 | Dares | Romantic and intimate dares, 18+ |

### Scientific Basis

Card content is informed by:

- **Dr. Arthur Aron (1997)** — 36 Questions / reciprocal self-disclosure study. Warmup and Connection decks draw from this framework.
- **Dr. John & Julie Gottman** — Love Maps, emotional bids, Four Horsemen research. Depth deck structure informed by this work.
- **Dr. Brené Brown** — vulnerability and emotional intimacy frameworks.
- **Masters & Johnson** — sensate focus technique informs Physical and Challenges decks.

All card text is original — no verbatim reproduction of copyrighted material.

---

## 8. UX & Design Requirements

### Design Principles

- **Intentional** — every element has purpose, no decorative clutter
- **Intimate** — feels like a private space, not a public app
- **Calm** — dark theme reduces stimulation, encourages presence
- **Premium** — typography and motion signal quality without cost

### Navigation

- 2-tab bottom nav: Decks and Journey
- Stack navigation within each tab
- No hamburger menus, no drawers
- Back button always visible on sub-screens

### Accessibility

- Minimum tap target 44×44pt
- Text contrast ratio 4.5:1 minimum
- Support system font size scaling
- VoiceOver / TalkBack compatible card flip
- Respect reduced-motion settings by replacing card flip and screen transitions with non-3D fades
- Card front and back expose clear accessibility labels and state, including whether the card is revealed
- Hidden Spicy content is not reachable by screen reader navigation when disabled

### Performance

- App launch under 2 seconds on mid-range devices
- Card flip animation 60fps
- No jank on category grid scroll

---

## 9. Success Metrics

### V1 Launch Criteria

1. All 200 cards render correctly across iOS and Android
2. Card flip animation smooth on iPhone 12 and equivalent Android
3. Stats persist correctly across app restarts
4. Deck order persists across app restarts with no repeats until deck exhaustion
5. Streaks are calculated using the user's local calendar date
6. Age gate, Spicy content toggle, privacy screen, and store rating metadata are present
7. App passes App Store and Google Play review
8. No crashes on core user flows in testing

### Post-Launch Metrics (V2, if analytics added)

- Cards drawn per session
- Category distribution — which decks are most used
- Retention — D7 and D30
- Average session length

---

## 10. Risks & Assumptions

| Type | Item | Mitigation |
|------|------|------------|
| Assumption | Users play together on one device | Design for shared screen — large text, visible from distance |
| Assumption | $0.99 store price offsets developer account fees without deterring buyers; free APK preserves an accessible path | Direct APK distribution from GitHub releases guarantees a free option; GPL-3.0 permits redistribution (derivatives must remain GPL-3.0) |
| Risk | App Store rejection for adult content | Age gate on launch, Spicy content toggle, explicit store rating metadata, privacy/content notes |
| Risk | Name "Attune" taken before submission | Verify in App Store Connect before building |
| Risk | Deck repeats after restart feel broken | Persist per-category deck order, draw pointer, and cycle count locally |
| Risk | Streak bugs around timezone changes | Store and compare local calendar dates, not UTC-only timestamps |

---

*Attune · Product Requirements Document · v1.0*
