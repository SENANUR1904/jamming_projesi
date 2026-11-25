/* ============================================================================
   uygulama_3.js : 6. öznitelikler, 7. modeller, 8. açık-küme
   ========================================================================== */

/* ================================================================= 6. ÖZNİTELİKLER */
var OZ = [
  { ad: 'ortalama', f: 'mean(s)', anlam: 'Pencere ortalaması (DC bileşen).', yakalar: 'Çoğu sınıfta sıfıra yakındır; tek başına ayırt edici değildir.' },
  { ad: 'std', f: 'std(s)', anlam: 'Standart sapma: sinyal gücünün göstergesi.', yakalar: 'Jammer eklenince artar. Normalde ≈ 1,0.' },
  { ad: 'max_mutlak', f: 'max |s|', anlam: 'Penceredeki en büyük mutlak genlik.', yakalar: 'Ani tepeleri ve yüksek güçlü jammer\'ı yakalar.' },
  { ad: 'enerji', f: 'mean(s²)', anlam: 'Ortalama sinyal enerjisi.', yakalar: 'Jammer gücüyle doğrudan artar (normalde ≈ 1,0).' },
  { ad: 'basiklik', f: 'mean(z⁴) − 3', anlam: 'Genlik dağılımının sivriliği (aşırı basıklık). z standartlaştırılmış sinyaldir.', yakalar: 'Saf sinüs ≈ −1,5; gürültü eklendikçe 0\'a yaklaşır. Gürültü tabanlı jammer\'ları ayırır.' },
  { ad: 'carpiklik', f: 'mean(z³)', anlam: 'Dağılımın simetrisizliği.', yakalar: 'Genelde 0 civarında; zayıf bir öznitelik.' },
  { ad: 'sifir_gecis', f: 'Σ|Δ sign(s)| / 2', anlam: 'Sinyalin sıfırı kaç kez geçtiği.', yakalar: 'Frekansın kabaca ölçüsü: gürültü ve yüksek frekanslı ton sayıyı artırır.' },
  { ad: 'zarf_std', f: 'std( 50\'şer örnek ort. |s| )', anlam: 'Genlik zarfının zamanla ne kadar oynadığı.', yakalar: 'Genliği değişen jammer\'larda (pulse, sweep) yüksektir.' },
  { ad: 'baskin_frekans', f: 'argmax |rfft(s)|', anlam: 'En güçlü frekans bileşeninin bin numarası (1 bin = 31,25 Hz).', yakalar: 'Normalde 32 (= 1 kHz). Güçlü tone gelirse 160\'a (= 5 kHz) atlar.' },
  { ad: 'spektral_yayilim', f: 'std(|rfft(s)|)', anlam: 'Spektrum genliklerinin yayılımı: tepelerin keskinliği.', yakalar: 'Dar bantlı tone\'da en yüksektir.' }
];
var HIST = (function () {
  var sec = 3, gorunen = { normal: 1, constant: 1, tone: 1, sweep: 1, pulse: 1 };
  var kart = $('#ozKartlar');
  OZ.forEach(function (o, j) {
    var d = document.createElement('div'); d.className = 'kart'; d.style.cssText = 'margin:0;cursor:pointer;padding:12px 14px;border-width:2px'; d.setAttribute('data-j', j);
    d.innerHTML = '<div class="kucuk soluk">#' + (j + 1) + '</div><b>' + o.ad + '</b><div style="margin:4px 0"><code style="font-size:.78rem">' + o.f + '</code></div><div class="kucuk soluk">' + o.anlam + '</div>';
    d.onclick = function () { sec = j; isaretle(); ciz(); };
    kart.appendChild(d);
  });
  function isaretle() { $$('#ozKartlar .kart').forEach(function (d) { d.style.borderColor = parseInt(d.getAttribute('data-j'), 10) === sec ? '#1f5fa8' : ''; d.style.background = parseInt(d.getAttribute('data-j'), 10) === sec ? '#f0f6ff' : ''; }); }
  function lejant() {
    var l = $('#histLejant'); l.innerHTML = '';
    SIN.forEach(function (s) {
      var e = document.createElement('span'); e.className = gorunen[s] ? '' : 'kapali'; e.innerHTML = '<i style="background:' + RENK[s] + '"></i>' + s;
      e.onclick = function () { gorunen[s] = !gorunen[s]; lejant(); ciz(); }; l.appendChild(e);
    });
    var r = document.createElement('span'); r.style.cursor = 'default'; r.innerHTML = '<span style="font-size:12px">▼</span> resmî sınıf ortalaması (rapor Tablo 4)'; l.appendChild(r);
  }
  function ciz() {
    var cvs = $('#histCanvas'), k = kur(cvs); if (!k) return; var c = k.c, w = k.w, h = k.h, H = VERI.hist[KOL[sec]], e = H.kenar, nb = e.length - 1, pl = 44, pr = 10, pt = 10, pb = 28, pw = w - pl - pr, ph = h - pt - pb;
    var mx = 0; SIN.forEach(function (s) { if (gorunen[s]) H.sinif[s].forEach(function (v) { mx = Math.max(mx, v); }); }); mx = (mx || 0.1) * 1.12;
    var kok = $('#histKok').checked; function T(v) { return kok ? Math.sqrt(v) : v; }
    function X(v) { return pl + pw * (v - e[0]) / (e[nb] - e[0]); } function Y(v) { return pt + ph * (1 - T(v) / T(mx)); }
    c.fillStyle = '#fff'; c.fillRect(0, 0, w, h); c.strokeStyle = '#e6ebf1'; c.beginPath();
    for (var g = 0; g <= 4; g++) { var yy = pt + ph * g / 4; c.moveTo(pl, yy); c.lineTo(pl + pw, yy); } c.stroke();
    yaziAyar(c, 10, '#8896a5', 'right'); for (g = 0; g <= 4; g++) { var tt = 1 - g / 4, val = kok ? mx * tt * tt : mx * tt; c.fillText(fmt(val * 100, val < 0.1 ? 1 : 0) + '%', pl - 5, pt + ph * g / 4); }
    yaziAyar(c, 10, '#8896a5', 'center'); for (g = 0; g <= 5; g++) { var v = e[0] + (e[nb] - e[0]) * g / 5; c.fillText(Math.abs(v) >= 100 ? String(Math.round(v)) : fmt(v, 2), X(v), h - 14); }
    c.fillText(OZ[sec].ad + ' (' + OZ[sec].f + ')', pl + pw / 2, h - 2);
    SIN.forEach(function (s) {
      if (!gorunen[s]) return; var p = H.sinif[s];
      c.beginPath(); c.moveTo(X(e[0]), Y(0)); for (var b = 0; b < nb; b++) { c.lineTo(X(e[b]), Y(p[b])); c.lineTo(X(e[b + 1]), Y(p[b])); } c.lineTo(X(e[nb]), Y(0)); c.closePath();
      c.fillStyle = rgba(RENK[s], 0.22); c.fill(); c.strokeStyle = RENK[s]; c.lineWidth = 1.5; c.stroke();
    });
    var ti = RESMI.tablo4Kol.indexOf(KOL[sec]);
    if (ti >= 0) SIN.forEach(function (s) { if (!gorunen[s]) return; var v = RESMI.tablo4[s][ti]; if (v < e[0] || v > e[nb]) return; c.fillStyle = RENK[s]; c.beginPath(); c.moveTo(X(v), pt + 12); c.lineTo(X(v) - 6, pt); c.lineTo(X(v) + 6, pt); c.closePath(); c.fill(); });
    $('#histBaslik').innerHTML = '#' + (sec + 1) + ' ' + OZ[sec].ad + ' <span class="rozet yeniden">yeniden üretim</span>' + (ti >= 0 ? ' <span class="rozet resmi">▼ resmî ortalama</span>' : '');
    var ort = SIN.map(function (s) { return '<span style="color:' + RENK[s] + ';font-weight:700">' + s + '</span> ' + fmt(VERI.ozet[s].ort[sec], OZ[sec].ad === 'baskin_frekans' ? 1 : 2); }).join(' · ');
    $('#histAciklama').innerHTML = '<b>Ne yakalar?</b> ' + OZ[sec].yakalar + '<br>Sınıf ortalamaları (yeniden üretim): ' + ort + '<br><span class="soluk">Her eğri kendi sınıfında normalleştirilmiştir (alanı 1). Sınıf adına tıklayarak gizleyip gösterebilirsiniz.</span>';
  }
  $('#histKok').onchange = ciz;
  kaydet(ciz); isaretle(); lejant(); ciz();
  return {};
})();

/* ---- özellik önemleri ---- */
(function onem() {
  var asama = 'a2';
  function ciz() {
    var o = asama === 'a1' ? VERI.protokol.onem_asama1 : VERI.protokol.onem_asama2;
    var s = KOL.map(function (k) { return [k, o[k]]; }).sort(function (a, b) { return b[1] - a[1]; }), mx = s[0][1], h = '';
    s.forEach(function (r) { h += '<div class="cubuk-sat" style="grid-template-columns:130px 1fr 54px"><span class="mono kucuk">' + r[0] + '</span><div class="cubuk"><i style="width:' + (r[1] / mx * 100) + '%;background:#1f5fa8"></i></div><span class="say">%' + fmt(r[1] * 100, 1) + '</span></div>'; });
    $('#onemCubuk').innerHTML = h;
  }
  sekmeKur($('#onemSekme'), [{ id: 'a1', ad: 'Aşama 1 (var mı?)' }, { id: 'a2', ad: 'Aşama 2 (hangi tür?)' }], asama, function (a) { asama = a; ciz(); });
  ciz();
})();

/* ---- dağılım grafiği ---- */
var SC = (function () {
  var P = VERI.noktalar, sx = 3, sy = 7, gor = { normal: 1, constant: 1, tone: 1, sweep: 1, pulse: 1 }, testOnly = false, secili = -1, ekran = [];
  var X = $('#scX'), Y = $('#scY');
  KOL.forEach(function (k, j) { X.add(new Option(k, j)); Y.add(new Option(k, j)); }); X.value = sx; Y.value = sy;
  function yuzdelik(j) { var a = P.map(function (p) { return p.x[j]; }).sort(function (u, v) { return u - v; }); return [a[Math.floor(a.length * 0.01)], a[Math.floor(a.length * 0.99)]]; }
  function ciz() {
    var cvs = $('#scCanvas'), k = kur(cvs); if (!k) return; var c = k.c, w = k.w, h = k.h, rx = yuzdelik(sx), ry = yuzdelik(sy);
    if (rx[1] - rx[0] < 1e-9) rx[1] = rx[0] + 1; if (ry[1] - ry[0] < 1e-9) ry[1] = ry[0] + 1;
    var padX = (rx[1] - rx[0]) * 0.05, padY = (ry[1] - ry[0]) * 0.05; rx = [rx[0] - padX, rx[1] + padX]; ry = [ry[0] - padY, ry[1] + padY];
    var pl = 46, pr = 10, pt = 10, pb = 30, pw = w - pl - pr, ph = h - pt - pb;
    function Xp(v) { return pl + pw * (v - rx[0]) / (rx[1] - rx[0]); } function Yp(v) { return pt + ph * (1 - (v - ry[0]) / (ry[1] - ry[0])); }
    c.fillStyle = '#fff'; c.fillRect(0, 0, w, h); c.strokeStyle = '#e6ebf1'; c.beginPath();
    for (var g = 0; g <= 4; g++) { c.moveTo(pl + pw * g / 4, pt); c.lineTo(pl + pw * g / 4, pt + ph); c.moveTo(pl, pt + ph * g / 4); c.lineTo(pl + pw, pt + ph * g / 4); } c.stroke();
    yaziAyar(c, 10, '#8896a5', 'center'); for (g = 0; g <= 4; g++) { var v = rx[0] + (rx[1] - rx[0]) * g / 4; c.fillText(Math.abs(v) >= 100 ? String(Math.round(v)) : fmt(v, 2), pl + pw * g / 4, h - 16); }
    c.fillText(KOL[sx], pl + pw / 2, h - 4);
    yaziAyar(c, 10, '#8896a5', 'right'); for (g = 0; g <= 4; g++) { v = ry[1] - (ry[1] - ry[0]) * g / 4; c.fillText(Math.abs(v) >= 100 ? String(Math.round(v)) : fmt(v, 2), pl - 5, pt + ph * g / 4); }
    ekran = [];
    for (var i = 0; i < P.length; i++) {
      var p = P[i]; if (!gor[SIN[p.y]]) continue; if (testOnly && !p.t) continue;
      var px = Xp(p.x[sx]), py = Yp(p.x[sy]); if (px < pl - 4 || px > pl + pw + 4 || py < pt - 4 || py > pt + ph + 4) continue;
      c.fillStyle = rgba(RENK[SIN[p.y]], 0.55); c.beginPath(); c.arc(px, py, 3.2, 0, 6.3); c.fill(); ekran.push([px, py, i]);
    }
    if (secili >= 0) { var q = P[secili], qx = Xp(q.x[sx]), qy = Yp(q.x[sy]); c.strokeStyle = '#000'; c.lineWidth = 2; c.beginPath(); c.arc(qx, qy, 7, 0, 6.3); c.stroke(); }
    $('#scCanvas')._ek = ekran;
  }
  function en(ev) { var cv = $('#scCanvas'), r = cv.getBoundingClientRect(), x = ev.clientX - r.left, y = ev.clientY - r.top, best = -1, bd = 144; (cv._ek || []).forEach(function (e) { var d = (e[0] - x) * (e[0] - x) + (e[1] - y) * (e[1] - y); if (d < bd) { bd = d; best = e[2]; } }); return best; }
  function kartGoster(i) {
    var p = P[i], s = SIN[p.y], h = '<div style="display:flex;flex-wrap:wrap;gap:18px;align-items:flex-start"><div><span class="rozet" style="background:' + rgba(RENK[s], .18) + ';color:#1c2733;margin:0">gerçek sınıf: ' + s + '</span><div class="kucuk" style="margin-top:6px">jammer_amp: <b>' + fmt(p.a, 1) + '</b><br>' + (p.t ? 'Bu pencere modelin <b>hiç görmediği test</b> setinde.' : 'Bu pencere eğitim sürecinde <b>görülmüş olabilir</b>.') + '</div></div>';
    h += '<div style="display:grid;grid-template-columns:repeat(2,auto);gap:0 22px" class="kucuk">'; KOL.forEach(function (k, j) { h += '<span class="mono">' + k + '</span><b class="mono" style="text-align:right">' + (j === 6 || j === 8 ? Math.round(p.x[j]) : fmt(p.x[j], 3)) + '</b>'; }); h += '</div>';
    var asama1 = p.iso ? 'SALDIRI' : 'normal', dogru;
    if (p.y === 0) dogru = p.iso ? '<span style="color:#c0392b">✗ yanlış alarm</span>' : '<span style="color:#2E7D54">✓ doğru</span>';
    else if (!p.iso) dogru = '<span style="color:#c0392b">✗ saldırı kaçırıldı</span>';
    else dogru = p.tur === s ? '<span style="color:#2E7D54">✓ tür de doğru</span>' : '<span style="color:#c0392b">✗ tür yanlış</span>';
    h += '<div style="flex:1;min-width:230px"><b>İki aşamalı sistemin kararı</b><div class="kucuk" style="margin-top:6px">Aşama 1 (Isolation Forest): <b>' + asama1 + '</b> <span class="soluk">(anomali skoru ' + fmt(p.sk, 3) + ')</span><br>' + (p.iso ? 'Aşama 2 (Random Forest): tür = <b style="color:' + RENK[p.tur] + '">' + p.tur + '</b><br>' : 'Aşama 2: çalışmadı (saldırı bulunamadı)<br>') + 'Sonuç: ' + dogru + '</div></div></div>';
    $('#scKart').innerHTML = h;
  }
  var cvs = $('#scCanvas');
  cvs.onclick = function (e) { var i = en(e); if (i >= 0) { secili = i; kartGoster(i); ciz(); } };
  cvs.onmousemove = function (e) { var i = en(e); if (i < 0) { ipucu(null); return; } var p = P[i]; ipucu('<b style="color:' + RENK[SIN[p.y]] + '">' + SIN[p.y] + '</b> · amp ' + fmt(p.a, 1) + '<br>' + KOL[sx] + ': ' + fmt(p.x[sx], 2) + '<br>' + KOL[sy] + ': ' + fmt(p.x[sy], 2), e); };
  cvs.onmouseleave = function () { ipucu(null); };
  X.onchange = function () { sx = +X.value; ciz(); }; Y.onchange = function () { sy = +Y.value; ciz(); };
  $('#scTest').onchange = function () { testOnly = this.checked; ciz(); };
  var l = $('#scLejant'); SIN.forEach(function (s) { var e = document.createElement('span'); e.innerHTML = '<i style="background:' + RENK[s] + '"></i>' + s; e.onclick = function () { gor[s] = !gor[s]; e.className = gor[s] ? '' : 'kapali'; ciz(); }; l.appendChild(e); });
  kaydet(ciz); ciz();
  return { P: P };
})();

/* ================================================================= 7. ISOLATION FOREST DEMOSU */
(function isoDemo() {
  var P = SC.P, FX = 3, FY = 7, pts = [], kesim = null, secIdx = -1, zaman = null, taban = null, ekran = [];
  var sayac = {}; P.forEach(function (p) { var s = SIN[p.y]; sayac[s] = (sayac[s] || 0) + 1; if (p.y === 0 || sayac[s] <= 100) pts.push(p); });
  var xs = pts.map(function (p) { return p.x[FX]; }).sort(function (a, b) { return a - b; }), ys = pts.map(function (p) { return p.x[FY]; }).sort(function (a, b) { return a - b; });
  var rx = [xs[Math.floor(xs.length * 0.01)], xs[Math.floor(xs.length * 0.99)]], ry = [ys[Math.floor(ys.length * 0.01)], ys[Math.floor(ys.length * 0.99)]];
  rx = [rx[0] - (rx[1] - rx[0]) * 0.04, rx[1] + (rx[1] - rx[0]) * 0.04]; ry = [ry[0] - (ry[1] - ry[0]) * 0.04, ry[1] + (ry[1] - ry[0]) * 0.04];
  var rng = SIM.mulberry32(99);
  function izole(hedef) {
    var h = pts[hedef], hucre = pts.map(function (_, i) { return i; }), kutu = [rx[0], rx[1], ry[0], ry[1]], kes = [], d = 0;
    while (hucre.length > 1 && d < 40) {
      var ax = rng() < 0.5 ? 0 : 1, f = ax === 0 ? FX : FY, lo = Infinity, hi = -Infinity;
      hucre.forEach(function (i) { var v = pts[i].x[f]; if (v < lo) lo = v; if (v > hi) hi = v; });
      if (hi - lo < 1e-12) { ax = 1 - ax; f = ax === 0 ? FX : FY; lo = Infinity; hi = -Infinity; hucre.forEach(function (i) { var v = pts[i].x[f]; if (v < lo) lo = v; if (v > hi) hi = v; }); if (hi - lo < 1e-12) break; }
      var cut = lo + (hi - lo) * rng(), sol = h.x[f] < cut;
      kes.push({ ax: ax, v: cut, kutu: kutu.slice() });
      if (ax === 0) { if (sol) kutu[1] = cut; else kutu[0] = cut; } else { if (sol) kutu[3] = cut; else kutu[2] = cut; }
      hucre = hucre.filter(function (i) { return (pts[i].x[f] < cut) === sol; }); d++;
    }
    return { kes: kes, kutu: kutu };
  }
  function ort(i, n) { var t = 0; for (var k = 0; k < n; k++) t += izole(i).kes.length; return t / n; }
  function tabanHesap() {
    if (taban) return taban; var N = [], A = [], i;
    for (i = 0; i < pts.length; i++) { if (pts[i].y === 0) N.push(i); else A.push(i); }
    function ornek(a, m) { var o = []; for (var k = 0; k < m; k++) o.push(a[Math.floor(rng() * a.length)]); return o; }
    var n = ornek(N, 25).map(function (j) { return ort(j, 60); }), a = ornek(A, 25).map(function (j) { return ort(j, 60); });
    taban = { normal: n.reduce(function (s, v) { return s + v; }, 0) / n.length, atak: a.reduce(function (s, v) { return s + v; }, 0) / a.length }; return taban;
  }
  function ciz(goster) {
    var cvs = $('#isoCanvas'), k = kur(cvs); if (!k) return; var c = k.c, w = k.w, h = k.h, pl = 40, pr = 8, pt = 8, pb = 26, pw = w - pl - pr, ph = h - pt - pb;
    function X(v) { return pl + pw * (v - rx[0]) / (rx[1] - rx[0]); } function Y(v) { return pt + ph * (1 - (v - ry[0]) / (ry[1] - ry[0])); }
    c.fillStyle = '#fff'; c.fillRect(0, 0, w, h); c.strokeStyle = '#e6ebf1'; c.strokeRect(pl, pt, pw, ph);
    yaziAyar(c, 10, '#8896a5', 'center'); c.fillText(KOL[FX], pl + pw / 2, h - 8); c.save(); c.translate(11, pt + ph / 2); c.rotate(-Math.PI / 2); c.fillText(KOL[FY], 0, 0); c.restore();
    if (kesim && goster > 0) {
      for (var i = 0; i < Math.min(goster, kesim.kes.length); i++) {
        var q = kesim.kes[i], b = q.kutu; c.strokeStyle = 'rgba(192,57,43,.8)'; c.lineWidth = 1.6; c.beginPath();
        if (q.ax === 0) { c.moveTo(X(q.v), Y(b[2])); c.lineTo(X(q.v), Y(b[3])); } else { c.moveTo(X(b[0]), Y(q.v)); c.lineTo(X(b[1]), Y(q.v)); } c.stroke();
        yaziAyar(c, 10, '#c0392b', 'center'); if (q.ax === 0) c.fillText(i + 1, X(q.v), Y(b[3]) + 8); else c.fillText(i + 1, X(b[1]) - 8, Y(q.v) - 7);
      }
      if (goster >= kesim.kes.length) { var kb = kesim.kutu; c.fillStyle = 'rgba(46,125,84,.18)'; c.fillRect(X(kb[0]), Y(kb[3]), X(kb[1]) - X(kb[0]), Y(kb[2]) - Y(kb[3])); }
    }
    ekran = [];
    pts.forEach(function (p, i) { var px = X(p.x[FX]), py = Y(p.x[FY]); if (px < pl || px > pl + pw || py < pt || py > pt + ph) return; c.fillStyle = rgba(RENK[SIN[p.y]], 0.5); c.beginPath(); c.arc(px, py, 3, 0, 6.3); c.fill(); ekran.push([px, py, i]); });
    if (secIdx >= 0) { var s = pts[secIdx]; c.strokeStyle = '#000'; c.lineWidth = 2; c.beginPath(); c.arc(X(s.x[FX]), Y(s.x[FY]), 7, 0, 6.3); c.stroke(); }
    cvs._ek = ekran;
  }
  function calistir() {
    if (secIdx < 0) return; clearInterval(zaman); kesim = izole(secIdx); var g = 0; ciz(0);
    zaman = setInterval(function () { g++; ciz(g); if (g >= kesim.kes.length + 1) { clearInterval(zaman); } }, 260);
    var yol = ort(secIdx, 300), t = tabanHesap(), p = pts[secIdx], mx = Math.max(yol, t.normal, t.atak) * 1.1;
    function cubuk(ad, v, renk) { return '<div class="cubuk-sat" style="grid-template-columns:130px 1fr 40px"><span class="kucuk">' + ad + '</span><div class="cubuk"><i style="width:' + (v / mx * 100) + '%;background:' + renk + '"></i></div><span class="say">' + fmt(v, 1) + '</span></div>'; }
    var kisa = yol < t.normal * 0.8;
    $('#isoSonuc').innerHTML = '<div class="kucuk"><b>Ortalama izolasyon yolu</b> (300 deneme; kısa = anormal)</div>' + cubuk('Seçtiğiniz nokta', yol, RENK[SIN[p.y]]) + cubuk('Normal noktalar', t.normal, RENK.normal) + cubuk('Saldırı noktaları', t.atak, '#7f8c9a') +
      '<div class="not kucuk" style="margin-top:10px">' + (kisa ? 'Bu nokta ortalama <b>' + fmt(yol, 1) + '</b> kesimde tek başına kaldı, normal noktaların ortalamasından (<b>' + fmt(t.normal, 1) + '</b>) belirgin biçimde az. Isolation Forest bunu <b>anormal</b> sayar.' : 'Bu nokta tek başına kalmak için ortalama <b>' + fmt(yol, 1) + '</b> kesim gerektirdi: kalabalığın içinde, yani <b>normale benziyor</b>.') + '</div>' +
      '<div class="kucuk soluk">Kırmızı çizgiler bu denemedeki rastgele kesimlerdir (numara = sırası). Yeşil kutu noktanın en sonunda tek kaldığı hücredir. Gerçek Isolation Forest bu işlemi 200 ağaç için, 10 özniteliği birlikte kullanarak yapar.</div>';
  }
  var cvs = $('#isoCanvas');
  cvs.onclick = function (e) { var r = cvs.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, best = -1, bd = 196; (cvs._ek || []).forEach(function (q) { var d = (q[0] - x) * (q[0] - x) + (q[1] - y) * (q[1] - y); if (d < bd) { bd = d; best = q[2]; } }); if (best >= 0) { secIdx = best; $('#isoSecili').innerHTML = 'Seçilen: <b style="color:' + RENK[SIN[pts[best].y]] + '">' + SIN[pts[best].y] + '</b> penceresi'; calistir(); } };
  $('#isoYeni').onclick = function () { if (secIdx >= 0) calistir(); };
  kaydet(function () { ciz(kesim ? kesim.kes.length + 1 : 0); });
  /* başlangıç: belirgin bir saldırı noktası seç */
  for (var i = 0; i < pts.length; i++) if (pts[i].y === 2 && pts[i].a > 1.4) { secIdx = i; break; }
  ciz(0); if (secIdx >= 0) { $('#isoSecili').innerHTML = 'Seçilen: <b style="color:' + RENK[SIN[pts[secIdx].y]] + '">' + SIN[pts[secIdx].y] + '</b> penceresi (başka bir noktaya tıklayarak değiştirin)'; setTimeout(calistir, 60); }
})();

/* ================================================================= 7. SONUÇLAR */
(function sonuclar() {
  var P = VERI.protokol, A = VERI.acik_kume.pulse;
  function sat(grup, olc, resmi, yeni, ilk, n) { return '<tr>' + (ilk ? '<td rowspan="' + n + '"><b>' + grup + '</b></td>' : '') + '<td>' + olc + '</td><td class="sayi">' + resmi + '</td><td class="sayi">' + yeni + '</td></tr>'; }
  var t = '<tr><th>Bileşen</th><th>Ölçüt</th><th class="sayi">Resmî <span class="rozet resmi">gerçek kayıt</span></th><th class="sayi">Yeniden üretim <span class="rozet yeniden">bu rapor</span></th></tr>';
  t += sat('Aşama 1a · Anomali tespiti (Isolation Forest)', 'Doğruluk', '%' + fmt(RESMI.asama1.iso.dog, 1), '%' + fmt(P.asama1_iso.dogruluk, 1), true, 3) + sat('', 'Saldırı yakalama', '%' + fmt(RESMI.asama1.iso.yak, 1), '%' + fmt(P.asama1_iso.yakalama, 1)) + sat('', 'Yanlış alarm', '%' + fmt(RESMI.asama1.iso.ya, 1), '%' + fmt(P.asama1_iso.yanlis_alarm, 1));
  t += sat('Aşama 1b · Denetimli ikili (Random Forest)', 'Doğruluk', '%' + fmt(RESMI.asama1.rf.dog, 1), '%' + fmt(P.asama1_rf.dogruluk, 1), true, 2) + sat('', 'Saldırı yakalama', '%' + fmt(RESMI.asama1.rf.yak, 1), '%' + fmt(P.asama1_rf.yakalama, 1));
  t += sat('Aşama 2 · Tür belirleme (Random Forest)', 'Doğruluk', '%' + fmt(RESMI.asama2.dog, 1), '%' + fmt(P.asama2.dogruluk, 1), true, 1);
  t += sat('Açık-küme · pulse saklı', 'Denetimli RF, pulse\'u "constant" sandı', '%' + fmt(RESMI.acikPulse.rf.constant, 1), '%' + fmt(A.rf_tahmin_dagilimi.constant || 0, 1), true, 3) + sat('', 'Anomali tespiti pulse\'u saldırı olarak yakaladı', '%' + fmt(RESMI.acikPulse.isoYak, 1), '%' + fmt(A.iso_yakalama, 1)) + sat('', 'Normalde yanlış alarm', '%' + fmt(RESMI.acikPulse.isoYa, 1), '%' + fmt(A.iso_yanlis_alarm, 1));
  $('#sonucTablo').innerHTML = t;

  /* karışıklık matrisi */
  var cm = P.asama2.karisiklik, S = ['constant', 'tone', 'sweep', 'pulse'], h = '<div class="cm" style="grid-template-columns:70px repeat(4,1fr)"><div class="bas"></div>';
  S.forEach(function (s) { h += '<div class="bas">tahmin<br><b style="color:' + RENK[s] + '">' + s + '</b></div>'; });
  var enHata = { v: 0, a: 0, b: 0, y: 0 };
  cm.forEach(function (satir, i) {
    var top = satir.reduce(function (a, b) { return a + b; }, 0); h += '<div class="bas">gerçek<br><b style="color:' + RENK[S[i]] + '">' + S[i] + '</b></div>';
    satir.forEach(function (v, j) { var o = top ? v / top : 0; h += '<div data-i="' + i + '" data-j="' + j + '" style="background:' + rgba('#1f5fa8', 0.06 + 0.9 * o) + ';color:' + (o > 0.5 ? '#fff' : '#1c2733') + ';' + (i === j ? 'outline:2px solid ' + RENK[S[i]] + ';outline-offset:-2px' : '') + '">' + v + '</div>'; if (i !== j && v > enHata.v) enHata = { v: v, a: S[i], b: S[j], y: top ? v / top * 100 : 0 }; });
  });
  h += '</div>'; var kut = $('#cmKutu'); kut.innerHTML = h;
  $$('[data-i]', kut).forEach(function (d) { d.onmousemove = function (e) { var i = +d.getAttribute('data-i'), j = +d.getAttribute('data-j'), top = cm[i].reduce(function (a, b) { return a + b; }, 0); ipucu('Gerçek <b>' + S[i] + '</b> → tahmin <b>' + S[j] + '</b><br>' + cm[i][j] + ' pencere (%' + fmt(cm[i][j] / top * 100, 1) + ')', e); }; d.onmouseleave = function () { ipucu(null); }; });
  $('#cmYorum').innerHTML = 'En büyük hata: gerçek <b>' + enHata.a + '</b> → tahmin <b>' + enHata.b + '</b> (' + enHata.v + ' pencere, %' + fmt(enHata.y, 0) + '). Resmî sonuçta da karışma constant ile pulse arasındadır.';

  /* resmî sınıf sonuçları */
  var s2 = '<div class="tablo-kutu"><table><tr><th>Sınıf</th><th>Kesinlik</th><th>Duyarlılık</th><th>F1</th><th class="sayi">Örnek</th></tr>';
  S.forEach(function (s) {
    var r = RESMI.asama2.sinif[s];
    function bar(v) { return '<div style="display:flex;align-items:center;gap:6px"><div style="width:70px;height:9px;background:#edf1f6;border-radius:5px"><i style="display:block;height:100%;width:' + v * 100 + '%;background:' + RENK[s] + ';border-radius:5px"></i></div><span class="mono kucuk">' + fmt(v, 2) + '</span></div>'; }
    s2 += '<tr><td style="color:' + RENK[s] + ';font-weight:700">' + s + '</td><td>' + bar(r[0]) + '</td><td>' + bar(r[1]) + '</td><td>' + bar(r[2]) + '</td><td class="sayi">' + r[3] + '</td></tr>';
  });
  $('#sinifSonuc').innerHTML = s2 + '</table></div>';
})();

/* ================================================================= 8. AÇIK-KÜME */
(function acikKume() {
  var sec = 'pulse', S = ['constant', 'tone', 'sweep', 'pulse'];
  function cubuklar(dag, normalAd) {
    var h = '';
    SIN.forEach(function (s) {
      var v = dag[s] || 0, kotu = s === 'normal';
      h += '<div class="cubuk-sat" style="grid-template-columns:150px 1fr 56px"><span class="kucuk" style="color:' + (kotu ? '#c0392b' : RENK[s]) + ';font-weight:700">' + (kotu ? 'normal (kaçırıldı!)' : s) + '</span><div class="cubuk"><i style="width:' + v + '%;background:' + (kotu ? '#c0392b' : RENK[s]) + '"></i></div><span class="say">%' + fmt(v, 1) + '</span></div>';
    });
    return h;
  }
  function tek(ad, v, renk) { return '<div class="cubuk-sat" style="grid-template-columns:190px 1fr 56px"><span class="kucuk">' + ad + '</span><div class="cubuk"><i style="width:' + v + '%;background:' + renk + '"></i></div><span class="say">%' + fmt(v, 1) + '</span></div>'; }
  function ciz() {
    var A = VERI.acik_kume[sec], rf = '', iso = '';
    if (sec === 'pulse') rf += '<div class="kucuk"><span class="rozet resmi" style="margin:0">resmî</span> yazarın gerçek verisi</div>' + cubuklar(RESMI.acikPulse.rf) + '<div class="kucuk" style="margin-top:10px"><span class="rozet yeniden" style="margin:0">yeniden üretim</span> bu rapor</div>';
    rf += cubuklar(A.rf_tahmin_dagilimi);
    if (sec === 'pulse') iso += '<div class="kucuk"><span class="rozet resmi" style="margin:0">resmî</span></div>' + tek('Bilinmeyeni saldırı olarak yakalama', RESMI.acikPulse.isoYak, '#2E7D54') + tek('Normalde yanlış alarm', RESMI.acikPulse.isoYa, '#e0a02a') + '<div class="kucuk" style="margin-top:10px"><span class="rozet yeniden" style="margin:0">yeniden üretim</span></div>';
    iso += tek('Bilinmeyeni saldırı olarak yakalama', A.iso_yakalama, '#2E7D54') + tek('Normalde yanlış alarm', A.iso_yanlis_alarm, '#e0a02a');
    $('#acikRF').innerHTML = rf + '<div class="kucuk soluk" style="margin-top:8px">Model yalnızca bildiği sınıflardan birini söyleyebilir; <b>' + sec + '</b> hiç gösterilmedi.</div>';
    $('#acikISO').innerHTML = iso + '<div class="kucuk soluk" style="margin-top:8px">Yalnızca normal pencerelerle eğitildi; <b>' + sec + '</b>\'i hiç görmedi.</div>';
    var enler = Object.keys(A.rf_tahmin_dagilimi).sort(function (a, b) { return A.rf_tahmin_dagilimi[b] - A.rf_tahmin_dagilimi[a]; }), ust = enler[0];
    $('#acikYorum').innerHTML = '<b>' + sec + '</b> eğitimden saklandığında denetimli model onu en çok <b>' + ust + '</b> sandı (%' + fmt(A.rf_tahmin_dagilimi[ust], 1) + ') ve %' + fmt(A.rf_normal_sanma, 1) + '\'ini normal (güvenli) sanarak tamamen kaçırdı. Yani <b>yeni saldırıyı tanıyamaz, yalnızca bildiği bir etikete zorlar</b>. Anomali tespiti ise aynı pencerelerin %' + fmt(A.iso_yakalama, 1) + '\'ini saldırı olarak yakaladı (normalde yanlış alarm %' + fmt(A.iso_yanlis_alarm, 1) + '). Önemli not: anomali tespiti <i>tür söylemez</i>, yalnızca "bir şey yanlış" der; türü belirlemek bilinen sınıflarla ayrı bir işlemdir.';
  }
  sekmeKur($('#acikSekme'), S.map(function (s) { return { id: s, ad: s, renk: RENK[s] }; }), sec, function (s) { sec = s; ciz(); });
  $('#acikRozet1').innerHTML = '<span class="rozet resmi">resmî</span><span class="rozet yeniden">yeniden üretim</span>'; $('#acikRozet2').innerHTML = '<span class="rozet resmi">resmî</span><span class="rozet yeniden">yeniden üretim</span>';
  ciz();
})();
