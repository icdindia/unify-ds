# Figma Plugin API — operational notes

Captured during real use of `use_figma`. Saved so we don't re-discover the same gotchas.

---

## Mandatory: probe pass before any write

Before any `use_figma` write on a canvas, run a probe pass that:

1. Verifies library variable collections are linked.
2. Imports every variable / component / style by key into a lookup table.
3. Then composes.

Going straight to compose was the original bug — produced raw hex, no DS instances, no variable bindings.

## Verifying the canvas has the DS library linked

```js
const cols = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
if (!cols.length) throw new Error("No library variable collections linked");
```

If the array is empty, the canvas file has not enabled the DS library. The user has to enable it via Figma's Assets panel ("Manage libraries"). Without it, no variable binding is possible.

## Variable collection names (example, fill in per DS)

These names are stable. The collection `key` differs per library publish — always look up by name first.

- `1. Colors` — semantic + utility (~332 vars)
- `2. Radius` — 11 vars
- `3. Spacing` — 17 vars
- `4. Widths` — 12 vars
- `5. Containers` — 3 vars
- `Fonts` — 1 var (`font_family_primary`, STRING)

## Listing + importing variables

```js
const cols  = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
const colKey = name => cols.find(c => c.name === name).key;
const vars  = await figma.teamLibrary.getVariablesInLibraryCollectionAsync(colKey("1. Colors"));
const v     = vars.find(x => x.name === "Colors/Text/text-primary (900)");
const imported = await figma.variables.importVariableByKeyAsync(v.key);
// imported.id is what you bind to
```

## Binding variables to properties

```js
// Color fill — set fills with boundVariables.color
node.fills = [{
  type: 'SOLID', color: { r:0, g:0, b:0 },
  boundVariables: { color: { type:'VARIABLE_ALIAS', id: colorVar.id } }
}];

// Spacing / radius / padding / gap — setBoundVariable accepts the var object
node.setBoundVariable('paddingLeft', spacingVar);
node.setBoundVariable('paddingTop', spacingVar);
node.setBoundVariable('itemSpacing', spacingVar);
node.setBoundVariable('topLeftRadius', radiusVar);
node.setBoundVariable('topRightRadius', radiusVar);
// (etc. for all 4 corners)

// Stroke per side
node.strokes = [{ type:'SOLID', color:{r:0,g:0,b:0}, boundVariables:{ color:{ type:'VARIABLE_ALIAS', id: colorVar.id } } }];
node.strokeWeight = 1;
node.strokeTopWeight = 0; node.strokeRightWeight = 0;
node.strokeBottomWeight = 1; node.strokeLeftWeight = 0;
```

## Components

**There is no Plugin-API method to list library components.** `figma.teamLibrary.getAvailableLibraryComponentSetsAsync` does not exist. Confirmed by probe.

To get component keys: run `use_figma` against the **DS source file** and read `node.key` directly by node ID.

```js
// In DS file:
const set = await figma.getNodeByIdAsync("3287:427074"); // Button Brand set
const setKey = set.key;
const variant = set.children.find(c => c.name === "Size=md, Hierarchy=Primary, Icon=Default, State=Default");
const variantKey = variant.key;
```

Then in the canvas:
```js
const comp = await figma.importComponentByKeyAsync(variantKey);
const inst = comp.createInstance();
parent.appendChild(inst);

// To override text inside an instance
const t = inst.findOne(n => n.type === "TEXT");
if (t) { await figma.loadFontAsync(t.fontName); t.characters = "Deploy"; }
```

Captured variant keys live in `ds/figma-keys.md`.

## Text styles

**Rule: bind text to library text styles via `setTextStyleIdAsync`. Never apply size/weight inline.**

Text style keys are captured in `ds/figma-keys.md`. The library binding stays linked to the DS — when the DS publishes a typography update, every bound text node tracks automatically. Inline `fontSize`/`fontName`/`lineHeight` is brittle and drifts.

```js
// In the canvas:
const textXlSemibold = await figma.importStyleByKeyAsync('eb88d887a8129259116d27623662f39040234843');
// ...later, for each text node:
await textNode.setTextStyleIdAsync(textXlSemibold.id);
```

Color is set separately via fills (text style only carries font/size/lineHeight/letterSpacing/case). Keep color bindings via the standard `boundVariables.color` pattern on fills.

If you need to create a text node first (before binding), set characters with a default fontName loaded:
```js
await figma.loadFontAsync({family: "Geist", style: "Regular"});  // any font that's loaded works
const t = figma.createText();
t.fontName = { family: "Geist", style: "Regular" };
t.characters = "Hello";
// ...then bind the proper style:
await t.setTextStyleIdAsync(textMdSemibold.id);
```

Don't compute size/weight/lineHeight from `typography.json` inline — `typography.json` is the human-readable reference; the keys in `ds/figma-keys.md` are the binding source of truth.

## Autolayout sizing — use the modern API

`layoutAlign='STRETCH'` only works when the parent's counter axis is FIXED. Easy to get wrong because parent defaults are AUTO. Always use the modern API instead:

```js
// AFTER appending the node to an autolayout parent:
node.layoutSizingHorizontal = 'FILL';  // or 'HUG' or 'FIXED'
node.layoutSizingVertical = 'HUG';
```

Required: the node must already have a parent that's autolayout. Set sizing AFTER `parent.appendChild(node)`.

## Font loading gotchas

- Geist: `"Semi Bold"` with a **space** (not `"SemiBold"`). Same for `"Extra Bold"`.
- Spectral: same — `"Semi Bold"`, not `"SemiBold"`.
- Load every font/style combo before setting characters:

```js
await Promise.all([
  figma.loadFontAsync({family: "Geist", style: "Regular"}),
  figma.loadFontAsync({family: "Geist", style: "Medium"}),
  figma.loadFontAsync({family: "Geist", style: "Semi Bold"}),
  figma.loadFontAsync({family: "Spectral", style: "Semi Bold"})
]);
```

When updating text inside a DS component instance, load the font of the existing text node first:
```js
await figma.loadFontAsync(textNode.fontName);
textNode.characters = "...";
```

## Other API notes

- `figma.setCurrentPageAsync(page)` — use this, NOT `figma.currentPage = page`.
- `figma.root.findOne(n => n.type === "PAGE" && n.name === "X")` — find pages.
- Plugin Data APIs (`getPluginData`, etc.) are NOT supported via `use_figma`.
- `figma.getNodeByIdAsync(id)` — works for any node in the current file.

## Network limitation in this environment

The remote execution environment blocks `figma.com` hosts (`x-deny-reason: host_not_allowed`). This means:
- `get_screenshot` returns a URL but we cannot fetch the PNG ourselves.
- We can never see what we created — must verify via `get_metadata` (structure check) and ask the user to look at the frame directly in Figma.

## use_figma timeout — what to do

The `use_figma` MCP tool has a hard **60-second timeout** per call. On heavy DS files, single calls that:
- Archive a complex frame (move between pages)
- Import many components in sequence
- Import many variables in sequence
- Set component properties on instances
- Walk deep instance trees with `findAll`

…can blow the 60s budget combined. Symptoms: every call (even minimal ones) starts timing out — meaning the plugin context is stuck or the server is overloaded.

**Recovery pattern**:
1. Wait 30–60 seconds, then retry a minimal call (just create a frame).
2. If still timing out, the MCP server itself is the issue — stop writing, save findings, ask user to retry the auth flow or restart Figma desktop.
3. Once recovered, build in **small, idempotent phases**: each phase ≤ a few seconds of work. Use the returned `frameId` to find the in-progress frame and continue in the next call.

**Pre-emptive splitting**: any v3-style build (multiple DS instances + setProperties + text overrides) MUST be split into ≥ 3 phases:
1. Skeleton: create page frame + place nav + content shell.
2. Header layer: breadcrumb + header + tabs with overrides.
3. Body: content composition.

## Diagnostic pattern

Wrap every `use_figma` call body in try/catch and return error info:

```js
try {
  // ...build...
  return { success: true, frameId, pageId, ... };
} catch (e) {
  return { error: e.message, stack: (e.stack || '').slice(0, 1200) };
}
```
