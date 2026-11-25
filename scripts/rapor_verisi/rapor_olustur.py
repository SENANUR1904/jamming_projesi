"""
Etkileşimli HTML raporunu üretir: docs/jamming_simulasyon_raporu.html

ÖNCE şunlar çalışmış olmalı (bkz. docs raporunun 12. bölümü):
    gr_kayit_uret.py (radioconda) -> ozellik_ve_model.py -> dogrulama.py
SONRA:
    python scripts/rapor_verisi/rapor_olustur.py

Şablon dosyaları sablon/ klasöründedir (rapor.html, stil.css, sim_core.js, uygulama_1..4.js).
Çıktı tek bir HTML dosyasıdır; yalnızca docs/rapor_gorselleri/ içindeki PNG'lere göreli bağlantı verir.
"""
import base64
import json
import pathlib
import struct

KOK = pathlib.Path(__file__).resolve().parent
CIKTI = KOK / "cikti"
SABLON = KOK / "sablon"
HEDEF = KOK.parents[1] / "docs" / "jamming_simulasyon_raporu.html"


def oku(yol):
    return pathlib.Path(yol).read_text(encoding="utf8")


def int16_b64(dizi):
    """float dizisini int16 (x1000) olarak sıkıştırıp base64'e çevirir (tarayıcıda çözülür)."""
    ham = b"".join(struct.pack("<h", max(-32768, min(32767, round(v * 1000)))) for v in dizi)
    return base64.b64encode(ham).decode("ascii")


def asama_sikistir(asama):
    return {sinif: {ad: {"i": int16_b64(v["i"]), "q": int16_b64(v["q"])} for ad, v in asamalar.items()}
            for sinif, asamalar in asama.items()}


def js_json(obj):
    # </script> kapanışını engelle
    return json.dumps(obj, separators=(",", ":"), ensure_ascii=False).replace("</", "<\\/")


def main():
    veri = json.loads(oku(CIKTI / "model_sonuclari.json"))
    asama = asama_sikistir(json.loads(oku(CIKTI / "asamalar.json")))
    dogr = json.loads(oku(CIKTI / "dogrulama.json"))

    uygulama = "\n".join(oku(SABLON / f"uygulama_{i}.js") for i in range(1, 5))
    html = oku(SABLON / "rapor.html")
    for isaret, icerik in [
        ("/*__STIL__*/", oku(SABLON / "stil.css")),
        ("/*__SIM_CORE__*/", oku(SABLON / "sim_core.js")),
        ("/*__VERI__*/", js_json(veri)),
        ("/*__ASAMA__*/", js_json(asama)),
        ("/*__DOGRULAMA__*/", js_json(dogr)),
        ("/*__UYGULAMA__*/", uygulama),
    ]:
        assert isaret in html, isaret
        html = html.replace(isaret, icerik)

    HEDEF.write_text(html, encoding="utf8", newline="\n")
    print(f"yazıldı: {HEDEF}  ({HEDEF.stat().st_size / 1024:.0f} KB)")


if __name__ == "__main__":
    main()
