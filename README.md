# Attune

An open-source, offline couples card deck app for iOS and Android. Free APK direct from GitHub releases; $0.99 one-time on the App Store and Google Play. Private by design — no accounts, no backend, no analytics, no ads, no in-app purchases.

> "Make it easy for couples to have the conversations that matter."

## Status

V1 feature-complete through M7 (accessibility and performance). Release readiness (M8) in progress.

## Stack

Expo SDK 54, React Native 0.81, React 19, TypeScript (strict), Expo Router 6, AsyncStorage, Reanimated 4.

## Getting started

```bash
git clone https://github.com/attune-app/attune.git
cd attune
npm install
npx expo start
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS), or press `i`/`a` to open a simulator.

## Project structure

```
app/           Screen routes (Expo Router file-based navigation)
components/    Reusable UI components
data/          Card and category data
state/         Hooks and helpers for local persistence
theme/         Design tokens (colors, typography, spacing)
assets/        Fonts, icons, splash screen
```

## Documentation

- [`prd.md`](prd.md) — product requirements, V1 scope, goals
- [`techspec.md`](techspec.md) — architecture, data, dependencies
- [`designsystem.md`](designsystem.md) — visual language, motion, accessibility
- [`attune-cards.md`](attune-cards.md) — editorial source of truth for card copy
- [`milestones.md`](milestones.md) — roadmap and acceptance criteria

## License

GPL-3.0 — see [`LICENSE`](LICENSE).
