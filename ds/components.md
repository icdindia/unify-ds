# Component Manifest — _TBD_

Lookup index for components I can reference without parsing the full DS. Populated as the user shares Figma component links, and as I create local components for repetition.

**This is not a copy of the DS.** It's a pointer table: enough metadata to locate, identify role, and use correctly. For exact pixel-level structure, fetch the specific component via `get_design_context` only when implementing.

All entries below are **core** unless marked otherwise — they must be used as instances of the source component, no detaching, no override outside exposed variants.

DS file key: _TBD_ (see `ds/config.md`)

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

**Confirmed absent from Unify2026 DS** (local composition required per PLAYBOOK §5):
- Card / Section / Panel container
- File attachment list item / upload queue row
- Generic list row (icon + title + supporting text + trailing action)
- Setting toggle row (title + description + Toggle)
- Conversation starter chip / prompt pill
- Footer / action bar (page-level bottom bar with Save/Cancel)
