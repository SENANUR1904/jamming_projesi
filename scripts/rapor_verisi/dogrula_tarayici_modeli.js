/* Tarayıcı modelini (sablon/sim_core.js) GNU Radio çıktısına karşı doğrular.
   Kullanım: node dogrula_tarayici_modeli.js <gr_istatistik.json> > dogrulama.json
   (dogrulama.py tarafından çağrılır) */
const path = require('path');
const fs = require('fs');
const SIM = require(path.join(__dirname, 'sablon', 'sim_core.js'));
const gr = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const N = 150;   // seviye başına simüle edilen pencere sayısı

function jsOrt(sinif, amp) {
  const acc = new Array(10).fill(0); let guc = 0;
  for (let k = 0; k < N; k++) {
    const r = SIM.simule(sinif, amp, { seed: 1000 + k * 7, n0: 4096 + 1024 * k });
    SIM.ozellik(r.kanal).forEach((v, i) => acc[i] += v);
    let g = 0; for (let i = 0; i < r.kanal.i.length; i++) g += r.kanal.i[i] ** 2 + r.kanal.q[i] ** 2;
    guc += g / r.kanal.i.length;
  }
  return { ort: acc.map(v => v / N), guc: guc / N };
}

const satirlar = [];
let maxEnerji = 0, maxGuc = 0;
for (const s of Object.keys(gr)) {
  for (const a of Object.keys(gr[s])) {
    const j = jsOrt(s, parseFloat(a)), g = gr[s][a];
    const enHata = Math.abs(j.ort[3] - g.ort[3]) / g.ort[3] * 100;
    const gucHata = Math.abs(j.guc - g.guc_karmasik) / g.guc_karmasik * 100;
    maxEnerji = Math.max(maxEnerji, enHata); maxGuc = Math.max(maxGuc, gucHata);
    satirlar.push({
      sinif: s, amp: parseFloat(a), gr_guc: +g.guc_karmasik.toFixed(3), js_guc: +j.guc.toFixed(3),
      gr_enerji: g.ort[3], js_enerji: +j.ort[3].toFixed(3),
      gr_std: g.ort[1], js_std: +j.ort[1].toFixed(3),
      gr_basiklik: g.ort[4], js_basiklik: +j.ort[4].toFixed(3),
      gr_zarf: g.ort[7], js_zarf: +j.ort[7].toFixed(3),
      gr_spektral: g.ort[9], js_spektral: +j.ort[9].toFixed(3),
    });
  }
}
process.stdout.write(JSON.stringify({ pencere_sayisi: N, max_enerji_sapma_yuzde: +maxEnerji.toFixed(2),
                                      max_guc_sapma_yuzde: +maxGuc.toFixed(2), satirlar }));
