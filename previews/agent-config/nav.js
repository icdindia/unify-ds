/* =====================================================================
   UnifyApps — interactive platform navigation
   States & spec: Unify2026 DS (qT9zH1YYapGTwpJxwNEGzt)
     45945:21244  Open / Closed      · 60766:106618  Hover/Selected/Floating
   Behaviour:
     • Collapsed rail  → click header/logo toggles OPEN (expanded) state
     • Collapsed rail  → click a main item opens its floating sub-menu
     • Open (expanded) → click a main item expands its sub-items inline
     • Sub-item click  → selected (destination component: TBD — see chat)
   ===================================================================== */
(function () {
  var ICON = 'assets/icons/';

  // Sub-item map — transcribed from DS "State=Open, Sub Menu=All Open" (45945:37354)
  var NAV = {
    top: [
      { key: 'ai-agents',   icon: 'ai-agent.svg',        label: 'AI Agents',
        subs: ['Agents','Teams','A2A Servers','Copilot','Enterprise Search','MCP Servers','Deployments'] },
      { key: 'ai-apps',     icon: 'lc-card.svg',         label: 'AI Applications',
        subs: ['Applications'] },
      { key: 'ai-workflows',icon: 'zap.svg',             label: 'AI Workflows',
        subs: ['Automations','API Gateway','Decision Tables','Automation Interfaces'] },
      { key: 'ai-ontology', icon: 'structure.svg',       label: 'AI Ontology & Data',
        subs: ['Data Pipelines','Data Catalog & Lineage','Data Quality','Unified Data Model','Event Streams','Campaigns','Segments'] },
      { key: 'ent-res',     icon: 'database-01.svg',     label: 'Enterprise Resources',
        subs: ['Objects Manager','Knowledge','Code Functions','Templates','Prompts'] },
      { key: 'ent-sys',     icon: 'grid-plus.svg',       label: 'Enterprise Systems',
        subs: ['Connected Systems','Connectors SDK'] }
    ],
    footer: [
      { key: 'ai-gov',      icon: 'shield-01.svg',       label: 'AI Governance',
        subs: ['AI Models','Guardrails','Security','Alerts Manager',
               { group: 'Evaluation', items: ['Experiments','Datasets','Metrics'] },
               { group: 'Metering',   items: ['Model','Agent','Search','User'] },
               { group: 'Changeset',  items: ['Outbound Changeset','Inbound Changeset','Connected Systems'] }] },
      { key: 'plat-lib',    icon: 'layers-three-01.svg', label: 'Platform Library',
        subs: ['Agent Templates','Prompt Templates','Application Templates','Automation Templates'] },
      { key: 'settings',    icon: 'settings.svg',        label: 'Settings',      subs: [] },
      { key: 'notifs',      icon: 'bell-01.svg',         label: 'Notifications', subs: [] },
      { key: 'help',        icon: 'ai-es-chat.svg',      label: 'Help',          subs: [] }
    ],
    user: { initial: 'T', name: 'Tommy Hilfiger', role: 'QA' }
  };

  function el(tag, cls, html) { var n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; }
  function img(name) { var i = document.createElement('img'); i.src = ICON + name; i.alt = ''; return i; }
  function flat(subs) { // flatten groups → [{label, group?}]
    var out = []; subs.forEach(function (s) {
      if (typeof s === 'string') out.push({ label: s });
      else { out.push({ label: s.group, isGroup: true }); s.items.forEach(function (i) { out.push({ label: i, under: s.group }); }); }
    }); return out;
  }

  document.querySelectorAll('.nav[data-interactive]').forEach(function (rail) {
    build(rail);
  });

  function build(rail) {
    // mark collapsed main items with data-key + wire clicks
    var railItems = rail.querySelectorAll('.nav__menu .nav-item, .nav__footer .nav-item');
    var all = NAV.top.concat(NAV.footer);
    railItems.forEach(function (node, i) {
      var d = all[i]; if (!d) return;
      node.setAttribute('data-key', d.key);
      node.style.cursor = 'pointer';
    });

    // ---- OPEN (expanded) overlay ------------------------------------
    var open = el('aside', 'navx nav-open');
    open.setAttribute('hidden', '');
    var content = el('div', 'navx__content');

    var nav = el('div', 'navx__nav');
    var header = el('div', 'navx__header');
    var logo = el('div', 'navx__logo');
    logo.appendChild(img0('logo.png'));
    logo.appendChild(el('span', null, 'UnifyApps'));
    var collapse = el('button', 'navx__collapse'); collapse.type = 'button';
    collapse.setAttribute('aria-label', 'Collapse'); collapse.appendChild(img('layout-left.svg'));
    header.appendChild(logo); header.appendChild(collapse);
    var list = el('div', 'navx__list');
    NAV.top.forEach(function (d) { list.appendChild(openItem(d)); });
    nav.appendChild(header); nav.appendChild(list);

    var footer = el('div', 'navx__footer');
    NAV.footer.forEach(function (d) { footer.appendChild(openItem(d)); });
    footer.appendChild(userRow());
    content.appendChild(nav); content.appendChild(footer);
    open.appendChild(content);
    rail.appendChild(open);

    // flyout layer (collapsed)
    var flyout = el('div', 'nav-flyout'); flyout.setAttribute('hidden', '');
    rail.appendChild(flyout);

    // expand triggers: collapsed header (logo) click
    var railHeader = rail.querySelector('.nav__header');
    if (railHeader) { railHeader.classList.add('nav__header--toggle'); railHeader.addEventListener('click', function () { setOpen(true); }); }
    collapse.addEventListener('click', function () { setOpen(false); });

    function setOpen(v) {
      if (v) { open.removeAttribute('hidden'); rail.classList.add('is-open'); hideFlyout(); }
      else { open.setAttribute('hidden', ''); rail.classList.remove('is-open'); closeAllAccordions(); }
    }
    function closeAllAccordions() { open.querySelectorAll('.navx-item.is-expanded').forEach(function (n) { n.classList.remove('is-expanded'); }); }

    // ---- collapsed: click main → flyout -----------------------------
    railItems.forEach(function (node) {
      node.addEventListener('click', function (e) {
        e.stopPropagation();
        var key = node.getAttribute('data-key');
        var d = all.filter(function (x) { return x.key === key; })[0];
        rail.querySelectorAll('.nav-item.is-selected').forEach(function (n) { if (n !== node) n.classList.remove('is-selected'); });
        node.classList.add('is-selected');
        if (d && d.subs && d.subs.length) showFlyout(node, d); else hideFlyout();
      });
    });
    document.addEventListener('click', function (e) { if (!rail.contains(e.target)) hideFlyout(); });

    function showFlyout(node, d) {
      flyout.innerHTML = '';
      var box = el('div', 'flyout');
      box.appendChild(el('div', 'flyout__header', d.label));
      flat(d.subs).forEach(function (s, idx) {
        var it = el('div', 'flyout__item' + (s.isGroup ? ' flyout__item--group' : '') + (idx === 0 ? ' flyout__item--current' : ''), s.label);
        if (!s.isGroup) it.addEventListener('click', function (ev) { ev.stopPropagation(); pick(box, it, d.label, s.label); });
        box.appendChild(it);
      });
      flyout.appendChild(box);
      flyout.removeAttribute('hidden');
      var top = node.getBoundingClientRect().top - rail.getBoundingClientRect().top;
      flyout.style.top = Math.max(8, top) + 'px';
    }
    function hideFlyout() { flyout.setAttribute('hidden', ''); flyout.innerHTML = ''; }

    // ---- open: click main → accordion -------------------------------
    function openItem(d) {
      var wrap = el('div', 'navx-item-wrap');
      var item = el('div', 'navx-item' + (d.subs && d.subs.length ? ' has-subs' : ''));
      item.setAttribute('data-key', d.key);
      var c = el('div', 'navx-item__content');
      c.appendChild(imgc(d.icon, 'navx-item__icon'));
      c.appendChild(el('span', 'navx-item__label', d.label));
      if (d.subs && d.subs.length) { var ch = img('chevron-right-sm.svg'); ch.className = 'navx-item__chev'; c.appendChild(ch); }
      item.appendChild(c);
      wrap.appendChild(item);

      if (d.subs && d.subs.length) {
        var subs = el('div', 'navx-subs');
        flat(d.subs).forEach(function (s) {
          var row = el('div', 'navx-sub' + (s.isGroup ? ' navx-sub--group' : '') + (s.under ? ' navx-sub--nested' : ''), s.label);
          if (!s.isGroup) row.addEventListener('click', function (ev) { ev.stopPropagation(); pick(subs, row, d.label, s.label); });
          subs.appendChild(row);
        });
        wrap.appendChild(subs);
        item.addEventListener('click', function () {
          item.classList.toggle('is-expanded');
          wrap.classList.toggle('is-expanded');
        });
      } else {
        item.addEventListener('click', function () {
          open.querySelectorAll('.navx-item.is-selected').forEach(function (n) { n.classList.remove('is-selected'); });
          item.classList.add('is-selected');
        });
      }
      return wrap;
    }

    function pick(scope, row, main, sub) {
      scope.querySelectorAll('.is-selected').forEach(function (n) { n.classList.remove('is-selected'); });
      row.classList.add('is-selected');
      // Destination component per (main → sub) is pending user input — see chat.
      rail.dispatchEvent(new CustomEvent('nav:select', { detail: { main: main, sub: sub } }));
    }

    function userRow() {
      var u = el('div', 'navx-user');
      u.appendChild(el('div', 'navx-user__avatar'));
      var t = el('div', 'navx-user__text');
      t.appendChild(el('span', 'navx-user__name', NAV.user.name));
      t.appendChild(el('span', 'navx-user__role', NAV.user.role));
      u.appendChild(t);
      var ch = img('chevron-right-sm.svg'); ch.className = 'navx-user__chev'; u.appendChild(ch);
      return u;
    }
    function imgc(name, cls) { var i = img(name); i.className = cls; return i; }
    function img0(name) { var i = document.createElement('img'); i.src = 'assets/' + name; i.alt = 'Unify'; return i; }
  }
})();
