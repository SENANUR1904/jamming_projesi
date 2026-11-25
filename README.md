# Fiziksel Katman Jamming (Karıştırma) Tespiti ve Sınıflandırması

GNU Radio ile üretilmiş gerçekçi RF verisi üzerinde, kablosuz ağlardaki **jamming (karıştırma) saldırılarını** tespit eden ve türünü belirleyen iki aşamalı bir makine öğrenmesi sistemi. Ayrıca eğitimde hiç görülmemiş bir saldırı türünün yakalanıp yakalanamadığı (**açık-küme / open-set**) test edilmektedir.

**Hazırlayan:** Senanur Çolayır — Bingöl Üniversitesi
**Ders:** Kablosuz ve Mobil Ağlar

---

## 🎯 Projenin Özeti

- **Veri:** GNU Radio Companion ile 5 sınıf sinyal üretilir (1 normal + 4 jammer türü: constant, tone, sweep, pulse). Çok yollu sönümlemeyi modelleyen bir kanal modeli ile gerçekçi hale getirilir ve ham I/Q (complex64) formatında kaydedilir.
- **Öznitelik:** Her sinyal 1024 örneklik pencerelere bölünür ve her pencereden istatistiksel/spektral öznitelikler çıkarılır.
- **İki aşamalı sistem:**
  - **Aşama 1 — Saldırı var mı?** Anomali tespiti (Isolation Forest) + denetimli Random Forest.
  - **Aşama 2 — Hangi tür?** Random Forest ile jammer türü sınıflandırması.
- **Açık-küme (yenilik):** Bir saldırı türü eğitimden saklanarak, sistemin daha önce görmediği saldırıları yakalayıp yakalayamadığı test edilir.

> Güncel sonuçlar, grafikler ve tablolar `notebooks/jamming_tespiti.ipynb` dosyasının içinde yer almaktadır.

## 📁 Klasör Yapısı

```
jamming_projesi/
├── README.md
├── requirements.txt
├── gnuradio/                      # GNU Radio Companion akış şemaları (sinyal üretimi)
│   ├── 1_normal.grc ... 5_pulse.grc   #   her sınıf için bir şema -> <sinif>.dat
│   └── jamming_simulasyon.grc/.py     #   birleşik şema ve ürettiği Python kodu
├── notebooks/
│   └── jamming_tespiti.ipynb      # Ana analiz (Kaggle notebook)
├── src/
│   ├── ogrenme/                   # Adım adım temel kavramlar
│   │   ├── sinyal1.py             #   1) Temel sinüs sinyali
│   │   ├── sinyal2_gurultu.py     #   2) Gürültü ve SNR
│   │   ├── saldirilar.py          #   3) Jammer türleri (sürekli, darbe, ton)
│   │   └── enerji_dedektoru.py    #   4) Basit enerji tabanlı dedektör
│   └── veri_uretimi/              # Yapay veri üreticileri
│       ├── veri_seti_uret.py      #   Dengeli veri seti  -> data/jamming_veri_seti.csv
│       └── simulasyon_motoru.py   #   Markov tabanlı simülasyon -> data/simulasyon_verisi.csv
├── scripts/
│   ├── ortam_kontrol.py           # Kütüphane sürümlerini kontrol eder
│   └── rapor_verisi/              # Etkileşimli raporun verisini üreten betikler + şablon
├── data/                          # Üretilen CSV'ler (git'e girmez)
├── gorseller/
│   ├── ogrenme/                   # Öğrenme adımlarının grafikleri
│   └── veri_uretimi/              # Veri üreticilerinin örnek grafikleri
└── docs/
    ├── Jamming_Raporu_v2.docx     # Yazarın proje raporu
    ├── jamming_simulasyon_raporu.html   # Etkileşimli rapor: simülasyon, veri, modeller (tarayıcıda açın)
    └── rapor_gorselleri/          # Rapordaki şekiller
```

> Ham I/Q `.dat` dosyaları depoda tutulmaz (büyük); Kaggle'dadır. Şemalardan yeniden üretilebilirler.

## 🔗 Veri Seti (ham I/Q .dat dosyaları)

Ham sinyal dosyaları (`.dat`) büyük olduğu için GitHub yerine Kaggle'da tutulmaktadır:

**Kaggle veri seti:** https://www.kaggle.com/datasets/senanurcolayr/jamming-dat-kanal

## ▶️ Nasıl Çalıştırılır

**Ana analiz (Kaggle):**
1. Kaggle'da `notebooks/jamming_tespiti.ipynb` dosyasını aç.
2. Sağ panelden yukarıdaki Kaggle veri setini ekle.
3. Hücreleri yukarıdan aşağıya çalıştır.

**GNU Radio ile veri üretimi (radioconda / GNU Radio Companion 3.10):**
1. `gnuradio/*.grc` dosyalarından birini GNU Radio Companion'da açın.
2. **File Sink** bloğundaki yolu kendi bilgisayarınıza göre değiştirin (şemalarda `D:\jamming_projesi\gnuradio_veriler\...` yazıyor).
3. `jammer_amp` kaydırıcısıyla gücü değiştirerek ▶ (F6) ile çalıştırın; sınıf başına bir `.dat` oluşur.

**Yerel betikler:**
```bash
pip install -r requirements.txt
python scripts/ortam_kontrol.py              # kurulum kontrolü
python src/ogrenme/enerji_dedektoru.py       # öğrenme adımları
python src/veri_uretimi/veri_seti_uret.py    # data/ klasörüne CSV üretir
python src/veri_uretimi/simulasyon_motoru.py
```
Betikler hangi klasörden çalıştırılırsa çalıştırılsın çıktıları `data/` ve `gorseller/` altına yazar.

## 🛠️ Kullanılan Araçlar

GNU Radio Companion · Python · NumPy · pandas · scikit-learn (Random Forest, Isolation Forest) · matplotlib
