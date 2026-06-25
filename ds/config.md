# DS Config — Unify2026

DS-specific configuration. Swapping this folder retargets the workflow to a different design system. Keep all DS-specific facts here; the generic `PLAYBOOK.md` at the repo root references this file.

---

## Identity
- **DS name**: Unify2026 Design System
- **Owner**: Itu Chaudhuri Design (ICD), for UnifyApps
- **Product context**: see `ds/product-context.md`
- **Status**: Active — retargeted from template 2026-06-25

## Figma
- **Canvas file (output)**: https://www.figma.com/design/jcbxvaNrZCWeQsIiZRta6F/UnifyApps-Platform-2026
  - File key: `jcbxvaNrZCWeQsIiZRta6F`
  - All generative work lands here. **Confirm the DS library + variables + styles are linked** in Figma → Assets → Manage libraries.
- **DS source file (reference, read-only)**: https://www.figma.com/design/qT9zH1YYapGTwpJxwNEGzt/%E2%9D%96-Unify2026-Design-System
  - File key: `qT9zH1YYapGTwpJxwNEGzt`
  - Source of truth for components. Never written to. Use `use_figma` here to read `node.key` for any component we need to import into the canvas.
- **Team**: ICD (`team::972060636767846830`)
- **Branching policy**: main file only (see PLAYBOOK §12)

## Pre-design probe (mandatory)

Before any `use_figma` write on the canvas, run a probe pass to import all needed library assets by key. See `scripts/probe-keys.md` for the full playbook.

Build the lookup table FIRST, then compose. Going straight to building is the bug.

## Token source

- **Local source of truth for token values**: `ds/tokens/*.json` — staged from the Figma variables export (`unify2026_export_*.json`, a combined DTCG dump of 7 collections: `_Primitives`, `1. Colors`, `2. Radius`, `3. Spacing`, `4. Widths`, `5. Containers`, `5. Fonts`). The export is slimmed into the resolver shape (hex / alias / px) on staging. Updated frequently. Never round-trip to Figma for token values.
- **Staged files**: `colors.json` (palette hex), `semantic.json` (Light + Dark mode aliases), `spacing.json` (px), `radius.json` (px). `typography.json` is curated from a DS probe (the Fonts collection only carries font families).
- **Resolver**: `ds/tokens/_resolver.sh` — single entry point for all lookups.

## Domain & content

See `ds/product-context.md`. UnifyApps — "Enterprise Operating System for AI." 5 modules: Applications, AI Agents, Integrations, Data, Automations.

## Brand voice

See `ds/product-context.md` → voice section. Enterprise-confident, concrete over abstract, AI-native vocabulary, active voice, no exclamation marks in product UI.

## Default deliverable

- **Breakpoint**: 1440px desktop (per `ds/design-rules.md`).
- **Form section width**: 720px.
- **A11y bar**: WCAG AA contrast minimum. DS focus-ring tokens for focus states.

## Core component list

User-designated. Populated in `ds/components.md` with `role: core`. Anything not marked core is composable freely (see PLAYBOOK §5).

## Code Connect

- **Status**: Not used in this DS (per PLAYBOOK §6).
- **Required on output**: No.
