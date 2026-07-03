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
