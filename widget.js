/* Price history widget: shared by the generator (index.html) and the hosted viewer (chart.html). */

// Site themes. l/d = brand color on light/dark surfaces (both >= 3:1 against the surface),
// lt/dt = button text on that brand color. Colors taken from each site's live stylesheet.
const PHW_BRANDS = {
  def: { n: 'Default',        font: '',                 l: '#2a78d6', d: '#3987e5', lt: '#ffffff', dt: '#101010' },
  xda: { n: 'XDA',            font: 'Titillium Web',    l: '#a601c8', d: '#c45be0', lt: '#ffffff', dt: '#101010' },
  htg: { n: 'How-To Geek',    font: 'Roboto',           l: '#e56c2c', d: '#e56c2c', lt: '#101010', dt: '#101010' },
  muo: { n: 'MakeUseOf',      font: 'Roboto',           l: '#bf0d0b', d: '#ef4a43', lt: '#ffffff', dt: '#101010' },
  ap:  { n: 'Android Police', font: 'Titillium Web',    l: '#e01a4f', d: '#ee4d76', lt: '#ffffff', dt: '#101010' },
  pl:  { n: 'Pocket-lint',    font: 'Roboto',           l: '#204f83', d: '#5d93d6', lt: '#ffffff', dt: '#101010' }
};

const WIDGET_CSS = `
.w{--bg:#ffffff;--tile:#f2f2f2;--bd:#e2e2e2;--tx:#181818;--tx2:#4d4d4d;--tx3:#6b6b6b;--grid:#ececec;
  --s1:#8a8a8a;--s2:#a3a3a3;--brand:var(--b-l);--btx:var(--bt-l);
  container-type:inline-size;box-sizing:border-box;background:var(--bg);color:var(--tx);border:1px solid var(--bd);
  border-radius:12px;padding:12px 14px;font-size:14px;line-height:1.35;text-align:left;max-width:100%}
.w.dark{--bg:#181818;--tile:#242424;--bd:#2e2e2e;--tx:#f2f2f2;--tx2:#b6b4b5;--tx3:#8f8d8e;--grid:#262626;
  --s1:#8f8d8e;--s2:#6f6d6e;--brand:var(--b-d);--btx:var(--bt-d)}
@media (prefers-color-scheme:dark){.w.auto{--bg:#181818;--tile:#242424;--bd:#2e2e2e;--tx:#f2f2f2;--tx2:#b6b4b5;--tx3:#8f8d8e;--grid:#262626;
  --s1:#8f8d8e;--s2:#6f6d6e;--brand:var(--b-d);--btx:var(--bt-d)}}
.w *{box-sizing:border-box}
.hd{display:flex;gap:10px;align-items:center;margin-bottom:8px}
.hd img{width:40px;height:40px;object-fit:contain;background:#fff;border-radius:6px;flex:none;padding:2px}
.ti{min-width:0;flex:1}
.ttl{font-weight:700;font-size:15px;line-height:1.25;color:var(--tx);text-decoration:none;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
a.ttl:hover{color:var(--brand)}
.sub{color:var(--tx2);font-size:12px;margin-top:1px}
.now{text-align:right;flex:none}
.nl{display:block;font-size:11px;color:var(--tx2);text-transform:uppercase;letter-spacing:.04em}
.np{display:block;font-size:22px;font-weight:700;line-height:1.1;font-variant-numeric:tabular-nums}
.nn{display:block;font-size:12px;color:var(--tx2);white-space:nowrap}
.ctl{display:flex;justify-content:space-between;align-items:center;gap:4px 10px;flex-wrap:wrap;margin-bottom:2px}
.rng{display:inline-flex;background:var(--tile);border-radius:7px;padding:2px}
.rng button{border:0;background:none;color:var(--tx2);font:inherit;font-size:12px;line-height:1;padding:5px 9px;border-radius:5px;cursor:pointer}
.rng button[aria-pressed=true]{background:var(--brand);color:var(--btx);font-weight:700}
.lg{display:flex;gap:0 2px;flex-wrap:wrap}
.lg button{display:inline-flex;align-items:center;gap:5px;border:0;background:none;color:var(--tx);font:inherit;font-size:12px;padding:3px 5px;border-radius:5px;cursor:pointer}
.lg button[aria-pressed=false]{color:var(--tx3);text-decoration:line-through}
.lg button[aria-pressed=false] svg{opacity:.25}
.w button:focus-visible,.ch svg:focus-visible,.w a:focus-visible{outline:2px solid var(--brand);outline-offset:2px}
.ch{position:relative}
.ch svg{display:block;width:100%;overflow:visible;touch-action:pan-y}
.ch svg:focus{outline:none}
.ax{fill:var(--tx3);font-size:11px;font-variant-numeric:tabular-nums}
.gl{stroke:var(--grid);stroke-width:1}
.ln{fill:none;stroke-linejoin:round;stroke-linecap:round}
.mk{stroke:var(--bg);stroke-width:2}
.ml{fill:var(--tx);font-size:11px;font-weight:700;paint-order:stroke;stroke:var(--bg);stroke-width:3px;stroke-linejoin:round}
.av{stroke:var(--tx3);stroke-width:1;stroke-dasharray:2 3}
.al{fill:var(--tx3);font-size:10px;paint-order:stroke;stroke:var(--bg);stroke-width:3px;stroke-linejoin:round}
.xh{stroke:var(--tx3);stroke-width:1;stroke-dasharray:3 3}
.tip{position:absolute;top:0;left:0;pointer-events:none;background:var(--bg);border:1px solid var(--bd);border-radius:8px;
  padding:6px 9px;font-size:12px;box-shadow:0 4px 14px rgba(0,0,0,.18);white-space:nowrap;display:none;z-index:2}
.tip .td{font-weight:700;margin-bottom:3px}
.tip .tr{display:flex;align-items:center;justify-content:space-between;gap:12px}
.tip .tr span{display:inline-flex;align-items:center;gap:6px;color:var(--tx2)}
.tip .tr b{font-variant-numeric:tabular-nums}
.tb{overflow:auto}
.tb table{width:100%;border-collapse:collapse;font-size:12px}
.tb th,.tb td{text-align:left;padding:3px 6px;border-bottom:1px solid var(--grid)}
.tb th{color:var(--tx2);font-weight:700;position:sticky;top:0;background:var(--bg)}
.tb .n{text-align:right;font-variant-numeric:tabular-nums}
.msg0{color:var(--tx3);text-align:center;padding:32px 0}
.ft{display:flex;align-items:center;gap:6px 12px;flex-wrap:wrap;margin-top:8px}
.btn{display:inline-block;background:var(--brand);color:var(--btx);text-decoration:none;font-weight:700;padding:7px 12px;border-radius:7px;font-size:13px;line-height:1.2}
.btn:hover{filter:brightness(1.08)}
.src{font-size:11px;color:var(--tx3);flex:1;min-width:140px}
@container (max-width:480px){.src{order:3;flex-basis:100%}.tt{margin-left:auto}.np{font-size:20px}}
.tt{border:1px solid var(--bd);background:none;color:var(--tx2);font:inherit;font-size:11px;padding:3px 8px;border-radius:5px;cursor:pointer}
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

  // Brand theme (passed in D.bt so the widget stays self-contained)
  var B = D.bt || { font: '', l: '#2a78d6', d: '#3987e5', lt: '#ffffff', dt: '#101010' };
  var style = '--b-l:' + B.l + ';--b-d:' + B.d + ';--bt-l:' + B.lt + ';--bt-d:' + B.dt + ';' +
    'font-family:' + (B.font ? '"' + B.font + '",' : '') + 'inherit';
  if (B.font) style = style.replace(',inherit', ',system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif');
  // Line styles by slot: 0 = brand solid, 1 = gray dashed, 2 = gray dotted
  var LS = [
    { c: 'var(--brand)', w: 2.25, dash: '' },
    { c: 'var(--s1)', w: 1.5, dash: '5 4' },
    { c: 'var(--s2)', w: 1.5, dash: '1.5 3.5' }
  ];
  function ls(c) { return LS[c] || LS[1]; }
  function swatch(c) {
    var s = ls(c);
    return '<svg width="16" height="6" aria-hidden="true"><line x1="1" x2="15" y1="3" y2="3" style="stroke:' + s.c + '" stroke-width="' + (s.w + 0.5) + '" stroke-linecap="round"' + (s.dash ? ' stroke-dasharray="' + s.dash + '"' : '') + '/></svg>';
  }

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

  var RANGES = [['1M', 30, 'past month', '1-mo'], ['3M', 91, 'past 3 months', '3-mo'], ['6M', 182, 'past 6 months', '6-mo'],
    ['1Y', 365, 'past year', '1-yr'], ['2Y', 730, 'past 2 years', '2-yr'], ['All', 0, 'all time', 'all-time']];
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
  var h = '<style>' + CSS + '</style><div class="w ' + esc(D.theme || 'auto') + '" style="' + esc(style) + '">';
  h += '<div class="hd">' + (D.img ? '<img src="' + esc(D.img) + '" alt="" loading="lazy" referrerpolicy="no-referrer">' : '') +
    '<div class="ti">' + (link ? '<a class="ttl"' + link + '>' : '<div class="ttl">') + esc(D.title || 'Price history') + (link ? '</a>' : '</div>') +
    '<div class="sub">' + esc(D.sub || 'Price history') + '</div></div><div class="now"></div></div>';
  if (!S.length) {
    h += '<div class="msg0">No price history available for this product.</div></div>';
    root.innerHTML = h; return;
  }
  h += '<div class="ctl"><div class="rng" role="group" aria-label="Time range">' + avail.map(function (r) {
    return '<button type="button" data-r="' + r[0] + '">' + r[0] + '</button>';
  }).join('') + '</div>';
  if (S.length > 1) h += '<div class="lg" role="group" aria-label="Price lines">' + S.map(function (s, i) {
    return '<button type="button" data-s="' + i + '" aria-pressed="true">' + swatch(s.c) + esc(s.n) + '</button>';
  }).join('') + '</div>';
  h += '</div><div class="ch"><svg tabindex="0" role="img"></svg><div class="tip" aria-hidden="true"></div><div class="tb" hidden></div></div>';
  var asOf = esc(dLong.format(end));
  h += '<div class="ft">' + (link ? '<a class="btn"' + link + '>' + esc(D.cta || 'Check price on Amazon') + '</a>' : '') +
    '<span class="src">' + (D.disc ? 'Prices as of ' + asOf + ' and subject to change' : 'Updated ' + asOf) +
    (D.src ? ' &middot; ' + esc(D.src) : '') + '</span><button type="button" class="tt" aria-pressed="false">Table</button></div>';
  h += '</div>';
  root.innerHTML = h;

  var q = function (s) { return root.querySelector(s); };
  var ch = q('.ch'), svg = q('.ch svg'), tip = q('.tip'), tb = q('.tb'), tt = q('.tt');
  var H = Math.max(110, +D.h || 180);
  var G = null, showTable = false;

  function primary() { for (var i = 0; i < S.length; i++) if (S[i].on) return S[i]; return null; }

  function drawNow() {
    var p = primary(), st = p && stats(p, from()), el = q('.now');
    if (!st) { el.innerHTML = ''; return; }
    var note = '';
    if (st.now == null) note = 'Out of stock';
    else if (st.avg) {
      var d = (st.now - st.avg) / st.avg;
      note = Math.abs(d) < 0.005 ? 'At ' + R()[3] + ' average' : Math.round(Math.abs(d) * 100) + '% ' + (d < 0 ? 'below' : 'above') + ' ' + R()[3] + ' avg';
    }
    el.innerHTML = '<span class="nl">' + esc(S.length > 1 ? p.n + ' now' : 'Current') + '</span><span class="np">' +
      (st.now == null ? '&mdash;' : esc(money(st.now))) + '</span><span class="nn">' + esc(note) + '</span>';
  }

  function drawTable() {
    var p = primary(); if (!p) { tb.innerHTML = ''; return; }
    var f = from(), rows = [];
    for (var i = p.pts.length - 1; i >= 0 && rows.length < 300; i--) {
      var pt = p.pts[i];
      rows.push('<tr><td>' + esc(dLong.format(pt.t)) + '</td><td class="n">' + (pt.v == null ? 'Out of stock' : esc(money(pt.v))) + '</td></tr>');
      if (pt.t <= f) break;
    }
    tb.innerHTML = '<table><thead><tr><th>Date</th><th class="n">' + esc(p.n) + ' price</th></tr></thead><tbody>' + rows.join('') + '</tbody></table>';
    tb.style.height = H + 'px';
  }

  function nice(a, b, n) {
    if (a === b) { a -= dv * 5; b += dv * 5; }
    var pad = (b - a) * 0.08; a = Math.max(0, a - pad); b = b + pad;
    var raw = (b - a) / n, mag = Math.pow(10, Math.floor(Math.log10(raw))), fr = raw / mag;
    var st = (fr <= 1 ? 1 : fr <= 2 ? 2 : fr <= 2.5 ? 2.5 : fr <= 5 ? 5 : 10) * mag;
    var lo = Math.floor(a / st) * st, hi = Math.ceil(b / st) * st, t = [];
    for (var v = lo; v <= hi + st / 2; v += st) t.push(v);
    return { lo: lo, hi: hi, t: t, whole: st >= dv && st % dv === 0 };
  }

  function label(cls, txt, x0, y0, W, ML, MR) {
    var tw = txt.length * 6.2, x = Math.min(Math.max(x0, ML + tw / 2 + 2), W - MR - tw / 2);
    return '<text class="' + cls + '" x="' + x.toFixed(1) + '" y="' + y0.toFixed(1) + '" text-anchor="middle">' + esc(txt) + '</text>';
  }

  function drawChart() {
    var W = Math.max(240, Math.round(ch.clientWidth || 600)), f = from();
    var vis = S.filter(function (s) { return s.on; });
    var all = vis.map(function (s) { return { s: s, g: segs(s, f) }; });
    var mn = Infinity, mx = -Infinity;
    all.forEach(function (o) { o.g.forEach(function (g) { if (g.v < mn) mn = g.v; if (g.v > mx) mx = g.v; }); });
    if (!isFinite(mn)) { mn = 0; mx = 100 * dv; }
    var Y = nice(mn, mx, H < 150 ? 2 : 3);
    var labels = Y.t.map(function (v) { return money(v, Y.whole); });
    var ML = Math.max.apply(null, labels.map(function (l) { return l.length; })) * 6.4 + 8, MR = 6, MT = 14, MB = 20;
    var PW = W - ML - MR, PH = H - MT - MB, span = Math.max(end - f, 1);
    var x = function (t) { return ML + (t - f) / span * PW; };
    var y = function (v) { return MT + (1 - (v - Y.lo) / (Y.hi - Y.lo)) * PH; };
    var o = '';
    Y.t.forEach(function (v, i) {
      var yy = y(v).toFixed(1);
      o += '<line class="gl" x1="' + ML + '" x2="' + (W - MR) + '" y1="' + yy + '" y2="' + yy + '"/>';
      o += '<text class="ax" x="' + (ML - 6) + '" y="' + yy + '" dy="0.32em" text-anchor="end">' + esc(labels[i]) + '</text>';
    });
    var maxT = Math.max(2, Math.floor(PW / 80)), xt = [], xf;
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
      var xx = x(t); if (xx < ML + 16 || xx > W - MR - 16) return;
      o += '<text class="ax" x="' + xx.toFixed(1) + '" y="' + (H - 5) + '" text-anchor="middle">' + esc(xf.format(t)) + '</text>';
    });
    o += '<line class="gl" x1="' + ML + '" x2="' + (W - MR) + '" y1="' + (MT + PH) + '" y2="' + (MT + PH) + '" style="stroke:var(--bd)"/>';
    var p = vis[0], st = p && stats(p, f);
    // average reference line (behind the data)
    if (st) {
      var ay = y(st.avg);
      o += '<line class="av" x1="' + ML + '" x2="' + (W - MR) + '" y1="' + ay.toFixed(1) + '" y2="' + ay.toFixed(1) + '"/>';
      o += '<text class="al" x="' + (W - MR - 2) + '" y="' + (ay - 4).toFixed(1) + '" text-anchor="end">Avg ' + esc(money(Math.round(st.avg), true)) + '</text>';
    }
    // lines (primary drawn last, on top)
    all.slice().reverse().forEach(function (a) {
      var d = '', prev = null, s = ls(a.s.c);
      a.g.forEach(function (g) {
        var yy = y(g.v).toFixed(1);
        d += (prev && prev.b === g.a ? 'V' + yy : 'M' + x(g.a).toFixed(1) + ',' + yy) + 'H' + x(g.b).toFixed(1);
        prev = g;
      });
      if (d) o += '<path class="ln" d="' + d + '" style="stroke:' + s.c + '" stroke-width="' + s.w + '"' + (s.dash ? ' stroke-dasharray="' + s.dash + '"' : '') + '/>';
    });
    // direct labels: lowest and highest on the primary line
    if (st) {
      var col = ls(p.c).c;
      var lx = x(st.lo.a), ly = y(st.lo.v), hx = x(st.hi.a), hy = y(st.hi.v);
      o += label('ml', 'Low ' + money(st.lo.v), lx, ly + 15 > MT + PH - 2 ? ly - 7 : ly + 15, W, ML, MR);
      if (st.hi.v !== st.lo.v) o += label('ml', 'High ' + money(st.hi.v), hx, hy - 7 < MT + 9 ? hy + 15 : hy - 7, W, ML, MR);
      o += '<circle class="mk" cx="' + lx.toFixed(1) + '" cy="' + ly.toFixed(1) + '" r="4" style="fill:' + col + '"/>';
      if (st.hi.v !== st.lo.v) o += '<circle class="mk" cx="' + hx.toFixed(1) + '" cy="' + hy.toFixed(1) + '" r="4" style="fill:' + col + '"/>';
    }
    o += '<g class="hv" style="display:none"><line class="xh" y1="' + MT + '" y2="' + (MT + PH) + '"/>' +
      vis.map(function (s) { return '<circle class="mk" r="4" style="fill:' + ls(s.c).c + '"/>'; }).join('') + '</g>';
    o += '<rect x="' + ML + '" y="0" width="' + PW + '" height="' + H + '" fill="transparent"/>';
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.setAttribute('width', W); svg.setAttribute('height', H);
    svg.innerHTML = o;
    var desc = (D.title || 'Product') + ' price history, ' + R()[2] + '.';
    if (st) desc += ' Lowest ' + money(st.lo.v) + ' on ' + dLong.format(st.lo.a) + ', highest ' + money(st.hi.v) + ', average ' + money(Math.round(st.avg)) +
      (st.now != null ? ', currently ' + money(st.now) : ', currently out of stock') + '.';
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
      rows += '<div class="tr"><span>' + swatch(s.c) + esc(s.n) + '</span><b>' +
        (v === undefined ? '&mdash;' : v === null ? 'Out of stock' : esc(money(v))) + '</b></div>';
    });
    tip.innerHTML = '<div class="td">' + esc(dLong.format(t)) + '</div>' + rows;
    tip.style.display = 'block';
    var tw = tip.offsetWidth, left = px + 12;
    if (left + tw > G.W) left = px - tw - 12;
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
    svg.style.display = showTable ? 'none' : '';
    tb.hidden = !showTable;
    tt.textContent = showTable ? 'Chart' : 'Table';
    tt.setAttribute('aria-pressed', showTable ? 'true' : 'false');
  }
  function drawAll() { syncButtons(); drawNow(); drawTable(); drawChart(); }
  root.querySelectorAll('.rng button').forEach(function (b) {
    b.addEventListener('click', function () { range = b.getAttribute('data-r'); hide(); drawAll(); });
  });
  root.querySelectorAll('.lg button').forEach(function (b) {
    b.addEventListener('click', function () {
      var s = S[+b.getAttribute('data-s')];
      if (s.on && S.filter(function (z) { return z.on; }).length === 1) return; // keep at least one line
      s.on = !s.on; drawAll();
    });
  });
  tt.addEventListener('click', function () { showTable = !showTable; hide(); syncButtons(); });
  drawAll();
  var lastW = 0;
  if (window.ResizeObserver) {
    root.__phw = new ResizeObserver(function () { var w = Math.round(ch.clientWidth); if (w && w !== lastW) { lastW = w; drawChart(); } });
    root.__phw.observe(ch);
  } else window.addEventListener('resize', drawChart);
}
