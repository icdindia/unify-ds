# PLAYBOOK — DS Design Workflow

Permanent operating instructions for Claude Code when producing dev-ready Figma designs against the linked design system. Survives session resets. Update when the workflow changes; don't bypass.

This file is generic; DS-specific facts live in `ds/`. The `template` branch ships this file unchanged.

---

## 1. Purpose

Reduce manual design work by handing creative direction to Claude Code. Output is dev-ready Figma frames consumed by engineers in dev mode (styles + components resolvable, no detached layers, no guesswork). Zero margin for spec drift, zero lorem ipsum.

---

## 2. Inputs

Tasks arrive in any of these forms — whatever is needed for the brief:
- Screenshots
- Figma URLs (component links, reference frames)
- Written requirement description
- A mix of the above

Ticketing is future scope. Until then, briefs land in chat.

---

## 3. Target Figma file

See `ds/config.md` → Figma section for the target file URL and IDs. All output lives in that file unless explicitly told otherwise.

---

## 4. Naming convention (scalable)

| Layer | Format | Example |
|---|---|---|
| Page | `[Domain] / [Feature]` | `Billing / Invoices` |
| Frame | `[Screen] — [State]` | `Invoice list — Empty` |
| Local component | `Local / [Feature] / [Component]` | `Local / Billing / InvoiceRow` |
| Specs (when annotations needed) | mirror under a `Specs` page | `Specs / Billing / Invoices` |

Avoid version suffixes in names — use Figma's native version history.

---

## 5. Component model

- **Core components** (the ones logged in `ds/components.md`): used as-is. No structural changes, no detaching, no overrides outside exposed variants/props. Pick the right variant; never recreate.
- **Non-core compositions**: created freely without relying on a specific DS component, **but must follow DS specs and standards** — tokens for color/spacing/radius/typography, auto-layout, WCAG AA, type hierarchy, all the rules in `ds/design-rules.md` and `principles/hci-laws.md`. Designer freedom on widths/shadows/blurs (per §8).
- **Local components**: create one when a non-core composition repeats within a feature. Name as `Local / [Feature] / [Component]`. Flag creation in chat with one line.

All components used (core or local) are logged in `ds/components.md` so they're findable without parsing the full DS.

---

## 6. Deliverable bar (zero-margin definition)

**Strict rules apply.** `ds/design-rules.md` is authoritative and overrides any softer language below. The canvas "Refs" Section 1 (`62124:246746` in the canvas file) is the live reference for production quality — pull from there when you need to study a screen.

Every frame must meet all of the below before handoff:

- **Breakpoint**: 1440px desktop, fill autolayout. Beyond 1440 — make a fluid-design decision case by case (per `ds/design-rules.md`). Other widths only on explicit request.
- **Form section width**: 720px (per `ds/design-rules.md`).
- **Breadcrumb → page header spacing**: 12px exactly. Breadcrumb height is fixed.
- **States**: whatever the requirement doc specifies (no default coverage assumption — read the brief).
- **Layout**: auto-layout everywhere. No absolute positioning hacks.
- **Instances**: component instances, not copies. No detached instances. Navigation bars must use the shared DS component (per `ds/design-rules.md`).
- **Tokens**: every color, spacing, radius, type style bound to a DS variable. No raw hex, no off-token spacing. No arbitrary visual styles outside the system (per `ds/design-rules.md` → "Design System Compliance").
- **Page headers**: follow heading hierarchy. Page sections start with proper form structure.
- **Code Connect**: not used in this DS. Skip — don't attempt to add mappings.
- **Mode**: design in **light mode** by default. Dark-mode rendering is **not** a required deliverable — the DS's semantic-variable mapping handles the switch automatically. Only render dark mode when a brief explicitly asks for it (e.g., side-by-side comparison, marketing screenshot).
- **Accessibility**: WCAG AA minimum. Focus states use the DS focus-ring tokens. Tab order implied by layout order. Since dark-mode renders automatically via tokens, contrast must hold in both modes — verify by mentally inverting semantic roles, or render dark to spot-check when in doubt.
- **Annotations**: minimum viable. Only where behavior can't be inferred (a11y intent, non-obvious interaction, conditional logic). Default to none.

---

## 7. Domain & content

Product context lives in `ds/product-context.md` — what the product does, modules, customers, personas, sample data conventions, voice. Read at the start of every brief that touches user-facing copy. DS-specific config (Figma file URL, defaults) is in `ds/config.md`. Apply both on every task. Two non-negotiables that hold across DSes:

- **No lorem ipsum.** Ever. Copy reflects the domain set in `ds/config.md`.
- **No AI-generated imagery.** Placeholders only (Figma fills or DS icon library).

---

## 8. Token economy

Token category files live under `ds/tokens/` as JSON mirrors of the Figma variable structure. Look up locally; never round-trip to Figma for token values.

**Single entry point: `ds/tokens/_resolver.sh`.** Wraps the three alias conventions across the JSON files in one place. Use this for any lookup — don't write per-file jq in agent reasoning if the resolver can do it.

**Hard rule: never `Read` the raw JSON files into context.** The resolver returns single values (hex, px, style object). Reading a token file in full burns tokens for no gain — every legitimate lookup fits in one resolver call. The only exceptions are (a) inspecting structure after a fresh Figma re-export, (b) running `_resolver.sh --test`, (c) writing/debugging the resolver itself.

**Figma Plugin API reference**: `principles/figma-plugin-api.md` documents how to verify library access, list/import variables, bind values, import components, handle autolayout sizing, and load fonts. Read it before any `use_figma` write.

**Captured Figma keys**: `ds/figma-keys.md` holds variable collection names + component variant keys captured from the DS file (qT9zH1YYapGTwpJxwNEGzt). Saves a DS-file probe round-trip when re-using known components.

```
ds/tokens/_resolver.sh "{Palette.Brand.600}"             # -> #0f2805
ds/tokens/_resolver.sh "{spacing-md}"                    # -> 8
ds/tokens/_resolver.sh "{radius-md}"                     # -> 8
ds/tokens/_resolver.sh "Text md/Semibold"                # -> {family, weight, size, …}
ds/tokens/_resolver.sh "Button-md"                       # alias -> style
ds/tokens/_resolver.sh --semantic "text-primary (900)"   # both modes -> hex
ds/tokens/_resolver.sh --semantic "text-primary (900)" --mode dark
ds/tokens/_resolver.sh --test                            # sanity checks
```

The resolver chases aliases recursively (semantic role → palette alias → hex). It only READS the JSON files — Figma remains the source of truth and the files are never hand-edited.

The underlying files (described for reference; prefer the resolver for lookups):

- **Color palette**: `ds/tokens/colors.json` — Figma path → hex (e.g. `Palette / Brand / 500` → `#4e582d`). Authoritative for all color values. Use to pick the Figma variable path when applying fills/strokes in `use_figma` — never call `search_design_system` for color styles.
- **Semantic colors**: `ds/tokens/semantic.json` — full Figma export with both Light mode and Dark mode resolutions, slimmed to alias-only per leaf. Shape: `."1. Colors".modes.["Light mode" | "Dark mode"].["Colors" | "Component"].<group>.<token>`. Each leaf is the alias string directly (e.g. `{Palette.Gray (light mode).900}`, dot notation). Resolve to hex by walking `colors.json`. **Prefer semantic over raw palette** for any role that has a semantic name. Bind in Figma to the variable matching the export path (e.g. `Colors / Text / text-primary (900)`) — mode switching is handled at the Figma variable layer.
- **Typography**: `ds/tokens/typography.json` — flat catalog of text styles keyed by Figma name (e.g. `Display 2xl/Regular`, `Text md/Semibold`). Bind text by canonical style name; never apply size/weight inline. Button-* keys in `aliases` map to underlying Text styles.
- **Spacing**: `ds/tokens/spacing.json` — base scale (`spacing-none` … `spacing-11xl`) plus component-specific entries (Buttons, Input Menu Items, …). Values are px. Component entries reference base tokens via `{token-name}` aliases — resolve by looking up the bare key under `Spacing.Base`.
- **Radius**: `ds/tokens/radius.json` — base scale (`radius-none` … `radius-4xl`, plus `radius-full = 9999`). Values are px. Note `md`/`lg`/`xl`/`2xl` are all 8px (intentional; the system tightens at higher tiers).
- **Icons**: `ds/icons.md` — icon name list. Pick by name; never invent icon names or fetch the full library from Figma.

**Designer's-freedom categories** (no JSON mirror — use judgment, anchored by `ds/design-rules.md` and `principles/hci-laws.md`):

- **Widths**: design-rules already fixes the page (1440px desktop) and form (720px). Component-level widths are free judgment.
- **Shadows / elevation**: pick consistent elevation tiers per surface type. Don't invent a new tier every screen.
- **Backdrop blurs**: use sparingly — overlays, modals, popovers. Default to a single blur value across a feature.

If a brief specifically requires a fixed shadow/blur/width token, ask before improvising — the freedom doesn't extend to overriding stated requirements.

**Component retrieval strategy** (combination):
  - Primary: user supplies direct Figma node IDs / links in the brief.
  - Supplementary: targeted `search_design_system` queries via the Figma MCP for specific components.
  - Local manifest: `ds/components.md` — populated incrementally as components are used. Lookup index, not a copy.

**Never** parse the full DS in one shot. Pull only what the task needs.

---

## 9. Autonomy thresholds

| Decision | Default |
|---|---|
| Color pick within a designated utility ramp | Proceed silently |
| Spacing/radius pick within the token scale | Proceed silently |
| Creating a local component | One-line flag in chat at creation |
| Information architecture / flow ordering | **Ask before deciding** |
| Copy phrasing | Proceed, paste samples in chat for scan |
| Net-new pattern (not in DS, not a local component) | **Ask before deciding** |
| Departure from a core component's intended use | **Ask before deciding** |

---

## 10. Decision logging

Judgment calls are flagged in chat at the moment they're made. No separate decision log file. If a decision is permanent enough to change defaults, update this playbook.

---

## 11. Review loop

Feedback comes via chat. Not Figma comments, not GitHub issues. I push changes in Figma and confirm in chat with a short summary of what changed.

---

## 12. Branching

Main file only. No Figma branches for now. Revisit if devs start consuming production specs from this file live and WIP screens would confuse them.

---

## 13. Operating principles

- **Efficiency**: minimal token use. No re-parsing of files I've already seen. No exploratory dumps of the DS.
- **Output integrity**: a deliverable either meets the bar in section 6 or it isn't handed off.
- **Taste under constraint**: I bring design taste only where the brief leaves room. The DS and the brief always win over preference.
- **Flag, don't guess**: when the brief is ambiguous, ask once with a specific question, not a generic "what do you mean."

## 14. UX & HCI grounding

`principles/hci-laws.md` is the doc the design rules require 100% adherence to (referenced via the `/design` skill at `.claude/skills/design/SKILL.md`). Every design decision is checked against it before handoff. Use it for:

- **Pre-design grounding**: when planning layout, hierarchy, and interaction, default to the relevant laws (Fitts, Hick, Miller, proximity, similarity, common region, type hierarchy).
- **Self-critique**: before flagging a deliverable as done, run a quick mental pass — does the primary action survive Von Restorff? Does the scan pattern match the page type? Is contrast ≥ WCAG AA? Is complexity surfaced or hidden (Tesler)?
- **Justifying judgment calls in chat**: when I flag a call, name the principle that drove it. "Moving the destructive action to the right end of the toolbar — Fitts + Hick" beats "I felt it looked better."

These laws are floors, not aesthetics. They're the minimum bar; brand voice and DS conventions sit on top.

---

## 15. Resolved decisions (audit trail)

Past conflicts and how they were resolved, kept for reference. Once a decision lands here, it's authoritative — don't relitigate.

- **Typography size scale (resolved):** Canonical scale is `Xxxs:10 · Xxs:11 · Xs:12 · Sm:13 · Md:15 · Lg:17 · Xl:20 · Display xs:24 · sm:30 · md:36 · lg:48 · xl:60 · 2xl:72` (pt). `ds/tokens/typography.json` already reflects this from Figma's applied styles; `ds/design-rules.md` was corrected (Md was incorrectly listed as 17pt and Lg was missing).
- **"Spectral" (resolved):** Display family is **Spectral**, not "Spectral Sans" (typo in original rules doc, now corrected).
- **Design skill (resolved):** `.claude/skills/design/SKILL.md` is the unified skill loading `ds/design-rules.md` + `principles/hci-laws.md`. Invoke `/design` before any Figma design task. The "Skill.md" reference in design-rules.md now points here.
- **Dark/light mode (resolved):** `ds/tokens/semantic.json` is now the **full Figma export** of the semantic-variable collection (`_Primitives`), preserving the native shape with `Light mode` / `Dark mode` modes side by side. This **supersedes** the earlier handcrafted version that inferred dark aliases from convention — the real export revealed errors in the inference (e.g., `text-secondary` dark actually binds to the `Gray (dark mode alpha)` layer, not the raw ramp). The export is authoritative; do not hand-edit individual entries.
