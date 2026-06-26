# Icon Library — Unify2026

Local index of icon names. Pick icons by name when designing; never invent names or fetch the full
library from Figma at runtime.

**Icon component KEYS** (needed to import an icon) live in `ds/figma-keys.md` → "Icon component
keys". This file is the name reference; figma-keys.md is the key reference. Capture a new icon's key
there on first use.

- **Source**: Lined Icons set on the DS **Icons page** (`3463:407484`, file `qT9zH1YYapGTwpJxwNEGzt`).
  A solid set also exists. Names follow `<noun>-<variant>-<modifier>` (e.g. `arrow-left`,
  `check-circle`, `settings-01`).
- **To use an icon**: `const c = await figma.importComponentByKeyAsync(key); const i = c.createInstance(); parent.appendChild(i); i.resize(16,16);` then recolor its vector fills to a bound variable.
- **To find a name/key not listed below**: probe the Icons page by name (see `scripts/probe-keys.md`
  Step 4) and add it to `ds/figma-keys.md`. The full set is large; we capture incrementally rather
  than mirror all of it.

Typical categories on the page: AI / Agents · Arrows / Chevrons · Charts · Communication ·
Development · Files · Finance · General UI · Images · Layout · Maps · Media · Security ·
Status / Alerts · Time · Users · Weather.

---

## Confirmed icons (keys in `ds/figma-keys.md`)

Captured across builds so far. Names verified to exist in the DS Lined set:

- **Arrows / Chevrons**: `arrow-left` · `chevron-up` · `chevron-down` · `chevron-left` · `chevron-right`
- **General UI**: `plus` · `edit-05` · `copy-01` · `dots-vertical` · `maximize-01` · `link-external-01` · `x-circle`
- **Files / Dev**: `download-01` · `file-download-03` · `code-01` · `code-02` · `code-square-01` · `file-code-01` · `clipboard` · `book-open-01`
- **Users**: `user-square` · `user-plus-01` · `users-01` · `users-plus` · `user-check-01` · `user-x-01`
- **Security**: `shield-01` · `shield-02` · `shield-tick` · `lock-01` · `lock-02`
- **AI / Media / Misc**: `stars-02` · `zap` · `play` · `upload-cloud-02` · `message-chat-square` · `tool-02` · `flip-forward` · `expand-01` · `share-04`

> Substitution notes (DS lacks an exact match) are recorded inline in `ds/figma-keys.md`
> (e.g. `user-circle`→`user-square`, `message-chat-circle`→`message-chat-square`). There is no
> standalone `x-close`/`download-02` in the Lined set — draw a vector X, or use `x-circle`.
