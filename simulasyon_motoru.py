import numpy as np
import pandas as pd
import random
import matplotlib.pyplot as plt

# ============================================================
# KABLOSUZ KANAL - MARKOV TABANLI JAMMING SIMULASYONU
# Saldirgan 2 durumlu bir Markov zinciri:
#   SAKIN  -> %85 sakin kal, %15 saldiriya gec
#   SALDIRI-> %82 saldirmaya devam, %18 sakinles
# Gecis matrisi:  P = [[0.85, 0.15],
#                      [0.18, 0.82]]
# Boylece saldirilar OBEKLER (burst) halinde gelir -> gercekci
# ============================================================

class KablosuzKanalSimulasyonu:
    def __init__(self, orneklem_sayisi=1000):
        self.fs = orneklem_sayisi
        self.t = np.linspace(0, 1, self.fs, endpoint=False)
        self.veri_seti = []
        self.etiketler = []

        # --- Markov gecis olasiliklari ---
        self.p_sakin_to_saldiri = 0.15   # sakinken saldiriya gecme
        self.p_saldiri_to_sakin = 0.18   # saldiridayken sakinlesme

        # 0=Normal, 1=Surekli, 2=Darbe, 3=Tek_ton, 4=Supurme, 5=Reactive
        self.etiket_isimleri = {
            0: "Normal", 1: "Surekli", 2: "Darbe",
            3: "Tek_ton", 4: "Supurme", 5: "Reactive"
        }

    # ---- Yasal cihazin normal sinyali (5 Hz sinus + ortam gurultusu) ----
    def normal_sinyal_uret(self):
        snr_db = random.uniform(0, 18)                      # DAHA GENIS: normal bazen daha gurultulu
        sig = np.sin(2 * np.pi * 5 * self.t)
        gurultu = np.sqrt(10 ** (-snr_db / 10)) * np.random.randn(self.fs)
        return sig + gurultu

    # ---- 5 cesit jammer (gucu her seferinde rastgele) ----
    def saldiri_uret(self, tur, normal):
        jnr_db = random.uniform(-6, 9)                      # DUSUK+CAKISAN guc: bazi saldirilar cılız/zor
        guc = np.sqrt(10 ** (jnr_db / 10))

        if tur == 1:   # Surekli
            return guc * np.random.randn(self.fs)
        elif tur == 2: # Darbe
            darbe = (np.sin(2 * np.pi * 2 * self.t) > 0).astype(int)
            return guc * np.random.randn(self.fs) * darbe
        elif tur == 3: # Tek ton
            frekans = random.uniform(15, 85)                # GENIS aralik: supurme ile cakissin
            return guc * np.sin(2 * np.pi * frekans * self.t)
        elif tur == 4: # Supurme
            faz = 2 * np.pi * (10 * self.t + (100 - 10) / 2 * self.t**2)
            return guc * np.sin(faz)
        elif tur == 5: # Reactive
            esik = np.abs(normal) > np.mean(np.abs(normal))
            return guc * np.random.randn(self.fs) * esik
        
    # ---- Simulasyonu calistir ----
    def simulasyonu_baslat(self, toplam_adim=8000):
        print("Simulasyon basladi: Ag dinleniyor (Markov zinciri akiyor)...\n")

        durum = "SAKIN"          # baslangic durumu
        aktif_saldiri = None     # saldiri turu (bir burst boyunca sabit kalir)

        for adim in range(toplam_adim):
            normal = self.normal_sinyal_uret()

            # --- MARKOV GECISI: sonraki durum SADECE su anki duruma bagli ---
            zar = random.random()
            if durum == "SAKIN":
                if zar < self.p_sakin_to_saldiri:
                    durum = "SALDIRI"
                    aktif_saldiri = random.choice([1, 2, 3, 4, 5])  # yeni obek, yeni tur
            else:  # SALDIRI
                if zar < self.p_saldiri_to_sakin:
                    durum = "SAKIN"
                    aktif_saldiri = None

            # --- Duruma gore sinyali olustur ---
            if durum == "SAKIN":
                sinyal = normal
                etiket = 0
            else:
                sinyal = normal + self.saldiri_uret(aktif_saldiri, normal)
                etiket = aktif_saldiri

            # Alici sinyali yakalar ve kaydeder
            self.veri_seti.append(sinyal)
            self.etiketler.append(etiket)

            if adim % 1000 == 0:
                print(f"  Adim {adim}/{toplam_adim} ... (su anki durum: {durum})")

        self.veriyi_kaydet()
        self.ornekleri_ciz()

    # ---- CSV'ye kaydet ----
    def veriyi_kaydet(self):
        df = pd.DataFrame(self.veri_seti)
        df.columns = [f"ornek_{i}" for i in range(self.fs)]
        df["Etiket"] = self.etiketler
        df.to_csv("simulasyon_verisi.csv", index=False)

        print("\nSimulasyon bitti. Veri 'simulasyon_verisi.csv' olarak kaydedildi.")
        print(f"Toplam {len(df)} satir. Sinif dagilimi:\n")
        sayim = df["Etiket"].value_counts().sort_index()
        for e, adet in sayim.items():
            print(f"  {e} - {self.etiket_isimleri[e]:10s}: {adet} ornek")

    # ---- Her turden bir ornek ciz (gozle dogrula) ----
    def ornekleri_ciz(self):
        plt.figure(figsize=(10, 12))
        for e in range(6):
            if e in self.etiketler:
                idx = self.etiketler.index(e)
                plt.subplot(6, 1, e + 1)
                plt.plot(self.t, self.veri_seti[idx],
                         color="blue" if e == 0 else "red")
                plt.title(self.etiket_isimleri[e])
                plt.ylim(-6, 6)
                plt.grid(True)
        plt.xlabel("Zaman (saniye)")
        plt.tight_layout()
        plt.savefig("simulasyon_ornekleri.png", dpi=150)
        plt.show()


# ============================================================
# SIMULASYONU CALISTIR (sistem bu 2 satirla baslar)
# ============================================================
sim = KablosuzKanalSimulasyonu(orneklem_sayisi=1000)
sim.simulasyonu_baslat(toplam_adim=8000)