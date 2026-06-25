# Production Layout Spec — _TBD_

Captures the structural pattern, component composition, and dimensions to match from the DS's "Refs" or reference frames. Fill this in after studying the canvas's reference designs.

**Source**: _TBD — figma URL of the reference section in the canvas_

---

## Canvas width

_TBD_ — typically 1440 for production designs.

### Width chain at <production width>

| Region | Width |
|---|---|
| Canvas | _TBD_ |
| Sidebar nav | _TBD_ |
| Content region | _TBD_ |
| Components with side margin | _TBD_ |
| Stat / list-row units | _TBD_ |

---

## Standard frame structure

```
Frame (<canvas width> × h)
└ Outer container
   ├ Sidebar nav (<n>w × full height)
   └ Content (<content w> × h)
      ├ [optional] Breadcrumb Bar
      ├ Page header strip
      │  ├ Page Header
      │  └ Horizontal tabs
      └ Main content
```

---

## Component vocabulary

The most-used DS components in the refs. Replace any custom frame you'd otherwise build from scratch.

| Component | When to use | What it replaces |
|---|---|---|
| _TBD_ | _TBD_ | _TBD_ |

---

## Captured component variant keys

See `ds/figma-keys.md`.
