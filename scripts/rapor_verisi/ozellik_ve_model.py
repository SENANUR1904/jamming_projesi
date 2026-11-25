"""
gr_kayit_uret.py'nin ürettiği pencerelerden öznitelik çıkarır ve notebook'taki protokolü
(80/20 set, 70/30 bölme, Isolation Forest + Random Forest, açık-küme) yeniden çalıştırır.

ÇALIŞTIRMA (scikit-learn kurulu normal Python ile):
    python scripts/rapor_verisi/ozellik_ve_model.py

Üretilen: scripts/rapor_verisi/cikti/model_sonuclari.json  (HTML raporu bunu gömer)

NOT: Sonuçlar yazarın kendi .dat kayıtlarından değil, yeniden üretilen veriden gelir;
resmi sonuçlar notebooks/jamming_tespiti.ipynb ve docs/Jamming_Raporu_v2.docx içindedir.
"""
import json
import pathlib

import numpy as np
from sklearn.ensemble import IsolationForest, RandomForestClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, precision_recall_fscore_support, recall_score
from sklearn.model_selection import GroupShuffleSplit, train_test_split

KOK = pathlib.Path(__file__).resolve().parent
CIKTI = KOK / "cikti"
SINIFLAR = ["normal", "constant", "tone", "sweep", "pulse"]
KOLONLAR = ["ortalama", "std", "max_mutlak", "enerji", "basiklik", "carpiklik",
            "sifir_gecis", "zarf_std", "baskin_frekans", "spektral_yayilim"]


def feat(s):
    """notebooks/jamming_tespiti.ipynb içindeki fonksiyonla birebir aynı (yalnızca GERÇEL kısım kullanılır)."""
    s = np.real(s).astype(np.float64)
    mu = np.mean(s)
    sd = np.std(s) + 1e-12
    z = (s - mu) / sd
    fft = np.abs(np.fft.rfft(s))
    zc = np.sum(np.abs(np.diff(np.sign(s)))) / 2
    za = np.abs(s)
    ze = [np.mean(za[i:i + 50]) for i in range(0, len(s), 50)]
    return [mu, sd, np.max(np.abs(s)), np.mean(s ** 2),
            np.mean(z ** 4) - 3, np.mean(z ** 3), zc, np.std(ze),
            int(np.argmax(fft)), np.std(fft)]


def yuvarla(x, n=4):
    return [round(float(v), n) for v in x]


def main():
    d = np.load(CIKTI / "pencereler.npz")
    X, y, amp = [], [], []
    for k, s in enumerate(SINIFLAR):
        for w, a in zip(d[f"iq_{s}"], d[f"amp_{s}"]):
            X.append(feat(w))
            y.append(k)
            amp.append(float(a))
    X, y, amp = np.array(X), np.array(y), np.array(amp)
    print("toplam pencere:", len(y), "| sınıf sayıları:", np.bincount(y).tolist())

    # ---------- sınıf özeti ----------
    ozet = {}
    for k, s in enumerate(SINIFLAR):
        m = X[y == k]
        ozet[s] = {"n": int((y == k).sum()),
                   "ort": yuvarla(m.mean(0), 3), "std": yuvarla(m.std(0), 3)}

    # ---------- histogramlar (her öznitelik, her sınıf) ----------
    N_BIN = 28
    hist = {}
    for j, kol in enumerate(KOLONLAR):
        lo, hi = np.percentile(X[:, j], [0.5, 99.5])
        if hi - lo < 1e-9:
            hi = lo + 1
        kenar = np.linspace(lo, hi, N_BIN + 1)
        hist[kol] = {"kenar": yuvarla(kenar, 4), "sinif": {}}
        for k, s in enumerate(SINIFLAR):
            c, _ = np.histogram(np.clip(X[y == k, j], lo, hi), bins=kenar)
            hist[kol]["sinif"][s] = (c / c.sum()).round(4).tolist()

    # ---------- notebook protokolü: 80/20 set ----------
    np.random.seed(42)
    idx_n = np.where(y == 0)[0]
    idx_a = np.where(y != 0)[0]
    np.random.shuffle(idx_a)
    idx_a = idx_a[:len(idx_n) // 4]
    sel = np.concatenate([idx_n, idx_a])
    Xb, yb = X[sel], y[sel]
    bb = (yb != 0).astype(int)
    tr_pos, te_pos = train_test_split(np.arange(len(sel)), test_size=0.3, random_state=42, stratify=yb)
    Xtr, Xte, ytr, yte = Xb[tr_pos], Xb[te_pos], yb[tr_pos], yb[te_pos]
    btr, bte = (ytr != 0).astype(int), (yte != 0).astype(int)
    test_idx_global = set(sel[te_pos].tolist())

    iso = IsolationForest(n_estimators=200, contamination=0.05, random_state=42).fit(Xtr[ytr == 0])
    p_iso = (iso.predict(Xte) == -1).astype(int)
    rfb = RandomForestClassifier(n_estimators=200, class_weight="balanced", random_state=42).fit(Xtr, btr)
    pb = rfb.predict(Xte)
    mtr, mte = ytr != 0, yte != 0
    rft = RandomForestClassifier(n_estimators=200, class_weight="balanced", random_state=42).fit(Xtr[mtr], ytr[mtr])
    pt = rft.predict(Xte[mte])

    pr, rc, f1, sup = precision_recall_fscore_support(yte[mte], pt, labels=[1, 2, 3, 4], zero_division=0)
    cm = confusion_matrix(yte[mte], pt, labels=[1, 2, 3, 4])
    sonuc = {
        "set_boyutu": int(len(sel)), "normal_orani": round(float((bb == 0).mean()), 3),
        "test_boyutu": int(len(te_pos)),
        "asama1_iso": {"dogruluk": round(accuracy_score(bte, p_iso) * 100, 1),
                       "yakalama": round(recall_score(bte, p_iso) * 100, 1),
                       "yanlis_alarm": round(100 * ((p_iso == 1) & (bte == 0)).sum() / (bte == 0).sum(), 1)},
        "asama1_rf": {"dogruluk": round(accuracy_score(bte, pb) * 100, 1),
                      "yakalama": round(recall_score(bte, pb) * 100, 1)},
        "asama2": {"dogruluk": round(accuracy_score(yte[mte], pt) * 100, 1),
                   "sinif": {SINIFLAR[k]: {"kesinlik": round(float(pr[i]), 2), "duyarlilik": round(float(rc[i]), 2),
                                           "f1": round(float(f1[i]), 2), "ornek": int(sup[i])}
                             for i, k in enumerate([1, 2, 3, 4])},
                   "karisiklik": cm.tolist()},
        "onem_asama1": dict(zip(KOLONLAR, yuvarla(rfb.feature_importances_, 4))),
        "onem_asama2": dict(zip(KOLONLAR, yuvarla(rft.feature_importances_, 4))),
    }

    # ---------- açık-küme: her saldırı türü sırayla bilinmeyen ----------
    acik = {}
    for sakli in [1, 2, 3, 4]:
        known = y != sakli
        Xk, yk = X[known], y[known]
        Xp = X[y == sakli]
        Xk_tr, Xk_te, yk_tr, yk_te = train_test_split(Xk, yk, test_size=0.3, random_state=42, stratify=yk)
        rf_os = RandomForestClassifier(n_estimators=200, class_weight="balanced", random_state=42).fit(Xk_tr, yk_tr)
        pp = rf_os.predict(Xp)
        dagilim = {SINIFLAR[k]: round(100 * float((pp == k).mean()), 1) for k in range(5) if (pp == k).any()}
        Xn = X[y == 0]
        Xn_a, Xn_b = train_test_split(Xn, test_size=0.3, random_state=42)
        iso2 = IsolationForest(n_estimators=200, contamination=0.05, random_state=42).fit(Xn_a)
        acik[SINIFLAR[sakli]] = {
            "rf_tahmin_dagilimi": dagilim,
            "rf_normal_sanma": round(100 * float((pp == 0).mean()), 1),
            "iso_yakalama": round(100 * float((iso2.predict(Xp) == -1).mean()), 1),
            "iso_yanlis_alarm": round(100 * float((iso2.predict(Xn_b) == -1).mean()), 1),
        }
        print(f"  açık-küme (saklı={SINIFLAR[sakli]:8s}) RF->{dagilim} | ISO yakalama %{acik[SINIFLAR[sakli]]['iso_yakalama']}")

    # ---------- dağılım grafiği için örnek pencereler + model kararları ----------
    rng = np.random.default_rng(7)
    iso_skor = -iso.decision_function(X)          # büyük = daha anormal
    iso_pred = (iso.predict(X) == -1).astype(int)
    tur_proba = rft.predict_proba(X)              # sütunlar: sınıflar 1..4
    noktalar = []
    for k, s in enumerate(SINIFLAR):
        ids = np.where(y == k)[0]
        ids = rng.choice(ids, size=min(300, len(ids)), replace=False)
        for i in ids:
            tur = SINIFLAR[int(rft.classes_[int(np.argmax(tur_proba[i]))])] if iso_pred[i] else None
            noktalar.append({
                "y": k, "a": round(amp[i], 1),
                "x": yuvarla(X[i], 4),
                "iso": int(iso_pred[i]), "sk": round(float(iso_skor[i]), 3),
                "tur": tur,
                "t": int(i in test_idx_global),      # 1 = modelin eğitimde hiç görmediği test penceresi
            })


    # ---------- kayıt boyunca ilk 250 pencerenin enerjisi ve jammer_amp değeri ----------
    seri = {}
    for k, s_ad in enumerate(SINIFLAR):
        ids = np.where(y == k)[0][:250]
        seri[s_ad] = {"enerji": yuvarla(X[ids, 3], 3), "amp": [round(float(a), 1) for a in amp[ids]]}

    # ---------- ham dosya anatomisi: her sınıfın ilk 4 örneği (complex64 -> I,Q float32 hex) ----------
    bayt = {}
    for s_ad in SINIFLAR:
        ilk = d[f"iq_{s_ad}"][0][:4].astype(np.complex64)
        bayt[s_ad] = [{"i": float(v.real), "q": float(v.imag),
                       "hex_i": np.float32(v.real).tobytes().hex(), "hex_q": np.float32(v.imag).tobytes().hex()}
                      for v in ilk]

    # ---------- gruplu bölme: komşu pencereler aynı güç segmentinden geliyor; rastgele bölme iyimser mi? ----------
    seg = []
    for k in range(5):
        n_k = int((y == k).sum())
        seg += [k * 1000 + (i // 25) for i in range(n_k)]
    seg = np.array(seg)
    m_att = y != 0
    Xa, ya, ga = X[m_att], y[m_att], seg[m_att]
    gs = GroupShuffleSplit(n_splits=5, test_size=0.3, random_state=42)
    grup_acc, rast_acc = [], []
    for tr, te in gs.split(Xa, ya, ga):
        rf = RandomForestClassifier(n_estimators=200, class_weight="balanced", random_state=42).fit(Xa[tr], ya[tr])
        grup_acc.append(accuracy_score(ya[te], rf.predict(Xa[te])))
    for sd in range(5):
        a_tr, a_te, b_tr, b_te = train_test_split(Xa, ya, test_size=0.3, random_state=sd, stratify=ya)
        rf = RandomForestClassifier(n_estimators=200, class_weight="balanced", random_state=42).fit(a_tr, b_tr)
        rast_acc.append(accuracy_score(b_te, rf.predict(a_te)))
    grup = {"rastgele_bolme": round(100 * float(np.mean(rast_acc)), 1),
            "segment_bolme": round(100 * float(np.mean(grup_acc)), 1)}
    print("tür doğruluğu: rastgele bölme %", grup["rastgele_bolme"], "| segment-bazlı bölme %", grup["segment_bolme"])

    cikti = {"kolonlar": KOLONLAR, "siniflar": SINIFLAR, "ozet": ozet, "hist": hist,
             "protokol": sonuc, "acik_kume": acik, "noktalar": noktalar,
             "seri": seri, "bayt": bayt, "grup_testi": grup}
    (CIKTI / "model_sonuclari.json").write_text(json.dumps(cikti, separators=(",", ":"), ensure_ascii=False), encoding="utf8")
    print("\nAşama 1 anomali :", sonuc["asama1_iso"])
    print("Aşama 1 denetimli:", sonuc["asama1_rf"])
    print("Aşama 2 tür      :", sonuc["asama2"]["dogruluk"], "| karışıklık:", sonuc["asama2"]["karisiklik"])
    print("Kaydedildi: model_sonuclari.json,", (CIKTI / "model_sonuclari.json").stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
