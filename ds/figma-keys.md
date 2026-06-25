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

Captured on the first build (AI Agent Builder "Manual configuration" restyle), probed from DS source `qT9zH1YYapGTwpJxwNEGzt`. Capture only the components a build actually uses.

### Sidebar nav — `LC_Sidebar Navigation_Icon Only`
- **setKey**: `536e437d411ad84a0b772bf48366c259571f64e7` · nodeId `34836:68967`
- **Floating=No, Device=Desktop Vertical, Style=Framed**: `2c5b05d1cd6b1a8ec6762fb15af4484a446253a9`
- Contains repeating nav-unit atoms (below). Swap each unit's icon; active = `Current=True`.

### Sidebar nav unit — `Base_LC_Nav Unit_Icon Only`
- **setKey**: `6d8a4c0bb4ebfac9f462c0b955952c1a16fa83f2` · nodeId `1165:736` · size 40×50
- **Type=Framed-md, Current=False, Soft Fill=Off, State=Default**: `53bc6333f83b724ea584f378169d90302d72cd52`
- **Type=Framed-md, Current=True,  Soft Fill=Off, State=Default**: `c24c6ef959622be7fca36c5462f91fa2e3a4a5bb` ← active/selected
- Text node: `Text` ("Title") = tooltip/label. Icon instance `bell-01` → swap via INSTANCE_SWAP.
- Note: `Type=Framed-md` IS the §8 "Framed" style at desktop size; there is no separate `Style` prop.

### Breadcrumb — `Breadcrumb Bar`
- **setKey**: `879824224269cd8466c18e2a5cf8601eaee58469` · nodeId `36664:35617` · size 1312×28
- **Type=Default**: `20770ff9cdc34f83a031cc2e17e109cbca5b668b`
- Crumb items each have own `Text` node; override sequentially. (Inline-only variant: `_Breadcrumbs` setKey `a0238f48ebe87ae1d291648831473144d0653703`.)

### Page Header — `Page Header`
- **setKey**: `05c7817d19672a6aea95eae4ed829aaff48dd65a` · nodeId `20650:6545`
- **Type=Default, Divider=No**: `836e668f2ffb20931475bad996d8762cb8ae4ddf` (50px)
- **Type=Default, Divider=Yes**: `ad396c9da40a4a3d2397e37f730a960839acf125` (62px)
- Text: `Text`("Page Name") title · `Supporting text` subtitle · `Text`("Button CTA")×3 actions.
- Booleans: `Badges#12379:2`, `Description#12379:3`, `Actions#27400:4`, `Show App Icon#50300:0`, `Back Button#50300:5` (all default true).

### Form Header (card/section titles) — `Form Header`
- **setKey**: `c60a0e7f5b739ab47b2c816a2ca2f53b752d710c` · nodeId `59836:85546`
- **Level=Level 1**: `94457bdd98af75710a6f553a532d09fdce28f52e` (44px) ← primary card heading
- **Level=Level 2**: `a61a7b842c3c4d42103518052bbac6638b33bf50` (40px) · **Level=Level 0**: `c947c55ab7445ec32892e3cdd1aa9a7919f28cf1` (42px)
- Text: `Text` title · `Supporting text` description.
- Booleans: `Supporting text#15344:2`(t), `Actions#15346:14`(t), `Divider#59836:0`(**f — set true**), `Help Icon#59836:7`(t), `Featured icon#59836:14`(t), `Search#59840:0`(t), `More#59840:9`(t), `Badge#59853:0`(t).

### Tag (status pill) — `Tag`
- **setKey**: `3dddc40988d7e2aba1c1f37f2463088c34a5a1c1` · nodeId `3307:417515` · size ~58×24 (sm)
- **Icon=Dot, Action=Text only, Size=sm, Type=Outline, State=Default**: `166d4f89f7cea47b2c0cc94eeb9d2677455e5acd`
- **Icon=Dot, …, Type=Solid**: `390d972072e64c6e7224d3f6d2396f0d287bb99f` · **Icon=False, …, Outline**: `bdef16d3a1f8e455682472ad3432dc7ea35ac56f`
- Text node `Text`("Label"). No built-in Color prop — apply dot/border color token at instance level. (Named-color alt: `_Pill rounded` setKey `e4dbe7e1eaf0094badfdec0bb33982ad246bef2d`, has `Color=Gray…`.)

### Button — `Buttons/Button Brand`
- **setKey**: `4734389538bc2d0beec7a14b6b03ea32abb43cc0` · nodeId `3287:427074` · size 128×32 (md)
- **Size=md, Hierarchy=Primary,   Icon=Default, State=Default**: `868eb6a10a0029aa3847bb98965033d597976d9f`
- **Size=md, Hierarchy=Secondary, Icon=Default, State=Default**: `ec491808d9471c4a7efc44f54109d760a934a781`
- **Size=md, Hierarchy=Tertiary,  Icon=Default, State=Default**: `277b068eb1b4597abf839d53599d5996fa104547`
- **Size=md, Hierarchy=Primary, Icon=Dot leading**: `a5fd14d790370dd2080f3dc99a84d0fa4e6904a2`
- Text `Text`("Button CTA"). Booleans: `⬅️ Icon leading#3287:1577`, `➡️ Icon trailing#3287:2338`; swaps `🔀 Icon leading swap#3466:91`, `🔀 Icon trailing swap#3466:852`. (Greyscale: `Buttons/Button Neutral` setKey `7be96c9ee274f472dead656f7d1d67120b4adaff`.)

### Input (single-line) — `Input field_outline`
- **setKey**: `62a4e15407ce55b43db72b277ff542b311726a4e` · nodeId `1090:57817`
- **Size=md, Type=Default, Destructive=False, State=Placeholder**: `ef10da4d1c948ca9c6e0e7a3e5ed1337f66f4094`
- Text: `Label` · `Text`(value/placeholder) · `Hint text`. Booleans: `Label#3285:0`, `Hint text#3285:337`, `Help icon#3285:674`, `Leading icon#20691:0`(f), `Encryption#54441:338`(f). No discrete required-asterisk prop — bake `*` into `Label`. (Variants: `Input field_solid` `4604c611bb223c53c2bb4643a5661b5b8ca33aec`, `Input field_ghost` `8099e33657417734455887792c93237553f6adea`.)

### Textarea (multi-line) — `Textarea input field`
- **setKey**: `9dd4562f1a4fcf2aec4acbf17e0f5ad1a4e06add` · nodeId `1238:278` · size 320×104
- **Type=Default, Destructive=False, State=Placeholder**: `85eb202936ac8aa29019384d70377af8ef8137ab`
- **…State=Focused**: `5fd904a99f5208b50e39687325c7cdfab11b0b0d`
- Text: `Label` · `Text`(placeholder) · `Hint text` · `Character Limit`. Booleans: `Label#3285:1011`, `Hint text#3285:1040`, `Character Limit#38274:0`(f). (Rich text: `Textarea input field_Rich Text` `b7b24e77206847e41a18979fabdfdf365226d492`.)

### Tabs — `Horizontal tabs`
- **setKey**: `85bd5cc93ea8daefcb4cffe72f5d20693a5d0a2a` · nodeId `8102:114154`
- **Style=Default, Start Icon Style=None, Size=sm**: `f1472da08f857d83f6e1602c7172ac7de1fa6065` (32px)
- **Style=Default, Start Icon Style=Icon, Size=sm**: `4410e5f9bab8333e7917ea31eef3cbde3309185e`
- Each child `_Tab base` (setKey `f6e8510153f988027f14cb2c3e8c5cac96de5315`) has `Current` {True,False}; set Current=True on active. `Add New Icon#10081:0` boolean (default t — set false). DS substitute for segmented control.

### Toggle — `Toggle`
- **setKey**: `5678aaffc370ce454d242b619ebd57e5ba694ab2` · nodeId `1102:4208`
- **Pressed=False (OFF), Text=False, State=Default, Size=sm, Hint Text=False, Label Position=Left**: `56fad60c980cfa09dae02f5fe4d426828e5b633f`
- **Pressed=True (ON),  …, Size=sm, …**: `c1c357210bd9a1ae781bdfabc2bd4776e519be8c`
- **Size=md OFF**: `ea9d4f2810a5e919c9bb14d541c1e7ba0d8b7836` · **Size=md ON**: `ac03892e3a03acee93502863bde08b817a6ecd22`
- With label (sm, Text=True, Label Position=Right): `c311072edff57f11c5f66783ce027be049b7fcf9`; label node `Text`. `Pressed=True`=ON.

---

## Icon component keys

From the `Lined Icons` sub-frame (`3463:407484`) on the Icons page, DS source file.

| Icon name | Key | Node ID |
|---|---|---|
| arrow-left | `c4adb961cb3808eb7a7089f90a2fdab9ec9dba00` | `59626:4641` |
| stars-02 | `b36c3f68ef74021cbba74f2197ce94f59be3bc63` | `59626:8485` |
| upload-cloud-02 | `23f58bd11af80f08e3e628eb576815f06f1e0155` | `59626:5751` |
| plus | `a00ad60395d291d6ace7af585acc80b46c9f2c98` | `59626:5911` |
| message-chat-square | `ebec0dfe2066d360825585e0b6b52b7781467d72` | `59626:7166` |
| tool-02 | `0d6366f43fed037ddc96931f000575755e9264e9` | `59626:5707` |
| zap | `1bce93b22f22af3521d8102bbaf4bf44b709ffab` | `59626:5767` |
| link-external-01 | `6392788c5bca126e2679f635985a4ca58a8f07f9` | `59626:5795` |
| play | `065a3a67abf88b58acdbae03ae773eb6468a2465` | `59626:6732` |
| edit-05 | `7a8d591cfefeb012fd4e5cbf94717649a9aac810` | `59626:6011` |
| book-open-01 | `b8adad70911a511908e42c83a85a45d0f07c51a0` | `59626:4295` |

> Substitutions (DS has no exact match): `message-chat-circle`→`message-chat-square`; `link-external-02`→`link-external-01`; `edit-02`→`edit-05` (the `edit` COMPONENT_SET `d7110875d047e7ff86104c5850075fb1368e6479` / node `60571:137842` may carry `edit-02` as a variant — sub-probe if exact needed).

---

## AI Agent Builder restyle — follow-up probe (2026-06-25)

### Empty State — `Empty State`
- **setKey**: `79590f4035a847d4b5c06f10318288e09556dd29` · nodeId `34650:5767` (on Empty states page `1172:31`)
- Variants: `Size=md, Type=Default` → `a64dfe53928905d3077dacaa16d4f5015402b8dc` ← centered empty panel (featured icon 40×40 + title + button); `Size=sm, Type=Default` → `dadbba21535441879a3715a9dabd22897ebbbddb`; `Size=md, Type=Descriptive` → `6debfd8594e40eead8265ccc2166b281ee34a327` (stepper with 3 items)
- **Use `Size=md, Type=Default`** for "You haven't added any user yet" panel. Featured icon INSTANCE_SWAP prop at `data-name="Featured icon"`. Text nodes: `Create Your First Entity` (title), subtext node below. Button is an embedded `Buttons/Button Brand` instance.
- Related: `Empty State - Button` setKey `d0e0d7bfb4d0e10145dddeea9820d2ae7deafd59` · `Empty State - Row` setKey `0279b96c743d6fa720eff815c66fdceefc8f5476` · `Empty State_Status` (singleton) setKey `b7d8ed5992357f3da3b5fd069b0e52c67efd47e1`

### Chat Empty State — `Chat Empty State`
- **setKey**: `0337e41908b5e2dab422dae690ac33f9eed341dd` (component_set)
- Specifically for chat/conversation panel empty treatment.

### File type icon (solid) — `File type icon/solid`
- **setKey**: `e2b61408ffe83c477308dda35edec2cd97cef5a2` (component_set)
- Use for file-format badge inside a custom-assembled file list row.

### Input Menu Dropdown — `Input Menu Dropdown`
- **setKey**: `6b0c7c2af450141e3aa2ef094dcb0fbe61594ae1` (component_set)
- Closest DS list-row component. Intended as a dropdown item, not a general list row — see gaps note.

### Table — `Table`
- **setKey**: `64048af04a68983c637e24ffe7b49d206822d6d1` (component_set)
- Full table component; no standalone "table row" sub-component exposed in the DS library search.

> Gaps confirmed (2026-06-25 probe): No DS components found in Unify2026 for: Card/Section container, File attachment list item, Generic list item row (icon+title+trailing action), Setting toggle row, Conversation starter chip, Footer/action bar. These roles must be composed locally as plain styled frames using DS tokens (per PLAYBOOK §5).

---

## Governance / Settings page probe (2026-06-25)

### Empty State - Button — `Empty State - Button`
- **setKey**: `d0e0d7bfb4d0e10145dddeea9820d2ae7deafd59` · nodeId `34675:3431` · size 480×44 (md) / 480×36 (sm)
- **CAUTION**: This is a dashed-border inline CTA row (not a full empty state panel). Use for table/list footer add-row triggers.
- Variants: `Type=With CTA, State=Default` → `e91e5cd627058bd9ca36c7ae0a34f086e3128b20` ← use this; `Type=With CTA-sm, State=Default` → `0c67519f39463405ed5ad691d253951b13a09c41`; `State=Hover` → `f30484bc7469fe83661b0dc91ac82e4294c44d02`; `State=Focus` → `705ad9e0ea7fd81b7a443cccafbdb4dacb48d82c`; `State=Disabled` → `425d529d42d2d1a04be23e6bf0cfdc564784c130`
- Text nodes: icon `plus` (INSTANCE_SWAP at `35791:5542`); label `p` node `Button CTA` (Text sm/Regular); optional trailing `chevron-down` icon wrapped in `Icon Wrap` (boolean `dropdown` prop, default true — set false for simple triggers).
- No "Featured icon" swap, no "Title"/"Supporting text" — those belong to the `Empty State` base component.

### Toggle group (Pill page tabs / segmented control) — `Toggle group`
- **setKey**: `6267fc6886d9519de3bae1f4a1364dc44068428b` · nodeId `15359:31718`
- **Correct component for "Overview | Versions | Localization | Walkthroughs | Settings" page tabs.** Track has `bg-secondary` (#f7f5f3) + rounded pill. Active item has `bg-primary` (white) + shadow-sm. Inactive items plain text on track.
- Variants used by this brief:
  - `Type=Neutral, Style=Text, Size=sm` → `10e7dd174abf6b9d35915a2996c92aa0c59c3f33` ← 5-tab page switcher
  - `Type=Neutral, Style=Text, Size=md` → `91c5e9bc155499e20262bb63507d08ef5ee84bdb`
  - `Type=Brand, Style=Text, Size=sm` → `4b529b980af8f43c73ee0e087ce502c24793a9d6` (brand accent active)
- Props/slots: VARIANT `Type` {Neutral|Brand|Inset} · `Style` {Text|Icon with text|Icon only} · `Size` {xs|sm|md|lg|xl}. Active item set via `_Toggle group base` sub-component (Current=True). Each item's text node named `Text`.
- Sub-component: `_Toggle group base` setKey `a96ba19fb0a0938c258e9d514833d1c0dc9b76a6` · nodeId `15359:31027` (216 variants). Key states: `Type=Neutral, Size=sm, Current=True, Icon=False, State=Default` → `01f11dfe72413e4f4d61964c926eb7fa7945eab5`; `Current=False` → `286148872a48acacd21f90fc19fdff0e424d00c7`.

### Horizontal tabs — `Button Tab base` sub-component (alternative tab atom)
- **setKey**: `3a9fe403a4beffc621a7a49be482b19106a35c6e` · nodeId `61409:50768`
- Sub-component of `Horizontal tabs, Style=Button Tabs`. Each tab is a `rounded-sm` pill, `bg-primary` + border for active, `bg-tertiary` for inactive (no track wrapper — items float independently).
- Key variants: `State=Default, Current=Yes, Size=sm` → `9a75cda6d678982190261c7ffc656f02c1c6a5aa`; `State=Default, Current=No, Size=sm` → `6c4caadc160b5351ec3ab4d85a4ab29e5d06bd10`
- Text node inside: `p` child (Text xs/Medium). No `Add New Icon` boolean on Button Tabs style.

### Button group — `Button group`
- **setKey**: `3bddb5134aaf0614782db73d392ca5e57dc5dbbb` · nodeId `1046:10171` (12 variants) — also noted for reference.

### List Item (checkbox/radio variant) — `List Item`
- **setKey**: `08002cf14b8f0807ae9b5b0a5e8b7f0b7c65f53b` · nodeId `34509:23675`
- Variants: Type {Radio button|Checkbox|Icon simple} × Size {sm|md} × Selected {True|False} × State. NOT a settings-row pattern. Use for selection lists only.

### Icons — new keys captured (Lined set, frame `59626:3533`, Icons page `3463:407484`)

| Icon name | Key | Node ID |
|---|---|---|
| user-plus-01 | `5e6a822485f557939270bcc07aa37da88423b96d` | `59626:6437` |
| user-square | `2a7d61fa193aada21566642942b0d66d957a6b44` | `59626:6453` |
| users-01 | `cc45c6581458532269e670932dba2f2cc3b69e01` | `59626:6473` |
| shield-tick | `8a4389e61d58904c90a3612c9cadb099f125c063` | `59626:4220` |
| shield-01 | `3375996c8a50c66058d312ce6aa716d8c27b9c7e` | `59626:4228` |
| shield-02 | `99a0bedb98df5a9de2c36f009957ea5dd764d76a` | `59626:4232` |
| lock-01 | `e8e437ab16ff268bb6503e930ba5424fb132fc04` | `59626:4152` |
| lock-02 | `708ccf7fcf824f8d8de09b4d4bc49d67765c3099` | `59626:4156` |
| chevron-down | `ba9d16a5fecb946b07fb8968b71f6966d54f9324` | `59626:4693` |
| chevron-right | `1534a28d83aa9fbaa2e4a9b96f8c383764684fb6` | `59626:4757` |
| chevron-left | `e2d7fd671653e9d633066e8f3d8a4b9f4c93b32e` | `59626:4725` |
| chevron-up | `3d4d7390892a39fa1fa708f4bb0a0968a3ee655a` | `59626:4829` |
| users-plus | `875043dc0f3bf522aaafc8627b1b9737ba7e8274` | `59626:6497` |
| user-check-01 | `be0d18c4e5e86a01a2dc780ca62f8f187e0a66fa` | `59626:6393` |
| user-x-01 | `26667cfbffb568da337c0bb27295ebdad38d9b0d` | `59626:6465` |

> Icon substitutions for this build: `user-circle` → use `user-square` (exact match unavailable); `address-book` → use `user-square` (none in DS); `id` → use `user-square` (none in DS); `person-badge` → use `user-square` (none in DS); `user-plus` (without -01) → use `user-plus-01`; `security/person-badge icon for Governance` → use `user-square`; `doc-lock icon for Security` → use `lock-01` or `shield-01`.
