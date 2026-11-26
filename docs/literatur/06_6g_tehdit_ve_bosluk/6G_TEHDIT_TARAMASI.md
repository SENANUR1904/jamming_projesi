# 6G Fiziksel Katman Tehdit Taramasi ve Bosluk Analizi

Tarama tarihi: 25 Kasim 2026. Yontem: OpenAlex API (kisa sure sonra gunluk kota doldu), WebSearch ve arXiv ozet sayfalari (WebFetch). PDF indirilmedi. Kaynak dogrulama duzeyleri:

- **[A]** = arXiv ozet sayfasi bu oturumda dogrudan okundu (baslik/yazar/tarih sayfadan).
- **[O]** = yalnizca OpenAlex API kaydi (baslik, yazarlarin ilk uc'u, yayin yeri, DOI) goruldu; ozet/icerik okunmadi.
- **[S]** = yalnizca arama motoru ozeti/snippet'i goruldu; kunye eksik olabilir, "dogrulanmadi" etiketli.

Not: "Literatürde yok" ifadesi kullanilmamistir; yalnizca "bu aramalarda bulunamadi" denmistir.

> **Duzeltmeler (2. tur dogrulamasi; ayrintilar `../07_ikinci_tur_komsu_calismalar/6G_KAYNAK_DOGRULAMA.md`)**
> - arXiv:2605.30622 yanlis konuya baglanmis: Delavari ve Farooq, O-RAN dilimleme (DySPAN 2026). PUSCH reaktif jamming + HARQ makalesi arXiv:2606.14465'tir (Alaimo vd.). arXiv:2401.10387 NOMA ile reaktif jammer'in analitik incelemesidir (tespit yok).
> - Arcangeloni "%93 @ 27 dB": deger dogru, birimi SJR'dir (SNR degil). Yayin yeri: ISSE 2024.
> - de Sena (IEEE WCL 13(4), 2024): "pilot fazinda sessiz", "ek guc gerektirmez", "enerji dedektorune gorunmez" ifadeleri ozette yok; yorum olarak okunmali.
> - Hoffmann (arXiv:2609.18499): ozetteki "%67,3 yeniden iletim azalmasi" Tablo II ile tutarsiz (1.084/1.610 = %67,3 oraninda kalma, ~%32,7 azalma).
> - 41 kaynak dogrulandi: 27 dogrulandi, 11 duzeltildi, 1 yanlis, 2 dogrulanamadi (Krayani WCNC 2023, Marti TSP 2025).

---

## A. Saldiri manzarasi

Ozet tablo (ayrintilar ve tum kunyeler `6g_saldirilar.json` icindedir).

| # | Baslik | Tanim | Fiziksel imza (dedektorun gorecegi) | Mevcut tespit calismalari | Simulasyon olanagi | Doluluk |
|---|---|---|---|---|---|---|
| 1 | ISAC sensing jamming/spoofing/replay | Ortak OFDM dalga bicimi ile sensing'i bozan aldatici jamming, sahte hedef, replay | Aralik-Doppler haritasinda sahte hedef/gurultu tabani; yanki korelasyonu; MIMO'da aci tutarsizligi | Arcangeloni 2024 (VAE, arXiv:2410.01632) [A]; Yildirim 2025 (arXiv:2501.06798) [A]; Chrysanidis, IEEE Access 2024 [O]; Krayani, WCNC 2023 [O] | Sionna v2.2.0 `sionna.phy.isac` + RT RCS; USRP (Yildirim SDR ile deney yapmis) | orta |
| 2 | RIS (kotu niyetli RIS, RIS-jamming, RIS spoofing) | RIS fazlariyla yapay kullanici-arasi girisim / sahte yankilar; pilot fazinda sessiz | Ek guc yok; CSI kararsizligi, kullanicilar arasi korelasyon artisi | Mackensen NDSS 2025 [O]; de Sena IEEE WCL 2024 (arXiv:2401.07149, savunma) [S]; Chong ICC-W 2026 veri seti [O]; Chou 2026 (arXiv:2611.01881) [A] | Sionna RT'de RIS yalniz 0.19.x (sionna-rt v1.0.0 notu); v2.2 dokumaninda RIS bahsi yok; kendi kaskad kanal kodu; donanim: gercek RIS | orta |
| 3 | THz/mmWave isin saldirilari | Beam-stealing (amplify-relay), isin egitimi bozma, yan lob ton, dar isin jamming | Sweep cercevelerinde yapay SNR, PDP'de ek yol, AoA tutarsizligi, SSB RF parmak izi | SecBeam (arXiv:2307.00178) [S]; Natanzi 2025 (arXiv:2508.02856) [S]; Dinh-Van TIFS 2023 [O]; Geranmayeh 2026 (arXiv:2610.16770) [A]; Priyadarshani OJ-COMS 2025 [O] | Sionna RT / 38.901 kanal; ozel isin simulatoru; mmWave donanimi (SecBeam 28 GHz) | orta |
| 4 | Massive MIMO / cell-free pilot kirliligi/spoofing/jamming | Pilot dizisini taklit/bozma ile kanal tahmini bozma | Pilotta ek guc/tekrar dizisi; uzamsal kovaryansta ek yon; tahmin hatasi | Choudhury TWC 2024 [O]; Du TWC 2025 [O]; Marti TSP 2025 [O]; Xu TIFS 2024 [O]; Li IEEE Syst. J. 2022 [O] | Sionna PHY MIMO/OFDM + 38.901; koheren cok kanalli SDR | cok |
| 5 | NTN / LEO uydu | Uydu-IoT linki jamming, spoofing; yer terminali hedefleme | Gurultu tabani artisi, SNR yuksek kalirken kodlu mesaj korunur; Doppler'li ton | Huso 2026 (arXiv:2611.08118) [A]; Gecgel 2021 (arXiv:2107.06181) [A]; Sitouah 2022 (arXiv:2301.03998) [A]; Wigchert 2025 [O] | Sionna kanal + ozel Doppler; gr-iridiumtx (arXiv:2603.12062 [S]); gercek uydu kaydi SDR | seyrek |
| 6 | O-RAN / AI-yerel RAN | xApp ile KPI/I-Q tabanli tespit; xApp/rApp'e adversarial saldiri | BLER/MCS/SINR serileri; I/Q spektrogramlar; dedektor girdisinde pertürbasyon | Hoffmann 2026 (arXiv:2609.18499) [A]; SAJD (arXiv:2511.17519) [A]; Gopal 2026 (arXiv:2610.20816, 2611.04369) [A]; Chiejina WiSec 2024 (arXiv:2402.06846) [A]; Gajjar 2025 (arXiv:2510.18160) [A]; InterfO-RAN (arXiv:2507.23177) [A]; LibIQ (arXiv:2505.10537) [A] | OAI/srsRAN + USRP; Colosseum; Sionna Research Kit (OAI tabanli) | orta |
| 7 | OTFS / ODDM / AFDM | Gecikme-Doppler/chirp dalga bicimlerine jamming | DD gridinde enerji yayilimi; AFDM'de chirp uyumlu jammer | Li Electronics 2025 [O]; Kumar WCNC 2024 [O]; Deng WCL 2023 [O]; Kulhandjian 2026 (arXiv:2606.09753) [O]; Chen OJ-COMS 2026 (AFDM) [O]. ODDM-jamming bu aramada bulunamadi | whatshow_phy_mod_otfs (PyPI, GPL-3.0); JRW-Lab simulator (MATLAB; OTFS/ODDM); Sionna'da OTFS yok; GNU Radio'da OTFS modulu bulunamadi | seyrek |
| 8 | NR kontrol kanallari (SSB/PBCH/PRACH/PDCCH) | Dusuk-guclu protokol-farkinda jamming | SSB periyodunda hizali dar bant/darbe; PRACH firsatinda preamble; BLER/RACH basarisizligi | Flores IEEE Access 2023 [O]; Stegmann GC Wkshps 2024 [O]; Azariah 2026 (arXiv:2602.06634) [A]; Kazemian 2024 (arXiv:2408.03028) [A]; Varotto 2024 (arXiv:2405.09564, 2405.10331, 2405.09565) [A]; Kuili 2025 (arXiv:2506.15075) [A] | MATLAB 5G Toolbox (SSB/PRACH uretimi); Sionna NR yalniz PUSCH; OAI/srsRAN + USRP | orta |
| 9 | URLLC darbeli/periyodik jamming | Kisa darbe/duty cycle ile HARQ ve gecikme bozma | Dusuk duty cycle, periyodik, BLER ani artis | Hoffmann 2026 [A]; Bogucka 2025 (arXiv:2503.10255) [A]; Kryszkiewicz VTC 2023 [O]; Silva Signals 2025 [O] | GNU Radio (kesintili jammer); Sionna PUSCH+BLER; OAI/srsRAN | orta |
| 10 | Semantik iletisim | Semantik jamming, pilot spoofing, adversarial pertürbasyon | Gorev-optimize kucuk pertürbasyon; bazi alt tasiyicilarda yogunlasma | ROME (arXiv:2501.01172) [A]; SecDiff (arXiv:2511.01466) [A]; SemAdv (arXiv:2305.07220) [A]; Zhang 2026 (arXiv:2603.24082) [A] | PyTorch DeepJSCC + Sionna OFDM | orta (savunma/saldiri var; jamming TESPIT/siniflandirma seyrek) |
| 11 | AI/uyarlanabilir (GAN/RL) jammer | Kurbani ogrenen veya dedektordan kacan jammer; zero-day | Zamanla degisen guc/duty; stealth profili | Aissou 2026 (arXiv:2609.21334) [A]; Erpek 2018 (arXiv:1807.02567) [S]; Adesina COMST 2022 [O] | Python RL/GAN + GNU Radio/Sionna | orta |
| 12 | UAV / suru | UAV linkine jamming, gizli jamming tespiti (HMM, transformer, oyun kurami) | Mobilite Doppler'i + darbe; SINR/RSSI serileri | Zhang TCCN 2023 [A, udspace kaydi]; Viana 2024 (arXiv:2412.15312) [A]; Ba 2026 (arXiv:2611.07977) [A]; Hu IoT-J 2023 [O]; Li IoT-J 2024 [O] | Sionna + UAV kanal (dogrulanmadi); USRP | orta |
| 13 | Backscatter / ambient IoT | Zayif yansima sinyalinin jamming'e duyarliligi | Kucuk guc artisiyla SNR cokusu | Le Hoang Hiep & Ngo, VNU JCSCE 2026 (tespit+DRL) [A, dergi sayfasi]; Le Hoang Hiep & Ngo Huu Huy 2026 (RIS+DRL) [O]; Feng Sensors 2022 [O]. Fiziksel katman I/Q tabanli tespit/siniflandirma bu aramalarda bulunamadi | Ozel kanal modeli | seyrek |

### A.1 Basliklara gore notlar (6G ozgulugu ve dedektorun gorecegi)

**ISAC.** Sensing yolu dalga bicimi bilindigi icin acik hedeftir. Yildirim ve ark. (arXiv:2501.06798, 12 Ocak 2025) ucuz SDR'lerin DRFM olmadan aldatici jammer gibi davranip aralik-Doppler haritasini bozabildigini modelleme+deneyle gosterir (ozet sayfasi okundu). Tespitte VAE ile gozetimsiz (jammer'siz yankilarla egitilmis) yaklasim var (Arcangeloni, arXiv:2410.01632, ozet: sayisal sonuc vermiyor; "%93 @ 27 dB" iddiasi yalnizca ucuncu taraf ozet sayfasindan, dogrulanmadi). Sionna v2.2.0'da `sionna.phy.isac` modulu (angular_delay_doppler_spectrum, steering_vectors, plot fonksiyonlari, ofdm_to_delay_doppler_channel, time_to_doppler_channel) ve RT'de RCS modulu gozlendi (v2.2.0 surum notu, 29 Eylul; yil surum sayfasinda yazmiyor).

**RIS.** De Sena ve ark. (arXiv:2401.07149; IEEE WCL 13(4), 2024; arama ozeti): saldirgan RIS pilot fazinda sessiz, veri fazinda faz degistirir, ek guc gerektirmez; bu, enerji-tabanli dedektorler icin goruntusuz bir sinif olusturur. Mackensen ve ark. NDSS 2025 uzamsal-alan jamming (OpenAlex). Tespit odakli: Chong ve ark. ICC Workshops 2026 "RIS-enabled jamming anomaly detection" icin sentetik veri seti (yalniz OpenAlex kaydi; icerigi okunmadi, bu, K1 icin kritik yakin calisma olabilir) ve Chou ve ark. (arXiv:2611.01881) ISAC'ta RIS spoofing'in imza-duzeyi tespiti (ICC 2027'ye gonderilmis; tahmini ~0,11 milyon FLOP, 32 elemanli RIS icin %99,335). Sionna RT'de RIS: sionna-rt v1.0.0 notu "Diffraction and RIS will be added in future releases ... use latest 0.19"; Sionna RT Technical Report v3 ozet sayfasinda RIS bahsi yok; v2.2.0 RT dokumaninda RIS bahsi bulunamadi.

**THz/mmWave.** Beam-stealing: SecBeam (amplify-and-relay; PDP analizi + guc rastgelelestirme; 28 GHz testbed) [S]; ISAC+RL ile savunma (arXiv:2508.02856) [S]; RF parmak izi (Kousal, Radioengineering 2026 [O]). THz: Shrestha ve ark., Nat. Commun. 2022 "Jamming a terahertz wireless link" (dar isin jammer'in nisan almasini gerektirir; yan lob 'beat jamming'; PMC9160013) [S]. THz'e ozel jamming TESPIT calismasi bu aramalarda bulunamadi.

**Massive MIMO / cell-free.** En cok calisilan baslik: DL ile asenkron pilot spoofing tespiti/tanimlama (Choudhury TWC 2024 [O]), beamspace jamming tespiti (Du TWC 2025 [O]), cell-free uzamsal seyreklik tabanli tespit (Li 2022 [O]).

**NTN.** Huso ve ark. (arXiv:2611.08118, 5 Kasim 2026): Iridium icin 47 jamming kosulunda acik veri seti; tek-sinif otoenkoder AUC >= 0,84 (gurultu tabani >= 9 dB artinca); C/N0 ve SNR kestiricileri basarisiz (ozet sayfasi okundu).

**O-RAN.** Tespit iki ailedir: KPI tabanli (SAJD, JD-xApp, SEM) ve I/Q tabanli dApp (InterfO-RAN: <650 us, >%91; LibIQ ~%97,8 sinyal tipi dogrulugu). Saldiri ailesi: xApp'e adversarial (Chiejina: dogruluk dusumu %100'e kadar; distilasyon ile %98,3) ve kara-kutu kacinma (Gajjar). Gecikme sayilari yalnizca InterfO-RAN ozetinde acik; diger xApp'lerde ozetlerde gecikme verilmiyor.

**OTFS/ODDM/AFDM.** Bulunanlar anti-jamming tasarimi veya AWGN'de tespit+bastirma (Li 2025 [O]); jammer SINIFLANDIRMA veya acik-kume bu aramalarda bulunamadi. OTFS siniflandirma literaturu modulasyon tanima duzeyinde (MDPI Sensors 25(14) 4393 [S]).

**NR kontrol kanallari.** SSB/PBCH: Kazemian IEEE Commun. Lett. 2024 (PBCH saldirili sinyalin yonu) [O]; DT-DDNN (arXiv:2403.02645, IEEE TVT 2025) [S/O]; Varotto serisi (srsRAN+USRP N300, SSB dar bant) [A]. PRACH: Azariah 2026 (OAI UE uzerinde Msg1 jammer; analitik model; tespit yok) [A], Stegmann 2024 [O]. PUSCH reaktif jamming ve HARQ anomali tespiti ile ilgili 2026 bir arXiv makalesi arama ozetinde gorundu (arXiv:2605.30622 olarak listelenmis), kunye dogrulanmadi.

**URLLC.** Birincil kaynak: Hoffmann ve ark. (arXiv:2609.18499): BLER hareketli ortalamasi ile JD-xApp, MCS tavani, yaklasik %67,3 yeniden iletim azalmasi; OCUDU acik kaynak CU/DU'ya tasindi; POWDER'da OTA dogrulama. "Kisa jamming kalici gecikme sisirmesi yapar" ifadesi yalnizca arama ozetinden (kaynak makale dogrulanmadi).

**Semantik.** Savunma/saldiri yonleri karisik: ROME (Zhou ve ark.: saldiri varligini ve gucunu tespit eder), SecDiff (Zhao ve ark.: pilot spoofing + alt tasiyici jamming'e difuzyon tabanli savunma), SemAdv (Nan ve ark., arXiv notu: IEEE JSAC kabul), "Unanticipated Adversarial Robustness" (arXiv:2603.24082, ozet sayfasi: DeepJSCC'nin klasik sisteme gore yaklasik 14-16 kat daha fazla saldiri gucu gerektirdigi raporlaniyor). Ayrica savunma amacli jamming (Chen & Yang, arXiv:2510.26610) farkli bir problemdir.

**AI jammer.** Erpek ve ark. 2018 GAN ile jammer veri artirma; Aissou ve ark. (arXiv:2609.21334, GLOBECOM 2026) RL jammer + GAT + Dirichlet process (DP)-means ile zero-day kesfi; sinif sayisi ve veri seti ozet sayfasinda yok.

**UAV/Backscatter.** UAV'da HMM tabanli gizli jamming tespiti (Zhang TCCN 2023), RSSI/SINR uzerinde transformer (Viana, arXiv:2412.15312), Bayes oyun yaklasimi (Ba, arXiv:2611.07977, GLOBECOM 2026). Backscatter/ambient IoT'de tespit+DRL anti-jamming tek bir dergi makalesinde (VNU JCSCE 2026); I/Q-duzeyi tespit/siniflandirma bu aramalarda bulunamadi.

### A.2 Simulasyon araclari (dogrulanan ve dogrulanamayan)

| Arac | Dogrulanan | Dogrulanamayan / eksik |
|---|---|---|
| Sionna (NVlabs) | Ana sayfa v2.2.0; RT, PHY, SYS; PHY ve SYS PyTorch'a tasindi (v2.0.0, 19 Mart; yil sayfada yok); PHY: 3GPP 38.901 (V19.2 varsayilan, v2.1.0), OFDM, MIMO, FEC (LDPC/polar), 5G NR bolumu (Carrier, Layer Mapping, PUSCH, Transport Block, Utils), ISAC bolumu; RT: RCS modulu (v2.2.0), difraksiyon (radio map), Mitsuba 3.9.1/Dr.Jit 1.5.0 (v2.1.0); "5G NR PUSCH Tutorial"; Sionna Research Kit (OAI tabanli) | SSB/PRACH/PDCCH ureten NR modulu dokuman agacinda yok; OTFS modulu yok; jamming modulu yok; RIS: yalnizca 0.19.x (sionna-rt v1.0.0 notu) |
| GNU Radio | gr-ieee802-11 (Wi-Fi OFDM, maint-3.10), gr-ieee80211 (JiaoXianjun; a/g/n/ac; GR 3.10), gr-gfdm, gr-lte (kit-cel), gr-ofdmradar (FOSDEM 2022 sunumu) | NR (gr-nr) modulu ve OTFS modulu bu aramalarda bulunamadi; NR icin MATLAB 5G Toolbox + GRC kombinasyonu bir arastirma testbed'i olarak anilmis (konferans makalesi [S]) |
| MATLAB 5G Toolbox | nrWaveformGenerator, nrDLCarrierConfig (SSBurst alani), PRACH dalga bicimi ornegi (nrPRACHConfig, hNRPRACHWaveformGenerator), uygulama ile RF bozulma ekleme | Hazir jammer/girisim enjeksiyon is akisi dokumanlarda bulunamadi |
| OTFS kutuphaneleri | whatshow_phy_mod_otfs (PyPI; GPL-3.0; Python ve MATLAB; OTFS ve OTFSResGrid siniflari); JRW-Lab Common Wireless Simulator (MATLAB; OFDM/OTFS/ODDM) | Yaygin benimsenmis ayri bir Python OTFS kutuphanesi bu aramada bulunamadi |
| OTFS+SDR | Yap ve ark. arXiv:2309.12861 (Sionna/TF + USRP + GPU, GLOBECOM 2023 [S]); arXiv:2606.30565 (GPU ile USRP B210 uzerinde 2 MHz taban bant, [S]) | GNU Radio tabanli OTFS gerceklemesi bulunamadi |
| Acik kaynak RAN | OAI (NR SA: USRP B210/X300), srsRAN (tum USRP'ler) [S: arXiv:2406.01485 karsilastirma] | |


---

## B. Yenilik (novelty) taramasi: K1-K7

Genel uyari: Asagidaki "bulunamadi" ifadeleri yalnizca listelenen sorgularin ve bakilan kaynaklarin (arXiv ozet sayfalari, OpenAlex, WebSearch) sonucudur; sistematik bir tarama degildir. arXiv'in kendi arama sayfasi cok terimli sorgularda tutarsiz sonuc verdi (bazi sorgular sifir sonuc dondurdu); OpenAlex'in gunluk ucretsiz kotasi taramanin ortasinda doldu.

### K1. 6G'ye ozgu saldiri siniflari (RIS, ISAC, OTFS/ODDM, THz isin, NTN) iceren I/Q jamming veri seti + acik-kume tespit

**Denenen sorgular:**
1. WebSearch: "6G jamming dataset RIS ISAC OTFS I/Q jamming attack classes open-set detection"
2. WebSearch: "dataset for jamming detection in 6G networks Sionna generated"
3. WebSearch: "multi-class jamming benchmark dataset 6G THz NTN RIS ISAC jamming types open-world"
4. WebSearch: "jamming dataset 5G NR physical layer I/Q samples public dataset jammer types"
5. OpenAlex: "RIS jammer detection machine learning", "reconfigurable intelligent surface jamming detection", "jamming detection integrated sensing and communication"
6. arXiv arama sayfasi: "jamming dataset I/Q"; "jamming open-set"
7. WebSearch: "OTFS jamming recognition classification deep learning delay-Doppler jamming signal identification"

**En yakin calismalar:**
- Schosser, Salehi, Ma, Schulz, Fettweis, "Spectrum Anomaly Detection in OFDMA Systems: Simulation Framework and Benchmark Dataset", arXiv:2606.02102 (v1: 1 Haz 2026; v2: 9 Kas 2026; IEEE OJ-COMS'a gonderilmis) [A]. Spektrogram tabanli, 5 jammer turu ("basit gurultuden pilot-farkinda saldiriya"; ozet sayfasi yalniz ikisini adlandirir), acik kaynak simulasyon cercevesi, fabrika ortami; OFDMA; RIS/OTFS/NTN yok.
- Chong, Gautam, Bouazizi ve ark., "A Synthetic Dataset for Anomaly Detection of RIS-Enabled Jamming Attacks", IEEE ICC Workshops 2026, DOI 10.1109/ICCWorkshops63917.2026.11586537 [O, icerik okunmadi]: K1'in RIS ayagina dogrudan yakin; I/Q olup olmadigi, sinif sayisi, acik-kume bilinmiyor.
- Wielenberg ve ark., "The S-ICDF Dataset: Sionna-Simulated Dynamic Interference Characterization and Direction Finding", arXiv:2607.03411 (3 Tem 2026; IEEE IPIN 2026) [A]: Sionna ile 102 girisim konfigurasyonu; yon bulma odakli.
- Huso, Fliescher, Sciancalepore, Oligeri, arXiv:2611.08118 (5 Kas 2026) [A]: gercek Iridium mesajlari, 47 jamming kosulu, acik veri seti, tek-sinif otoenkoder.
- Alhazbi ve ark., "A Dataset of physical-layer measurements in indoor wireless jamming scenarios" (Data in Brief 2023; Zenodo; sessiz/ton/Gauss jamming, BPSK, USRP X310) [S]; Varotto'nun IEEE DataPort 5G dar bant jammer veri seti [S].
- Hanegraaf, Sciancalepore, Oligeri, arXiv:2505.19633 (802.11, genel veri seti) [A]; Herzalla ve ark., WiFiSpectralJam, arXiv:2608.15728 (16 Agu 2026; ~522 milyon spektral gozlem; HackRF jamming) [A].

**Bosluk (bu aramalarda bulunamadi):** RIS + ISAC sensing + OTFS/ODDM + THz isin + NTN siniflarini birlikte iceren, ham I/Q duzeyinde ve acik-kume protokoluyle (sinif disarida birakma) yayimlanmis veri seti. Ancak iki 2026 veri seti makalesi (Schosser; Chong) alana yaklasiyor; yarisma riski var.

**Katki cumlesi onerisi:** "6G-ozgu fiziksel katman saldirilarini (RIS kaynakli kanal-tabanli girisim, ISAC sahte hedef, OTFS-hizali, isin-egitimi darbesi, Doppler'li uydu ton jammer) iceren acik I/Q veri seti ve sinif-disarida-birakma (leave-one-attack-out) acik-kume kiyaslama protokolu."

**Uygulama zorlugu:** Yuksek (RIS: Sionna RT'de yalniz 0.19.x veya kendi kaskad kanal kodu; OTFS: whatshow_phy_mod_otfs ya da JRW-Lab; THz/NTN soyut kanal; toy 32 kHz'ten gercekci dalga bicimine gecis gerekir). Donanim zorunlu degil, ama sim-to-real (K5) olmadan 6G iddiasi zayif kalir.
**Tahmini yenilik:** Orta-yuksek (tam birlesim bulunamadi; parcalar ve yakin yarisanlar var).
**Riskler:** Chong ve Schosser'in kapsami (okunmadi); "6G" etiketinin yalnizca kanal modeli etiketi olmasi; hakem "saldirilar zaten ayri makalelerde" diyebilir.

### K2. Acik-kume/bilinmeyen jammer tespiti + AI-uretimi (GAN/RL) uyarlanabilir jammer'lar

**Denenen sorgular:**
1. WebSearch: "zero-day jamming detection unseen jammer novelty detection wireless"
2. WebSearch: "open-set jamming recognition unknown jamming type deep learning"
3. WebSearch: "open set recognition wireless jamming classification unknown jammer rejection arXiv"
4. WebSearch: "GAN-based jammer reinforcement learning smart jammer detection wireless arXiv 2024"
5. WebSearch: "generative adversarial network generate jamming signals evade jamming detector adversarial jammer"
6. arXiv arama sayfasi: "jamming open-set"; "\"open-set\" jammer" (sifir sonuc); "\"jamming\" \"out-of-distribution\""

**En yakin calismalar:**
- Aissou, Chou, Kim, "Co-Evolving Zero-Day Jamming: Adaptive Attack Synthesis and Graph Attention-Based Online Detection", arXiv:2609.21334 (18 Eyl 2026; IEEE GLOBECOM 2026) [A]: RL jammer (alicinin dedektor durumunu hipotez testiyle cikarir) + GAT + DP-means; bilinen siniflari siniflandirma ve zero-day kesfi; ozet sayfasinda sinif sayisi/veri/dalga bicimi yok.
- Bouferroum, Alla, Loscri, Benslimane, Lenders, "CITADEL: CSI-Based Jamming Detection and Open-Set Classification for IIoT Networks", arXiv:2606.22939 (22 Haz 2026) [A]: yalniz CSI; iki asamali; 6 bilinen + 15 zero-day saldiri; bilinen %100, zero-day %97,1 (%0,4 FPR); gradyan tabanli kacinmaya karsi dayaniklilik. Projeye mimari olarak (iki asamali, acik-kume) cok yakin; girdi CSI, I/Q degil; IIoT.
- Varotto ve ark., "One-Class Classification as GLRT for Jamming Detection in Private 5G Networks", arXiv:2405.09565 (7 Mayis 2024) [A]: yapay jamming ile egitim, gercek 5G ozel agda test.
- Radar alani: Zhou, Shang, Song, Zhang, You, Zhang, "Intelligent Radar Jamming Recognition in Open Set Environment Based on Deep Learning Networks", Remote Sensing 14(24):6220, 2022, DOI 10.3390/rs14246220 [S]; Zhong, Cui, Ji, jamming pattern open set recognition (PLOS ONE 2025) [S].
- Erpek, Sagduyu, Shi, "Deep Learning for Launching and Mitigating Wireless Jamming Attacks", arXiv:1807.02567 (2018) [S]: GAN ile jammer veri artirma; dedektor kacisi degil.

**Bosluk:** I/Q duzeyinde, standart dalga bicimlerinde, acik-kume tespiti ile GAN/RL uretimli uyarlanabilir jammer'i birlestiren 'leave-one-attack-out' degerlendirmesi bu aramalarda bulunamadi. Ancak 2026'da iki yakin calisma (CITADEL, Aissou) var; bosluk daralmis.

**Katki cumlesi onerisi:** "Savunucunun dedektorunu gozlemleyip stealth/etki dengesini ogrenen RL ve GAN uretimli jammer'lara karsi, ham I/Q pencerelerinden iki asamali (anomali + tur) acik-kume tespit; sabit jammer'larda egitilip uyarlanabilir jammer'larda sinama."

**Uygulama zorlugu:** Orta (RL/GAN ortami Python'da; mevcut GNU Radio/Python hattina eklenir; donanim gerekmez).
**Tahmini yenilik:** Orta (CITADEL ve Aissou yakin; ayristirici: I/Q + standart dalga bicimi + RL/GAN jammer ile iki asamali acik-kume).
**Riskler:** Aissou'nun tam metni okunmadi; RL jammer gercekciligi; 10 el yapimi oznitelikle IF/RF adaptif jammer'a karsi zayif kalabilir.

### K3. Cok antenli (MIMO) / uzamsal oznitelikli jamming tespiti ve siniflandirmasi (ISAC/6G)

**Denenen sorgular:**
1. OpenAlex: "jamming detection integrated sensing and communication"
2. OpenAlex: "jamming classification MIMO-OFDM ISAC deep learning"
3. WebSearch: "jamming detection multi-antenna spatial features angle of arrival covariance machine learning classification jammer type"
4. WebSearch: "MIMO jamming type classification multi-antenna deep learning spatial signature jammer classification massive MIMO 6G"
5. WebSearch: "jamming attack ISAC sensing performance radar OFDM jammer detection estimation CRB 6G security survey"
6. OpenAlex: "jamming pilot massive MIMO uplink"

**En yakin calismalar:** Arcangeloni, Testi, Giorgetti, arXiv:2410.01632 [A] (MIMO-OFDM ISAC radar, gozetimsiz VAE tespit; tur siniflandirma yok); Du, Zhang, Jing, IEEE TWC 2025 [O] ve "Joint Detection and Angle Estimation for Multiple Jammers in Beamspace Massive MIMO" arXiv:2501.05160 [S] (istatistiksel tespit/aci tahmini); Marti, Arquint, Studer, IEEE TSP 2025 [O]; Yildirim ve ark. arXiv:2501.06798 [A]; "Joint Space-Time Sparsity Based Jamming Detection for Mission-Critical mMTC Networks" arXiv:2301.01058 [S].

**Bosluk:** Uzamsal oznitelikler (kovaryans oz yapisi, AoA yayilimi) ile jammer TURU siniflandirma + acik-kume, ISAC/MIMO'da; arama ozeti "tespit, aci tahmini ve tur siniflandirma ayri problemler" diyor. Bu aramalarda bulunamadi.

**Katki cumlesi onerisi:** "Cok antenli I/Q'dan turetilen uzamsal oznitelikler (kovaryans ozdegerleri, etkin kovaryans sirasi, AoA yayilimi) ile jammer turu ve bilinmeyen tur tespiti; tek anten zamansal/spektral ozniteliklere gore kazanim analizi."

**Uygulama zorlugu:** Orta (Sionna PHY MIMO-OFDM + 38.901 ile sentetik; gercek dogrulama koheren cok kanalli SDR gerektirir).
**Tahmini yenilik:** Orta-yuksek.
**Riskler:** Mevcut proje tek-antenli toy veridir; MIMO'ya gecis kapsami degistirir; uzamsal imza saldirgan konumuna bagimli (genelleme).

### K4. Gercek 5G NR / 6G aday dalga bicimi (OFDM, OTFS) uzerinde jammer siniflandirma ve acik-kume

**Denenen sorgular:**
1. WebSearch: "jamming classification OFDM waveform 5G NR signals deep learning sweep tone pulse barrage jammer classification accuracy"
2. WebSearch: "jamming detection 5G NR deep learning SSB spectrogram classification jamming types barrage sweep pulse tone dataset gNB"
3. WebSearch: "OTFS jamming recognition classification deep learning delay-Doppler jamming signal identification"
4. OpenAlex: "OTFS jamming", "OTFS anti-jamming delay-Doppler", "ODDM jamming", "AFDM jamming"
5. OpenAlex: "5G NR smart jamming synchronization signal PBCH", "5G NR jamming PDCCH PUCCH PRACH targeted"

**En yakin calismalar:** Varotto ve ark. arXiv:2405.09564, 2405.10331 [A] (ikili tespit; SSB; srsRAN + USRP N300); DT-DDNN arXiv:2403.02645 (IEEE TVT 2025, DOI 10.1109/TVT.2025.3601032 [O]); Kuili ve ark. arXiv:2506.15075 [A]; Schosser arXiv:2606.02102 [A]; bir Tampere yuksek lisans tezi (Romppanen; 5G fiziksel katmanda jamming/girisim siniflandirma; yalniz arama ozeti [S]); OFDM UAV'da barrage/tek ton/ardisik darbe/protokol-farkinda siniflandirma (Price ve ark., DR %93; yalniz arama ozeti [S]); Wi-Fi OFDM'de scalogram ile %98 siniflandirma (Zhang & Krunz; ozet [S]); OTFS: Li ve ark. Electronics 2025 [O] (AWGN'de tespit+bastirma), Kumar & Majhi WCNC 2024 [O], Deng ve ark. WCL 2023 [O].

**Bosluk:** OTFS/ODDM/AFDM uzerinde jammer TURU siniflandirma ve acik-kume bu aramalarda bulunamadi (OTFS icin yalniz modulasyon tanima ve anti-jamming tasarimi bulundu). NR standart dalga bicimi uzerinde cok-sinifli + acik-kume: kismi (Tampere tezi cok-sinifli; acik-kume degil; yalniz ozet).

**Katki cumlesi onerisi:** "Ayni jammer ailesinin (tone, sweep, pulse, barrage + hedefli) NR-uyumlu OFDM ve OTFS dalga bicimlerinde biraktigi imzalarin karsilastirmali siniflandirma/acik-kume analizi; OTFS'de gecikme-Doppler tabanli oznitelikler."

**Uygulama zorlugu:** Orta (OTFS: whatshow_phy_mod_otfs veya JRW-Lab; NR: MATLAB nrWaveformGenerator; GNU Radio'da NR/OTFS modulu bulunamadi, dosya uretip GNU Radio'ya yukleme yolu).
**Tahmini yenilik:** Orta (OTFS kismi orta-yuksek; NR kismi dusuk-orta).
**Riskler:** OTFS kutuphanesi kalitesi/lisansi (GPL-3.0); dalga bicimi degisince toy veriyle sonuclarin kiyaslanamamasi; standart uyumu/gercekcilik talebi.

### K5. Sim-to-real: GNU Radio/Sionna ile uretilen jamming verisiyle egitip SDR/USRP olcumuyle test eden acik-kume calismasi

**Denenen sorgular:**
1. WebSearch: "sim-to-real jamming detection trained on simulated data tested USRP software defined radio measurements domain gap"
2. WebSearch: "domain adaptation transfer learning jamming detection synthetic to real I/Q signals SDR"
3. WebSearch: "jamming classifier trained on simulation validated over-the-air USRP hardware generalization open-set"
4. WebSearch: "dataset for jamming detection in 6G networks Sionna generated"

**En yakin calismalar:** Bouferroum, Alla, Lenders, Loscri, "CSI Simulation: Why Additive Noise Fails and How to Fix It", arXiv:2607.01882 (2 Tem 2026; MSWiM 2026) [A]: 6 ticari alici/2 ortam; AGC nedeniyle toplamsal gurultu simulasyonu basarisiz; kalibre model (M_QTC) ile siniflandiricilar gercek veri basariminin %93'une ulasir; AWGN ile egitilenler rastgele seviyede; girdi CSI. Varotto ve ark. arXiv:2405.09565 [A] (yapay jamming ile egitim + gercek 5G ozel ag testi). JamShield arXiv:2507.11483 [A] (USRP X310 ile OTA veri; simulasyon degil). Hanegraaf ve ark. arXiv:2505.19633 [A] (gercek veri kampanyasi). Sim-OTA uyarlama: "Signal Classification Recovery Across Domains Using Unsupervised Domain Adaptation" arXiv:2510.00589 [S] (modulasyon siniflandirma).

**Bosluk:** GNU Radio veya Sionna ile uretilen jamming I/Q verisiyle egitilip USRP/SDR olcumleri uzerinde ACIK-KUME degerlendirmesi yapan bir calisma bu aramalarda bulunamadi. Varotto (yapay->gercek) ve Bouferroum (kalibre simulasyon) iki yakin on-calisma.

**Katki cumlesi onerisi:** "Yalniz simulasyonla egitilmis iki asamali (anomali + tur) jamming dedektorunun, kalibre edilmis donanim modeli (kazanc/AGC, faz gurultusu, ADC niceleme) ve USRP olcumleriyle sinandigi, bilinmeyen saldiri turlerinin donanimda da test edildigi sim-to-real calismasi."

**Uygulama zorlugu:** Orta-yuksek (en az bir verici + bir alici SDR; olcum duzeni ve kalibrasyon gerekir; proje zaten GNU Radio'da).
**Tahmini yenilik:** Orta-yuksek.
**Riskler:** Donanim erisimi ve RF duzeni (yasal bant, kablolu baglanti); simulasyondan gercege buyuk dusus; Bouferroum yaklasimiyla karsilastirma beklentisi.

### K6. RAN-ici gercek zamanli, hafif (edge/xApp) jamming tespiti ve bilinmeyen saldiri yakalama; gecikme/hesap karmasikligi analizi

**Denenen sorgular:**
1. WebSearch: "lightweight jamming detection xApp inference latency near-RT RIC 10 ms 1 s real-time I/Q jamming classification O-RAN"
2. WebSearch: "dApp real-time jamming detection O-RAN I/Q spectrum sensing CNN dApps OpenAirInterface"
3. WebSearch: "TinyML lightweight jamming detection edge device inference latency FLOPs wireless jamming classification"
4. WebSearch: "open-set unknown attack detection O-RAN 5G jamming unseen jammer type evaluation leave-one-class-out"
5. OpenAlex: "O-RAN xApp jamming detection", "O-RAN near-RT RIC security attack xApp", "jamming detection O-RAN spectrum sensing dApp"
6. WebSearch: "An O-RAN-Native xApp Framework for Jammer Detection and Geolocation Sensors 2026" (tam baslik arama sonuclarinda dogrulanamadi)

**En yakin calismalar:**
- Santhi, Villa, Polese, Melodia, "InterfO-RAN", arXiv:2507.23177 [A]: I/Q CNN, GPU dApp, <650 us, >%91.
- Olimpieri ve ark., "LibIQ", arXiv:2505.10537 (MedComNet 2025) [A]: I/Q dApp, ~%97,8; ozette gecikme yok.
- Rahman ve ark., SAJD arXiv:2511.17519 [A]; Hoffmann ve ark. JD-xApp arXiv:2609.18499 [A]; Gopal, Cintron, Rouil arXiv:2610.20816 ve 2611.04369 [A] (KPI tabanli; dagilim kaymasinda ogrenme tabanli modeller recall kaybeder; istatistiksel ensemble); Bogucka ve ark. arXiv:2503.10255 [A].
- Halenka ve ark., "Explainable and Hardware-Efficient Jamming Detection for 5G Networks Using the Convolutional Tsetlin Machine", arXiv:2603.07336 (7 Mart 2026) [A]: SSB, FPGA taslagi (olculmemis kaynak projeksiyonu); CTM %91,53 vs CNN %96,83; 45 MB vs 624 MB.
- Panitsas, Ofeidis, Tassiulas, "FedJam", arXiv:2508.09369 [A]; Le, Tran, Le, TinyML spacecraft, arXiv:2606.05779 [A] (lojistik regresyon mikrosaniye duzeyi cikarim).
- Ratti ve ark., "An O-RAN-Native xApp Framework for Jammer Detection and Geolocation", Sensors 2026, DOI 10.3390/s26216859 [O]; Kurma ve ark., "An Ensemble Machine Learning-Enabled xApp for Multi-Class Jamming Detection in O-RAN", IEEE VTC2026-Fall [O] (ikisinin icerigi okunmadi; K6'ya cok yakin olabilir).
- CITADEL (arXiv:2606.22939 [A]): kenar GPU'da 14,2 ms / 95,9 mJ.

**Bosluk:** Cok-sinifli + acik-kume + olculmus gecikme/FLOP/bellek analizini birlikte veren I/Q tabanli hafif dedektor bu aramalarda bulunamadi. KPI tabanli xApp'ler kalabalik; ozetlerde gecikme nadiren verilmis. Ratti 2026 ve Kurma 2026 okunmadi; K6 icin en riskli on-calismalardir.

**Katki cumlesi onerisi:** "10 el yapimi oznitelik + Isolation Forest/Random Forest hattinin near-RT RIC (10 ms-1 s) ve dApp (<1 ms) zaman butcelerine gore hesap/gecikme/bellek profili; ayni modelle bilinmeyen saldiri yakalama ve CNN/CTM ile Pareto karsilastirmasi."

**Uygulama zorlugu:** Dusuk-orta (cevrimdisi gecikme/FLOP/bellek olcumu kolay; gercek xApp entegrasyonu yuksek zorluk).
**Tahmini yenilik:** Dusuk-orta (alan kalabalik; ayristirici yalniz acik-kume + el yapimi oznitelik maliyet analizi).
**Riskler:** Yalniz masaustu CPU olcumuyle "xApp" iddiasi zayif; Ratti/Kurma ile cakisma.

### K7. Markov/zamanla degisen jammer davranisini dikkate alan sirali (sequential) tespit + siniflandirma

**Denenen sorgular:**
1. WebSearch: "sequential jamming detection Markov jammer hidden Markov model CUSUM quickest detection jammer classification"
2. WebSearch: "Markov-modulated jammer time-varying jamming detection LSTM sequence of windows jammer state tracking"
3. WebSearch: "jammer behavior prediction dynamic jammer switching modes detection classification temporal dependency deep learning wireless"
4. WebSearch: "change-point detection jamming onset I/Q windows sequential classification jammer type recognition recurrent HMM filter 5G"
5. WebSearch: "UAV swarm jamming detection deep learning spectrum 6G low-altitude arXiv" (dolayli: Markov jammer'a karsi RL, arXiv:2601.06095 [S])

**En yakin calismalar:** Pourranjbar, Kaddoum, Saad, "Jamming Pattern Recognition over Multi-Channel Networks: A Deep Learning Approach", arXiv:2112.11222 (19 Ara 2021) [A] (RNN; jammer politikasi degisimi; dogruluk >%70 @ her 5 yuvada degisim, ~%90 @ 45) ve devami arXiv:2208.09518 [A]; Zhang ve ark. TCCN 2023 [A] (HMM tabanli gizli jamming tespiti, UAV); CUSUM tabanli birlesik jammer tespit ve konumlama [S]; Viana ve ark. arXiv:2412.15312 [A] (zaman serisi transformer); Gopal ve ark. arXiv:2610.20816 [A] (ani degisim tespiti bileseni) ve 2611.04369 [A] ("temporal interval coherence" metrigi); Markov zinciri hipotez testiyle reaktif jammer tespiti, arXiv:1809.04263 [S].

**Bosluk:** Pencere-duzeyi I/Q ozniteliklerinden, jammer tur-gecis davranisini (Markov) modelleyip CUSUM/HMM ile hizli tespit + tur siniflandirma + tespit gecikmesi analizini birlikte yapan calisma bu aramalarda bulunamadi (arama ozeti de parcalarin ayri oldugunu belirtti). Pourranjbar ailesi kanal doluluguna dayanir, ham I/Q degil.

**Katki cumlesi onerisi:** "Markov-gecisli jammer altinda, pencere-ici oznitelikleri HMM/ileri (forward) filtre ve CUSUM ile birlestiren sirali dedektor; tespit gecikmesi-yanlis alarm degis-tokusu ve tek-pencere dedektorune gore kazanim."

**Uygulama zorlugu:** Dusuk (mevcut 10 oznitelik + sentetik Markov jammer; GNU Radio kayit uretimi).
**Tahmini yenilik:** Orta-dusuk (klasik araclar; ayristirici: 6G dalga bicimi + acik-kume ile birlesim).
**Riskler:** "Bilinen yontemlerin uygulamasi" elestirisi; tek basina zayif; K2/K4/K5'e ek bilesen olarak daha guclu.

### B.8 Aday karsilastirma ozeti

| Aday | Yenilik (tahmin) | Zorluk | Guclu yan | Zayif yan |
|---|---|---|---|---|
| K5 sim-to-real + acik-kume | orta-yuksek | orta-yuksek | Donanim kanitlarsa guclu; GNU Radio birikimi | Donanim; Varotto, Bouferroum yakin |
| K1 6G-ozgu saldiri veri seti + acik-kume | orta-yuksek | yuksek | Acik veri seti; 6G vurgusu | Chong 2026, Schosser 2026 yakin |
| K3 uzamsal oznitelikli MIMO/ISAC | orta-yuksek | orta | Tespit+tur+acik-kume birlikte bulunamadi | Kapsam degisir; cok kanalli SDR |
| K4 OTFS/NR dalga bicimi uzerinde | orta | orta | OTFS jammer siniflandirma bulunamadi | Kutuphane/standart uyumu |
| K2 acik-kume + AI jammer | orta | orta | Konu guncel | CITADEL, Aissou (2026) cok yakin |
| K6 hafif xApp/gecikme | dusuk-orta | dusuk-yuksek | Hizli uygulanir | Kalabalik; Ratti/Kurma riski |
| K7 sirali/Markov | orta-dusuk | dusuk | Kolay ek | Tek basina zayif |

---

## C. Derlemeler, vizyon belgeleri ve yayin yerleri

### C.1 Derleme/vizyon makaleleri ve belgeler

Atif sayilari yalnizca OpenAlex'ten (tarama tarihinde); Google Scholar/Scopus ile dogrulanmadi. "En cok atif" siralamasi yapilmamistir; bunlar bu aramalarda gorulen ilgili derlemelerdir.

| # | Kunye | Dogrulama | Baglanti |
|---|---|---|---|
| 1 | Pirayesh, Zeng, "Jamming Attacks and Anti-Jamming Strategies in Wireless Networks: A Comprehensive Survey", IEEE Commun. Surveys & Tutorials 2022, DOI 10.1109/COMST.2022.3159185 (OpenAlex atif: 857); arXiv:2101.00292 (1 Oca 2021) | [A]+[O] | https://arxiv.org/abs/2101.00292 |
| 2 | Nguyen, Lin, Cheng, Hwang, Lin, "Security and privacy for 6G: A survey on prospective technologies and challenges", IEEE COMST (arXiv notu: 2021'de kabul; iliskili DOI 10.1109/COMST.2021.3108618), arXiv:2108.11861 | [A] | https://arxiv.org/abs/2108.11861 |
| 3 | Mitev, Chorti, Poor, Fettweis, "What Physical Layer Security Can Do for 6G Security", arXiv:2212.00427 (1 Ara 2022); IEEE Open J. Veh. Technol. 2023 (yayin yeri arama ozetinden [S]) | [A]+[S] | https://arxiv.org/abs/2212.00427 |
| 4 | Priyadarshani, Park, Ata, Alouini, "Jamming Intrusions in Extreme Bandwidth Communication: A Comprehensive Overview", arXiv:2403.19868; IEEE OJ-COMS 2025, DOI 10.1109/OJCOMS.2025.3594284 (OpenAlex; atif 49) | [S]+[O] | https://arxiv.org/abs/2403.19868 |
| 5 | Polese, Bonati, D'Oro ve ark., "Understanding O-RAN: Architecture, Interfaces, Algorithms, Security, and Research Challenges", IEEE COMST 2023, DOI 10.1109/COMST.2023.3239220 (atif 1618; yalniz ilk uc yazar goruldu) | [O] | https://doi.org/10.1109/comst.2023.3239220 |
| 6 | Adesina, Hsieh, Sagduyu ve ark., "Adversarial Machine Learning in Wireless Communications Using RF Data: A Review", IEEE COMST 2022, DOI 10.1109/COMST.2022.3205184 (atif 236) | [O] | https://doi.org/10.1109/comst.2022.3205184 |
| 7 | Azari, Solanki, Chatzinotas ve ark., "Evolution of Non-Terrestrial Networks From 5G to 6G: A Survey", IEEE COMST 2022, DOI 10.1109/COMST.2022.3199901 (atif 906) | [O] | https://doi.org/10.1109/comst.2022.3199901 |
| 8 | Aman, Illi, Al-Kuwari ve ark., "Integrating Communication, Sensing and Security: Progress and Prospects of PLS in ISAC Systems", IEEE COMST 2026, DOI 10.1109/COMST.2026.3691091 | [O] | https://doi.org/10.1109/comst.2026.3691091 |
| 9 | Matsumine, Ochiai, Shikata, "Physical Layer Security for Integrated Sensing and Communication: A Survey", arXiv:2504.18097 (25 Nis 2025) | [A] | https://arxiv.org/abs/2504.18097 |
| 10 | Harvanek, Bolcek, Kufa ve ark., "Survey on 5G Physical Layer Security Threats and Countermeasures", Sensors 2024, DOI 10.3390/s24175523 | [O] | https://doi.org/10.3390/s24175523 |
| 11 | Savadatti, Dhariwal, Krishnamoorthy ve ark., "An Extensive Classification of 5G Network Jamming Attacks", Security and Communication Networks 2024, DOI 10.1155/2024/2883082 | [O] | https://doi.org/10.1155/2024/2883082 |
| 12 | Son, Nguyen, Chien ve ark., "Adversarial Attacks and Defenses in 6G Network-Assisted IoT Systems", IEEE IoT-J 2024, DOI 10.1109/JIOT.2024.3373808 (atif 99) | [O] | https://doi.org/10.1109/jiot.2024.3373808 |
| 13 | Porambage ve ark. (18 yazar), "Security, Privacy and System-Level Resillience of 6G End-to-End System: Hexa-X-II Perspective" (arXiv sayfasindaki yazimla), arXiv:2602.10734 (11 Sub 2026; IEEE CAMAD 2024 Workshop 2'de sunulmus) | [A] | https://arxiv.org/abs/2602.10734 |

Standart/endustri belgeleri (birincil belge PDF olarak okunmadi):
- 3GPP TR 33.801-01 "Study on Security for the 6G System" (Release 20; SA3 calisma kalemi FS_6G_SEC; 3GPP FTP'de taslak surumler; son onayli surum dogrulanmadi) [S]: https://www.3gpp.org/FTP/Email_Discussions/SA3/FS_6G_SEC/draft_TR_33801-01-FS_6G_SEC.docx
- ITU-R Recommendation M.2160 (IMT-2030 cercevesi, Kasim 2023): "security and resilience" dort ust duzey tasarim ilkesinden biri; derin analiz icermiyor (arama ozeti); ITU-T "Security Consideration for IMT-2030 Networks" teknik raporu 10 Haz 2026'da "agreed" durumunda [S]: https://www.itu.int/hub/2026/03/imt-2030-technical-requirements-for-the-6g-future/
- GCOT, "Security and Resilience Principles for 6G", GOV.UK, 3 Mart 2026 (sayfa okundu): cikti hedefleri containment, confidentiality, integrity, resilience, regulatory compliance; ilkeler arasinda GNSS'e tek basina dayanmayan PNT ve AI'yi hem guvenlik icin kullanma hem guvence altina alma: https://www.gov.uk/government/publications/global-coalition-on-telecoms-security-and-resilience-principles-for-6g/gcot-security-and-resilience-principles-for-6g
- Ericsson, "6G Security - drivers and needs" (white paper; yalniz arama sonucu basligi/ozeti) [S]: https://www.ericsson.com/en/reports-and-papers/white-papers/6g-security-drivers-and-needs

3GPP Rel-19/20'de jamming'e ozel bir 6G fiziksel katman guvenlik belgesi bu aramalarda bulunamadi.

### C.2 Konuyu yayimlayan dergi ve konferanslar

Yalnizca bu taramada gozlenen ornek makalelerin yayin yerleri listelenmistir; "kabul ediyor" ifadesi o yerde en az bir ilgili makalenin gorulmesine dayanir, yayin politikasi/kapsam taramasi yapilmadi.

| Yayin yeri | Gozlenen ornek |
|---|---|
| IEEE Open Journal of the Communications Society (OJ-COMS) | Priyadarshani 2025 [O]; Chen, Liu, Chen 2026 (AFDM ICAJ) [O]; Schosser 2606.02102 (gonderilmis) [A]; Jung ve ark. 2026 (cell-free pilot spoofing) [O]; Hung ve ark. 2025 (xApp/E2 anomali) [O] |
| IEEE Trans. Information Forensics & Security (TIFS) | Dinh-Van 2023 (beam training) [O]; Xu 2024 (cell-free pilot spoofing) [O]; Dassanayake 2023 (IRS pilot attack) [O] |
| IEEE Trans. Wireless Communications (TWC) | Choudhury 2024; Du 2025; Wang ve ark. 2025 (UAV covert ISAC) [O] |
| IEEE Trans. Vehicular Technology (TVT) | DT-DDNN 2025 [O]; Shu, Qi, Mao 2025 (ISAC dalga bicimi + jamming) [O] |
| IEEE Wireless Communications Letters (WCL) | de Sena 2024 (Malicious RIS) [S]; Deng 2023 (OTFS-SCMA) [O] |
| IEEE Communications Magazine | Bogucka ve ark. (arXiv notu: kabul) [A] |
| IEEE Communications Surveys & Tutorials | Pirayesh 2022; Aman 2026; Polese 2023 [O] |
| IEEE Access / Sensors / Electronics / Computer Networks | Flores 2023; Chrysanidis 2024; Harvanek 2024; Li 2025; Hanegraaf (Computer Networks'a kabul) [O/A] |
| ICC, GLOBECOM, WCNC, VTC, PIMRC, MILCOM, CCNC (+ ICC/GC workshop'lari) | Chong ICC-W 2026 [O]; Aissou GLOBECOM 2026 [A]; Ba GLOBECOM 2026 [A]; Azariah WCNC 2026 [A]; Krayani WCNC 2023 [O]; Kuili PIMRC 2025 [A]; Rahman MILCOM [A]; Stegmann GC Wkshps 2024 [O]; Natanzi CCNC 2026 [O]; Kryszkiewicz VTC 2023 [O] |
| NDSS, ACM WiSec, ACM MobiSys, MSWiM | Mackensen NDSS 2025 [O]; Magmaw NDSS 2025 [O]; Chiejina WiSec 2024 [A]; Qian & Pathak MobiSys 2025 [O]; Bouferroum MSWiM 2026 [A] |
| IEEE IoT Journal, IEEE TCCN | Hu 2023; Li 2024 (IoT-J) [O]; Zhang 2023 (TCCN) [A] |

---

## D. Bu taramanin sinirliliklari

1. **Arac kisitlari:** OpenAlex'in ucretsiz gunluk kotasi taramanin ortasinda doldu (HTTP 429); semantik, GAN/RL, URLLC, UAV, backscatter basliklari bu nedenle agirlikla WebSearch ile yapildi. Semantic Scholar API kullanilmadi. arXiv arama sayfasi cok terimli sorgularda tutarsizdi (ornegin "jamming unknown jammer detection" sifir sonuc dondurdu); "bulunamadi" ifadeleri guclu bir olumsuz kanit degildir. Google Scholar kullanilmadi.
2. **Dogrulama duzeyleri:** Cok sayida kayit yalnizca OpenAlex'ten ([O]: baslik, ilk 3 yazar, yayin yeri, DOI) veya arama ozetinden ([S]) gorulmustur; ozet/icerigi okunmamistir. Ozellikle K6 icin kritik olabilecek Ratti ve ark. (Sensors 2026) ve Kurma ve ark. (VTC2026-Fall), K1 icin kritik olabilecek Chong ve ark. (ICC-W 2026) okunamadi; IEEE Xplore'a erisilmedi.
3. **Dogrulanamayan kunyeler/iddialar:** SecBeam (arXiv:2307.00178) ve Natanzi (arXiv:2508.02856) yazar listeleri ve ozetleri arama ozetinden; Shrestha ve ark. Nat. Commun. 2022 yazar listesi; arXiv:2603.12062 (Iridium radyo linki) ve arXiv:2402.05042 (Iridium jamming gucu) yazar adlari; URLLC/reaktif PUSCH jamming ile ilgili olabilecek, arama sonucunda gorunen ama acilmayan arXiv:2605.30622, 2606.14465, 2401.10387; Tampere tezi, Price ve ark., Zhang & Krunz, Zhong ve ark. PLOS ONE 2025 ve Zhou ve ark. 2022 ozet duzeyinde; Arcangeloni'nin "%93 @ 27 dB" iddiasi yalnizca ucuncu taraf ozetinde; "BeamSecure-AI" (Alsulami, Electronics 2025) OpenAlex'te goruldu, arama motorunda dogrulanamadi; "Jamming Pattern Recognition" ailesi disinda sayisal sonuclar ozet sayfalarindan. Bunlar makaleye atif yapilmadan once kaynak sayfadan dogrulanmalidir.
4. **Arac surumleri:** Sionna v2.2.0 (docs ana sayfa basligi; GitHub surum notlarinda "29 Eylul", yil yazmiyor; 2026 olarak cikarsandi). Sionna PyPI sayfasi yuklenemedi. Sionna RT'de RIS: sionna-rt v1.0.0 surum notu ("RIS gelecek surumlerde eklenecek; 0.19 kullanin") ve arama ozetindeki Sionna RT Technical Report notu ("surum 1.2'de RIS desteklenmiyor") dolayli kanittir; Technical Report v3 ozet sayfasi RIS'ten bahsetmiyor; v2.2.0 RT dokumaninda RIS bahsi bulunamamistir (dogrudan bir 'RIS yok' beyani yok). Sionna NR modulunde SSB/PRACH/PDCCH yoklugu, dokuman agacinin PUSCH ile sinirli listesinden cikarilmistir. GNU Radio icin hazir moduller (gr-ieee802-11, gr-ieee80211, gr-gfdm, gr-lte, gr-ofdmradar) arama sonuclarindan; NR ve OTFS modulu bulunamadi (yoklugunun kaniti degil). MATLAB 5G Toolbox bilgisi yalnizca arama sonucu ozetinden (SSB/PRACH uretimi); Toolbox surumu belirtilmedi. GNU Radio yerlesik jammer blok ayrintilari bu oturumda dokumandan dogrulanmadi.
5. **Bulunamayan/yetersiz kalan basliklar:** THz'e ozgu jamming TESPIT calismalari, ODDM jamming, URLLC'ye ozgu darbeli jamming birincil kaynaklari, backscatter I/Q tespiti, NTN'de 3GPP Rel-19/20 jamming standartlari. 3GPP ve ITU belgeleri PDF olarak okunmadi (talimat geregi PDF indirilmedi).
6. **Tarih belirsizligi:** Bazi arXiv kayitlari 2026'nin ikinci yarisina aittir (2606-2611 numarali) ve ozet sayfalarindan okunmustur; bazilari "gonderildi/kabul" durumundadir, hakem sureci tamamlanmamis olabilir.
7. **Bu belge sistematik literatur taramasi degildir.** Yenilik duzeyi tahminleri yazarin yargisidir; kesin hukum icin hedef dergiye gore ek tarama (IEEE Xplore, Scopus, Semantic Scholar) gerekir.
