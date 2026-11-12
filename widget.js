/* Price history widget: shared by the generator (index.html) and the hosted viewer (chart.html). */
const WIDGET_CSS = `
.w{--bg:#fcfcfb;--tile:#f3f2ee;--bd:#e4e3df;--tx:#0b0b0b;--tx2:#52514e;--tx3:#6f6e69;--grid:#ebeae6;
  --s0:#2a78d6;--s1:#eb6834;--s2:#1baf7a;
  container-type:inline-size;box-sizing:border-box;background:var(--bg);color:var(--tx);border:1px solid var(--bd);
  border-radius:12px;padding:16px;font-family:inherit;font-size:14px;line-height:1.4;text-align:left;max-width:100%}
.w.dark{--bg:#1a1a19;--tile:#242422;--bd:#33322f;--tx:#f0efec;--tx2:#c3c2b7;--tx3:#9a998f;--grid:#2c2c2a;
  --s0:#3987e5;--s1:#d95926;--s2:#199e70}
@media (prefers-color-scheme:dark){.w.auto{--bg:#1a1a19;--tile:#242422;--bd:#33322f;--tx:#f0efec;--tx2:#c3c2b7;--tx3:#9a998f;--grid:#2c2c2a;
  --s0:#3987e5;--s1:#d95926;--s2:#199e70}}
.w *{box-sizing:border-box}
.hd{display:flex;gap:12px;align-items:center;margin-bottom:14px}
.hd img{width:52px;height:52px;object-fit:contain;background:#fff;border-radius:8px;flex:none;padding:3px}
.ttl{font-weight:600;font-size:15px;line-height:1.3;color:var(--tx);text-decoration:none;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
a.ttl:hover{text-decoration:underline}
.sub{color:var(--tx2);font-size:12px;margin-top:2px}
.cap{font-size:12px;color:var(--tx2);margin:0 0 6px}
.stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin-bottom:14px}
@container (max-width:520px){.stats{grid-template-columns:repeat(2,minmax(0,1fr));gap:6px}.st{padding:6px 8px}.vl{font-size:17px}.hd{margin-bottom:10px}}
.st{background:var(--tile);border-radius:8px;padding:8px 10px;min-width:0}
.lb{display:block;font-size:11px;color:var(--tx2);text-transform:uppercase;letter-spacing:.04em}
.vl{display:block;font-size:20px;font-weight:650;font-variant-numeric:tabular-nums;margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.nt{display:block;font-size:12px;color:var(--tx2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ctl{display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px}
.rng{display:inline-flex;background:var(--tile);border-radius:8px;padding:2px}
.rng button{border:0;background:none;color:var(--tx2);font:inherit;font-size:12px;padding:4px 10px;border-radius:6px;cursor:pointer}
.rng button[aria-pressed=true]{background:var(--bg);color:var(--tx);font-weight:600;box-shadow:0 1px 2px rgba(0,0,0,.15)}
.lg{display:flex;gap:2px;flex-wrap:wrap}
.lg button{display:inline-flex;align-items:center;gap:6px;border:0;background:none;color:var(--tx);font:inherit;font-size:12px;padding:4px 6px;border-radius:6px;cursor:pointer}
.lg button[aria-pressed=false]{color:var(--tx3);text-decoration:line-through}
.lg button[aria-pressed=false] i{opacity:.25}
.lg i{width:14px;height:3px;border-radius:2px;display:inline-block}
.w button:focus-visible,.ch svg:focus-visible{outline:2px solid var(--s0);outline-offset:2px}
.ch{position:relative}
.ch svg{display:block;width:100%;overflow:visible;touch-action:pan-y}
.ch svg:focus{outline:none}
.ax{fill:var(--tx3);font-size:11px;font-variant-numeric:tabular-nums}
.gl{stroke:var(--grid);stroke-width:1}
.ln{fill:none;stroke-width:2;stroke-linejoin:round;stroke-linecap:round}
.mk{stroke:var(--bg);stroke-width:2}
.ml{fill:var(--tx2);font-size:11px;font-weight:600}
.xh{stroke:var(--tx3);stroke-width:1;stroke-dasharray:3 3}
.tip{position:absolute;top:0;left:0;pointer-events:none;background:var(--bg);border:1px solid var(--bd);border-radius:8px;
  padding:8px 10px;font-size:12px;box-shadow:0 4px 14px rgba(0,0,0,.14);white-space:nowrap;display:none;z-index:2}
.tip .td{font-weight:600;margin-bottom:4px}
.tip .tr{display:flex;align-items:center;justify-content:space-between;gap:14px}
.tip .tr span{display:inline-flex;align-items:center;gap:6px;color:var(--tx2)}
.tip .tr b{font-variant-numeric:tabular-nums}
.tip i{width:8px;height:8px;border-radius:50%;display:inline-block}
.msg0{color:var(--tx3);text-align:center;padding:40px 0}
.tbl summary{cursor:pointer;color:var(--tx2);font-size:12px;margin-top:8px;width:max-content}
.tbl .sc{max-height:220px;overflow:auto;margin-top:6px}
.tbl table{width:100%;border-collapse:collapse;font-size:12px}
.tbl th,.tbl td{text-align:left;padding:4px 6px;border-bottom:1px solid var(--grid)}
.tbl th{color:var(--tx2);font-weight:600;position:sticky;top:0;background:var(--bg)}
.tbl .n{text-align:right;font-variant-numeric:tabular-nums}
.ft{display:flex;justify-content:space-between;align-items:center;gap:8px 12px;flex-wrap:wrap;margin-top:12px;padding-top:12px;border-top:1px solid var(--bd)}
.btn{display:inline-block;background:var(--tx);color:var(--bg);text-decoration:none;font-weight:600;padding:8px 14px;border-radius:8px;font-size:13px}
.btn:hover{opacity:.88}
.src{font-size:11px;color:var(--tx3)}
.disc{font-size:11px;color:var(--tx3);margin-top:8px}
`;

function PHWidget(root, D, CSS) {
  if (root.__phw) root.__phw.disconnect();
  var KE = 21564000, DAY = 864e5;
  var loc = D.loc || 'en-US', cur = D.cur || 'USD', dv = cur === 'JPY' ? 1 : 100;
  function nfmt(o) { try { return new Intl.NumberFormat(loc, o); } catch (e) { return new Intl.NumberFormat('en-US', o); } }
  function dfmt(o) { try { return new Intl.DateTimeFormat(loc, o); } catch (e) { return new Intl.DateTimeFormat('en-US', o); } }
  var nf = nfmt({ style: 'currency', currency: cur });
  var nf0 = nfmt({ style: 'currency', currency: cur, minimumFractionDigits: 0, maximumFractionDigits: 0 });
  var dLong = dfmt({ year: 'numeric', month: 'short', day: 'numeric' });
  var dMon = dfmt({ month: 'short', year: '2-digit' });
  var dYear = dfmt({ year: 'numeric' });
  var dDay = dfmt({ month: 'short', day: 'numeric' });
  function money(c, whole) { return (whole ? nf0 : nf).format(c / dv); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  var end = D.asOf || Date.now();
  var S = [];
  (D.series || []).forEach(function (s, idx) {
    var pts = [];
    for (var j = 0; j + 1 < s.p.length; j += 2) {
      var t = (s.p[j] + KE) * 6e4;
      if (t <= end) pts.push({ t: t, v: s.p[j + 1] < 0 ? null : s.p[j + 1] });
    }
    if (pts.length) S.push({ n: s.n, c: s.c != null ? s.c : idx, pts: pts, on: true });
  });
  var first = Infinity;
  S.forEach(function (s) { first = Math.min(first, s.pts[0].t); });

  var RANGES = [['1M', 30, 'past month'], ['3M', 91, 'past 3 months'], ['6M', 182, 'past 6 months'], ['1Y', 365, 'past year'], ['2Y', 730, 'past 2 years'], ['All', 0, 'all time']];
  var avail = RANGES.filter(function (r) { return !r[1] || end - r[1] * DAY > first; });
  var range = avail.some(function (r) { return r[0] === D.range; }) ? D.range : 'All';
  function R() { for (var i = 0; i < RANGES.length; i++) if (RANGES[i][0] === range) return RANGES[i]; }
  function from() { var r = R(); return r[1] ? end - r[1] * DAY : first; }

  function at(s, t) {
    var a = s.pts, lo = 0, hi = a.length - 1, r = -1;
    while (lo <= hi) { var m = (lo + hi) >> 1; if (a[m].t <= t) { r = m; lo = m + 1; } else hi = m - 1; }
    return r < 0 ? undefined : a[r].v;
  }
  function segs(s, f) {
    var out = [], a = s.pts, ct = f, cv = at(s, f);
    for (var k = 0; k < a.length; k++) {
      var p = a[k]; if (p.t <= f) continue;
      if (cv != null && p.t > ct) out.push({ a: ct, b: p.t, v: cv });
      ct = p.t; cv = p.v;
    }
    if (cv != null && ct < end) out.push({ a: ct, b: end, v: cv });
    return out;
  }
  function stats(s, f) {
    var g = segs(s, f); if (!g.length) return null;
    var lo = g[0], hi = g[0], sum = 0, dur = 0;
    g.forEach(function (x) { if (x.v <= lo.v) lo = x; if (x.v >= hi.v) hi = x; sum += x.v * (x.b - x.a); dur += x.b - x.a; });
    return { lo: lo, hi: hi, avg: dur ? sum / dur : lo.v, now: at(s, end) };
  }

  var link = D.url ? ' href="' + esc(D.url) + '" target="_blank" rel="sponsored nofollow noopener"' : '';
  var h = '<style>' + CSS + '</style><div class="w ' + esc(D.theme || 'auto') + '">';
  h += '<div class="hd">' + (D.img ? '<img src="' + esc(D.img) + '" alt="" loading="lazy" referrerpolicy="no-referrer">' : '') +
    '<div style="min-width:0">' + (link ? '<a class="ttl"' + link + '>' : '<div class="ttl">') + esc(D.title || 'Price history') + (link ? '</a>' : '</div>') +
    '<div class="sub">' + esc(D.sub || 'Price history') + '</div></div></div>';
  if (!S.length) {
    h += '<div class="msg0">No price history available for this product.</div></div>';
    root.innerHTML = h; return;
  }
  h += '<div class="cap"></div><div class="stats"></div>';
  h += '<div class="ctl"><div class="rng" role="group" aria-label="Time range">' + avail.map(function (r) {
    return '<button type="button" data-r="' + r[0] + '">' + r[0] + '</button>';
  }).join('') + '</div>';
  if (S.length > 1) h += '<div class="lg" role="group" aria-label="Price lines">' + S.map(function (s, i) {
    return '<button type="button" data-s="' + i + '" aria-pressed="true"><i style="background:var(--s' + s.c + ')"></i>' + esc(s.n) + '</button>';
  }).join('') + '</div>';
  h += '</div><div class="ch"><svg tabindex="0" role="img"></svg><div class="tip" aria-hidden="true"></div></div>';
  h += '<details class="tbl"><summary>Show price changes as a table</summary><div class="sc"></div></details>';
  h += '<div class="ft">' + (link ? '<a class="btn"' + link + '>' + esc(D.cta || 'Check price on Amazon') + '</a>' : '<span></span>') +
    '<span class="src">' + (D.src ? esc(D.src) + ' &middot; ' : '') + 'Updated ' + esc(dLong.format(end)) + '</span></div>';
  if (D.disc) h += '<div class="disc">Prices and availability are accurate as of ' + esc(dLong.format(end)) + ' and are subject to change.</div>';
  h += '</div>';
  root.innerHTML = h;

  var q = function (s) { return root.querySelector(s); };
  var ch = q('.ch'), svg = q('svg'), tip = q('.tip');
  var H = Math.max(160, +D.h || 260);
  var G = null; // geometry of last draw

  function primary() { for (var i = 0; i < S.length; i++) if (S[i].on) return S[i]; return null; }

  function drawStats() {
    var p = primary(), f = from(), st = p && stats(p, f);
    q('.cap').textContent = S.length > 1 && p ? p.n + ' price, ' + R()[2] : '';
    if (!st) { q('.stats').innerHTML = ''; return; }
    var nowTxt = st.now == null ? 'Unavailable' : money(st.now);
    var note = '';
    if (st.now != null && st.avg) {
      var d = (st.now - st.avg) / st.avg;
      note = Math.abs(d) < 0.005 ? 'Same as average' : Math.round(Math.abs(d) * 100) + '% ' + (d < 0 ? 'below' : 'above') + ' average';
    } else if (st.now == null) note = 'Out of stock';
    function tile(lb, vl, nt) { return '<div class="st"><span class="lb">' + lb + '</span><span class="vl">' + esc(vl) + '</span><span class="nt">' + esc(nt) + '</span></div>'; }
    q('.stats').innerHTML = tile('Current', nowTxt, note) + tile('Lowest', money(st.lo.v), dLong.format(st.lo.a)) +
      tile('Highest', money(st.hi.v), dLong.format(st.hi.a)) + tile('Average', money(Math.round(st.avg)), R()[2]);
    return st;
  }

  function drawTable() {
    var p = primary(); if (!p) { q('.sc').innerHTML = ''; return; }
    var f = from(), rows = [];
    for (var i = p.pts.length - 1; i >= 0 && rows.length < 300; i--) {
      var pt = p.pts[i];
      rows.push('<tr><td>' + esc(dLong.format(pt.t)) + '</td><td class="n">' + (pt.v == null ? 'Out of stock' : esc(money(pt.v))) + '</td></tr>');
      if (pt.t <= f) break;
    }
    q('.sc').innerHTML = '<table><thead><tr><th>Date</th><th class="n">' + esc(p.n) + ' price</th></tr></thead><tbody>' + rows.join('') + '</tbody></table>';
  }

  function nice(a, b, n) {
    if (a === b) { a -= dv * 5; b += dv * 5; }
    var pad = (b - a) * 0.06; a = Math.max(0, a - pad); b = b + pad;
    var raw = (b - a) / n, mag = Math.pow(10, Math.floor(Math.log10(raw))), fr = raw / mag;
    var st = (fr <= 1 ? 1 : fr <= 2 ? 2 : fr <= 2.5 ? 2.5 : fr <= 5 ? 5 : 10) * mag;
    var lo = Math.floor(a / st) * st, hi = Math.ceil(b / st) * st, t = [];
    for (var v = lo; v <= hi + st / 2; v += st) t.push(v);
    return { lo: lo, hi: hi, t: t, whole: st >= dv && st % dv === 0 };
  }

  function drawChart() {
    var W = Math.max(260, Math.round(ch.clientWidth || 600)), f = from();
    var vis = S.filter(function (s) { return s.on; });
    var all = vis.map(function (s) { return { s: s, g: segs(s, f) }; });
    var mn = Infinity, mx = -Infinity;
    all.forEach(function (o) { o.g.forEach(function (g) { if (g.v < mn) mn = g.v; if (g.v > mx) mx = g.v; }); });
    if (!isFinite(mn)) { mn = 0; mx = 100 * dv; }
    var Y = nice(mn, mx, H < 220 ? 3 : 4);
    var labels = Y.t.map(function (v) { return money(v, Y.whole); });
    var ML = Math.max.apply(null, labels.map(function (l) { return l.length; })) * 6.6 + 10, MR = 10, MT = 10, MB = 24;
    var PW = W - ML - MR, PH = H - MT - MB, span = Math.max(end - f, 1);
    var x = function (t) { return ML + (t - f) / span * PW; };
    var y = function (v) { return MT + (1 - (v - Y.lo) / (Y.hi - Y.lo)) * PH; };
    var o = '';
    Y.t.forEach(function (v, i) {
      var yy = y(v).toFixed(1);
      o += '<line class="gl" x1="' + ML + '" x2="' + (W - MR) + '" y1="' + yy + '" y2="' + yy + '"/>';
      o += '<text class="ax" x="' + (ML - 8) + '" y="' + yy + '" dy="0.32em" text-anchor="end">' + esc(labels[i]) + '</text>';
    });
    // x ticks snapped to calendar boundaries
    var maxT = Math.max(2, Math.floor(PW / 84)), xt = [], xf;
    if (span > 75 * DAY) {
      var months = span / (30.44 * DAY), sm = [1, 2, 3, 4, 6, 12, 24, 36, 60].filter(function (m) { return months / m <= maxT; })[0] || 120;
      var d = new Date(f); d = new Date(d.getFullYear(), d.getMonth() + 1, 1);
      while (d.getMonth() % Math.min(sm, 12) !== 0) d.setMonth(d.getMonth() + 1);
      for (; d.getTime() < end; d.setMonth(d.getMonth() + sm)) xt.push(d.getTime());
      xf = sm >= 12 ? dYear : dMon;
    } else {
      var sd = [1, 2, 7, 14, 28].filter(function (k) { return span / DAY / k <= maxT; })[0] || 28;
      var e = new Date(f); e = new Date(e.getFullYear(), e.getMonth(), e.getDate() + 1);
      for (; e.getTime() < end; e.setDate(e.getDate() + sd)) xt.push(e.getTime());
      xf = dDay;
    }
    xt.forEach(function (t) {
      var xx = x(t); if (xx < ML + 18 || xx > W - MR - 18) return;
      o += '<text class="ax" x="' + xx.toFixed(1) + '" y="' + (H - 6) + '" text-anchor="middle">' + esc(xf.format(t)) + '</text>';
    });
    o += '<line class="gl" x1="' + ML + '" x2="' + (W - MR) + '" y1="' + (MT + PH) + '" y2="' + (MT + PH) + '" style="stroke:var(--bd)"/>';
    // lines (primary drawn last, on top)
    all.slice().reverse().forEach(function (a) {
      var d = '', prev = null;
      a.g.forEach(function (g) {
        var yy = y(g.v).toFixed(1);
        d += (prev && prev.b === g.a ? 'V' + yy : 'M' + x(g.a).toFixed(1) + ',' + yy) + 'H' + x(g.b).toFixed(1);
        prev = g;
      });
      if (d) o += '<path class="ln" d="' + d + '" style="stroke:var(--s' + a.s.c + ')"/>';
    });
    // lowest-price marker on the primary line
    var p = vis[0], st = p && stats(p, f);
    if (st) {
      var lx = x(st.lo.a), ly = y(st.lo.v), txt = 'Low ' + money(st.lo.v);
      var tw = txt.length * 6.4, tx = Math.min(Math.max(lx, ML + tw / 2), W - MR - tw / 2);
      var ty = ly - 10 < MT + 8 ? ly + 18 : ly - 10;
      o += '<text class="ml" x="' + tx.toFixed(1) + '" y="' + ty.toFixed(1) + '" text-anchor="middle">' + esc(txt) + '</text>';
      o += '<circle class="mk" cx="' + lx.toFixed(1) + '" cy="' + ly.toFixed(1) + '" r="4.5" style="fill:var(--s' + p.c + ')"/>';
    }
    // hover layer
    o += '<g class="hv" style="display:none"><line class="xh" y1="' + MT + '" y2="' + (MT + PH) + '"/>' +
      vis.map(function (s) { return '<circle class="mk" r="4.5" style="fill:var(--s' + s.c + ')"/>'; }).join('') + '</g>';
    o += '<rect x="' + ML + '" y="0" width="' + PW + '" height="' + H + '" fill="transparent"/>';
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.setAttribute('width', W); svg.setAttribute('height', H);
    svg.innerHTML = o;
    var desc = (D.title || 'Product') + ' price history, ' + R()[2] + '.';
    if (st) desc += ' Lowest ' + money(st.lo.v) + ' on ' + dLong.format(st.lo.a) + ', highest ' + money(st.hi.v) + (st.now != null ? ', currently ' + money(st.now) : ', currently out of stock') + '.';
    svg.setAttribute('aria-label', desc + ' Use left and right arrow keys to read prices.');
    G = { W: W, ML: ML, MR: MR, MT: MT, PW: PW, f: f, span: span, x: x, y: y, vis: vis };
    if (cursor != null) show(cursor);
  }

  var cursor = null;
  function show(px) {
    if (!G) return;
    px = Math.min(Math.max(px, G.ML), G.ML + G.PW); cursor = px;
    var t = G.f + (px - G.ML) / G.PW * G.span;
    var hv = svg.querySelector('.hv'); hv.style.display = '';
    var ln = hv.querySelector('line'); ln.setAttribute('x1', px); ln.setAttribute('x2', px);
    var cs = hv.querySelectorAll('circle'), rows = '';
    G.vis.forEach(function (s, i) {
      var v = at(s, t);
      if (v != null) { cs[i].setAttribute('cx', px); cs[i].setAttribute('cy', G.y(v)); cs[i].style.display = ''; }
      else cs[i].style.display = 'none';
      rows += '<div class="tr"><span><i style="background:var(--s' + s.c + ')"></i>' + esc(s.n) + '</span><b>' +
        (v === undefined ? '&mdash;' : v === null ? 'Out of stock' : esc(money(v))) + '</b></div>';
    });
    tip.innerHTML = '<div class="td">' + esc(dLong.format(t)) + '</div>' + rows;
    tip.style.display = 'block';
    var tw = tip.offsetWidth, left = px + 14;
    if (left + tw > G.W) left = px - tw - 14;
    tip.style.left = Math.max(0, left) + 'px'; tip.style.top = G.MT + 'px';
  }
  function hide() { cursor = null; tip.style.display = 'none'; var hv = svg.querySelector('.hv'); if (hv) hv.style.display = 'none'; }
  function px(e) { var r = svg.getBoundingClientRect(); return (e.clientX - r.left) * (G ? G.W / r.width : 1); }
  svg.addEventListener('pointermove', function (e) { show(px(e)); });
  svg.addEventListener('pointerdown', function (e) { show(px(e)); });
  svg.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') hide(); });
  svg.addEventListener('focus', function () { if (G && cursor == null) show(G.ML + G.PW); });
  svg.addEventListener('blur', hide);
  svg.addEventListener('keydown', function (e) {
    if (!G) return;
    var step = G.PW / 60;
    if (e.key === 'ArrowLeft') { show((cursor == null ? G.ML + G.PW : cursor) - step); e.preventDefault(); }
    else if (e.key === 'ArrowRight') { show((cursor == null ? G.ML : cursor) + step); e.preventDefault(); }
    else if (e.key === 'Home') { show(G.ML); e.preventDefault(); }
    else if (e.key === 'End') { show(G.ML + G.PW); e.preventDefault(); }
    else if (e.key === 'Escape') hide();
  });

  function syncButtons() {
    root.querySelectorAll('.rng button').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-r') === range ? 'true' : 'false'); });
    root.querySelectorAll('.lg button').forEach(function (b) { b.setAttribute('aria-pressed', S[+b.getAttribute('data-s')].on ? 'true' : 'false'); });
  }
  function drawAll() { syncButtons(); drawStats(); drawTable(); drawChart(); }
  root.querySelectorAll('.rng button').forEach(function (b) {
    b.addEventListener('click', function () { range = b.getAttribute('data-r'); cursor = null; tip.style.display = 'none'; drawAll(); });
  });
  root.querySelectorAll('.lg button').forEach(function (b) {
    b.addEventListener('click', function () {
      var s = S[+b.getAttribute('data-s')];
      if (s.on && S.filter(function (z) { return z.on; }).length === 1) return; // keep at least one line
      s.on = !s.on; drawAll();
    });
  });
  drawAll();
  var lastW = 0;
  if (window.ResizeObserver) {
    root.__phw = new ResizeObserver(function () { var w = Math.round(ch.clientWidth); if (w && w !== lastW) { lastW = w; drawChart(); } });
    root.__phw.observe(ch);
  } else window.addEventListener('resize', drawChart);
}

