# DS Config — _TBD_

DS-specific configuration. Swapping this folder retargets the workflow to a different design system. Keep all DS-specific facts here; the generic `PLAYBOOK.md` at the repo root references this file.

---

## Identity
- **DS name**: _TBD_
- **Owner**: _TBD_
- **Product context**: see `ds/product-context.md`
- **Status**: _TBD_

## Figma
- **Canvas file (output)**: _TBD — URL_
  - File key: _TBD_
  - All generative work lands here. **Confirm the DS library + variables + styles are linked** in Figma → Assets → Manage libraries.
- **DS source file (reference, read-only)**: _TBD — URL_
  - File key: _TBD_
  - Source of truth for components. Never written to. Use `use_figma` here to read `node.key` for any component we need to import into the canvas.
- **Team ID**: _TBD_
- **Branching policy**: main file only (see PLAYBOOK §12)

## Pre-design probe (mandatory)

Before any `use_figma` write on the canvas, run a probe pass to import all needed library assets by key. See `scripts/probe-keys.md` for the full playbook.

Build the lookup table FIRST, then compose. Going straight to building is the bug.

## Token source

- **Local source of truth for token values**: `ds/tokens/*.json` — staged via `scripts/stage-tokens.sh` from Figma variable plugin exports. Updated frequently. Never round-trip to Figma for token values.

## Domain & content

See `ds/product-context.md`. Update with product specifics before first design.

## Brand voice

See `ds/product-context.md` → voice section.

## Default deliverable

- **Breakpoint**: _TBD — typically 1440px desktop_
- **A11y bar**: WCAG AA contrast minimum. DS focus-ring tokens for focus states.

## Core component list

User-designated. Populated in `ds/components.md` with `role: core`. Anything not marked core is composable freely (see PLAYBOOK §5).

## Code Connect

- **Status**: _TBD — confirm whether the DS has Code Connect mappings_
- **Required on output**: _TBD_
