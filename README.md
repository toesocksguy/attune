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

This boots the Metro bundler and prints a QR code in the terminal.

### Run in Expo Go

[Expo Go](https://expo.dev/go) is the easiest way to run Attune on a physical
device — no native build required.

1. Install **Expo Go** from the [App Store](https://apps.apple.com/app/expo-go/id982107779)
   (iOS) or [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   (Android).
2. Start the dev server: `npx expo start` (or `npm start`).
3. Open the app:
   - **Android** — open Expo Go and scan the terminal QR code.
   - **iOS** — scan the QR code with the system Camera app; it deep-links into
     Expo Go.
4. Keep the phone and computer on the **same Wi-Fi network**. Behind a firewall
   or on separate networks, force a relay connection with `npx expo start --tunnel`.

The app hot-reloads on save. Press `r` in the terminal to reload manually, `m`
to toggle the dev menu, `j` to open the debugger.

### Run in a simulator

With the dev server running, press `i` for the iOS Simulator (macOS + Xcode) or
`a` for the Android emulator. Or launch directly with `npm run ios` / `npm run android`.

> **Note:** Attune uses Reanimated 4, which requires the React Native New
> Architecture. SDK 54's Expo Go ships it enabled, so animations run in Expo Go.
> A custom dev client is only needed if you add a native module Expo Go doesn't
> bundle.

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
