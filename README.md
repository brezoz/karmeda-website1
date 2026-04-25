# KARMEDA Website

Website resmi PT Karuna Metta Ananda - Konveksi Seragam Profesional

## 🚀 Cara Deploy ke Vercel

### 1. Push ke GitHub
```bash
git init
git add .
git commit -m "Initial commit - Karmeda website"
git branch -M main
git remote add origin https://github.com/USERNAME/karmeda-website.git
git push -u origin main
```

### 2. Deploy ke Vercel
1. Login ke [vercel.com](https://vercel.com)
2. Klik **"Add New Project"**
3. Import repository GitHub ini
4. Framework Preset: **Other** (static HTML)
5. Klik **Deploy**

### 3. Setup Custom Domain (dari IDWebhost)
1. Di Vercel Dashboard → **Settings** → **Domains**
2. Tambahkan domain Anda (contoh: `karmeda.id` atau `www.karmeda.id`)
3. Vercel akan kasih DNS record yang harus ditambahkan:
   - **A Record**: `76.76.21.21` (atau IP yang diberikan Vercel)
   - **CNAME**: `cname.vercel-dns.com`

4. Login ke IDWebhost → **DNS Management**
5. Tambahkan record sesuai instruksi Vercel:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   TTL: 3600
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 3600
   ```

6. Tunggu DNS propagation (5-60 menit)
7. SSL otomatis aktif dari Vercel

## 📁 Struktur File

```
karmeda-website/
├── index.html              # File utama (sudah production-ready)
├── styles.css              # Stylesheet utama
├── components/             # React components
│   ├── i18n.jsx           # Internationalization
│   ├── nav.jsx            # Navigation
│   ├── hero.jsx           # Hero section
│   ├── about.jsx          # About section
│   ├── products.jsx       # Products section
│   ├── process.jsx        # Process section
│   ├── calculator.jsx     # Price calculator
│   ├── blog_faq.jsx       # Blog & FAQ
│   ├── contact.jsx        # Contact form
│   └── app.jsx            # Main app
├── README.md              # Dokumentasi ini
└── .gitignore             # Git ignore file
```

## ✅ Perubahan dari Versi Sebelumnya

1. ✅ Ganti React **development** → **production** build (lebih cepat)
2. ✅ Rename `Karmeda Website.html` → `index.html`
3. ✅ Tambah SEO meta tags
4. ✅ Tambah Open Graph meta tags (untuk share di sosmed)
5. ✅ Siap deploy production

## 🛠 Testing Lokal

Untuk testing di komputer lokal sebelum deploy:

```bash
# Pakai Python
python -m http.server 8000

# Atau pakai Node.js
npx serve
```

Buka browser: `http://localhost:8000`

## 📞 Kontak

**PT Karuna Metta Ananda (KARMEDA)**  
Email: info@karmeda.id  
WhatsApp: 0812-xxxx-xxxx (update dengan nomor yang benar)

---

**Last Updated**: April 2026  
**Powered by**: React 18 + Vercel
