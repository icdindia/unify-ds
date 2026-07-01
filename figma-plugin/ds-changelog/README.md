# DS Changelog — Token Diff (Figma plugin)

Pick a page of the **Unify2026 Design System**. The plugin automatically finds the last saved
change, reads that snapshot from version history, diffs it against today, and lists every
**colour, spacing and typography** change — by **design-system token / variable name** — marking
each as **Added / Deleted / Modified / Custom**. The result is drawn as a neat grid on the file's
**Changelog** page, with a link back to the analyzed page.

> Source DS file: `qT9zH1YYapGTwpJxwNEGzt`
> ([Unify2026 Design System](https://www.figma.com/design/qT9zH1YYapGTwpJxwNEGzt/%E2%9D%96-Unify2026-Design-System))

---

## What the user does (and only this)

**Choose a page from the dropdown → click "Analyze & record".** That's the whole interaction.
Per the brief, there is deliberately **no UI/UX option and no version-type option**. Everything
else is automated:

| Step | Automated behaviour |
|------|--------------------|
| Which two states to compare | **Past** = the immediately previous saved checkpoint (the version just before the latest). **Now** = today. |
| Reading version control | Figma REST `GET /files/:key/versions`, then `GET /files/:key/nodes?ids=<page>&version=<id>` for each snapshot. |
| What to diff | Every node's fills/strokes (colour), autolayout padding + gap (spacing), text style + font specs (typography), corner radius. |
| Token names | Bound variable IDs → names via the plugin API; shared style IDs → names from the REST `styles` map. |
| Classification | Added · Deleted · Modified · **Custom** (was bound to a token, now a raw/detached value). |
| Recording | Grid rendered in the panel **and** written to a **Changelog** page, headed "Compared to *past date* and *today's date*, changes made are…", with the page link. |

---

## One-time setup: a Personal Access Token

Figma **plugins cannot read version history from the scene graph** — that only exists in the REST
API, which needs auth. So on first run the plugin asks for a **Personal Access Token** (stored on
your device via `clientStorage`, never in the file):

1. [figma.com/settings](https://www.figma.com/settings) → **Personal access tokens** → *Generate*.
2. Scope: **File content → Read**.
3. Paste it into the plugin's setup box → **Save token**.

You can change/clear it later via the *change token* link. This is a device setup, not a per-run
question — the per-run interaction stays "pick a page" only.

---

## Install (development)

1. Figma desktop app → **Plugins → Development → Import plugin from manifest…**
2. Select `figma-plugin/ds-changelog/manifest.json`.
3. Open the Design System file → **Plugins → Development → DS Changelog — Token Diff**.

No build step — plain `code.js` + `ui.html`.

---

## Output columns

`Category` · `Token / Variable` · `Node · Property` · `Was (past date)` · `Now (today)` · `Status`

- **Colour** rows show a swatch + hex; the token column shows the variable name (e.g.
  `colors/text-primary (900)`), or `(detached → custom)` when a raw hex replaced a token.
- **Spacing** rows show the variable (e.g. `Spacing/spacing-lg`) and the px value.
- **Typography** rows show the applied text style (e.g. `Text/md/Medium`) or the individual
  detached specs (family / size / weight / line-height / letter-spacing).

---

## Known constraints (by design of Figma, not this plugin)

- **Version granularity** depends on Figma's history: named versions + autosave checkpoints.
  Free/Starter files keep only ~30 days. If a file has fewer than 2 versions, there's nothing to
  compare and the plugin says so.
- **"Now" = the latest saved version**, not unsaved in-canvas edits (REST only sees saved states).
  Figma autosaves frequently, so this tracks the live file closely.
- **Variable name resolution** covers variables that still exist in the file/libraries; a variable
  deleted between versions falls back to a short ID.
- **Large pages** produce large REST payloads — analysis of a very heavy page may take a few
  seconds.

---

## Files

| File | Role |
|------|------|
| `manifest.json` | Plugin manifest; `networkAccess` allowlists `api.figma.com`. |
| `code.js` | Main thread: page list, token storage, variable-name resolution, renders the Changelog grid. |
| `ui.html` | Iframe: the page dropdown (only input), REST calls, snapshot diff, results grid. |
