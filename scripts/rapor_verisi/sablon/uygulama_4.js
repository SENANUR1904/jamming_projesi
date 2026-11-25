/* ============================================================================
   uygulama_4.js : 9. Python ön çalışmaları, 10. doğrulama, 11. bulgular, gezinme
   ========================================================================== */

/* ================================================================= 9.1 ENERJİ DEDEKTÖRÜ */
(function enerjiDedektoru() {
  var N = 1000, GUC = [], TR = 120, E = null, tohum = 11, esik = 0.6;
  for (var g = 0; g <= 15; g++) GUC.push(1.5 * g / 15);
  var T = [], TEMIZ = [], KAPI = [], TON = [];
  for (var i = 0; i < N; i++) { T[i] = i / (N - 1); TEMIZ[i] = Math.sin(2 * Math.PI * 5 * T[i]); KAPI[i] = (Math.floor(T[i] * 10) % 2 === 0) ? 1 : 0; TON[i] = Math.sin(2 * Math.PI * 40 * T[i]); }
  function uret() {
    var rng = SIM.mulberry32(tohum), spare = null;
    function randn() { if (spare !== null) { var s = spare; spare = null; return s; } var u = rng() || 1e-12, v = rng(), r = Math.sqrt(-2 * Math.log(u)); spare = r * Math.sin(2 * Math.PI * v); return r * Math.cos(2 * Math.PI * v); }
    function enerji(tip, gc) {
      var s = 0, x;
      for (var k = 0; k < N; k++) {
        x = TEMIZ[k] + 0.1 * randn();
        if (tip === 1) x += gc * randn(); else if (tip === 2) x += gc * randn() * KAPI[k]; else if (tip === 3) x += gc * TON[k];
        s += x * x;
      }
      return s / N;
    }
    var R = { yok: [], a: [[], [], []] }, a, q, r;
    for (r = 0; r < 500; r++) R.yok.push(enerji(0, 0));
    for (a = 0; a < 3; a++) for (q = 0; q < GUC.length; q++) { var d = []; for (r = 0; r < TR; r++) d.push(enerji(a + 1, GUC[q])); R.a[a].push(d); }
    return R;
  }
  function ciz() {
    if (!E) return; var cvs = $('#enCanvas'), k = kur(cvs); if (!k) return; var c = k.c, w = k.w, h = k.h, pl = 44, pr = 12, pt = 10, pb = 36, pw = w - pl - pr, ph = h - pt - pb;
    function X(v) { return pl + pw * v / 1.5; } function Y(v) { return pt + ph * (1 - v / 100); }
    c.fillStyle = '#fff'; c.fillRect(0, 0, w, h); c.strokeStyle = '#e6ebf1'; c.beginPath(); for (var g = 0; g <= 5; g++) { c.moveTo(pl, Y(g * 20)); c.lineTo(pl + pw, Y(g * 20)); } for (g = 0; g <= 5; g++) { c.moveTo(X(g * 0.3), pt); c.lineTo(X(g * 0.3), pt + ph); } c.stroke();
    yaziAyar(c, 10, '#8896a5', 'right'); for (g = 0; g <= 5; g++) c.fillText(g * 20 + '%', pl - 5, Y(g * 20)); yaziAyar(c, 10, '#8896a5', 'center'); for (g = 0; g <= 5; g++) c.fillText(fmt(g * 0.3, 1), X(g * 0.3), h - 20); c.fillText('saldırı gücü', pl + pw / 2, h - 6);
    var seri = [['Sürekli jammer', RENK.constant], ['Darbe jammer', RENK.pulse], ['Tek ton jammer', RENK.tone]];
    seri.forEach(function (s, a) {
      var rate = E.a[a].map(function (d) { return d.filter(function (v) { return v > esik; }).length / d.length * 100; });
      c.strokeStyle = s[1]; c.lineWidth = 2; c.beginPath(); rate.forEach(function (v, q) { if (q) c.lineTo(X(GUC[q]), Y(v)); else c.moveTo(X(GUC[q]), Y(v)); }); c.stroke();
      c.fillStyle = s[1]; rate.forEach(function (v, q) { c.beginPath(); c.arc(X(GUC[q]), Y(v), 3, 0, 6.3); c.fill(); });
      c.fillRect(pl + 10 + a * 130, pt + 8, 12, 4); yaziAyar(c, 11, '#33475b', 'left'); c.fillText(s[0], pl + 26 + a * 130, pt + 10);
    });
    var ya = E.yok.filter(function (v) { return v > esik; }).length / E.yok.length * 100;
    $('#enAlarm').textContent = '%' + fmt(ya, 1).replace(',0', '');
    $('#enAlarm').style.color = ya > 5 ? '#c0392b' : '#2E7D54';
  }
  function yeni() { tohum = (tohum * 7919 + 13) % 100003; E = uret(); ciz(); }
  $('#enEsik').oninput = function () { esik = parseFloat(this.value); $('#enDeger').textContent = fmt(esik, 2); ciz(); };
  $('#enYeni').onclick = yeni;
  kaydet(ciz);
  setTimeout(function () { E = uret(); ciz(); }, 30);
})();

/* ================================================================= 9.2 MARKOV */
(function markov() {
  var AT = ['', 'Sürekli', 'Darbe', 'Tek_ton', 'Süpürme', 'Reactive'], ATR = ['#2E7D54', RENK.constant, RENK.pulse, RENK.tone, RENK.sweep, '#16a085'];
  var p01 = 0.15, p10 = 0.18, adimlar = [], seciliAdim = -1, tohum = 5;
  function calistir() {
    var rng = SIM.mulberry32(tohum), d = 0, tur = 0, A = [];
    for (var i = 0; i < 4000; i++) {
      var z = rng();
      if (d === 0) { if (z < p01) { d = 1; tur = 1 + Math.floor(rng() * 5); } } else { if (z < p10) { d = 0; tur = 0; } }
      A.push({ d: d, tur: d ? tur : 0 });
    }
    return A;
  }
  function ozet() {
    var atak = 0, burst = 0, calm = 0, bl = [], cl = [], run = 0, prev = adimlar[0].d;
    adimlar.forEach(function (a, i) { if (a.d) atak++; if (i > 0 && a.d !== prev) { (prev ? bl : cl).push(run); run = 0; } run++; prev = a.d; });
    var ort = function (a) { return a.length ? a.reduce(function (s, v) { return s + v; }, 0) / a.length : 0; };
    var pi = p01 / (p01 + p10);
    $('#mkOzet').innerHTML = '<table><tr><th></th><th class="sayi">Teorik</th><th class="sayi">Bu çalıştırma (4000 adım)</th></tr>' +
      '<tr><td>Saldırıda geçirilen zaman payı</td><td class="sayi">%' + fmt(pi * 100, 1) + '</td><td class="sayi">%' + fmt(atak / adimlar.length * 100, 1) + '</td></tr>' +
      '<tr><td>Ortalama saldırı öbeği uzunluğu</td><td class="sayi">' + fmt(1 / p10, 1) + ' adım</td><td class="sayi">' + fmt(ort(bl), 1) + ' adım</td></tr>' +
      '<tr><td>Ortalama sakin süre</td><td class="sayi">' + fmt(1 / p01, 1) + ' adım</td><td class="sayi">' + fmt(ort(cl), 1) + ' adım</td></tr></table>' +
      '<div class="soluk kucuk" style="margin-top:6px">Teorik değerler: π<sub>saldırı</sub> = p<sub>01</sub> / (p<sub>01</sub> + p<sub>10</sub>), öbek uzunluğu = 1 / p<sub>10</sub>.</div>';
    $('#mkMatris').innerHTML = '<div class="kucuk"><b>Geçiş matrisi P</b> (bir sonraki adım yalnızca şimdiki duruma bağlıdır)</div><table style="max-width:330px;margin-top:6px"><tr><th></th><th class="sayi">→ Sakin</th><th class="sayi">→ Saldırı</th></tr>' +
      '<tr><td><b>Sakin</b></td><td class="sayi">' + fmt(1 - p01, 2) + '</td><td class="sayi" style="background:#fdecea">' + fmt(p01, 2) + '</td></tr><tr><td><b>Saldırı</b></td><td class="sayi" style="background:#e9f6ee">' + fmt(p10, 2) + '</td><td class="sayi">' + fmt(1 - p10, 2) + '</td></tr></table>';
  }
  function serit() {
    var h = ''; for (var i = 0; i < 200; i++) { var a = adimlar[i]; h += '<span class="markov-hucre' + (i === seciliAdim ? ' sec' : '') + '" data-i="' + i + '" style="background:' + ATR[a.tur] + ';' + (a.d ? '' : 'opacity:.55;') + '" title="adım ' + i + '"></span>'; }
    var kap = $('#mkSerit'); kap.innerHTML = h;
    $$('.markov-hucre', kap).forEach(function (e) { e.onclick = function () { seciliAdim = +e.getAttribute('data-i'); serit(); sinyal(); }; });
  }
  function sinyal() {
    var cvs = $('#mkSinyal'), k = kur(cvs); if (!k) return; var c = k.c, w = k.w, h = k.h;
    if (seciliAdim < 0) { c.fillStyle = '#fff'; c.fillRect(0, 0, w, h); yaziAyar(c, 12, '#8896a5', 'center'); c.fillText('Yukarıdaki kutulardan birine tıklayın: o adımda alıcının gördüğü sinyal burada çizilir.', w / 2, h / 2); return; }
    var a = adimlar[seciliAdim], rng = SIM.mulberry32(1000 + seciliAdim * 17 + tohum), spare = null, n = 1000;
    function randn() { if (spare !== null) { var s = spare; spare = null; return s; } var u = rng() || 1e-12, v = rng(), r = Math.sqrt(-2 * Math.log(u)); spare = r * Math.sin(2 * Math.PI * v); return r * Math.cos(2 * Math.PI * v); }
    var snr = rng() * 18, sg = Math.sqrt(Math.pow(10, -snr / 10)), nm = new Float64Array(n), x = new Float64Array(n), mean = 0, t;
    for (var i = 0; i < n; i++) { t = i / n; nm[i] = Math.sin(2 * Math.PI * 5 * t) + sg * randn(); mean += Math.abs(nm[i]); } mean /= n;
    var jnr = -6 + rng() * 15, gc = Math.sqrt(Math.pow(10, jnr / 10)), fr = 15 + rng() * 70;
    for (i = 0; i < n; i++) {
      t = i / n; x[i] = nm[i];
      if (a.tur === 1) x[i] += gc * randn(); else if (a.tur === 2) x[i] += gc * randn() * (Math.sin(2 * Math.PI * 2 * t) > 0 ? 1 : 0);
      else if (a.tur === 3) x[i] += gc * Math.sin(2 * Math.PI * fr * t); else if (a.tur === 4) x[i] += gc * Math.sin(2 * Math.PI * (10 * t + 45 * t * t));
      else if (a.tur === 5) x[i] += gc * randn() * (Math.abs(nm[i]) > mean ? 1 : 0);
    }
    ciziIQ(cvs, { i: x, q: new Float64Array(n) }, 6, n, { sadeceI: true, fs: 1000 });
    $('#mkAciklama').innerHTML = '<b>Adım ' + seciliAdim + '</b> · durum: <b style="color:' + (a.d ? '#c0392b' : '#2E7D54') + '">' + (a.d ? 'SALDIRI (' + AT[a.tur] + ')' : 'sakin') + '</b> · meşru sinyalin SNR\'ı ' + fmt(snr, 1) + ' dB' + (a.d ? ' · jammer/gürültü oranı ' + fmt(jnr, 1) + ' dB' + (a.tur === 3 ? ' · ton frekansı ' + fmt(fr, 0) + ' Hz' : '') : '') + '. Çizim 1000 noktalık (1 sn, 1000 Hz örnekleme) tek bir sinyaldir; mavi çizgi alıcının gördüğüdür.';
  }
  function guncelle() { adimlar = calistir(); seciliAdim = -1; ozet(); serit(); sinyal(); }
  $('#mkP01').oninput = function () { p01 = parseFloat(this.value); $('#mkP01D').textContent = fmt(p01, 2); guncelle(); };
  $('#mkP10').oninput = function () { p10 = parseFloat(this.value); $('#mkP10D').textContent = fmt(p10, 2); guncelle(); };
  $('#mkRun').onclick = function () { tohum = (tohum * 7919 + 13) % 100003; guncelle(); };
  var lj = $('#mkLejant'); lj.innerHTML = '<span style="cursor:default"><i style="background:' + ATR[0] + '"></i>sakin</span>'; for (var q = 1; q <= 5; q++) lj.innerHTML += '<span style="cursor:default"><i style="background:' + ATR[q] + '"></i>' + AT[q] + '</span>';
  kaydet(sinyal); guncelle();
})();

/* ================================================================= 10. DOĞRULAMA */
(function dogrulama() {
  var D = DOGRULAMA; $('#dgEn').textContent = '%' + fmt(D.max_enerji_sapma_yuzde, 2); $('#dgGuc').textContent = '%' + fmt(D.max_guc_sapma_yuzde, 2); $('#dgN').textContent = D.pencere_sayisi;
  var t = '<tr><th>Sınıf</th><th class="sayi">jammer_amp</th><th class="sayi">Karmaşık güç<br><span class="soluk">GNU Radio · tarayıcı</span></th><th class="sayi">Enerji (#4)<br><span class="soluk">GNU Radio · tarayıcı</span></th><th class="sayi">std (#2)<br><span class="soluk">GR · tarayıcı</span></th><th class="sayi">basıklık (#5)<br><span class="soluk">GR · tarayıcı</span></th><th class="sayi">spektral (#10)<br><span class="soluk">GR · tarayıcı</span></th><th class="sayi">Sapma</th></tr>';
  D.satirlar.forEach(function (r) {
    var sp = Math.abs(r.js_enerji - r.gr_enerji) / r.gr_enerji * 100;
    t += '<tr><td style="color:' + RENK[r.sinif] + ';font-weight:700">' + r.sinif + '</td><td class="sayi">' + fmt(r.amp, 1) + '</td><td class="sayi">' + fmt(r.gr_guc, 3) + ' · ' + fmt(r.js_guc, 3) + '</td><td class="sayi">' + fmt(r.gr_enerji, 2) + ' · ' + fmt(r.js_enerji, 2) + '</td><td class="sayi">' + fmt(r.gr_std, 2) + ' · ' + fmt(r.js_std, 2) + '</td><td class="sayi">' + fmt(r.gr_basiklik, 2) + ' · ' + fmt(r.js_basiklik, 2) + '</td><td class="sayi">' + fmt(r.gr_spektral, 2) + ' · ' + fmt(r.js_spektral, 2) + '</td><td class="sayi" style="color:' + (sp < 1 ? '#2E7D54' : '#c0392b') + ';font-weight:700">%' + fmt(sp, 1) + '</td></tr>';
  });
  $('#dogrTablo').innerHTML = t;
})();

/* ================================================================= 11. BULGULAR */
(function bulgular() {
  var kap = $('#pulseKapiGrafik');
  kap.innerHTML = '<canvas id="pkCv" style="height:150px;background:#fff;border-radius:8px;border:1px solid #e3b7b2"></canvas><div class="kucuk soluk">Pulse kapısı (ilk 640 örnek = 2 periyot) <span class="rozet gr">GNU Radio ile ölçüldü</span> · <span style="color:var(--iq-i)">■ gerçel</span> <span style="color:var(--iq-q)">■ sanal</span> <b>■ büyüklük |kapı|</b>: hiçbir zaman 0\'a inmez. İdeal bir "açık/kapalı" kapı 0 ile 1 arasında gidip gelirdi.</div>';
  function ciz() {
    var r = SIM.simule('pulse', 1, { n: 640, n0: 0 }); var mg = Float64Array.from(r.kapi.i, function (v, k) { return Math.hypot(v, r.kapi.q[k]); });
    ciziIQ($('#pkCv'), r.kapi, 1.5, 640, { ekstra: mg });
  }
  kaydet(ciz); ciz();
  var G = VERI.grup_testi;
  $('#grupSonuc').innerHTML = 'tür belirleme doğruluğu rastgele bölmede <b>%' + fmt(G.rastgele_bolme, 1) + '</b>, aynı güç segmentinden gelen pencereleri birlikte tutan bölmede <b>%' + fmt(G.segment_bolme, 1) + '</b> (≈ ' + fmt(G.rastgele_bolme - G.segment_bolme, 1) + ' puan fark).';
})();

/* ================================================================= GEZİNME + YENİDEN BOYUTLANDIRMA */
(function gezinme() {
  var linkler = $$('nav.yan a'), bolumler = $$('main section');
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) linkler.forEach(function (a) { a.classList.toggle('aktif', a.getAttribute('href') === '#' + e.target.id); }); });
  }, { rootMargin: '-25% 0px -65% 0px' });
  bolumler.forEach(function (s) { io.observe(s); });
  var zaman = null;
  window.addEventListener('resize', function () { clearTimeout(zaman); zaman = setTimeout(function () { RENDERERS.forEach(function (f) { try { f(); } catch (e) { console.error(e); } }); }, 120); });
  /* <details> açıldığında içindeki canvas'lar yeniden çizilsin */
  $$('details').forEach(function (d) { d.addEventListener('toggle', function () { RENDERERS.forEach(function (f) { try { f(); } catch (e) { console.error(e); } }); }); });
})();
