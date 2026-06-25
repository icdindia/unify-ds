# Brief Template

Drop a filled copy of this into chat (or paste sections inline) to kick off a task. Sections marked **required** are blocking. Optional sections can be skipped if not applicable.

---

## 1. Feature / screen name *(required)*
What is this? One line.

## 2. Goal *(required)*
Why does this exist? What does the user accomplish? Business or user outcome.

## 3. Primary user
Who uses this? Role, context, jobs-to-be-done if relevant.

## 4. Referenced components
Direct Figma links to DS components I should use as-is. Mark which are **core** (must use exactly) if not yet logged in `ds/components.md`.

- [Component name](figma-url) — role: core | composable
- ...

## 5. References & inspiration
Screenshots, existing screens, competitor refs, Figma URLs. Anything that anchors the visual or interaction target.

## 6. Scope *(required)*
What screens / flows are in scope? Bullet them.

- Screen 1: ...
- Screen 2: ...

## 7. States required *(required)*
Pick the states each screen must cover. Default = none — only the ones listed are produced.

- [ ] Default
- [ ] Hover (where interactive)
- [ ] Focus
- [ ] Pressed / active
- [ ] Disabled
- [ ] Loading
- [ ] Empty
- [ ] Error
- [ ] Success / confirmation

## 8. Data shape
What data is displayed? Field names, types, sample values if you have them. Keeps copy realistic and prevents placeholder drift.

## 9. Out of scope
What I should explicitly NOT design. Prevents over-delivery.

## 10. Acceptance criteria
How we know it's done. E.g. "all listed states present at 1440px, components bound to variables, no detached instances."

## 11. Open questions
Anything you're unsure about and want me to flag or decide. I'll route per the autonomy thresholds in PLAYBOOK §9.
