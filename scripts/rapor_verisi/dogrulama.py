"""
Tarayıcı simülatörünün (sablon/sim_core.js) gerçek GNU Radio çıktısıyla uyumunu ölçer.

ÇALIŞTIRMA (gr_kayit_uret.py çalıştıktan sonra; Node.js gerekir):
    python scripts/rapor_verisi/dogrulama.py
Üretilen: cikti/dogrulama.json
"""
import json
import pathlib
import subprocess

import numpy as np

from ozellik_ve_model import SINIFLAR, feat

KOK = pathlib.Path(__file__).resolve().parent
CIKTI = KOK / "cikti"


def main():
    d = np.load(CIKTI / "pencereler.npz")
    gr = {}
    for s in SINIFLAR[1:]:
        iq, amp = d[f"iq_{s}"], d[f"amp_{s}"]
        gr[s] = {}
        for a in (0.5, 1.0, 2.0):
            ws = iq[np.isclose(amp, a)]
            F = np.array([feat(w) for w in ws])
            gr[s][str(a)] = {"n": int(len(ws)), "ort": F.mean(0).round(3).tolist(),
                             "guc_karmasik": float(np.mean(np.abs(ws) ** 2))}
    ws = d["iq_normal"][:500]
    F = np.array([feat(w) for w in ws])
    gr["normal"] = {"0": {"n": 500, "ort": F.mean(0).round(3).tolist(),
                          "guc_karmasik": float(np.mean(np.abs(ws) ** 2))}}
    gecici = CIKTI / "gr_istatistik.json"
    gecici.write_text(json.dumps(gr), encoding="utf8")

    sonuc = subprocess.run(["node", str(KOK / "dogrula_tarayici_modeli.js"), str(gecici)],
                           capture_output=True, text=True, encoding="utf8", check=True)
    (CIKTI / "dogrulama.json").write_text(sonuc.stdout, encoding="utf8")
    o = json.loads(sonuc.stdout)
    print(f"en büyük enerji sapması %{o['max_enerji_sapma_yuzde']} | en büyük güç sapması %{o['max_guc_sapma_yuzde']}")


if __name__ == "__main__":
    main()
