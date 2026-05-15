# M0 Closeout — Planning Foundation

Date: 2026-05-13

## Scope Decision

V1 is ready to move into implementation planning and app scaffolding.

V1 includes:

- 200 cards across Warmup, Connection, Depth, Physical & Intimacy, Challenges, and Spicy
- Offline-only Expo app for iOS and Android
- Decks and Journey tab navigation
- Category detail and card draw flows
- Local stats, sessions, streaks, category progress, and persistent deck order
- First-launch age gate, Spicy visibility control, privacy copy, content note, and store rating metadata
- Dark typographic design system from `designsystem.md`
- Public open-source release with GPL-3.0 license

V1 excludes:

- Accounts, authentication, partner pairing, and cloud sync
- Backend services
- Analytics and third-party tracking
- Push notifications
- Ads, subscriptions, and in-app purchases
- Custom cards
- Social sharing
- V2 insights, badges, and retention metrics

## Implementation Decisions

- Card IDs should be globally unique numeric IDs from 1 to 200 in the order of `attune-cards.md`.
- Category slug values should be `warmup`, `connection`, `depth`, `physical`, `challenges`, and `spicy`.
- `attune-cards.md` remains the editorial source of truth until release; generated `data/cards.ts` should not become the editing source.
- The first implementation should scaffold the real Expo app at the repo root and keep `attune-design/` as reference prototypes.
- The Journey tab should own settings-adjacent entry points for V1: privacy/content screen and Spicy visibility toggle.
- Declining the age gate should lead to a static blocked state, not partial app access.
- Spicy content must be hidden from category lists, stats breakdown, route access, and screen reader traversal when disabled.
- Local persistence keys remain `@attune_stats`, `@attune_preferences`, and `@attune_decks`.
- Streaks should use local `YYYY-MM-DD` calendar dates, not UTC day boundaries.

## Remaining Planning Notes

These do not block M1, but they should be resolved before release readiness:

- Final app icon and splash screen direction
- Final privacy policy wording for store listings
- Final App Store and Google Play rating questionnaire answers
- App name availability in App Store Connect and Google Play Console
- Screenshot set and store listing copy

## Next Milestone

Start M1: Expo App Scaffold.
