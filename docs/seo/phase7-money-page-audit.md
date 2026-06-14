# Phase 7 Audit — Priority Pages vs Master Keyword Map

Tanggal: 2026-06-14  
Workspace: `/home/marchel-H/tmp-karmeda-website1`  
Source of truth: `docs/seo/master-keyword-map-seragamrapih.md`

## Halaman yang diaudit
1. Homepage (`components/app.jsx` + `components/i18n.jsx`)
2. `layanan/seragam-korporat.html`
3. `layanan/wearpack-k3.html`
4. `lokasi/konveksi-seragam-tangerang.html`

---

## Ringkasan temuan utama

### 1) Homepage — cluster D
**Kondisi saat ini**
- Sudah punya SEO block dan internal link ke beberapa halaman komersial.
- Messaging homepage masih kuat ke "vendor seragam perusahaan Tangerang", tapi belum cukup tegas ke phrasing umbrella cluster D seperti:
  - `seragam kerja tangerang`
  - `vendor seragam kerja`
  - `konveksi seragam kerja`
- Internal link homepage masih bercampur antara money pages utama dan halaman komersial support, sehingga authority flow ke 3 priority money pages belum sejelas mungkin.

**Gap utama**
- Perlu copy yang lebih frontal untuk intent umbrella komersial.
- Perlu prioritas link yang lebih tegas ke:
  - seragam korporat
  - wearpack K3
  - konveksi seragam Tangerang
- Perlu one-step bridge ke support content procurement, bukan terlalu banyak link sekunder dulu.

**Rekomendasi**
- Refresh `seo_block_title`, `seo_block_p1`, `seo_block_p2`.
- Rapikan urutan link homepage agar 3 money pages utama muncul paling dominan.

---

### 2) Seragam Korporat page — cluster A
**Kondisi saat ini**
- Title/H1 sudah selaras dengan intent `vendor seragam korporat/perusahaan Tangerang`.
- CTA, FAQ, dan related links sudah cukup relevan.
- Ada dukungan ke cluster C dan B lewat related links.

**Gap utama**
- OG title dan OG description masih lebih generik daripada title utama.
- Halaman belum cukup menonjolkan wording `vendor seragam perusahaan Tangerang` sebagai variasi cluster A di metadata sosial.

**Rekomendasi**
- Sinkronkan OG title/description dengan title intent komersial terbaru.
- Tambah sedikit penguatan body copy untuk buyer role HRD/procurement bila ada ruang ringan.

---

### 3) Wearpack K3 page — cluster C
**Kondisi saat ini**
- H1 dan hero sudah kuat untuk intent pabrik/kontraktor/tim lapangan.
- FAQ procurement/HSE sudah bagus.
- Produk dan CTA cukup komersial.

**Gap utama**
- OG title masih belum sekuat title utama.
- Metadata keyword/description bisa sedikit lebih rapat ke `vendor wearpack safety Tangerang` dan `wearpack proyek Tangerang`.
- Perlu related links yang lebih eksplisit ke cluster A/B bila belum cukup kuat di bawah halaman.

**Rekomendasi**
- Sinkronkan OG title/description dengan intent cluster C.
- Tambah penguatan internal link komersial bila perlu.

---

### 4) Location page Tangerang — cluster B
**Kondisi saat ini**
- H1 dan hero sudah kuat untuk `konveksi seragam Tangerang`.
- Sudah ada local insight section dan commercial intent hub.
- Sudah menghubungkan ke seragam korporat dan wearpack K3.

**Gap utama**
- OG title, OG description, dan Twitter metadata masih lebih generik dari title utama.
- Local page masih bisa lebih tegas di wording `vendor seragam Tangerang` dan `pabrik seragam kerja Tangerang` pada metadata pendukung.
- Perlu pastikan intent hub bawah tetap jadi jalur utama ke cluster A/C.

**Rekomendasi**
- Sinkronkan social metadata dengan title utama.
- Perkuat copy lokal secara ringan tanpa membuat halaman terlalu spammy.

---

## Prioritas eksekusi Phase 7
1. Homepage umbrella commercial intent refresh
2. Sinkronisasi metadata + copy penguat di seragam korporat
3. Sinkronisasi metadata + link/commercial clarity di wearpack K3
4. Sinkronisasi metadata + local-commercial clarity di location Tangerang
5. Build, verify, push, live-check

---

## Catatan keputusan
- Tidak perlu bikin halaman baru di Phase 7.
- Fokus tetap ke penguatan money pages yang sudah ada.
- Support content lebih cocok jadi fokus Phase 8.
