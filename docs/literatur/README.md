# Literatür Taraması: Birleşik Dizin

Bu klasör, projeyle ilgili makaleleri konuya göre toplar. Beş ayrı tarama yapıldı; her klasörde ayrıntılı künye, durum ve "projeye ilgisi" notları içeren bir `KAYNAKLAR.md` vardır.

> **Dürüstlük notu:** Makalelerin künyeleri web kaynaklarından (arXiv, OpenAlex, Crossref, yayıncı sayfaları) doğrulandı. Ancak PDF'lerin **içi henüz okunmadı**: "projeye ilgisi" notları başlık ve özet düzeyindedir. Ayrıntılı inceleme bir sonraki adımdır.
> **Telif:** PDF'ler telifli olabileceğinden `.gitignore` ile GitHub'a gönderilmez (`docs/literatur/**/*.pdf`). Yalnızca bu dizin ve `KAYNAKLAR.md` dosyaları depoya girer.

## Analiz çıktıları (tam metin incelemesi)

- **Etkileşimli rapor:** [`../literatur_analizi_6g_makale_stratejisi.html`](../literatur_analizi_6g_makale_stratejisi.html): karşılaştırma tablosu, açık-küme durumu, 6G saldırı manzarası, makale seçenekleri, yol haritası ve makale taslağı.
- **Birleşik matris:** `karsilastirma_matrisi.csv` (Excel'de açılır) ve `matris_birlesik.json`: 119 makale, 27 alan.
- **Makale başına inceleme:** her klasörde `INCELEME_*.md` ve `matris_*.json`.
- **6G taraması:** `06_6g_tehdit_ve_bosluk/6G_TEHDIT_TARAMASI.md` ve `6g_saldirilar.json`.
- **Üretim betikleri:** `scripts/literatur/` (`matris_birlestir.py`, `rapor_olustur.py`).
- **İkinci tur** (`07_ikinci_tur_komsu_calismalar/`): Xu 2005 dahil 10 kayıt eklendi; birleşik tablo 129 kayıt. Kapalı erişimli ve okunamayanlar: **Hong, Kim, Lee 2023** (DOI 10.1109/LCOMM.2023.3275694), **Chong vd. 2026** (DOI 10.1109/ICCWorkshops63917.2026.11586537), Kurma vd. 2026 (embargolu), "Holding the Line" (Virginia Tech).
- Ajanlar çoğu makaleyi **kısmen** okudu; bir sayıyı atıf yapmadan önce PDF'ten doğrulayın.

## Klasör haritası

| Klasör | Konu | PDF |
|---|---|---:|
| `01_mevcut_kaynakca_ve_derlemeler` | Rapordaki kaynakçanın doğrulanması, derlemeler, klasik/ML jamming tespiti | 22 |
| `02_derin_ogrenme_iq_spektrogram` | I/Q ve spektrogramla DL tespit/sınıflandırma; 5G, UAV, **GNSS jammer sınıflandırması** | 22 |
| `03_acik_kume_anomali` | Açık-küme tanıma, bilinmeyen saldırı, anomali tespiti, Isolation Forest | 29 |
| `04_veri_setleri_simulatorler` | Jamming veri setleri, GNU Radio/USRP test yatakları, Sionna, sim-to-real | 22 |
| `05_savunma_markov_reaktif_jammer` | Markov/reaktif jammer, anti-jamming (RL, frekans atlama), 6G güvenlik, düşmanca ML | 25 |
| `06_6g_tehdit_ve_bosluk` | 6G tehdit manzarası ve yenilik taraması (yalnızca analiz dosyaları) | — |
| `07_ikinci_tur_komsu_calismalar` | İkinci tur: Hong 2023 ve atıf izleme, komşu çalışmalar (Huso, Aissou, Hoffmann, Chou, Yildirim), 6G kaynak doğrulama, Xu 2005, yenilik tekrar taraması | 6 |
| **Toplam** | | **126** |

## Rapordaki kaynakçada bulunan hata

- **#13 (WSN-DS):** Rapordaki arXiv numarası (2104.01963) yanlış; o numara Alsulaiman & Al-Ahmadi'nin başka bir makalesine ait. Doğru künye: Almomani, Al-Kasasbeh, AL-Akhras, "WSN-DS: A Dataset for Intrusion Detection Systems in Wireless Sensor Networks", *Journal of Sensors*, 2016, Art. 4731953, DOI 10.1155/2016/4731953.
- Diğer 15 maddenin künyesi doğru; yalnızca bazılarında yayın yeri eksik ya da güncel değil (ör. Pirayesh: IEEE COMST 24(2), 2022; Varotto: IEEE ICC Workshops 2024; Hachimi: ISNCC 2020; Viana: IEEE OJ-COMS 2025). Ayrıntı: `01_.../KAYNAKLAR.md` → "Kaynakça Doğrulama".

## Hâlâ indirilmesi gerekenler (32 makale)

Yayıncı siteleri otomatik istemcilere PDF vermedi (IEEE, MDPI, Wiley, ACM vb.). Tarayıcıdan ya da kurum erişimiyle indirip ilgili klasöre koyabilirsiniz. ★ = projeye özellikle önemli. Bir makaleyi indirdikten sonra kutuyu işaretleyin.

### Analiz sırasında fark edilen eksik (öncelikli)
- [ ] ★★ Hong, Kim, Lee (2023), *A Hybrid Jamming Detection Algorithm for Wireless Communications: Simultaneous Classification of Known Attacks and Detection of Unknown Attacks*, IEEE Communications Letters 27(7), 1769–1773. Karar ağacı + Isolation Forest; projenin mimarisine en yakın öncül. Lohan derlemesinde [42] olarak atıf yapılıyor; hiçbir ajan bulmadı. [KAIST sayfası](https://ee.kaist.ac.kr/ai-in-communication/a-hybrid-jamming-detection-algorithm-for-wireless-communications-simultaneous-classification-of-known-attacks-and-detection-of-unknown-attacks/) (DOI doğrulanamadı)

### 01 — Kaynakça ve derlemeler
- [ ] ★ Liu, Ting, Zhou (2008), **Isolation Forest**, IEEE ICDM. Projenin temel yöntemi (Aşama 1). [DOI](https://doi.org/10.1109/ICDM.2008.17)
- [x] ★ Lohan ve ark. (2024), *From 5G to 6G Networks: A Survey on AI-Based Jamming and Interference Detection and Mitigation*, IEEE OJ-COMS. En öncelikli eksik derleme. [DOI](https://doi.org/10.1109/OJCOMS.2024.3416808)
- [x] ★ Xu, Trappe, Zhang, Wood (2005), *The Feasibility of Launching and Detecting Jamming Attacks in Wireless Networks*, MobiHoc. Alanın temel makalesi. [DOI](https://doi.org/10.1145/1062689.1062697)
- [ ] Fink ve ark. (2025), *Jamming Detection and Classification on Physical Layer with a Minimized CNN Model*, CommNet. [DOI](https://doi.org/10.1109/CommNet68224.2025.11288873)
- [x] Alhazbi, Sciancalepore, Oligeri (2023), *A Dataset of Physical-Layer Measurements in Indoor Wireless Jamming Scenarios*, Data in Brief. Açık erişimli. [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC9720428/) (ham I/Q: <https://doi.org/10.5281/zenodo.7119039>)
- [x] Almomani, Al-Kasasbeh, AL-Akhras (2016), *WSN-DS*, Journal of Sensors (CC BY). [DOI](https://doi.org/10.1155/2016/4731953)
- [x] Radoš, Brkić, Begušić (2024), *Recent Advances on Jamming and Spoofing Detection in GNSS*, Sensors. Açık erişimli. [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11244045/)
- [x] Zahra, Bostanci, Soyturk (2023), *Real-Time Jamming Detection in Wireless IoT Networks*, IEEE Access. [DOI](https://doi.org/10.1109/ACCESS.2023.3293404)
- [ ] Greco, Pace, Basagni, Fortino (2021), *Jamming detection at the edge of drone networks using MLP and Decision Trees*, Applied Soft Computing. [DOI](https://doi.org/10.1016/j.asoc.2021.107806)

### 03 — Açık-küme ve anomali
- [ ] ★ Scheirer, Rocha, Sapkota, Boult (2013), *Toward Open Set Recognition*, IEEE TPAMI. Açık-küme alanının kurucu makalesi. [DOI](https://doi.org/10.1109/TPAMI.2012.256)
- [ ] Zhou ve ark. (2022), *Intelligent Radar Jamming Recognition in Open Set Environment Based on Deep Learning Networks*, Remote Sensing (CC-BY). [DOI](https://doi.org/10.3390/rs14246220) · [sayfa](https://www.mdpi.com/2072-4292/14/24/6220)

### 04 — Veri setleri ve simülatörler
- [ ] ★ Ali ve ark. (2024), *RF Jamming Dataset: A Wireless Spectral Scan Approach for Malicious Interference Detection*, IEEE ComMag. [DOI](https://doi.org/10.1109/mcom.003.2300483) · [TechRxiv](https://doi.org/10.36227/techrxiv.21524508)
- [ ] ★ Jacovic ve ark. (2022), *Mitigating RF jamming attacks at the physical layer with machine learning*, IET Communications. [DOI](https://doi.org/10.1049/cmu2.12461)
- [ ] ★ Testi, Arcangeloni, Giorgetti (2023), *Machine Learning-Based Jamming Detection and Classification in Wireless Networks*, ACM WiseML. [DOI](https://doi.org/10.1145/3586209.3591395)
- [ ] Ali ve ark. (2022), *JamRF: Performance Analysis, Evaluation, and Implementation of RF Jamming Over Wi-Fi*, IEEE Access. [DOI](https://doi.org/10.1109/access.2022.3230895)
- [ ] Perković ve ark. (2021), *Low-Cost Implementation of Reactive Jammer on LoRaWAN Network*, Electronics. [MDPI](https://www.mdpi.com/2079-9292/10/7/864)
- [ ] Nawaz, Alzahrani (2023), *ML-Assisted Cyclostationary Spectral Analysis for Joint Signal Classification and Jammer Detection*, Sensors. [MDPI](https://www.mdpi.com/1424-8220/23/16/7144) · [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC10459740/)
- [ ] Alhazbi, Sciancalepore, Oligeri (2023), *BloodHound: Early Detection and Identification of Jamming at the PHY-layer*, IEEE CCNC. [DOI](https://doi.org/10.1109/ccnc51644.2023.10059878)
- [ ] Gül, Kulhandjian, Kantarcı (2024), *On the Impact of CDL and TDL Augmentation for RF Fingerprinting Under Impaired Channels*, Wireless World. [DOI](https://doi.org/10.13052/2794-7254.006)

### 05 — Savunma, Markov ve reaktif jammer
- [ ] ★ Zhang, Mao, Zhang (2022), *Reactive Jamming Detection Based on Hidden Markov Model*, IEEE/CIC ICCC. Markov tabanlı jammer'a en yakın tespit çalışması. [DOI](https://doi.org/10.1109/ICCC55456.2022.9880644) (açık PDF bulunamadı)
- [ ] ★ Peng, Wang, Luo (2021), *Optimal frequency-hopping anti-jamming strategy based on multi-step prediction MDP*, Wireless Networks. [DOI](https://doi.org/10.1007/s11276-021-02735-7) (açık PDF bulunamadı)
- [ ] Zhou, Niu (2024), *From Adaptive to Intelligent Communication Anti-Jamming: 50 Years of Evolution*, Advanced Intelligent Systems. [DOI](https://doi.org/10.1002/aisy.202300853)
- [ ] Mucchi ve ark. (2021), *Physical-Layer Security in 6G Networks*, IEEE OJ-COMS (açık erişimli dergi). [DOI](https://doi.org/10.1109/OJCOMS.2021.3103735)
- [ ] Savadatti ve ark. (2024), *An Extensive Classification of 5G Network Jamming Attacks*, Security and Communication Networks. [DOI](https://doi.org/10.1155/2024/2883082)
- [ ] Arcangeloni, Testi, Giorgetti (2023), *Detection of Jamming Attacks via Source Separation and Causal Inference*, IEEE Trans. Commun. [DOI](https://doi.org/10.1109/TCOMM.2023.3281467)
- [ ] Aich ve ark. (2025), *Bi-Scale Mahalanobis Detection for Reactive Jamming in UAV OFDM Links*, Future Internet. [DOI](https://doi.org/10.3390/fi17100474)
- [ ] Bout ve ark. (2023), *Evaluation of Channel Hopping Strategies Against Smart Jamming Attacks*, IEEE ICC. [HAL](https://hal.science/hal-03950904)
- [ ] Zhou, Li, Niu (2020), *A Countermeasure Against Random Pulse Jamming in Time Domain Based on RL*, IEEE Access. [DOI](https://doi.org/10.1109/ACCESS.2020.2996804)
- [ ] Gao ve ark. (2019), *Anti-Intelligent UAV Jamming Strategy via Deep Q-Networks*, IEEE Trans. Commun. [DOI](https://doi.org/10.1109/TCOMM.2019.2947918)
- [ ] Ibrahim, Ng, Qureshi (2021), *Anti-Jamming Game to Combat Intelligent Jamming for Cognitive Radio Networks*, IEEE Access (açık erişimli dergi). [DOI](https://doi.org/10.1109/ACCESS.2021.3117563)
- [ ] Li ve ark. (2019), *On the Performance of DRL-Based Anti-Jamming Method Confronting Intelligent Jammer*, Applied Sciences. [DOI](https://doi.org/10.3390/app9071361)
- [ ] Abou El Houda, Moudoud, Brik (2024), *Federated DRL for Efficient Jamming Attack Mitigation in O-RAN*, IEEE TVT. [DOI](https://doi.org/10.1109/TVT.2024.3359998) (açık PDF bulunamadı)

### Ek adaylar (açık PDF bulunamadı; künyeleri `02_.../KAYNAKLAR.md` notlarında)
Chen ve ark. (TAES 2022), Yoo ve ark. (2022), **Walczyna & Piotrowski (2026; el yapımı öznitelik + hafif model, bizim yaklaşıma çok yakın)**, Irfan ve ark. (MDPI 2025).

## Açık veri setleri (indirilmedi, yalnızca bağlantı)

| Veri seti | Bağlantı |
|---|---|
| Alhazbi ham I/Q (7 USRP X310, kapalı mekan) | <https://doi.org/10.5281/zenodo.7119039> |
| WiFiSpectralJam (Kaggle) | <https://www.kaggle.com/datasets/daniaherzalla/radio-frequency-jamming/data> |
| S-ICDF (Sionna, Fraunhofer) | <https://gitlab.cc-asp.fraunhofer.de/darcy_gnss/sicdf_dataset> |
| Jammertest 2025 (GNSS) | <https://doi.org/10.5281/zenodo.21332688> |
| Spectrum Highway Dataset 2 (GNSS) | <https://doi.org/10.5281/zenodo.21336652> |
| Spectrum & Low-Cost Laboratory Dataset (GNSS) | <https://doi.org/10.5281/zenodo.21333334> |
| GNSS GPS jamming ham I/Q (Swinney, Woods) | <https://doi.org/10.5281/zenodo.4629684> |
| "On Jamming Protection" veri seti (içeriği doğrulanamadı) | <https://doi.org/10.5281/zenodo.18254046> |
| CSRD2025 (kod ve veri) | <https://github.com/Singingkettle/ChangShuoRadioData> |
| Schösser OFDMA anomali veri seti | <https://doi.org/10.5281/zenodo.20341905> |

## Bilinen boşluklar ve açık noktalar

- **Birinci derece Markov jammer'ı doğrudan konu alan makale neredeyse yok.** En yakınlar: Jia 2022 (indirildi), Peng 2021 ve Zhang 2022 (indirilemedi). Projedeki Markov modellemesi için bir fırsat olabilir.
- **LoRa/IoT'de sweep/pulse/constant ayrımı yapan ML çalışması bulunamadı.**
- **"%100 doğruluk / ezberleme" sorununu doğrudan tartışan jamming makalesi bulunamadı;** dolaylı kaynaklar: Scholl 2022, Clark 2021, Tao 2026, Viana 2022 (`04_`).
- Klasik **enerji dedektörü** temel makalesi (ör. Urkowitz) aranmadı.
- **Wang vd. (2022, IoT'de darbeli jamming, `01_`)**: arXiv sayfasında başka bir makaleyle (1603.05305) metin örtüşmesi notu var; atıf yaparken dikkat edilmeli.
- MATLAB 5G Toolbox ile jamming veri seti üreten ve RML2016/GNU Radio veri üretimini anlatan (O'Shea & West 2016) makale bulunamadı.
- Alhazbi Data in Brief makalesi yayıncı kaydında **2022** görünüyor (DOI 10.1016/j.dib.2022.108773); raporda 2023 yazıyor, kontrol edilmeli.
- Bazı kayıtların hakemli yayın yeri doğrulanamadı ("arXiv ön baskı" olarak işaretli). Atıf yapmadan önce güncel durumu kontrol edin.
- arXiv ve Semantic Scholar API'leri paralel aramalarda hız sınırı verdi; tarama ağırlıklı olarak OpenAlex ile yapıldı, kapsam eksik kalmış olabilir.
