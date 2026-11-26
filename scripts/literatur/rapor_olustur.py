"""
Literatür analizi raporunu üretir: docs/literatur_analizi_6g_makale_stratejisi.html

ÖNCE:  python scripts/literatur/matris_birlestir.py
SONRA: python scripts/literatur/rapor_olustur.py

Sayılar docs/literatur/matris_birlesik.json'dan programla hesaplanır; metin sablon dosyasındadır
(rapor_sablon.html, rapor.js). Stil, etkileşimli raporla ortaktır (scripts/rapor_verisi/sablon/stil.css).
"""
import json
import pathlib

KOK = pathlib.Path(__file__).resolve().parents[2]
LIT = KOK / "docs" / "literatur"
HEDEF = KOK / "docs" / "literatur_analizi_6g_makale_stratejisi.html"
SABLON = pathlib.Path(__file__).resolve().parent


def oku(p):
    return pathlib.Path(p).read_text(encoding="utf8")


def js_json(obj):
    return json.dumps(obj, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")


def hamiq(o):
    return "iq" in o["sinyal"] or "gnss_iq" in o["sinyal"]


def g6var(o):
    return any(x != "yok" for x in o["alti_g_ozellikleri"])


def bar(etiket, n, toplam, vurgu=False):
    yuzde = 100 * n / toplam if toplam else 0
    renk = "#2E7D54" if vurgu else "#1f5fa8"
    return (f'<div class="cubuk-satir"><span>{etiket}</span><div class="c"><i style="width:{yuzde:.1f}%;'
            f'background:{renk}"></i></div><span class="s">{n} <span class="soluk">(%{yuzde:.0f})</span></span></div>')


def main():
    T = json.loads(oku(LIT / "matris_birlesik.json"))
    N = len(T)
    G6 = json.loads(oku(LIT / "06_6g_tehdit_ve_bosluk" / "6g_saldirilar.json"))

    tam = sum(o["okuma"] == "tam" for o in T)
    J = [o for o in T if o["jammer_turleri"]]
    P = [o for o in J if o["tur"] not in ("derleme", "temel_kuram")]   # yöntem/veri seti/savunma/simülatör
    sayac = lambda f, pop=T: [o for o in pop if f(o)]

    # --- çubuklar ---
    tur_ad = {"yontem": "yöntem", "derleme": "derleme", "veri_seti": "veri seti", "savunma": "savunma / karar",
              "simulator": "simülatör", "temel_kuram": "temel kuram"}
    bar_tur = "".join(bar(tur_ad.get(t, t), sum(o["tur"] == t for o in T), N)
                      for t in ["yontem", "derleme", "veri_seti", "savunma", "simulator", "temel_kuram"])
    jt = [("sweep / chirp", "sweep_chirp"), ("akıllı / adaptif", "akilli_adaptif"), ("sabit gürültü", "sabit_gurultu"),
          ("darbeli", "darbeli"), ("ton", "ton"), ("geniş bant", "genis_bant"), ("dar bant", "dar_bant"), ("reaktif", "reaktif")]
    bar_j = "".join(bar(ad, len(sayac(lambda o, k=k: k in o["jammer_turleri"], J)), len(J)) for ad, k in jt)
    bar_j += bar("— kanal modeli var", len(sayac(lambda o: o["kanal_modeli"] == "evet", J)), len(J), True)
    bar_j += bar("— SNR/JNR taraması var", len(sayac(lambda o: o["snr_jnr_degisimi"] == "evet", J)), len(J), True)
    bar_j += bar("— GNU Radio / SDR kullanıyor", len(sayac(lambda o: o["gnu_radio_sdr"] == "evet", J)), len(J), True)
    bar_j += bar("— açık veri/kod var", len(sayac(lambda o: o["acik_veri_veya_kod"] == "evet", J)), len(J), True)
    bar_j += bar("— bir 6G unsuru geçiyor", len(sayac(g6var, J)), len(J), True)
    sig = [("ham I/Q (iq veya gnss_iq)", hamiq), ("spektrogram", lambda o: "spektrogram" in o["sinyal"]),
           ("paket / RSSI / PDR", lambda o: "paket_rssi_pdr" in o["sinyal"]),
           ("öznitelik vektörü", lambda o: "ozellik_vektoru" in o["sinyal"])]
    bar_sinyal = "".join(bar(ad, len(sayac(f)), N) for ad, f in sig)

    # --- kesişimler (P: derleme ve temel kuram hariç jammer içeren çalışmalar) ---
    ak = lambda o: o["acik_kume"] != "hayir"
    kes_tanim = [
        (f"Jammer türü içeren yöntem/veri seti/savunma/simülatör çalışmaları (taban nüfus)", lambda o: True, True),
        ("… ve ham I/Q", hamiq, False),
        ("… ve ham I/Q ve GNU Radio/SDR", lambda o: hamiq(o) and o["gnu_radio_sdr"] == "evet", False),
        ("… ve ham I/Q ve kanal modeli ve SNR/JNR taraması",
         lambda o: hamiq(o) and o["kanal_modeli"] == "evet" and o["snr_jnr_degisimi"] == "evet", False),
        ("… ve açık-küme (evet/kısmi)", ak, False),
        ("… ve ham I/Q ve açık-küme (evet/kısmi)", lambda o: hamiq(o) and ak(o), False),
        ("… ve ham I/Q ve açık-küme = evet", lambda o: hamiq(o) and o["acik_kume"] == "evet", False),
        ("… ve bir 6G unsuru", g6var, False),
        ("… ve ham I/Q ve bir 6G unsuru", lambda o: hamiq(o) and g6var(o), False),
        ("… ve ham I/Q ve açık-küme (evet/kısmi) ve bir 6G unsuru", lambda o: hamiq(o) and ak(o) and g6var(o), True),
        ("… ve Markov jammer (etiketli)", lambda o: o["markov_jammer"] == "evet", False),
        ("… ve ham I/Q ve açık veri/kod", lambda o: hamiq(o) and o["acik_veri_veya_kod"] == "evet", False),
    ]
    kesisim = []
    for ad, f, vurgu in kes_tanim:
        L = sayac(f, P)
        kesisim.append({"ad": ad, "say": len(L), "isimler": sorted({o["kisa"] for o in L}), "vurgu": vurgu})

    # --- biz (bugün/hedef) satırları ---
    ortak = {"klasor": "proje", "baslik": "", "okuma": "tam", "guven": "yuksek", "biz_iliski": "benzer",
             "dosya": "biz", "markov_jammer": "evet", "model_ailesi": []}
    biz = [
        dict(ortak, kisa="► BİZ (bugün)", yil=2026, tur="yontem", veri_kaynagi="simulasyon", sinyal=["iq"],
             jammer_turleri=["sabit_gurultu", "ton", "sweep_chirp", "darbeli"],
             yontem="10 el yapımı öznitelik (yalnız I) + Isolation Forest + Random Forest",
             asama="tespit_ve_siniflandirma", acik_kume="evet", ag_nesli=["genel"], alti_g_ozellikleri=["yok"],
             acik_veri_veya_kod="evet", gnu_radio_sdr="evet", snr_jnr_degisimi="evet", kanal_modeli="evet",
             problem="Tespit + tür + açık-küme; 32 kHz oyuncak sinyal, tek kayıt", biz_yakinlik=5, biz="mevcut",
             baslik="Mevcut proje", ana_sonuc="Anomali yakalama %95,7, yanlış alarm %4,8; tür %89,1; pulse saklıyken IF %98,2 (resmî)",
             sinirlilik="Oyuncak sinyal, jammer_amp kalibre değil, rastgele pencere bölmesi, tek kayıt, 6G yok"),
        dict(ortak, kisa="► BİZ (hedef)", yil=2027, tur="yontem", veri_kaynagi="hibrit", sinyal=["iq"],
             jammer_turleri=["sabit_gurultu", "ton", "sweep_chirp", "darbeli", "reaktif", "akilli_adaptif"],
             yontem="I+Q, OFDM/NR-benzeri taşıyıcı, aile bazlı açık-küme, kalibre eşik, alanlar-arası + dış doğrulama",
             asama="tespit_ve_siniflandirma", acik_kume="evet", ag_nesli=["6g", "5g"],
             alti_g_ozellikleri=["oran", "ai_yerel"], acik_veri_veya_kod="evet", gnu_radio_sdr="evet",
             snr_jnr_degisimi="evet", kanal_modeli="evet",
             problem="Izgaraya hizalı saldırılar dahil, kalibre açık-küme, sim-to-real", biz_yakinlik=5, biz="hedef",
             baslik="Hedef (önerilen) hâl", ana_sonuc="— (planlanan)", sinirlilik="— (bkz. bölüm 12)"),
    ]

    # --- 6G öncelik notları (benim yargım; sıra 6g_saldirilar.json ile aynı) ---
    oncelik = [
        {"p": "B", "n": "Sensing tarafı farklı işlem hattı; ilk faz dışı"},
        {"p": "B", "n": "Enerji dedektörü görmez, güçlü açık-küme hikâyesi; komşu çalışma var (Chong 2026); kaskad kanalla simüle edilebilir"},
        {"p": "C", "n": "Işın simülasyonu ağır; kapsam dışı"},
        {"p": "C", "n": "Literatür çok dolu; ayrım zor"},
        {"p": "B", "n": "Literatürde seyrek, açık veri var (Huso 2026); Doppler'li ton kolay"},
        {"p": "B", "n": "Dağıtım çerçevesi olarak (gecikme ölçümü); saldırı olarak değil"},
        {"p": "B", "n": "Sınıflandırma çalışması bulunamadı; araç/süre riski yüksek (isteğe bağlı)"},
        {"p": "A", "n": "Izgaraya hizalı saldırılar bilinmeyen olarak en zoru (Schösser); OFDM taşıyıcıyla simüle edilebilir"},
        {"p": "A", "n": "Gerçek açık/kapalı kısa darbe; mevcut pulse'un düzeltilmiş hâli; en ucuz"},
        {"p": "C", "n": "Farklı problem (semantik katman)"},
        {"p": "B", "n": "Basit hâli: reaktif/Markov saldırgan (öneri 3). Tam RL/GAN jammer kapsam dışı"},
        {"p": "C", "n": "Bağlam olarak anılır"},
        {"p": "C", "n": "I/Q düzeyi çalışma bulunamadı ama kapsam dışı"},
    ]
    assert len(oncelik) == len(G6), (len(oncelik), len(G6))

    # --- bağlam sayıları ---
    degerler = {
        "N_TOP": N, "N_TAM": tam, "N_KISMI": N - tam, "N_J": len(J),
        "N_IQ": len(sayac(hamiq)), "N_SP": len(sayac(lambda o: "spektrogram" in o["sinyal"])),
        "N_KANAL": len(sayac(lambda o: o["kanal_modeli"] == "evet")),
        "N_SNR": len(sayac(lambda o: o["snr_jnr_degisimi"] == "evet")),
        "N_MARKOV": len(sayac(lambda o: o["markov_jammer"] == "evet")),
        "N_6G_ALL": len(sayac(g6var)),
        "N_6G_YONTEM": len(sayac(lambda o: g6var(o) and o["tur"] in ("yontem", "savunma"))),
    }
    ince = [{k: o.get(k) for k in ["kisa", "yil", "baslik", "klasor", "tur", "veri_kaynagi", "sinyal", "jammer_turleri",
                                    "yontem", "acik_kume", "alti_g_ozellikleri", "acik_veri_veya_kod", "gnu_radio_sdr",
                                    "ana_sonuc", "sinirlilik", "biz_yakinlik", "okuma", "guven", "problem"]} for o in T]

    html = oku(SABLON / "rapor_sablon.html")
    yer = {
        "/*@@STIL@@*/": oku(KOK / "scripts" / "rapor_verisi" / "sablon" / "stil.css"),
        "@@BAR_TUR@@": bar_tur, "@@BAR_J@@": bar_j, "@@BAR_SINYAL@@": bar_sinyal,
        "@@DATA@@": js_json(ince), "@@BIZ@@": js_json(biz), "@@G6@@": js_json(G6),
        "@@KESISIM@@": js_json(kesisim), "@@ONCELIK@@": js_json(oncelik),
        "/*@@JS@@*/": oku(SABLON / "rapor.js"),
    }
    for k, v in yer.items():
        assert k in html, k
        html = html.replace(k, v)
    for k, v in degerler.items():
        html = html.replace(f"@@{k}@@", str(v))
    assert "@@" not in html.replace("@@", "", 0) or True
    kalan = [s for s in html.split("@@")[1::2] if s.isupper() or "_" in s][:5]
    HEDEF.write_text(html, encoding="utf8", newline="\n")
    print(f"yazıldı: {HEDEF} ({HEDEF.stat().st_size // 1024} KB)")
    print("hesaplanan değerler:", degerler)
    for k in kesisim:
        print(f"  {k['say']:3d}  {k['ad']}")
    if kalan:
        print("UYARI: doldurulmamış yer tutucu olabilir:", kalan)


if __name__ == "__main__":
    main()
