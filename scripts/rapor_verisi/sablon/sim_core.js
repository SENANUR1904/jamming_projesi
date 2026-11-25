/* ============================================================================
   sim_core.js  --  gnuradio/*.grc topolojisinin tarayıcıda çalışan birebir modeli
   (hem rapor HTML'ine gömülür hem de Node ile GNU Radio çıktısına karşı test edilir)

   Her blok GNU Radio 3.10'daki davranışına göre yazıldı (hepsi bu bilgisayarda ölçüldü):
   - Noise Source (Gaussian, complex): her bileşen (I ve Q) varyansı amp^2/2  -> toplam güç amp^2
   - Signal Source (complex, Cosine): e^{j 2π f n / fs}  (genlik * karmaşık üstel)
   - Signal Source (complex, Square): gerçel = offset + amp*[faz>=0 ? 1:0] ; SANAL = amp*[...]  (çeyrek periyot kaymış)
         amp .5 / offset .5 için: gerçel ∈ {0.5, 1.0}, sanal ∈ {0, 0.5}  -> |kapı| hiçbir zaman 0 olmaz
   - Signal Source (float, Saw): frac(0.5 + n f / fs)  (0..1 arası yükselen testere)
   - VCO (complex): faz += sensitivity * girdi / fs ; çıktı = amp * e^{j faz}
   - Channel Model: FIR taps [1, 0.3+0.3j]  (noise voltage 0, freq offset 0, epsilon 1)
   ========================================================================== */
(function (root) {
  'use strict';
  var FS = 32000, P = 1024;
  var TAPS = [[1, 0], [0.3, 0.3]];
  var SINIFLAR = ['normal', 'constant', 'tone', 'sweep', 'pulse'];

  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  /* Box-Muller: standart normal dizisi (n adet) */
  function gaussDizi(rng, n) {
    var out = new Float64Array(n);
    for (var i = 0; i < n; i += 2) {
      var u1 = rng() || 1e-12, u2 = rng();
      var r = Math.sqrt(-2 * Math.log(u1));
      out[i] = r * Math.cos(2 * Math.PI * u2);
      if (i + 1 < n) out[i + 1] = r * Math.sin(2 * Math.PI * u2);
    }
    return out;
  }
  function bos(n) { return { i: new Float64Array(n), q: new Float64Array(n) }; }

  /* Complex Gaussian gürültü: genlik amp -> toplam güç amp^2 (her bileşen varyansı amp^2/2).
     'taban' verilirse (birim varyanslı gauss çifti) onu amp ile ölçekler -> iki kaynak aynı seed'li gibi davranır. */
  function gurultu(amp, taban) {
    var n = taban.i.length, o = bos(n), s = amp / Math.SQRT2;
    for (var k = 0; k < n; k++) { o.i[k] = taban.i[k] * s; o.q[k] = taban.q[k] * s; }
    return o;
  }
  function gurultuTaban(rng, n) { return { i: gaussDizi(rng, n), q: gaussDizi(rng, n) }; }

  function cosKaynak(f, amp, n0, n) {            // complex Cosine -> amp * e^{j w n}
    var o = bos(n), w = 2 * Math.PI * f / FS;
    for (var k = 0; k < n; k++) { var ph = w * (n0 + k); o.i[k] = amp * Math.cos(ph); o.q[k] = amp * Math.sin(ph); }
    return o;
  }
  /* complex Square: periyot FS/f örnek. gerçel: ilk yarı düşük, ikinci yarı yüksek ; sanal: çeyrek periyot ilerde */
  function kareKaynak(f, amp, offset, n0, n) {
    var o = bos(n), per = FS / f;
    for (var k = 0; k < n; k++) {
      var m = ((n0 + k) % per + per) % per;
      o.i[k] = offset + amp * (m >= per / 2 ? 1 : 0);
      o.q[k] = amp * ((m >= per * 0.75 || m < per * 0.25) ? 1 : 0);
    }
    return o;
  }
  function carp(a, b) {
    var n = a.i.length, o = bos(n);
    for (var k = 0; k < n; k++) {
      o.i[k] = a.i[k] * b.i[k] - a.q[k] * b.q[k];
      o.q[k] = a.i[k] * b.q[k] + a.q[k] * b.i[k];
    }
    return o;
  }
  function topla() {
    var n = arguments[0].i.length, o = bos(n);
    for (var a = 0; a < arguments.length; a++)
      for (var k = 0; k < n; k++) { o.i[k] += arguments[a].i[k]; o.q[k] += arguments[a].q[k]; }
    return o;
  }
  function olcekle(x, c) { var n = x.i.length, o = bos(n); for (var k = 0; k < n; k++) { o.i[k] = x.i[k] * c; o.q[k] = x.q[k] * c; } return o; }

  /* Saw -> VCO (sweep). n0'a kadar fazı biriktirip n örnek üretir. */
  function sweepKaynak(amp, n0, n) {
    var o = bos(n), sens = 60000, f = 50, ph = 0, total = n0 + n;
    for (var k = 0; k < total; k++) {
      var x = ((0.5 + k * f / FS) % 1);           // saw
      if (k >= n0) { o.i[k - n0] = amp * Math.cos(ph); o.q[k - n0] = amp * Math.sin(ph); }
      ph += sens * x / FS;
    }
    return o;
  }

  /* Channel Model: y[n] = x[n]*h0 + x[n-1]*h1   (x[-1] için bir önceki örnek de üretilir) */
  function kanal(x) {
    var n = x.i.length - 1, o = bos(n);
    for (var k = 0; k < n; k++) {
      var cur = k + 1, a = x.i[cur], b = x.q[cur], c = x.i[cur - 1], d = x.q[cur - 1];
      o.i[k] = a * TAPS[0][0] - b * TAPS[0][1] + (c * TAPS[1][0] - d * TAPS[1][1]);
      o.q[k] = a * TAPS[0][1] + b * TAPS[0][0] + (c * TAPS[1][1] + d * TAPS[1][0]);
    }
    return o;
  }
  function kes(x, bas, son) { return { i: x.i.slice(bas, son), q: x.q.slice(bas, son) }; }

  /* ANA FONKSİYON: bir pencere için tüm blok çıkışlarını döndürür.
     opts: { n:1024, n0:başlangıç örnek indeksi, seed, ayniSeed:true(GNU Radio seed=0 davranışı), ortamGuru:0.3 } */
  function simule(sinif, jammerAmp, opts) {
    opts = opts || {};
    var n = (opts.n || P) + 1, n0 = (opts.n0 == null ? 4096 : opts.n0) - 1;
    var rng = mulberry32(opts.seed == null ? 1 : opts.seed);
    var ortamAmp = opts.ortamAmp == null ? 0.3 : opts.ortamAmp;
    var ayni = opts.ayniSeed !== false;

    var yasal = cosKaynak(1000, 1.0, n0, n);                               // Signal Source 1 kHz
    var tabanOrtam = gurultuTaban(rng, n);
    var ortam = gurultu(ortamAmp, tabanOrtam);                             // Noise Source 0.3
    var jam = bos(n), kapi = null, jamGurultu = null;

    if (sinif === 'constant' || sinif === 'pulse') {
      var tabanJam = ayni ? tabanOrtam : gurultuTaban(rng, n);
      jamGurultu = gurultu(jammerAmp, tabanJam);                           // Noise Source (amp = jammer_amp)
      kapi = sinif === 'constant' ? kareKaynak(100, 0.0, 1.0, n0, n)       // amp 0, offset 1 => sabit 1
                                  : kareKaynak(100, 0.5, 0.5, n0, n);      // amp .5, offset .5
      jam = carp(jamGurultu, kapi);                                        // Multiply
    } else if (sinif === 'tone') {
      jam = cosKaynak(5000, jammerAmp, n0, n);                             // Signal Source 5 kHz
    } else if (sinif === 'sweep') {
      jam = sweepKaynak(jammerAmp, n0, n);                                 // Saw -> VCO
    }
    var toplam = topla(yasal, ortam, jam);                                 // Add
    var kn = kanal(toplam);                                                // Channel Model
    return {
      n: n - 1, sinif: sinif, amp: jammerAmp,
      yasal: kes(yasal, 1, n), ortam: kes(ortam, 1, n), jam: kes(jam, 1, n),
      kapi: kapi ? kes(kapi, 1, n) : null, jamGurultu: jamGurultu ? kes(jamGurultu, 1, n) : null,
      toplam: kes(toplam, 1, n), kanal: kn
    };
  }

  /* ---- FFT (radix-2) ---- */
  function fft(re, im) {
    var n = re.length, r = Float64Array.from(re), m = Float64Array.from(im), j = 0, i, k;
    for (i = 1; i < n; i++) {
      var bit = n >> 1;
      for (; j & bit; bit >>= 1) j ^= bit;
      j ^= bit;
      if (i < j) { var t = r[i]; r[i] = r[j]; r[j] = t; t = m[i]; m[i] = m[j]; m[j] = t; }
    }
    for (var len = 2; len <= n; len <<= 1) {
      var ang = -2 * Math.PI / len, wr = Math.cos(ang), wi = Math.sin(ang);
      for (i = 0; i < n; i += len) {
        var cr = 1, ci = 0;
        for (k = 0; k < len / 2; k++) {
          var ur = r[i + k], ui = m[i + k];
          var vr = r[i + k + len / 2] * cr - m[i + k + len / 2] * ci;
          var vi = r[i + k + len / 2] * ci + m[i + k + len / 2] * cr;
          r[i + k] = ur + vr; m[i + k] = ui + vi;
          r[i + k + len / 2] = ur - vr; m[i + k + len / 2] = ui - vi;
          var nr = cr * wr - ci * wi; ci = cr * wi + ci * wr; cr = nr;
        }
      }
    }
    return { re: r, im: m };
  }
  /* Karmaşık spektrum (dB), -FS/2 .. +FS/2 (fftshift) */
  function spektrumKarmasik(x) {
    var n = x.i.length, w = new Float64Array(n), re = new Float64Array(n), im = new Float64Array(n), k;
    for (k = 0; k < n; k++) { w[k] = 0.5 - 0.5 * Math.cos(2 * Math.PI * k / (n - 1)); re[k] = x.i[k] * w[k]; im[k] = x.q[k] * w[k]; }
    var F = fft(re, im), out = new Float64Array(n);
    for (k = 0; k < n; k++) {
      var src = (k + n / 2) % n, mag = Math.hypot(F.re[src], F.im[src]) / n;
      out[k] = 20 * Math.log10(mag + 1e-9);
    }
    return out;
  }
  /* Yalnızca GERÇEL kısmın tek taraflı spektrumu (modelin gördüğü) : rfft genliği, n/2+1 bin */
  function rfftGenlik(realDizi) {
    var n = realDizi.length, im = new Float64Array(n), F = fft(realDizi, im), out = new Float64Array(n / 2 + 1);
    for (var k = 0; k <= n / 2; k++) out[k] = Math.hypot(F.re[k], F.im[k]);
    return out;
  }

  /* ---- notebooks/jamming_tespiti.ipynb::feat() ile birebir ---- */
  function ozellik(kanalIQ) {
    var s = kanalIQ.i, n = s.length, k;                    // np.real(s)
    var mu = 0; for (k = 0; k < n; k++) mu += s[k]; mu /= n;
    var v = 0; for (k = 0; k < n; k++) v += (s[k] - mu) * (s[k] - mu); var sd = Math.sqrt(v / n) + 1e-12;
    var m4 = 0, m3 = 0, en = 0, mx = 0;
    for (k = 0; k < n; k++) {
      var z = (s[k] - mu) / sd; m4 += z * z * z * z; m3 += z * z * z; en += s[k] * s[k]; mx = Math.max(mx, Math.abs(s[k]));
    }
    var zc = 0, sg = function (x) { return x > 0 ? 1 : (x < 0 ? -1 : 0); };
    for (k = 1; k < n; k++) zc += Math.abs(sg(s[k]) - sg(s[k - 1])); zc /= 2;
    var ze = [];
    for (var b = 0; b < n; b += 50) { var t = 0, c = 0; for (k = b; k < Math.min(b + 50, n); k++) { t += Math.abs(s[k]); c++; } ze.push(t / c); }
    var zm = ze.reduce(function (a, c) { return a + c; }, 0) / ze.length;
    var zs = Math.sqrt(ze.reduce(function (a, c) { return a + (c - zm) * (c - zm); }, 0) / ze.length);
    var F = rfftGenlik(s), arg = 0, fm = 0, fv = 0;
    for (k = 0; k < F.length; k++) { if (F[k] > F[arg]) arg = k; fm += F[k]; }
    fm /= F.length; for (k = 0; k < F.length; k++) fv += (F[k] - fm) * (F[k] - fm);
    return [mu, sd, mx, en / n, m4 / n - 3, m3 / n, zc, zs, arg, Math.sqrt(fv / F.length)];
  }

  var API = { FS: FS, P: P, SINIFLAR: SINIFLAR, simule: simule, ozellik: ozellik, fft: fft,
              spektrumKarmasik: spektrumKarmasik, rfftGenlik: rfftGenlik, mulberry32: mulberry32 };
  if (typeof module !== 'undefined' && module.exports) module.exports = API; else root.SIM = API;
})(typeof window !== 'undefined' ? window : globalThis);
