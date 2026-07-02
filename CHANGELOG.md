# Changelog

All notable changes to Attune are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

Initial V1 build-out. Nothing released yet; first tagged release will be `1.0.0`.

### Added

- Expo SDK 54 / React Native 0.81 app with Expo Router tabs: Decks and Journey.
- Dark, typographic theme: color tokens, Cormorant Garamond and Jost fonts,
  spacing and type scales.
- Component library: `CategoryTile`, `ProgressBar`, `PillBadge`, `StatCard`,
  `CardFlip` (3D flip with reduced-motion crossfade), category SVG glyphs.
- Card data pipeline: 200 cards generated from `attune-cards.md` into typed
  data with stable IDs and per-category totals (30/40/40/30/30/30), validated
  for duplicates, empty text, and invalid categories/levels/types.
- Six decks: Warmup, Connection, Depth, Intimacy, Challenges, Spicy.
- Local-first state on AsyncStorage: Fisher-Yates deck shuffle with no-repeat
  cycles surviving restart, session tracking with 30-minute staleness window,
  day-streak calculation from local calendar dates.
- Screens: Decks grid, Category detail with progress, Card draw with
  skip/next, Journey stats (draws, streak, sessions, per-deck progress).
- Spicy visibility toggle on Journey; hides the deck from lists, stats, and
  routes. Spicy is visible by default — V1 ships without an age gate.
- Privacy and Content Note screens.
- Accessibility: screen reader labels and roles, dynamic type support,
  reduced-motion fallbacks, WCAG AA text contrast, 44pt tap targets.
- Branding: flame-inside-rings icon and splash assets.
- Release infrastructure: GPL-3.0 license, EAS build profiles and submit
  targets for the two-channel distribution model ($0.99 store builds, free
  GitHub APK).

### Changed

- Renamed the Physical category to Intimacy.
- Dropped the planned first-launch age gate; Spicy deck content is suggestive,
  not explicit, and stays user-toggleable instead.
- Deduplicated internal state logic: shared Spicy route gate, deck
  initialization, card lookups, and session timer hooks.
