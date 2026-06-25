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
