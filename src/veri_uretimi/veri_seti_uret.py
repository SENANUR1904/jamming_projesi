import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from pathlib import Path

KOK = Path(__file__).resolve().parents[2]   # proje kok klasoru

# ============================================================
# AYARLAR
# ============================================================
ORNEKLEM = 1000          # her sinyal kac noktadan olussun
HER_TURDEN_ADET = 500    # her saldiri turunden kac ornek uretelim
t = np.linspace(0, 1, ORNEKLEM)

# ============================================================
# TEMEL (NORMAL) SINYAL
# Gercek bir cihaz sinyali: 5 Hz sinus + rastgele guclu gurultu
# SNR (sinyal/gurultu orani) her seferinde degisir -> cesitlilik
# ============================================================
def normal_sinyal_uret():
    snr_db = np.random.uniform(5, 20)                 # literaturde tipik aralik
    temiz = np.sin(2 * np.pi * 5 * t)
    gurultu_gucu = np.sqrt(10 ** (-snr_db / 10))
    return temiz + gurultu_gucu * np.random.randn(ORNEKLEM)

# ============================================================
# SALDIRI (JAMMER) FONKSIYONLARI
# Her birinin gucu rastgele -> ayni tur bile birbirinden farkli
# ============================================================
def surekli_jammer():
    guc = np.random.uniform(0.8, 1.6)
    return guc * np.random.randn(ORNEKLEM)

def darbe_jammer():
    guc = np.random.uniform(1.0, 2.0)
    jammer = guc * np.random.randn(ORNEKLEM)
    acik_mi = (np.floor(t * 10) % 2 == 0)             # 0.1 sn acik, 0.1 sn kapali
    return jammer * acik_mi

def ton_jammer():
    guc = np.random.uniform(0.8, 1.6)
    frekans = np.random.uniform(35, 45)               # tek ton, frekansi biraz oynak
    return guc * np.sin(2 * np.pi * frekans * t)

def supurme_jammer():
    guc = np.random.uniform(0.8, 1.6)
    # frekans zamanla 10 Hz'den 100 Hz'e supurur (chirp)
    faz = 2 * np.pi * (10 * t + (100 - 10) / 2 * t**2)
    return guc * np.sin(faz)

def reactive_jammer(normal):
    # Ortami dinler: sinyal guclu oldugunda saldirir, sessizken susar
    guc = np.random.uniform(1.0, 2.0)
    esik = np.abs(normal) > np.mean(np.abs(normal))   # trafik var mi?
    return guc * np.random.randn(ORNEKLEM) * esik

# ============================================================
# ETIKETLER (yapay zeka bunlari ogrenecek)
# 0 = Normal, 1 = Surekli, 2 = Darbe, 3 = Tek ton, 4 = Supurme, 5 = Reactive
# ============================================================
etiket_isimleri = {
    0: "Normal", 1: "Surekli", 2: "Darbe",
    3: "Tek_ton", 4: "Supurme", 5: "Reactive"
}

# ============================================================
# VERI SETINI URET
# Her turden HER_TURDEN_ADET kadar ornek olustur
# ============================================================
veri_seti = []
etiketler = []

print("Veri seti uretiliyor...")

for etiket in range(6):   # 0'dan 5'e kadar 6 durum
    for _ in range(HER_TURDEN_ADET):
        normal = normal_sinyal_uret()

        if etiket == 0:
            sinyal = normal                      # saldiri yok
        elif etiket == 1:
            sinyal = normal + surekli_jammer()
        elif etiket == 2:
            sinyal = normal + darbe_jammer()
        elif etiket == 3:
            sinyal = normal + ton_jammer()
        elif etiket == 4:
            sinyal = normal + supurme_jammer()
        elif etiket == 5:
            sinyal = normal + reactive_jammer(normal)

        veri_seti.append(sinyal)
        etiketler.append(etiket)

    print(f"  {etiket_isimleri[etiket]} turu tamam ({HER_TURDEN_ADET} ornek)")

# ============================================================
# CSV'YE KAYDET
# Her satir bir sinyal, son sutun etiket
# ============================================================
df = pd.DataFrame(veri_seti)
df.columns = [f"ornek_{i}" for i in range(ORNEKLEM)]
df["Etiket"] = etiketler

VERI_KLASORU = KOK / "data"
VERI_KLASORU.mkdir(exist_ok=True)
df.to_csv(VERI_KLASORU / "jamming_veri_seti.csv", index=False)
print(f"\nBITTI! Toplam {len(df)} satir veri 'data/jamming_veri_seti.csv' olarak kaydedildi.")
print(df["Etiket"].value_counts().sort_index())

# ============================================================
# KONTROL: her turden bir ornek ciz (gozle dogrula)
# ============================================================
plt.figure(figsize=(10, 12))
for etiket in range(6):
    # o etikete ait ilk ornegi bul
    idx = etiketler.index(etiket)
    plt.subplot(6, 1, etiket + 1)
    plt.plot(t, veri_seti[idx], color="blue" if etiket == 0 else "red")
    plt.title(etiket_isimleri[etiket])
    plt.ylim(-6, 6)
    plt.grid(True)

plt.xlabel("Zaman (saniye)")
plt.tight_layout()
GORSEL_KLASORU = KOK / "gorseller" / "veri_uretimi"
GORSEL_KLASORU.mkdir(parents=True, exist_ok=True)
plt.savefig(GORSEL_KLASORU / "veri_seti_ornekleri.png", dpi=150)
plt.show()