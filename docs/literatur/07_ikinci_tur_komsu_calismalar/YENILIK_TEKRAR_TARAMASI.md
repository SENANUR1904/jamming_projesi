# Yenilik Tekrar Taramasi (2. tur, komsu calismalar) - K-A ... K-F ve "birlesik yol"

Tarih: 2026-11-25. Bu belge **sistematik tarama degildir**; secici, sorgu-tabanli bir komsu-calisma yoklamasidir. "Yok" iddiasi **yoktur**; yalnizca "bu aramalarda bulunamadi" denir. Hicbir PDF indirilmedi; yalnizca kunye, baglanti ve ozet bilgisi kaydedildi.

Dogrulama duzeyleri:
- **[A]** arXiv kaydi (ozet/metadata) bu oturumda okundu (arXiv API Atom kaydi veya arxiv.org/abs|html sayfasi). Yalnizca ozet okundu, tam metin degil.
- **[W]** yayinci/depo/sunucu sayfasi (Univ. of Arizona, BIT Pure, Zenodo) bu oturumda okundu.
- **[S2]** yalnizca Semantic Scholar kaydi (kunye) goruldu.
- **[S]** yalnizca web arama ozeti goruldu (ozet bir arac tarafindan uretilmis olabilir; kunyeyi ve ayrintilari kesin saymayin).
- **[O]** yalnizca OpenAlex: bu turda **hic kullanilamadi** (asagida).

Onceki turda bulunanlar (Hong-Kim-Lee 2023, Schosser 2026, Zhong 2025, Bouferroum/CITADEL 2026, Ebrahimi-Mehr 2024, Sciancalepore 2023, Varotto 2024) tekrar aranmadi; yalnizca karsilastirma icin gerektiginde anildi. Bunlarin icerigi bu turda yeniden dogrulanmadi (Hong-Kim-Lee icin yalniz Semantic Scholar kaydi + arama ozeti, CITADEL ve Schosser icin arXiv ozeti okundu).

---

## 1. Erisim durumu (dürüst not)

| Kaynak | Durum |
|---|---|
| OpenAlex API | **HTTP 429 / "daily_budget" kotasi dolu** (ilk denemede). Hic sonuc alinamadi. |
| arXiv | `export.arxiv.org` API ile ~73 alan-sorgusu (abs:/all:) calistirildi; ozetler id_list ile okundu. |
| Semantic Scholar | 2 sorgu basarili, sonrasinda 429 (6 sorgu kaybedildi). |
| WebSearch | 27 sorgu ("extended" modu ~12 sorguda kullanildi). |
| IEEE Xplore | **Erisim yok** (WebFetch HTTP 418). IEEE yayinlari yalniz arama ozeti / Semantic Scholar / baska sayfalar uzerinden goruldu. |
| Scopus / Web of Science | **Erisim yok**, denenmedi. |
| MDPI | WebFetch HTTP 403 (Cibecchini 2025 sayfasi okunamadi). |
| Google Scholar | Kullanilmadi (istek geregi). |

Onemli sonuc: arXiv disindaki (IEEE/Elsevier) yayinlar bu taramada yapisal olarak az goruldu; "bulunamadi" ifadeleri bu yanliligi tasir.

---

## 2. Denenen sorgular (sorgu: sonuc sayisi / bulgu)

### 2.1 arXiv API (abs: alani, AND ile; arXiv'in tirnakli ifade eslesmesi cok kati oldugundan dusuk sayilar "yok" demek degildir)

**Hibrit / bilinen+bilinmeyen / one-class / acik-kume (Konu 1, 2)**
1. all:jamming AND all:isolation AND all:forest: 0
2. all:jammer AND all:unknown AND all:detection: 10 (cogu radar/gurultu-benzeri jammer algilama; ilgisiz)
3. abs:jamming AND "isolation forest": 0 | 4. abs:jammer AND "isolation forest": 0
5. abs:jamming AND "one-class": 2 -> Hanegraaf 2025 (2505.19633), Huso 2026 (2611.08118)
6. jamming AND autoencoder AND unknown: 1 -> 2201.01388 (ilgisiz/zayif)
7. jamming AND "open-set": 4 -> CITADEL; JointHRRP-Net (radar, 2605.22857; ilgisiz alan)
8. jammer AND "open set": 0
9. jamming AND "zero-day": 2 -> CITADEL; **Aissou-Chou-Kim 2609.21334 (yeni)**
10. jamming AND "unseen": 14 -> SAJD (2511.17519, 2510.09706), Ott 2402.09466 (GNSS few-shot), CITADEL; gerisi ilgisiz
11. jamming AND "out-of-distribution": 4 -> **Baweja 2606.22054 (GNSS, yeni)**; gerisi ilgisiz
12. jamming AND "unknown jamming": 4 -> anti-jamming RL makaleleri (ilgisiz)
13. jamming AND "new jamming": 5 -> Pourranjbar 2021 (2112.11222, tur tanima, kapali-kume)
14. jamming AND "unknown attack": 0 | 15. jamming AND "novelty detection": 0
16. jamming AND "semi-supervised": 2 -> Heublein 2410.14686 (GNSS)
17. interference AND "open-set" AND wireless: 2 -> 2405.05022, 2302.03749 (modulasyon/sinyal siniflandirma, jamming degil)
18. "open set recognition" AND signal AND jamming: 0
19. jamming AND classification AND unknown AND "I/Q": 0
20. jamming AND "random forest" AND anomaly: 0
21. interference AND "anomaly detection" AND "I/Q" AND "unseen": 0
22. jamming AND "two-stage": 16 -> Kuili 2501.15288, CITADEL (diger ilgisiz fizik/robotik)
23. jamming AND "hierarchical" AND detection AND classification: 1 (CITADEL)
24. jamming AND "Mahalanobis": 1 (ilgisiz) | 25. jamming AND "conformal": 18 (cogu granuler-jamming fizigi; ilgisiz)

**Tutulan/leave-one-out (Konu 2)**
26. jamming AND "leave-one": 4 -> **Gopal et al. (NIST) 2611.04369, 2610.20816, 2611.04330 (yeni)**; 2611.07356 (akustik, ilgisiz)
27. jammer AND "held-out": 1 -> JaGNet (GNSS, 2509.14000)

**5G/OFDM, izgaraya hizali (Konu 3, 7)**
28. jamming AND "anomaly detection" AND 5G: 5 -> Wang 2311.17097, Schosser, Alaimo 2606.14465, Kouchaki 2411.03365, Gopal 2610.20816
29. jamming AND "anomaly detection" AND "I/Q": 1 -> Kouchaki
30. jamming AND "pilot" AND OFDM AND detection: 1 (2606.28778, alici tarafi kanal kestirimi; zayif)
31. jamming AND "SSB" AND 5G: 7 -> Asemian 2403.02645, Kuili 2506.15075, 2605.01705, Halenka 2603.07336, Asemian 2411.05131, Ashik 2607.16102
32. jamming AND "synchronization signal" AND detection: 5 (ayni kume)
33. jamming AND "PBCH": 1 | 34. jamming AND DMRS: 0 | 35. jamming AND "protocol-aware": 3 (ilgisiz/zayif)
36. jamming AND "URLLC" AND detection: 3 -> Chiarello 2106.07970, Hoffmann 2609.18499, Schosser
37. jamming AND unsupervised AND 5G: 7 -> Wang 2311.17097, Gopal 2611.04369, Kuili 2501.15288, Varotto 2405.10331, Arcangeloni 2410.01632, Schosser, SAJD
38. jamming AND "6G" AND detection AND learning: 2 | 39. jamming AND "digital twin" AND detection AND 5G: 1 (Schosser)
40. jamming AND dataset AND "I/Q" AND 5G: 1 | 41. jamming AND dataset AND OFDM: 1 (Kuili 2506.15075)
42. jamming AND "over-the-air" AND detection AND "machine learning": 3 | 43. "spectrum anomaly" AND detection: 5
44. jamming AND "autoencoder" AND normal AND OFDM: 1 (Arcangeloni) | 45. jamming AND "reactive" AND "5G" AND detection: 3
46. jamming AND "low duty cycle": 0 | 47. jamming AND "pulsed" AND detection AND OFDM: 0
48. jamming AND "smart jammer"/OFDM/learning: 0 | 49. jamming AND "unknown" AND "classes" AND wireless AND "deep learning": 0
50. jamming AND O-RAN AND classification AND "I/Q": 0
51. "Holding the Line" (baslik): 1 (ilgisiz)

**Sirali / Markov / reaktif (Konu 6)**
52. jamming AND CUSUM: 0 | 53. jammer AND "hidden Markov": 0 | 54. jamming AND "change-point": 0
55. reactive AND jammer AND detection: 8 -> hepsi savunma/RL/ceza tarafi (Huynh 2105.01308, 2005.07034; An-Weber 1809.04263; Sagduyu 2510.02265), tespit-siralisi yok
56. jamming AND quickest: 1 (ilgisiz) | 57. jammer AND sequential AND detection AND "false alarm": 0
58. jamming AND "sequential probability ratio": 0 | 59. jamming AND "detection delay": 2 (ilgisiz)
60. jamming AND "intermittent" AND detection: 2 (ilgisiz) | 61. jamming AND "Markov" AND detection AND learning: 1 (ilgisiz)
62. jamming AND "time-varying" AND jammer AND detection AND I/Q: 0

**Simulasyondan gercege / alan kaymasi / kalibrasyon / hafiflik / veri seti (Konu 4, 5, 7, 8)**
63. jamming AND "sim-to-real": 1, "simulation-to-real": 8 (hepsi ilgisiz: robotik/granuler)
64. jamming AND "domain shift": 2 (Fard UWB 2511.01819; Heublein 2608.15819) | "domain adaptation": 3 (radar; ilgisiz) | "cross-domain": 3 (Raichur 2607.02537 GNSS/NLOS)
65. jamming AND "false alarm" AND calibrat*: 0 | jamming AND "false positive rate" AND threshold AND unsupervised: 0
66. jamming AND lightweight AND detection AND CPU: 0 | jamming AND TinyML: 1 (2606.05779, uzay aracı; kenar)
67. jamming AND "GNU Radio" AND detection: 2 (GNSS/UAV saldiri tarafi; ilgisiz)
68. jamming AND Sionna: 3 -> PyJama 2407.15473, S-ICDF 2607.03411 (ikisi de simulator/veri, tespit-OOD degil)

### 2.2 WebSearch (27 sorgu; "extended" = E)
1. (E) hibrit jamming tespiti known + unknown, isolation forest + karar agaci, Commun. Lett. -> Hong-Kim-Lee dogrulandi; Cibecchini 2025 (drone IF); CITADEL; Shi 2019 (1909.11800)
2. (E) open-set jamming recognition I/Q -> radar odakli: Remote Sens. 2022 (OpenMax), Remote Sens. 2023 (open-world), Appl. Sci. 2022 (prototip), PLOS ONE 2025 (Zhong); **iletisim-I/Q-acik-kume jamming bulunamadi**
3. 5G NR jamming unseen jammer LOO I/Q -> Varotto 2405.09565, Kuili, Gopal; "tam LOO-ham I/Q makale bulunamadi"
4. (E) fixed FPR / normal-only esik / AUROC TPR@FPR jamming -> yalniz komsu bulgular (Gopal benchmark, GNSS IF, PAC-Wrap); **tam eslesen jamming makalesi bulunamadi**
5. (E) sequential jamming CUSUM / Markov / reaktif / I/Q -> eski (2010-2018) CUSUM/RSSI/SNR calismalari, HMM'ler (asagida); I/Q + Markov saldirgan + ogrenilmis puan bulunamadi
6. (E) sim->real jamming GNU Radio USRP acik-kume -> eslesen makale bulunamadi (yalnizca jammer implementasyonlari/patentler)
7. arXiv 2026 IF 90. persentil esik (iddia dogrulanamadi; kaynak tanimlanamadi)
8. (E) acik veri setleri I/Q jamming 5G NR -> Zenodo 7119040, GATEMAN, JamShield, WiFiSpectralJam, "Holding the Line" (VT) bulundu
9. hafif/kenar CPU ms acik-kume jamming I/Q -> CITADEL (14.2 ms, kenar), Halenka CTM, Hanegraaf; I/Q+acik-kume+olculmus-CPU ucluzu bulunamadi
10-11. "Holding the Line: Multi-Stage Jamming Classifcation in 5G O-RAN" (VT) -> yalniz arama ozeti (PDF WebFetch ile ikili geldi; metin okunamadi)
12. Generalized Jamming Detection in NR V2X Using GMM -> baslik yalniz Semantic Scholar'da; ozet bulunamadi
13. (E) pilot-aware jamming ML detektoru OFDM -> Zhang-Krunz MILCOM 2023, SecDiff (2511.01466, esik tabanli), eski pilot-jam tespitleri
14. GNSS jamming siniflandirma unknown/open-set -> kapali-kume baskin (Ebrahimi-Mehr, Ott, Heublein)
15-18. MILCOM 2023 Wi-Fi smart jamming; Hachimi 2020; HMM jamming; Zhang-Krunz journal surumu aramasi (journal surumu bulunamadi)
19. (E) sim->real alan uyarlama RF jamming -> eslesen yok (Jacovic IET 2023 gercek veriyle egitir, ray-tracing ile emulasyon)
20. Aissou-Chou-Kim -> 2609.21334 dogrulandi
21. conformal + jamming + benign-kalibrasyon -> Su et al. 2026 (dar-bant girisim), PAC-Wrap, nonconform
22. (E) few-shot/OOD iletisim jamming -> radar/iletisim few-shot (Chen 2021 Distributed FSL; radar VLM 2025)
23. (E) ogrenilmis anomali puani + CUSUM + OFDM/5G I/Q -> eslesen yok; BloodHound+, Ntemkas LSTM-AE (95. persentil esik) cikti
24. (E) acik jamming veri setleri -> bkz. 8
25. 6G jamming AI-native bilinmeyen saldiri -> survey'ler; acik-kume I/Q bulunamadi
26. (E) leave-one-attack/jammer/family-out -> **jamming'de bulunamadi**; yalniz NIDS/LLM alanlarinda (2611.00713, 2610.36295)
27. unsupervised srsRAN I/Q AE AUC unseen types -> Kouchaki, Varotto, Kuili, Gopal

### 2.3 Semantic Scholar
- "jamming detection unknown jammer isolation forest" -> 763 toplam; Hong-Kim-Lee (kunye dogrulandi), Cibecchini 2025, Fu 2025 VTC (GMM), Meftah 2025 (FL jamming)
- "open-set jamming classification I/Q 5G" -> 429; 6 sonraki sorgu 429.

---

## 3. Bulunan calismalar tablosu

Ortusme: Y/O/D = yuksek/orta/dusuk. K-A ham I/Q+OFDM tespit; K-B izgaraya hizali/URLLC/reaktif katalog + saldiri-ailesi-disarida-birakma; K-C benign-esik/AUROC/sabit-FPR; K-D cross-domain/sim2real; K-E sirali (CUSUM/HMM); K-F hafif model; H = hibrit mimari (bilinen sinif + bilinmeyen tespit).

### 3.1 Mimariye (H) ve birlesik yola en yakin olanlar

| # | Kunye | Baglanti | Dz. | Ne yapiyor | Ortusme |
|---|---|---|---|---|---|
| 1 | Aissou, Chou, Kim. "Co-Evolving Zero-Day Jamming: Adaptive Attack Synthesis and Graph Attention-Based Online Detection." arXiv 2026-09 | https://arxiv.org/abs/2609.21334 | [A] (+html okundu) | GAT + DP-means ile cevrimici akista bilinen siniflari (benign/sequential/random/reactive) siniflandirip zero-day stratejileri kesfeder; bilgiyi RL-jammer ile test eder. Girdi 64x100 enerji izgarasi (I/Q degil), yalniz simulasyon (Rayleigh), DP yaricaplari dogrulama max-mesafesinden. | **H: Y**, K-B: O (reaktif + zero-day), K-E: O (cevrimici akis; sirali istatistik testi yok), K-A: D (I/Q degil), K-C: D, K-D: D |
| 2 | Hong, Kim, Lee. "A Hybrid Jamming Detection Algorithm for Wireless Communications: Simultaneous Classification of Known Attacks and Detection of Unknown Attacks." IEEE Commun. Lett. 2023, DOI 10.1109/LCOMM.2023.3275694 | https://ieeexplore.ieee.org/abstract/document/10123966/ | [S]+[S2] (IEEE'ye erisim yok) | Karar agaci bilinen etiketi atar, Isolation Forest dogrular/bilinmeyeni yakalar; topluluk. | **H: Y (ayni mimari ailesi: agac + IF)**, diger K'lar: D. (Onceki turdan bilgi; tam metin okunmadi.) |
| 3 | Bouferroum et al. "CITADEL: CSI-Based Jamming Detection and Open-Set Classification for IIoT Networks." arXiv 2026-06 | https://arxiv.org/abs/2606.22939 | [A] | Iki asamali hiyerarsik hat; 6 bilinen + 15 zero-day; %97.1 zero-day tespiti @ %0.4 uctan-uca FPR; adversarial kacinma testi; iddia: ham I/Q hat 100'lerce dugumde pratik degil. 14.2 ms kenar cikarimi arama ozetinden [S]. | H: Y, K-C: O (dusuk-FPR'da raporluyor), K-F: O (hafif+olculmus ms ama CSI), K-A: D (I/Q'ya karsi tezi var), K-B: O |
| 4 | Schosser et al. "Spectrum Anomaly Detection in OFDMA Systems: Simulation Framework and Benchmark Dataset." arXiv 2026-06 | https://arxiv.org/abs/2606.02102 | [A] (yalniz ozet; LOO ayrintisi tam metinde, okunmadi) | OFDMA/5G-URLLC icin acik-kaynak simulasyon + 5 jammer tipi (gurultuden "pilot-farkinda" saldirilara) spektrogram veri seti; denetimli/denetimsiz taban cizgileri. | **K-B: Y (pilot-farkinda katalog + acik kaynak cerceve)**, K-A: O (spektrogram, I/Q degil), K-D: D (yalniz sim.), K-C: D |
| 5 | Wang, Jere, ... Liu. "Anonymous Jamming Detection in 5G with Bayesian Network Model Based Inference Analysis." arXiv 2023-11 | https://arxiv.org/abs/2311.17097 | [A] | Protokol-yigini parametreleri uzerinde denetimli + otoenkoder anomali (bilinmeyen turler dahil); AUC 0.964-1 / 0.987. | H: O, K-C: O (AUC raporlu), K-A: D (KPI, I/Q yok) |
| 6 | Kuili, Amini, Kantarci. "A Two-Stage CAE-Based Federated Learning Framework for Efficient Jamming Detection in 5G Networks." arXiv 2025-01 | https://arxiv.org/abs/2501.15288 | [A] | 1. asama CAE (denetimsiz), 2. asama FCN siniflandirici; FL. Bilinmeyen saldiri degerlendirmesi ozette yok. | H: O (iki asama ama acik-kume yok), K-A: O (SSB I/Q), K-F: D |
| 7 | Hachimi, Kaddoum, Gagnon, Illy. "Multi-stage Jamming Attacks Detection using Deep Learning Combined with KSVM in 5G C-RAN." ISNCC 2020 (arXiv) | https://arxiv.org/abs/2004.06077 | [A] | MLP + KSVM cok asamali; sabit/rastgele/aldatici/reaktif jamming; WSN-DS (ag veri seti, I/Q degil), %94.51. | H: D-O (acik-kume yok), K-B: D |
| 8 | Kouchaki, ..., Marojevic. "Enhanced Real-Time Threat Detection in 5G Networks: A Self-Attention RNN Autoencoder Approach for Spectral Intrusion Analysis." arXiv 2024-11 | https://arxiv.org/abs/2411.03365 | [A] | srsRAN 5G + SDR, ham I/Q, yalniz normalle egitilen RNN-otoenkoder; dalga-bicimi duzeyinde anomali. "Bilinmeyen saldiri" iddiasi arama ozetinden [S]. | **K-A: Y**, K-F: O (gecikme/guc iddiasi), K-C: D (esik ayrintisi ozette yok), K-B: D |
| 9 | Varotto, Valentin, Ardizzon, Marzotto, Tomasin. "One-Class Classification as GLRT for Jamming Detection in Private 5G Networks." arXiv 2024-05 | https://arxiv.org/abs/2405.09565 | [A] | CNN = GLRT; gercek mesru sinyal + yapay "jamming" sinyalleriyle iki-sinifli egitim (saldiri bilgisi gerekmez); ozel 5G agi deneysel verisi, birkac jamming sinyali. | K-A: Y, "bilinmeyen jammer" duzeni: O, K-C: O (GLRT = esik/ROC mantigi), K-D: D |
| 10 | Varotto, Valentin, Tomasin. "Detecting 5G Signal Jammers Using Spectrograms with Supervised and Unsupervised Learning." arXiv 2024-05 (onceki turda biliniyordu; ozet bu turda yeniden okundu) | https://arxiv.org/abs/2405.10331 | [A] | I/Q -> spektrogram, CNN vs CAE, dogruluk + hesap karmasikligi. | K-A: Y, K-F: O, K-B: D |

### 3.2 Izgaraya hizali / protokol-farkinda saldirilar ve tespitleri (Konu 3)

| # | Kunye | Baglanti | Dz. | Ne yapiyor | Ortusme |
|---|---|---|---|---|---|
| 11 | Zhang, Krunz. "Detection and Classification of Smart Jamming in Wi-Fi Networks Using Machine Learning." MILCOM 2023, pp. 919-924, DOI 10.1109/MILCOM58377.2023.10356126 | https://experts.arizona.edu/en/publications/detection-and-classification-of-smart-jamming-in-wi-fi-networks-u/ | [W] | Alinan I/Q'nun CWT skalogramlari + 4 konvolusyon katmanli hafif CNN; preamble/pilot/interleaving jamming'i (OFDM cercevesini bilen akilli saldirilar) tespit+siniflandirir; ~%98 (-6..15 dB). Kapali-kume; bilinmeyen saldiri yok (ozetten). | **K-B: Y (izgara-hizali OFDM saldirilari, I/Q)**, K-A: Y, K-F: O ("only four layers"), acik-kume: D |
| 12 | Topal, Gecgel, Eksioglu, Karabulut Kurt. "Identification of Smart Jammers: Learning based Approaches Using Wavelet Representation." arXiv 2019-01 | https://arxiv.org/abs/1901.09424 | [A] | LTE'de barrage / senkronizasyon-sinyali / referans-sinyal jamming'ini dalgacik goruntusu + SVM/DCNN ile siniflandirir. | K-B: O-Y (SS/RS-hizali saldirilar, 2019!), acik-kume: D |
| 13 | Asemian, Amini, Kantarci, Erol-Kantarci. "DT-DDNN: A Physical Layer Security Attack Detector in 5G RF Domain for CAVs." arXiv 2024-03 | https://arxiv.org/abs/2403.02645 | [A] | SSB (PSS korelasyonu + bos RE enerjisi) ozelliklerinden cift-esikli derin tespit; gercek verilerle. | K-A: Y, K-C: O (cift esik), K-B: O (SSB hedefli) |
| 14 | Asemian et al. "The impact of mobility, beam sweeping and smart jammers on security vulnerabilities of 5G cells." Wireless World 2024 (arXiv) | https://arxiv.org/abs/2411.05131 | [A] | PSS/SSS/PBCH hedefli akilli jammer'in etkisi; tespit degil. | K-B: O (katalog gerekcesi) |
| 15 | Alaimo, Dino, Tinnirello, Garlisi. "When the UE Turns Adversary: Real-Time Uplink Jamming from Within 5G Networks (STORM-RJ)." arXiv 2026-06 | https://arxiv.org/abs/2606.14465 | [A] | DCI/UL-grant'a senkron, PUSCH kaynaklarini hedefleyen reaktif jamming (SDR); saldiri + hafifletme tartismasi, tespit yok. | K-B: O (izgaraya hizali reaktif saldiri; katalog icin gerekce), tespit: D |
| 16 | Chiarello, Baracca, Upadhya, Khosravirad, Wild. "Jamming Detection With Subcarrier Blanking for 5G and Beyond in Industry 4.0 Scenarios." arXiv 2021-06 | https://arxiv.org/abs/2106.07970 | [A] | Savunmaci rastgele alt-tasiyici bosaltir, GLRT ile tespit; URLLC/MBB hedefli akilli jammer. Farkli onerme (tasarimi degistirir). | K-B: O (URLLC hedefli), K-C: O (GLRT/MD-FA), K-A: D |
| 17 | Arcangeloni, Testi, Giorgetti. "Jamming Detection in MIMO-OFDM ISAC Systems Using Variational Autoencoders." arXiv 2024-10 | https://arxiv.org/abs/2410.01632 | [A] | ISAC radar yankisi, jamming'siz egitilen VAE; denetimsiz anomali. | K-A: O (OFDM, normal-only; radar), 6G-ISAC baglami |

### 3.3 Acik-kume / tutulan jammer ailesi (Konu 2)

| # | Kunye | Baglanti | Dz. | Ne yapiyor | Ortusme |
|---|---|---|---|---|---|
| 18 | Gopal, Cintron, Rouil. "Benchmarking Unsupervised Jamming Detection in 5G Open RAN." arXiv 2026-11 | https://arxiv.org/abs/2611.04369 | [A] | KPI telemetrisi, 10 heterojen 5G ortami, leave-one-out (ortam bazli); SEM vs AE/LSTM/VAE; **siralamalarin yalniz tespit orani beklenen yaygina esit oldugunda guvenilir oldugunu** raporlar. | K-D: O (LOO-ortam), K-C: O (sabit tespit oranli degerlendirme sorunu), K-E: D, I/Q: yok |
| 19 | Gopal, Cintron, Rouil. "O-RAN-Native Jamming Detection Under Network Heterogeneity." arXiv 2026-10 | https://arxiv.org/abs/2610.20816 | [A] | SEM (MAD + sayim + ani-degisim); soguk-baslangic (etiketsiz) modu; 8 ortamda LOO; dagilim kaymasinda ogrenme tabanli modellerin recall kaybettigini gosterir. | K-D: O, K-C: O (etiketsiz esik), K-E: O (ani degisim tespiti bilesenleri) |
| 20 | Gopal, Rouil. "CORA: Teacher-Guided Causal O-RAN Adaptation for Jamming Detection." arXiv 2026-11 | https://arxiv.org/abs/2611.04330 | [A] | Etiketsiz, nedensel (akis) KPI dedektoru; RL ile duyarlilik/kalicilik/tolerans ayari; 10 yapilandirmada LOO. | K-E: O (nedensel/akis), K-D: O, I/Q: yok |
| 21 | Zhong et al. "Energy-based jamming pattern open set recognition via spiking wavelet transformer." PLOS ONE 2025 (onceki turdan) ; radar: Remote Sens. 14(24):6220 (2022), 15(16):4107 (2023), Appl. Sci. 12(9):4380 (2022) | https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0325381 ; https://doi.org/10.3390/rs14246220 ; https://doi.org/10.3390/app12094380 | [S] (arama ozeti; metin okunmadi) | Radar/iletisim girisim sinyalleri icin acik-kume (OpenMax, prototip, enerji tabanli); bazi jamming turlerini "bilinmeyen" tutma protokolu. | Acik-kume protokolu: Y (kavramsal), I/Q+OFDM: D, 5G: D |
| 22 | Ott et al. "Few-Shot Learning with Uncertainty-based Quadruplet Selection for Interference Classification in GNSS Data." ICL-GNSS 2024 (arXiv 2024-02) | https://arxiv.org/abs/2402.09466 | [A] | Yeni girisim siniflarina few-shot uyum (GNSS); kapali-kume. | acik-kume: D-O, K-D: D |
| 23 | Baweja. "Anticipating the Optimism Gap: Predicting Distribution-Shift Degradation of RF-Impairment Detectors from In-Distribution Statistics." arXiv 2026-06 | https://arxiv.org/abs/2606.22054 | [A] | GNSS jamming/spoofing dedektorlerinde dagilim-kaymasi AUC kaybi (optimism gap); sentetik test yatagi + 3 acik saha derlemi, on-kayitli protokol; gorulmemis sinif icin de tahmin. | K-D: O (metodoloji: sentetik->saha, kayma), K-C: O (AUC bildirme elestirisi); alan: GNSS |
| 24 | Heublein et al. "Evaluation of (Un-)Supervised ML Methods for GNSS Interference Classification with Real-World Data Discrepancies." arXiv 2025 (ION GNSS+ 2024) | https://arxiv.org/abs/2503.23775 | [A] | Gercek olcum kampanyalari; sim/laboratuvar-gercek uyumsuzlugu; denetimli/denetimsiz karsilastirma (GNSS). | K-D: O (alan farkli), K-A: D |

### 3.4 Sirali / Markov / reaktif tespit (Konu 6)

| # | Kunye | Baglanti | Dz. | Ne yapiyor | Ortusme |
|---|---|---|---|---|---|
| 25 | Zhang, Zhang, Mao, Xiao, Han, Xia. "Detection of Stealthy Jamming for UAV-Assisted Wireless Communications: An HMM-Based Method." IEEE TCCN 9(3):779-793, 2023, DOI 10.1109/TCCN.2023.3244539 | https://pure.bit.edu.cn/en/publications/detection-of-stealthy-jamming-for-uav-assisted-wireless-communica/ | [W] | Kayan pencere log-enerji -> HMM (spektrum durumu gizli), EM + MAP; esik tahmin edilen parametrelerden. On-bilgi gerektirmez. | K-E: O-Y (HMM sirali tespit, sinyal-enerji duzeyi; I/Q-ogrenilmis puan yok), K-C: D |
| 26 | "Reactive Jamming Detection Based on Hidden Markov Model" (Beihang, ~2022) | https://research.buaa.edu.cn/en/publications/reactive-jamming-detection-based-on-hidden-markov-model/ | [S] (sayfa ENOTFOUND; kunye dogrulanamadi) | Alinan guc ile jamming varligi arasinda HMM; EM + ileri-geri. | K-E: O (kunye dogrulanmadi) |
| 27 | Arama ozetlerinde anilan: CUSUM tabanli jammer tespit/yerlestirme (IEEE 8610497, 2018), CURD (Elsevier, sualti sensor agi), DSSS PHY baslik CUSUM | https://ieeexplore.ieee.org/document/8610497/ | [S] | Eski (2010-2018) RSSI/SNR/PDR istatistikleri uzerinde CUSUM; ogrenilmis puan yok. | K-E: O (klasik CUSUM oncul), I/Q+OFDM+ogrenilmis puan: D |
| 28 | Gopal 2610.20816 / 2611.04330 (yukarida) | | [A] | Nedensel ani-degisim + kalicilik (KPI). | K-E: O |

### 3.5 Hafif / kenar (Konu 8) ve veri setleri (Konu 7)

| # | Kunye | Baglanti | Dz. | Ne yapiyor | Ortusme |
|---|---|---|---|---|---|
| 29 | Halenka, Amini, Andersen, Granmo, Kantarci. "Explainable and Hardware-Efficient Jamming Detection for 5G Networks Using the Convolutional Tsetlin Machine." arXiv 2026-03 | https://arxiv.org/abs/2603.07336 | [A] | SSB ozellikleri; CTM, CNN'e yakin dogruluk (91.5 vs 96.8), 14x az bellek; FPGA projeksiyonu (olculmedi). | K-F: O-Y, acik-kume: D |
| 30 | Cibecchini, Chiti, Pierucci. "A Lightweight AI-Based Approach for Drone Jamming Detection." Future Internet 17(1):14, 2025, DOI 10.3390/fi17010014 | https://www.mdpi.com/1999-5903/17/1/14 | [S2]+[S] (MDPI 403) | Sabit/periyodik jamming icin denetimsiz IF + cogunluk kurali; Hong-Kim-Lee'ye atif. | K-F: O, IF: O |
| 31 | Kuili et al. "CWGAN-GP Augmented CAE for Jamming Detection in 5G-NR in Non-IID Datasets." arXiv 2025-06; "...Federated and Centralized Learning for RF Jamming Detection." arXiv 2026-05 | https://arxiv.org/abs/2506.15075 ; https://arxiv.org/abs/2605.01705 | [A] | Gercek 5G SSB I/Q'ya AWGN eklenerek jamming; CAE ve FL-1DCNN. | K-A: Y, K-D: O (non-IID), jamming cesitliligi: D |
| 32 | Hanegraaf, Sciancalepore, Oligeri. "Weak-Jamming Detection in IEEE 802.11 Networks." arXiv 2025 ; Huso et al. "Cloudy Skies: Early Detection of Jamming Against Iridium LEO Satellite-IoT Links." arXiv 2026-11 ; Sciancalepore et al. "Bloodhound+" arXiv 2023 | https://arxiv.org/abs/2505.19633 ; https://arxiv.org/abs/2611.08118 ; https://arxiv.org/abs/2306.10912 | [A] | Ham fiziksel katman I/Q -> goruntu; CNN ikili + tek-sinif seyrek otoenkoder; Iridium'da 47 kosul, 40 ms parca, uc tek-sinif AE. | K-A: Y (I/Q+one-class), K-D: O (kayit/mobilite/kosul), K-F: D-O |
| 33 | Alhazbi, Sciancalepore, Oligeri. "A Dataset of IQ Samples in Indoor Jamming Scenarios." Zenodo 2022 | https://zenodo.org/records/7119040 | [W] | Ham I/Q (7 USRP X310; BPSK); sessiz/ton/Gauss gurultusu; mesafe ve guc degisir; CC BY 4.0. | Veri seti: O (acik I/Q var, ama OFDM/NR-benzeri degil, 3 sinif) |
| 34 | Panitsas et al. JamShield (arXiv 2507.11483) ; FedJam (arXiv 2508.09369) ; Herzalla et al. WiFiSpectralJam (arXiv 2608.15728) | https://arxiv.org/abs/2507.11483 ; https://arxiv.org/abs/2508.09369 ; https://arxiv.org/abs/2608.15728 | [A] | OTA veri setleri: JamShield (KPI/PHY-MAC ozellikleri), FedJam (spektrogram+KPI, 3 saldiri), WiFiSpectralJam (Wi-Fi spektral tarama, HackRF jamming). Hicbiri ham I/Q-OFDM saldiri-ailesi etiketli degil. | Veri seti: D-O |
| 35 | Ulbricht et al. "PyJama" (arXiv 2407.15473) ; Wielenberg et al. "S-ICDF" (arXiv 2607.03411) | https://arxiv.org/abs/2407.15473 ; https://arxiv.org/abs/2607.03411 | [A] | Sionna tabanli jamming/girisim simulatoru ve Sionna girisim veri seti (karakterizasyon/yon bulma). | K-D: D (sim. altyapi; tespit-sim2real yok), veri: O |
| 36 | "Holding the Line: Multi-Stage Jamming Classifcation in 5G O-RAN" (Virginia Tech, tez/rapor; yazar-yil dogrulanmadi) | https://vtechworks.lib.vt.edu/bitstreams/c2fded7b-6d28-4f8f-937b-89a364a28655/download | [S] (WebFetch PDF'i okunabilir metin olarak donmedi) | Arama ozetine gore: gercek I/Q yakalamalar (CCI xG test yatagi), PSS/PDCCH/DMRS hedefli + reaktif/aldatici saldirilar, 3 asamali MLP+KSVM+MobileNetV3; 3. asamada %85 protokol-farkinda alt-siniflandirma. **Dogrulanmadi; yuksek riskli ortusme adayi.** | **K-B: Y?, K-A: Y?** (dogrulanana kadar "olasi") |
| 37 | Su, Zhu, Simeone, Di Renzo, Fischione. "Reliable Narrowband Interference Detection via Backward Conformal Prediction." arXiv 2026-05 ; "Post-Hoc Conformal Prediction for Reliable Wireless Communications" arXiv 2026-09 | https://arxiv.org/abs/2605.02486 ; https://arxiv.org/abs/2609.26625 | [A] | Ham I/Q ile egitilmis dedektor + conformal kalibrasyonla dagilimdan bagimsiz guvenilirlik; dar-bant girisim, jamming/acik-kume degil. | K-C: O-D (yontem komsusu; kalibrasyon cercevesi) |
| 38 | Ntemkas, Argyriou. "RFI and Jamming Detection in Antenna Arrays with an LSTM Autoencoder." RadarConf 2025 (arXiv 2507.20648) | https://arxiv.org/abs/2507.20648 | [A] (esik 95. persentil: arama ozeti [S]) | Anten dizisi, onceden bilgi gerektirmeyen LSTM-AE anomali. | K-C: D-O |
| 39 | Hoffmann et al. "Jamming Detection in 5G/6G Networks: From O-RAN Concept to OCUDU Deployment." arXiv 2026-09 | https://arxiv.org/abs/2609.18499 | [A] | BLER hareketli ortalama xApp (URLLC gecikme); I/Q yok. | K-F/K-B: D |

Bu turda gorulup elenen / kenar: Jere 2304.13660 (KPI, [A]), SAJD 2511.17519 ve demo 2510.09706 (KPI + kendine-uyarlanan yeniden egitim, "unseen interference" [A]; K-D: D-O), Arjoune 2003.07308 (2020, RF/SVM [A]), Pourranjbar 2112.11222 (kanal-doluluk RNN, kapali-kume [A]), Fu et al. VTC 2025 "Generalized Jamming Detection in NR V2X Using GMM" ([S2]; yalniz baslik/kunye; yoğun benzerlik olasi: GMM = normal-yogunluk tabanli genelleme; **ozeti okunmadi**), Meftah et al. FL jamming (IEEE TGCN 2025, [S2]).

---

## 4. K-bileşeni yenilik durumu (bu aramalar icin)

| K | Iddia | Durum | Gerekce |
|---|---|---|---|
| **H (hibrit mimari: IF + RF)** | Normalle egitilen IF + RF siniflandirici | **ÇAKIŞIYOR** | Hong-Kim-Lee 2023 (agac + IF), CITADEL (iki asamali kapali/acik-kume), Aissou 2026 (GAT + DP-means), Wang 2023 (denetimli+AE bilinmeyen), Kuili 2025 (iki asama). Mimarinin kendisi katki olamaz; "IF'ye karsi RF" bir varyant seviyesindedir. |
| **K-A** | OFDM/NR-benzeri tasiyicida ham I/Q ile jamming tespiti | **ÇAKIŞIYOR** | Kouchaki 2024, Varotto 2024 (x2), Kuili 2025/2026, Halenka 2026, Asemian 2024, Zhang-Krunz 2023, Sciancalepore/Hanegraaf/Huso. Tek basina yenilik degil; zemin. |
| **K-B** | Izgaraya hizali + URLLC dusuk gorev cevrimli + reaktif/Markov saldiri katalogu; **saldiri ailesi** bazinda leave-one-family-out | **KISMEN ÇAKIŞIYOR** | (a) Izgara/pilot/SSB-hizali saldirilar kataloglarda var: Schosser 2026 (pilot-farkinda, acik kaynak), Zhang-Krunz 2023 (preamble/pilot/interleaving), Topal 2019 (SS/RS), Asemian 2024, Alaimo 2026 (UL-grant reaktif), "Holding the Line" [S] (PSS/PDCCH/DMRS, dogrulanmadi). (b) Bilinmeyen-saldiri protokolu var: CITADEL (15 zero-day), Aissou 2026, Schosser (onceki tur: leave-one-jammer-type-out), Zhong 2025. (c) Bu aramalarda **bulunamayan**: ham I/Q + NR/OFDM-benzeri + *aile-duzeyi* (fiziksel olarak ayrik gruplar) LOFO + dusuk gorev cevrimli URLLC ve Markov saldirilari birlikte. Ayrim ince: Schosser'in tam-metni okunmadi; en tehlikeli komsu odur. |
| **K-C** | Esik yalniz normalden kalibre; AUROC + sabit-FPR'da TPR | **KISMEN ÇAKIŞIYOR** | Normalle egitim/esik yaygin (Varotto, Kouchaki, Ntemkas 95. persentil, Bloodhound+); CITADEL dusuk FPR'da (%0.4) raporlar; Baweja AUC'yi kayma altinda elestirir; Gopal'in benchmark'i sabit tespit-orani/prevalans uyumsuzlugunun siralamayi bozdugunu gosterir (protokol gerekcesi); conformal (Su 2026) kalibrasyon komsusu. Bulunamayan: jamming icin acik-kume + normalden kalibre + **sabit-FPR'da TPR + esik aktarimi (kayit/kanal disina) hatasi** birlikte. Bu daha cok *metodoloji/protokol* katkisidir; algoritmik yenilik olarak savunulmasi zor. |
| **K-D** | Kayit/kanal-disi + simdan-gerceğe / dis veri dogrulama | **KISMEN ÇAKIŞIYOR** | Kayit/ortam-disi LOO: Gopal x3 (KPI), Heublein/Baweja (GNSS), Hanegraaf/Huso (mobilite/kosul). **Simulasyondan-gerceğe jamming tespiti/acik-kume (GNU Radio/USRP/Sionna): bu aramalarda bulunamadi** (PyJama ve S-ICDF yalniz simulator/veri; Schosser yalniz sim.). Kanıt tabanı ince: sim2real icin ~6 sorgu. |
| **K-E** | Zamansal (Markov/reaktif) saldirgan icin sirali tespit (CUSUM/HMM) | **KISMEN ÇAKIŞIYOR** | HMM: Zhang 2023 TCCN, Beihang HMM [S]; CUSUM: eski RSSI/SNR/PDR calismalari [S]; nedensel/akis: CORA, SEM, Aissou (cevrimici). Bulunamayan: ogrenilmis (IF/AE) puan uzerinde **CUSUM/HMM + tespit gecikmesi vs sabit-FPR (ARL) + Markov/reaktif saldirgan, OFDM/NR I/Q'da**. Web aramasi bunu acik bir bosluk olarak raporladi, ama IEEE aramasi yapilamadi. |
| **K-F** | Hafif, CPU-ms | **KISMEN ÇAKIŞIYOR** | Hafiflik tek basina yenilik degil (CITADEL 14.2 ms [S], Halenka CTM, Zhang-Krunz 4 katman, Varotto karmasiklik analizi, Cibecchini). CITADEL ayrica **"ham I/Q hatti olceklenmez"** diyor: K-F, olculmus CPU/ms + verim (MS/s) kanitiyla savunulmak zorunda. |
| **Ortak (H+K-B+K-C)** | "Normal-egitimli IF + RF + LOFO + benign-esik" | **BU ARAMALARDA ÖNCÜL BULUNAMADI (tam kombinasyon icin)** | Parcalar tek tek mevcut; ham I/Q + NR-benzeri OFDM + aile-LOFO + benign-kalibre sabit-FPR + sirali tespit + cross-domain bir arada bulunamadi. Bu bir "yok" degil; IEEE/Scopus taranamadi, "Holding the Line" ve Schosser tam metinleri okunmadi. |

---

## 5. Birlesik yolun savunulabilir ve riskli parcalari

**Savunulabilir (bu taramanin dayandigi olcude):**
1. **Protokol birlesimi**: aile-duzeyi LOFO + yalniz-normal esik + sabit-FPR TPR + kayit-disi esik aktarimi. Gopal 2026 (siralamanin guvenilirligi) ve Baweja 2026 (AUC iyimserligi) bu ihtiyaci literatur dilinde destekliyor; jamming/I-Q icin birlesik protokol bulunamadi.
2. **Saldiri katalogu + yayimlanabilir uretec**: URLLC dusuk gorev cevrimli, ızgara-hizali ve reaktif/Markov saldirilar, ham I/Q'da. Schosser spektrogram + pilot-farkinda ile en yakin; ham-I/Q ve Markov/dusuk-gorev-cevrimi farki savunulabilir olabilir (Schosser tam metni kontrol edilmeli).
3. **Sirali tespit (K-E)**: ogrenilmis puan + CUSUM/HMM ile gecikme-FPR egrisi; Markov saldirgana karsi. Bu aramalarda bos goruldu, ama IEEE taranmadi.
4. **Olumsuz/durust sonuclar** (esik aktarimi hatasi, sabit-FPR'in kayit disinda bozulmasi) hakem icin ilgi cekici ve iddia riskini azaltir.

**Riskli:**
1. **Mimari yenilik iddiasi** (IF + RF): Hong-Kim-Lee, CITADEL, Aissou ile dogrudan cakisir; "ilk" dili kullanilmamali.
2. **"5G NR/6G'ye yonelik" etiketi**: GNU Radio OFDM veri NR degildir; 6G'ye ozgu bir unsur (ISAC, yeni dalga bicimi, yapay-zeka-yerli PHY) yoksa 6G iddiasi zayif. Kanal, SSB/PDCCH yapisi, numeroloji acikca tanimlanmali.
3. **Sim->gercek / dis veri**: tek SDR cifti ve tek ortam, genelleme iddiasi icin yetersiz; Zenodo 7119040 gibi dis ham-I/Q veri setleri BPSK/3-sinif ve NR-benzeri degil.
4. **K-F**: CITADEL'in "ham I/Q olceklenmez" tezine karsi olculmus CPU-ms ve MS/s verimi sunulmazsa zayif.
5. **"Bilinmeyen" ailenin gercekten ayrik olmasi**: puls/dusuk-gorev/Markov aileleri arasinda sizinti (fiziksel benzerlik); LOFO sonuclari optimist cikabilir.
6. **IF'nin taban cizgisi zayifligi**: ozellik-tabanli IF'nin ham I/Q uzerinde derin AE/one-class (Kouchaki, Varotto, Sciancalepore) taban cizgilerine karsi esit-FPR'da ustunlugu gosterilmeli.

---

## 6. Hakemin soracagi 5 en zor soru

1. **"Hong-Kim-Lee (2023) zaten karar agaci + Isolation Forest ile bilinen siniflandirma + bilinmeyen tespit yapiyor; CITADEL ve Aissou'nun zero-day hatti da var. Sizin sisteminiz girdi modalitesi disinda ne ekliyor, ve neden RF+IF'nin bir varyantindan fazlasi?"**
2. **"Schosser et al. (2026) pilot-farkinda saldirilar iceren acik-kaynak OFDMA benchmark'i yayimladi ve jammer-tipi disarida birakma yapiyor. Katalog/protokolunuz bunun ustune ne getiriyor? Veri setlerinizi ya da yontemlerini onlarin benchmark'inda calistirdiniz mi?"**
3. **"'Saldiri ailesi' nasil tanimlandi; aileler fiziksel olarak ayrik mi? Puls ile dusuk-gorev-cevrimli/Markov saldirilar arasinda sizinti yok mu? Normalden kalibre esikle nominal FPR, baska bir kayit/kanalda gercekte nedir (FPR kaymasi)?"**
4. **"Simulasyon/GNU Radio verisi NR degil; tek SDR cifti ve tek ortamdan '6G' ve 'sim2real' sonucu nasil cikarirsiniz? CITADEL ham-I/Q'nun olceklenmedigini savunuyor; hangi cihazda, kac MS/s'de, kac ms ile calisiyor?"**
5. **"Sirali tespit (CUSUM/HMM) pencere-duzeyi puandan ne kazandiriyor: sabit ARL/FPR'da gecikme? Saldirgan dedektoru bilen/uyarlanan (adaptif, Aissou'nun RL jammer'i veya CITADEL'in kacinma testi) bir saldirgan durumunda sonuclar nasil bozuluyor?"**

(Ek olasi sorular: neden Varotto'nun CAE/GLRT-CNN, OC-SVM, Deep SVDD, Mahalanobis ve enerji dedektoru taban cizgileri ayni FPR'da karsilastirilmadi? Etiketli ayrik saldiri-ailesi dagilimi ve veri sizintisi (ayni kayittan train/test) kontrolu nasil yapildi?)

---

## 7. Sinirliliklar

- Sistematik tarama degildir; sorgular elle secildi, tekrarlanabilir bir arama protokolu (PRISMA vb.) yoktur.
- **OpenAlex kullanilamadi (kota)**, Semantic Scholar kismen, **IEEE Xplore ve Scopus'a erisim yok**; IEEE/Elsevier agirlikli literatur (ozellikle IEEE Commun. Lett./TWC/TCCN/Access 2023-2026) yetersiz tarandi. Hong-Kim-Lee'nin kaynak-kodlu/ozellik ayrintilari bu turda dogrulanmadi.
- arXiv `abs:` ile kati AND/tirnakli ifade sorgulari cok dusuk sonuc verir; 0 sonuc "yok" degildir. Yalniz ozetler okundu; ayrintilar (LOO nasil, esik nasil) cogu zaman tam metinde olup okunmadi. Ozellikle **Schosser 2026** ve **"Holding the Line"** tam metinleri kritik ve okunmadi.
- [S] duzeyindekiler (Cibecchini, Fu 2025 GMM, Zhong ve radar acik-kume makaleleri, Beihang HMM, CUSUM eski calismalari, "Holding the Line", 5G-JA-UAD, GATEMAN) icin ayrintilar arama-ozeti kaynaklidir ve yanlis olabilir. Beihang sayfasi acilamadi (ENOTFOUND); kunyesi kesin degil.
- WebFetch bir yardimci model ile ozetledigi icin Aissou 2026 icin verilen ayrintilar (girdi 64x100 enerji izgarasi, yaricap=dogrulama max-mesafesi) arXiv html sayfasindan ozetlenmis olup tam metinle teyit edilmemistir.
- Tarih araligi agirlikla 2019-2026; 2018 ve oncesi (SAIFE 2018, Rajendran vb.) bilerek incelenmedi.
- Yenilik durumlari, bu tarama icin "bulunamadi" demektir; hakem tarafindan bulunabilecek oncul olasiligi dislanmaz.
