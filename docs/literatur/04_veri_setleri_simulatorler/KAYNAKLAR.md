# 04 - Veri setleri, simülatörler, sentetik veri, sim-to-real (KAYNAKLAR)

Hazırlanma tarihi: 2026-11-25. Künyeler OpenAlex kaydı, arXiv özet sayfası veya yayıncı/Zenodo kaydından bu oturumda doğrulanmıştır. Yalnızca makaleler indirilmiştir; veri setleri indirilmemiştir, bağlantıları aşağıdadır.

Projede zaten olanlar (tekrar aranmadı): Alhazbi ve ark. (Data in Brief, kapalı mekan jamming ölçümleri; yayıncı kaydında yıl 2022, DOI 10.1016/j.dib.2022.108773), Schösser ve ark. 2026 (OFDMA anomali veri seti), WSN-DS (Almomani 2016).

Özet: 22 makale İNDİRİLDİ, 9 makale İNDİRİLEMEDİ (bağlantılarıyla listelendi). Ayrıca başka klasörlerde zaten mevcut olduğu için tekrar indirilmeyen çalışmalar en altta belirtilmiştir.

---

## A. İNDİRİLEN MAKALELER

### A1. Jamming veri setleri ve dataset makaleleri

1. **WiFiSpectralJam: A Large-Scale Open Wi-Fi Spectral Scan Dataset with Controlled RF Jamming**
   - Yazarlar: Dania Herzalla, Govind Singh, Willian T. Lunardi, Martin Andreoni Lopez
   - Yıl / yer: 2026, arXiv:2608.15728 (ön baskı)
   - DURUM: İNDİRİLDİ -> `2026_herzalla_wifispectraljam-dataset.pdf`
   - Veri seti: https://www.kaggle.com/datasets/daniaherzalla/radio-frequency-jamming/data (arXiv özet sayfasında verilen bağlantı)
   - Projeye ilgisi: HackRF ile güç/kanal/dalga biçimi değiştirilerek üretilmiş, kontrollü jamming içeren büyük bir açık veri seti. Spektral tarama (CSV) tabanlı olduğundan ham I/Q'dan farklıdır, ama kontrollü güç değişimi ve etiketleme tasarımı için karşılaştırma sağlar.

2. **Two methods for Jamming Identification in UAVs Networks using New Synthetic Dataset**
   - Yazarlar: Joseanne Viana, Hamed Farkhari, Luis Miguel Campos, Pedro Sebastiao, Francisco Cercas, Luis Bernardo, Rui Dinis
   - Yıl / yer: 2022, IEEE VTC2022-Spring (arXiv:2203.11373)
   - DURUM: İNDİRİLDİ -> `2022_viana_jamming-identification-uav-synthetic-dataset.pdf`
   - Veri seti: arXiv sayfasında bağlantı verilmemiş (doğrulanamadı).
   - Projeye ilgisi: Simülasyonla üretilmiş sentetik jamming veri setiyle çalışır; özette derin ağın ~%99,99 doğruluğa ulaştığı belirtilir. Sentetik veride yüksek doğruluk ve genelleme tartışması için doğrudan karşılaştırma noktasıdır.

3. **The S-ICDF Dataset: Sionna-Simulated Dynamic Interference Characterization and Direction Finding**
   - Yazarlar: Christian Wielenberg, Lucas Heublein, Jonathan Ott, Alexander Mattick, Nisha Lakshmana Raichur, Jonas Pirkl, Lukas Schelenz, Tobias Feigl, George Yammine, Christopher Mutschler, Felix Ott
   - Yıl / yer: 2026, IPIN 2026 (arXiv:2607.03411)
   - DURUM: İNDİRİLDİ -> `2026_wielenberg_s-icdf-sionna-dataset.pdf`
   - Veri seti: https://gitlab.cc-asp.fraunhofer.de/darcy_gnss/sicdf_dataset (arXiv özet sayfasından)
   - Projeye ilgisi: Sionna ile üretilmiş, 102 yapılandırmalı simüle girişim veri seti. Gerçek veri toplamanın zorluğuna karşı simülasyon veri seti kurma örneğidir.

4. **Analyzing and Characterizing Multi-Source Interference Effects at Jammertest Norway 2025**
   - Yazarlar: Lucas Heublein, Iñigo Cortés, Tobias Feigl, Alexander Rügamer, Felix Ott
   - Yıl / yer: 2026, ION GNSS+ bildirileri (arXiv:2608.15819)
   - DURUM: İNDİRİLDİ -> `2026_heublein_jammertest-norway-2025-interference-effects.pdf`
   - Veri seti: Zenodo "Jammertest 2025 GNSS Interference Dataset" https://doi.org/10.5281/zenodo.21332688 (OpenAlex kaydı; makalede bağlantı ayrıca doğrulanamadı)
   - Projeye ilgisi: Gerçek saha (Andøya) GNSS girişim kayıtları ve 17 ML mimarisinin kıyası; alan/test alanı değişince doğruluğun düştüğü bildirilir, yani alan kayması örneğidir.

5. **Cognitive Radio for Satellite TT&C System: A General Dataset Using Software-defined Radio (RML24)**
   - Yazarlar: Yi Zhang, Bo Zang, Hongbing Ji, Lin Li, Shiyao Li, Leyan Chen
   - Yıl / yer: 2026, Scientific Data
   - DURUM: İNDİRİLDİ -> `2026_zhang_rml24-satellite-ttc-sdr-dataset.pdf`
   - Veri seti: makalenin "Data availability" bölümünde (bağlantı ayrıca doğrulanamadı); TechRxiv ön baskısı https://doi.org/10.36227/techrxiv.173272736.62578672
   - Projeye ilgisi: SDR/RF alıcı-verici ile üretilmiş 1,3 milyondan fazla örnekli RadioML tarzı veri seti; I/Q veri seti dokümantasyonu (üretim, etiketleme, paylaşım) için model makaledir.

6. **Detection of Mobile LoRa Jammers**
   - Yazarlar: Bartlomiej Jozef Bleszynski, Charalampos Orfanidis, Xenofon Fafoutis
   - Yıl / yer: 2023, IEEE Virtual Conference on Communications (VCC)
   - DURUM: İNDİRİLDİ -> `2023_bleszynski_detection-mobile-lora-jammers.pdf`
   - Veri seti: doğrulanamadı.
   - Projeye ilgisi: LoRa'da hareketli jammer tespiti; paket/RSSI temelli saha deneyi. Jamming veri/deney tasarımı için LoRa kolu.

7. **JamShield: A Machine Learning Detection System for Over-the-Air Jamming Attacks**
   - Yazarlar: Ioannis Panitsas, Yagmur Yigit, Leandros Tassiulas, Leandros A. Maglaras, Berk Canberk
   - Yıl / yer: 2025, IEEE ICC 2025 (arXiv:2507.11483)
   - DURUM: İNDİRİLDİ -> `2025_panitsas_jamshield-ml-ota-jamming-detection.pdf`
   - Veri seti: özet "kendi toplanan over-the-air ve herkese açık veri seti" der; bağlantı sayfada yok.
   - Projeye ilgisi: Over-the-air toplanan veri ile herkese açık veri birlikte kullanılıyor; sim-to-real boşluğu sınırlılığı için bir karşılaştırma örneği.

### A2. SDR / GNU Radio ile jamming, test yatağı, gerçeklemeler

8. **Impact of Reactive Jamming Attacks on LoRaWAN: a Theoretical and Experimental Study**
   - Yazarlar: Amavi Dossa, Andreas Peter Burg, El Mehdi Amhoud
   - Yıl / yer: 2025, IEEE PIMRC 2025 (arXiv:2501.18339)
   - DURUM: İNDİRİLDİ -> `2025_dossa_reactive-jamming-lorawan-theory-experiment.pdf`
   - Veri seti: yok (sayfada bağlantı yok).
   - Projeye ilgisi: Reaktif jammer GNU Radio'da gerçeklenmiş (özet sayfasına göre); GNU Radio tabanlı jammer üretiminin deneysel doğrulanmasına örnek.

9. **RFRL Gym: A Reinforcement Learning Testbed for Cognitive Radio Applications**
   - Yazarlar: Daniel Rosen, Illa Rochez, Caleb McIrvin, Joshua Lee, Kevin D'Alessandro, Maxwell Wiecek, Nhan Hoang, Ramzy Saffarini, Sam Philips, Vanessa Jones, Will Ivey, Zavier Harris-Smart, Zavion Harris-Smart, Zayden Chin, Amos Y. Johnson, Alyse M. Jones, William Christopher Headley
   - Yıl / yer: 2023, IEEE ICMLA 2023 (arXiv:2401.05406)
   - DURUM: İNDİRİLDİ -> `2024_rosen_rfrl-gym-cognitive-radio-testbed.pdf` (dosya adındaki yıl arXiv yılıdır)
   - Veri seti: yok; kod henüz açılmamış (yazarlar açacaklarını belirtiyor).
   - Projeye ilgisi: Spektrum algılama ve jamming senaryoları için simülasyon ortamı; yalnızca simülasyon, sınırlı doğrudan ilgi (savunma/RL tarafı).

### A3. Simülatörler (Sionna, ns-3 vb.)

10. **Sionna: An Open-Source Library for Next-Generation Physical Layer Research**
    - Yazarlar: Jakob Hoydis, Sebastian Cammerer, Fayçal Ait Aoudia, Avinash Vem, Nikolaus Binder, Guillermo Marcus, Alexander Keller
    - Yıl / yer: 2022, arXiv:2203.11854
    - DURUM: İNDİRİLDİ -> `2022_hoydis_sionna-open-source-library.pdf`
    - Veri seti: yok (kütüphane).
    - Projeye ilgisi: Fiziksel katman (kanal modelleri, OFDM, 5G NR) için temel simülatör makalesi; Sionna ile jamming veri seti üretmek isteyenin temel kaynağı.

11. **PyJama: Differentiable Jamming and Anti-Jamming with NVIDIA Sionna**
    - Yazarlar: Fabian Ulbricht, Gian Marti, Reinhard Wiesmayr, Christoph Studer
    - Yıl / yer: 2024, arXiv:2407.15473 (özet sayfasına göre IEEE SPAWC 2024'te kabul edilmiş)
    - DURUM: İNDİRİLDİ -> `2024_ulbricht_pyjama-differentiable-jamming-sionna.pdf`
    - Veri seti: yok; kod bağlantısı özet sayfasında verilmemiş.
    - Projeye ilgisi: Sionna'ya jamming/anti-jamming ekleyen kütüphane; jamming'in simülasyonla (MIMO-OFDM) üretilmesine doğrudan örnek.

12. **Ns3 meets Sionna: Using Realistic Channels in Network Simulation**
    - Yazarlar: Anatolij Zubow, Yannik Pilz, Sascha Rösler, Falko Dressler
    - Yıl / yer: 2024, arXiv:2412.20524
    - DURUM: İNDİRİLDİ -> `2024_zubow_ns3-meets-sionna-realistic-channels.pdf`
    - Veri seti: yok.
    - Projeye ilgisi: ns-3'te ray-tracing tabanlı gerçekçi kanal; ağ benzetimlerinde varsayılan kanal modellerinin gerçekçilik sınırı (sim-to-real) tartışmasına dayanak.

### A4. RF veri setleri, sentetik veri üretimi, kanal modelleri

13. **Over-the-Air Deep Learning Based Radio Signal Classification**
    - Yazarlar: Timothy J. O'Shea, Tamoghna Roy, T. Charles Clancy
    - Yıl / yer: arXiv:1712.04578 (Aralık 2017); IEEE JSTSP 2018 (OpenAlex DOI: 10.1109/JSTSP.2018.2797022)
    - DURUM: İNDİRİLDİ -> `2018_oshea_over-the-air-dl-radio-signal-classification.pdf`
    - Veri seti: RadioML 2018 (DeepSig); bağlantı bu oturumda doğrulanmadı.
    - Projeye ilgisi: RadioML'in temel makalesi; kanal bozuklukları altında sentetik ve over-the-air veri ayrımı ve I/Q tabanlı sınıflandırma için temel eser.

14. **CSRD2025: A Large-Scale Synthetic Radio Dataset for Spectrum Sensing in Wireless Communications**
    - Yazarlar: Shuo Chang, Rui Sun, Jiashuo He, Sai Huang, Kan Yu, Zhiyong Feng
    - Yıl / yer: 2025, IEEE JSAC (arXiv:2508.19552)
    - DURUM: İNDİRİLDİ -> `2025_chang_csrd2025-synthetic-radio-dataset.pdf`
    - Veri seti / kod: https://github.com/Singingkettle/ChangShuoRadioData (arXiv özet sayfası)
    - Projeye ilgisi: İstatistiksel ve ışın izleme kanalları ile RF bozulmalarını içeren sentetik veri simülatörü; veri gerçekçiliği için kontrol listesi niteliğinde.

15. **Large Scale Radio Frequency Signal Classification (Sig53 / TorchSig)**
    - Yazarlar: Luke Boegner, Manbir Gulati, Garrett Vanhoy, Phillip Vallance, Bradley Comar, Silvija Kokalj-Filipović, Craig T. Lennon, Robert D. Miller
    - Yıl / yer: 2022, arXiv:2207.09918
    - DURUM: İNDİRİLDİ -> `2022_boegner_large-scale-rf-signal-classification.pdf`
    - Veri seti: Sig53 / TorchSig araç seti; bağlantı arXiv sayfasında yok (doğrulanamadı).
    - Projeye ilgisi: Sentetik RF veri üretimi, çevrimiçi (on-the-fly) üretim ve sinyale özgü artırma yöntemleri; sabit tek kayıt yerine çok çeşitli üretim fikri için.

16. **Robust and Fast Automatic Modulation Classification with CNN under Multipath Fading Channels**
    - Yazarlar: Kürşat Tekbıyık, Ali Rıza Ekti, Ali Görçin, Güneş Karabulut Kurt, Cihat Keçeci
    - Yıl / yer: 2020, IEEE VTC2020-Spring (arXiv:1911.04970)
    - DURUM: İNDİRİLDİ -> `2020_tekbiyik_amc-cnn-multipath-fading.pdf`
    - Veri seti: HisarMod2019.1 (5 sönümleme türü) ve RadioML2016.10a kullanılıyor; bağlantı doğrulanamadı.
    - Projeye ilgisi: Çok yollu/sönümlemeli kanal modelleriyle veri üretimi; projedeki FIR çok yollu kanalın (taps [1, 0.3+0.3j]) tek ve basit olduğunu tartışmak için kıyas.

### A5. Sim-to-real, alan kayması, veri gerçekçiliği

17. **RF Signal Classification with Synthetic Training Data and its Real-World Performance**
    - Yazar: Stefan Scholl
    - Yıl / yer: 2022, arXiv:2206.12967
    - DURUM: İNDİRİLDİ -> `2022_scholl_rf-signal-classification-synthetic-training-real-world.pdf`
    - Veri seti: yok.
    - Projeye ilgisi: Yalnızca sentetik veriyle eğitilip SDR ile alınan gerçek sinyallerde (20 kısa dalga sinyal türü) %95'e varan doğruluk; hangi bozulmaların (faz, frekans, örnekleme kayması, kanal, gürültü) sentetik veriye eklenmesi gerektiğini gösterir. Sim-to-real tartışması için en doğrudan makalelerden biri.

18. **Training data augmentation for deep learning radio frequency systems**
    - Yazarlar: William H. Clark, Steven Hauser, William Christopher Headley, Alan J. Michaels
    - Yıl / yer: 2021, The Journal of Defense Modeling and Simulation (arXiv:2010.00178)
    - DURUM: İNDİRİLDİ -> `2021_clark_training-data-augmentation-dl-rf.pdf`
    - Veri seti: yok.
    - Projeye ilgisi: Sentetik, yakalanmış (gerçek) ve artırılmış veriyi karşılaştırır; gerçek veri en iyi sonucu verir, sentetik/gerçek dengesi ölçülür. Kullanım durumuna uygun gerçek veri gereksinimini savunmak için.

19. **Deep Learning for RF Signal Classification in Unknown and Dynamic Spectrum Environments**
    - Yazarlar: Yi Shi, Kemal Davaslıoğlu, Yalin E. Sagduyu, William Christopher Headley, Michael Fowler, Gilbert Green
    - Yıl / yer: 2019, IEEE DySPAN 2019 (arXiv:1909.11800)
    - DURUM: İNDİRİLDİ -> `2019_shi_dl-rf-classification-unknown-dynamic-spectrum.pdf`
    - Veri seti: yok (sayfada belirtilmemiş).
    - Projeye ilgisi: Bilinmeyen sinyal (aykırı) tespiti ve sürekli öğrenme; eğitimde görülmeyen jammer türlerine karşı açık küme/alan kayması çerçevesi.

20. **Should I Use This Synthetic Dataset for Training? How to Test with Minimal Real Data**
    - Yazarlar: Zhenyu Tao, Wei Xu, Xiaohu You, Petar Popovski, Osvaldo Simeone
    - Yıl / yer: 2026, arXiv:2608.27996
    - DURUM: İNDİRİLDİ -> `2026_tao_synthetic-dataset-minimal-real-data-test.pdf`
    - Veri seti: yok.
    - Projeye ilgisi: Sentetik (dijital ikiz) veri kümesinin gerçek veride işe yarayıp yaramadığını az sayıda gerçek örnekle sınama yöntemi; kablosuz deneyleri (paket zamanlama, radyo haritası) içerir. Projedeki sim-to-real sınırlılığını nicel biçimde ele almak için yöntemsel kaynak.

21. **How to Bridge the Sim-to-Real Gap in Digital Twin-Aided Telecommunication Networks**
    - Yazarlar: Clément Ruah, Houssem Sifaou, Osvaldo Simeone, Bashir M. Al-Hashimi
    - Yıl / yer: 2026, IEEE Communications Magazine (arXiv:2507.07067)
    - DURUM: İNDİRİLDİ -> `2026_ruah_sim-to-real-gap-digital-twin-telecom.pdf`
    - Veri seti: yok.
    - Projeye ilgisi: Simülasyon-gerçek farkını kalibrasyon ve boşluğa dayanıklı eğitimle kapatma yaklaşımlarına genel bakış.

22. **On the Effects of Modeling on the Sim-to-Real Transfer Gap in Twinning the POWDER Platform**
    - Yazarlar: Maxwell McManus, Yuqing Cui, Josh Zhaoxi Zhang, Elizabeth Serena Bentley, Michael J. Medley, Nicholas Mastronarde, Zhangyu Guan
    - Yıl / yer: 2024, IEEE Globecom Workshops (arXiv:2408.14465)
    - DURUM: İNDİRİLDİ -> `2024_mcmanus_sim-to-real-transfer-gap-powder-twin.pdf`
    - Veri seti: yok.
    - Projeye ilgisi: Gerçek test yatağının dijital ikizinde yol kaybı modelinin sonuçları nasıl değiştirdiği; kanal modeli seçimi ve sim-to-real farkı için örnek.

---

## B. İNDİRİLEMEYEN MAKALELER

Neden: yayıncı siteleri (Wiley, MDPI, ACM, IEEE, TechRxiv, TU/e) otomatik indirmede bot engeli / erişim reddi (HTTP 403 veya WAF doğrulaması) döndürdü; engel aşılmaya çalışılmadı.

23. **RF Jamming Dataset: A Wireless Spectral Scan Approach for Malicious Interference Detection**
    - Yazarlar: Abubakar Sani Ali, Willian T. Lunardi, Govind Singh, Lina Bariah, Michael Baddeley, Martin Andreoni Lopez, Jean-Pierre Giacalone, Sami Muhaidat
    - Yıl / yer: 2024, IEEE Communications Magazine
    - DURUM: İNDİRİLEMEDİ (TechRxiv/figshare WAF doğrulaması). Bağlantılar: https://doi.org/10.36227/techrxiv.21524508 ; https://doi.org/10.1109/mcom.003.2300483
    - Veri seti: makalede belirtilmiş olabilir, doğrulanamadı (WiFiSpectralJam makalesi aynı grubun devamıdır).
    - Projeye ilgisi: Spektral tarama + JamRF ile jamming tespit test yatağı ve veri seti; jammer üretimi ve etiketleme prosedürü için ilgili.

24. **JamRF: Performance Analysis, Evaluation, and Implementation of RF Jamming Over Wi-Fi**
    - Yazarlar: Abubakar Sani Ali, Michael Baddeley, Lina Bariah, Martin Andreoni Lopez, Willian T. Lunardi, Jean-Pierre Giacalone, Sami Muhaidat
    - Yıl / yer: 2022, IEEE Access
    - DURUM: İNDİRİLEMEDİ (doi.org yönlendirmesi PDF vermedi). Bağlantı: https://doi.org/10.1109/access.2022.3230895 (yayıncıya göre açık erişim)
    - Projeye ilgisi: Düşük maliyetli SDR ile farklı jammer türlerinin tasarımı ve gerçeklenmesi; projedeki jammer türleri (constant/tone/sweep/pulse) için SDR gerçekleme kıyası.

25. **Low-Cost Implementation of Reactive Jammer on LoRaWAN Network**
    - Yazarlar: Toni Perković, Hrvoje Rudeš, Slaven Damjanović, Antun Nakić
    - Yıl / yer: 2021, Electronics (MDPI)
    - DURUM: İNDİRİLEMEDİ (MDPI 403 Access Denied). Bağlantı: https://www.mdpi.com/2079-9292/10/7/864
    - Projeye ilgisi: LoRaWAN'a düşük maliyetli reaktif jammer gerçeklemesi.

26. **Mitigating RF jamming attacks at the physical layer with machine learning**
    - Yazarlar: Marko Jacovic, Xaime Rivas Rey, Geoffrey Mainland, Kapil Ramesh Dandekar
    - Yıl / yer: 2022, IET Communications
    - DURUM: İNDİRİLEMEDİ (Wiley Cloudflare doğrulaması). Bağlantı: https://doi.org/10.1049/cmu2.12461 (Semantic Scholar'a göre CC BY altında açık erişim)
    - Projeye ilgisi: SDR tabanlı çevrimiçi jammer sınıflandırma platformu ve donanım-döngüde ışın izleme emülasyonu; sim-to-real köprüsü için ilginç bir yöntem.

27. **Machine-Learning-Assisted Cyclostationary Spectral Analysis for Joint Signal Classification and Jammer Detection at the Physical Layer of Cognitive Radio**
    - Yazarlar: Tassadaq Nawaz, Ali Alzahrani
    - Yıl / yer: 2023, Sensors (MDPI)
    - DURUM: İNDİRİLEMEDİ (MDPI 403; PMC PDF de HTML döndürdü). Bağlantılar: https://www.mdpi.com/1424-8220/23/16/7144 ; PMC: https://pmc.ncbi.nlm.nih.gov/articles/PMC10459740/
    - Projeye ilgisi: Siklostasyoner öznitelik tabanlı jammer tespiti; zaman-frekans öznitelikleri başlığı için.

28. **Machine Learning-Based Jamming Detection and Classification in Wireless Networks**
    - Yazarlar: Enrico Testi, Luca Arcangeloni, Andrea Giorgetti
    - Yıl / yer: 2023, ACM WiseML
    - DURUM: İNDİRİLEMEDİ (ACM erişimi). Bağlantı: https://doi.org/10.1145/3586209.3591395
    - Projeye ilgisi: Enerji dedektörü + probleme özgü öznitelik çıkarma + boyut indirgeme + çok sınıflı sınıflandırma; öznitelik tasarımı için.

29. **A Deep Neural Network Approach for Classification of GNSS Interference and Jamming**
    - Yazarlar: Iman Ebrahimi Mehr, Fabio Dovis
    - Yıl / yer: 2024, IEEE Trans. on Aerospace and Electronic Systems
    - DURUM: İNDİRİLEMEDİ (TechRxiv WAF; yayıncı sürümü açık erişim işaretli ama otomatik indirilemedi). Bağlantılar: https://doi.org/10.1109/taes.2024.3462662 ; https://doi.org/10.36227/techrxiv.22212121
    - Projeye ilgisi: GNSS girişim/jamming sınıflandırma (zaman-frekans girdisi).

30. **BloodHound: Early Detection and Identification of Jamming at the PHY-layer**
    - Yazarlar: Saeif Alhazbi, Savio Sciancalepore, Gabriele Oligeri
    - Yıl / yer: 2023, IEEE CCNC 2023
    - DURUM: İNDİRİLEMEDİ (TU/e dosya sunucusu PDF vermedi). Bağlantılar: https://doi.org/10.1109/ccnc51644.2023.10059878 ; https://research.tue.nl/files/352562836/BloodHound_Early_Detection_and_Identification_of_Jamming_at_the_PHY-layer.pdf
    - Veri seti: Alhazbi IQ veri seti (aşağıda).
    - Projeye ilgisi: Projede olan Alhazbi veri setiyle aynı grup; PHY katmanında erken jamming tespiti ve tanımlama.

31. **On the Impact of CDL and TDL Augmentation for RF Fingerprinting Under Impaired Channels**
    - Yazarlar: Ömer Melih Gül, Michel Kulhandjian, Burak Kantarcı
    - Yıl / yer: 2024, Wireless World: Research and Trends Magazine (DOI 10.13052/2794-7254.006)
    - DURUM: İNDİRİLEMEDİ (OpenAlex'in verdiği indirme bağlantısı PDF vermedi). Bağlantı: https://doi.org/10.13052/2794-7254.006
    - Projeye ilgisi: Kanal modeli (CDL/TDL) ile veri artırma ve bozuk kanallarda dayanıklılık; kanal çeşitlendirmenin sim-to-real'e katkısı.

---

## C. BAŞKA KLASÖRDE ZATEN MEVCUT OLDUĞU İÇİN TEKRAR İNDİRİLMEYEN (bu görev alanıyla ilgili)

Aşağıdakiler bu görevin aramasında da çıktı; başka klasörlerde (01/02/03) zaten var:
- Varotto ve ark. 2024, 5G jammer spektrogramları (01, 02, 03); Varotto ve ark. 2024 tek sınıflı GLRT (02, 03)
- Kuili ve ark. 2025, CWGAN-GP + CAE, 5G-NR (03)
- Jere ve ark. 2023, Bayesian çıkarımlı ML ile 5G NR jamming tespiti (02)
- Heublein ve ark. 2025, IQ + FFT spektrogram + AoA, GNSS jammer yerelleştirme (02)
- Sciancalepore ve ark. 2023, düşük BER'li mobil kapalı mekan jamming tespiti (02)
- Li ve ark. 2022, OFDM tabanlı İHA jamming tespiti, öznitelik ve spektrogram (02)
- Hanegraaf ve ark. 2025, IEEE 802.11'de zayıf jamming tespiti (03)
- Pirayesh ve Zeng 2022, jamming anketi (01)
- Schösser ve ark. 2026 (01)
(Bu oturumda Varotto x2, Kuili, Jere, Heublein 2025 ve Hanegraaf kopyaları indirilip silindi; yalnızca bir kopya kalması için.)

---

## D. AÇIK VERİ SETİ BAĞLANTILARI (indirilmedi)

| Veri seti | Tür | Bağlantı |
|---|---|---|
| Alhazbi ve ark., "A Dataset of IQ samples in Indoor Jamming Scenarios" (2022, 7 USRP X310; projede zaten var) | Ham I/Q, kapalı mekan | https://doi.org/10.5281/zenodo.7119039 |
| Alhazbi ve ark., fiziksel katman ölçümleri, Data in Brief | Makale | https://doi.org/10.1016/j.dib.2022.108773 |
| WiFiSpectralJam (Herzalla ve ark. 2026) | Wi-Fi spektral tarama (CSV, ~14,5 GB, HackRF jamming) | https://www.kaggle.com/datasets/daniaherzalla/radio-frequency-jamming/data |
| S-ICDF (Wielenberg ve ark. 2026) | Sionna simülasyonu, girişim/yön bulma | https://gitlab.cc-asp.fraunhofer.de/darcy_gnss/sicdf_dataset |
| Jammertest 2025 GNSS Interference Dataset (Heublein ve ark. 2026) | GNSS gerçek saha | https://doi.org/10.5281/zenodo.21332688 |
| Spectrum Highway Dataset 2 for Interference Classification in GNSS Data (Heublein ve ark.) | GNSS | https://doi.org/10.5281/zenodo.21336652 |
| Spectrum & Low-Cost (LC) Laboratory Dataset for Interference Classification in GNSS Data (Brieger ve ark. 2026) | GNSS laboratuvar | https://doi.org/10.5281/zenodo.21333334 |
| Raw IQ dataset for GNSS GPS jamming signal classification (Swinney, Woods; 2021) | GNSS ham I/Q | https://doi.org/10.5281/zenodo.4629684 |
| Dataset from: On Jamming Protection: A Framework for Detection, Identification & Mitigation (Chamou ve ark. 2026) | Jamming (ayrıntı doğrulanamadı) | https://doi.org/10.5281/zenodo.18254046 |
| Spectrum Anomaly Detection in OFDMA Systems (Schösser ve ark. 2026; projede var) | Simülasyon | https://doi.org/10.5281/zenodo.20341905 |
| CSRD2025 (Chang ve ark. 2025) | Sentetik RF, spektrogram | https://github.com/Singingkettle/ChangShuoRadioData |
| RF Jamming Dataset (Ali ve ark. 2024) | Wi-Fi spektral tarama | Bağlantı makaleden doğrulanamadı |

Not: Zenodo kayıtlarının künyeleri (başlık, yazar, yıl) OpenAlex'ten doğrulandı; Zenodo API'sinden dosya boyutu/lisans alınamadı.

---

## E. BOŞLUKLAR VE DÜRÜST NOTLAR

- Aranan ama bu oturumda doğrulanabilir sonuç bulunamayanlar: MATLAB 5G Toolbox ile jamming veri seti üretimi (makale bulunamadı); RML2016 (GNU Radio ile veri seti üretimi, O'Shea ve West) makalesi (bulunamadı/doğrulanmadı); IEEE DataPort/Kaggle üzerinde jamming'e özel ayrıca bağlantılı dataset makaleleri (WiFiSpectralJam dışında).
- "%100 doğruluk / ezberleme" konusunu doğrudan tartışan, kablosuz jamming'e özel bir makale bulunamadı. Dolaylı kaynaklar: Scholl 2022, Clark 2021, Tao 2026 (sentetik veri geçerliliği), Viana 2022 (sentetik veride ~%99,99).
- arXiv API ve Semantic Scholar API, aynı IP'den paralel çalışan diğer aramalar nedeniyle 429 (hız sınırı) döndürdü; bu nedenle arama ağırlıklı olarak OpenAlex ile yapıldı. Sonuçların kapsamı bu yüzden sınırlı olabilir.
- Zaman-frekans öznitelikleri üzerine özel makale: yukarıda Nawaz 2023 ve Testi 2023 (indirilemedi); ayrıca Li 2022 ve Varotto 2024 başka klasörlerde.
