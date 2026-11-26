# INCELEME 07a: Hong, Kim, Lee (2023), yalnızca ikincil kaynaklardan

> **Durum:** Makalenin yasal açık erişimli tam metni BULUNAMADI. Bu belge makaleyi okuyarak değil, aşağıda sıralanan ikincil kaynaklardan yeniden kurar. Her bilginin yanında kaynak ve güven düzeyi vardır. Tam metinde görülmeyen hiçbir sayı (doğruluk, F1 vb.) burada yer almaz; çünkü bu oturumda hiçbir kaynakta görülmedi.

## Hong 2023 (yalnızca ikincil kaynaklardan)

### 1. A Hybrid Jamming Detection Algorithm for Wireless Communications: Simultaneous Classification of Known Attacks and Detection of Unknown Attacks (Hong, Kim, Lee; KAIST, 2023) — `web_hong_2023` (PDF yok)

**Künye (doğrulandı):** Seokhwa Hong, Kyuyeong Kim, Si-Hyeon Lee, IEEE Communications Letters, cilt 27, sayı 7, s. 1769-1773, Temmuz 2023. DOI: 10.1109/LCOMM.2023.3275694 (Crossref kaydı, bu oturumda görüldü). IEEE Xplore belge no: 10123966. Açıklık durumu: OpenAlex `is_oa=false`, `any_repository_has_fulltext=false`; Semantic Scholar `isOpenAccess=false`, `status=CLOSED`. arXiv araması (başlık ve "hybrid jamming detection" anahtar sözcükleriyle) sıfır sonuç döndürdü.

**Erişim denemeleri (kayıt):**
- KAIST EE "AI in Communication" sayfası: yalnızca özet ve iki şekil başlığı; PDF/DOI/arXiv bağlantısı yok.
- IEEE Xplore: otomatik istemciyi reddediyor (HTTP 418); atlatma denenmedi.
- KAIST kurumsal depo (koasas) `handle/10203/310007`: JavaScript meydan okuması (bot doğrulaması) çıkarıyor; aşılmadı. Arama sonuçlarında bu kaydın 2023 Şubat tarihli bir KAIST yüksek lisans tezi (kayıt başlığı: "학위논문(석사) - 한국과학기술원 : 전기및전자공학부, 2023.2, [iii, 25 p.]") olduğu ve anahtar sözcüklerinin jamming detection, jamming classification, isolation forest içerdiği görüldü. Tezin yazarının Seokhwa Hong olduğu doğrulanamadı; yalnızca olası ilgili kayıt olarak not edilir. Tam metne erişilemedi.

**Tür:** yöntem (tespit + sınıflandırma, hibrit)

**Problem ve hedef (güven: yüksek, özetten):** Eğitimde kullanılan bilinen saldırıları sınıflandırırken eğitimde kullanılmayan bilinmeyen saldırıları da tespit eden tek bir algoritma.

**Yöntem (güven: yüksek yapı için, düşük ayrıntı için):**
- Hibrit yapı: basit bir sınıflandırma modeli (karar ağacı, DT) ile bir anomali tespit modeli (Isolation Forest, IF). (KAIST sayfası ve Semantic Scholar özeti, birebir aynı metin.)
- Akış: test verisi önce yalnızca "normal ya da bilinen saldırılardan biri" diyen DT'den geçer; ardından IF, "DT'nin kararı gerçekten doğru mu" sorusunu karara bağlar. (Özet, birebir.)
- "Sapmayı azaltmak için bir topluluk (ensemble) yöntemi uygulanır." (Özet.)

**Veri / sinyal (güven: yüksek yalnızca "gerçek veri, C bandı, modem, statik+mobil, 4 tür" için):** Gerçek kablosuz modem verisi, C bandı, statik ve mobil ortamlar, toplam 4 jamming türü. Cihaz modeli, örnekleme hızı, örnek sayısı, jammer güçleri: BULUNAMADI.

**Öznitelikler (güven: düşük, tek zincirleme ikincil kaynak, doğrulanamadı):** Atıf yapan iki çalışma Hong'u şöyle tarif ediyor:
- Jia ve ark. 2025 (IEEE IoT-J), Semantic Scholar atıf bağlamı: "Hong et al. [27] developed a hybrid machine-learning method combining decision tree and isolation forest, which utilizes four parameters: PDR, bad packet ratio, SNR, and RSS."
- Verma ve ark. 2026 (IEEE TNSE), atıf bağlamı: "Hong et al. [61] used decision trees to classify various jamming types, including tone and Gaussian, based on physical layer features like PDR, SNR, and bad packet ratio."
- Bu iki ifade birbiriyle tutarlı, ancak ikisi de makaleyi okumuş olduğunu göstermiyor; tipik jamming-tespit literatüründeki (PDR/BPR/SNR/RSS) özniteliklerle karışmış olabilir. Doğrulanmadan kullanılmamalı. Doğruysa Hong'un öznitelikleri paket/bağlantı düzeyi ölçümleridir, ham I/Q değil.

**Jammer türleri (güven: düşük):** Dört tür. İkincil kaynaklardan yalnızca Verma 2026 "tone ve Gaussian" diyor; diğer ikisi bilinmiyor.

**Değerlendirme eksenleri (güven: yüksek, özetten):** jammer mesafesi, bilinen saldırı sayısı, hareketlilik (statik/mobil). "Bir baz algoritmaya göre tüm durumlarda üstün" deniyor. Baz algoritmanın adı ve sayısal sonuçlar BULUNAMADI.

**Açık-küme / bilinmeyen saldırı:** Evet (özet: "detect unknown attacks not used for training"). Kaç tür bilinen/bilinmeyen olduğu, nasıl bölündüğü, "bilinen saldırı sayısı" ekseninin tam anlamı: BULUNAMADI.

**Eşik seçimi, DT ve IF'in birleşme kuralı ayrıntısı, IF'in neyle eğitildiği (yalnızca normal mi, sınıf başına mı):** BULUNAMADI. Özet "IF, DT'nin kararının doğru olup olmadığını belirler" diyor; bu, IF'in DT'nin sınıf kararına bağlı çalıştığını düşündürür ancak somut kural bilinmiyor.

**5G/6G unsurları:** Özette yok (genel kablosuz iletişim). Lohan ve ark. 2024 derlemesinin 6G bağlamında ele aldığı, ancak bu derleme metne erişilemediği için ne dediği doğrulanamadı (IEEE sitesi otomatik erişimi reddediyor).

**Sınırlılıklar:** Yazarların söylediği sınırlılıklar bilinmiyor (tam metin yok). Özetten çıkarılabilen: tek bir donanım/bant (C bandı, modem), dört jamming türü; bunun dışı bilinmiyor.

**Bizim projeyle ilişkisi:** Rakip (yapı olarak en yakın öncül). Ayrıntılı karşılaştırma `HONG_2023_VE_ATIF_IZLEME.md` dosyasında.

**Okuma:** kısmi (yalnızca özet + ikincil atıf bağlamları) · güven: düşük

### Kullanılan kaynaklar
| Bilgi | Kaynak | Güven |
|---|---|---|
| Künye, DOI | Crossref API (`10.1109/lcomm.2023.3275694`), Semantic Scholar | yüksek |
| Özet, mimari, değerlendirme ekseni | KAIST EE sayfası (https://ee.kaist.ac.kr/ai-in-communication/a-hybrid-jamming-detection-algorithm-for-wireless-communications-simultaneous-classification-of-known-attacks-and-detection-of-unknown-attacks/), Semantic Scholar özet alanı | yüksek |
| Kapalı erişim | OpenAlex W4376481309, Semantic Scholar | yüksek |
| PDR/BPR/SNR/RSS öznitelikleri, "tone/Gaussian" | Jia 2025 (doi 10.1109/JIOT.2025.3618721) ve Verma 2026 (doi 10.1109/TNSE.2026.3676399) atıf bağlamları, Semantic Scholar | düşük |
| "DT + IF birleşimi" tarifi doğrulaması | Bouzabia 2024 (IEEE Commun. Lett.) atıf bağlamı; Gopal 2026 (arXiv 2610.20816) "hybrid classifiers for known and unknown attacks" | orta (yalnızca aynı yapıyı doğrular) |

## Bu grubun genel gözlemleri
1. Hong 2023, "bilinen saldırıyı sınıflandır + bilinmeyeni anomali tespitiyle yakala" fikrinin Isolation Forest ile uygulanmış, hakemli (IEEE Communications Letters) bir örneğidir. Bu, bizim açık-küme iddiamızın "ilk" olduğu savını ciddi biçimde sınırlar.
2. Makale kapalı erişimlidir; arXiv, kurumsal depo ve yayıncı tarafında yasal açık kopya görülmedi. Yazara e-posta ile istek (ResearchGate/yazar iletişimi) veya kütüphane erişimi tek yasal yoldur.
3. Özette sayısal sonuç yok; üstünlük "bir baz algoritmaya göre" ifade ediliyor ve baz algoritma adı özette verilmiyor.
4. Değerlendirme eksenleri (mesafe, bilinen saldırı sayısı, hareketlilik) bizim "jammer gücü değişimi" ve "gizlenen tür" eksenimizle kısmen örtüşüyor; bu eksenlerin sayıları tam metin olmadan karşılaştırılamaz.
5. Atıf alan çalışmalar Hong'u çoğunlukla bir cümleyle anıyor; bir kısmı (Verma 2026) yapısını yanlış ya da eksik özetliyor olabilir ("yalnızca karar ağacı" gibi); ikincil kaynaktan öznitelik çıkarmak riskli.
6. Aynı fikrin yeni, bağımsız örnekleri var (CITADEL 2026, PLOS ONE 2025 enerji tabanlı açık-küme, IET Commun. 2026, Signal Process. Lett. 2024 JCGAN); ayrıntı için `HONG_2023_VE_ATIF_IZLEME.md`.
7. Yazarların devam çalışması (jamming tespiti/bilinmeyen saldırı) görünmüyor: Semantic Scholar'da Si-Hyeon Lee'nin 2023 sonrası işleri bilgi kuramsal gizlilik, örtülü iletişim ve UAV; jamming ile ilgili tek diğer iş "Anti-Jamming Games in Multi-Band Wireless Ad Hoc Networks" (oyun kuramı, savunma).
8. 6G bağlamı: Hong'un kendisi 6G'ye özgü unsur içermiyor; fırsat bu boşlukta (NTN, O-RAN, ISAC bağlamında açık-küme jamming).
