// DS Changelog — Token Diff (main thread)
// -------------------------------------------------------------
// Responsibilities of this file (the sandboxed main thread):
//   1. Enumerate the file's pages and hand them to the UI dropdown.
//   2. Store / retrieve the Figma Personal Access Token (one-time setup) in clientStorage.
//   3. Resolve variable + style IDs -> human names (the UI iframe can't touch the scene graph).
//   4. Render the finished diff as a neat grid onto a "Changelog" page.
// All network / version-control work happens in ui.html (only the iframe can fetch()).

const TOKEN_KEY = "figma_pat_v1";

figma.showUI(__html__, { width: 760, height: 620, themeColors: true });

// ---- boot ----------------------------------------------------
(async () => {
  const pages = figma.root.children.map((p) => ({ id: p.id, name: p.name }));
  const token = await figma.clientStorage.getAsync(TOKEN_KEY);
  figma.ui.postMessage({
    type: "init",
    fileKey: figma.fileKey || null,
    fileName: figma.root.name,
    pages,
    hasToken: Boolean(token),
  });
})();

// ---- message router -----------------------------------------
figma.ui.onmessage = async (msg) => {
  try {
    switch (msg.type) {
      case "save-token":
        await figma.clientStorage.setAsync(TOKEN_KEY, (msg.token || "").trim());
        figma.ui.postMessage({ type: "token-saved" });
        break;

      case "get-token": {
        const token = await figma.clientStorage.getAsync(TOKEN_KEY);
        figma.ui.postMessage({ type: "token", token: token || null });
        break;
      }

      case "clear-token":
        await figma.clientStorage.deleteAsync(TOKEN_KEY);
        figma.ui.postMessage({ type: "token-saved" });
        break;

      case "resolve-names":
        figma.ui.postMessage({
          type: "names-resolved",
          map: await resolveNames(msg.variableIds || [], msg.styleIds || []),
        });
        break;

      case "write-changelog":
        await writeChangelog(msg.payload);
        figma.ui.postMessage({ type: "written" });
        figma.notify("Changelog page updated ✔");
        break;

      case "notify":
        figma.notify(msg.message, msg.error ? { error: true } : undefined);
        break;

      case "close":
        figma.closePlugin();
        break;
    }
  } catch (e) {
    figma.ui.postMessage({ type: "error", message: String((e && e.message) || e) });
  }
};

// ---- variable + style name resolution -----------------------
async function resolveNames(variableIds, styleIds) {
  const map = {};
  for (const id of variableIds) {
    try {
      const v = await figma.variables.getVariableByIdAsync(id);
      if (v) map[id] = v.name; // e.g. "colors/text-primary (900)"
    } catch (_) {
      /* variable deleted / from another file — leave unresolved, UI falls back to id */
    }
  }
  for (const id of styleIds) {
    try {
      const s = await figma.getStyleByIdAsync(id);
      if (s) map[id] = s.name; // e.g. "Text/md/Medium"
    } catch (_) {
      /* style removed */
    }
  }
  return map;
}

// ---- render the grid onto a "Changelog" page ----------------
async function writeChangelog(payload) {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });

  // Find or create the Changelog page.
  let page = figma.root.children.find((p) => p.name === "Changelog");
  if (!page) {
    page = figma.createPage();
    page.name = "Changelog";
  }

  const COLORS = {
    ink: rgb("#1f1e1d"),
    sub: rgb("#6a6662"),
    line: rgb("#e6e1d8"),
    headBg: rgb("#f4f0ea"),
    white: rgb("#ffffff"),
    added: rgb("#1f7a3d"),
    deleted: rgb("#b42318"),
    modified: rgb("#b25e09"),
    custom: rgb("#7a3ca0"),
    linkBlue: rgb("#1a5fb4"),
  };
  const CAT = { colour: "Colour", spacing: "Spacing", typography: "Typography", radius: "Radius" };
  const COLS = ["Category", "Token / Variable", "Property", `Was — ${payload.pastDate}`, `Now — ${payload.todayDate}`, "Status"];
  const WIDTHS = [96, 240, 150, 190, 190, 110];

  // Report card (autolayout, top-to-bottom).
  const card = figma.createFrame();
  card.name = `Changelog — ${payload.pageName} — ${payload.todayDate}`;
  card.layoutMode = "VERTICAL";
  card.primaryAxisSizingMode = "AUTO";
  card.counterAxisSizingMode = "AUTO";
  card.itemSpacing = 4;
  card.paddingTop = card.paddingBottom = 24;
  card.paddingLeft = card.paddingRight = 24;
  card.cornerRadius = 12;
  card.fills = [{ type: "SOLID", color: COLORS.white }];
  card.strokes = [{ type: "SOLID", color: COLORS.line }];
  card.strokeWeight = 1;

  const title = txt(`Design System changes · ${payload.pageName}`, 20, "Semi Bold", COLORS.ink);
  card.appendChild(title);

  const sub = txt(
    `Compared to ${payload.pastDate} and ${payload.todayDate} · ` +
      `${payload.rows.length} change${payload.rows.length === 1 ? "" : "s"}  ` +
      `(＋${payload.counts.Added} added · ✎${payload.counts.Modified} modified · ` +
      `🗑${payload.counts.Deleted} deleted · ◆${payload.counts.Custom} custom)`,
    12,
    "Regular",
    COLORS.sub
  );
  sub.layoutSizingHorizontal = "HUG";
  card.appendChild(sub);

  const link = txt(`🔗 ${payload.pageUrl}`, 12, "Medium", COLORS.linkBlue);
  link.hyperlink = { type: "URL", value: payload.pageUrl };
  card.appendChild(link);

  const spacer = figma.createFrame();
  spacer.resize(1, 12);
  spacer.fills = [];
  card.appendChild(spacer);

  // Table.
  const table = figma.createFrame();
  table.layoutMode = "VERTICAL";
  table.primaryAxisSizingMode = "AUTO";
  table.counterAxisSizingMode = "AUTO";
  table.itemSpacing = 0;
  table.fills = [];
  table.strokes = [{ type: "SOLID", color: COLORS.line }];
  table.strokeWeight = 1;
  table.cornerRadius = 8;
  table.clipsContent = true;
  card.appendChild(table);

  // Header row.
  table.appendChild(
    makeRow(
      COLS,
      WIDTHS,
      { bg: COLORS.headBg, weight: "Semi Bold", color: COLORS.ink, line: COLORS.line }
    )
  );

  // Data rows.
  if (payload.rows.length === 0) {
    const empty = makeRow(
      ["—", "No token-level changes detected between the two versions.", "", "", "", ""],
      WIDTHS,
      { bg: COLORS.white, weight: "Regular", color: COLORS.sub, line: COLORS.line }
    );
    table.appendChild(empty);
  } else {
    for (const r of payload.rows) {
      const statusColor =
        r.status === "Added" ? COLORS.added :
        r.status === "Deleted" ? COLORS.deleted :
        r.status === "Custom" ? COLORS.custom : COLORS.modified;
      const row = makeRow(
        [CAT[r.category] || r.category, r.token || "—", r.property, r.was, r.now, r.status],
        WIDTHS,
        { bg: COLORS.white, weight: "Regular", color: COLORS.ink, line: COLORS.line, statusColor }
      );
      table.appendChild(row);
    }
  }

  // Place the new card at the top-left of the page, stacked below any prior reports.
  const priorCards = page.children.filter((n) => n.type === "FRAME");
  let y = 80;
  for (const c of priorCards) y = Math.max(y, c.y + c.height + 40);
  card.x = 80;
  card.y = priorCards.length ? y : 80;
  page.appendChild(card);

  figma.currentPage = page;
  figma.viewport.scrollAndZoomIntoView([card]);
}

// ---- tiny node helpers --------------------------------------
function makeRow(cells, widths, opts) {
  const row = figma.createFrame();
  row.layoutMode = "HORIZONTAL";
  row.primaryAxisSizingMode = "AUTO";
  row.counterAxisSizingMode = "AUTO";
  row.itemSpacing = 0;
  row.fills = [{ type: "SOLID", color: opts.bg }];
  row.strokes = [{ type: "SOLID", color: opts.line }];
  row.strokeWeight = 1;
  row.strokeAlign = "INSIDE";

  cells.forEach((val, i) => {
    const cell = figma.createFrame();
    cell.layoutMode = "VERTICAL";
    cell.primaryAxisSizingMode = "AUTO";
    cell.counterAxisSizingMode = "FIXED";
    cell.resize(widths[i], 10);
    cell.paddingTop = cell.paddingBottom = 9;
    cell.paddingLeft = cell.paddingRight = 12;
    cell.fills = [];
    const isStatus = i === cells.length - 1;
    const color = isStatus && opts.statusColor ? opts.statusColor : opts.color;
    const weight = isStatus && opts.statusColor ? "Medium" : opts.weight;
    const t = txt(String(val == null ? "" : val), 12, weight, color);
    t.layoutSizingHorizontal = "FILL";
    cell.appendChild(t);
    row.appendChild(cell);
  });
  return row;
}

function txt(characters, size, style, color) {
  const t = figma.createText();
  t.fontName = { family: "Inter", style };
  t.characters = characters;
  t.fontSize = size;
  t.fills = [{ type: "SOLID", color }];
  return t;
}

function rgb(hex) {
  const n = hex.replace("#", "");
  return {
    r: parseInt(n.slice(0, 2), 16) / 255,
    g: parseInt(n.slice(2, 4), 16) / 255,
    b: parseInt(n.slice(4, 6), 16) / 255,
  };
}
