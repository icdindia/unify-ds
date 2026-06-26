# UnifyApps Design Workflow

This repo lets **Claude (an AI) design real screens in Figma** for us — using our own design
system — instead of a person drawing every screen by hand.

The screens themselves live in **Figma** (the design tool). This repo doesn't hold pictures. It
holds the **rules, the memory, and the notes** that tell the AI how to design the way we want.

---

## The simple idea (think LEGO)

- Our **design system** is a box of official LEGO pieces — ready-made buttons, panels, menus, etc.
  Every piece already has the right shape and color.
- This **repo** is the **rulebook + the catalog of pieces** + a notebook of things we've learned.
- **Claude** is the builder. You tell it what to make; it snaps the official pieces together
  following the rules.
- **You** are the person who says *"build me the settings page"* and checks the result.

The whole point: Claude should **reuse the official pieces**, never glue together its own
look-alike, and never break the design system. The rules and catalog here are what keep it honest.

---

## How a task works (start to finish)

1. **You ask.** Drop a screenshot, a Figma link, or a sentence describing the screen you want.
2. **Claude reads the rules first.** It loads `ds/design-rules.md` (how things must look) and a few
   guides so it knows the house style before touching anything.
3. **Claude checks the catalog.** It opens `ds/ds-inventory.md` to see which ready-made pieces
   already exist for the job. If a piece exists, it must use it — no building look-alikes by hand.
4. **Claude builds it in Figma**, snapping those pieces together and using our exact colors,
   spacing, and fonts (no random values).
5. **Claude checks its own work** against the rules, fixes problems, and writes down anything new it
   learned (like a piece's location) so next time is faster.
6. **Claude tells you** in chat what it built, with a short summary.

If something is unclear or it's about to invent something new, it **asks you first** instead of
guessing.

---

## What's in here (plain-English map)

```
README.md          ← this file
PLAYBOOK.md        ← the master rulebook for how the AI should work

.claude/
  skills/design/   ← the checklist the AI runs before designing (loads the rules)
  skills/design-critic/ ← how the AI critiques a design
  agents/          ← helper AIs for specific jobs (planning, checking, probing Figma)

ds/                ← everything specific to OUR design system (UnifyApps)
  design-rules.md          ← the strict "how it must look" rules
  product-context.md       ← what UnifyApps is, who uses it, how we write copy
  production-layout-spec.md ← examples of our best screens to copy the style from
  ds-inventory.md          ← the CATALOG: every ready-made piece and where to find it
  components.md            ← notes on pieces we've used + how to use them
  figma-keys.md            ← the "addresses" the AI needs to grab a piece from Figma
  icons.md                 ← list of available icons
  config.md                ← which Figma file we draw in, plus settings
  tokens/                  ← our exact colors, spacing, fonts, corner-roundness
    _resolver.sh           ← quick tool to look up any color/spacing value

principles/        ← general design knowledge (true for any project)
  hci-laws.md      ← rules of thumb for good, usable design
  figma-plugin-api.md ← technical notes for controlling Figma

scripts/           ← setup helpers + the onboarding guide (scripts/README.md)
templates/brief.md ← a simple form for requesting a new screen
```

**Rule of thumb:** the `ds/` folder is the only part that's about *our* design system. Everything
else (`PLAYBOOK.md`, `principles/`, `templates/`) is general and would work for any design system.

---

## Why it's set up this way

- **The AI gets faster over time.** Whenever it learns where a piece lives, it writes it in the
  catalog (`ds/`). Next time it skips the searching and goes straight to building.
- **It can't drift.** The rules and catalog force it to use real pieces and real values, so every
  screen looks like it belongs to UnifyApps.
- **It's swappable.** To use this for a *different* design system, you'd just replace the `ds/`
  folder; the rest stays the same.

---

## Want to request a screen?

Just describe it in chat (a screenshot or Figma link helps a lot). For anything bigger, fill in
`templates/brief.md`. The full operating contract for the AI is in `PLAYBOOK.md`.
