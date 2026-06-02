# Panduan Setup Google Ads untuk seragamrapih.com
## Campaign: Seragam Kerja Pabrik — Langkah Demi Langkah
**Dibuat:** Juni 2026

---

## BAGIAN 1: Setup Conversion Tracking (LAKUKAN PERTAMA)

Ini wajib sebelum iklan berjalan. Tanpa ini Anda tidak tahu iklan mana yang menghasilkan kontak.

### Langkah 1.1 — Ambil Conversion ID & Label dari Google Ads

1. Login ke **ads.google.com**
2. Klik **Goals** (ikon target) → **Conversions** → **Summary**
3. Klik **+ New conversion action**
4. Pilih **Website**
5. Isi:
   - Category: **Contact**
   - Conversion name: `WhatsApp Click - Seragam Pabrik`
   - Value: `1` (atau estimasi nilai 1 lead, misalnya 500.000)
   - Count: `Every`
6. Klik **Done** → **Save and continue**
7. Pilih **Use Google Tag** → Anda akan lihat dua nilai:
   - **Conversion ID**: format `AW-123456789`
   - **Conversion label**: format `abcDEFghiJKLmnop`

### Langkah 1.2 — Update Landing Page

Buka file `dist/iklan/seragam-kerja-pabrik.html` dan ganti baris ini di bagian `<script>`:

```javascript
window._gads_id = 'AW-XXXXXXXXX';       // ← Ganti dengan Conversion ID Anda
window._gads_label = 'YYYYYYYYYYYYYYY'; // ← Ganti dengan Conversion Label Anda
```

Contoh setelah diisi:
```javascript
window._gads_id = 'AW-123456789';
window._gads_label = 'abcDEFghiJKLmnop';
```

Setelah edit, commit dan push ke GitHub.

---

## BAGIAN 2: Struktur Campaign yang Direkomendasikan

### Campaign Name: `Seragam Pabrik B2B - Tangerang`

**Settings:**
- Network: Search only (jangan Display untuk campaign pertama)
- Location: Tangerang + Jakarta + radius 50km dari Tangerang
- Language: Indonesian
- Budget harian: Rp 100.000–150.000/hari untuk awal
- Bidding: **Maximize Conversions** (aktifkan setelah minimal 10 conversions, awalnya pakai Manual CPC)

---

## BAGIAN 3: Keyword List

Kelompokkan keyword ke dalam 3 Ad Group:

### Ad Group 1: "Vendor Seragam Pabrik" (High Intent)
```
[vendor seragam pabrik tangerang]
[vendor seragam kerja pabrik]
[supplier seragam pabrik banten]
[pabrik konveksi seragam industri]
"konveksi seragam kerja pabrik tangerang"
"vendor seragam karyawan pabrik"
```

### Ad Group 2: "Wearpack Safety" (Product-Specific)
```
[wearpack safety tangerang]
[wearpack k3 pabrik]
[jasa pembuatan wearpack industri]
"wearpack coverall pabrik tangerang"
"konveksi wearpack safety k3"
"beli wearpack pabrik tangerang"
```

### Ad Group 3: "Konveksi Seragam Tangerang" (Local Intent)
```
[konveksi seragam tangerang]
[konveksi seragam kerja banten]
"jasa konveksi seragam tangerang"
"buat seragam karyawan tangerang"
"pesan seragam pabrik tangerang"
```

**Format keyword:**
- `[exact match]` — paling presisi, mahal tapi relevan
- `"phrase match"` — lebih luas, masih cukup relevan

---

## BAGIAN 4: Ad Copy (Copy-paste ini ke Google Ads)

### Responsive Search Ad #1 — Pain Point

**Headlines (tulis semua, Google pilih kombinasi terbaik):**
```
Vendor Seragam Pabrik Tangerang
Wearpack K3 MOQ 30 Pcs
Lead Time Akurat Berikat Kontrak
QC Ketat Setiap Unit
Legalitas PT Resmi + NPWP
Bukan Vendor yang Suka Molor
Konsultasi Gratis Sekarang
20 Tahun Pengalaman Industri
Kapasitas 10.000 Pcs/Bulan
Harga Transparan Tanpa Biaya Tersembunyi
```

**Descriptions:**
```
Lelah dengan vendor seragam yang terus molor? PT Karmeda: lead time tertulis di SPK, QC 100% per unit, faktur pajak tersedia. Konsultasi gratis via WA.

Produksi wearpack safety K3, kemeja PDL, polo pabrik untuk kawasan industri Tangerang. PT resmi, kapasitas hingga 10.000 pcs/bulan. Request penawaran sekarang.
```

**Final URL:** `https://seragamrapih.com/iklan/seragam-kerja-pabrik`

### Responsive Search Ad #2 — Spesifikasi

**Headlines:**
```
Wearpack Cotton Drill K3 Tangerang
Kemeja PDL Ripstop Custom
Seragam Pabrik MOQ 30 Pcs
Sample Gratis Sebelum Order
200+ Klien Korporat Puas
Kawasan Industri Cikupa & Balaraja
Bordir Logo Perusahaan Termasuk
Pengiriman ke Seluruh Indonesia
```

---

## BAGIAN 5: Negative Keywords (WAJIB isi ini)

Tambahkan negative keywords untuk menghindari klik tidak relevan:

```
gratis
murah banget
eceran
1 pcs
2 pcs
3 pcs
5 pcs
seragam sekolah
seragam sd
seragam smp
seragam sma
seragam olahraga
baju kaos
gambar
contoh
tutorial
cara membuat sendiri
diy
kursus
loker
lowongan
```

---

## BAGIAN 6: Landing Page URL untuk Setiap Ad Group

| Ad Group | Final URL |
|----------|-----------|
| Vendor Seragam Pabrik | `https://seragamrapih.com/iklan/seragam-kerja-pabrik` |
| Wearpack Safety | `https://seragamrapih.com/layanan/wearpack-k3` |
| Konveksi Lokal | `https://seragamrapih.com/lokasi/konveksi-seragam-tangerang` |

---

## BAGIAN 7: Checklist Sebelum Iklan Aktif

- [ ] Conversion tracking dipasang dan diuji (klik tombol WA → cek di Google Ads Conversions)
- [ ] Conversion ID & Label sudah diupdate di `seragam-kerja-pabrik.html`
- [ ] Negative keywords sudah diisi
- [ ] Budget harian sudah diset (rekomendasi mulai Rp 100.000/hari)
- [ ] Ad Schedule: aktifkan Senin–Jumat 08.00–17.00 (jam kerja HRD/purchasing)
- [ ] Location targeting: Tangerang + Jakarta + radius 50km
- [ ] WhatsApp Anda aktif dan siap respons dalam jam kerja

---

## BAGIAN 8: Target KPI untuk 30 Hari Pertama

| KPI | Target |
|-----|--------|
| Impressions/bulan | 3.000–8.000 |
| CTR (Click-Through Rate) | > 5% |
| Conversions (WA click) | 15–30 per bulan |
| Cost per Conversion | < Rp 50.000 |
| Total budget/bulan | Rp 3.000.000–4.500.000 |

**Ekspektasi realistis:** Dari 20 conversions (WA chat), rata-rata 3–5 yang menjadi survey/meeting, 1–2 yang closing. Dengan nilai order rata-rata Rp 15–50 juta per kontrak, 1 closing = ROI sudah positif.

---

## BAGIAN 9: Cara Test Conversion Tracking

1. Buka halaman `seragamrapih.com/iklan/seragam-kerja-pabrik`
2. Klik tombol "Chat WhatsApp — Minta Penawaran"
3. Buka Google Ads → Goals → Conversions → lihat kolom "All conv." 
4. Conversion harus muncul dalam 1–2 jam
5. Jika tidak muncul → cek Conversion ID dan Label di file HTML

---

*Panduan ini akan diupdate seiring perkembangan campaign. Simpan file ini untuk referensi.*
