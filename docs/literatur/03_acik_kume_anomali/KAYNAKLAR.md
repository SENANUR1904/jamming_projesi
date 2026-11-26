# 03 - Açık-küme tanıma, anomali / bilinmeyen saldırı tespiti: Kaynaklar

Tarama tarihi: 2026-11-25. Her kayıt bu oturumda arXiv / OpenAlex / yayıncı sayfasından görülerek doğrulanmıştır (künye kaynak sayfadan alınmıştır). İndirilen her dosya `%PDF-` başlığı ve > 30 KB koşuluyla kontrol edilmiştir. Toplam: 34 kayıt; 29 PDF bu klasörde, 2 kayıt başka klasörde mevcut, 3 kayıt indirilemedi.

Not: "arXiv ön baskı" olarak yazılan kayıtlarda sayfada hakemli yayın yeri belirtilmemiştir; OpenAlex'ten yayın yeri doğrulananlar ayrıca yazılmıştır.

---

## A. Jamming / girişim tespiti: denetimsiz, tek-sınıf, otokodlayıcı, açık-küme

1. **Detecting 5G Signal Jammers Using Spectrograms with Supervised and Unsupervised Learning** - M. Varotto, S. Valentin, S. Tomasin - 2024 - IEEE ICC Workshops 2024 (arXiv:2405.10331, DOI 10.1109/ICCWorkshops59551.2024.10615325)
   DURUM: İNDİRİLMEDİ (başka klasörde mevcut) - `../01_mevcut_kaynakca_ve_derlemeler/2024_varotto_5g-jammers-spectrograms.pdf`
   Projeye ilgisi: Projede zaten var; denetimli CNN ile yalnızca normal veriyle eğitilen evrişimli otokodlayıcıyı karşılaştırır, bizim Isolation Forest (denetimsiz) vs Random Forest (denetimli) kurgumuzun doğrudan emsali.

2. **One-Class Classification as GLRT for Jamming Detection in Private 5G Networks** - M. Varotto, S. Valentin, F. Ardizzon, S. Marzotto, S. Tomasin - 2024 - IEEE SPAWC 2024 (DOI 10.1109/SPAWC60668.2024.10694335; arXiv:2405.09565)
   DURUM: İNDİRİLDİ - `2024_varotto_one-class-glrt-jamming-private-5g.pdf`
   Projeye ilgisi: Jamming tespitini "hiç görülmemiş jammer" varsayımıyla tek-sınıf problemi olarak kurar ve sentetik jammer verisiyle denetimli ağı GLRT'ye çevirir; bilinmeyen saldırıya genelleme argümanı için güçlü destek.

3. **Detecting 5G Narrowband Jammers with CNN, k-nearest Neighbors, and Support Vector Machines** - M. Varotto, F. Heinrichs, T. Schürg, S. Tomasin, S. Valentin - 2024 - IEEE WIFS 2024 (DOI 10.1109/WIFS61860.2024.10810672; arXiv:2405.09564)
   DURUM: İNDİRİLDİ - `2024_varotto_5g-narrowband-jammers-cnn-knn-svm.pdf`
   Projeye ilgisi: Dar bantlı (tone benzeri) jammer'ların klasik ML (kNN, SVM, PCA) ve CNN ile tespitinin doğruluk/hesap maliyeti karşılaştırması; öznitelik tabanlı klasik ML tercihimizi destekler.

4. **Benchmarking Unsupervised Jamming Detection in 5G Open RAN** - S. Gopal, F. J. Cintrón, R. Rouil - 2026 - arXiv ön baskı (arXiv:2611.04369)
   DURUM: İNDİRİLDİ - `2026_gopal_benchmarking-unsupervised-jamming-5g-oran.pdf`
   Projeye ilgisi: Denetimsiz jamming tespit yöntemlerini 5G O-RAN verisinde kıyaslayan güncel çalışma; Isolation Forest'ı diğer denetimsiz yöntemlerle konumlandırmak için kıyas kaynağı.

5. **O-RAN-Native Jamming Detection Under Network Heterogeneity** - S. Gopal, F. J. Cintrón, R. Rouil - 2026 - arXiv ön baskı (arXiv:2610.20816)
   DURUM: İNDİRİLDİ - `2026_gopal_oran-native-jamming-detection-heterogeneity.pdf`
   Projeye ilgisi: Ağ heterojenliği (dağılım kayması) altında jamming tespitini ele alır; eğitim/test dağılımı farkının tespit başarısına etkisini tartışmak için ilgili.

6. **A Two-Stage CAE-Based Federated Learning Framework for Efficient Jamming Detection in 5G Networks** - S. Kuili, M. Amini, B. Kantarci - 2025 - IEEE ICC 2025 (DOI 10.1109/ICC52391.2025.11162114; arXiv:2501.15288)
   DURUM: İNDİRİLDİ - `2025_kuili_two-stage-cae-federated-jamming-5g.pdf`
   Projeye ilgisi: Evrişimli otokodlayıcı ile iki aşamalı (yeniden-yapılandırma + sınıflandırma) jamming tespiti; bizim iki aşamalı (Aşama 1 tespit, Aşama 2 tür) mimarimizle yapısal benzerlik.

7. **CWGAN-GP Augmented CAE for Jamming Detection in 5G-NR in Non-IID Datasets** - S. Kuili, M. Amini, B. Kantarci - 2025 - IEEE PIMRC 2025 (DOI 10.1109/PIMRC62392.2025.11274595; arXiv:2506.15075)
   DURUM: İNDİRİLDİ - `2025_kuili_cwgan-gp-cae-jamming-5g-nr.pdf`
   Projeye ilgisi: GAN tabanlı veri artırma + otokodlayıcı ile jamming tespiti (GAN yönteminin jamming bağlamındaki örneği); sentetik veriyle dengesizlik/dağılım sorununa çözüm.

8. **Jamming Detection in MIMO-OFDM ISAC Systems Using Variational Autoencoders** - L. Arcangeloni, E. Testi, A. Giorgetti - 2024 - IEEE ISSE 2024 (DOI 10.1109/ISSE63315.2024.10741110; arXiv:2410.01632)
   DURUM: İNDİRİLDİ - `2024_arcangeloni_jamming-detection-vae-mimo-ofdm-isac.pdf`
   Projeye ilgisi: Yalnızca temiz sinyalle eğitilen VAE ile jamming'i anomali olarak yakalar; "yalnızca normal veriyle eğitim" ilkesinin bir başka örneği.

9. **RFI and Jamming Detection in Antenna Arrays with an LSTM Autoencoder** - C. Ntemkas, A. Argyriou - 2025 - 2025 IEEE Radar Conference (RadarConf25) (arXiv:2507.20648)
   DURUM: İNDİRİLDİ - `2025_ntemkas_rfi-jamming-lstm-autoencoder-arrays.pdf`
   Projeye ilgisi: Zaman serisi I/Q üzerinde LSTM otokodlayıcı ile girişim/jamming anomali tespiti; yeniden-yapılandırma hatası tabanlı alternatif yaklaşım.

10. **CITADEL: CSI-Based Jamming Detection and Open-Set Classification for IIoT Networks** - A. Bouferroum, I. Alla, V. Loscrì, A. Benslimane, V. Lenders - 2026 - arXiv ön baskı (arXiv:2606.22939)
    DURUM: İNDİRİLDİ - `2026_bouferroum_citadel-csi-jamming-open-set-iiot.pdf`
    Projeye ilgisi: Jamming tespiti + açık-küme sınıflandırmayı birlikte ele alan, doğrudan emsal; bilinmeyen jammer türünü ayırt etme iddiası projenin ana yeniliğiyle örtüşür.

11. **Jamming Detection in Low-BER Mobile Indoor Scenarios via Deep Learning** - S. Sciancalepore, F. Kusters, N. K. Abdelhadi, G. Oligeri - 2023 - IEEE Internet of Things Journal (DOI 10.1109/JIOT.2023.3343611; arXiv:2306.10912)
    DURUM: İNDİRİLDİ - `2023_sciancalepore_jamming-detection-low-ber-deep-learning.pdf`
    Projeye ilgisi: Ham I/Q'dan görüntüye dönüştürüp CNN (denetimli) ve seyrek otokodlayıcı (tek-sınıf) modlarıyla jamming tespiti; denetimli yöntemin jamming örneği görmesinin avantajını raporlar (bizim %98 constant yanılgısı sonucuyla birlikte tartışılabilir).

12. **Weak-jamming detection in IEEE 802.11 networks: Techniques, scenarios and mobility** - M. Hanegraaf, S. Sciancalepore, G. Oligeri - 2026 - Computer Networks (DOI 10.1016/j.comnet.2026.112160; arXiv:2505.19633)
    DURUM: İNDİRİLDİ - `2025_hanegraaf_weak-jamming-detection-80211.pdf`
    Projeye ilgisi: Zayıf jamming'in Wi-Fi'da çeşitli ML tekniklerle tespiti; düşük güçlü saldırıda tespit zorluğunun tartışılması için.

13. **Anonymous Jamming Detection in 5G with Bayesian Network Model Based Inference Analysis** - Y. Wang, S. Jere, S. Banerjee, L. Liu, S. S. Shetty, S. Dayekh - 2022 - IEEE HPSR 2022 (DOI 10.1109/HPSR54439.2022.9831286; arXiv:2311.17097)
    DURUM: İNDİRİLDİ - `2022_wang_anonymous-jamming-detection-5g-bayesian.pdf`
    Projeye ilgisi: Başlığa göre jammer kimliği/türü bilinmeden ("anonim") 5G jamming tespiti; bilinmeyen saldırı bağlamında ilgili (ayrıntılar tam metinden doğrulanmadı).

14. **Spectrum Anomaly Detection in OFDMA Systems: Simulation Framework and Benchmark Dataset** - A. Schösser, M. Salehi, S. Ma, P. Schulz, G. P. Fettweis - 2026 - arXiv ön baskı (arXiv:2606.02102)
    DURUM: İNDİRİLMEDİ (başka klasörde mevcut) - `../01_mevcut_kaynakca_ve_derlemeler/2026_schosser_spectrum-anomaly-ofdma-dataset.pdf`
    Projeye ilgisi: Spektrum anomali tespiti için simülasyon çerçevesi ve kıyas veri seti; denetimsiz anomali yöntemlerini değerlendirmek için.

15. **Crowdsourced Wireless Spectrum Anomaly Detection** - S. Rajendran, V. Lenders, W. Meert, S. Pollin - 2019 - IEEE Trans. Cognitive Communications and Networking (DOI 10.1109/TCCN.2019.2947512)
    DURUM: İNDİRİLDİ - `2019_rajendran_crowdsourced-wireless-spectrum-anomaly-detection.pdf` (KU Leuven Lirias açık erişim sürümü)
    Projeye ilgisi: Spektrum anomali tespitinin (otokodlayıcı tabanlı, denetimsiz) erken ve sık atıf alan örneği; "yalnızca normal spektrumla eğitim" yaklaşımının temel kaynağı.

16. **Detection of Primary User Emulation Attack (PUEA) in Cognitive Radio Networks Using One-Class Classification** - B. Chhetry, N. Marchang - 2021 - arXiv ön baskı (arXiv:2106.10964)
    DURUM: İNDİRİLDİ - `2021_chhetry_puea-detection-one-class-cognitive-radio.pdf`
    Projeye ilgisi: Bilişsel radyoda birincil kullanıcı taklit saldırısını tek-sınıf sınıflandırma ile tespit eder; kablosuz saldırıda tek-sınıf yaklaşımının örneği.

17. **Energy-based jamming pattern open set recognition via spiking wavelet transformer** - X. Zhong, J. Cui, Z. Ji - 2025 - PLOS ONE (DOI 10.1371/journal.pone.0325381; PMC12201642)
    DURUM: İNDİRİLDİ - `2025_zhong_energy-based-jamming-pattern-osr-spiking-wavelet-transformer.pdf`
    Projeye ilgisi: Jamming desenleri için açık-küme tanıma; enerji tabanlı OOD skoru ile bilinmeyen jamming türünü reddeder. Bizim "saklanan saldırı türü" testinin yöntemsel emsali (radar/EW bağlamı).

18. **Intelligent Radar Jamming Recognition in Open Set Environment Based on Deep Learning Networks** - Y. Zhou, S. Shang, X. Song, S. Zhang, T. You, L. Zhang - 2022 - Remote Sensing 14(24), 6220 (DOI 10.3390/rs14246220; CC-BY)
    DURUM: İNDİRİLEMEDİ - MDPI sunucusu otomatik indirmeye "Access Denied" döndü (2 farklı URL denendi; engel aşılmaya çalışılmadı).
    Bağlantılar: DOI https://doi.org/10.3390/rs14246220 ; açık erişim sayfası https://www.mdpi.com/2072-4292/14/24/6220 ; PDF https://www.mdpi.com/2072-4292/14/24/6220/pdf?version=1670567274 (tarayıcıdan elle indirilebilir)
    Projeye ilgisi: Radar jamming için açık-küme tanıma (güven skoru ve OpenMax tabanlı); denetimli modelin bilinmeyen jamming'i bilinen sınıfa zorlaması sorununu doğrudan işler.

## B. Kablosuz/RF sinyallerinde açık-küme tanıma, bilinmeyen modülasyon / standart / cihaz

19. **Open-set Classification of Common Waveforms Using A Deep Feed-forward Network and Binary Isolation Forest Models** - C. T. Fredieu, A. F. Martone, R. M. Buehrer - 2021 (arXiv) / 2022 - IEEE WCNC 2022 (DOI 10.1109/WCNC51071.2022.9771843; arXiv:2110.00252)
    DURUM: İNDİRİLDİ - `2021_fredieu_open-set-waveforms-isolation-forest.pdf`
    Projeye ilgisi: Açık-küme RF dalga biçimi sınıflandırmasında Isolation Forest kullanımı; projenin yöntem seçimine en yakın literatür emsali (en önemli kaynaklardan biri).

20. **Open Set Wireless Standard Classification Using Convolutional Neural Networks** - S. R. Shebert, A. F. Martone, R. M. Buehrer - 2021 - IEEE MILCOM 2021 (DOI 10.1109/MILCOM52596.2021.9653119; arXiv:2108.01656)
    DURUM: İNDİRİLDİ - `2021_shebert_open-set-wireless-standard-cnn.pdf`
    Projeye ilgisi: Bilinmeyen kablosuz standartlarının açık-küme reddi; denetimli CNN'in bilinmeyeni bilinen sınıfa atama sorununu ölçer.

21. **Open Set Wireless Signal Classification: Augmenting Deep Learning with Expert Feature Classifiers** - S. R. Shebert, B. H. Kirk, R. M. Buehrer - 2023 - arXiv ön baskı (arXiv:2302.03749)
    DURUM: İNDİRİLDİ - `2023_shebert_open-set-wireless-expert-feature-classifiers.pdf`
    Projeye ilgisi: Elle tasarlanmış (uzman) öznitelik sınıflandırıcılarını derin öğrenmeyle birleştirerek açık-küme başarısını artırır; bizim 10 öznitelikli klasik ML yaklaşımını gerekçelendirir.

22. **Open Set Modulation Recognition Based on Dual-Channel LSTM Model** - Y. Guo, H. Jiang, J. Wu, J. Zhou - 2020 - arXiv ön baskı (arXiv:2002.12037)
    DURUM: İNDİRİLDİ - `2020_guo_open-set-modulation-dual-channel-lstm.pdf`
    Projeye ilgisi: I/Q üzerinde açık-küme modülasyon tanıma (RadioML tarzı); bilinmeyen modülasyon reddi için eşik tabanlı temel yaklaşım.

23. **Class Information Guided Reconstruction for Automatic Modulation Open-Set Recognition** - Z. Zhang, M. Zhu, J. Liu, Y. Li, S. Wang - 2024 - IEEE Trans. Cognitive Communications and Networking (DOI 10.1109/TCCN.2024.3460769; arXiv:2312.13023)
    DURUM: İNDİRİLDİ - `2023_zhang_class-information-guided-reconstruction-amc-osr.pdf`
    Projeye ilgisi: Yeniden-yapılandırma tabanlı açık-küme modülasyon tanıma; otokodlayıcı/yeniden-yapılandırma hatasının bilinmeyen tespitinde kullanımı.

24. **FSOS-AMC: Few-Shot Open-Set Learning for Automatic Modulation Classification Over Multipath Fading Channels** - H. Zhang, F. Zhou, Q. Wu, C. Yuen - 2025 - IEEE Internet of Things Journal (DOI 10.1109/JIOT.2025.3557973; arXiv:2410.10265)
    DURUM: İNDİRİLDİ - `2024_zhang_fsos-amc-few-shot-open-set.pdf`
    Projeye ilgisi: Az örnekle açık-küme modülasyon sınıflandırması; kanal etkisi altında bilinmeyen modülasyon tespiti.

25. **Deep Learning Approaches for Open Set Wireless Transmitter Authorization** - S. Hanna, S. Karunaratne, D. Cabric - 2020 - IEEE SPAWC 2020 (DOI 10.1109/SPAWC48557.2020.9154254; arXiv:2002.07777)
    DURUM: İNDİRİLDİ - `2020_hanna_open-set-transmitter-authorization.pdf`
    Projeye ilgisi: Yetkisiz (bilinmeyen) verici tespiti için derin öğrenme tabanlı açık-küme yaklaşımlarını ele alır; bilinmeyen saldırgan genellemesi için.

26. **Deep Open Set Identification for RF Devices** - Q. Wang, Q. Liu, Z. Zhang, H. Fang, X. Zheng - 2021 - arXiv ön baskı (arXiv:2112.02536)
    DURUM: İNDİRİLDİ - `2021_wang_deep-open-set-identification-rf-devices.pdf`
    Projeye ilgisi: RF cihaz kimliklendirmede açık-küme tanıma; bilinmeyen cihaz/saldırgan reddi yöntemleri.

27. **Out-of-Distribution (OOD) Detectors for Open-Set RF Fingerprinting** - S. Mondal, G. Sundaramoorthi - 2026 - arXiv ön baskı (arXiv:2606.12718)
    DURUM: İNDİRİLDİ - `2026_mondal_ood-detectors-open-set-rf-fingerprinting.pdf`
    Projeye ilgisi: Farklı OOD tespit yöntemlerini RF bağlamında kıyaslar; Isolation Forest'ı klasik OOD tabanlarıyla yan yana tartışmak için güncel kaynak.

## C. Genel temel eserler (açık-küme tanıma, izolasyon ormanı, tek-sınıf derin yöntemler)

28. **Towards Open Set Deep Networks (OpenMax)** - A. Bendale, T. E. Boult - 2016 - IEEE CVPR 2016 (DOI 10.1109/CVPR.2016.173; arXiv:1511.06233)
    DURUM: İNDİRİLDİ - `2016_bendale_openmax-towards-open-set-deep-networks.pdf`
    Projeye ilgisi: Softmax tabanlı denetimli modelin bilinmeyeni bilinen sınıfa zorlama sorununu ve OpenMax çözümünü tanımlar; Random Forest'ın %98 "constant" yanılgısının kavramsal çerçevesi.

29. **Recent Advances in Open Set Recognition: A Survey** - C. Geng, S.-J. Huang, S. Chen - 2020 - IEEE TPAMI (DOI 10.1109/TPAMI.2020.2981604; arXiv:1811.08581)
    DURUM: İNDİRİLDİ - `2020_geng_open-set-recognition-survey.pdf`
    Projeye ilgisi: Açık-küme tanıma için standart derleme; terminolojiyi (bilinen/bilinmeyen sınıf, açıklık) ve değerlendirme protokolünü oturtmak için.

30. **Open-Set Recognition: a Good Closed-Set Classifier is All You Need?** - S. Vaze, K. Han, A. Vedaldi, A. Zisserman - 2022 - ICLR 2022 (arXiv:2110.06207)
    DURUM: İNDİRİLDİ - `2022_vaze_open-set-good-closed-set-classifier.pdf`
    Projeye ilgisi: Kapalı-küme doğruluğu ile açık-küme performansı arasındaki ilişkiyi inceler; "denetimli model yüksek doğrulukta ama bilinmeyende başarısız" bulgumuza karşıt/tamamlayıcı bir bakış.

31. **Extended Isolation Forest** - S. Hariri, M. Carrasco Kind, R. J. Brunner - 2019 - IEEE Trans. Knowledge and Data Engineering (DOI 10.1109/TKDE.2019.2947676; arXiv:1811.02141)
    DURUM: İNDİRİLDİ - `2019_hariri_extended-isolation-forest.pdf`
    Projeye ilgisi: Isolation Forest'ın skor yanlılığını gideren genişletmesi; gelecek çalışma / karşılaştırma önerisi için.

32. **Deep One-Class Classification (Deep SVDD)** - L. Ruff, R. Vandermeulen, N. Goernitz, L. Deecke, S. A. Siddiqui, A. Binder, E. Müller, M. Kloft - 2018 - ICML 2018, PMLR 80:4393-4402
    DURUM: İNDİRİLDİ - `2018_ruff_deep-one-class-classification-deep-svdd.pdf`
    Projeye ilgisi: Derin tek-sınıf anomali tespitinin temel eseri (Deep SVDD); Isolation Forest'a derin alternatif olarak anılabilir.

33. **Isolation Forest** - F. T. Liu, K. M. Ting, Z.-H. Zhou - 2008 - 8th IEEE International Conference on Data Mining (ICDM 2008), s. 413-422 (DOI 10.1109/ICDM.2008.17)
    DURUM: İNDİRİLEMEDİ - OpenAlex'e göre açık erişimli yasal PDF yok (IEEE ücretli; yalnızca üçüncü taraf akademik-paylaşım kopyaları bulundu, bunlar kullanılmadı).
    Bağlantılar: DOI https://doi.org/10.1109/ICDM.2008.17 ; kayıt (BibTeX) https://researchr.org/publication/LiuTZ08 ; kurumsal erişim önerilir.
    Projeye ilgisi: Projenin Aşama 1 anomali tespit yönteminin özgün makalesi; kaynakçada mutlaka yer almalı.

34. **Toward Open Set Recognition** - W. J. Scheirer, A. de Rezende Rocha, A. Sapkota, T. E. Boult - 2013 (OpenAlex: 2012 çevrimiçi) - IEEE TPAMI 35(7):1757-1772 (DOI 10.1109/TPAMI.2012.256)
    DURUM: İNDİRİLEMEDİ - OpenAlex'e göre açık erişimli yasal PDF yok; yalnızca yetkisiz bir GitHub yansısı bulundu, telif nedeniyle kullanılmadı.
    Bağlantılar: DOI https://doi.org/10.1109/TPAMI.2012.256 ; dblp kaydı https://dblp1.uni-trier.de/rec/journals/pami/ScheirerRSB13.html
    Projeye ilgisi: Açık-küme tanıma problemini ve "açık alan riski" kavramını tanımlayan kurucu makale; projenin açık-küme testinin kuramsal dayanağı.

---

## Özet

- Bulunan ve doğrulanan kayıt: 34
- Bu klasöre indirilen PDF: 29
- Başka klasörde mevcut (tekrar indirilmedi): 2 (no. 1 ve 14)
- İndirilemeyen: 3 (no. 18 MDPI erişim engeli; no. 33 ve 34 yasal açık erişim PDF yok)
- Doğrulama notu: Yayın yeri bilgisi OpenAlex / arXiv sayfalarından alınmıştır. "arXiv ön baskı" yazılı kayıtların hakemli yayın yeri doğrulanamadı. No. 17'nin künyesi PLOS ONE/PMC arama sonuçlarından (DOI 10.1371/journal.pone.0325381) alınmıştır; PMC sayfası tarayıcı doğrulaması nedeniyle doğrudan okunamamıştır, PDF PLOS ONE'dan indirilmiştir.
- Bu taramada Google Scholar kullanılmadı; arXiv API hız sınırına (HTTP 429) takıldığı için bazı künyeler OpenAlex ve arxiv.org/abs sayfalarından doğrulandı.
