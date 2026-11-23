import numpy as np
import matplotlib.pyplot as plt

# 1) Temiz sinyal (onceki adimdaki gibi)
t = np.linspace(0, 1, 1000)
temiz = np.sin(2 * np.pi * 5 * t)

# 2) Gurultu uret: rastgele sayilar
gurultu_seviyesi = 0.3
gurultu = gurultu_seviyesi * np.random.randn(1000)

# 3) Alicinin gordugu sinyal = temiz + gurultu
alinan = temiz + gurultu

# 4) SNR hesapla: sinyal gurultuden ne kadar guclu?
sinyal_gucu = np.mean(temiz ** 2)
gurultu_gucu = np.mean(gurultu ** 2)
snr_db = 10 * np.log10(sinyal_gucu / gurultu_gucu)
print("SNR:", round(snr_db, 1), "dB")

# 5) Iki grafigi alt alta ciz
plt.figure(figsize=(10, 6))

plt.subplot(2, 1, 1)
plt.plot(t, temiz, color="blue")
plt.title("Gonderilen temiz sinyal")
plt.grid(True)

plt.subplot(2, 1, 2)
plt.plot(t, alinan, color="red")
plt.title("Alicinin gordugu sinyal (SNR = " + str(round(snr_db, 1)) + " dB)")
plt.xlabel("Zaman (saniye)")
plt.grid(True)

plt.tight_layout()
plt.show()