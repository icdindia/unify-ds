# Probe playbook — capturing Figma keys into `ds/figma-keys.md`

The DS-side Figma keys (component variants, text styles, icon components) can't be staged via a static plugin export. They're captured by running probes through Claude Code's `use_figma` MCP tool against the DS source file.

This doc gives you the **ready-to-paste probe scripts** in the order to run them. Each probe is small (under 60s) and writes its findings to `ds/figma-keys.md`.

> **Pre-req**: the DS library must be linked to the canvas (Figma → Assets → Manage libraries). Confirm with the 1-liner: `figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync()` returns a non-empty array.

---

## Step 1 — List DS pages

Find the top-level pages and their child counts. Most components live as direct children of a page. Use this list to scope subsequent probes.

```js
// fileKey: <DS source file key>
return figma.root.children.map(p => ({ id: p.id, name: p.name, childCount: p.children.length }));
```

Pages you'll likely care about: **Buttons**, **Navigation**, **Headers**, **Tabs**, **Breadcrumbs**, **Inputs**, **Modals**, **Avatars**, **Pill**, **Stat Card**, **Tables**, **Misc icons**, **Icons**.

---

## Step 2 — Component variant keys (per page)

For each interesting page, list its top-level COMPONENT and COMPONENT_SET nodes. Repeat per page.

```js
// fileKey: <DS source file key>
// Pass the page ID for one page at a time. Listing multiple pages in one call may time out on large DS files.
const page = await figma.getNodeByIdAsync("<PAGE_ID>");
return page.children
  .filter(n => n.type === "COMPONENT_SET" || n.type === "COMPONENT")
  .map(c => ({ name: c.name, type: c.type, key: c.key, variantCount: c.children ? c.children.length : 0 }));
```

Record the **setKey** for each component you care about in `ds/figma-keys.md`.

### Variant keys (drill into a set)

To capture specific variant keys (e.g. `Size=md, Hierarchy=Primary`), probe one set at a time:

```js
const set = await figma.getNodeByIdAsync("<COMPONENT_SET_ID>");
return {
  setName: set.name,
  setKey: set.key,
  variants: set.children.slice(0, 30).map(c => ({ name: c.name, key: c.key }))
};
```

---

## Step 3 — Text style keys

Run on the DS file. Returns ALL named text styles.

```js
// fileKey: <DS source file key>
const styles = await figma.getLocalTextStylesAsync();
return styles.map(s => ({ name: s.name, key: s.key }));
```

Filter to the canonical 30–40 you'll actually bind (skip italics/underlines/code variants unless you need them). Use:

```js
const importedStyle = await figma.importStyleByKeyAsync(textStyleKey);
await textNode.setTextStyleIdAsync(importedStyle.id);
```

---

## Step 4 — Icon component keys

Icons usually live nested in an Icons page. Sub-categories (General, Layout, Security, etc.) contain the actual COMPONENT nodes.

```js
// fileKey: <DS source file key>
const iconsPage = await figma.getNodeByIdAsync("<ICONS_PAGE_ID>");
const wantedSubFrame = iconsPage.children.find(c => c.name === "Lined Icons" /* or "Solid Icons" */);
const wanted = new Set(['settings-01','tool-01','shield-01','book-open-01','cpu-chip-01','database-01','align-left','check-circle']);
const matches = wantedSubFrame.findAll(n =>
  (n.type === "COMPONENT" || n.type === "COMPONENT_SET") && wanted.has(n.name)
);
return matches.map(m => ({ name: m.name, type: m.type, key: m.key }));
```

Then to use:

```js
const iconComp = await figma.importComponentByKeyAsync(key);
const inst = iconComp.createInstance();
parent.appendChild(inst);
inst.resize(16, 16);  // or 20, 24 as needed
```

---

## Step 5 — Persist to `ds/figma-keys.md`

After each probe returns useful data, append it to `ds/figma-keys.md` with the same shape used in the existing entries:

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

This way the next build doesn't re-probe — it reads the key out of `ds/figma-keys.md` and goes straight to importComponentByKeyAsync.

---

## When NOT to probe

- **Token values** (colors / spacing / radius hex/px) — these come from JSON exports staged via `scripts/stage-tokens.sh`, not probes.
- **Text style values** (size/weight/lineHeight) — local `ds/tokens/typography.json` already mirrors them. Probe for **keys only**, not values.
- **Icon names** — already enumerated in `ds/icons.md`. Probe for **keys only**, when first using a specific icon.

The probe pattern is for things only the live Figma file can tell you (keys + override schemas), nothing else.
