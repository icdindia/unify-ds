# Screen Recipes — how real UnifyApps screens are constructed

Mined row-by-row from the screens file `jcbxvaNrZCWeQsIiZRta6F` with per-value confirmation from
the design owner. Each recipe = the exact scaffold to reproduce that screen type without
re-deriving it. Values are Figma-verified token bindings or **user-confirmed** numbers; anything
marked ⚠ is a known defect in the source frames — do NOT copy it into new builds.

---

## Recipe 1 — Platform shell (new sidenav) · exemplars `17:82745` / `17:82819`

The chrome every platform screen sits in: nav rail + content pane. Frame 1440×1024.

### Nav rail — component set `New_Platform Navigation`
Always instantiate from the set (⚠ screen `17:82819` has a raw COMPONENT pasted on canvas —
never copy that node; place an instance and set the variant).

**Geometry (user-confirmed, locked):** collapsed rail **56px**; expanded rail **250px**;
hover flyout **185px** wide at **+4px** right of the collapsed rail (x=60), **y=54**;
flyout radius **12**, shadow **shadow-md**.

- **Fill** `component/nav-bar/navbar-bg` (#efebe5); right border `border-secondary` (#edebe8).
- **Collapsed (State=Closed, Sub Menu=All Collapsed):** header pt `spacing-xl`(16) px
  `spacing-lg`(12) gap 12, logo 32×32; body = `Base_Platform Nav Menu Unit` ×6, h 36, px 10,
  icon 18, radius `radius-md`(8); footer = 5 more units + divider (`border-primary` #dbd6d1) +
  `Base_Platform Nav User Avatar Unit` 32px circle (bg `utility-gray-300`, initial
  `text-tertiary-(600)`).
- **Expanded (State=Open):** wrapper → `Content` (vertical, fill). `Navigation` region pad
  T16/B16 gap 8; `Header` 250×32 pad L12 R8 gap 12 (logo · workspace label · chevron); nav list
  gap 8, items h 36 pad 10/8 gap 2. `Footer` pad T8 gap 8: Governance 36h · Platform Library 36h ·
  3 menu units · divider · user unit 60h pad 12/16/12/12 gap 8. Sub Menu variant `Sub menu
  collapse` shows group headers only; `All Open` renders sub-items inline (same content as the
  flyout, docked).
- **Hover flyout — `Floating Nav Item List` (Closed rail only):** bg `bg-workspace` (#fbfaf9),
  border `border-tertiary` (#f2f0ee), radius 12, `shadow-md`, pad T16 R8 B12 L8. Eyebrow = Text
  xxs/Medium-ALL CAPS (Geist 11/12, tracking 1.1) `text-placeholder`. Items h 28, Text sm/Regular
  (13/20) `text-tertiary-(600)`; **active** item bg `alpha-black-05` radius `radius-md`(8),
  inactive radius `radius-sm`(6). (Item gap reads as 0 in source — items butt together.)

### Content pane
Fill width (1384 beside collapsed rail / 1190 beside expanded), vertical, gap 0. First child is
always the Page Header.

### Page Header (shared component, `2227:177430` family)
- Breadcrumb strip on top (workspace ▾ · crumb), AI FDE pill top-right.
- Header row: min-h 36, pt `spacing-md`(8), px `spacing-xl`(16), gap 12.
- Title: **Display xs/Medium** — Spectral Medium 24/32, tracking −0.48, `text-primary-(900)`.
- Heading wrap sizing: **FILL** the space beside the actions cluster.
  ⚠ Source frames fix it at 1006px on every width — user-confirmed build bug, never copy.
- Primary action: `Buttons/Button Brand` md — bg `button-brand-primary-bg` (#112d06), radius
  `button/md`(8), px `spacing-lg`(12) py `spacing-sm`(6), label **Text sm/Medium** (Geist 13/20).
  ⚠ Label colour in source is bound to `button-brand-primary-fg_hover` in the default state —
  user-confirmed mis-binding; bind the default fg token. ⚠ `min-w-72px` raw on the button.
- **Optional toolbar row** (user-confirmed: real optional slot, hidden by default): search input
  240×28 · neutral icon button 28×28 · 2× Button Brand h28 · pill + divider. Toggle on when the
  screen needs list controls.

### Typography roles (this shell)
| Role | Style | Spec |
|---|---|---|
| Page title | Display xs/Medium | Spectral 24/32, −0.48 |
| Button label / nav text | Text sm/Medium · Regular | Geist 13/20 |
| Caption | Text xxs/Regular | Geist 11/12 |
| Eyebrow | Text xxs/Medium-ALL CAPS | Geist 11/12, tracking 1.1 |

### Source-frame defects (never reproduce)
1006px fixed heading wrap → FILL · `fg_hover` bound as default button fg · raw `min-w-72px` ·
raw COMPONENT nav pasted on `17:82819` · invisible full-width `Scroll bar` overlay in expanded
footer · degenerate 0-width divider LINE nodes (use a styled divider instead).

---

## Recipe 2 — Data-table screen (managers / list view) · exemplar `17:83978`

The standard "list of records" page (Automations, managers, graphs…). Platform shell (Recipe 1)
with a Page Header + a table block in the content pane. Everything is DS instances; the only
bespoke part is the column/row assembly glue.

### Page Header — instance, `Type=With Toggle`
Use the **native `Type=With Toggle` variant** — do NOT hand-inject a toggle into a `Type=Default`
header via a local wrapper frame. ⚠ Source frames do exactly that (local `Frame 2147265679`
holding the toggle) — that's the bug this flow fixes.
- Left: title + `Pill squared` count badge. Centre: **Toggle group** `Type=Inset, Style=Text,
  Size=sm` — **exactly 3 segments**, first `Current=True`. (Source has 6 segments with 3
  `visible:false` ghost duplicates + placeholder "Text" labels — never reproduce; delete ghosts,
  bind real labels.) Right: `Actions` cluster — `Search_solid` input · `Button Brand` Secondary sm
  · `Button Brand` Primary sm · one tertiary icon-only button.

### Table block (bespoke assembly over DS primitives)
DS ships the primitives, not a one-shot Table; the column/row grid is local glue:
- `Header` instance `Level=Level 1, Tabs=False, Type=Default` (table-section header).
- `Filter Bar` instance `Type=Single, Bulk Action=Off`.
- **Columns** = local `Column` frames, each = one `Col Header Cell` instance + N `Table cell`
  instances (same-index rows). Exemplar has 8 columns; reference widths (px):
  `28 · 325 · 200 · 200 · 180 · 203 · 200 · 58`. Cell variants, one per column: Checkbox ·
  Text(Lead=Yes) · Badge single · Badge single · Text(Lead=No) · Avatar-with-text ·
  Text · Action three-dot icon. (Widths are exemplar-specific, not canonical — set per table.)
- `Pagination` instance `Type=With Page Input, Platform=Web` at the foot.

### Build order
shell → Page Header (With Toggle) → Table frame [ Header → Filter Bar → columns row → Pagination ].
Bind every cell/tag/avatar to its DS variant; the only hand-built nodes are the `Column` frames
and the `Actions` wrapper.

---

## Recipe 3 — Global Search modal (command bar) · exemplars `1294:154337` / `156199` / `1407:109666`

App-wide search overlay. `Modal Full Screen` → `Global search`, **720px wide**, pinned near top
of the viewport, over any page. Three states share one structure:

- **Chrome:** search input (magnifier + query + `⌘K`/esc), then a filter tab row —
  `All · Automations · Steps · Fields · Only Me` (first active, pill/segmented). Footer = keyboard
  hint row (⏎ Select · move · esc Quit) with nav icons.
- **`Command bar`** body holds the results; height flexes with state:
  - **Recent** (`1294:154337`, bar ~330 tall): "Recently Opened" list — rows with clock-rewind
    icon + label + coloured `Pill squared` type tag.
  - **Populated / categorised** (`1294:156199`, bar ~492 tall): collapsible `Header` (chevron) +
    `Settings_Nav item base` rows grouped under coloured category pills (Warning / Fuchsia…).
  - **Empty** (`1407:109666`, bar ~204 tall): DS `Empty State` instance `Size=sm, Type=Default`
    (240×140) — "no results".
- All rows/tags/empty-state are DS instances; the modal frame + `Command bar` list wrapper are the
  only container glue.

---

## Recipe 2 addenda — wide managers table (many pill columns) · exemplar `2116:103796`

Row 3 ("Manager Views Layout and Table + pills Fixes") extends Recipe 2. Same shell + table
assembly; new pieces and rules:

### Extra `Table cell` styles (add to the column vocabulary)
- **Toggle** — inline on/off switch per row (col width ~48). First data column after checkbox on
  the wide view.
- **Icon with text and badge** — one cell holding icon + text + a `Pill squared` (e.g. a Success
  pill "20%"). Use when a metric needs an inline status pill.
- (Recipe 2 already covers Checkbox · Text(Lead=Yes/No) · Badge single · Avatar-with-text ·
  Action three-dot.)

### Pills / category columns
Category columns (Status, Type, Shared With, Tags, Trigger, Version…) render each value as a
`Pill squared`, `Type=Pill color`, `Size=sm`, icon optional. **Colour = decorative per-tag
identity** (user-confirmed) — pick a distinct `Pill color` variant per value for visual
separation; there is no fixed value→colour map. Observed palette vocabulary: **Pigeon Blue ·
Violet · Lime · Gray · Success**. Version column keeps the green `text-to-*` / grey `AI generated`
convention from earlier tables. All pill fills bind to library colour variables — never raw hex.

### Header variant for drill-down table views
A manager **detail / back-nav** table uses Page Header `Type=With Back Button` (not `With Toggle`).
`With Toggle` = top-level list; `With Back Button` = drilled-in view.

### Wide-table layout rule
When columns exceed ~1440, widen the **content pane** (exemplar runs 2048px content in a 2104px
frame) — do NOT fake a frozen last column by manually offsetting its x.

### Source-frame defects (never reproduce)
- ⚠ **Fake-sticky action column** (`17:84488`): the Action three-dot column was hand-moved to
  x=1294, overlapping a badge column and shoving 3 columns off-frame. This is the bug Row 3 fixes —
  use proper sequential column layout on a wider pane instead.
- ⚠ `Filter Bar` instance sized **2766px** wide in both screens (exceeds content width, search sits
  off-edge) — stale carried-over size; set Filter Bar to the content width.
- Table section `Header` (Level 1) left `hidden=true` in both — fine to omit on these views.

---

## Recipe 4 — Automation detail / preview page · exemplars `17:82935` / `2753:134795`

The "open one record and inspect it" page (an automation opened to Preview). Platform shell
(Recipe 1) + a stacked header + a detail tab bar + a 2- or 3-pane body. This is the template for
any builder/detail page, not just automations.

### Header stack (top of content pane)
1. **Breadcrumbs** — `Breadcrumb Bar`, variant **`Type=With workspace`**: `Workspace Name 1 ▾ ›
   Automations › Lowes Latency Percentiles` (workspace dropdown + trail to current record). Riding
   the same top strip on the right: AI-FDE button + status pill + small icon buttons (page chrome).
2. **Title / status row** — record title + help `?` + a status `Pill squared` (e.g. "Undeployed
   Changes", Warning/Terracotta). Sub-line: a `Toggle` (Running on/off) · `V1` · "Deployed 4 days
   ago". Right cluster: `Button Neutral` Secondary "Open in Builder" (share icon) + `Button Brand`
   Primary "Deploy".
3. **Details Page Tabs** — an **underline horizontal tab bar** (Horizontal-tabs family; the flow
   names it the "Details Page Tabs Component"). Tabs (authoritative from screen, Preview active):
   **Preview · Runs · Versions · Insights · Alerts · Activity · Dependencies · Settings**.
   *(Confirm with owner whether this is a dedicated `Details Page Tabs` component or the standard
   DS `Horizontal tabs` — labels are certain, component name is not.)*

### Body — 2 or 3 panes inside a `Container`
- **Working area (left)** — the automation **canvas / graph**: a `Trigger` badge → vertical node
  cards (`1. Callable Automation / Triggers when called`, `2. India Post / Check pincode`,
  `3. Analytics by UnifyApps / Analytics Query`) joined by connector lines → `+` add-node. Top:
  `Button Neutral` "Open in builder". Bottom-left: zoom cluster (+/−/fit, ID toggle, warning
  count). Built from DS atoms (Button, Toggle group, connector frames) — the diagram wiring is
  bespoke glue, not a DS canvas component.
- **Node-inspector panel (center, ~480w)** — `Automation sidepane Header` instance (not yet
  key-captured in `ds/figma-keys.md` — probe DS source before building). Contents: title
  "📄 Documentation" + edit/close icons; stat trio via `Number+badge` (12 Steps / 11 Passed / 2
  Failed, each with a `Pill squared` %); `Form Header` sections **Overview · How it works ·
  Resources**; `Code Pill` (e.g. "soharport_request"); Apps Used `Pill squared` ("Gmail");
  `Key Value Horizontal` rows — Tags (pill) · Owner (Avatar + date) · Edited.
- **AI Copilot panel (right, ~372w, optional)** — see **Recipe 5**; docked on the far right when
  the user opens Copilot (present on screens 3–4, absent on 1–2).

### Pane configurations across the row
Nav Closed/Closed/Open/Closed × Copilot absent/absent/present/present → content width flexes
(1384 solo → 784–978 for the table area + 372 Copilot when open). Tab bar, breadcrumb and inspector
content are identical across all 4 — this row characterises **panel/nav configs of one page**.

### Source-frame defects (never reproduce)
- ⚠ **Double Page Header** on screens 3 & 4: an outer `Page Header` stub stuck at h=28 (content
  overflowing) plus a correctly-sized nested one — stale layer from adding the Copilot panel. Build
  from the nested (784/978-wide) header only.
- The 8× `Button Neutral` (Secondary sm) toolbar under the tabs on screens 1/2/4 carries no
  icons/labels — placeholder canvas toolbar; supply real icons when building.

---

## Recipe 5 — AI Copilot panel (AI FDE) · exemplar within `2753:134795` (right pane)

App-wide assistant panel, ~372w, docked on the right of any page (or standalone). Vertical stack:
- **Header** — assistant identity + history/new-chat/close icons.
- **Empty / intro state** — centered mark + "Hey, I'm AI FDE / I can help you do your best work."
  + 3 **suggestion chips** (pill buttons, e.g. "Highlight observability issues", "Help me
  understand recent deployments", "Sale assistant use-cases").
- **Conversation state** — message list (user bubble right; assistant blocks left with steps /
  sources / action row). *(An earlier HTML study of this panel lives in scratchpad; bubbles are
  white with a hairline border, olive avatar.)*
- **Composer** — `Copilot desktopsidepane_Input Box`: `+` · "Ask anything…" · send button, pill
  (999) input on `bg-white`, hairline border.

Instances `Automation sidepane Header` and `Copilot desktopsidepane_Input Box` are used here but not
yet in `ds/figma-keys.md` — capture their keys from DS source `qT9zH1YYapGTwpJxwNEGzt` before a
build.
