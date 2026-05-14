---
name: attune-docs-check
description: Cross-check attune source-of-truth docs (prd.md, techspec.md, designsystem.md, attune-cards.md) before edits to keep changes scoped to V1 goals and the approved design system. Trigger when starting any non-trivial change to attune code, mockups, or card data, or when the user says "check the docs", "stay in scope", or "before you edit".
---

# /attune-docs-check

Re-anchor on attune's source-of-truth docs before editing, so changes stay inside V1 scope and the approved design vocabulary.

## Steps

1. Read the docs relevant to the change:
   - Product question → `prd.md`
   - Stack / data / architecture → `techspec.md`
   - Visual / motion / accessibility → `designsystem.md`
   - Card copy / IDs / categories → `attune-cards.md`
2. Note any constraints that bound the requested change: V1 scope, local-first privacy (no accounts, backend, analytics, sync, ads, or IAP), accessibility minima (44pt taps, 4.5:1 contrast, reduced-motion fallbacks), and the existing vocabulary (Decks, Journey, Warmup, Connection, Depth, Physical & Intimacy, Challenges, Spicy).
3. If the requested change conflicts with a constraint, say so before editing and propose a scoped alternative.
4. Done-and-correct check: every edit traces to a doc-supported decision; card data preserves stable IDs and category totals; no new visual direction introduced.
