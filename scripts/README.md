# Setup — for an agent retargeting this repo to a new DS

You're an agent. The repo is a Figma-design control plane. The user has linked a new DS Figma file to a canvas and wants this repo retargeted to it. Your job: get the agent ready to ship pixel-perfect designs against the new DS without wasting tokens re-discovering things.

**Token discipline**: every step below is the minimum needed. Don't grep the whole repo before starting. Don't probe Figma for things that come from JSON exports. Don't load full token files into context — query them via `ds/tokens/_resolver.sh`.

---

## Step 0 — Read these three, then stop reading

In order, once each:

1. `PLAYBOOK.md` — operating contract
2. `.claude/skills/design/SKILL.md` — design-grounding skill (auto-loads, but read it once)
3. `principles/figma-plugin-api.md` — the use_figma gotchas and binding patterns

Then refer to specific files only when a task requires them. Do **not** preemptively load `colors.json` / `semantic.json` / `icons.md` / `figma-keys.md` — they're queried, not read.

---

## Step 1 — Collect from the human

Get these from the user in one ask (don't drip-feed):

1. **Canvas Figma file URL** (where designs go).
2. **DS source Figma file URL** (read-only reference).
3. **Token JSON exports** (from a Figma variables plugin like Tokens Studio or Variables2JSON), separately for: colors, semantic, spacing, radius. Each is optional but the more provided the less probing later.
4. **Product context** — one paragraph: what the product does, who uses it, voice/tone.
5. **Design rules** — if they have a written design rules doc, get it. Otherwise infer from refs and propose.

---

## Step 2 — Stage what's provided

Variables/spacing/radius JSON exports:

```bash
scripts/stage-tokens.sh \
  --colors path/to/colors.json \
  --semantic path/to/semantic.json \
  --spacing path/to/spacing.json \
  --radius path/to/radius.json \
  --ds-file-key <DS_FILE_KEY>
```

The script validates JSON, drops into `ds/tokens/`, injects a `_meta` block. After staging:

```bash
ds/tokens/_resolver.sh --test
```

Should succeed. If a colour or spacing token comes back `(not found: ...)`, the export's key naming doesn't match the resolver — investigate before continuing.

**Typography** is harder to export cleanly from plugins. Probe the DS instead (see Step 4 below) and curate `ds/tokens/typography.json` once.

---

## Step 3 — Update DS-specific docs

Edit these four files with the new DS's identity:

1. `ds/config.md` — Figma URLs, team ID, branding info
2. `ds/product-context.md` — what the product is, modules, personas, sample-data conventions, voice
3. `ds/design-rules.md` — strict rules (composition, hierarchy, padding, what-we-don't-do)
4. `ds/components.md` — wipe; will refill as components are encountered

Empty/placeholder versions exist on the `template` branch. On a retarget, replace contents — don't delete the files.

---

## Step 4 — Probe Figma for what JSON can't carry

Follow `scripts/probe-keys.md` for the precise scripts. Capture into `ds/figma-keys.md`. Do these as a **one-time** pass, then refer back:

- **Library variable collection names** (`getAvailableLibraryVariableCollectionsAsync`) — confirms the library is linked
- **Component variant keys** — only for components you'll actually use; don't sweep everything
- **Text style keys** (`getLocalTextStylesAsync` on DS file) — enumerate once, capture the 30–40 you'll bind
- **Icon component keys** — capture on-demand, scoped to the right sub-frame (Lined Icons → category)

**Rule**: never run `figma.root.findAll` on a large DS file — it times out. Always scope to a specific page via `getNodeByIdAsync(pageId).children`.

---

## Step 5 — First build dry-run

Pick a small reference screen the user shared. Build it in **3 phases** to stay under the use_figma 60s timeout:

1. **Skeleton** — outer frame + sidebar nav + content shell
2. **Top section** — breadcrumb + header strip (with §11 padding rules) + tabs
3. **Body** — left rail + right content cards

Use `clone()` for repeating structures (e.g. cards) where possible.

After the build runs `/design-critic` (mandatory loop, see the design skill). Fix → re-critique → hand off. **Never raise a design without running the critic loop.**

---

## Step 6 — Verify

- `git status` clean before declaring done.
- Frame ID visible to user.
- `ds/figma-keys.md` has the new component/text-style keys appended.
- `ds/components.md` has entries for components used in the first build.

---

## What this repo never does

- **Never** invent token values. If a size/spacing/color isn't in the JSON, flag the gap.
- **Never** apply font/size/lineHeight inline. Use `setTextStyleIdAsync` with keys from `ds/figma-keys.md`.
- **Never** use `box-shadow` for card elevation (rule §9).
- **Never** write lorem ipsum (rule §9).
- **Never** hand a design back without running the critic loop.

---

## File-by-file purpose (cheat sheet, read only when needed)

| Path | When to read |
|---|---|
| `PLAYBOOK.md` | Once at start; refer for autonomy thresholds / decision logging |
| `.claude/skills/design/SKILL.md` | Auto-loaded on design tasks |
| `.claude/skills/design-critic/SKILL.md` | Auto-loaded after build |
| `principles/hci-laws.md` | Critic invocation |
| `principles/figma-plugin-api.md` | Before any `use_figma` write |
| `ds/design-rules.md` | Once at start; refer for the §11 padding rule |
| `ds/product-context.md` | Before writing copy |
| `ds/config.md` | For Figma file keys |
| `ds/components.md` | Looking up a known DS component |
| `ds/figma-keys.md` | For component / text-style / icon keys |
| `ds/icons.md` | Picking icon names |
| `ds/production-layout-spec.md` | Width chain + component vocabulary |
| `ds/tokens/_resolver.sh` | Every token lookup (don't open the JSONs) |
| `templates/brief.md` | If a brief format is needed |
| `scripts/stage-tokens.sh` | Onboarding a new DS |
| `scripts/probe-keys.md` | Capturing Figma keys |
