import numpy as np
import matplotlib.pyplot as plt
from pathlib import Path

KOK = Path(__file__).resolve().parents[2]   # proje kok klasoru

# --- Temel sinyal ---
N = 1000
t = np.linspace(0, 1, N)
temiz = np.sin(2 * np.pi * 5 * t)


def dogal_gurultu():
    return 0.1 * np.random.randn(N)


# --- Saldiri fonksiyonlari (onceki adimdaki gibi) ---
def surekli_jammer(guc):
    return guc * np.random.randn(N)


def darbe_jammer(guc):
    jammer = guc * np.random.randn(N)
    acik_mi = (np.floor(t * 10) % 2 == 0)
    return jammer * acik_mi


def ton_jammer(guc):
    return guc * np.sin(2 * np.pi * 40 * t)


# --- Enerji dedektoru ---
def enerji(sinyal):
    return np.mean(sinyal ** 2)


ESIK = 0.6  # Normal sinyalin enerjisi yaklasik 0.5

# 1) Saldiri yokken yanlis alarm veriyor mu?
yanlis_alarm = 0
for _ in range(500):
    if enerji(temiz + dogal_gurultu()) > ESIK:
        yanlis_alarm += 1
print("Yanlis alarm orani: %", yanlis_alarm / 500 * 100)

# 2) Her saldiri turunu farkli guclerde dene
guc_listesi = np.linspace(0, 1.5, 16)
saldirilar = [
    ("Surekli jammer", surekli_jammer),
    ("Darbe jammer", darbe_jammer),
    ("Tek ton jammer", ton_jammer),
]

plt.figure(figsize=(9, 5))
for ad, saldiri in saldirilar:
    oranlar = []
    for guc in guc_listesi:
        tespit = 0
        for _ in range(200):
            alinan = temiz + dogal_gurultu() + saldiri(guc)
            if enerji(alinan) > ESIK:
                tespit += 1
        oranlar.append(tespit / 200 * 100)
    plt.plot(guc_listesi, oranlar, marker="o", label=ad)

plt.title("Enerji dedektorunun basarisi")
plt.xlabel("Saldiri gucu")
plt.ylabel("Tespit orani (%)")
plt.legend()
plt.grid(True)
CIKTI = KOK / "gorseller" / "ogrenme"
CIKTI.mkdir(parents=True, exist_ok=True)
plt.savefig(CIKTI / "enerji_dedektoru.png", dpi=150)
plt.show()