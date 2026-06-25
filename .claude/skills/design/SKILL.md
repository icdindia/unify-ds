---
name: design
description: Loads the linked DS's strict design rules + UX/HCI grounding before any design task. Invoke before generating, critiquing, or modifying any Figma frame, component, or screen. Triggers on requests like "design X", "build the Y page", "mock up Z", and any work against the canvas file.
---

# Design grounding skill

You are about to do design work for the linked DS. Four source documents are mandatory reading **before you touch Figma**:

1. **`ds/design-rules.md`** — strict rules from the user.
2. **`ds/production-layout-spec.md`** — the production layout pattern + component vocabulary studied from the on-canvas reference frames. This is the bar.
3. **`principles/hci-laws.md`** — UX/HCI laws and heuristics.
4. **`ds/product-context.md`** — what the product is, modules, customers, personas, sample data, voice.

Read all four at the start of every design task. They are short. Don't skip.

**Width**: production canvases are **1440** (per `ds/design-rules.md`). The refs in `production-layout-spec.md` were studied at 1728 (aspirational quality reference) — match the structural pattern + component vocabulary, render at 1440.

---

## Cardinal rules (condensed; full text in source files)

### Typography
- Display text: **Spectral**. Body text: **Geist**. Code text: **JetBrains Mono**.
- Size scale (pt): `Xxxs:10 · Xxs:11 · Xs:12 · Sm:13 · Md:15 · Lg:17 · Xl:20 · Display xs:24 · sm:30 · md:36 · lg:48 · xl:60 · 2xl:72`.
- Bind text by canonical Figma style name (e.g. `Text md/Semibold`). Never apply size/weight inline.

### Layout
- **1440px desktop, fill autolayout.** Every component on fill, autolayout honored end to end.
- Beyond 1440 — fluid design decision case by case.
- **Form section width: 720px.**
- **Breadcrumb → page header spacing: exactly 12px.** Breadcrumb height is fixed.

### Components
- Navigation bars: shared DS component only. Never recreate.
- Page headers follow heading hierarchy.
- Page sections start with proper form structure.
- All components are instances, not copies. No detached instances.

### Tokens & color
- Every color, spacing, radius, type style bound to a DS variable. No raw hex. No off-token spacing.
- Light/dark mode switching is automatic via semantic tokens — bind to semantic (`Semantic/Text/Primary`, etc.), never to a raw palette ramp position when a semantic exists.
- WCAG AA contrast minimum across both modes.

### DS compliance
- UI decisions strictly follow the DS: navigation styles, font sizes, icon sizes, icon stroke widths.
- **No arbitrary visual styles outside the system.** If a pattern doesn't exist in the DS, ask before inventing.

---

## UX/HCI grounding (full reference: principles/hci-laws.md)

Apply the laws as floors, not aesthetics. Most-used during design:

- **Von Restorff** — differentiate the single most important element. Don't dilute by highlighting many.
- **Hick's Law** — limit choices at decision points. Default selections, smart ordering, progressive disclosure.
- **Miller's Law** — group items in clusters of 5–7. Beyond that, progressive disclosure.
- **Fitts's Law** — frequently-used targets large and close; destructive actions far from common flows.
- **Proximity & Similarity** — group by spacing; same look = same behavior.
- **Aesthetic-Usability** — polish builds trust, but a beautiful broken flow erodes it sharper than an ugly one.
- **Type hierarchy** — each level differs in at least two attributes (size + weight, or weight + color).
- **WCAG AA** — 4.5:1 normal text, 3:1 large text and UI elements.

Full list (with correct/misapplication guidance per law) is in `principles/hci-laws.md`. Consult on every non-trivial decision.

---

## Self-critique before handoff

**Mandatory loop — never raise a design for review without it.**

After every build:
1. Capture: `get_metadata` + `get_design_context` on the new frame. If figma.com asset URLs are blocked (this env), fall back to metadata + design context only. If the user uploaded a screenshot directly, prefer that.
2. **Invoke `/design-critic`** on the captured output. Run the full structured critique (Context Read → Issues → What's Working → Priority Fix Order).
3. Apply every item in **Priority Fix Order**. Fixes go via `use_figma` (token-level changes) or a new v-next frame (structural changes).
4. If any fix is non-trivial, re-run the critique once.
5. Only after the critique has no Priority Fix items left, surface the design to the user.

Quick mental pass before invoking the critic (a pre-flight, not a substitute):

1. Does the primary action survive Von Restorff? Is there exactly one?
2. Do scan-pattern assumptions match the page type (F-pattern for content; spatial for daily-use)?
3. Contrast meets ≥ AA in both light and dark modes?
4. Every value (color, spacing, radius, type) bound to a DS variable?
5. Form section is 720px? Breadcrumb→header is 12px?
6. Components are instances of shared DS components?
7. Is any visual decision outside the DS? If yes, surface it.

If anything fails the mental pass, fix before invoking the critic (the critic should catch the second-order issues, not the obvious self-inflicted ones).

---

## Source files (always re-read at task start)

- `ds/design-rules.md` — the rules (authoritative)
- `principles/hci-laws.md` — the laws (deeper rationale)
- Canvas "Refs" Section 1 (`62124:246746` in the canvas file) — live visual reference at production fidelity
- `PLAYBOOK.md` — the broader operating contract
