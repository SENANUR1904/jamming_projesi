/* literatür raporu etkileşimleri: DATA, BIZ, G6, KESISIM, ONCELIK rapor.html içinde tanımlıdır */
(function () {
  'use strict';
  function $(s, r) { return (r || document).querySelector(s); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var KIS = { sabit_gurultu: 'sab', ton: 'ton', sweep_chirp: 'swp', darbeli: 'drb', reaktif: 'rea', akilli_adaptif: 'akl', dar_bant: 'dar', genis_bant: 'gen', diger: 'diğ' };
  var TUR_AD = { derleme: 'derleme', yontem: 'yöntem', veri_seti: 'veri seti', savunma: 'savunma', simulator: 'simülatör', temel_kuram: 'temel kuram', diger: 'diğer' };
  var VK_AD = { gercek_olcum: 'gerçek ölçüm', simulasyon: 'simülasyon', sdr_donanim: 'SDR donanım', hibrit: 'hibrit', yok: '—', belirtilmemis: 'belirtilmemiş' };
  var SIG_AD = { iq: 'I/Q', gnss_iq: 'GNSS I/Q', spektrogram: 'spektrogram', paket_rssi_pdr: 'paket/RSSI', ozellik_vektoru: 'öznitelik', diger: 'diğer' };

  function kisalt(s, n) { s = String(s || ''); return s.length > n ? s.slice(0, n - 1) + '…' : s; }
  function hamIQ(o) { return o.sinyal.indexOf('iq') >= 0 || o.sinyal.indexOf('gnss_iq') >= 0; }
  function g6var(o) { return o.alti_g_ozellikleri.some(function (x) { return x !== 'yok'; }); }
  function puan(n) { var h = '<span class="puan" title="' + n + '/5">'; for (var i = 1; i <= 5; i++) h += '<i class="' + (i <= n ? 'd' : '') + '"></i>'; return h + '</span>'; }
  function akEt(v) { return v === 'evet' ? '<span class="etiket e-ok">evet</span>' : (v === 'kismi' ? '<span class="etiket e-orta">kısmi</span>' : '<span class="etiket e-gri">hayır</span>'); }

  /* ---------------- ana karşılaştırma tablosu ---------------- */
  var ALL = BIZ.concat(DATA), sirala = { alan: 'biz_yakinlik', yon: -1 }, acik = {};
  var turSel = $('#fTur');
  Object.keys(TUR_AD).forEach(function (t) { var o = document.createElement('option'); o.value = t; o.textContent = TUR_AD[t]; turSel.appendChild(o); });

  function satirHTML(o, i) {
    var biz = o.biz ? (o.biz === 'mevcut' ? ' biz' : ' biz2') : '';
    var jam = o.jammer_turleri.map(function (j) { return '<span class="etiket e-gri">' + (KIS[j] || j) + '</span>'; }).join('');
    var g6 = o.alti_g_ozellikleri.filter(function (x) { return x !== 'yok'; }).map(function (x) { return '<span class="etiket e-mor">' + x.replace('thz_mmwave', 'THz/mmW').replace('mimo_pilot', 'MIMO').replace('ai_yerel', 'AI-RAN').toUpperCase() + '</span>'; }).join('');
    var h = '<tr class="tik' + biz + '" data-i="' + i + '"><td class="k"><b>' + esc(o.kisa) + '</b><br><span class="soluk kucuk">' + (TUR_AD[o.tur] || o.tur) + '</span></td><td class="kucuk">' + (VK_AD[o.veri_kaynagi] || o.veri_kaynagi) + '<br><span class="soluk">' + o.sinyal.map(function (s) { return SIG_AD[s] || s; }).join(', ') + '</span></td><td>' + (jam || '—') + '</td><td class="kucuk">' + esc(kisalt(o.yontem, 120)) + '</td><td>' + akEt(o.acik_kume) + '</td><td>' + (g6 || '—') + '</td><td class="kucuk">' + (o.gnu_radio_sdr === 'evet' ? 'GR/SDR ✓<br>' : '') + (o.acik_veri_veya_kod === 'evet' ? 'veri/kod ✓' : '') + '</td><td>' + puan(o.biz_yakinlik) + '</td></tr>';
    if (acik[o.kisa + o.yil + o.baslik]) h += '<tr class="detay"><td colspan="8"><b>' + esc(o.baslik) + '</b><br><b>Ana sonuç:</b> ' + esc(o.ana_sonuc) + '<br><b>Sınırlılık:</b> ' + esc(o.sinirlilik) + '<br><span class="soluk">Klasör: ' + esc(o.klasor) + ' · okuma: ' + o.okuma + ' · güven: ' + o.guven + '</span></td></tr>';
    return h;
  }
  function ciz() {
    var q = $('#fAra').value.toLowerCase(), tur = turSel.value, yak = +$('#fYak').value, iq = $('#fIQ').checked, ak = $('#fAK').checked, g6 = $('#f6G').checked, gr = $('#fGR').checked, vr = $('#fVeri').checked, jm = $('#fJam').checked;
    var L = ALL.filter(function (o) {
      if (o.biz) return true;
      if (tur && o.tur !== tur) return false;
      if (o.biz_yakinlik < yak) return false;
      if (iq && !hamIQ(o)) return false; if (ak && o.acik_kume === 'hayir') return false; if (g6 && !g6var(o)) return false;
      if (gr && o.gnu_radio_sdr !== 'evet') return false; if (vr && o.acik_veri_veya_kod !== 'evet') return false; if (jm && !o.jammer_turleri.length) return false;
      if (q && (o.kisa + ' ' + o.baslik + ' ' + o.yontem + ' ' + o.ana_sonuc + ' ' + o.problem).toLowerCase().indexOf(q) < 0) return false;
      return true;
    });
    var bizler = L.filter(function (o) { return o.biz; }), digerleri = L.filter(function (o) { return !o.biz; });
    var f = sirala.alan, y = sirala.yon;
    digerleri.sort(function (a, b) { var A = a[f], B = b[f]; if (Array.isArray(A)) { A = A.length; B = B.length; } if (typeof A === 'string') return y * A.localeCompare(B); if (A === B) return b.yil - a.yil; return y * (A - B); });
    L = bizler.concat(digerleri);
    var hd = [['kisa', 'Çalışma'], ['veri_kaynagi', 'Veri / sinyal'], ['jammer_turleri', 'Jammer türleri'], ['yontem', 'Yöntem'], ['acik_kume', 'Açık-küme'], ['alti_g_ozellikleri', '6G'], ['gnu_radio_sdr', 'GR · açık'], ['biz_yakinlik', 'Yakınlık']];
    var t = '<tr>' + hd.map(function (h) { return '<th class="k" data-f="' + h[0] + '" style="cursor:pointer">' + h[1] + (sirala.alan === h[0] ? (sirala.yon > 0 ? ' ▲' : ' ▼') : '') + '</th>'; }).join('') + '</tr>';
    L.forEach(function (o, i) { t += satirHTML(o, i); });
    $('#anaTablo').innerHTML = t;
    $('#fSay').textContent = digerleri.length + ' / ' + DATA.length + ' çalışma gösteriliyor';
    Array.prototype.forEach.call(document.querySelectorAll('#anaTablo th[data-f]'), function (th) {
      th.onclick = function () { var f2 = th.getAttribute('data-f'); if (sirala.alan === f2) sirala.yon *= -1; else { sirala.alan = f2; sirala.yon = (f2 === 'kisa' || f2 === 'tur') ? 1 : -1; } ciz(); };
    });
    Array.prototype.forEach.call(document.querySelectorAll('#anaTablo tr.tik'), function (tr) {
      tr.onclick = function () { var o = L[+tr.getAttribute('data-i')], k = o.kisa + o.yil + o.baslik; acik[k] = !acik[k]; ciz(); };
    });
  }
  ['fAra', 'fTur', 'fIQ', 'fAK', 'f6G', 'fGR', 'fVeri', 'fJam', 'fYak'].forEach(function (id) { var e = $('#' + id); e.oninput = ciz; e.onchange = ciz; });
  ciz();

  /* ---------------- kesişim tablosu ---------------- */
  (function () {
    var t = '<tr><th>Kombinasyon</th><th class="sayi">Çalışma sayısı</th><th>Çalışmalar</th></tr>';
    KESISIM.forEach(function (k, i) {
      var isim = k.isimler.length > 14 ? k.isimler.slice(0, 14).join(', ') + ' … (+' + (k.isimler.length - 14) + ')' : k.isimler.join(', ');
      t += '<tr class="' + (k.vurgu ? 'vurgu' : '') + '"><td>' + esc(k.ad) + '</td><td class="sayi"><b>' + k.say + '</b></td><td class="kucuk">' + esc(isim || '—') + '</td></tr>';
    });
    $('#kesisim').innerHTML = t;
  })();

  /* ---------------- 6G tablosu ---------------- */
  var g6acik = {};
  function g6ciz() {
    var q = ($('#gAra').value || '').toLowerCase();
    var t = '<tr><th>#</th><th>Saldırı (satıra tıklayın)</th><th>Literatür</th><th>Sim. zorluğu</th><th>Öncelik</th></tr>';
    G6.forEach(function (g, i) {
      var txt = (g.baslik + ' ' + g.tanim + ' ' + g.alti_g_ozgulugu + ' ' + g.fiziksel_imza + ' ' + g.simulasyon_araclari).toLowerCase();
      if (q && txt.indexOf(q) < 0) return;
      var oz = ONCELIK[i] || { p: 'C', n: '' };
      var pc = oz.p === 'A' ? 'e-ok' : (oz.p === 'B' ? 'e-orta' : 'e-gri');
      var zc = g.simulasyon_zorlugu === 'dusuk' ? 'e-ok' : (g.simulasyon_zorlugu === 'orta' ? 'e-orta' : 'e-yok');
      var dc = g.literatur_doluluk === 'seyrek' || g.literatur_doluluk === 'bulunamadi' ? 'e-ok' : (g.literatur_doluluk === 'orta' ? 'e-orta' : 'e-yok');
      t += '<tr class="tik" data-i="' + i + '"><td>' + (i + 1) + '</td><td><b>' + esc(kisalt(g.baslik, 110)) + '</b><div class="kucuk soluk">' + esc(oz.n) + '</div></td><td><span class="etiket ' + dc + '">' + g.literatur_doluluk + '</span></td><td><span class="etiket ' + zc + '">' + g.simulasyon_zorlugu + '</span></td><td><span class="etiket ' + pc + '">' + oz.p + '</span></td></tr>';
      if (g6acik[i]) {
        var kay = (g.temel_kaynaklar || []).map(function (k) { return '<li>' + (k.url ? '<a href="' + esc(k.url) + '" target="_blank" rel="noopener">' + esc(k.kunye) + '</a>' : esc(k.kunye)) + '</li>'; }).join('');
        t += '<tr class="detay"><td></td><td colspan="4"><p><b>Tanım:</b> ' + esc(g.tanim) + '</p><p><b>Neden 6G özgü:</b> ' + esc(g.alti_g_ozgulugu) + '</p><p><b>Dedektörün göreceği (fiziksel imza):</b> ' + esc(g.fiziksel_imza) + '</p><p><b>Simülasyon yolu:</b> ' + esc(g.simulasyon_araclari) + '</p><p><b>Temel kaynaklar</b> <span class="soluk">(künye sonundaki [A]/[O]/[S] doğrulama düzeyidir):</span></p><ul class="kucuk">' + kay + '</ul></td></tr>';
      }
    });
    $('#g6Tablo').innerHTML = t;
    Array.prototype.forEach.call(document.querySelectorAll('#g6Tablo tr.tik'), function (tr) {
      tr.onclick = function () { var i = +tr.getAttribute('data-i'); g6acik[i] = !g6acik[i]; g6ciz(); };
    });
  }
  $('#gAra').oninput = g6ciz; g6ciz();

  /* ---------------- ağırlıklı seçenek puanlama ---------------- */
  var KRIT = [['yenilik', 'Yenilik potansiyeli', 5], ['uyg', 'Uygulanabilirlik', 3], ['sure', 'Kısa sürede biter', 2], ['donanimsiz', 'Donanımsız yapılabilir', 2], ['alti_g', '6G uygunluğu', 4], ['risk', 'Düşük hakem riski', 3]];
  var SEC = [['S1 · Standart dalga biçimi + protokol + açık-küme', [2, 4, 3, 4, 3, 2]], ['S2 · 6G saldırı aileleri veri seti', [3, 2, 2, 4, 5, 2]], ['S3 · Simülasyondan gerçeğe + açık-küme', [4, 3, 2, 2, 2, 4]], ['S4 · Zamansal (Markov/reaktif) saldırgan', [2, 5, 5, 5, 2, 2]], ['★ Birleşik yol (S1 çekirdek + S2 alt küme + S3 + S4)', [3, 3, 2, 3, 4, 4]]];
  var W = KRIT.map(function (k) { return k[2]; });
  function skor() {
    var wsum = W.reduce(function (a, b) { return a + b; }, 0) || 1;
    var R = SEC.map(function (s) { var v = 0; s[1].forEach(function (p, i) { v += p * W[i]; }); return { ad: s[0], p: s[1], skor: v / wsum }; });
    R.sort(function (a, b) { return b.skor - a.skor; });
    var t = '<tr><th>Sıra</th><th>Seçenek</th>' + KRIT.map(function (k) { return '<th class="sayi">' + k[1] + '</th>'; }).join('') + '<th class="sayi">Ağırlıklı skor</th></tr>';
    R.forEach(function (r, i) { t += '<tr class="' + (r.ad.indexOf('★') === 0 ? 'vurgu' : '') + '"><td>' + (i + 1) + '</td><td><b>' + esc(r.ad) + '</b></td>' + r.p.map(function (p) { return '<td class="sayi">' + p + '</td>'; }).join('') + '<td class="sayi"><b>' + r.skor.toFixed(2) + '</b></td></tr>'; });
    $('#skorTablo').innerHTML = t;
  }
  var ag = $('#agirliklar'); ag.innerHTML = '';
  KRIT.forEach(function (k, i) {
    var d = document.createElement('div'); d.className = 'agirlik'; d.innerHTML = '<span>' + k[1] + '</span><input type="range" min="0" max="5" step="1" value="' + k[2] + '"><b>' + k[2] + '</b>';
    d.querySelector('input').oninput = function () { W[i] = +this.value; d.querySelector('b').textContent = this.value; skor(); };
    ag.appendChild(d);
  });
  skor();

  /* ---------------- gezinme ---------------- */
  var linkler = Array.prototype.slice.call(document.querySelectorAll('nav.yan a')), bol = Array.prototype.slice.call(document.querySelectorAll('main section'));
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) linkler.forEach(function (a) { a.classList.toggle('aktif', a.getAttribute('href') === '#' + e.target.id); }); }); }, { rootMargin: '-25% 0px -65% 0px' });
  bol.forEach(function (s) { io.observe(s); });
})();
