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

_TBD — manifest empty. Will fill as the user shares component links and as builds use components._
