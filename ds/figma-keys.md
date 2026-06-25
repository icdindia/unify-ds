# Figma library keys — _TBD_

Captured by probing the DS source file. Use these in `use_figma` calls on the canvas via `importComponentByKeyAsync` / `importVariableByKeyAsync` / `importStyleByKeyAsync` so we don't re-fetch.

**Stability**: keys persist as long as the underlying components / variables / styles in the DS file aren't deleted and re-published from scratch. Re-derive if the DS does a major republish.

---

## How to populate

Follow `scripts/probe-keys.md`. Each probe is small (under the 60s `use_figma` timeout) and returns names + keys.

Recommended capture order:

1. **Library variable collections** — confirm DS library is linked
2. **Text style keys** — one call to DS file, captures all
3. **Component variant keys** — page-by-page, only the components actually used
4. **Icon component keys** — on-demand, scoped to the right sub-frame

---

## DS page index (fill from Step 1 of probe-keys.md)

| Page | ID | Components / styles housed |
|---|---|---|
| _TBD_ | _TBD_ | _TBD_ |

---

## Variable collection names (Step 1 output)

Look up the live collection key by name (it can change per publish):

```js
const cols = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
const colKey = name => cols.find(c => c.name === name).key;
```

| Collection | Approx var count | Notes |
|---|---|---|
| _TBD — Colors_ | _TBD_ | _TBD_ |
| _TBD — Spacing_ | _TBD_ | _TBD_ |
| _TBD — Radius_ | _TBD_ | _TBD_ |
| _TBD — Typography / Fonts_ | _TBD_ | _TBD_ |

---

## Variable name patterns (Colors)

_TBD — fill from `getVariablesInLibraryCollectionAsync` on the Colors collection. List the actual variable name patterns the DS uses (e.g. `Colors/Background/bg-primary`, `Colors/Text/text-primary (900)`, etc.)._

---

## Component variant keys

_TBD — populated by Step 2 of probe-keys.md._

```
### <Component name>
- **setKey**: `<hash>` (<N> variants)
- **<Specific variant name>**: `<hash>` ← <when to use>
- **Default rendered size**: <w> × <h>
- **Boolean instance properties** (toggle via `inst.setProperties({...})`):
  - `<prop name>` — <what it controls>
- **Text nodes inside** (override by name):
  - <text node name>: <default content>
```

---

## Text style keys

_TBD — populated by Step 3 of probe-keys.md._

| Style name | Key |
|---|---|
| _TBD_ | _TBD_ |

---

## Icon component keys

_TBD — populated by Step 4 of probe-keys.md, on-demand as icons are first used._

| Icon name | Key |
|---|---|
| _TBD_ | _TBD_ |
