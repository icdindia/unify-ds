# DESIGN RULES

Working agreement between the designer and Claude (assembly). These are the constraints that keep every screen feeling like it belongs to the Unify system. They are not preferences — they are the rules. When a rule clearly serves the user better when broken, flag it in the build summary and we update this file together.

This file is composition + aesthetics. Token values live in `ds/tokens/`. The typography scale is in `ds/tokens/typography.json` — these rules reference style names (e.g. `Display sm`, `Text md/Semibold`) which resolve there.

---

## 1. Aesthetic intent

The Unify DS is **warm editorial**, not techy SaaS. Calm, considered, premium. Every screen should feel like it was laid out by hand, not assembled from a kit.

- **Treat screens like editorial pages**, not dashboards. Hierarchy comes from typography and breathing room, not from lines, boxes, and color blocks.
- **Spectral serif carries identity.** Use it for screen titles and card titles — anywhere we want the brand voice to come through. Geist is for everything functional (labels, body, buttons, helper text).
- **Color is restraint, not decoration.** Brand olive appears at most once or twice per screen — primary CTA, one eyebrow accent, one icon. The rest is warm neutrals.
- **Generous breathing room beats compact density.** If a screen looks crowded, it is. Default to one tier of spacing larger than feels safe.

---

## 2. Page composition

- **Page background: `bg-secondary`** (warm off-white). White cards float on top of it. Never put a white card on a white page.
- **Card surface: `bg-white`** (= `bg-primary`), `border-secondary` 1px stroke, corner radius `radius-4xl` (12px); use 16px for hero/identity cards by leaning on inline radius.
- **Card padding: `spacing-4xl` (32px)** inside. Compress to `spacing-3xl` (24px) only for tight inline panels.
- **Gap between sibling cards: `spacing-xl` (16px).**
- **Page padding:** `spacing-7xl` (64px) top / `spacing-5xl` (40px) left+right / `spacing-5xl` (40px) bottom of main content. Sidebar excluded from these calculations.
- **Default width: 1440** for the full canvas; main content sits inside that with comfortable breathing room. We do not pack into 1280.

---

## 3. Screen title pattern

Every screen anchors with this construct:

1. **Breadcrumb** above (`Text sm/Medium`, `text-tertiary`).
2. **Identity row:** logo square (64×64, `radius-3xl`, brand-tinted bg) + a stacked text block + optional status pill on the right.
3. **Text block inside identity row:**
   - **Eyebrow** — `SECTION · TYPE` in `Text xs/Bold`, ALL CAPS, letter-spaced, `text-secondary` (or `text-brand-secondary` when we want a soft brand kiss).
   - **Title** in Spectral display class — `Display sm` (30px) is the default, `Display lg` (48px) only for hero screens.
4. **Status pill** at the far right of the row when relevant (Tag/Pill component, neutral with a small colored dot for state: orange dot = Draft, success = Live, etc.).

If the product/integration has a logo, it goes in the logo square. Otherwise the title block starts flush-left.

---

## 4. Form composition

- **Never present a form as a flat field stack.** Group fields into thematic cards: "Basics", "Authentication", "Advanced", etc. Each card carries:
  - **Title** — Spectral, `Display xs` (24px) or `Text xl/Medium` for compact cards.
  - **One-line description** — `Text sm/Regular`, `text-secondary`, immediately below the title.
  - **1px `border-secondary` divider** below the description, edge-to-edge inside the card padding.
  - **Fields** — vertical stack, gap `spacing-2xl` (20px).
- **Required-field asterisk** is rendered inline with the label (`Connection name *`). The asterisk is `text-error-primary` or kept neutral; never the only signal of required-ness.
- **No `?` help icon on labels by default.** Only show the help icon when the label genuinely cannot stand alone and a tooltip adds real value. Default the DS `Label help` boolean to **false**.
- **Placeholder content must be realistic.** Never "Enter text here", never "Lorem". Use shaped, plausible values: `Nutshell — Production`, `ops@unifyapps.com`, `60 / min`. A reader should be able to imagine the screen filled in.
- **Helper text below the input**, `Text xs/Regular`, `text-tertiary`. Keep to one line whenever possible. If it's longer than the input, the field is asking too much.

---

## 5. Component choice rules

| Use… | When… |
| --- | --- |
| **Toggle** | For feature switches that change *system behavior* (rate limit, retries, encryption). Toggles say "this changes how the system behaves." |
| **Checkbox** | For binary form *data* — "I accept the terms", "Include archived items". Never use for behavior switches. |
| **Tag (Pill)** | For state, environment, region, count. Status indicators are pills, not text. |
| **Code Pill** | For product strings the user types or recognizes — API scopes, env vars, file paths. Not for emphasis text. |
| **Buttons/Link with `→`** | For ancillary "go deeper" actions in docs and side panels. Reserve real buttons for the form's primary CTAs. |

---

## 6. Right-rail docs panel (template)

When a screen has an external-facing setup task (auth, integration, deploy), it earns a right-rail docs card. The card follows this template, in order:

1. **Header row** — info/doc icon + "<Product> docs" title (Spectral) + external-link icon right-aligned.
2. **Eyebrow + numbered step list** — eyebrow like `GETTING YOUR API KEY` (`Text xs/Bold`, ALL CAPS, `text-brand-secondary`). Steps use small circular numbered bullets, not table indices.
3. **Inline product strings** as **Code Pills** inside step text — not as separate lines.
4. **One callout box** — warm-beige bg, ℹ icon, `border-secondary`, for the single most important caveat. No second callout. If there are two, the docs panel is doing too much; split it or remove one.
5. **Optional eyebrow + bulleted list** — `WHAT YOU CAN DO` followed by 3–5 outcomes (not features). End the list with an arrow link to the deeper doc.

Width: fixed **360–400px**. Lives flush-right at the card-grid level. Does not scroll independently of the form.

---

## 7. Footer rules

- Full width, sits below all card content, 1px top `border-secondary`, `bg-white`.
- **Left side: utility actions** ("Test connection", "Save draft", "Preview"). These are tertiary-style buttons with leading icons.
- **Right side: cancel + primary CTA.** Primary is brand-filled; cancel is `Hierarchy=Secondary` (light outlined).
- Footer padding: `spacing-xl` (16px) vertical, `spacing-5xl` (40px) horizontal.
- Never stack left and right groups. If horizontal doesn't fit, the screen is too dense.

---

## 8. Sidebar nav rules

- **Icon-only sidebar** (~64px wide) for product surfaces. Labels live inside each icon's tooltip.
- Default to the `Style=Framed` variant for product; `Style=Stroke` only for marketing/landing.
- The DS-shipped placeholder icons (bell + "Title") **must be swapped** to the product's actual icons before publishing. Do not ship a screen with default sidebar placeholders.

---

## 9. What we don't do

- We don't add `?` info icons to every label by reflex. Most labels can stand alone.
- We don't use brand olive for every accent. Brand should feel rare and earned.
- We don't use shadows to imply elevation between cards. Adjacent cards rely on the `bg-secondary` + `border-secondary` contrast — never `box-shadow`.
- We don't write "Lorem ipsum" or "Sample text". Every visible string is drafted as if going to production.
- We don't decorate empty space with icons or illustrations. Empty space is the design.

---

## 10. Hand-off mechanics

When Claude builds a screen, it:

- Re-reads this file at the start of every new screen.
- Flags any rule that had to be broken in the build summary, with reasoning.
- Names new screens, frames, and cards descriptively (`Nutshell — Connection setup`, not `Frame 23`).
- Returns all created node IDs so the human can navigate and intervene without hunting.

This file is updated by editing it directly with the human in the loop. Claude proposes changes in chat; human accepts before they're written.

---

## 11. Page padding & header composition (by case)

These rules **refine and override §2 page padding** for the breadcrumb pattern. When a screen uses a breadcrumb, these take precedence; the §2 64/40/40/40 rule applies only to screens without a breadcrumb header strip.

### Breadcrumb presence determines top padding

- **Breadcrumbs present** → page container top padding: **0** (the breadcrumb sits flush to the top edge).
- **Breadcrumbs absent** → page container top padding: **`spacing-xl` (16px)**.
- **The breadcrumb component itself**: left and right padding always **0** (flush to layout edge). The breadcrumb's internal content already carries its own indent.

### Page header — two cases

**Case A — breadcrumbs present**
- Gap between breadcrumb row and page header: **12px** (apply as `spacing-lg` margin-top on the header, not padding inside the breadcrumb).
- Header **left padding 16px / right padding 16px** (`spacing-xl`).
- Header **must include a back-button icon as the first child**, before the title.
  - Use the DS **Small Icon Button** with the **`arrow-left`** icon (from Lined Icons / Arrows).
  - Behavior on click: navigates to the parent route (history back).

**Case B — breadcrumbs absent**
- Header top padding: **`spacing-xl` (16px)**.
- Header left padding: **`spacing-2xl` (20px)** / right padding: **`spacing-2xl` (20px)**.
- **No back button** — the breadcrumb's job; without it there's nothing to go back to in the local nav.

### Component sourcing — headers

All headers **must use DS components**. Never compose a heading from raw text + frame when a DS header exists for the role. If a DS component doesn't exist for the case, **flag it** — do not improvise.

| Role | DS component name |
|---|---|
| Page header (the main screen-level title bar) | **Page Header** |
| Header under the main page header (sub-section) | **Header** |
| Section header (inline section markers within a card) | **Section label** |
| Form header (form-section titles inside a card) | **Form Header** |
| Platform Sidepanel header (right-rail panel) | **Sidepane header** |
| Automation Builder page header | **Automation Builder Header Bar** |
| Automation Builder page sub-header bar | **Automation Builder Sub Header Bar** |
| LC Builder page header + preview bar | **LC Builder Header + Preview Bar** |
| Automation sidepane header | **Automation sidepane Header** |

**Captured keys** live in `ds/figma-keys.md`. Component sets without captured keys yet:
- Sidepane header, Automation Builder Header Bar, Automation Builder Sub Header Bar, LC Builder Header + Preview Bar, Automation sidepane Header — probe and add when first needed.

### Why this matters

The breadcrumb-flush-to-top pattern is what makes the page feel rooted in the app shell instead of floating. The 12px gap between breadcrumb and header is tighter than §2's 64 top padding, because §2 assumes no breadcrumb to anchor the page identity.

---

## 12. Tabs, detail-page header & status patterns

Adopted from the team's warm redesign of the **Automations Preview** page (2026-06-25). Full
structural study lives in `ds/production-layout-spec.md`; these are the binding rules.

- **Page tabs are PILL style, never underline.** Active tab = `bg-primary` pill + `border-secondary`
  1px + `radius-md`, `text-primary`; inactive = plain `text-tertiary`, hover → `bg-secondary` pill.
  Use the `Horizontal tabs` rounded/pill variant, not `Style=Default` (underline). The purple
  underline treatment is retired.
- **Detail / preview pages use the detail header** (not the form `Page Header`): breadcrumb →
  Spectral `Display sm` object name + status pill → lifecycle meta row (Toggle + `V1` +
  "Deployed …", dot-separated `text-tertiary`) → right cluster: Secondary "Open in builder" +
  **Primary "Deploy"** (brand-olive) + `⋮` overflow.
- **Status pills are warm + semantic.** "Undeployed Changes" → `utility-orange` outline pill;
  Live → success dot; Draft → neutral. Pills, never bare text (reinforces §5).
- **Stat tiles** (Steps / Passed / Failed counters): big number (`Display xs`) over caps label;
  colour the number semantically — neutral total, `text-success` Passed, `text-error` Failed.
- **Brand is olive, never purple.** Any purple CTA, active state, or accent from legacy screens
  is converted to brand-olive on touch. (Reaffirms §1 — called out because the legacy app was
  purple.)
- **Documentation / side-panel rail** follows the anatomy in `production-layout-spec.md` (header
  → stat tiles → eyebrow sections → Code Pills for resources → app chips → owner/meta rows →
  `Empty State` when empty). Supersedes the looser §6 docs template for these surfaces.

- **Object detail pages share one shell** (confirmed on Automations + Applications): breadcrumb →
  Spectral title → pill tabs → main pane (dotted-canvas preview) + right rail. Right-cluster
  actions are object-specific but always Secondary(+icon) + Primary(olive) + `⋮`. Two rail
  flavours: **Documentation** (stat tiles + sections) and **Details** (metadata: URL, mono ID,
  device chip, tags, created/modified identity rows). See `production-layout-spec.md`.
- **Status colour map (use everywhere status appears — pills, table cells):** success/Done →
  `text-success`/green; warning/"Dev Backlog"/Undeployed → `utility-warning`/`utility-orange`
  amber; info/"Design" → brand/violet utility; error/overdue → `text-error` (and error text in a
  table cell goes red). Status is always a pill, never bare text.
- **Stat cards vs stat tiles:** *stat cards* (app/dashboard) = left icon badge + value + trend
  chip (`↑`/`↓`, green/red) + title; *stat tiles* (Documentation rail) = centered number + caps
  label. Both colour the number/trend semantically.

These hold "from now on" for all screens (user directive, 2026-06-25). When a DS component for a
pattern is missing (stat tile, stat card, app chip, data-table row), compose locally per
PLAYBOOK §5 using DS tokens.