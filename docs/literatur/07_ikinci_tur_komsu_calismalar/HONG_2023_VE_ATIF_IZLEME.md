# Hong, Kim, Lee (2023) ve atıf izleme

Hazırlanma tarihi: 2026-11-25. Bu belgedeki her olgu, bu oturumda bir web sayfasında/API'de ya da indirilen bir PDF'te görüldü; görülemeyenler "doğrulanamadı/bulunamadı" diye işaretlendi.

## 1. Makalenin durumu

**Hong S., Kim K., Lee S.-H., "A Hybrid Jamming Detection Algorithm for Wireless Communications: Simultaneous Classification of Known Attacks and Detection of Unknown Attacks", IEEE Communications Letters, 27(7), 1769-1773, Temmuz 2023.** DOI: 10.1109/LCOMM.2023.3275694 (Crossref). IEEE Xplore belge no 10123966.

- **Tam metin bulundu mu: HAYIR.** OpenAlex (W4376481309): `is_oa=false`, `best_oa_location=null`, depoda tam metin yok. Semantic Scholar: `CLOSED`. arXiv araması: sıfır sonuç. KAIST EE sayfası yalnızca özet ve iki şekil başlığı veriyor (bağlantı yok). IEEE Xplore otomatik erişime 418 döndürdü. KAIST kurumsal deposu (koasas, `handle/10203/310007`, 2023 Şubat KAIST EE yüksek lisans tezi kaydı; yazarı doğrulanamadı) JavaScript bot doğrulaması istiyor; aşılmadı. Hiçbir gölge kaynak kullanılmadı.
- **Atıf sayıları (farklı veri tabanları):** Crossref 31, Semantic Scholar 28, OpenAlex 37 (36 kayıt listelendi). Yani makale sessiz değil, ama literatürde bir cümleyle anılıyor.
- **Yasal yollar:** (1) kurum/kütüphane IEEE aboneliği; (2) yazara (Si-Hyeon Lee, KAIST EE) kısa e-posta ile kabul edilmiş sürüm isteği; (3) KAIST tez deposundaki kaydı bir tarayıcıdan elle açıp bakmak (yüksek lisans tezi Hong'a ait çıkarsa, tez tam metni daha ayrıntılı olabilir; bu bir tahmindir).

### Özetten kesin bilinenler (KAIST sayfası + Semantic Scholar özet alanı, aynı metin)
- Hibrit yapı: karar ağacı (DT) + Isolation Forest (IF). DT yalnızca "normal ya da bilinen saldırılardan biri" kararını verir; sonra IF, "DT'nin kararı gerçekten doğru mu" sorusunu karara bağlar. Sapmayı azaltmak için topluluk (ensemble) uygulanır.
- Gerçek veri: C bandında çalışan kablosuz modemler, statik ve mobil ortam, toplam 4 jamming türü.
- Değerlendirme eksenleri: jammer mesafesi, bilinen saldırı sayısı, hareketlilik. Sonuç: "bir baz algoritmaya göre tüm durumlarda üstün". Özette sayı yok.

### İkincil kaynaklardan gelen düşük güvenli bilgiler
- Jia ve ark. 2025 (IEEE IoT-J): Hong'un DT+IF yöntemi "dört parametre kullanıyor: PDR, bad packet ratio, SNR, RSS". Verma ve ark. 2026 (IEEE TNSE): "tone ve Gaussian jamming türleri; PDR, SNR, bad packet ratio". İkisi de Semantic Scholar atıf bağlamıdır; makaleyi okuduklarına dair kanıt yok.
- Varotto ve ark. 2024 (SPAWC, arXiv 2405.09565), kendi PDF metninde Hong'u "WIPS, bağlantı katmanından yukarı ölçümleri toplar [2][3]" cümlesinin dayanağı olarak sıralıyor (ancak aynı atıf listesi yazarların "Hong = paket düzeyi" dediğini açıkça belirtmiyor). Bu, Hong'un fiziksel I/Q değil, bağlantı/paket düzeyi ölçümlerle çalıştığı yorumuyla uyumlu ama kanıt değil.
- Varotto ve ark. 2024 (ICC Workshops, arXiv 2405.10331), Hong'u "5G radyo sinyallerini manipüle eden (alt taşıyıcı sıfırlayan) yaklaşımlar [4]-[6]" grubuna koymuş. Bu, Hong'un yöntemiyle çelişiyor görünüyor; olası yanlış numaralama/yanlış atıf. Tam metin olmadan karar verilemez, bu yüzden Hong'un yöntemi için kanıt sayılmadı.

## 2. Bizim mimariyle fark tablosu

"Hong" sütunundaki her hücrenin güven düzeyi parantez içinde: (Ö) özetten, yüksek; (İ) ikincil kaynak, düşük; (?) bulunamadı.

| Boyut | Hong 2023 | Bizim proje |
|---|---|---|
| Birleşik fikir | Bilinenleri sınıflandır + bilinmeyeni IF ile yakala (Ö) | Aynı temel fikir: IF + RF ile tespit, RF ile tür; saklanan türü IF yakalar |
| Akış sırası | Önce DT (normal/bilinen saldırı), sonra IF, DT kararını doğrular (Ö) | Aşama 1: IF (yalnız normalle eğitilmiş) + RF "saldırı var mı"; Aşama 2: RF "hangi tür" |
| IF'in eğitim verisi | (?) yalnızca normal mi, sınıf başına mı bilinmiyor | Yalnızca normal veriyle |
| Birleşme kuralı / eşik | (?) bulunamadı (özet: IF "kararın doğruluğunu belirler") | IF skor eşiği; sonuçlar %95,7 yakalama / %4,8 yanlış alarm |
| Topluluk | Var, "sapmayı azaltmak için" (Ö); ayrıntı (?) | RF'nin kendisi bir topluluk; ayrıca topluluk katmanı yok |
| Veri kaynağı | Gerçek modem verisi, C bandı, statik+mobil (Ö) | GNU Radio sentetik: 32 kHz, 1 kHz kosinüs + Gauss gürültü + 2 tap'lı çok yollu kanal |
| Sinyal düzeyi | (İ) paket/bağlantı düzeyi (PDR, BPR, SNR, RSS) olabilir; doğrulanamadı | Ham I/Q pencereleri (1024 örnek), fiziksel katman |
| Öznitelikler | (İ) PDR, bad packet ratio, SNR, RSS; (?) | 10 el yapımı öznitelik (ortalama, std, max, enerji, basıklık, çarpıklık, sıfır geçiş, zarf std, baskın frekans, spektral yayılım; yalnız gerçel kısım) |
| Jammer türleri | 4 tür (Ö); adları (?) (İ: tone ve Gaussian) | constant, tone, sweep, pulse (+ normal) |
| Güç/mesafe değişimi | Jammer mesafesi, mobil/statik değişimi (Ö) | jammer_amp 0-2, kayıt sırasında elle değiştiriliyor |
| Açık-küme protokolü | "bilinen saldırı sayısı" ekseni (Ö); kaç tür saklandığı ve seçimi (?) | Tek bir saldırı türü eğitimden saklanıyor; denetimli RF bilinmeyeni %98 constant sanıyor, IF %98 saldırı olarak yakalıyor |
| Baz çizgiler | "bir baz algoritma" (Ö); adı (?) | Yalnız RF ve IF'in kendi sonuçları; dış baz çizgi yok |
| Doğrulama | Gerçek veri, 3 eksen (mesafe, bilinen saldırı sayısı, hareketlilik) (Ö); istatistik/tekrar (?) | Sentetik veri, %80 normal / %20 saldırı değerlendirme seti |
| Yan çalışma | (?) yok görünüyor | Markov zinciri saldırgan simülasyonu (reaktif jammer dahil) |
| 6G unsurları | Özette yok | Şimdilik yok; hedef bu boşluk |

**Dürüst notlar:** (1) Hong'un gerçek veriyle çalışması, bizim sentetik veriden güçlü bir yanıdır. (2) Hong'un sayısal sonuçları görülmediğinden "bizim %95,7 / %89,1 değerlerimiz Hong'dan iyi/kötü" denemez. (3) Bizim "saklanan tür" protokolünün Hong'un "bilinen saldırı sayısı" ekseninden farkı yalnızca tam metinle netleşir.

## 3. Atıf izleme

### 3a. Hong 2023'e atıf yapan çalışmalar (OpenAlex `referenced_works` ile 36 kayıt; kota dolmadan alındı; Semantic Scholar bağlamlarıyla birlikte okundu)
Ağırlıklı olarak jamming tespiti/sınıflandırması ile ilgili olanlar. (İndirilen PDF'ler: ✔.)

1. Lohan P., Kantarcı B., Ferrag M.A., Tihanyi N., Shi Y., "From 5G to 6G Networks: A Survey on AI-Based Jamming and Interference Detection and Mitigation", IEEE OJ-COMS, 2024, s. 3920-3974. DOI 10.1109/OJCOMS.2024.3416808 (gold OA, ama IEEE sunucusu otomatik erişimi reddetti). Hong'u [42] olarak anıyor (kullanıcıdan); tam metinde Hong'u nasıl anlattığı bu oturumda görülemedi.
2. Varotto M., Valentin S., Tomasin S., "Detecting 5G Signal Jammers Using Spectrograms with Supervised and Unsupervised Learning", ICC Workshops 2024, arXiv:2405.10331 ✔. Spektrogram + CNN (denetimli) ve konvolüsyonel otomatik kodlayıcı (denetimsiz). Hong'u referans listesinde anıyor. Sınıflandırma süresi %95 durumda 46-48 ms. Açık-küme değil, ikili tespit.
3. Varotto M., Valentin S., Ardizzon F., Marzotto S., "One-Class Classification as GLRT for Jamming Detection in Private 5G Networks", SPAWC 2024, arXiv:2405.09565 ✔. Yapay jammer verisiyle eğitilen CNN, GLRT; gerçek özel-5G verisi. Bilinmeyen jammer sorununa farklı yoldan yaklaşıyor.
4. Gopal S., Cintrón F.J., Rouil R.A., "O-RAN-Native Jamming Detection Under Network Heterogeneity", arXiv:2610.20816, Ekim 2026 ✔. Hong'u "hybrid classifiers for known and unknown attacks [5]" diye anıyor. KPI tabanlı, istatistiksel topluluk (SEM) ve 5 ML + 5 DL modelle 8 farklı 5G günlüğünde leave-one-out dağılım kayması testi; öğrenme tabanlı modellerin dağılım kaymasında recall kaybettiği bulgusu; ML için F1 0,911'den 0,962'ye (çoklu ortam eğitimiyle).
5. Bouzabia H., Meftah A., Kaddoum G., "Federated Learning-Enabled Smart Jammer Detection in Terrestrial and Non-Terrestrial Heterogeneous Joint Sensing and Communication Networks", IEEE Commun. Lett. 28, 2026-2030, 2024. DOI 10.1109/LCOMM.2024.3428973 (kapalı). Hong'u "DT + Isolation Forest hibrit ML jamming tespiti" olarak anıyor. NTN/ISAC bağlamı ilgi çekici; içeriği okunmadı.
6. Cibecchini S., Chiti F., Pierucci L., "A Lightweight AI-Based Approach for Drone Jamming Detection", Future Internet 17(1), 14, 2025. DOI 10.3390/fi17010014 (gold OA; MDPI sunucusu curl'e 403 verdi, indirilemedi). Özet: 6G'de dronlar bağlamı, Isolation Forest + Majority Rule, sabit ve periyodik jamming, denetimsiz. Doğrudan tespit; tür sınıflandırması yok.
7. Verma S., Rodrigues T.K., Kato N., Ariyoshi M., "Multi Layer Jamming Detection and Classification in 6G-Enabled Satellite-Air-Ground Integrated Networks Using Machine Learning", IEEE TNSE 13, 8224-8240, 2026. DOI 10.1109/TNSE.2026.3676399 (kapalı). 6G SAGIN bağlamı; Hong'u PDR/SNR/BPR öznitelikli DT olarak anlatıyor (düşük güvenli ikincil tarif). Okunmadı, özet görülmedi.
8. Fu Q., Yu M., Hui F., Liu ve ark., "Generalized Jamming Detection in NR V2X Using Gaussian Mixture Model", VTC2025-Spring, 2025. DOI 10.1109/VTC2025-Spring65109.2025.11174755 (kapalı). "Tüm saldırı türlerinin eğitim verisini toplamak zor" gerekçesiyle bilinmeyen jammer genellemesi; GMM. Özeti okunmadı.
9. Abdollahi M., Malekinasab K., Tu W., "Physical-Layer Jammer Detection in Multihop IoT Networks", IEEE IoT-J 2023. DOI 10.1109/JIOT.2023.3291997. Durham deposundan accepted sürüm var ama 403 verdi.
10. Amini M., Asemian G., Kantarcı B., "Deep Fusion Intelligence: Enhancing 5G Security Against Over-the-Air Attacks", IEEE TMLCN 2025. DOI 10.1109/TMLCN.2025.3533427 (gold OA; okunmadı).
11. Ratti S.A., Piccioni A., Graziosi F., "An O-RAN-Native xApp Framework for Jammer Detection and Geolocation", Sensors 26(21), 6859, 2026. DOI 10.3390/s26216859 (gold OA; okunmadı).
12. Xu J., Moheddine A., Loscrí V. ve ark., "SHIELD: Scalable and Holistic Evaluation Framework for ML-Based 5G Jamming Detection", LNCS 2025, DOI 10.1007/978-3-032-00624-0_12; HAL: https://hal.science/hal-05055784v1/document (okunmadı).
13. Jia Z. ve ark., "Accurate Jammer Localization in Wireless Sensor Networks Based on Signal Strength Map", IEEE IoT-J 2025; Hong'un özniteliklerini PDR/BPR/SNR/RSS diye anıyor (düşük güvenli ikincil tarif). Konumlandırma konusu, düşük ilgi.
14. Zhao Y. ve ark., "Research on Abnormal Radio Detection Method Combining Local Outlier Factor and One-Class Support Vector Machine", Electronics 14(20), 4055, 2025 (MDPI OA; okunmadı). İlgili: anomali tespiti.
- Diğer atıf yapanlar (konu dışı ya da düşük ilgi; ayrıntılı değerlendirilmedi): Lian ve ark. (siber-fiziksel sistemler derlemesi, IEEE IoT-J 2024), Wang ve ark. (TCCN 2026, düşük irtifa ağlarında girişim tanıma), Moumena (Telecommun. Syst. 2026), Terraf ve ark. (OJ-COMS 2026, uygulama katmanı jamming tespiti), Guo ve ark. (IoT-J 2025), Wang ve ark. (IoT-J 2025 AAV sürüsü girişim tanıma), Hou ve ark. (Comput. Secur. 2024), vb.

**Kota notu:** OpenAlex ücretsiz günlük bütçe liste çekildikten hemen sonra doldu; Semantic Scholar arama uçları da 429 verdi. Bu yüzden 36 kaydın hepsi için ayrıntılı özet çekilemedi.

### 3b. Aynı yazarların devamı
- **Hong ve Lee'nin jamming tespiti/bilinmeyen saldırı üzerine devam makalesi bulunamadı.** Semantic Scholar (Si-Hyeon Lee, yazar 3314164; 55 kayıt): 2023 sonrası işler bilgi kuramsal gizlilik, örtülü (covert) iletişim, UAV yörünge/el değiştirme, bir de IEEE 802.15.4 Q-learning backoff. Seokhwa Hong için yalnızca bu makale ile 2005-2010 tarihli, ilgisiz (kafa takip sistemi) başka bir Seokhwa Hong kaydı var; yani aynı kişinin ayrı yazar kimlikleri olabilir, doğrulanamadı.
- Jamming ile ilgili tek diğer Lee işi (savunma, oyun kuramı): Im H.-S., Lee S.-H., "Anti-Jamming Games in Multi-Band Wireless Ad Hoc Networks", IEEE TIFS 2022-2023 (arXiv:2111.11178) ✔. Kullanıcılar ve jammer arasında MDP tabanlı frekans atlama oyunu, silahlanma yarışı dengeye birkaç turda ulaşır. Bizim Markov/oyun kuramı savunma tarafıyla ilişkili, tespitle ilgili değil.
- Olası ilişkili KAIST yüksek lisans tezi (koasas 10203/310007; anahtar sözcükler jamming detection, jamming classification, isolation forest) var; yazarı ve içeriği doğrulanamadı.

### 3c. "Bilinen sınıflandırma + bilinmeyen tespiti" hibrit/iki aşamalı çalışmalar (en alakalı)
1. **CITADEL**: Bouferroum A., Alla I., Loscrí V., Benslimane A., arXiv:2606.22939, Haziran 2026 ✔. İki aşamalı hiyerarşik hat: Aşama 1 ikili tetikleyici, Aşama 2 bilinen jamming türlerini sınıflandırır ya da çok sinyalli bir OOD topluluğuyla (difüzyon yeniden-yapılandırma sapması, sınıflandırıcı enerjisi, öznitelik uzayı mesafesi; Mahalanobis) "zero-day" işaretler. Wi-Fi CSI (ESP32), IIoT. Özet: 6 bilinen saldırı türü, 15 zero-day senaryo; %100 bilinen saldırı tespiti, %97,1 zero-day tespiti, %0,4 uçtan uca yanlış pozitif; 8 baz çizgi. Bizim mimariye hem yapı hem fikir olarak çok yakın, ama CSI girdisi, derin model, IIoT/Wi-Fi, ve ham I/Q değil. Hong'u anmıyor (PDF metninde "Hong" geçmedi).
2. **Zhong X., Cui J., Ji Z.**, "Energy-based jamming pattern open set recognition via spiking wavelet transformer", PLOS ONE 20(6): e0325381, 2025 ✔ (CC BY). Önce bilinen/bilinmeyen ikili karar (enerji skoru + uyarlanır eşik), bilinenlerde sınıflandırma; Spiking Wavelet Transformer + hipersferik sınıf ayırma; JSR değişimine göre eşik uyarlama; sentetik veri setinde 9 jamming türünden 6'sı bilinen, 3'ü bilinmeyen (metinden, birkaç bilinen/bilinmeyen kombinasyonu denenmiş). Veri: Kaggle RF jamming veri seti (daniaherzalla) ve Zenodo'da sentetik veri (10.5281/zenodo.15347076). Hong'u anmıyor.
3. **Wang & Gao**, "Open-Set Jamming Pattern Recognition via Generated Unknown Jamming Data", IEEE Signal Processing Letters 31, 1079-1083, 2024. DOI 10.1109/LSP.2024.3386489 (kapalı; yalnızca künye Crossref'ten, özet arama motoru özetinden: sahte "bilinmeyen jamming" üretip açık-küme sorununu kapalı-küme sorununa çeviriyor; orta güven).
4. **Meidan (soyad, yazar adı bu oturumda doğrulanamadı)**, "An Open-Set Jamming Signal Recognition Method Based on Domain-Specific Network", IET Communications 20, 2026. DOI 10.1049/cmu2.70198. Özet (Crossref): I/Q için Transformer + STFT spektrogramı için ResNet; ArcCider kaybı ile açık-küme tanıma; bileşik jamming veri seti. Sayılar özetin kesik kısmında; okunmadı.
5. **Varotto ve ark. 2024** (iki makale) ✔: denetimsiz CAE ve tek-sınıf CNN; bilinmeyen jammer odaklı. İkili tespit; tür sınıflandırması yok.
6. **Gopal ve ark. 2026** ✔: dağılım kaymasında öğrenme tabanlı modellerin recall kaybettiği bulgusu; bizim sentetik veri ve açık-küme sonuçlarının dışsal geçerliliği için uyarı niteliğinde.
7. **Jere S., Wang Y., Aryendu I., Dayekh S., Liu L.**, "Bayesian Inference-Assisted Machine Learning for Near Real-Time Jamming Detection and Classification in 5G New Radio (NR)", IEEE TWC 23(7), 7043-7059, 2024. DOI 10.1109/TWC.2023.3337058 (künye Crossref; özet görülmedi; okunmadı). 5G NR'de jamming tespiti + sınıflandırması.
8. Radar alanı (yalnızca künye, uzak ilgi): "Intelligent Radar Jamming Recognition in Open Set Environment Based on Deep Learning Networks", Remote Sensing 14(24), 6220, 2022, DOI 10.3390/rs14246220; OSCJC "open-set compound jamming cognition method for radar systems", ScienceDirect PII S2214914725002417 (künyenin tamamı doğrulanamadı).
9. Düşük kalite bir uyarı: arama motoru, DT/RF + IF'i birleştiren hibrit kablosuz IDS için "Onyibo Chukwuebuka final year project" (eprints.gouni.edu.ng) gibi bir lisans bitirme projesi döndürdü (RF %99,44 doğruluk iddiası). Hakemsiz ve ağ trafiği (AWID tarzı) odaklı; kaynak olarak kullanılmamalı.

### İndirilen PDF'ler (`07_ikinci_tur_komsu_calismalar/`, toplam 6)
- `2024_varotto_5g-jammers-spectrograms-supervised-unsupervised.pdf` (arXiv:2405.10331)
- `2024_varotto_one-class-classification-glrt-jamming-private-5g.pdf` (arXiv:2405.09565)
- `2026_bouferroum_citadel-csi-jamming-open-set-iiot.pdf` (arXiv:2606.22939)
- `2026_gopal_oran-native-jamming-detection-heterogeneity.pdf` (arXiv:2610.20816)
- `2025_plosone_energy-based-jamming-open-set-spiking-wavelet.pdf` (PLOS ONE, CC BY)
- `2022_im_anti-jamming-games-multi-band.pdf` (arXiv:2111.11178)
Hepsi `%PDF-` başlıklı ve >30 KB; metinleri `lit_txt/07_ikinci_tur_komsu_calismalar/` altına `pdftotext` ile çıkarıldı. Hong'un kendi PDF'i yok: `2023_hong_hybrid-jamming-detection-known-unknown.pdf` oluşturulmadı.

### İndirilemeyen (bağlantılar)
- Hong 2023: https://doi.org/10.1109/LCOMM.2023.3275694 (kapalı); KAIST özet sayfası: https://ee.kaist.ac.kr/ai-in-communication/a-hybrid-jamming-detection-algorithm-for-wireless-communications-simultaneous-classification-of-known-attacks-and-detection-of-unknown-attacks/
- Lohan 2024: https://doi.org/10.1109/OJCOMS.2024.3416808 (gold OA, IEEE otomatik istemciyi reddediyor; tarayıcıdan elle açılabilir)
- Cibecchini 2025: https://www.mdpi.com/1999-5903/17/1/14 (CC BY, MDPI 403 verdi; tarayıcıdan elle indirilebilir)
- Abdollahi 2023 (Durham accepted): https://durham-repository.worktribe.com/file/1169140/1/Accepted%20Journal%20Article (403)
- Wang & Gao 2024 (IEEE SPL), Meidan 2026 (IET), Bouzabia 2024, Verma 2026, Fu 2025: DOI bağlantıları yukarıda, hepsi kapalı.

## 4. Bu makale bizim yenilik iddiamızı nasıl etkiliyor (dürüst değerlendirme)

1. **"Açık-küme / bilinmeyen saldırı için Isolation Forest" fikri artık yenilik olarak iddia edilemez.** Hong 2023 (IEEE Commun. Lett.), özet düzeyinde bile, "bilinen saldırıları DT ile sınıflandır, bilinmeyeni IF ile yakala, topluluk uygula" yapısını zaten yayımlamış. Bizim "denetimli RF bilinmeyeni %98 constant sanıyor, IF %98 saldırı olarak yakalıyor" bulgusu aynı fikrin yeni bir sentetik veri üzerinde gösterimidir; kavramsal öncelik Hong'a aittir.
2. **Fikir bağımsız olarak da tekrarlanmış.** CITADEL (2026), PLOS ONE (2025), IET Commun. (2026) ve IEEE SPL (2024) "bilinen sınıflandır + bilinmeyeni tespit et" yapısını farklı sinyal düzeylerinde (CSI, spektrogram, I/Q) ve derin modellerle uyguluyor. Alanda, "iki aşamalı jamming tespit/sınıflandırma + bilinmeyen" artık tanımlanmış bir desen.
3. **Hong'a göre farkımız (kesin olmayan, tam metin bekleyen):** (a) Hong'un öznitelikleri büyük olasılıkla paket/bağlantı düzeyi (İ, düşük güven); bizimki ham I/Q'dan fiziksel katman öznitelikleri. Bu doğrulanırsa gerçek bir fark. (b) Bizim tamamen yeniden üretilebilir GNU Radio hattımız ve sentetik kontrollü değişkenlerimiz (kanal, güç, tür). Hong gerçek ölçüm kullanıyor; bu bir zayıflığımız ve gücümüz (kontrol) olabilir. (c) Markov tabanlı reaktif jammer simülasyonu Hong'da yok görünüyor (yalnızca özetten). (d) Bizim sistematik "bir türü saklama" protokolümüz (her tür sırayla bilinmeyen) Hong'un "bilinen saldırı sayısı" eksenine yakın; Hong bunu zaten yapıyor olabilir.
4. **Yapısal fark:** Hong: DT önce, IF sonra (IF, DT kararını doğrular). Biz: IF/RF önce (saldırı var mı), RF sonra (tür). Hong'da "bilinmeyen" çıktısı sınıflandırma kararına bağlanan bir doğrulama; bizde aşama 1'in bir sonucu. Hangisinin daha iyi olduğu iki mimarinin aynı veride karşılaştırılmasıyla ortaya çıkar; bu bir yenilik fırsatıdır (Hong'un akışını baz çizgi olarak uygulamak).
5. **Makale yazımı için öneri:**
   - Açık-küme iddiasını "ilk" diye değil, "Hong ve ark. 2023'ün hibrit yaklaşımını ham I/Q üzerinde, değişken jammer gücü altında ve [yeni unsur] ile genişletiyor/karşılaştırıyoruz" diye çerçevele.
   - Hong'un DT→IF akışını, bizim IF/RF→RF akışıyla aynı sentetik veride baz çizgi olarak yeniden uygula; bu hem adil bir karşılaştırma hem de katkı olur.
   - Yenilik ağırlığını, literatürde Hong'da ve açık-küme jamming makalelerinde görünmeyen unsurlara taşı: 6G'ye özgü senaryolar (NTN/uydu, O-RAN, ISAC, RIS, mMIMO pilot saldırıları), reaktif/Markov saldırgan altında açık-küme, jammer gücü ve SNR/JNR değişiminde eşik kararlılığı (Gopal 2026'daki dağılım kayması bulgusu bu açıdan yol gösterici).
   - Hong'un tam metnini (yazar e-postası veya kütüphane) edinmeden onun sayısal sonuçlarını ya da öznitelik türünü makalede iddia etme.
6. **Risk:** Hakemler Hong 2023'ü bildiği için "açık-küme IF+RF" katkısını sorgulayacaktır. Bu çalışmayı atıfsız bırakmak, ve CITADEL/PLOS ONE gibi yakın işleri anmamak, ciddi bir eksik olur.

## 5. Takıldığım yerler
- Hong'un tam metni yasal yoldan bulunamadı; yöntem ayrıntıları, eşik, sayılar, baz çizgi ve öznitelik türü doğrulanamadı.
- Lohan ve ark. 2024 derlemesi IEEE sunucusu tarafından otomatik erişime kapalı; [42]'yi nasıl anlattığı görülemedi.
- OpenAlex ücretsiz bütçesi ve Semantic Scholar arama kotası doldu; atıf yapan 36 çalışmanın yalnızca bir kısmının içeriği incelenebildi.
- KAIST deposunda bot doğrulaması var; atlatma denenmedi.
