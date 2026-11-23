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

> Güncel sonuçlar, grafikler ve tablolar `notebook/jamming-tespiti.ipynb` dosyasının içinde yer almaktadır.

## 📁 Dosya Yapısı

- `jamming-tespiti.ipynb` — tüm analiz (Kaggle notebook)
- `*.grc` — GNU Radio akış şemaları (sinyal üretimi)
- `*.csv` — öznitelik çıkarılmış veri
- `Jamming_Raporu.docx` — proje raporu
- `gorseller/` — grafikler

## 🔗 Veri Seti (ham I/Q .dat dosyaları)

Ham sinyal dosyaları (`.dat`) büyük olduğu için GitHub yerine Kaggle'da tutulmaktadır:

**Kaggle veri seti:** https://www.kaggle.com/datasets/senanurcolayr/jamming-dat-kanal

## ▶️ Nasıl Çalıştırılır

1. Kaggle'da notebook'u aç.
2. Sağ panelden yukarıdaki Kaggle veri setini ekle.
3. Hücreleri yukarıdan aşağıya çalıştır.

## 🛠️ Kullanılan Araçlar

GNU Radio Companion · Python · NumPy · pandas · scikit-learn (Random Forest, Isolation Forest) · matplotlib
