# Design Workflow Admin — Template

This repo is the **admin / control plane** for an AI-driven design workflow. The actual design artifacts live in Figma; this repo holds the system that makes the workflow run — operating instructions, local token mirror, component manifest, brief template, and DS-specific configuration.

**This is the `template` branch.** No DS-specific content is included; everything in `ds/` is a placeholder waiting for a real design system. To use:

1. Branch off `template` for your DS (`git checkout -b your-ds-name`)
2. Follow `scripts/README.md` step-by-step — it's the agent-friendly onboarding guide
3. After staging tokens + capturing keys + customising the DS docs, the repo is ready

**No design source files belong here.** No exported frames, no component code, no demo apps.

---

## What this enables

Hand creative direction to Claude Code → Claude produces dev-ready Figma frames against your DS → engineers consume them in Figma dev mode with all components and styles resolvable. Zero margin for spec drift, zero lorem ipsum, zero detached instances.

---

## Layout

```
/
├── README.md            ← you are here
├── PLAYBOOK.md          ← durable operating contract (generic)
├── .claude/skills/design/SKILL.md  ← /design skill (loads rules + HCI laws)
├── ds/                  ← DS-specific. Swap-point for templating.
│   ├── config.md        ← Figma file URL, domain, voice, defaults
│   ├── tokens/          ← JSON mirrors of Figma variables (1 file per category)
│   │   ├── colors.json    ← palette (authoritative)
│   │   ├── semantic.json  ← semantic colors (alias + resolved hex)
│   │   ├── typography.json← text styles catalog (curated from page)
│   │   ├── spacing.json   ← spacing scale + component padding
│   │   ├── radius.json    ← corner radius scale
│   │   └── _resolver.sh   ← single entry point for any token lookup
│   ├── design-rules.md  ← strict, no-margin rules from user (overrides PLAYBOOK)
│   ├── product-context.md← Product / personas / voice / sample data
│   ├── production-layout-spec.md ← layout pattern + component vocabulary from canvas refs
│   ├── figma-keys.md    ← captured library / component variant / text-style / icon keys
│   ├── icons.md         ← icon name list
│   └── components.md    ← component manifest (lookup index, not a copy)
├── principles/          ← generic knowledge (any DS, any project)
│   ├── hci-laws.md      ← UX/HCI laws & heuristics for design + critique
│   └── figma-plugin-api.md← operational notes on use_figma (probe, bind, import)
└── templates/           ← generic workflow templates
    └── brief.md         ← structure for incoming briefs (designers/PMs)
```

### Why this shape
- `PLAYBOOK.md` is generic — survives any DS.
- `ds/` is the only thing that changes per design system. Drop a different `ds/` in and the workflow retargets.
- `principles/` and `templates/` carry reusable workflow scaffolding that's DS-agnostic.

---

## How a task runs

1. **Brief lands in chat.** Screenshots, Figma component links, written description, or a filled-out `templates/brief.md` (the format designers and PMs use).
2. **Claude reads only what's needed.** Token values from `ds/tokens/tokens.css`. Component metadata from `ds/components.md`. Component geometry/variants from Figma via MCP — only the components named in the brief.
3. **Claude designs in the target Figma file.** Frame named per the PLAYBOOK convention. All layers auto-laid out, all values bound to DS variables, all components are instances (not copies).
4. **Judgment calls flagged in chat** at the moment they're made. Information-architecture / new-pattern decisions ask first.
5. **Handoff confirmed in chat** with a one-line summary of what changed.

See `PLAYBOOK.md` for the full operating contract.

---

## Templating (future)

The repo is shaped so retargeting to another DS is a folder swap:

1. Replace the JSON files in `ds/tokens/` with the new DS's exports (colors, semantic, typography, spacing, radius, widths, shadows, blurs).
2. Replace `ds/icons.md` with the new DS's icon list.
3. Update `ds/config.md` with the new Figma file URL, domain, voice, defaults.
4. Reset `ds/components.md` to empty — it grows as components are shared.
5. `PLAYBOOK.md`, `principles/`, and `templates/` stay untouched.

The split between generic root-level files (`PLAYBOOK.md`, `principles/`, `templates/`) and `ds/` is the templating boundary.

---

## Status

- Template branch. Generic scaffold only.
- Use `scripts/README.md` to onboard a real DS.
