# Figma library keys — Unify2026

Captured by probing the DS source file (`qT9zH1YYapGTwpJxwNEGzt`). Use these in `use_figma` calls on the canvas via `importComponentByKeyAsync` / `importVariableByKeyAsync` / `importStyleByKeyAsync` so we don't re-fetch.

**Stability**: keys persist as long as the underlying components / variables / styles in the DS file aren't deleted and re-published from scratch. Re-derive if the DS does a major republish.

---

## How to populate

Follow `scripts/probe-keys.md`. Each probe is small (under the 60s `use_figma` timeout) and returns names + keys.

Recommended capture order:

1. **Library variable collections** — confirm DS library is linked ✅ (names below)
2. **Text style keys** — ✅ captured (see `ds/tokens/typography.json`, each style carries its `key`)
3. **Component variant keys** — page-by-page, only the components actually used (TBD — probe on first build)
4. **Icon component keys** — on-demand, scoped to the right sub-frame (TBD)

---

## DS page index (fill from Step 1 of probe-keys.md)

| Page | ID | Components / styles housed |
|---|---|---|
| _TBD — run Step 1 of probe-keys.md on first build_ | _TBD_ | _TBD_ |

---

## Variable collection names (Step 1 output)

These names are stable; the collection `key` differs per publish — always look up by name first via:

```js
const cols = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
const colKey = name => cols.find(c => c.name === name).key;
```

| Collection | Contents | Mirrored locally as |
|---|---|---|
| `_Primitives` | Raw palette + raw spacing + raw corner-radius primitives | `colors.json` (Palette), source of spacing/radius px |
| `1. Colors` | Semantic + component colors, Light + Dark modes | `semantic.json` |
| `2. Radius` | Radius scale (`radius-none`…`radius-full`) + Button | `radius.json` |
| `3. Spacing` | Spacing scale (`spacing-none`…`spacing-11xl`) + Buttons, Input Menu Items | `spacing.json` |
| `4. Widths` | Width tokens (designer's freedom — not mirrored) | — |
| `5. Containers` | Container tokens (not mirrored) | — |
| `5. Fonts` | Font families (`font-family-display/body/code`) | `typography.json` → `fonts` |

> Note: `principles/figma-plugin-api.md` lists an older single `Fonts` collection with one var. The current export uses `5. Fonts` with three family vars (Spectral / Geist / JetBrains Mono).

---

## Text style keys

✅ **Captured in full** — all 106 text styles live in `ds/tokens/typography.json`, each entry carrying its library `key`. Bind via:

```js
const s = await figma.importStyleByKeyAsync(key);   // key from typography.json
await textNode.setTextStyleIdAsync(s.id);
```

Most-used bindings (full list in typography.json):

| Style name | Key |
|---|---|
| Display sm/Regular | `5c1e10b81d88e5cb567266b4f698c4acd3fceebf` |
| Display xs/Regular | `d7aab7d14809eb1abbf7f867ee0b31b2e7f17612` |
| Text xl/Medium | `6d5a027d454bea954ccceb9f0f67a1d6685e243e` |
| Text md/Regular | `39b424eb09349d666bf003304777a980cd1d8cf0` |
| Text md/Semibold | `32f8b380e2b2ccd3e2faa53d42204fe02865890d` |
| Text sm/Regular | `10353df580d0916c1595d5fd12c44b0630e4f271` |
| Text sm/Medium | `b7ce27231b679910c7ce94b157b802198b64b9f4` |
| Text sm/Semibold | `1acc4a3df91b4219c29b2e5e6d6c76131defa57c` |
| Text xs/Regular | `799cbbea58aafdbb1697cacac37039b774876cb9` |
| Text xs/Bold | `098a427297d2b81ae2fe6cd6185ce66eac59f4f2` |
| Text xs/Semibold-ALL CAPS | `8ff853258959e58a401bf7fd6ef4b35d335b65d5` |

---

## Component variant keys

_TBD — populated by Step 2 of probe-keys.md on first build. Capture only the components a build actually uses._

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

## Icon component keys

_TBD — populated by Step 4 of probe-keys.md, on-demand as icons are first used._

| Icon name | Key |
|---|---|
| _TBD_ | _TBD_ |
