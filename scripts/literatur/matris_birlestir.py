"""
Literatür inceleme ajanlarının ürettiği matris_*.json dosyalarını birleştirir.

ÇALIŞTIRMA:  python scripts/literatur/matris_birlestir.py
Üretilen:    docs/literatur/matris_birlesik.json ve docs/literatur/karsilastirma_matrisi.csv

Şemaya uymayan değerleri raporlar (kaynak: docs/literatur/<klasör>/matris_<kod>.json).
"""
import csv
import glob
import json
import pathlib

KOK = pathlib.Path(__file__).resolve().parents[2]
LIT = KOK / "docs" / "literatur"

IZIN = {
    "tur": {"derleme", "yontem", "veri_seti", "simulator", "savunma", "temel_kuram", "diger"},
    "veri_kaynagi": {"gercek_olcum", "simulasyon", "sdr_donanim", "hibrit", "yok", "belirtilmemis"},
    "sinyal": {"iq", "spektrogram", "paket_rssi_pdr", "gnss_iq", "ozellik_vektoru", "diger"},
    "jammer_turleri": {"sabit_gurultu", "ton", "sweep_chirp", "darbeli", "reaktif", "akilli_adaptif",
                       "dar_bant", "genis_bant", "diger"},
    "model_ailesi": {"klasik_ml", "derin_ogrenme", "anomali_denetimsiz", "pekistirmeli", "oyun_kurami",
                     "istatistiksel_esik", "diger"},
    "asama": {"tespit", "siniflandirma", "tespit_ve_siniflandirma", "savunma", "veri_uretimi", "derleme"},
    "acik_kume": {"evet", "kismi", "hayir"},
    "ag_nesli": {"5g", "6g", "wifi_iot", "gnss", "uydu", "uav", "genel"},
    "alti_g_ozellikleri": {"isac", "ris", "thz_mmwave", "ntn", "oran", "mimo_pilot", "semantik", "otfs",
                           "ai_yerel", "yok"},
    "acik_veri_veya_kod": {"evet", "hayir", "belirtilmemis"},
    "gnu_radio_sdr": {"evet", "hayir"},
    "markov_jammer": {"evet", "hayir"},
    "snr_jnr_degisimi": {"evet", "hayir", "belirtilmemis"},
    "kanal_modeli": {"evet", "hayir", "belirtilmemis"},
    "biz_iliski": {"rakip", "benzer", "destekleyici", "yontem_odunc", "arka_plan"},
    "okuma": {"tam", "kismi"},
    "guven": {"yuksek", "orta", "dusuk"},
}
ALANLAR = ["kisa", "yil", "baslik", "klasor", "tur", "veri_kaynagi", "sinyal", "jammer_turleri", "yontem",
           "model_ailesi", "asama", "acik_kume", "ag_nesli", "alti_g_ozellikleri", "acik_veri_veya_kod",
           "gnu_radio_sdr", "markov_jammer", "snr_jnr_degisimi", "kanal_modeli", "ana_sonuc", "sinirlilik",
           "biz_yakinlik", "biz_iliski", "okuma", "guven", "dosya"]


def yukle():
    kayitlar, sorunlar = [], []
    for f in sorted(glob.glob(str(LIT / "*" / "matris_*.json"))):
        for o in json.loads(pathlib.Path(f).read_text(encoding="utf8")):
            for k, iz in IZIN.items():
                v = o.get(k)
                for x in (v if isinstance(v, list) else [v]):
                    if x is not None and x not in iz:
                        sorunlar.append((o.get("kisa"), k, x))
            if not (isinstance(o.get("biz_yakinlik"), int) and 1 <= o["biz_yakinlik"] <= 5):
                sorunlar.append((o.get("kisa"), "biz_yakinlik", o.get("biz_yakinlik")))
            kayitlar.append(o)
    return kayitlar, sorunlar


def main():
    kayitlar, sorunlar = yukle()
    pdfler = {p.stem for p in LIT.glob("*/*.pdf")}
    eslesen = {o["dosya"] for o in kayitlar}
    print(f"kayıt: {len(kayitlar)} | PDF: {len(pdfler)} | PDF'siz kayıt: {len(eslesen - pdfler)} | kayıtsız PDF: {len(pdfler - eslesen)}")
    print("şema sorunları:", sorunlar or "yok")
    kayitlar.sort(key=lambda o: (o["klasor"], o["yil"], o["kisa"]))
    (LIT / "matris_birlesik.json").write_text(
        json.dumps([{k: o.get(k) for k in ALANLAR} for o in kayitlar], ensure_ascii=False, indent=1), encoding="utf8")
    with open(LIT / "karsilastirma_matrisi.csv", "w", newline="", encoding="utf-8-sig") as f:
        w = csv.writer(f, delimiter=";")
        w.writerow(ALANLAR)
        for o in kayitlar:
            w.writerow([("|".join(o[k]) if isinstance(o.get(k), list) else o.get(k)) for k in ALANLAR])
    print("yazıldı: matris_birlesik.json, karsilastirma_matrisi.csv")


if __name__ == "__main__":
    main()
