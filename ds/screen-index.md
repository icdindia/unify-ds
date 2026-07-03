# Screen Index — UnifyApps Platform 2026 screens file

Catalogue of every screen mined from the product screens file
**`jcbxvaNrZCWeQsIiZRta6F`** (page `0:1` "Design"). One row = one dark-green cover frame + its
successor screens. Construction details live in `ds/screen-recipes.md`; this file is the receipt
that every screen was read.

Screens sit inside SECTION `17:81668` ("Designs for Theme Migration Task Tracker") — they are
NOT direct page children; enumerate rows via the section, or by cover-frame link.

| Row | Flow | Screen | Node ID | Size | State / variant | Archetype | Deep-read |
|-----|------|--------|---------|------|-----------------|-----------|-----------|
| 1 | New Platform Sidenav (cover `17:82739`) | Dashboard | `17:82745` | 1440×1024 | Nav Closed / All Collapsed | platform-shell · nav states | ✅ |
| 1 | New Platform Sidenav | Dashboard | `17:82781` | 1440×1024 | Closed + hover flyout | platform-shell · nav states | ✅ |
| 1 | New Platform Sidenav | Dashboard | `17:82819` | 1440×1024 | Open / Sub-menus collapsed | platform-shell · nav states | ✅ |
| 1 | New Platform Sidenav | Dashboard | `17:82863` | 1440×1024 | Open / All sub-menus open | platform-shell · nav states | ✅ |

| 2 | Toggle Button Group fix in managers table (cover `17:82741`) | Dashboard (managers table) | `17:83978` | 1440×1024 | Table + broken toggle group; cursor annotation | data-table screen | ✅ lean |
| 2 | Toggle Button Group fix in managers table | Dashboard (managers table) | `1294:158721` | 1440×1024 | Table base, no annotation | data-table screen | ✅ lean |
| 2 | Toggle Button Group fix in managers table | Dashboard + Global Search | `1294:154337` | 1440×1024 | Search modal — recent | global-search modal | ✅ lean |
| 2 | Toggle Button Group fix in managers table | Dashboard + Global Search | `1294:156199` | 1440×1024 | Search modal — populated/categorised | global-search modal | ✅ lean |
| 2 | Toggle Button Group fix in managers table | Dashboard + Global Search | `1407:109666` | 1440×1024 | Search modal — empty state | global-search modal | ✅ lean |

| 3 | Manager Views Layout and Table + pills Fixes (cover `17:82743`) | Dashboard (wide managers table) | `2116:103796` | 2104×1117 | 13-col table, corrected layout ("after") | data-table screen | ✅ lean |
| 3 | Manager Views Layout and Table + pills Fixes | Dashboard (managers table) | `17:84488` | 1440×1117 | 12-col table, fake-sticky column bug ("before") + open filter dropdown | data-table screen | ✅ lean |

| 4 | automation preview + Details Page Tabs + Breadcrumbs (cover `17:82733`) | Dashboard (automation detail) | `17:82935` | 1440×1024 | Nav closed · canvas + node-inspector | automation detail page | ✅ lean |
| 4 | automation preview + Details Page Tabs + Breadcrumbs | Dashboard (automation detail) | `539:72996` | 1440×1024 | = screen 1 + cursor annotation | automation detail page | ✅ lean |
| 4 | automation preview + Details Page Tabs + Breadcrumbs | Dashboard (automation detail) | `2753:134795` | 1440×1024 | Nav open · canvas + inspector + Copilot | automation detail page | ✅ lean |
| 4 | automation preview + Details Page Tabs + Breadcrumbs | Dashboard (automation detail) | `2753:134796` | 1440×1024 | Nav closed · inspector + Copilot | automation detail page | ✅ lean |

Rows are appended as the user supplies each cover link. Counts: **4 flows · 15 screens** indexed so far.

**Row 2 note:** the flow documents a *fix* — the managers-table Page Header toggle group in the
source frames is broken (6 segments, 3 hidden ghost duplicates, all labels = placeholder "Text").
Recipes below record the **corrected** pattern, not the buggy source. The visible cross-screen
change in this row is the Global Search modal (screens 3→5), not the toggle group.
