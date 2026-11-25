import numpy as np
import matplotlib.pyplot as plt

# 1) Zamani olustur: 0 ile 1 saniye arasini 1000 parcaya bol
t = np.linspace(0, 1, 1000)

# 2) Frekans: dalganin saniyede kac kez inip ciktigi
frekans = 5

# 3) Sinyali hesapla
sinyal = np.sin(2 * np.pi * frekans * t)

# 4) Grafigini ciz
plt.plot(t, sinyal)
plt.title("Ilk Sinyalim")
plt.xlabel("Zaman (saniye)")
plt.ylabel("Genlik")
plt.grid(True)
plt.show()