# Component Manifest — Unify2026

Lookup index for components I can reference without parsing the full DS. The **full catalog** (every
component set with set key, default-variant key, and variant axes) lives in `ds/ds-inventory.md` —
check that first. This file holds the role index + override handles for components actually used in
builds, plus the local-composition decisions.

**This is not a copy of the DS.** It's a pointer table: enough metadata to locate, identify role, and use correctly. For exact pixel-level structure, fetch the specific component via `get_design_context` only when implementing.

All entries below are **core** unless marked otherwise — they must be used as instances of the source component, no detaching, no override outside exposed variants.

DS source file key: `qT9zH1YYapGTwpJxwNEGzt` (see `ds/config.md`)

---

## How to add an entry

When the user shares a Figma component URL, capture:

```
## <Group / family>

Page: `<page node id>` · [open](<figma url>)

| Component set | Node ID | Variant props |
|---|---|---|
| <name> | `<node id>` | <key variant axes> |
```

Then probe the DS file once for the variant keys you'll actually use (see `scripts/probe-keys.md`) and append them to `ds/figma-keys.md`.

---

DS source file key: `qT9zH1YYapGTwpJxwNEGzt` (see `ds/config.md`). Variant + override keys for every entry below live in `ds/figma-keys.md`.

## Navigation & headers

| Component set | Node ID | Variant axes | Role | Used for |
|---|---|---|---|---|
| `LC_Sidebar Navigation_Icon Only` | `34836:68967` | Floating · Device · Style(Framed/Stroke) | core | Icon-only product sidebar (§8) |
| `Base_LC_Nav Unit_Icon Only` | `1165:736` | Type · Current · Soft Fill · State | core | Individual sidebar item (swap icon, Current=active) |
| `Breadcrumb Bar` | `36664:35617` | Type(Default/With Button) | core | Top-of-page breadcrumb row |
| `Page Header` | `20650:6545` | Type · Divider | core | Screen-level title bar (design-rules §11) |
| `Form Header` | `59836:85546` | Level 0–3 | core | Section/card titles inside a card (§11) |
| `Header` | `1214:38` | Level · Tabs · Type | core | Section header w/ tabs (when needed) |

## Form & input

| Component set | Node ID | Variant axes | Role | Used for |
|---|---|---|---|---|
| `Input field_outline` | `1090:57817` | Size · Type · Destructive · State | core | Single-line text fields |
| `Textarea input field` | `1238:278` | Type · Destructive · State | core | Multi-line editor (Instructions) |
| `Toggle` | `1102:4208` | Pressed · Text · Size · State · Label Position | core | Behaviour switches (§5 Capabilities) |
| `Horizontal tabs` | `8102:114154` | Style · Start Icon · Size | core | Tab/segmented switch substitute |

## Actions & status

| Component set | Node ID | Variant axes | Role | Used for |
|---|---|---|---|---|
| `Buttons/Button Brand` | `3287:427074` | Size · Hierarchy · Icon · State | core | Primary/Secondary/Tertiary buttons |
| `Buttons/Button Neutral` | — | Size · Hierarchy · Icon · State | core | Greyscale button alternative |
| `Tag` | `3307:417515` | Icon · Action · Size · Type · State | composable | Status pills (Draft) — §5 |
| `_Pill rounded` | `1046:3819` | Size · Type · Icon · Color | composable | Named-color pill alternative |

Lined icons used so far are keyed in `ds/figma-keys.md` → Icon component keys.

## Empty states & utility (AI Agent Builder restyle, 2026-06-25)

| Component set | setKey | Variant axes | Role | Used for |
|---|---|---|---|---|
| `Empty State` | `79590f4035a847d4b5c06f10318288e09556dd29` | TBD (sub-probe) | composable | Section empty treatment |
| `Empty State - Button` | `d0e0d7bfb4d0e10145dddeea9820d2ae7deafd59` | TBD | composable | Empty state with CTA |
| `Empty State - Row` | `0279b96c743d6fa720eff815c66fdceefc8f5476` | singleton | composable | Inline/row empty treatment |
| `Empty State_Status` | `b7d8ed5992357f3da3b5fd069b0e52c67efd47e1` | singleton | composable | Status-type empty state |
| `Chat Empty State` | `0337e41908b5e2dab422dae690ac33f9eed341dd` | TBD | composable | Chat panel empty state |
| `File type icon/solid` | `e2b61408ffe83c477308dda35edec2cd97cef5a2` | TBD | composable | File format badge atom |
| `Input Menu Dropdown` | `6b0c7c2af450141e3aa2ef094dcb0fbe61594ae1` | TBD | composable | Closest to list-row atom (dropdown intent) |
| `Table` | `64048af04a68983c637e24ffe7b49d206822d6d1` | TBD | composable | Full data table (no standalone row sub-component) |

**CORRECTED 2026-06-26 after full DS sweep** — most of the earlier "absent" list was WRONG (the
manifest was just incomplete). Full catalog now in `ds/ds-inventory.md`. These DO exist — use them:
- Generic list row → **`List Item`** / **`List Item Cardified`** (icon+title+supporting+badge+actions)
- File attachment / upload queue row → **`Uploaded File base`**, **`File Upload empty state`**
- Footer / action bar → **`Section footer`** (form/page), **`Side panel footer`**, **`Builder Footer`**
- Metadata label/value row (Details rail, record fields) → **`Key Value Horizontal`** / **`Key Value Vertical`**
- Code/mono pill → **`Code Pill`**; close-X button → **`_Button close X`**; toolbar icon button → **`Small Icon Button`**
- Sidepane/right-rail header → **`Sidepane header`** (or **`Side Panel header`**); side panel body → **`Side Panel`**

**Genuinely absent (compose locally per §5):**
- Card / Section / Panel container (plain styled frame)
- Setting toggle row (title + description + Toggle) — compose from `Toggle` + text
- Conversation starter chip / prompt pill
- Settings vertical/side navigation (expandable parent+children nav) — closest atoms: `Settings_Nav item base` `17394d4e6601bbb9d0748900ae5c1aac885a8dcd` + `Settings_Nav item dropdown base` `39ae7a9cfd358e9d5c49a74e363adb56217ffcb8` (compose the container)
- Governance section row (tinted icon square + title + count badge + subtitle)

## Side Panel kit (2026-06-26)

Full DS drawer/slide-over system — use for any side panel (standard width ≈560). Keys in `ds/figma-keys.md` → "Side Panel kit".

| Component set | setKey | Variant axes | Role | Used for |
|---|---|---|---|---|
| `Side Panel header` | `9dc812e0de353ae51bc748d50a9d2d37a1ad7c2a` | Type · Tabs | core | Drawer header (icon · title · subtitle · pill · breadcrumb · actions · tabs) |
| `Side Panel` | `bfafe72a9742976cdf12cd17297b13d31116a17f` | Type (Key Value / Table) | core | Drawer body content |
| `Code snippet` | `b02411f8b10673a13ec42f20f731c367e06f808d` | Label · Header · Maximise · Toggle · Token Dropdown · Scroll bar | core | Code/JSON viewer (auto gutter, lang label, copy/maximise, `Code` TEXT slot) |
| `Side panel footer` | `0773869e9aa1848dc24fa089be7b468e86ddf8dc` | Type (Double Button / Message) | core | Drawer footer action bar |

> Supersedes the "Footer/action bar — confirmed absent" note for the side-panel case: a DS side-panel footer DOES exist (`Side panel footer`). The page-level form footer is still locally composed.

## Governance / Settings page (2026-06-25)

| Component set | setKey | Variant axes | Role | Used for |
|---|---|---|---|---|
| `Toggle group` | `6267fc6886d9519de3bae1f4a1364dc44068428b` | Type · Style · Size | core | Page-level pill tab switcher (Overview\|Versions\|…\|Settings) |
| `_Toggle group base` | `a96ba19fb0a0938c258e9d514833d1c0dc9b76a6` | Type · Size · Current · Icon · State | composable | Individual tab item inside Toggle group |
| `Button Tab base` | `3a9fe403a4beffc621a7a49be482b19106a35c6e` | State · Current · Size · Error | composable | Individual tab atom inside Horizontal tabs Button Tabs style |
| `Empty State - Button` | `d0e0d7bfb4d0e10145dddeea9820d2ae7deafd59` | Type · State | composable | Inline dashed CTA row (table add-row footer trigger) |
| `List Item` | `08002cf14b8f0807ae9b5b0a5e8b7f0b7c65f53b` | Type · Size · Selected · State | composable | Selectable list rows (checkbox/radio/icon) — NOT settings row |
| `Button group` | `3bddb5134aaf0614782db73d392ca5e57dc5dbbb` | — | composable | Button group container (12 variants) |
