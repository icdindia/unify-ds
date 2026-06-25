# DESIGN RULES — _TBD_

Working agreement between the designer and Claude (assembly). These are the constraints that keep every screen feeling consistent. They are not preferences — they are the rules. When a rule clearly serves the user better when broken, flag it in the build summary and update this file together.

This file is composition + aesthetics. Token values live in `ds/tokens/`. The typography scale is in `ds/tokens/typography.json` — rules here reference style names (e.g. `Display sm`, `Text md/Semibold`) which resolve there.

> **Template note**: this file is a scaffold. On a new DS, replace the placeholders with the design system's specifics. The structure (10–11 sections covering aesthetic intent → page composition → screen title pattern → form composition → component choice → docs panel → footer → sidebar → what-we-don't-do → hand-off → padding-and-headers-by-case) is generic and worth keeping; the specifics are DS-specific.

---

## 1. Aesthetic intent

_TBD — one-paragraph statement of the design system's character. E.g. "warm editorial, not techy SaaS" or "minimal industrial". List 3–5 specific principles that follow from it._

---

## 2. Page composition

- **Page background**: _TBD_
- **Card surface**: _TBD_
- **Card padding**: _TBD_
- **Gap between sibling cards**: _TBD_
- **Page padding**: _TBD_
- **Default width**: _TBD_

---

## 3. Screen title pattern

_TBD — every screen anchors with the same construct. Describe the pattern (breadcrumb, identity row with logo + eyebrow + title, optional status pill)._

---

## 4. Form composition

_TBD — how forms are grouped (thematic cards), title + description treatment, divider, field stack rules, required-field affordance, helper text._

---

## 5. Component choice rules

| Use… | When… |
| --- | --- |
| _TBD_ | _TBD_ |

---

## 6. Right-rail docs panel (template)

_TBD — when a screen has a docs / setup task, this is the canonical structure. Or remove this section if the DS doesn't have a docs-panel pattern._

---

## 7. Footer rules

_TBD_

---

## 8. Sidebar nav rules

_TBD_

---

## 9. What we don't do

- _TBD_

---

## 10. Hand-off mechanics

When Claude builds a screen, it:

- Re-reads this file at the start of every new screen.
- Flags any rule that had to be broken in the build summary, with reasoning.
- Names new screens, frames, and cards descriptively (e.g. `[Product] — [Feature]`, not `Frame 23`).
- Returns all created node IDs so the human can navigate and intervene without hunting.

This file is updated by editing it directly with the human in the loop. Claude proposes changes in chat; human accepts before they're written.

---

## 11. Page padding & header composition (by case)

These rules **refine and override §2 page padding** for the breadcrumb pattern. When a screen uses a breadcrumb, these take precedence; the §2 rule applies only to screens without a breadcrumb header strip.

### Breadcrumb presence determines top padding

- **Breadcrumbs present** → page container top padding: _TBD (typically 0 — breadcrumb flush)_
- **Breadcrumbs absent** → page container top padding: _TBD (typically `spacing-xl` / 16px)_
- **The breadcrumb component itself**: left and right padding always 0 (flush to layout edge).

### Page header — two cases

**Case A — breadcrumbs present**
- Gap between breadcrumb row and page header: _TBD_
- Header left padding / right padding: _TBD_
- Header **must include a back-button icon as the first child** (use DS Small Icon Button with `arrow-left` icon — or whatever the back affordance is in this DS).

**Case B — breadcrumbs absent**
- Header top padding: _TBD_
- Header left padding / right padding: _TBD_
- **No back button.**

### Component sourcing — headers

All headers must use DS components. If a DS component doesn't exist for the case, flag it; do not improvise.

| Role | DS component name |
|---|---|
| Page header (main screen-level title bar) | _TBD_ |
| Sub-section header | _TBD_ |
| Section header (inline) | _TBD_ |
| Form header (form-section titles) | _TBD_ |
| Sidepanel header | _TBD_ |

**Captured keys** live in `ds/figma-keys.md`. Probe and add when first needed; never improvise a header from raw text.
