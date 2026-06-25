# Production Layout Spec — Unify2026

Captures the structural pattern, component composition, and dimensions to match from the
team's redesigned reference screens. **This is the bar.** Match these patterns on every new
screen unless a brief explicitly diverges.

**Sources** (warm redesigns provided by the user 2026-06-25, old purple vs. new warm):
1. Automations **Preview** page — canvas preview + Documentation rail.
2. Applications **Overview** page — app preview + Details (metadata) rail.

Together these define the canonical **object detail page** shell (Automations, Applications,
Agents, Integrations all share it).

---

## Canvas width

**1440** desktop (per `design-rules.md` §2). The reference was shared at higher fidelity; match
the structural pattern + component vocabulary, render at 1440.

### Width chain at 1440

| Region | Width |
|---|---|
| Canvas | 1440 |
| Sidebar nav (icon rail) | ~64 |
| Content region | fill (1376) |
| Right rail (Documentation / side panel) | ~400–480 fixed |
| Main pane (canvas / form) | fill (content − rail − gaps) |

---

## The two page-header patterns

The DS now has **two** screen-level header constructs. Pick by screen type.

### A. Form / builder header (e.g. Agent Builder)
Breadcrumb → DS `Page Header` (back button · app icon · Spectral title · status badge · supporting
text · right-side actions). Used for configuration/form screens. Already in use.

### B. Detail / preview header (THIS reference — Automations, integrations, deployed objects)
A richer identity + lifecycle bar. Compose top-down:
1. **Breadcrumb** — `[Domain] / [Object]` (`Text sm/Medium`, `text-tertiary`). Current item may
   render in Spectral italic for editorial warmth.
2. **Title row** — Spectral **`Display sm`** object name + a **status pill** immediately right
   (e.g. "Undeployed Changes" → warm amber/`utility-orange` outline pill; neutral dot pills for
   other states). Title carries the brand voice; keep it serif.
3. **Lifecycle meta row** (below title) — a `Toggle` (Running/Paused, green when on) + status
   word + `·` + version (`V1`) + `·` + "Deployed 4 days ago" — all `Text sm/Regular`,
   `text-tertiary`. Dot-separated, muted.
4. **Right cluster** (top-right, baseline-aligned with title) — secondary **"Open in builder"**
   (`Button` Secondary, leading edit icon) + primary **"Deploy"** (`Button` Primary, brand-olive)
   + overflow `⋮` (`Button` Neutral, icon-only `dots-vertical`).

---

## Page tabs — PILL style (not underline)

The warm redesign uses **pill tabs** for page-level navigation, replacing the purple underline.

- Active tab: `bg-primary` (white) pill, `border-secondary` 1px, `radius-md`, `Text sm/Medium`
  `text-primary`. Subtle/no shadow.
- Inactive tabs: no fill, `Text sm/Medium` `text-tertiary`, hover → `bg-secondary` pill.
- The tab row sits on the page `bg-secondary`, left-aligned under the header, gap `spacing-xs/sm`.
- DS source: `Horizontal tabs` set has a pill-capable style — use the **rounded/pill variant**,
  NOT `Style=Default` (which renders the underline treatment). Confirm the variant on first use.

> Supersedes the agent-builder's underline tabs. Retrofit underline tab usages to pill on touch.

---

## Two-pane preview layout

`[ icon sidebar ] [ main pane (fill) ] [ right rail (fixed ~440) ]`

- **Main pane**: dotted-grid canvas (flow/builder preview) on `bg-secondary`, with bottom-left
  canvas controls (zoom +/–, fit, ID toggle, ⚠ count) as a small floating `bg-primary` cluster
  with `border-secondary` + `radius-md`. A floating "Open in builder" secondary button top-left.
- **Right rail**: a `bg-primary` card, `border-secondary`, `radius-4xl`, padded `spacing-3xl`.

---

## Flow canvas node cards

- **Trigger label**: small green pill ("Trigger") — `bg` success-subtle, `Text xs/Semibold`.
- **Step node**: `bg-primary` card, `border-secondary`, `radius-lg/xl`, padding `spacing-lg`.
  Layout: app/action icon (left, ~24) + text stack (title `Text sm/Semibold` `text-primary`;
  subtitle `Text sm/Regular` `text-tertiary`). Numbered ("1. Callable Automation").
- **Connectors**: 1px `border-secondary` vertical lines between nodes; centered.
- **Add node**: dashed `border-secondary` rounded square with `+`, centered under last node.

---

## Documentation right-rail anatomy (reusable side-panel template)

Refines `design-rules.md` §6. Order, top to bottom:

1. **Header row** — doc icon + "Documentation" (`Text md/Semibold`) + edit (pencil) + close (X),
   actions right-aligned. Optional state pill ("Draft").
2. **Stat tiles** — a 3-up row of tiles (`bg-secondary`/subtle, `border-secondary`, `radius-lg`,
   centered). Big number (`Display xs`) over a caps label (`Text xs/Semibold-ALL CAPS`,
   `text-tertiary`). **Semantic color on the number**: neutral (total), `text-success` (Passed),
   `text-error` (Failed).
3. **Eyebrow sections** — `OVERVIEW`, `HOW IT WORKS` etc. as `Text xs/Bold` ALL CAPS
   `text-tertiary` eyebrows, each over a `Text sm/Regular` `text-secondary` paragraph. 1px
   `border-secondary` dividers between groups.
4. **RESOURCES** — eyebrow + **Code Pills** (monospace, `bg-secondary`, `border-secondary`,
   `radius-sm`) for resource identifiers (`soharport_request`).
5. **APPS USED** — eyebrow + **app chips** (app icon + label, `border-secondary`, `radius-md`).
6. **Meta rows** — label-left / value-right rows: `Tags` → pill (e.g. "AI Generated"); `Owner`
   and `Edited` → avatar + name + date (`text-tertiary`).
7. **Empty state** (when no content) — centered DS `Empty State` (sparkle icon + "No summary yet"
   + supporting line + a primary action like "Generate summary").

---

## Component vocabulary (most-used in the refs)

| Component | When to use | Replaces |
|---|---|---|
| `Page Header` / Detail header (composed per §B) | screen identity bar | hand-rolled title rows |
| `Horizontal tabs` (pill variant) | page-level nav tabs | underline tabs |
| `Buttons/Button Brand` Primary / Secondary | Deploy / Open in builder | purple CTAs |
| `Tag` / `_Pill rounded` | status ("Undeployed Changes"), "AI Generated" | text labels |
| stat tile (local — DS has none) | Steps/Passed/Failed counters | plain number text |
| Code Pill | resource ids, env vars | inline mono text |
| app chip (local) | "APPS USED" | text app names |
| `Empty State` family | "No summary yet" panels | custom empty art |

Captured component variant keys: `ds/figma-keys.md`.

---

## Object detail page — confirmed shell (Automations + Applications)

Both refs share one shell; treat it as THE detail-page template:
`breadcrumb → Spectral title (+ optional status pill / created-on meta) → pill tabs → [ main
pane (fill, dotted canvas) | right rail (~440 fixed) ]`. The **right-cluster actions are
object-specific** — Automations: Secondary "Open in builder" + Primary "Deploy"; Applications:
Secondary "▷ Preview" + Primary "Open in Builder". Always Secondary(+icon) + Primary(olive) +
`⋮` overflow, baseline-aligned with the title.

The main pane shows a **live preview of the user's built artifact** (the automation flow, or the
rendered app) floating on the dotted `bg-secondary` canvas — that inner content uses the product's
own components and is not DS chrome to restyle.

---

## Details / metadata right-rail (Applications ref)

A second rail flavour alongside the Documentation rail. `bg-primary` card, header = camera/info
icon + "Details". Then label/value stacks, each: label `Text sm/Medium` `text-tertiary` over
value, divided by 1px `border-secondary`:

- **Application URL** — link (`text-brand`/underline) + copy icon button.
- **Application ID** — **Code Pill / monospace** value.
- **Base Device** — chip (`Desktop` + monitor icon, `border-secondary`, `radius-md`).
- **Workspace** — plain value text.
- **Tags** — label (+ optional `?` help) → tag pill(s), or "Select tags" placeholder when empty.
- **Created on / Created by / Last modified by** — avatar + identity (name or email) +
  timestamp (`text-tertiary`, e.g. "02 Jun 2025, 15:46").

---

## Stat cards (app preview + dashboards)

Row of 3+ equal cards: `bg-primary`, `border-secondary`, `radius-lg`, padding `spacing-lg`.
Each = **semantic icon badge** (left, rounded-square tinted bg: success/check, error/alert,
warning/hand) + a stack of big value (`Display xs`/`Text xl`) with a **delta chip** beside it
(`↑ 100%` `text-success` / `↓ 100%` `text-error`) over a title (`Text sm/Regular`
`text-tertiary`). Distinct from the Documentation **stat tiles** (centered counters) — stat cards
are left-aligned with an icon badge + trend.

---

## Data table

Column header row (`Text sm/Medium` `text-tertiary`, `bg-secondary` or plain, 1px bottom border).
Rows: 1px `border-secondary` separators, `spacing-lg` cell padding. Cell types seen:
- **Identity cell** — avatar (initial circle) + name (`Text sm/Medium`).
- **Status pill** — semantic colour map: `Design` → brand/violet utility; `Dev Backlog` →
  `utility-warning` (amber); `Done` → success (green). Status is ALWAYS a pill (§5).
- **Row action** — trailing "Edit" link (`text-brand`, `Text sm/Medium`).
- **Error/attention text** — a cell in an error state renders its text in `text-error` (e.g. an
  overdue task name in red).
Toolbar above the table: filter / sort / overflow icon buttons (`Button` Tertiary icon-only).

---

## Reference 3 — Agent Builder ("Simple Agent") — two-pane builder

The canonical agent-config screen (the one the trial restyle approximated — this is the bar).

`breadcrumb → header [logo + Spectral title + created-on meta · CENTER segmented (AI Assisted |
Manual configuration) · Run toggle + Save + ⋮] → pill tabs [Configuration | Deployments |
Observability] → two panes (config | preview)`

- **Header segmented control**: a 2-option toggle group (AI Assisted / Manual configuration),
  active = `bg-primary` pill + border, sitting in the header **center**. Distinct from page tabs.
- **Run** = green play **toggle** (not a button) + **Save** primary olive + `⋮` overflow.
- **Left pane — "Create an Agent"** (Spectral pane title): a **FLAT stack of titled sections,
  NOT cards.** Each section = Spectral section title + grey one-line description + a single
  input/affordance, separated by generous space (no card chrome):
  - Instructions → compact text input ("Add instructions to tailor the response") with an
    expand-diagonal icon (opens full editor) — not a tall textarea.
  - Knowledge sources → **dashed dropzone** (file icon + "(PDF, PPTX, DOCX and more)" + ⊕).
  - Tools / Skills / Capabilities → **dashed add-zone** (icon + "Add X" + ⊕ on the right).
  - Conversation Starters → "Add up to 3 prompts…".
- **Right pane — "Preview"** (Spectral pane title): live chat preview. Centered agent empty
  state = olive circle w/ spark icon + agent name (Spectral, "Sales Assistant") + grey tagline.
  Bottom: **chat composer** ("＋ Ask anything…" + emoji / mic / waveform icons).
- Panes split ~50/50 by a vertical hairline; left pane scrolls, composer pinned to preview bottom.

> **Corrects the trial restyle** (single 720 column of cards + Add buttons). The real builder is
> two-pane, flat titled sections, dashed add-zones, and a live preview.

---

## What defines "warm" (purple → warm delta checklist)

Apply ALL of these to bring any legacy purple screen into the system:

1. **Brand olive replaces purple** everywhere — primary buttons, active tab/nav, accents, links.
2. **Spectral serif** for page/object titles (and breadcrumb current item).
3. **Pill tabs**, not underline.
4. **Page background `bg-secondary`** (warm off-white); white cards/rails float on it.
5. **Semantic color** on status numbers (green Passed, red Failed) and warm status pills.
6. **Warm neutrals** for borders/text (`border-secondary`, `text-tertiary`) — no cool greys.
7. **Editorial breathing room** — generous padding; hierarchy from type + space, not boxes.
