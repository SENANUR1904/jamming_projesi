# INCELEME 07b — İkinci tur "komşu" çalışmalar (kod: 07b)

Tarih: 2026-11-25. Hedef: önerdiğimiz makale yönüne komşu olabilecek 8 çalışmayı doğrulamak, mümkünse tam okumak ve "yenilik riski"ni değerlendirmek.

## Doğrulama özeti

| # | Çalışma | Doğrulama kaynağı | Durum | PDF indirildi mi | Okuma |
|---|---|---|---|---|---|
| 1 | Aissou, Chou, Kim — GLOBECOM 2026 | arXiv abs 2609.21334 + PDF | Doğrulandı | Evet | tam (ilgili bölümler) |
| 2 | Chong ve ark. — ICC Workshops 2026 | Arama sonuçları (dblp kaydı, ICC CHEDDAR program sayfası, ACM referans listesi, Imperial profil sayfası); IEEE Xplore ve dblp'ye erişilemedi (bot koruması / boş sayfa) | Varlığı doğrulandı (dolaylı); özet ve veri seti bağlantısı bulunamadı | Hayır (IEEE, ücretli) | kısmi (yalnızca künye) |
| 3 | Ratti ve ark. — Sensors 2026 | PMC açık erişim HTML (PMC13766523) + DOI 10.3390/s26216859 | Doğrulandı | Hayır (PMC/MDPI PDF bot korumasına takıldı; aşılmadı) | kısmi (HTML tam metni, özetleyici araç üzerinden) |
| 4 | Kurma ve ark. — VTC2026-Fall (kullanıcı bilgisi) | NSF PAR kaydı 10715045 | Varlığı doğrulandı; konferans adı kayıtta yok (yalnızca IEEE, Boston MA, 6 Eylül 2026); tam metin 6 Eylül 2027'ye kadar embargolu | Hayır | kısmi (yalnızca özet) |
| 5 | Hoffmann ve ark. — arXiv 2609.18499 | arXiv abs + PDF | Doğrulandı (MILCOM 2026 kabul) | Evet | tam |
| 6 | Chou ve ark. — arXiv 2611.01881 | arXiv abs + PDF | Doğrulandı (ICC 2027'ye gönderildi) | Evet | tam |
| 7 | Huso ve ark. — arXiv 2611.08118 | arXiv abs + PDF | Doğrulandı | Evet | tam (ilgili bölümler) |
| 8 | Yildirim ve ark. — arXiv 2501.06798 | arXiv abs + PDF | Doğrulandı (ilgili DOI: 10.1109/JIOT.2025.3527062, arXiv sayfasında "related DOI") | Evet | kısmi (giriş, çerçeve, deney, sonuç) |

Düzeltmeler (istek metnine göre): (1) Aissou arXiv sayfasında üç yazar: Aissou, Chou (Rémi A. Chou), Kim. (2) Çalışma #6'nın birinci yazarı Po-Heng Chou'dur; #2'nin birinci yazarı ise Hui Shing Chong'dur (iki farklı kişi; isimler benzer). (3) #8'in başlığı "OFDM-based JCAS under Attack: The Dual Threat of Spoofing and Jamming in WLAN Sensing" — konu WLAN sensing (802.11), 5G/6G değil.

Not: OpenAlex API bu oturumda "günlük bütçe doldu" hatası verdi (anahtar gerektiriyor); #2-#4 arama motoru + açık erişimli sayfalarla doğrulandı.

İndirilen PDF'ler (klasör: `docs/literatur/07_ikinci_tur_komsu_calismalar/`): `2026_aissou_co-evolving-zero-day-jamming.pdf`, `2026_hoffmann_jamming-detection-oran-ocudu.pdf`, `2026_chou_green-learning-ris-spoofing-isac.pdf`, `2026_huso_cloudy-skies-iridium-jamming.pdf`, `2025_yildirim_ofdm-jcas-spoofing-jamming.pdf` (hepsi `%PDF-` başlığı ve >300 KB doğrulandı).

---

### 1. Co-Evolving Zero-Day Jamming: Adaptive Attack Synthesis and Graph Attention-Based Online Detection (Aissou, Chou, Kim, 2026) — `2026_aissou_co-evolving-zero-day-jamming.pdf`
- **Tür:** yöntem (tespit + RL saldırgan kıyaslaması)
- **Problem ve hedef:** Alıcı bilgisini varsaymayan, gizlilik (LPD) gözeten bir RL jammer ile; bilinen jamming stratejilerini sınıflayıp zero-day stratejileri çevrimiçi keşfeden (GAT + DP-means) bir dedektör. Arşiv: arXiv:2609.21334 (cs.IT, 18 Eyl 2026), "Accepted for publication in the 2026 IEEE GLOBECOM".
- **Veri / sinyal:** Tamamen simülasyon. L = 64 ortogonal frekans kanalı, çerçeve başına T = 100 yuva, yuva başına N = 80 karmaşık taban bant örnek; Alice–Bob ve jammer–Bob bağlantıları bağımsız Rayleigh sönümlemeli. Dedektörün girdisi **ham I/Q değil**: kanal başına yuva-ortalama alınan enerji matrisi X_k ∈ R^{L×T} (zaman-frekans enerji çerçevesi). Açık veri/kod: metinde bulunamadı.
- **Jammer türleri ve güç aralığı:** Bilinen K = 4 sınıf: benign, sequential, random, reactive. RL jammer eylem uzayı: 4 güç seviyesi × 2 dalga biçimi (geniş bant gürültü, dar bant ton) = 8 eylem; 3 bağımsız eğitimli RL politikası "zero-day" strateji olarak kullanılıyor. Eğitimde SNR = 20 dB, değerlendirmede 5–30 dB. Taban çizgileri: LinUCB bandit, super-reactive jammer, random jammer.
- **Yöntem:** GAT kodlayıcı + DP-means kümeleme; her bilinen sınıf için DP-means yarıçapı λ_c, **etiketli doğrulama kümesinde** sınıf içi maksimum merkez uzaklığı olarak ayarlanıyor (normal-yalnızca kalibrasyon DEĞİL); yarıçap dışı çerçeveler "zero-day adayı". Önceden sınıf sayısı bilinmiyor; çevrimiçi sınıf genişletme. Karşılaştırma: radar jamming için açık-küme yöntemi (OpenMax + Weibull + Siyam; ref. [3] Zhou ve ark. 2025).
- **Ana sonuçlar:** RL jammer taban çizgisine göre %33 daha yüksek saldırı etkinliği, %67 daha yüksek gizlilik (özet ve Giriş); outage olasılığı SNR ≥ 15 dB'de > 0,8 (Şekil 3a). Dedektör tespit olasılığı 0,86–0,92, kıyaslanan açık-küme yöntemi 0,68–0,76 (Şekil 3c; özette "%20 daha yüksek"). Tablo yok; sayısal değerler şekil/metinden.
- **Açık-küme / bilinmeyen saldırı:** Evet (zero-day keşfi; sınıf sayısı önceden bilinmeden). Ancak yalnızca bir "tespit olasılığı" raporlanıyor; zero-day saldırıların kümeleme saflığı/ayrı ayrı keşif doğruluğu ve yanlış alarm oranı metinde bulunamadı.
- **5G/6G unsurları:** Metinde 6G, 5G, ISAC, RIS, NTN geçmiyor. Tespit sonrası frekans atlama karşı önlemi var.
- **Sınırlılıklar:** Yazarlar sınırlılık bölümü vermiyor. Metinden: yalnızca simülasyon; yalnızca enerji çerçevesi; yalnızca 3 RL politikası zero-day temsilcisi; dalga biçimleri gürültü+ton (sweep/pulse yok); gerçek donanım yok; kısa bildiri.
- **Bizim projeyle ilişkisi:** Rakip/benzer (açık-küme + zero-day). Biz ham I/Q + el yapımı öznitelik + yalnız-normal Isolation Forest kullanıyoruz; onlar denetimli GAT + kümeleme. Fark: onların girdisi enerji çerçevesi, kalibrasyon etiketli bilinen sınıflarla; bizimki normal-yalnızca.
- **Yenilik riski:**
  - (a) Orta-düşük: açık-küme/zero-day jamming mevcut ama ham I/Q üzerinde değil, enerji-çerçevesi üzerinde, simülasyonda ve denetimli bilinen sınıflarla.
  - (b) Yok: standart (5G/6G) dalga biçimi yok; genel gürültü/ton.
  - (c) Yok: eşik/yarıçap bilinen saldırı sınıflarının etiketli doğrulama verisinden kalibre ediliyor.
  - (d) Yok.
  - (e) Yok.
- **Okuma:** tam (özet, giriş, sistem modeli, DP-means/kalibrasyon, simülasyon ve sonuç, kaynakça; RL formülasyonunun matematiği atlandı) · güven: yüksek

### 2. A Synthetic Dataset for Anomaly Detection of RIS-Enabled Jamming Attacks (Chong, Raj Gautam, Bouazizi, Breza, McCann, 2026) — `web_chong`
- **Tür:** veri seti (yalnızca künyeden)
- **Problem ve hedef:** Başlıktan: RIS destekli jamming saldırılarında anomali tespiti için sentetik veri seti. İçerik **doğrulanamadı**.
- **Künye (aramalardan; IEEE Xplore ve dblp'ye erişilemedi):** Hui Shing Chong, Prabhat Raj Gautam, Yathreb Bouazizi, Michael Breza, Julie A. McCann (Imperial College London); 2026 IEEE ICC Workshops (Glasgow), s. 1–6, çevrimiçi 24 Mayıs 2026; DOI 10.1109/ICCWorkshops63917.2026.11586537. ICC 2026 CHEDDAR çalıştayı programında 24 Mayıs 2026, "Paper 1" olarak listeli. İki ayrı kaynakta (dblp özeti ve Imperial profil sayfası) aynı başlık/yazar/DOI; Imperial sayfası yazarlardan yalnızca üçünü gösterdi, tam liste dblp özetinden (dolaylı).
- **Veri / sinyal, jammer türleri, yöntem, sonuçlar, açık-küme, sınırlılıklar:** Metinde/özetin görülebildiği hiçbir kaynakta **bulunamadı** (IEEE sayfası boş döndü; arXiv sürümü bulunamadı; veri seti bağlantısı bulunamadı).
- **5G/6G unsurları:** Başlıktan RIS (6G unsuru); ayrıntı yok.
- **Bizim projeyle ilişkisi:** Doğrulanamadığı için değerlendirme yapılamaz. Başlık, "RIS'li saldırı + anomali tespiti + sentetik veri seti" üçlüsünü çağrıştırıyor; yani 6G/RIS jamming için veri seti katkısı iddiasına yakın olabilir. Tam metin okunmadan çakışma derecesi söylenemez; IEEE Xplore'dan (kurumsal erişimle) okunması önerilir.
- **Yenilik riski:** (a) belirsiz (anomali tespiti adı geçiyor, giriş türü bilinmiyor); (b) belirsiz (RIS = 6G, ama standart dalga biçimi bilinmiyor); (c) belirsiz; (d) başlıkta "sentetik" geçiyor, gerçek veri doğrulaması bilinmiyor; (e) belirsiz. **Değerlendirme: bilgi yok — tam metin gerekli.**
- **Bağlantılar:** https://doi.org/10.1109/ICCWorkshops63917.2026.11586537 · https://ieeexplore.ieee.org/document/11586537/ · https://icc2026.ieee-icc.org/program/workshops-0/cheddar-workshop
- **Okuma:** kısmi (yalnızca künye) · güven: düşük

### 3. An O-RAN-Native xApp Framework for Jammer Detection and Geolocation (Ratti, Piccioni, Graziosi, Cassioli, Marotta, 2026) — `web_ratti`
- **Tür:** yöntem / savunma (xApp mimarisi)
- **Problem ve hedef:** Near-RT RIC üzerinde KPM xApp + Jammer xApp ile jammer tespiti, etkilenen sektörün belirlenmesi ve jammer konum tahmini; yalnızca standart E2SM-KPM ölçümleri (yönbulma donanımı yok). Sensors 2026, 26(21), 6859; DOI 10.3390/s26216859; alındı 22 Eyl, kabul 27 Eki 2026; CC BY 4.0; PMCID PMC13766523.
- **Veri / sinyal:** Simülasyon (ns-O-RAN: ns-3 + FlexRIC), 3GPP UMi kanalı, 3,5 GHz, 20 MHz, 4 gNB, 10 veya 15 UE, 1000×1000 m. Girdi L3 SINR, RSRP, servis hücresi kimliği (KPM). **I/Q kullanılmıyor.** Yapılandırma başına 30 Monte Carlo koşusu + jammer'sız kontrol. Veri/kod: "GitHub release v2.0'da simülasyon veri seti ve ns-3 senaryosu" (veri erişilebilirlik bölümü).
- **Jammer türleri ve güç aralığı:** Tek tür: sürekli, izotropik, geniş bant DL jammer; 40/50/60 dBm EIRP; iki konum.
- **Yöntem:** Durumlu DBSCAN (S-DBSCAN, histerezis skoru) ve durumsuz HT-HDBSCAN ile mağdur UE kümeleme; "interference power trilateration" (konum + EIRP + yol kaybı üsteli ortak uydurma); SI-MAP + nedensel EKF ile UE konumlama. Eşikler (Tablo 2): γdetect = −5 dB, γsevere = −12 dB, γth = −20 dB vb.; parametreler tohum 1–5 üzerinde ayarlanmış. Öğrenmeli sınıflandırıcı yok (kural/kümeleme/en küçük kareler).
- **Ana sonuçlar:** Jammer'sız 25 koşuda yanlış alarm yok; S-DBSCAN saldırıların %80–100'ünü tespit, tespit edilenlerde doğru sektör %95–97; trilaterasyon her saldırıyı ~1 s içinde tespit, medyan konum hatası 24/15/9 m (40/50/60 dBm, senaryo 1) ve 20/10/11 m (senaryo 2), taban çizgilerinden 4–10 kat iyi; UE konumlama medyan 12,5–12,6 m (model uyuşmazlığında 16,5 m); 2000 UE için kararlı durum işlem süresi 0,89 s (tek çekirdek; normal S-DBSCAN ~2,7 s).
- **Açık-küme / bilinmeyen saldırı:** Hayır (tek jammer türü; sweep/reaktif/protokol-bilen jammer'lar gelecek çalışma).
- **5G/6G unsurları:** O-RAN (Near-RT RIC, E2SM-KPM, rApp ile kalibrasyon). Metinde yalnızca "Beyond 5G (B5G)" geçiyor; 6G/ISAC/RIS/NTN yok.
- **Sınırlılıklar (yazarlardan):** Jamming L3 SINR düzeyinde modelleniyor (TB çözme yok); hücreler arası girişim yok; yalnızca simülasyon; uçtan uca E2 gecikmesi ölçülmedi (çevrimdışı kayıtlı E2 KPM üzerinden); UE konum doğruluğu (P80 24 m) 10 m hedefini karşılamıyor; konum gözlemlenebilirleri sentetik; jammer sabit; gelecek: fiziksel O-RAN donanımı, sweep/reaktif/protokol-bilen/hareketli/çoklu jammer, federated öğrenme.
- **Bizim projeyle ilişkisi:** Destekleyici/arka plan: "xApp'te jammer tespiti" için RAN-içi uygulama referansı, ama KPM tabanlı kural/kümeleme; fiziksel katman I/Q yok, sınıflandırma yok. Bizim hafif Isolation Forest yaklaşımının O-RAN'a yerleştirilebilirliği için işlem süresi örneği sağlıyor.
- **Yenilik riski:**
  - (a) Yok (KPM, tek jammer türü, açık-küme yok).
  - (b) Yok.
  - (c) Düşük-orta: jammer'sız koşularda yanlış alarm yok raporlanıyor, ama eşikler tohumlarla ayarlanmış kural eşikleri; "yalnız normal veriden kalibrasyon protokolü" olarak formüle edilmemiş.
  - (d) Yok (yalnızca simülasyon; donanım gelecek çalışma).
  - (e) Yüksek: O-RAN-yerel xApp mimarisi + 0,89 s işlem süresi iddiası var; ancak bizim "ham I/Q özniteliği ile hafif RAN-içi tespit" nişi farklı.
- **Okuma:** kısmi — PDF indirilemedi (PMC/MDPI PDF'leri bot korumasına takıldı, aşılmadı); açık erişimli PMC HTML tam metni WebFetch aracı üzerinden özetleyici modelle okundu (metnin ~100 binlik kısmı + kalan kısım); sayılar araç özetinden, bu yüzden elle doğrulanması önerilir · güven: düşük
- **Bağlantılar:** https://pmc.ncbi.nlm.nih.gov/articles/PMC13766523 · https://doi.org/10.3390/s26216859

### 4. An Ensemble Machine Learning-Enabled xApp for Multi-Class Jamming Detection in O-RAN (Kurma, Zhang, Upadhyay, Mian, Marojevic, 2026) — `web_kurma`
- **Tür:** savunma / yöntem (yalnızca özetten)
- **Problem ve hedef:** O-RAN'da mevcut jamming tespitinin gerçek zamanlı yanıt ve çok sınıflı sınıflandırma açısından zayıf olduğunu söyleyip srsRAN gNB + FlexRIC Near-RT RIC üzerinde çalışan topluluk (ensemble) xApp öneriyor.
- **Künye:** NSF PAR kaydı 10715045: IEEE, Boston MA, yayın tarihi 6 Eylül 2026, s. 1–6; kayıtta konferans adı yok (VTC2026-Fall bilgisi kullanıcıdan; PAR'da doğrulanamadı); DOI yok; tam metin 6 Eylül 2027'de açılacak (embargo). Fon: NSF 2120442.
- **Veri / sinyal:** Özetten: E2 arayüzünden MAC katmanı metrikleri; 15 öznitelik (sinyal kalitesi, trafik örüntüsü, kaynak kullanımı, zamansal davranış). Gerçek mi simülasyon mu, jammer türleri, SDR/OTA ayrıntıları **bulunamadı**. (İlgili olabilecek, atıfsız bir GitHub deposu — openaicellular/ensemble-jamming-detection-xApp — srsRAN gNB KPM günlüklerinden RF, SVM, Isolation Forest, CatBoost vb. modelleri sunuyor; veri seti bağlantısı verilmiş. Bu depo ile makale arasındaki bağ doğrulanmadı.)
- **Yöntem:** Random Forest + SVM + Isolation Forest, F1 için ayarlanan ağırlıklarla topluluk.
- **Ana sonuçlar (özet, doğrulanmadı):** Tek-model taban çizgilerine göre doğruluk artışı %19,2–27,9; tespit gecikmesi ≈ 14 ms; CNN modellerine göre ~1/3 CPU ve ~1/10 bellek ile daha yüksek doğruluk.
- **Açık-küme / bilinmeyen saldırı:** Bulunamadı (özette geçmiyor; Isolation Forest topluluğun bir üyesi olarak kullanılıyor ama rolü bilinmiyor).
- **5G/6G unsurları:** O-RAN, xApp, E2; 6G ifadesi özette yok.
- **Sınırlılıklar:** Bilinmiyor (tam metin embargolu).
- **Bizim projeyle ilişkisi:** Model ailesi açısından en çarpıcı komşu: RF + Isolation Forest kombinasyonu (bizimkiyle aynı iki model) — ancak girdi MAC/KPM öznitelikleri, ham I/Q değil; çok sınıflı denetimli. "RF + IF" tek başına yenilik iddiası olmaz; ham I/Q, açık-küme protokolü ve sınıf-gizleme deneyi ile ayrışmak gerekir.
- **Yenilik riski:**
  - (a) Düşük-orta (özetten): I/Q yok, açık-küme ifadesi yok; ama tam metin açılana kadar kesin değil.
  - (b) Bilinmiyor.
  - (c) Bilinmiyor.
  - (d) Bilinmiyor (srsRAN testbed var gibi, OTA/sim ayrımı belirtilmemiş).
  - (e) **Yüksek:** xApp, ~14 ms gecikme, 1/3 CPU ve 1/10 bellek iddiası "hafif xApp" argümanına doğrudan çakışıyor.
- **Okuma:** kısmi (yalnızca PAR özeti) · güven: düşük
- **Bağlantılar:** https://par.nsf.gov/biblio/10715045-ensemble-machine-learning-enabled-xapp-multi-class-jamming-detection-ran

### 5. Jamming Detection in 5G/6G Networks: From O-RAN Concept to OCUDU Deployment (Hoffmann, Kulacz, Baldo, Pakula, Raghothaman, 2026) — `2026_hoffmann_jamming-detection-oran-ocudu.pdf`
- **Tür:** savunma (xApp, tespit + hafifletme)
- **Problem ve hedef:** URLLC'yi tehdit eden "keyed" (açık/kapalı) jamming'i hareketli ortalama BLER ile tespit edip MCS tavanı koyarak gecikmeyi kararlı tutan JD-xApp; O-RAN'dan açık kaynak OCUDU CU/DU uygulamasına taşıma. arXiv:2609.18499 (cs.NI, 16 Eyl 2026), MILCOM 2026 kabul.
- **Veri / sinyal:** HARQ ACK/NACK (E2SM-LLC). Çekirdek algoritma Keysight UXM 5G Wireless Test Platform + PROPSIM F64 kanal emülatörü ile (AWGN artırılarak jamming taklidi) kaydedilen günlüklerle çevrimdışı değerlendirildi; POWDER laboratuvarında OCUDU + USRP X310, n78 bandı (3489,42 MHz, 20 MHz, SCS 30 kHz, 92,16 MHz örnekleme hızı), zayıflatma matrisi 95 dB ile hızla anahtarlanarak jamming (10 ms periyot). I/Q yok. Kamuya açık veri/kod: metinde bulunamadı.
- **Jammer türleri ve güç aralığı:** Sürekli ve darbeli/keyed jamming; "pulsed" senaryo t ≈ 175–405 s. Güç değerleri (JNR/SIR) bildirilmiyor.
- **Yöntem:** N ardışık iletimlik kayan pencerede BLER_avg; BLER_avg > β ise jamming bayrağı (β "kalibre edilmiş eşik", değeri/nasıl kalibre edildiği metinde bulunamadı). Tespitte MCS ≤ MCS_safe (örn. 2) E2 kontrolü.
- **Ana sonuçlar:** 415.972 taşıma bloğu/koşu; ilk denemede başarı %62,16 → %94,01; beklenen deneme sayısı 1,610 → 1,084; fazladan gecikme 0,610 → 0,084 T_extra (Tablo II); yaklaşık 253.600 → 34.800 yeniden iletim (−%86,3). OTA'da NACK/ACK oranı jamming sırasında ~%0 → ~%20; OTA'da yalnızca tespit kısmı entegre, hafifletme sonraki iş. **Tespit doğruluğu (TPR/FPR, gecikme) sayısal olarak raporlanmıyor.**
- **Tutarsızlık:** Özetteki "beklenen yeniden iletim deneme sayısını ≈ %67,3 azaltır" ifadesi Tablo II ile uyuşmuyor: 1,084/1,610 = 0,673, yani deneme sayısı %67,3'üne iniyor (≈ %32,7 azalma); "fazladan" yeniden iletimlerdeki azalma %86,3. Özetin %67,3'ü yanlış okunabilir bir ifade.
- **Açık-küme / bilinmeyen saldırı:** Hayır.
- **5G/6G unsurları:** Başlık ve giriş "5G/6G" diyor ama değerlendirme 5G NR (n78); 6G'ye özgü bir unsur yok. O-RAN E2SM-LLC, OCUDU (Linux Foundation CU/DU), URLLC.
- **Sınırlılıklar (yazarlar + metin):** OTA'da hafifletme henüz OCUDU'da yok; kapsamlı KPM değerlendirmesi gelecek iş; yalnızca BLER'e dayalı (L2/L3), fiziksel katman öznitelik yok; sınıflandırma/tür ayrımı yok.
- **Bizim projeyle ilişkisi:** Destekleyici/arka plan: "xApp + gerçek 5G testbed (lab emülatör + POWDER OTA)" kanıt örneği. Bizim fiziksel katman I/Q yaklaşımı ve tür sınıflandırmasından çok farklı; iki yaklaşım tamamlayıcı (BLER sinyali L2'de, bizimki L1'de).
- **Yenilik riski:**
  - (a) Yok.
  - (b) Düşük: "5G/6G" ifadesi var ama dalga biçimi/saldırı ailesi analizi yok.
  - (c) Düşük: β "kalibre edilmiş" deniyor, protokol tarif edilmiyor.
  - (d) Orta: laboratuvar emülatörü + POWDER OTA ile gerçek donanım doğrulaması var (ancak sim-to-real karşılaştırma yok; OTA'da yalnızca tespit bayrağı).
  - (e) **Yüksek:** xApp + OCUDU üzerinde pratik uygulama zaten gösterilmiş.
- **Okuma:** tam (özet, giriş, yöntem, testler, OTA, sonuç) · güven: yüksek

### 6. Green Learning-Based Signal-Level Detection of RIS Spoofing Attacks in Vehicular ISAC Systems (Chou, Shui, Fu, Chang, Saad, Wang, 2026) — `2026_chou_green-learning-ris-spoofing-isac.pdf`
- **Tür:** yöntem (tespit)
- **Problem ve hedef:** Kötü niyetli RIS'in zamanla değişen yansıma fazlarıyla RSU ISAC algılamasına sahte yankılar üretmesi (spoofing); eşleşik filtre sonrası RSU yankılarından doğrudan (sinyal düzeyinde) tespit. arXiv:2611.01881 (eess.SP, 1 Kas 2026), ICC 2027'ye gönderildi.
- **Veri / sinyal:** Simülasyon; 28 GHz, Nt = Nr = 32, P = 30 dBm, VU hızı 10 m/s, 150 algılama yuvası × 10 ms, 20.000 fiziksel olarak mümkün yörünge (1:1 meşru/sahte, 6 hareket örüntüsü, %20 test), RIS eleman sayısı M ∈ {8, 16, 32}, alıcı gürültü gücü −100…−60 dBm. Sahte veriler önceki çalışmadaki (MDP + PPO) saldırı üreticisi ile. Girdi: eşleşik filtre çıkışı karmaşık yankılar (gerçel/sanal birleştirme). Veri/kod: metinde bulunamadı.
- **Jammer türleri ve güç aralığı:** Jamming değil RIS spoofing (yapısal yapay yankılar); "geleneksel jamming SNR'ı düşürür, RIS spoofing yapısal sahte yankı üretir" ayrımı yapılıyor.
- **Yöntem:** İki aşamalı SAAB (Subspace Approximation with Adjusted Bias) + DFT (Discriminant Feature Test) + XGBoost; LSTM, BiLSTM ve yörünge düzeyli STL (sinyal-zamansal mantık) dedektör taban çizgileri. 9.600 boyutlu temsil → SAAB ile 168 → DFT ile 15 öznitelik.
- **Ana sonuçlar:** M = 32, −80 dBm: doğruluk %99,335 (5 tohum), kesinlik ≈ %99,58, P_D = %99,09, P_MD = %0,91, P_FA = %0,42; 20.000 test örneğinde (5 tohum toplamı olduğu anlaşılıyor: 5×4000) 9.958/10.000 meşru ve 9.909/10.000 sahte doğru. M = 8 / 16 / 32 için %71,69 / %93,82 / %99,33. Karmaşıklık 0,1119 milyon FLOP (LSTM/BiLSTM'den 615–1759 kat az); CodeCarbon ile 1,13×10⁻⁴ kWh (LSTM 1,24×10⁻³ kWh). Çapraz koşul: M = 16'da eğitip M = 8 ve 32'de sınama: %71,82 ve %97,07 (koşula özel eğitime göre %71,69 ve %99,33).
- **Açık-küme / bilinmeyen saldırı:** Kısmi: "görülmemiş RIS boyutu"na genelleme; yeni saldırı ailesi (sınıf düzeyi açık-küme) yok; eğitim iki sınıflı denetimli.
- **5G/6G unsurları:** ISAC (IMT-2030/6G'nin kilit yeteneği), RIS, mmWave 28 GHz, araç ağları (RSU); NTN yalnızca anılıyor (1 geçiş).
- **Sınırlılıklar (yazarlar):** Tek VU, tek kötü niyetli RIS; kanal/hareket/saldırı yapılandırmaları [11]'den miras; çok hedef, çoklu RIS, ideal olmayan donanım, kanal-modeli uyuşmazlığı, heterojen dağıtım gelecek iş.
- **Bizim projeyle ilişkisi:** Benzer/yöntem ödünç: "ham yankı sinyalinden hafif (0,11 MFLOP) ağaç tabanlı tespit" ve "enerji/FLOP ölçümü" fikri bizim hafif RF/IF argümanıyla örtüşüyor. 6G (ISAC + RIS) konumlandırması için doğrudan komşu; saldırı jamming'den farklı (spoofing), denetimli ikili sınıflama.
- **Yenilik riski:**
  - (a) Düşük: sinyal düzeyi (eşleşik filtre sonrası karmaşık yankı) ama denetimli ikili ve spoofing, jamming açık-küme yok.
  - (b) Orta: 6G ISAC + RIS saldırı ailesi için sinyal düzeyi tespit; ancak "standart dalga biçimi üzerinde saldırı aileleri" değil, tek saldırı (RIS spoofing).
  - (c) Yok (denetimli, sahte etiketli eğitim).
  - (d) Yok.
  - (e) Orta: hafif/enerji verimli tespit vurgusu var, ama RAN-içi uygulama (xApp) iddiası yok.
- **Okuma:** tam · güven: yüksek

### 7. Cloudy Skies: Early Detection of Jamming Against Iridium LEO Satellite-IoT Links (Huso, Fliescher, Sciancalepore, Oligeri, 2026) — `2026_huso_cloudy-skies-iridium-jamming.pdf`
- **Tür:** veri seti + yöntem değerlendirmesi
- **Problem ve hedef:** Iridium LEO uydu-IoT bağlantılarında, hâlâ doğru çözülen mesajların fiziksel katman bilgisinden bağlantı kopmadan önce jamming tespit edilebilir mi; GNSS tabanlı SNR ve C/N0 göstergeleriyle tek-sınıf otoenkoderlerin karşılaştırması. arXiv:2611.08118 (cs.CR, 5 Kas 2026).
- **Veri / sinyal:** **Gerçek ölçüm**: LimeSDR USB alıcı + SAWbird+IR LNA + ANT500, GNU Radio 3.10 + gr-Iridium (QPSK sembolü başına bir I/Q örneği saklanıyor; veri 25.000 örnek/sn olarak ifade ediliyor; 1000 örneklik parça = 40 ms ≈ ~4 mesaj); jammer ikinci LimeSDR (≤ 10 dBm − 10 dB zayıflatıcı), 1622 MHz. **47 jamming koşulu**: Deney 1 (7 jammer kazancı: 48–73 dB) + Deney 2 (LM'de 9 + HM'de 10 mesafe = 19) + Deney 3 (aldatıcı/replay, 6 mesafe) + Deney 4 (hareketli alıcı: 9 LM + 6 HM = 15) = 47 (sayım metindeki deney tanımlarından, toplam bizim hesabımız ve özetteki 47 ile uyumlu). İki ortam (düşük/yüksek çok yollu), statik ve hareketli alıcı. Veri seti açık: GitHub (kaynakça [1]: GiuliaFliescher/LEOSatelliteWeakJammingDetectionDataset).
- **Jammer türleri ve güç aralığı:** Yalnızca (i) geniş bant AWGN ve (ii) aldatıcı replay (önceden kaydedilmiş Iridium bandı); sürekli, uyarlanmayan; reaktif/sweep/ton/darbeli kapsam dışı (yazarlar reaktif ve "overshadowing" saldırganları kapsam dışı bırakıyor). JSR alıcı gürültü tabanı artışı ΔN ile ölçülüyor.
- **Yöntem:** Üç tek-sınıf otoenkoder: Raw AE (1.072 parametre, ham I/Q), LSTM-AE (62.850), görüntü tabanlı IB AE (1.655.824); GNSS tabanlı iki taban çizgisi (momentlere dayalı C/N0, sembol-yönlü SNR). **Yalnızca jamming-siz veriyle eğitim** (3 dB'lik SNR sınıflarına dengelenmiş); eşik = eğitim skorlarının P95'i (hedef FPR 0,05); parçalar 250–2000 örnek ve tek mesaj; metrik AUC (Mann-Whitney) + 200 tekrarlı bootstrap %95 GA; TPR/FPR P95 eşikte.
- **Ana sonuçlar:** 1000 örneklik parçalarda ΔN ≥ 9 dB olan gürültü jamming'inde AUC ≥ 0,84; ΔN ≤ 0 iken hiçbir otoenkoder AUC > 0,66 yapamıyor; kazanç 58 dB ve üzeri için üç otoenkoderin AUC ≥ 0,94 (Deney 1, HM static, d = 10 cm). Raw AE medyan AUC tek mesajda ≈ 0,68, c = 1000'de ≈ 0,80. Aldatıcı jamming genel olarak AWGN'den zor tespit ediliyor (örn. Tablo III'te d = 60 cm'de AUC 0,43–0,50). SNR/C/N0 tabanlı tahminciler güçlü girişimde bile sıklıkla AUC < 0,7. **Model aktarımı (Test 3):** 155 eşli testte medyan |ΔAUC| Raw AE 0,007, LSTM-AE 0,029, IB AE 0,095; fakat HM-static → LM-static aktarımında Raw AE FPR'ı 0,04 → 0,38 (tek mesaj) ve 0,04 → 0,61 (c = 1000), LSTM-AE 0,47 ve 0,68'e çıkıyor: "model aktarımı eşik aktarımından çok daha kolay"; eşik dağıtım yerinde jamming-siz trafikle yeniden kalibre edilmeli. P95 eşik bazı koşullarda muhafazakâr (TPR 0,38–0,42, LM static d = 20 cm, AUC 0,86–0,87).
- **Açık-küme / bilinmeyen saldırı:** Kısmi/örtük: tek-sınıf (yalnız normal) eğitim zaten "bilinmeyen jammer" mantığında; AWGN ve replay ile ayrıca değerlendirildi; resmî açık-küme sınıflandırması (tür ayrımı) yok.
- **5G/6G unsurları:** Uydu-IoT / LEO (NTN eğilimi); metinde 6G veya NTN terimi geçmiyor (grep ile 0). Iridium QPSK, 1616–1626,5 MHz.
- **Sınırlılıklar (yazarlar + metin):** Yalnızca AWGN ve replay jammer; kısa mesafeli (10–180 cm) küçük ölçekli deney (yasal nedenlerle mesafe artırılmadı); Iridium'a özgü; ΔN ilişkisinin diğer uydu sistemlerine genellenmesi gelecek iş; tür sınıflandırması yok; yanlış alarm oranı yalnızca P95 eşik/özel tablolarda.
- **Bizim projeyle ilişkisi:** **EN YAKIN çalışmalardan biri.** (a) Ham I/Q, yalnız normalle eğitilmiş tek-sınıf dedektör, GNU Radio + SDR ile gerçek veri; (c) eşiği yalnız jamming-siz veriden kalibre ediyor ve bu eşiğin ortam değişince bozulduğunu (FPR 0,04 → 0,38/0,61) gösteriyor — bizim "yalnız-normalden kalibrasyon" iddiamızı hem destekliyor hem de kapsamını sınırlıyor (dağıtım yerinde yeniden kalibrasyon şart). Farkımız: 5 türlü (constant/tone/sweep/pulse) jammer ailesi, el yapımı özniteliklerle Isolation Forest + RF, tür sınıflandırması ve açık-küme (sınıf gizleme) deneyi; onlar otoenkoder + AUC + tek saldırı ailesi (gürültü, replay).
- **Yenilik riski:**
  - (a) **Orta-yüksek:** ham I/Q üzerinde yalnız-normal tek-sınıf jamming tespiti, gerçek veri ile var; ama ham I/Q "sınıf gizleme" açık-küme tür sınıflandırması yok.
  - (b) Düşük: uydu bağlantısı ve QPSK; 6G'ye yönelik standart dalga biçimi/saldırı aileleri analizi yok.
  - (c) **Yüksek:** eşiği yalnız jamming-siz veriden (P95) kalibre eden protokol ve aktarımda eşik bozulması ölçülmüş; "kalibrasyon protokolü" yeniliği iddia edilecekse bu çalışma ile çakışma açıkça tartışılmalı.
  - (d) Orta: gerçek ölçüm var ama sim-to-real karşılaştırması yok (simülasyon yok); ortamlar arası aktarım (HM ↔ LM) var.
  - (e) Orta: Raw AE'nin 1.072 parametre / iki matris-vektör çarpımı olarak hafifliği vurgulanıyor (gömülü terminal hedefi); RAN-içi/xApp değil.
- **Okuma:** tam (özet, giriş, ilgili çalışmalar, düşman modeli, dedektörler, veri toplama, değerlendirme, sonuçlar, Tablo III–V, sonuç; formül ayrıntıları ve bazı şekiller atlandı) · güven: yüksek
- **Bağlantı:** https://arxiv.org/abs/2611.08118 · veri seti: https://github.com/GiuliaFliescher/LEOSatelliteWeakJammingDetectionDataset (makale kaynakçasından; erişim denenmedi)

### 8. OFDM-based JCAS under Attack: The Dual Threat of Spoofing and Jamming in WLAN Sensing (Yildirim, Keskin, Wymeersch, Horlin, 2025) — `2025_yildirim_ofdm-jcas-spoofing-jamming.pdf`
- **Tür:** temel kuram / saldırı analizi (savunma yok)
- **Problem ve hedef:** WLAN (802.11) sensing'de standartlaştırılmış OFDM sembolleri, JTFS ve korumasız sensing pazarlığı sayesinde pahalı DRFM olmadan ucuz SDR ile hedef sahteleme ve aldatıcı jamming yapılabildiğini matematiksel ve deneysel göstermek. arXiv:2501.06798 (12 Ocak 2025); arXiv sayfasında ilgili DOI: 10.1109/JIOT.2025.3527062 (IEEE IoT Journal; makalenin son hâli olduğu arXiv sayfasında "related DOI" olarak veriliyor, tam dayanak doğrulanmadı).
- **Veri / sinyal:** Simülasyon (Tablo V düz metinde dağınık; 80 MHz ve 5 GHz değerleri görünüyor, hangi parametreye ait olduğu net değil) + deney: 3 USRP X310 (Alice+Bob tek cihaz, Eve iki cihazla), kapalı alan, hareketli hedef olarak metal vantilatör; çıktı range-Doppler haritası (RDM). I/Q üzerinde çalışılıyor ama örnekleme hızı gibi ayrıntılar okunmadı. Veri seti yok.
- **Jammer türleri ve güç aralığı:** Aşırı kalabalıklaştırma (overcrowding), seçici hedef enjeksiyonu, zorlamalı senkronizasyon (forced synchronization) stratejileri; JSR ve CFO farkına duyarlılık: saldırı JSR > 8–12 dB ve CFO farkı ≥ 3 ppm (veya geniş alt taşıyıcı aralığında 6 ppm) iken çok etkili.
- **Yöntem:** Kapalı biçim sinyal modelleri; OS-CFAR hedef tespiti ile P_D / yanlış alarm analizi (saldırının etkisini ölçmek için); jammer stratejilerinin karmaşıklık / etkinlik / bob tarafından saptanabilirlik tablosu (Tablo IV). **Bir savunma/tespit algoritması önerilmiyor.**
- **Ana sonuçlar:** Gerçek hedefler için kaçırma oranı ve yapay hedef tespit oranı JSR ve CFO bölgelerine göre (Şekil 7–10); düşük JSR'de yapay hedef tespit oranı ≈ %20, orta/yüksek JSR bölgelerinde etkinlik artıyor (sayısal ayrıntılar şekil metninden; tablo düz metinde okunaksız). Deney: ucuz SDR'lerin bu saldırıları gerçekleştirebildiği; kirlilik/ghost hedefler nedeniyle sayısal-deneysel farklılıklar var.
- **Açık-küme / bilinmeyen saldırı:** Hayır (tespit yok).
- **5G/6G unsurları:** JCAS/ISAC (WLAN sensing); Hexa-X-II ve "6G Era" taşıma güvenliği projeleriyle desteklenmiş (finansman notu); NTN yok.
- **Sınırlılıklar (yazarlar + metin):** Basitleştirilmiş çerçeve yapısı (NDPA/NDP'de yalnızca bir OFDM sembolü; L-STF/L-LTF taklit edilmedi); tek hedef/SDR kurulumu; savunma gelecek iş ("fiziksel katman dalga biçimlerini koruma, senkronizasyonu iyileştirme, uyarlanabilir yöntemler").
- **Bizim projeyle ilişkisi:** Arka plan/destekleyici: "standartlaştırılmış, bilinen dalga biçimi ucuz SDR ile saldırıya açıktır" tezi (b) iddiamızı motive ediyor. Tespit tarafı boş: bu boşluğa fiziksel katman jamming tespiti yerleştirilebilir.
- **Yenilik riski:**
  - (a) Yok (tespit yok).
  - (b) **Orta:** bilinen standart (OFDM/WLAN) dalga biçimine dayalı saldırı aileleri sistematik olarak analiz edilmiş ve SDR ile deneylenmiş; ancak WLAN sensing (6G değil), saldırı tarafı.
  - (c) Yok.
  - (d) Düşük-orta: simülasyon + USRP deneyi var ama sim-to-real doğrulama olarak yapılandırılmamış.
  - (e) Yok.
- **Okuma:** kısmi (giriş, ilgili çalışma, sistem modeli, jammer stratejileri tablosu, sayısal ve deneysel bölüm başlıkları, sonuç; türetmeler ve şekillerin çoğu atlandı) · güven: orta

---

## Bu grubun genel gözlemleri

1. **En yakın çakışma Huso ve ark. (Çalışma #7):** gerçek SDR (GNU Radio) verisi, ham I/Q, yalnız jamming-siz veriyle eğitilen tek-sınıf dedektör ve P95 eşiği ile bizim "yalnız-normalden kalibrasyon" fikrine en yakın. Yeniliği korumak için bu çalışmaya açıkça atıf yapıp farkı vurgulamak gerekiyor: çok türlü jammer ailesi (constant/tone/sweep/pulse), tür sınıflandırması ve sınıf-gizleme açık-küme protokolü.
2. **Eşik aktarımı bulgusu:** Huso ve ark. modelin ortamlar arası aktarılabildiğini (medyan |ΔAUC| 0,007–0,029) ama eşiğin aktarılamadığını (FPR 0,04 → 0,38–0,68) ölçmüş. Bu, normal-yalnız kalibrasyon protokolünü savunurken yeniden kalibrasyon (dağıtım yerinde jamming-siz kayıt) gerektiğini söylemek zorunda kalacağımızı gösteriyor ve makalede "eşik kayması" deneyi için fırsat (fırsat: kanal modeli/SNR değişiminde FPR'ı raporlamak).
3. **"RF + Isolation Forest" artık yenilik değil (Kurma ve ark.):** özetten, MAC/KPM üzerinde RF + SVM + IF topluluğu O-RAN xApp olarak sunulmuş (≈ 14 ms, CNN'e göre 1/3 CPU, 1/10 bellek). Tam metin embargolu (Eylül 2027); yenilik iddiasında model seçimine değil, I/Q öznitelikleri, açık-küme protokolü ve sınıf gizleme sonuçlarına yaslanılmalı.
4. **xApp/RAN-içi uygulama yönü doldu:** Ratti (KPM + kümeleme, 0,89 s/2000 UE), Hoffmann (BLER, OCUDU/OTA), Kurma (ensemble xApp), ayrıca arama sırasında bulunan Gopal ve ark. (SEM; arXiv:2610.20816, aşağıda madde 11). Hepsi L2/L3 KPM tabanlı; **ham I/Q veya fiziksel katman öznitelikli xApp** bu üç çalışmada yok (Ratti [17]'de I/Q için başka bir çalışmayı yalnızca atıf olarak anıyor). "Hafif xApp" iddiası (e) tek başına yenilik değil; PHY I/Q + açık-küme ile birleştiğinde ayrışabilir.
5. **Açık-küme/zero-day jamming mevcut ama farklı koşulda (Aissou):** enerji-çerçevesi girdisi, Rayleigh simülasyonu, K = 4 bilinen sınıf (benign/sequential/random/reactive), DP-means yarıçapı etiketli doğrulama verisinden; tespit olasılığı 0,86–0,92. Bizim ham I/Q + yalnız-normal Isolation Forest + sınıf gizleme deneyimiz (%98 saldırı olarak yakalama) bu çalışmaya göre normal-yalnız, hafif ve gerçek SDR kayıtlı kurgu farkı taşıyor; yine de "açık-küme jamming" genel iddiasını yumuşatmak gerekir (kısmi öncül var).
6. **Gerçek donanım/sim-to-real doğrulaması dar:** Hoffmann (UXM/PROPSIM + POWDER OTA, ama OTA'da yalnızca tespit bayrağı), Huso (tamamen gerçek ölçüm), Yildirim (USRP deneyi, saldırı odaklı). Hiçbiri simülasyonla gerçek verinin aynı protokolle karşılaştırıldığı bir "sim-to-real" çalışması sunmuyor (bu gruptan görünen). Ratti ve Aissou tamamen simülasyon; Ratti gelecek iş olarak fiziksel donanımı söylüyor.
7. **6G odaklı komşular yalnızca saldırı/algılama sensing tarafında:** Chou (ISAC + RIS spoofing, 28 GHz, %99,335 doğruluk, 0,1119 MFLOP) ve Yildirim (WLAN JCAS, 6G-dönemi taşıma güvenliği projesi finansmanlı). Her ikisi de jamming'in ham-I/Q açık-küme sınıflandırmasına değil, algılama (sensing) fonksiyonunun sahteciliğine odaklanıyor; spoofing ≠ jamming ayrımı yazarlarca vurgulanıyor. Chong'un RIS-jamming veri seti (bilgi yok) bu çizgiye en yakın olası çakışma.
8. **Tutarsızlık (Hoffmann):** özette "beklenen yeniden iletim sayısında ≈ %67,3 azalma" deniyor; Tablo II'ye göre deneme sayısı 1,610 → 1,084 (yani %67,3'üne inmesi, ≈ %32,7 azalma), "fazladan" yeniden iletim azalması %86,3. Bu çalışmaya atıf yaparken sayı doğru okunmalı.
9. **Güç/SNR ve kanal değişimi:** Aissou SNR 5–30 dB tarar, Chou gürültü gücü −100…−60 dBm ve RIS boyutu tarar, Huso jammer kazancı/mesafe/ΔN tarar; bizde jammer_amp elle 0–2 değişiyor. Huso'nun "tespit edilebilirlik ΔN ≥ 9 dB (AUC ≥ 0,84) ile belirleniyor" bulgusu, bizim sonuçlarımızı JNR/gürültü tabanı artışı cinsinden raporlama fikrini destekliyor (öneri).
10. **Veri setleri:** Huso (GitHub'da, 47 koşul, gerçek) ve Ratti (GitHub release v2.0, simülasyon) açık; Chong'un veri seti (sentetik, RIS) bağlantısı bulunamadı; Aissou/Hoffmann/Chou veri/kod bildirmiyor. Veri seti iddiası yapılacaksa Chong'un katkısı kontrol edilmeli.
11. **Aynı arama sırasında rastlanan ek komşu adaylar (bu turda okunmadı, yalnızca özet düzeyi):** Schösser ve ark., "Spectrum Anomaly Detection in OFDMA Systems: Simulation Framework and Benchmark Dataset" (arXiv:2606.02102; 5 jammer türü, gürültüden pilot-bilinçli saldırıya, spektrogram veri seti, denetimli ve denetimsiz taban çizgileri, 5G/6G, açık kaynak çerçeve — (b) ve veri seti iddialarına yakın olabilir); Gopal ve ark., "O-RAN-Native Jamming Detection Under Network Heterogeneity" (arXiv:2610.20816; E2 telemetri, SEM istatistiksel topluluk, soğuk başlangıç etiketsiz mod, ~25 saat / 8 ortam, öğrenmeli modeller dağılım değişince kaçırıyor — (c) iddiasına yakın); Virginia Tech "Holding the Line: Multi-Stage Jamming Classification in 5G O-RAN" (7 jamming türü, gerçek 5G O-RAN testbed). Bunların ayrıca okunması öneriliyor.
12. **Boşluk işaretleri (bu gruptan görünen):** (i) ham I/Q üzerinde çok türlü (constant/tone/sweep/pulse) jammer + açık-küme tür ayrımı + yalnız-normal eşik protokolü bu 8 çalışmada birlikte yok; (ii) sim-to-real doğrulama yok; (iii) 6G-özel (OTFS, THz, NTN ile standart dalga biçimi) jamming tespiti bu grupta yok (NTN yalnızca Huso'nun Iridium verisi, 6G etiketi taşımıyor).
13. **Dürüstlük notu:** #2 (Chong) ve #4 (Kurma) içerik düzeyinde değerlendirilemedi/yalnızca özetten değerlendirildi; #3 (Ratti) açık erişimli HTML'den özetleyici araçla okundu (PDF indirilemedi). Yenilik risk derecelendirmeleri bu üçü için geçicidir.
14. **JSON alan eşleme notları:** `matris_07b.json`'da Chong ve Kurma için bilinmeyen alanlar boş liste / "hayir" varsayılanıyla dolduruldu (tahmin değil, bilgi yok). Yildirim için şemada "saldırı analizi" aşaması olmadığından `asama` = "veri_uretimi" seçildi (savunma/tespit önerilmiyor). Chou'nun saldırı üreticisi MDP/PPO ile eğitiliyor ama iki durumlu Markov zinciri değil: `markov_jammer` = "hayir". Hoffmann'ın değerlendirmesi 5G NR; `ag_nesli` yalnızca "5g" (6G başlık/çerçeve düzeyinde). Huso'nun Iridium verisinde metin NTN/6G demiyor: `alti_g_ozellikleri` = "yok", `ag_nesli` = "uydu".
