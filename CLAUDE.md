# AGENTS.md

<about_project>
- Attune is a free, open-source, offline couples card deck app for iOS and Android.
- The intended stack is Expo SDK 51+, React Native, TypeScript strict mode, Expo Router, AsyncStorage, and Reanimated 3.
- Product truth lives in `prd.md`; technical direction lives in `techspec.md`; visual direction lives in `designsystem.md`; card copy lives in `attune-cards.md`.
- Current mockups live under `attune-design/` and are React-in-browser HTML prototypes, not the final Expo app.
</about_project>

<behavior>
- If the user asks for observations, review, or a proposal, do not edit files until they explicitly ask for changes.
- If the user says not to worry about git, do not block on missing git history or repo initialization.
- When unsure, make the smallest reasonable assumption and call it out.
- When you disagree with the approach, say so plainly and explain the tradeoff before changing direction.
</behavior>

<workflow>
- Before implementation work, read the relevant source-of-truth docs listed above.
- Keep edits scoped to Attune's V1 goals unless the user explicitly asks for V2 exploration.
- Preserve the local-first privacy model: no accounts, backend, analytics, cloud sync, ads, or purchases in V1.
- Treat `attune-cards.md` as editorial source of truth; generated card data must preserve stable IDs and category totals.
</workflow>

<design>
- Match the approved dark, intimate, typographic design system rather than introducing a new visual direction.
- Preserve accessibility requirements: 44pt tap targets, 4.5:1 text contrast, screen reader reachability rules, and reduced-motion fallbacks.
- Use Attune's existing vocabulary: Decks, Journey, Warmup, Connection, Depth, Physical & Intimacy, Challenges, and Spicy.
</design>
