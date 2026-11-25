/* ============================================================================
   uygulama_2.js : 4. simülasyon laboratuvarı, 5. veri
   ========================================================================== */

/* ================================================================= 4. LABORATUVAR */
var LAB = (function () {
  var st = { sinif: 'constant', amp: 1, seed: 1, n0: 4096, ayni: true, kaynak: 'model', asama: 'kanal', oynat: null };
  var ASAMALAR = [
    { id: 'yasal', ad: '1 · Meşru sinyal', alt: 'Signal Source · 1 kHz kosinüs' },
    { id: 'ortam', ad: '2 · Ortam gürültüsü', alt: 'Noise Source · genlik 0,3' },
    { id: 'jam', ad: '3 · Jammer', alt: '' },
    { id: 'toplam', ad: '4 · Add: toplam', alt: 'meşru + gürültü + jammer' },
    { id: 'kanal', ad: '5 · Channel Model sonrası', alt: 'kayda giden = .dat' }
  ];
  var JAM_ALT = { normal: 'yok (genlik 0)', constant: 'sürekli Gauss gürültüsü', tone: '5 kHz ton', sweep: 'Saw → VCO çırpı', pulse: 'gürültü × kapı' };
  var veri = null, ozel = null, refGuc = 1.99, cv = {};

  function bosIQ() { return { i: new Float64Array(1024), q: new Float64Array(1024) }; }
  function hesapla() {
    if (st.kaynak === 'gr') {
      var A = ASAMA[st.sinif], v = {};
      ['yasal', 'ortam', 'jam', 'toplam', 'kanal'].forEach(function (k) {
        v[k] = A[k] ? { i: Float64Array.from(A[k].i), q: Float64Array.from(A[k].q) } : bosIQ();
      });
      veri = v;
    } else {
      veri = SIM.simule(st.sinif, st.amp, { seed: st.seed, n0: st.n0, ayniSeed: st.ayni });
    }
    ozel = SIM.ozellik(veri.kanal);
  }
  function guc(x, n) { var s = 0; n = n || x.i.length; for (var k = 0; k < n; k++) s += x.i[k] * x.i[k] + x.q[k] * x.q[k]; return s / n; }

  /* ---- spektrum ---- */
  function isaretler(asama) {
    var s = st.sinif, M = [], bant = null;
    if (asama === 'yasal' || asama === 'toplam' || asama === 'kanal') M.push({ f: 1000, t: 'meşru 1 kHz', r: '#1f5fa8' });
    if ((asama === 'jam' || asama === 'toplam' || asama === 'kanal') && s === 'tone') M.push({ f: 5000, t: 'jammer 5 kHz', r: '#8E44AD' });
    if ((asama === 'jam' || asama === 'toplam' || asama === 'kanal') && s === 'sweep') bant = { a: 0, b: 9549, t: 'süpürme 0 … 9,5 kHz' };
    return { M: M, bant: bant };
  }
  function ciziSpek() {
    var c0 = kur(cv.spek); if (!c0) return;
    var c = c0.c, w = c0.w, h = c0.h, x = veri[st.asama] || bosIQ(), db = SIM.spektrumKarmasik(x);
    var pl = 38, pr = 8, pt = 8, pb = 22, pw = w - pl - pr, ph = h - pt - pb, lo = -90, hi = 6;
    function X(f) { return pl + pw * (f + FS / 2) / FS; } function Y(d) { return pt + ph * (1 - (Math.max(lo, Math.min(hi, d)) - lo) / (hi - lo)); }
    c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
    var I = isaretler(st.asama);
    if (I.bant) { c.fillStyle = 'rgba(41,128,185,.12)'; c.fillRect(X(I.bant.a), pt, X(I.bant.b) - X(I.bant.a), ph); yaziAyar(c, 10, '#2980B9', 'center'); c.fillText(I.bant.t, (X(I.bant.a) + X(I.bant.b)) / 2, pt + 9); }
    c.strokeStyle = '#e6ebf1'; c.lineWidth = 1; c.beginPath();
    for (var f = -16000; f <= 16000; f += 4000) { c.moveTo(X(f), pt); c.lineTo(X(f), pt + ph); }
    for (var d = lo; d <= 0; d += 30) { c.moveTo(pl, Y(d)); c.lineTo(pl + pw, Y(d)); }
    c.stroke(); yaziAyar(c, 10, '#8896a5', 'center');
    for (f = -16000; f <= 16000; f += 8000) { yaziAyar(c, 10, '#8896a5', f === -16000 ? 'left' : (f === 16000 ? 'right' : 'center')); c.fillText((f / 1000) + ' kHz', X(f), h - 8); }
    yaziAyar(c, 10, '#8896a5', 'right'); for (d = lo; d <= 0; d += 30) c.fillText(d + ' dB', pl - 4, Y(d));
    var rn = st.sinif === 'normal' ? '#2E7D54' : RENK[st.sinif];
    c.beginPath(); for (var k = 0; k < db.length; k++) { var fx = (k - db.length / 2) * FS / db.length; if (k) c.lineTo(X(fx), Y(db[k])); else c.moveTo(X(fx), Y(db[k])); }
    c.strokeStyle = rn; c.lineWidth = 1.3; c.stroke();
    I.M.forEach(function (m) { c.setLineDash([4, 3]); c.strokeStyle = m.r; c.beginPath(); c.moveTo(X(m.f), pt); c.lineTo(X(m.f), pt + ph); c.stroke(); c.setLineDash([]); yaziAyar(c, 10, m.r, 'left'); c.fillText(m.t, X(m.f) + 4, pt + 22); });
    $('#labSpekBaslik').innerHTML = 'Spektrum: ' + ASAMALAR.filter(function (a) { return a.id === st.asama; })[0].ad;
  }
  function ciziSpekReal() {
    var k0 = kur(cv.spekR); if (!k0) return;
    var c = k0.c, w = k0.w, h = k0.h, F = SIM.rfftGenlik(veri.kanal.i), n = F.length, mx = 0, arg = 0, k;
    for (k = 0; k < n; k++) if (F[k] > mx) { mx = F[k]; arg = k; }
    var pl = 38, pr = 8, pt = 8, pb = 22, pw = w - pl - pr, ph = h - pt - pb;
    function X(b) { return pl + pw * b / (n - 1); } function Y(v) { return pt + ph * (1 - v / (mx * 1.1)); }
    c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
    c.strokeStyle = '#e6ebf1'; c.beginPath(); for (var b = 0; b <= 512; b += 128) { c.moveTo(X(b), pt); c.lineTo(X(b), pt + ph); } c.stroke();
    for (b = 0; b <= 512; b += 128) { yaziAyar(c, 10, '#8896a5', b === 0 ? 'left' : (b === 512 ? 'right' : 'center')); c.fillText(fmt(b * FS / 1024 / 1000, 0) + ' kHz', X(b), h - 8); }
    [[32, '1 kHz', '#1f5fa8'], [160, '5 kHz', '#8E44AD']].forEach(function (m) { c.setLineDash([3, 3]); c.strokeStyle = m[2]; c.beginPath(); c.moveTo(X(m[0]), pt); c.lineTo(X(m[0]), pt + ph); c.stroke(); c.setLineDash([]); yaziAyar(c, 9, m[2], 'left'); c.fillText(m[1], X(m[0]) + 3, pt + ph - 6); });
    c.beginPath(); c.moveTo(X(0), Y(0)); for (k = 0; k < n; k++) c.lineTo(X(k), Y(F[k])); c.lineTo(X(n - 1), Y(0)); c.closePath();
    c.fillStyle = rgba(st.sinif === 'normal' ? '#2E7D54' : RENK[st.sinif], 0.18); c.fill(); c.strokeStyle = st.sinif === 'normal' ? '#2E7D54' : RENK[st.sinif]; c.lineWidth = 1.2; c.stroke();
    c.fillStyle = '#1c2733'; c.beginPath(); c.arc(X(arg), Y(mx), 4, 0, 6.3); c.fill();
    yaziAyar(c, 11, '#1c2733', arg > n * 0.7 ? 'right' : 'left'); c.fillText('baskin_frekans = ' + arg + ' (' + fmt(arg * FS / 1024, 0) + ' Hz)', X(arg) + (arg > n * 0.7 ? -8 : 8), Y(mx) + 4);
  }

  /* ---- öznitelik paneli ---- */
  function fmtOz(j, v) { if (j === 6 || j === 8) return String(Math.round(v)); return fmt(v, j === 0 || j === 5 ? 3 : 2); }
  function ozellikPaneli() {
    var N = VERI.ozet.normal, h = '';
    for (var j = 0; j < 10; j++) {
      var sd = N.std[j] < 1e-6 ? 1 : N.std[j], z = (ozel[j] - N.ort[j]) / sd, zc = Math.max(-6, Math.min(6, z)), w = Math.abs(zc) / 6 * 50;
      var renk = Math.abs(z) < 2 ? '#2E7D54' : (Math.abs(z) < 4 ? '#e0a02a' : '#c0392b');
      h += '<div class="oz-satir" title="z = ' + fmt(z, 1) + ' (normal ort. ' + fmt(N.ort[j], 2) + ' ± ' + fmt(N.std[j], 2) + ')"><span class="ad">' + (j + 1) + '. ' + KOL[j] + '</span><span class="v">' + fmtOz(j, ozel[j]) + '</span>' +
        '<div class="zbar"><i style="background:' + renk + ';' + (zc >= 0 ? 'left:50%;' : 'right:50%;') + 'width:' + w + '%"></i></div></div>';
    }
    h += '<div class="kucuk soluk" style="margin-top:6px"><span style="color:#2E7D54">■</span> |z| &lt; 2 normal aralığı · <span style="color:#e0a02a">■</span> 2–4 şüpheli · <span style="color:#c0392b">■</span> &gt; 4 normalden çok uzak</div>';
    $('#labOzellik').innerHTML = h;
  }

  /* ---- açıklama ---- */
  function aciklama() {
    var s = st.sinif, P = guc(veri.kanal), Pj = guc(veri.jam), Py = guc(veri.yasal), arg = ozel[8], txt = '';
    var jsr = Pj > 1e-9 ? 10 * Math.log10(Pj / Py) : null;
    var t = {
      normal: 'Jammer yok. Kayıt yalnızca meşru 1 kHz tonu, 0,3 genlikli ortam gürültüsü ve kanalın yansımasından oluşur. Bu yüzden gerçel spektrumdaki tek belirgin tepe <b>bin 32 (1 kHz)</b>\'tedir ve öznitelikler normalin ortalaması civarındadır.',
      constant: 'Gürültü kapısı sabit 1: Gauss gürültüsü <b>sürekli</b> akar. Spektrumda geniş bantlı bir taban yükselir; enerji ve standart sapma artar. <code>jammer_amp</code> küçükken (≈ 0,3\'ün altı) normalden ayırmak zordur, çünkü ortam gürültüsüyle aynı yapıdadır.',
      tone: '5 kHz\'lik dönen vektör eklendi. Spektrumda <b>keskin bir tepe</b> oluşur. <code>jammer_amp</code> arttıkça gerçel spektrumdaki 5 kHz tepesi (bin 160) meşru 1 kHz tepesini (bin 32) aşar ve <code>baskin_frekans</code> 32\'den 160\'a <b>atlar</b>. Şu an baskın bin: <b>' + arg + '</b>' + (arg === 160 ? ' → jammer meşru sinyali bastırdı.' : ' → meşru sinyal hâlâ baskın.'),
      sweep: 'Testere dalga VCO\'yu sürer; frekans her 20 ms\'de ≈ 0\'dan 9,5 kHz\'e <b>süpürülür</b>. Zaman içinde tek frekansta kalmadığı için spektrumda dar bir tepe değil, bantta <b>düz bir plato</b> görürsünüz. Zarf değişkenliği ve spektral yayılım artar.',
      pulse: 'Gürültü, 100 Hz\'lik bir kapıyla çarpılıyor. Ama kapı <i>complex</i> bir Square dalga olduğundan büyüklüğü hiç 0 olmaz (0,5 … 1,118): gürültü <b>açılıp kapanmaz</b>, yalnızca genliği dalgalanır. Alttaki grafikte kapıyı görebilirsiniz (bölüm 11, bulgu 1). Bu yüzden constant\'a çok benzer.'
    }[s];
    var satir = '<li>Kayda giden sinyalin ortalama gücü: <b>' + fmt(P, 2) + '</b> (normal ≈ ' + fmt(refGuc, 2) + ', yani <b>×' + fmt(P / refGuc, 2) + '</b>)</li>';
    if (jsr !== null) satir += '<li>Jammer / meşru sinyal gücü: <b>' + (jsr >= 0 ? '+' : '') + fmt(jsr, 1) + ' dB</b></li>';
    satir += '<li>Modelin gördüğü baskın frekans: <b>bin ' + arg + '</b> = ' + fmt(arg * FS / 1024, 0) + ' Hz</li>';
    var ek = '';
    if (s === 'pulse' || s === 'constant') ek = '<div class="kucuk soluk" style="margin-top:8px">İki gürültü kaynağı aynı seed olduğunda toplam gürültü <code>n·(0,3 + jammer_amp·kapı)</code>\'dır. Kutuyu kapatıp gürültülerin ayrı üretildiği durumla karşılaştırın.</div>';
    $('#labAciklama').innerHTML = '<h4 style="margin-top:0">Ne görüyorsunuz? <span class="rozet" style="margin-left:6px;background:' + rgba(s === 'normal' ? '#2E7D54' : RENK[s], .15) + ';color:#1c2733">' + AD_UZUN[s] + '</span></h4><p class="kucuk">' + t + '</p><ul class="kucuk" style="margin:0 0 0 18px">' + satir + '</ul>' + ek +
      '<div id="labKapi" style="margin-top:10px"></div>';
    if (s === 'pulse' || s === 'constant') {
      $('#labKapi').innerHTML = '<div class="kucuk"><b>Kapı büyüklüğü |g(n)|</b> <span class="soluk">(ilk 640 örnek, 2 periyot)</span></div><canvas id="labKapiCv" style="height:110px"></canvas>';
      var k = SIM.simule(s, 1, { n: 640, seed: 1, n0: st.n0 });
      var mg = Float64Array.from(k.kapi.i, function (v, q) { return Math.hypot(v, k.kapi.q[q]); });
      ciziIQ($('#labKapiCv'), { i: k.kapi.i, q: k.kapi.q }, 1.5, 640, { ekstra: mg });
    }
  }

  /* ---- ana çizim ---- */
  function asamaCiz() {
    var yr = 1.2, n = 256, k;
    ASAMALAR.forEach(function (a) { var x = veri[a.id]; for (k = 0; k < n; k++) yr = Math.max(yr, Math.abs(x.i[k]), Math.abs(x.q[k])); });
    yr = Math.ceil(yr * 1.08 * 2) / 2;
    ASAMALAR.forEach(function (a) { ciziIQ(cv[a.id], veri[a.id], yr, n); });
  }
  function guncelle() {
    hesapla(); asamaCiz(); ciziSpek(); ciziSpekReal(); ozellikPaneli(); aciklama();
    var grMod = st.kaynak === 'gr';
    $('#labAmp').disabled = grMod || st.sinif === 'normal'; $('#labYeni').disabled = grMod; $('#labAyniSeed').disabled = grMod || st.sinif === 'tone' || st.sinif === 'sweep' || st.sinif === 'normal';
    $('#labDurum').innerHTML = grMod ? '<span class="rozet gr">GNU Radio çıktısı</span> Gerçek GNU Radio ile çalıştırılmış kayıt; yalnızca <code>jammer_amp = 1</code> için mevcuttur.' :
      (st.sinif === 'normal' ? 'Normal sınıfta jammer genliği 0\'dır; kaydırıcı etkisizdir.' : '<span class="rozet model">tarayıcı modeli</span> Pencere başlangıcı: örnek #' + binlik(st.n0) + ' · gürültü tohumu: ' + st.seed + ' · GNU Radio çıktısına göre sapma %1\'in altında (bölüm 10).');
  }

  function baslat() {
    cv.spek = $('#labSpek'); cv.spekR = $('#labSpekReal');
    var kap = $('#labAsamalar'); kap.innerHTML = '';
    ASAMALAR.forEach(function (a) {
      var d = document.createElement('div'); d.className = 'asama' + (a.id === st.asama ? ' secili' : ''); d.setAttribute('data-id', a.id);
      d.innerHTML = '<div class="ad"><b>' + a.ad + '</b><span class="soluk" data-alt="' + a.id + '">' + a.alt + '</span></div><canvas style="height:84px"></canvas>';
      d.onclick = function () { st.asama = a.id; $$('.asama', kap).forEach(function (e) { e.classList.toggle('secili', e === d); }); ciziSpek(); };
      kap.appendChild(d); cv[a.id] = $('canvas', d);
    });
    function altYaz() { $('[data-alt="jam"]').textContent = JAM_ALT[st.sinif]; }
    sinifSekmeleri($('#labSinif'), st.sinif, function (s) { st.sinif = s; altYaz(); guncelle(); });
    $('#labAmp').oninput = function () { st.amp = parseFloat(this.value); $('#labAmpDeger').textContent = fmt(st.amp, 1); guncelle(); };
    $('#labYeni').onclick = function () { st.seed++; guncelle(); };
    $('#labAyniSeed').onchange = function () { st.ayni = this.checked; guncelle(); };
    $('#labKaynak').onchange = function () { st.kaynak = this.value; if (st.kaynak === 'gr') { st.amp = 1; $('#labAmp').value = 1; $('#labAmpDeger').textContent = '1,0'; } guncelle(); };
    $('#labOynat').onclick = function () {
      if (st.oynat) { clearInterval(st.oynat); st.oynat = null; this.textContent = '▶ Akışı oynat'; return; }
      if (st.kaynak === 'gr') { $('#labKaynak').value = 'model'; st.kaynak = 'model'; }
      this.textContent = '❚❚ Durdur';
      st.oynat = setInterval(function () { st.seed++; st.n0 += 1024; guncelle(); }, 500);
    };
    /* normal sınıfın ortalama gücü (referans) */
    var tp = 0; for (var q = 0; q < 12; q++) tp += guc(SIM.simule('normal', 0, { seed: 50 + q, n0: 4096 + q * 1024 }).kanal); refGuc = tp / 12;
    altYaz(); guncelle();
  }
  kaydet(function () { if (veri) { asamaCiz(); ciziSpek(); ciziSpekReal(); aciklama(); } });
  baslat();
  return { st: st };
})();

/* ================================================================= 5. VERİ */
(function veriBolumu() {
  /* ---- bayt anatomisi ---- */
  var baytSinif = 'constant';
  function baytCiz() {
    var B = VERI.bayt[baytSinif], h = '<div class="kucuk soluk" style="margin-bottom:6px"><code>' + baytSinif + '.dat</code> dosyasının ilk <b>32 baytı</b> (4 örnek × 8 bayt). Baytlar dosyadaki sırayla (küçük-endian float32) gösterilir.</div>';
    h += '<div style="display:flex;flex-wrap:wrap;gap:2px;align-items:stretch">';
    B.forEach(function (o, k) {
      var hx = function (s) { return s.replace(/(..)(?=.)/g, '$1 ').toUpperCase(); };
      h += '<div class="ornek"><b>Örnek ' + k + '</b><div style="margin:6px 0 4px"><span class="bit i">I&nbsp;&nbsp;' + hx(o.hex_i) + '</span></div><div><span class="bit q">Q&nbsp;&nbsp;' + hx(o.hex_q) + '</span></div>' +
        '<div class="kucuk" style="margin-top:6px;font-family:var(--mono)">I = <span style="color:var(--iq-i)">' + fmt(o.i, 4) + '</span><br>Q = <span style="color:var(--iq-q)">' + fmt(o.q, 4) + '</span></div></div>';
    });
    h += '</div><div class="kucuk soluk" style="margin-top:8px">Düzen: <code>[I₀ 4B][Q₀ 4B][I₁ 4B][Q₁ 4B] …</code> → <b>1 örnek = 8 bayt</b> · 1 pencere = 1024 örnek = <b>8.192 bayt</b> · 1 saniye = 32.000 örnek = <b>256 KB</b></div>';
    $('#baytKutu').innerHTML = h;
  }
  sinifSekmeleri($('#baytSinif'), baytSinif, function (s) { baytSinif = s; baytCiz(); });
  baytCiz();

  /* ---- pencere enerji şeridi ---- */
  var serSinif = 'tone', serVeri = null;
  function renkAmp(a) { // 0..2 -> açık mavi -> koyu kırmızı
    var t = Math.max(0, Math.min(1, a / 2)), r = Math.round(158 + (178 - 158) * t), g = Math.round(197 + (24 - 197) * t), b = Math.round(232 + (43 - 232) * t);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }
  function serCiz() {
    var cvs = $('#serCanvas'), k = kur(cvs); if (!k) return; var c = k.c, w = k.w, h = k.h, S = VERI.seri[serSinif], n = S.enerji.length;
    var pl = 40, pr = 8, pt = 22, pb = 26, pw = w - pl - pr, ph = h - pt - pb, mx = 0, i;
    for (i = 0; i < n; i++) mx = Math.max(mx, S.enerji[i]); mx = Math.ceil(mx * 1.08);
    c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
    c.strokeStyle = '#e6ebf1'; c.beginPath(); for (var v = 0; v <= mx; v += Math.max(1, Math.round(mx / 5))) { var y = pt + ph * (1 - v / mx); c.moveTo(pl, y); c.lineTo(pl + pw, y); } c.stroke();
    yaziAyar(c, 10, '#8896a5', 'right'); for (v = 0; v <= mx; v += Math.max(1, Math.round(mx / 5))) c.fillText(v, pl - 5, pt + ph * (1 - v / mx));
    var bw = pw / n;
    for (i = 0; i < n; i++) { var hh = ph * S.enerji[i] / mx; c.fillStyle = serSinif === 'normal' ? RENK.normal : renkAmp(S.amp[i]); c.fillRect(pl + i * bw, pt + ph - hh, Math.max(1, bw - 0.4), hh); }
    if (serSinif !== 'normal') for (i = 0; i < n; i += 25) { c.strokeStyle = 'rgba(28,39,51,.35)'; c.setLineDash([2, 3]); c.beginPath(); c.moveTo(pl + i * bw, pt - 4); c.lineTo(pl + i * bw, pt + ph); c.stroke(); c.setLineDash([]); yaziAyar(c, 10, '#33475b', 'left'); c.fillText('amp ' + fmt(S.amp[i], 1), pl + i * bw + 3, pt - 10); }
    yaziAyar(c, 10, '#8896a5', 'center'); for (i = 0; i <= n; i += 50) c.fillText(i, pl + i * bw, h - 12); c.fillText('pencere numarası →', pl + pw / 2, h - 2);
    yaziAyar(c, 10, '#8896a5', 'left'); c.fillText('enerji', 4, pt + 4);
    cvs._k = { pl: pl, bw: bw, n: n, pt: pt, ph: ph, mx: mx };
    $('#serAciklama').innerHTML = serSinif === 'normal' ? 'Normal sınıfta jammer yok: pencere enerjisi sürekli ≈ 1 civarında dalgalanır.' :
      'Her <b>25 pencerede</b> bir kaydırıcı yeni bir değere atlıyor (üstteki "amp" etiketleri). Çubuk rengi <code>jammer_amp</code>\'i (açık mavi = düşük, koyu kırmızı = yüksek), yüksekliği pencere enerjisini gösterir. Bu şerit <i>yeniden üretimdir</i>: yazar kaydırıcıyı elle oynattı; burada eşit aralıklı bir program uygulandı.';
  }
  sinifSekmeleri($('#serSinif'), serSinif, function (s) { serSinif = s; serCiz(); });
  var serCv = $('#serCanvas');
  serCv.onmousemove = function (e) {
    var k = serCv._k; if (!k) return; var r = serCv.getBoundingClientRect(), i = Math.floor((e.clientX - r.left - k.pl) / k.bw);
    if (i < 0 || i >= k.n) { ipucu(null); return; } var S = VERI.seri[serSinif];
    ipucu('Pencere <b>#' + i + '</b><br>jammer_amp: <b>' + fmt(S.amp[i], 1) + '</b><br>enerji: <b>' + fmt(S.enerji[i], 2) + '</b>', e);
  };
  serCv.onmouseleave = function () { ipucu(null); };
  kaydet(serCiz); serCiz();

  /* ---- sınıf dağılımı ---- */
  var mod = 'tum';
  function dagilim() {
    var S = mod === 'tum' ? RESMI.pencere : RESMI.set8020, tot = 0; SIN.forEach(function (s) { tot += S[s]; });
    var mx = RESMI.pencere.normal, h = '';
    SIN.forEach(function (s) {
      h += '<div class="cubuk-sat"><span style="color:' + RENK[s] + ';font-weight:700">' + s + '</span><div class="cubuk"><i style="width:' + (S[s] / mx * 100) + '%;background:' + RENK[s] + '"></i></div><span class="say">' + binlik(S[s]) + ' <span class="soluk">(%' + fmt(S[s] / tot * 100, 1) + ')</span></span></div>';
    });
    var atak = tot - S.normal;
    h += '<div class="kucuk" style="margin-top:8px"><b>Toplam ' + binlik(tot) + '</b> pencere · normal %' + fmt(S.normal / tot * 100, 0) + ' / saldırı %' + fmt(atak / tot * 100, 0) + (mod === 'tum' ? '' : ' · saldırı pencereleri normalin ¼\'üne indirildi (' + binlik(Math.floor(S.normal / 4)) + ')') + '</div>';
    $('#veriCubuk').innerHTML = h;
    var t = '<tr><th>Sınıf</th><th class="sayi">Pencere</th><th class="sayi">Örnek (×1024)</th><th class="sayi">Ham boyut</th><th class="sayi">Kayıt süresi (32 kHz)</th></tr>', tp = 0, tm = 0, td = 0;
    SIN.forEach(function (s) {
      var ornek = S[s] * 1024, mb = ornek * 8 / 1e6, dk = ornek / FS / 60; tp += S[s]; tm += mb; td += dk;
      t += '<tr><td style="color:' + RENK[s] + ';font-weight:700">' + s + '</td><td class="sayi">' + binlik(S[s]) + '</td><td class="sayi">' + binlik(ornek) + '</td><td class="sayi">' + fmt(mb, 1) + ' MB</td><td class="sayi">' + fmt(dk, 1) + ' dk</td></tr>';
    });
    t += '<tr class="vurgu"><td><b>Toplam</b></td><td class="sayi"><b>' + binlik(tp) + '</b></td><td class="sayi"><b>' + binlik(tp * 1024) + '</b></td><td class="sayi"><b>' + fmt(tm, 1) + ' MB</b></td><td class="sayi"><b>' + fmt(td, 1) + ' dk</b></td></tr>';
    $('#veriTablo').innerHTML = t;
  }
  sekmeKur($('#veriToggle'), [{ id: 'tum', ad: 'Toplanan veri (54.984)' }, { id: 'set', ad: 'Gerçekçi 80/20 değerlendirme seti (27.761)' }], 'tum', function (m) { mod = m; dagilim(); });
  dagilim();
})();
