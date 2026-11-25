"""
gnuradio/*.grc şemalarının topolojisini GERÇEK GNU Radio bloklarıyla (başsız / GUI'siz)
çalıştırır ve rapor için veri üretir.

ÇALIŞTIRMA (radioconda ortamında; GNU Radio gerekir):
    C:\\Users\\<kullanici>\\radioconda\\python.exe scripts/rapor_verisi/gr_kayit_uret.py

Üretilenler (scripts/rapor_verisi/cikti/ altına):
    pencereler.npz   -> her sınıf için 1024 örneklik I/Q pencereleri + her pencerenin jammer_amp değeri
    asamalar.json    -> jammer_amp=1 için blok blok ara sinyaller (kaynak, gürültü, jammer, toplam, kanal)

NOT: Yazarın kaydettiği .dat dosyaları değildir; aynı topolojinin aynı parametrelerle
yeniden üretimidir. Şemalardaki `seed: 0` ayarı korunmuştur.
"""
import json
import pathlib
import sys

import numpy as np
from gnuradio import analog, blocks, channels, gr

KOK = pathlib.Path(__file__).resolve().parent
CIKTI = KOK / "cikti"
CIKTI.mkdir(exist_ok=True)

FS = 32000            # samp_rate
P = 1024              # pencere uzunluğu (notebook ile aynı)
SINIFLAR = ["normal", "constant", "tone", "sweep", "pulse"]
TAPS = [1.0, 0.3 + 0.3j]          # Channel Model: Taps
PENCERE_SAYISI = {"normal": 4000, "constant": 1500, "tone": 1500, "sweep": 1500, "pulse": 1500}
SEED = 12345                      # yalnızca jammer_amp programını (kaydırıcı hareketini) üretmek için


def jammer_amp_programi(n_pencere, rng):
    """Kayıt sırasında kaydırıcının elle oynatılmasını taklit eder:
    her biri 25 pencere süren segmentler; 0.1..2.0 arasındaki 20 seviye karışık sırayla
    (her tur tüm seviyeleri bir kez içerir) -> tüm güç seviyeleri eşit kapsanır."""
    seviyeler = np.round(np.arange(1, 21) * 0.1, 1)
    amp = []
    while len(amp) < n_pencere:
        for sev in rng.permutation(seviyeler):
            amp += [float(sev)] * 25
    return np.array(amp[:n_pencere])


def topoloji_kur(sinif, amp_ornek):
    """Bir sınıfın GRC topolojisini kurar.
    amp_ornek: örnek başına jammer_amp (float dizi) -> kaydırıcının zamana göre değeri."""
    tb = gr.top_block()

    # (1) Meşru sinyal: Signal Source, complex, Cosine, 1 kHz, genlik 1
    yasal = analog.sig_source_c(FS, analog.GR_COS_WAVE, 1000, 1.0, 0, 0)
    # (2) Ortam gürültüsü: Noise Source, Gaussian, genlik 0.3, seed 0
    ortam = analog.noise_source_c(analog.GR_GAUSSIAN, 0.3, 0)

    # (3) Jammer kolu (sınıfa göre)
    jammer = None
    if sinif == "constant":
        gurultu = analog.noise_source_c(analog.GR_GAUSSIAN, 1.0, 0)
        kapi = analog.sig_source_c(FS, analog.GR_SQR_WAVE, 100, 0.0, 1.0, 0)     # amp 0, offset 1
        jammer = blocks.multiply_cc()
        tb.connect(gurultu, (jammer, 0)); tb.connect(kapi, (jammer, 1))
    elif sinif == "pulse":
        gurultu = analog.noise_source_c(analog.GR_GAUSSIAN, 1.0, 0)
        kapi = analog.sig_source_c(FS, analog.GR_SQR_WAVE, 100, 0.5, 0.5, 0)     # amp 0.5, offset 0.5
        jammer = blocks.multiply_cc()
        tb.connect(gurultu, (jammer, 0)); tb.connect(kapi, (jammer, 1))
    elif sinif == "tone":
        jammer = analog.sig_source_c(FS, analog.GR_COS_WAVE, 5000, 1.0, 0, 0)
    elif sinif == "sweep":
        testere = analog.sig_source_f(FS, analog.GR_SAW_WAVE, 50, 1.0, 0, 0)
        jammer = blocks.vco_c(FS, 60000, 1.0)
        tb.connect(testere, jammer)

    # (4) Add: meşru + ortam (+ jammer). 3 girişli Add yerine iki kademe (matematiksel olarak aynı).
    t1 = blocks.add_cc()
    tb.connect(yasal, (t1, 0)); tb.connect(ortam, (t1, 1))
    jam_cikis = None
    if jammer is None:
        son = t1
    else:
        # jammer_amp kaydırıcısı: jammer birim genlikte üretilip kaydırıcı değeriyle çarpılır
        amp_kaynak = blocks.vector_source_f(amp_ornek.astype(np.float32).tolist(), False)
        amp_cplx = blocks.float_to_complex()
        jam_cikis = blocks.multiply_cc()
        tb.connect(amp_kaynak, amp_cplx)
        tb.connect(jammer, (jam_cikis, 0)); tb.connect(amp_cplx, (jam_cikis, 1))
        son = blocks.add_cc()
        tb.connect(t1, (son, 0)); tb.connect(jam_cikis, (son, 1))

    # (5) Channel Model: noise 0, freq offset 0, epsilon 1, taps [1, 0.3+0.3j], seed 0
    kanal = channels.channel_model(0.0, 0.0, 1.0, TAPS, 0)
    tb.connect(son, kanal)
    return tb, dict(yasal=yasal, ortam=ortam, jam=jam_cikis, toplam=son, kanal=kanal)


KUYRUK = 64   # Channel Model kaynak bitince filtre kuyruğundaki birkaç örneği atar; akışı biraz uzun üretip kesiyoruz


def calistir(sinif, amp_ornek, kaydet=("kanal",)):
    n = len(amp_ornek)
    amp_ornek = np.concatenate([amp_ornek, np.full(KUYRUK, amp_ornek[-1])])
    tb, d = topoloji_kur(sinif, amp_ornek)
    sink = {}
    for ad in kaydet:
        dugum = d[ad]
        if dugum is None:
            continue
        s = blocks.vector_sink_c()
        h = blocks.head(gr.sizeof_gr_complex, n)
        tb.connect(dugum, h, s)
        sink[ad] = s
    tb.run()
    return {ad: np.array(s.data(), dtype=np.complex64) for ad, s in sink.items()}


def main():
    rng = np.random.default_rng(SEED)

    # ---- A) Veri seti penceleri (jammer_amp zamanla değişir) ----
    veri, amplar = {}, {}
    for sinif in SINIFLAR:
        n_pen = PENCERE_SAYISI[sinif]
        amp_pen = jammer_amp_programi(n_pen, rng) if sinif != "normal" else np.zeros(n_pen)
        amp_ornek = np.repeat(amp_pen, P)
        if sinif == "normal":
            amp_ornek = np.zeros(n_pen * P)
        cikti = calistir(sinif, amp_ornek)["kanal"]
        veri[sinif] = cikti.reshape(n_pen, P)
        amplar[sinif] = amp_pen
        print(f"  {sinif:9s}: {n_pen} pencere, {len(cikti):,} örnek, ort. güç={np.mean(np.abs(cikti)**2):.3f}")
    np.savez_compressed(
        CIKTI / "pencereler.npz",
        **{f"iq_{s}": veri[s] for s in SINIFLAR},
        **{f"amp_{s}": amplar[s] for s in SINIFLAR},
    )

    # ---- B) jammer_amp = 1 için blok blok ara sinyaller (1 pencere) ----
    asama = {}
    N_ASAMA = P + 64     # kanal başlangıç etkisini atlamak için biraz fazla üret
    for sinif in SINIFLAR:
        amp_ornek = np.full(N_ASAMA * 4, 1.0 if sinif != "normal" else 0.0)
        out = calistir(sinif, amp_ornek, kaydet=("yasal", "ortam", "jam", "toplam", "kanal"))
        # 2. pencereyi al (başlangıç geçici etkilerinden uzak)
        b = P
        asama[sinif] = {
            ad: {
                "i": np.round(v[b:b + P].real, 3).tolist(),
                "q": np.round(v[b:b + P].imag, 3).tolist(),
            }
            for ad, v in out.items()
        }
    (CIKTI / "asamalar.json").write_text(json.dumps(asama, separators=(",", ":")), encoding="utf8")
    print("tamam ->", CIKTI)


if __name__ == "__main__":
    sys.exit(main())
