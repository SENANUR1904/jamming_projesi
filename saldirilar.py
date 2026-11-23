import numpy as np
import matplotlib.pyplot as plt

# --- Temel sinyal ve dogal gurultu ---
t = np.linspace(0, 1, 1000)
temiz = np.sin(2 * np.pi * 5 * t)
dogal_gurultu = 0.1 * np.random.randn(1000)
normal = temiz + dogal_gurultu


# --- Saldiri fonksiyonlari ---
def surekli_jammer(guc):
    # Her an guclu rastgele gurultu
    return guc * np.random.randn(1000)


def darbe_jammer(guc):
    # 0.1 saniye acik, 0.1 saniye kapali
    jammer = guc * np.random.randn(1000)
    acik_mi = (np.floor(t * 10) % 2 == 0)
    return jammer * acik_mi


def ton_jammer(guc):
    # 40 Hz'de tek bir guclu dalga
    return guc * np.sin(2 * np.pi * 40 * t)


# --- Dort durumu olustur ---
durumlar = [
    ("Normal (saldiri yok)", normal),
    ("Surekli jammer", normal + surekli_jammer(1.0)),
    ("Darbe jammer", normal + darbe_jammer(1.5)),
    ("Tek ton jammer", normal + ton_jammer(1.0)),
]

# --- Hepsini alt alta ciz ---
plt.figure(figsize=(10, 9))
for i, (baslik, sinyal) in enumerate(durumlar):
    plt.subplot(4, 1, i + 1)
    plt.plot(t, sinyal, color="red" if i > 0 else "blue")
    plt.title(baslik)
    plt.ylim(-5, 5)
    plt.grid(True)

plt.xlabel("Zaman (saniye)")
plt.tight_layout()
plt.savefig("saldiri_turleri.png", dpi=150)
plt.show()