/* ============================================================================
   uygulama_1.js : ortak yardımcılar, resmî sayılar, büyük resim, topoloji
   ========================================================================== */
var SIM = window.SIM, SIN = SIM.SINIFLAR, FS = SIM.FS;
var RENK = { normal: '#2E7D54', constant: '#C0392B', tone: '#8E44AD', sweep: '#2980B9', pulse: '#E67E22' };
var AD = { normal: 'Normal', constant: 'Constant', tone: 'Tone', sweep: 'Sweep', pulse: 'Pulse' };
var AD_UZUN = { normal: 'normal', constant: 'constant (sürekli)', tone: 'tone (tek ton)', sweep: 'sweep (tarama)', pulse: 'pulse (darbeli)' };
var KOL = VERI.kolonlar;
var IQ_I = '#1f5fa8', IQ_Q = '#d0453a';

/* ---- yazarın notebook ve raporundaki resmî sonuçlar ---- */
var RESMI = {
  pencere: { normal: 22209, constant: 8647, tone: 8535, sweep: 7771, pulse: 7822 },
  set8020: { normal: 22209, constant: 1469, tone: 1490, sweep: 1293, pulse: 1300 },
  tablo4: { // std, enerji, basiklik, zarf_std, baskin_frekans, spektral_yayilim
    normal: [1.00, 1.00, -1.34, 0.05, 32, 30.94], constant: [1.42, 2.13, -0.55, 0.12, 32, 34.29],
    tone: [1.43, 2.19, -0.92, 0.05, 91.78, 44.87], sweep: [1.39, 1.95, -0.71, 0.14, 32, 36.17],
    pulse: [1.38, 1.96, -0.37, 0.16, 32, 33.75] },
  tablo4Kol: ['std', 'enerji', 'basiklik', 'zarf_std', 'baskin_frekans', 'spektral_yayilim'],
  asama1: { iso: { dog: 95.3, yak: 95.7, ya: 4.8 }, rf: { dog: 98.8, yak: 95.1 } },
  asama2: { dog: 89.1, sinif: { constant: [0.80, 0.81, 0.80, 441], tone: [0.98, 0.99, 0.98, 447], sweep: [1.00, 1.00, 1.00, 388], pulse: [0.79, 0.76, 0.78, 390] } },
  acikPulse: { rf: { normal: 1.7, constant: 98.1, tone: 0.2, sweep: 0 }, isoYak: 98.2, isoYa: 5.3 }
};

/* ---- yardımcılar ---- */
function $(s, r) { return (r || document).querySelector(s); }
function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
function fmt(x, d) { if (d == null) d = 2; return (+x).toFixed(d).replace('.', ','); }
function binlik(n) { return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
function rgba(hex, a) { var n = parseInt(hex.slice(1), 16); return 'rgba(' + (n >> 16) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')'; }
var RENDERERS = [];
function kaydet(fn) { RENDERERS.push(fn); return fn; }

/* canvas'ı keskin ve doğru boyutta hazırlar; gizliyse null döner */
function kur(cv) {
  var w = cv.clientWidth; if (!w) return null;
  var h = parseFloat(cv.style.height) || cv.clientHeight, dpr = window.devicePixelRatio || 1;
  cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
  var c = cv.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, w, h);
  return { c: c, w: w, h: h };
}
function yaziAyar(c, boyut, renk, hiza) { c.font = boyut + 'px system-ui,Segoe UI,Arial'; c.fillStyle = renk || '#5b6b7c'; c.textAlign = hiza || 'left'; c.textBaseline = 'middle'; }

/* tooltip */
var ipucuEl = null;
function ipucu(html, ev) {
  if (!ipucuEl) ipucuEl = $('#ipucu');
  if (html == null) { ipucuEl.style.display = 'none'; return; }
  ipucuEl.innerHTML = html; ipucuEl.style.display = 'block';
  var x = ev.clientX + 14, y = ev.clientY + 14, r = ipucuEl.getBoundingClientRect();
  if (x + r.width > window.innerWidth - 8) x = ev.clientX - r.width - 14;
  if (y + r.height > window.innerHeight - 8) y = ev.clientY - r.height - 14;
  ipucuEl.style.left = x + 'px'; ipucuEl.style.top = y + 'px';
}

/* sekme grubu: secenekler [{id, ad, renk}] */
function sekmeKur(kap, secenekler, secili, cb) {
  kap.innerHTML = '';
  secenekler.forEach(function (s) {
    var b = document.createElement('button'); b.type = 'button'; b.className = 'sekme' + (s.id === secili ? ' secili' : '');
    b.innerHTML = (s.renk ? '<span class="nokta" style="background:' + s.renk + '"></span>' : '') + s.ad;
    b.onclick = function () { $$('.sekme', kap).forEach(function (x) { x.classList.remove('secili'); }); b.classList.add('secili'); cb(s.id); };
    kap.appendChild(b);
  });
}
function sinifSekmeleri(kap, secili, cb, haric) {
  sekmeKur(kap, SIN.filter(function (s) { return s !== haric; }).map(function (s) { return { id: s, ad: AD[s], renk: RENK[s] }; }), secili, cb);
}

/* I/Q zaman çizimi */
function ciziIQ(cv, x, yr, n, ayar) {
  var k = kur(cv); if (!k) return; var c = k.c, w = k.w, h = k.h; ayar = ayar || {};
  var pl = 34, pr = 6, pt = 6, pb = 16, pw = w - pl - pr, ph = h - pt - pb;
  c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
  c.strokeStyle = '#e6ebf1'; c.lineWidth = 1; c.beginPath();
  [-yr, -yr / 2, 0, yr / 2, yr].forEach(function (v) { var y = pt + ph * (1 - (v + yr) / (2 * yr)); c.moveTo(pl, y); c.lineTo(pl + pw, y); });
  c.stroke(); yaziAyar(c, 10, '#8896a5', 'right');
  [-yr, 0, yr].forEach(function (v) { c.fillText((Math.round(v * 10) / 10).toString().replace('.', ','), pl - 5, pt + ph * (1 - (v + yr) / (2 * yr))); });
  yaziAyar(c, 10, '#8896a5', 'center'); c.fillText('0', pl, h - 6); c.fillText(fmt(n / (ayar.fs || FS) * 1000, 0) + ' ms', pl + pw - 12, h - 6);
  function cizgi(arr, renk, kal) {
    c.strokeStyle = renk; c.lineWidth = kal || 1.3; c.beginPath();
    for (var i = 0; i < n; i++) { var px = pl + pw * i / (n - 1), py = pt + ph * (1 - (Math.max(-yr, Math.min(yr, arr[i])) + yr) / (2 * yr)); if (i) c.lineTo(px, py); else c.moveTo(px, py); }
    c.stroke();
  }
  if (ayar.buyukluk) { cizgi(x.i, '#1c2733', 1.8); return; }
  cizgi(x.i, IQ_I); if (!ayar.sadeceI) cizgi(x.q, IQ_Q);
  if (ayar.ekstra) cizgi(ayar.ekstra, '#1c2733', 1.9);
}

/* ================================================================= ROZET / HERO */
(function hero() {
  var yol = $('#heroDalga'), jam = $('#heroJam'), btn = $('#heroJamBtn'), acik = false, zaman = null, t0 = 0;
  function ciz() {
    var d = '', X0 = 126, X1 = 770, n = 220;
    for (var i = 0; i <= n; i++) {
      var x = X0 + (X1 - X0) * i / n, ph = 2 * Math.PI * 5 * i / n;
      var y = 95 - 18 * Math.sin(ph) + (acik ? (Math.random() - 0.5) * 46 : 0);
      d += (i ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1);
    }
    yol.setAttribute('d', d);
  }
  ciz();
  btn.onclick = function () {
    acik = !acik; jam.style.opacity = acik ? 1 : 0.25; btn.textContent = acik ? "Jammer'ı kapat" : "Jammer'ı aç";
    if (acik) zaman = setInterval(ciz, 130); else { clearInterval(zaman); ciz(); }
  };
})();

/* ================================================================= 2. BÜYÜK RESİM */
(function buyukResim() {
  var toplamPen = 0; SIN.forEach(function (s) { toplamPen += RESMI.pencere[s]; });
  var ornek = toplamPen * 1024, mb = ornek * 8 / 1e6, dk = ornek / FS / 60;
  var ADIM = [
    { n: 1, ad: 'GNU Radio topolojisi', girdi: 'Parametreler: örnekleme 32 kHz, meşru 1 kHz kosinüs, ortam gürültüsü 0,3, jammer_amp 0–2 kaydırıcısı.',
      islem: 'Signal / Noise Source, Multiply, VCO, Add ve Channel Model blokları bağlanır. Her sınıfın kendi şeması vardır.',
      cikti: 'Sürekli bir complex (I/Q) örnek akışı, 32.000 örnek/sn.', dosya: 'gnuradio/1_normal.grc … 5_pulse.grc' },
    { n: 2, ad: 'Kayıt (.dat)', girdi: 'Channel Model sonrası akış (Throttle üzerinden).',
      islem: 'File Sink örnekleri olduğu gibi diske yazar: örnek başına 8 bayt (I: float32, Q: float32). Başlık ve etiket yok; etiket dosya adındadır.',
      cikti: 'Sınıf başına bir ikili dosya. Toplamda ≈ ' + fmt(mb, 0) + ' MB, ≈ ' + fmt(dk, 0) + ' dakikalık kayıt.', dosya: 'normal.dat, constant.dat, tone.dat, sweep.dat, pulse.dat (Kaggle veri setinde)' },
    { n: 3, ad: 'Pencereleme', girdi: 'Her .dat dosyası (complex64).',
      islem: 'Kayıt 1024 örneklik, üst üste binmeyen pencerelere bölünür (32 ms). Artakalan örnekler atılır.',
      cikti: binlik(toplamPen) + ' pencere: normal ' + binlik(RESMI.pencere.normal) + ', constant ' + binlik(RESMI.pencere.constant) + ', tone ' + binlik(RESMI.pencere.tone) + ', sweep ' + binlik(RESMI.pencere.sweep) + ', pulse ' + binlik(RESMI.pencere.pulse) + '.', dosya: 'notebooks/jamming_tespiti.ipynb (hücre 1)' },
    { n: 4, ad: 'Öznitelik çıkarma', girdi: 'Bir pencere: 1024 complex örnek (yalnızca gerçel kısmı kullanılır).',
      islem: '10 öznitelik: ortalama, std, max, enerji, basıklık, çarpıklık, sıfır geçiş, zarf std, baskın frekans, spektral yayılım.',
      cikti: 'Tablo: ' + binlik(toplamPen) + ' satır × 10 sütun + etiket (jamming_veri_seti_v2.csv).', dosya: 'feat() fonksiyonu, notebook hücre 1' },
    { n: 5, ad: 'Aşama 1: saldırı var mı?', girdi: '10 öznitelikli satır.',
      islem: 'Isolation Forest (yalnızca normalle eğitilmiş) normalden sapanı "saldırı" işaretler. Karşılaştırma için denetimli ikili Random Forest.',
      cikti: 'Normal / Saldırı. Anomali tespiti: %95,7 yakalama, %4,8 yanlış alarm.', dosya: 'notebook hücre 5' },
    { n: 6, ad: 'Aşama 2: hangi tür?', girdi: 'Aşama 1\'in "saldırı" dediği satırlar.',
      islem: 'Dört saldırı sınıfıyla eğitilmiş Random Forest.',
      cikti: 'constant / tone / sweep / pulse. Doğruluk %89,1.', dosya: 'notebook hücre 5' },
    { n: 7, ad: 'Açık-küme testi', girdi: 'Eğitimden tamamen saklanmış bir saldırı türü (pulse).',
      islem: 'Denetimli model ve anomali tespiti bu bilinmeyen türe karşı denenir.',
      cikti: 'Denetimli RF: %98,1 constant sandı. Anomali tespiti: %98,2 saldırı olarak yakaladı.', dosya: 'notebook hücre 7' }
  ];
  var kap = $('#adimlar'), det = $('#adimDetay');
  function goster(i) {
    var a = ADIM[i];
    $$('.adim', kap).forEach(function (e, k) { e.classList.toggle('secili', k === i); });
    det.innerHTML = '<h3 style="margin-top:0">' + a.n + ' · ' + a.ad + '</h3><div class="adim-detay">' +
      '<div><h4>Girdi</h4><p class="kucuk">' + a.girdi + '</p></div><div><h4>Ne yapılır</h4><p class="kucuk">' + a.islem + '</p></div><div><h4>Çıktı</h4><p class="kucuk">' + a.cikti + '</p></div></div>' +
      '<div class="kucuk soluk">Nerede: <code>' + a.dosya + '</code></div>';
  }
  ADIM.forEach(function (a, i) {
    var d = document.createElement('div'); d.className = 'adim'; d.innerHTML = '<span class="n">' + a.n + '</span>' + a.ad; d.onclick = function () { goster(i); }; kap.appendChild(d);
  });
  goster(0);
})();

/* ================================================================= 3. TOPOLOJİ */
var TOPO = (function () {
  var secSinif = 'constant', secBlok = 'add';
  var akis = true;

  function blokTanimlari(s) {
    var gate = s === 'constant' ? ['Waveform: Square', 'Frequency: 100 Hz', 'Amplitude: 0', 'Offset: 1', 'Output: complex'] : ['Waveform: Square', 'Frequency: 100 Hz', 'Amplitude: 0.5', 'Offset: 0.5', 'Output: complex'];
    var B = {
      legit: { x: 20, y: 24, w: 210, h: 96, b: 'Signal Source', p: ['Waveform: Cosine', 'Frequency: 1 kHz', 'Amplitude: 1', 'Output: complex'], out: 'c' },
      ortam: { x: 20, y: 134, w: 210, h: 90, b: 'Noise Source', p: ['Noise: Gaussian', 'Amplitude: 0.3', 'Seed: 0', 'Output: complex'], out: 'c' },
      add: { x: 470, y: 130, w: 90, h: 220, b: 'Add', p: ['3 giriş', 'complex'], out: 'c', nin: 3, inY: [180, 240, 300] },
      chan: { x: 600, y: 190, w: 170, h: 112, b: 'Channel Model', p: ['Taps: 1, 0.3+0.3j', 'Noise Voltage: 0', 'Freq Offset: 0', 'Epsilon: 1', 'Seed: 0'], out: 'c', nin: 1, inY: [246] },
      thr: { x: 795, y: 206, w: 100, h: 80, b: 'Throttle', p: ['Rate: 32k', 'Limit: auto'], out: 'c', nin: 1, inY: [246] },
      sink_file: { x: 912, y: 150, w: 122, h: 92, b: 'File Sink', p: [s + '.dat', 'complex64', 'Overwrite'], nin: 1, inY: [196] },
      sink_qt: { x: 912, y: 268, w: 122, h: 92, b: 'QT GUI Time Sink', p: ['Points: 1.024k', 'Rate: 32k'], nin: 1, inY: [314] },
      amp: { x: 20, y: 468, w: 220, h: 72, b: 'QT GUI Range', p: ['ID: jammer_amp', '0 … 2, adım 0.1', 'Varsayılan: 1'], degisken: true },
      samp: { x: 520, y: 478, w: 170, h: 52, b: 'Variable', p: ['samp_rate = 32k'], degisken: true }
    };
    if (s === 'constant' || s === 'pulse' || s === 'normal') {
      B.j_gate = { x: 20, y: 236, w: 210, h: 100, b: 'Signal Source', p: gate, out: 'c', degisen: true };
      B.j_noise = { x: 20, y: 350, w: 210, h: 90, b: 'Noise Source', p: ['Noise: Gaussian', 'Amplitude: ' + (s === 'normal' ? '0' : 'jammer_amp'), 'Seed: 0', 'Output: complex'], out: 'c', degisen: true };
      B.j_mult = { x: 290, y: 292, w: 110, h: 100, b: 'Multiply', p: ['2 giriş', 'complex'], out: 'c', nin: 2, inY: [322, 362], degisen: true };
    } else if (s === 'tone') {
      B.j_tone = { x: 20, y: 300, w: 210, h: 100, b: 'Signal Source', p: ['Waveform: Cosine', 'Frequency: 5 kHz', 'Amplitude: jammer_amp', 'Output: complex'], out: 'c', degisen: true };
    } else if (s === 'sweep') {
      B.j_saw = { x: 20, y: 300, w: 210, h: 100, b: 'Signal Source', p: ['Waveform: Saw Tooth', 'Frequency: 50 Hz', 'Amplitude: 1', 'Output: float'], out: 'f', degisen: true };
      B.j_vco = { x: 290, y: 300, w: 150, h: 100, b: 'VCO', p: ['Sensitivity: 60000', 'Amplitude: jammer_amp', 'Rate: 32k', 'Output: complex'], out: 'c', nin: 1, inY: [350], inTip: 'f', degisen: true };
    }
    return B;
  }
  function kenarlar(s) {
    var K = [['legit', 'add', 0, 'c'], ['ortam', 'add', 1, 'c'], ['add', 'chan', 0, 'c'], ['chan', 'thr', 0, 'c'], ['thr', 'sink_file', 0, 'c'], ['thr', 'sink_qt', 0, 'c']];
    if (s === 'constant' || s === 'pulse' || s === 'normal') { K.push(['j_gate', 'j_mult', 0, 'c'], ['j_noise', 'j_mult', 1, 'c'], ['j_mult', 'add', 2, 'c']); }
    else if (s === 'tone') K.push(['j_tone', 'add', 2, 'c']);
    else { K.push(['j_saw', 'j_vco', 0, 'f'], ['j_vco', 'add', 2, 'c']); }
    return K;
  }
  function outXY(b) { return [b.x + b.w, b.y + b.h / 2 + (b.cikisDy || 0)]; }
  function inXY(b, i) { return [b.x, b.inY ? b.inY[i] : b.y + b.h / 2]; }

  function ciz() {
    var B = blokTanimlari(secSinif), K = kenarlar(secSinif), svg = $('#topoSvg'), h = '';
    /* jammer_amp kesikli bağlantılar */
    var ampHedef = [];
    if (secSinif === 'constant' || secSinif === 'pulse') ampHedef.push(['amp', 'j_noise', 'alt']);
    if (secSinif === 'tone') ampHedef.push(['amp', 'j_tone', 'alt']);
    if (secSinif === 'sweep') ampHedef.push(['amp', 'j_vco', 'alt']);
    ampHedef.forEach(function (a) {
      var A = B[a[0]], T = B[a[1]], x1 = A.x + A.w / 2, y1 = A.y, x2 = T.x + T.w / 2, y2 = T.y + T.h;
      if (a[1] === 'j_vco') { x1 = A.x + A.w; y1 = A.y + A.h / 2; h += '<path class="kenar d" d="M' + x1 + ',' + y1 + ' H' + (T.x + T.w / 2) + ' V' + y2 + '"/>'; }
      else h += '<path class="kenar d" d="M' + x1 + ',' + y1 + ' V' + y2 + '"/>';
    });
    /* kenarlar */
    K.forEach(function (k) {
      var A = B[k[0]], T = B[k[1]], p1 = outXY(A), p2 = inXY(T, k[2]), dx = Math.max(30, (p2[0] - p1[0]) / 2);
      var sinif = 'kenar' + (k[3] === 'f' ? ' f' : '') + (akis ? ' akis' : '');
      h += '<path class="' + sinif + '" d="M' + p1[0] + ',' + p1[1] + ' C' + (p1[0] + dx) + ',' + p1[1] + ' ' + (p2[0] - dx) + ',' + p2[1] + ' ' + p2[0] + ',' + p2[1] + '"/>';
    });
    /* bloklar */
    Object.keys(B).forEach(function (id) {
      var b = B[id], cl = 'blok' + (b.degisen ? ' degisen' : '') + (b.degisken ? ' degisken' : '') + (id === secBlok ? ' secili' : '');
      h += '<g class="' + cl + '" data-id="' + id + '"><rect class="govde" x="' + b.x + '" y="' + b.y + '" width="' + b.w + '" height="' + b.h + '" rx="7"/>';
      h += '<text class="bas" x="' + (b.x + 10) + '" y="' + (b.y + 18) + '">' + b.b + '</text>';
      b.p.forEach(function (t, i) { h += '<text class="par" x="' + (b.x + 10) + '" y="' + (b.y + 36 + i * 15) + '">' + t.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</text>'; });
      if (b.out) { var o = outXY(b); h += '<rect class="port ' + b.out + '" x="' + (o[0] - 1) + '" y="' + (o[1] - 5) + '" width="9" height="10" rx="2"/>'; }
      if (b.nin) for (var i = 0; i < b.nin; i++) { var q = inXY(b, i); h += '<rect class="port ' + (b.inTip || 'c') + '" x="' + (q[0] - 8) + '" y="' + (q[1] - 5) + '" width="9" height="10" rx="2"/>'; }
      h += '</g>';
    });
    /* etiketler */
    h += '<text x="20" y="18" font-size="11" fill="#7b8a99">Kaynaklar</text><text x="470" y="118" font-size="11" fill="#7b8a99">Toplama</text><text x="600" y="180" font-size="11" fill="#7b8a99">Kanal</text><text x="912" y="140" font-size="11" fill="#7b8a99">Çıkış</text>';
    h += '<text x="20" y="' + (secSinif === 'tone' ? 290 : 230) + '" font-size="11" fill="#b4630a" font-weight="700">Jammer kolu (' + secSinif + ')</text>';
    svg.innerHTML = h;
    $$('.blok', svg).forEach(function (g) { g.onclick = function () { secBlok = g.getAttribute('data-id'); ciz(); bilgi(); }; });
  }

  /* ---- bilgi kartı metinleri ---- */
  function bilgiMetni(id, s) {
    var kon = {
      legit: ['Meşru sinyal', 'Haberleşen cihazı temsil eder: 32 kHz örnekleme hızında 1 kHz\'lik, genliği 1 olan <b>kosinüs</b>. Tipi <i>complex</i> olduğu için çıktısı sabit genlikli dönen bir vektördür (I = cos, Q = sin).', 'Bu sinyalin "olması gereken" hâli. Jammer bunu bozmaya çalışır.'],
      ortam: ['Ortam gürültüsü', 'Her gerçek kanalda bulunan doğal arka plan gürültüsü: <b>Gauss dağılımlı</b>, genlik 0,3 (toplam güç 0,09).', 'Normal sınıfın "temiz" olmadığını, hafifçe gürültülü olduğunu sağlar. Seed 0 olduğu için tekrarlanabilirdir.'],
      add: ['Add (toplama)', 'Üç girişi sample sample toplar: meşru sinyal + ortam gürültüsü + jammer. Radyo ortamında alıcı antenin gördüğü şey de bu toplamdır.', 'Burası "alıcı antenine ulaşan" sinyalin oluştuğu yerdir. Normal sınıfta üçüncü giriş fiilen sıfırdır.'],
      chan: ['Channel Model', '<b>Çok yollu yayılımı</b> taklit eder. Taps <code>[1, 0.3+0.3j]</code>: sinyal hem doğrudan gelir hem bir örnek gecikmiş, 0,3 + 0,3j kadar zayıflamış ve faz kaymış bir yansıma ile toplanır. Gürültü voltajı 0 ve frekans ofseti 0 olduğundan yalnızca bu yansıma etkilidir.', 'Veriyi "fazla temiz" olmaktan çıkarıp gerçekçi yapar; yazarın raporuna göre kanal modeli olmayan veride model ezberleyip %100 veriyordu.'],
      thr: ['Throttle', 'Gerçek donanım olmadığı için akışı saniyede 32.000 örnek hızına sınırlar. Veriyi değiştirmez.', 'Olmasa bilgisayar akışı mümkün olan en hızlı şekilde üretir; kayıtta ve ekranda görüntü için hız kontrolü gerekir.'],
      sink_file: ['File Sink', 'Gelen örnekleri <b>olduğu gibi</b> <code>' + s + '.dat</code> dosyasına yazar: örnek başına 4 bayt I + 4 bayt Q (float32). Dosya başlığı ya da etiketi yoktur.', 'Makine öğrenmesi verisinin kaynağı. Etiket, dosyanın <i>adından</i> gelir.'],
      sink_qt: ['QT GUI Time Sink', 'Sinyali ekranda zaman alanında gösterir (mavi I, kırmızı Q) ve <code>jammer_amp</code> kaydırıcısını barındırır. Veriyi etkilemez; yalnızca izlemek içindir.', 'Kayıt sırasında kaydırıcıyla jammer gücünü değiştirip sonucu gözle görmeyi sağlar.'],
      amp: ['jammer_amp (QT GUI Range)', 'Jammer'+"'"+'ın gücünü belirleyen kaydırıcı: 0 ile 2 arası, 0,1 adımlı. Kayıt sırasında <b>elle</b> oynatılır.', 'Rapora göre sabit tek güçle kayıt yapınca model ezberleyip gerçekçi olmayan %100 doğruluk veriyordu. Güç çeşitliliği bu yüzden eklendi.'],
      samp: ['samp_rate', 'Tüm bloklar için ortak örnekleme hızı değişkeni: 32.000 Hz.', 'Bir 1024\'lük pencere 32 ms\'dir; frekans çözünürlüğü 31,25 Hz/bin\'dir.']
    };
    if (kon[id]) return kon[id];
    var j = {
      j_noise: [s === 'normal' ? 'Jammer gürültüsü (genlik 0)' : 'Jammer gürültüsü', s === 'normal' ? 'Normal sınıfta genlik <b>0</b>: jammer kolu devre dışıdır, jammer hiçbir şey üretmez.' : 'Gauss gürültü kaynağı; genliği <code>jammer_amp</code> kaydırıcısına bağlıdır. <b>Seed 0</b>, yani ortam gürültüsüyle <b>aynı rastgele diziyi</b> üretir (bkz. bölüm 11, bulgu 2).', 'Gürültü tabanlı jammer\'ların (constant ve pulse) ham maddesidir.'],
      j_gate: [s === 'constant' ? 'Kapı: sabit 1' : 'Kapı: Square dalga', s === 'constant' ? 'Genlik 0, offset 1: çıktı her zaman <b>1</b>. Yani gürültü sürekli geçer (kapı hep açık). İşte bu yüzden sınıf "sürekli".' : '100 Hz\'lik complex Square dalga, genlik 0,5, offset 0,5. <b>Dikkat:</b> offset yalnızca gerçel kısma eklenir. Gerçel kısım 0,5 ↔ 1,0, sanal kısım 0 ↔ 0,5 arasında gider; kapının büyüklüğü hiç 0 olmaz (0,5…1,118). Yani gürültü <i>tamamen kapanmaz</i>.', s === 'constant' ? 'Constant ile pulse aynı topolojiyi paylaşır; tek fark bu kaynağın parametresidir.' : 'Pulse\'u "açık/kapalı" bir darbe olarak tasarlamıştır ama bu yapıyla düşük derinlikli bir genlik kipine dönüşür.'],
      j_mult: ['Multiply (kapılama)', 'Gürültüyü kapıyla çarpar: <code>jammer = gürültü × kapı</code>. Kapı 1 ise gürültü aynen geçer; 0,5 ise yarı genlikle geçer.', 'Constant ve pulse sınıflarını birbirinden ayıran blok budur.'],
      j_tone: ['Ton jammer', '5 kHz\'lik tek frekanslı complex kosinüs; genliği <code>jammer_amp</code>. Meşru sinyalin 1 kHz\'inden 5 kat yukarıda, <b>dar bantlı</b> bir girişim.', 'Spektrumda 5 kHz\'te keskin bir tepe oluşturur; bu yüzden <code>baskin_frekans</code> ve <code>spektral_yayilim</code> ile kolayca ayrılır.'],
      j_saw: ['Testere dalga (Saw Tooth)', '50 Hz\'lik testere, 0 → 1 arasında yükselir ve sıfırlanır (periyot 20 ms). <b>float</b> tipindedir (turuncu port).', 'VCO\'nun kontrol girişidir: testere ne kadar yüksekse VCO o kadar yüksek frekans üretir.'],
      j_vco: ['VCO (gerilim kontrollü osilatör)', 'Girişine (testere) göre frekans üretir. Hassasiyet 60000 rad/s: anlık frekans <code>60000·x/2π</code> ≈ <b>0…9,55 kHz</b>. Her 20 ms\'de frekans aşağıdan yukarıya <b>süpürülür (chirp)</b>. Genliği <code>jammer_amp</code>.', 'Tarayan (sweep) jammer: tek bir frekansta kalmaz, bandın tamamını tarar.']
    };
    return j[id] || [id, '', ''];
  }
  var ASAMA_ESLE = { legit: 'yasal', ortam: 'ortam', j_mult: 'jam', j_tone: 'jam', j_vco: 'jam', add: 'toplam', chan: 'kanal', thr: 'kanal', sink_file: 'kanal', sink_qt: 'kanal' };

  function iqDizi(a) { return { i: Float64Array.from(a.i), q: Float64Array.from(a.q) }; }
  function bilgi() {
    var B = blokTanimlari(secSinif), b = B[secBlok]; if (!b) { secBlok = 'add'; b = B.add; }
    var m = bilgiMetni(secBlok, secSinif), kart = $('#topoBilgi');
    var par = b.p.map(function (t) { var i = t.indexOf(':'); return i > 0 ? '<tr><td>' + t.slice(0, i) + '</td><td>' + t.slice(i + 1).trim() + '</td></tr>' : '<tr><td colspan="2">' + t + '</td></tr>'; }).join('');
    kart.innerHTML = '<h3 style="margin-top:0">' + m[0] + '</h3><p>' + m[1] + '</p><table class="pktablo">' + par + '</table>' + (m[2] ? '<div class="not kucuk" style="margin-bottom:0"><b>Neden var?</b> ' + m[2] + '</div>' : '');
    grafik();
  }
  function grafik() {
    var kap = $('#topoGrafik'), id = secBlok, s = secSinif, st = ASAMA_ESLE[id], B = blokTanimlari(s), b = B[id], rozet, veri = null, baslik, notu = '';
    kap.innerHTML = '<h4 style="margin-top:0" id="tgBaslik"></h4><canvas id="tgCv" style="height:190px"></canvas><div class="kucuk soluk" id="tgNot"></div>';
    var yr = 1.5;
    if (id === 'amp' || id === 'samp') {
      $('#tgBaslik').textContent = 'Değişken (sinyal üretmez)';
      $('#tgCv').outerHTML = '<div class="kucuk soluk" style="padding:30px 6px">Bu blok bir <b>değişkendir</b>; sinyal akışının parçası değildir. Diğer blokların parametrelerine değer sağlar.</div>'; $('#tgNot').textContent = ''; return;
    }
    if (st && ASAMA[s] && (ASAMA[s][st] || (st === 'jam' && s === 'normal'))) {
      var a = ASAMA[s][st]; veri = a ? { i: Float64Array.from(a.i), q: Float64Array.from(a.q) } : { i: new Float64Array(1024), q: new Float64Array(1024) };
      rozet = '<span class="rozet gr">GNU Radio çıktısı</span>'; notu = 'Gerçek GNU Radio ile çalıştırılan ' + s + ' topolojisinden, jammer_amp = 1 için bu bloğun çıkışı.';
    } else {
      var r = SIM.simule(s === 'normal' && id === 'j_gate' ? 'pulse' : s, 1, { seed: 3, n0: 4096 });
      if (id === 'j_noise') { veri = r.jamGurultu || { i: new Float64Array(1024), q: new Float64Array(1024) }; notu = 'Jammer gürültüsü (genlik jammer_amp = 1).'; }
      else if (id === 'j_gate') { veri = r.kapi; notu = 'Kapı sinyali: I = gerçel kısım, Q = sanal kısım. Kalın siyah çizgi büyüklüktür |kapı|.'; }
      else if (id === 'j_saw') { var n = 1024, sw = new Float64Array(n), z = new Float64Array(n); for (var k = 0; k < n; k++) sw[k] = (0.5 + (4096 + k) * 50 / FS) % 1; veri = { i: sw, q: z }; notu = 'Testere dalga (0…1). Mavi: değer (float).'; }
      rozet = '<span class="rozet model">tarayıcı modeli</span>';
    }
    $('#tgBaslik').innerHTML = 'Bu bloğun çıkışı ' + rozet;
    if (!veri) { $('#tgNot').textContent = ''; return; }
    var mx = 0; for (var q = 0; q < 256; q++) mx = Math.max(mx, Math.abs(veri.i[q]), Math.abs(veri.q[q]));
    yr = Math.max(1.2, Math.ceil(mx * 1.1 * 2) / 2);
    var ay = {};
    if (id === 'j_gate') { ay.ekstra = Float64Array.from(veri.i, function (v, k) { return Math.hypot(v, veri.q[k]); }); }
    ciziIQ($('#tgCv'), veri, yr, 256, ay);
    var P = 0; for (var u = 0; u < 1024; u++) P += veri.i[u] * veri.i[u] + veri.q[u] * veri.q[u]; P /= 1024;
    $('#tgNot').innerHTML = notu + ' Ortalama güç: <b>' + fmt(P, 2) + '</b>. <span class="soluk">İlk 256 örnek (8 ms), mavi I, kırmızı Q.</span>';
  }

  function baslat() {
    sinifSekmeleri($('#topoSekmeler'), secSinif, function (s) { secSinif = s; var B = blokTanimlari(s); if (!B[secBlok]) secBlok = 'add'; ciz(); bilgi(); });
    $('#topoAkis').onchange = function () { akis = this.checked; ciz(); };
    ciz(); bilgi();
  }
  kaydet(function () { grafik(); });
  baslat();
  return { sec: function (s) { secSinif = s; } };
})();
