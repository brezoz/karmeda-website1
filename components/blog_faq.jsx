// blog_faq.jsx — Blog teasers + FAQ accordion
const blogStyles = {
  wrap: { padding: '120px 0', background: 'var(--paper-2)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 56 },
  card: { background: 'white', borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--ink-200)' },
  img: { aspectRatio: '16/10', borderRadius: 0 },
  body: { padding: 28 },
  meta: { fontSize: 11, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-500)', marginBottom: 12 },
  title: { fontFamily: 'var(--font-display)', fontSize: 26, marginBottom: 10, lineHeight: 1.15 },
  excerpt: { fontSize: 14, color: 'var(--ink-500)', marginBottom: 16 },
};

const POSTS_ID = [
  { date: '1 Mei 2025', cat: 'Konveksi Jaket', title: 'Konveksi Jaket Bomber Custom: Panduan Lengkap untuk Perusahaan & Komunitas 2025', excerpt: 'Pilihan bahan, teknik branding logo, proses pemesanan, dan estimasi harga jaket bomber custom untuk seragam korporat dan komunitas.', tone: 'dark', href: 'blog/konveksi-jaket-bomber-tangerang.html', img: '' },
  { date: '1 Mei 2025', cat: 'Konveksi Jaket', title: 'Jaket Parka Custom untuk Seragam Lapangan & Outdoor: Panduan Lengkap 2025', excerpt: 'Spesifikasi bahan waterproof, fitur wajib untuk karyawan lapangan, dan estimasi harga jaket parka custom dengan bordir logo perusahaan.', tone: 'green', href: 'blog/konveksi-jaket-parka-custom.html', img: '' },
  { date: '1 Mei 2025', cat: 'Konveksi Jaket', title: 'Jaket Winter Perusahaan: Panduan Seragam untuk Cold Storage & Proyek Dingin 2025', excerpt: 'Panduan memilih padding, shell material, dan fitur wajib jaket winter untuk karyawan gudang pendingin, cold storage, dan proyek suhu rendah.', tone: '', href: 'blog/konveksi-jaket-winter-perusahaan.html', img: '' },
  { date: '15 Apr 2025', cat: 'Material & Bahan', title: 'Panduan Bahan Kain Seragam Terbaik 2025: Pilih yang Tepat untuk Karyawan Anda', excerpt: 'Perbandingan katun combed, drill, polyester, CVC, dan rayon — lengkap dengan tabel rekomendasi per industri.', tone: 'dark', href: 'blog/bahan-kain-seragam-terbaik.html', img: 'assets/blog-bahan-kain-seragam.webp' },
  { date: '8 Apr 2025', cat: 'Seragam Medis', title: 'Seragam Medis & Scrub Suit: Panduan Lengkap untuk Klinik dan Rumah Sakit', excerpt: 'Tips memilih scrub suit, jas lab, dan baju perawat — standar bahan, panduan warna per departemen, dan estimasi biaya.', tone: 'green', href: 'blog/seragam-medis-scrub-suit-panduan.html', img: 'assets/blog-seragam-medis.webp' },
  { date: '25 Mar 2025', cat: 'Desain & Custom', title: 'Custom Seragam dengan Logo Perusahaan: Bordir, Sablon, atau Patch?', excerpt: 'Perbandingan teknik bordir, sablon, dan patch untuk logo di seragam — ketahanan, biaya, dan panduan memilih yang tepat.', tone: '', href: 'blog/custom-seragam-logo-perusahaan.html', img: 'assets/blog-custom-seragam-logo.webp' },
];
const POSTS_EN = [
  { date: '1 May 2025', cat: 'Jacket Manufacturing', title: 'Custom Bomber Jacket: Complete Guide for Corporate & Community Uniforms 2025', excerpt: 'Fabric options, logo branding techniques, ordering process, and price estimates for custom bomber jacket uniforms.', tone: 'dark', href: 'blog/konveksi-jaket-bomber-tangerang.html', img: '' },
  { date: '1 May 2025', cat: 'Jacket Manufacturing', title: 'Custom Parka Jacket for Field & Outdoor Uniforms: Complete Guide 2025', excerpt: 'Waterproof fabric specs, must-have features for field workers, and pricing for custom parka jackets with company logo embroidery.', tone: 'green', href: 'blog/konveksi-jaket-parka-custom.html', img: '' },
  { date: '1 May 2025', cat: 'Jacket Manufacturing', title: 'Winter Jacket for Companies: Best Choice for Cold Storage & Cold Environment 2025', excerpt: 'Guide to choosing padding, shell material, and essential features for cold storage workers and low-temperature project environments.', tone: '', href: 'blog/konveksi-jaket-winter-perusahaan.html', img: '' },
  { date: '15 Apr 2025', cat: 'Material & Fabric', title: 'Best Uniform Fabric Guide 2025: Choose the Right Material for Your Employees', excerpt: 'Comparison of combed cotton, drill, polyester, CVC, and rayon — with industry-by-industry recommendation table.', tone: 'dark', href: 'blog/bahan-kain-seragam-terbaik.html', img: 'assets/blog-bahan-kain-seragam.webp' },
  { date: '8 Apr 2025', cat: 'Medical Uniforms', title: 'Medical Uniforms & Scrub Suits: Complete Guide for Clinics and Hospitals', excerpt: 'Tips for choosing scrub suits, lab coats, and nurse uniforms — fabric standards, color guides, and cost estimates.', tone: 'green', href: 'blog/seragam-medis-scrub-suit-panduan.html', img: 'assets/blog-seragam-medis.webp' },
  { date: '25 Mar 2025', cat: 'Design & Custom', title: 'Custom Uniforms with Company Logo: Embroidery, Screen Print, or Patch?', excerpt: 'Comparing embroidery, screen printing, and patch techniques for uniform logos — durability, cost, and how to choose.', tone: '', href: 'blog/custom-seragam-logo-perusahaan.html', img: 'assets/blog-custom-seragam-logo.webp' },
];

function Blog({ t, lang }) {
  const posts = lang === 'id' ? POSTS_ID : POSTS_EN;
  return (
    <section id="blog" style={blogStyles.wrap}>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">{t('blog_eyebrow')}</div>
          <h2 className="h-1" style={{fontFamily: 'system-ui'}}>{t('blog_title')}</h2>
        </div>
        <div style={blogStyles.grid} className="blog-grid">
          {posts.map((p, i) => (
            <a key={i} href={p.href || '#blog'} style={{textDecoration:'none', color:'inherit', display:'block'}} className="card" >
              <article style={blogStyles.card}>
                {p.img
                  ? <img src={p.img} alt={p.title} style={{...blogStyles.img, width:'100%', objectFit:'cover', display:'block'}} />
                  : <div className={`ph ${p.tone}`} style={blogStyles.img}>{p.cat.toUpperCase()}</div>
                }
                <div style={blogStyles.body}>
                  <div style={blogStyles.meta}>{p.date} · {p.cat}</div>
                  <h3 style={blogStyles.title}>{p.title}</h3>
                  <p style={blogStyles.excerpt}>{p.excerpt}</p>
                  <span style={{fontSize: 13, fontWeight: 500, color: 'var(--green-700)', textDecoration: 'underline', textUnderlineOffset: 4}}>
                    {t('blog_read')} →
                  </span>
                </div>
              </article>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ
const FAQ_ID = [
  { q: 'Berapa minimum order quantity (MOQ)?', a: 'MOQ kami fleksibel: mulai 30 pcs untuk wearpack/scrub, 50 pcs untuk PDH/PDL, dan 100 pcs untuk polo shirt. Untuk volume di bawah MOQ, kami tetap bisa diskusikan dengan harga menyesuaikan.' },
  { q: 'Berapa lama waktu produksi?', a: 'Standar produksi 14–21 hari kerja setelah approval sample, untuk volume hingga 500 pcs. Volume lebih besar atau urgent kami sediakan jadwal khusus.' },
  { q: 'Apakah bisa kirim sample dulu?', a: 'Ya. Kami sediakan sample fisik gratis untuk MOQ minimum atau sample berbayar dengan deduksi dari PO final.' },
  { q: 'Apakah menerima desain custom?', a: 'Tentu. Tim desain kami akan membuat mockup berdasarkan brief Anda — termasuk konsultasi pemilihan kain dan finishing.' },
  { q: 'Bagaimana sistem pembayaran?', a: 'DP 50% di awal produksi, pelunasan 50% sebelum pengiriman. Untuk klien korporat, kami menyediakan opsi termin pembayaran sesuai kontrak.' },
  { q: 'Apakah bisa kirim ke luar Jabodetabek?', a: 'Ya, kami melayani pengiriman ke seluruh Indonesia via ekspedisi kepercayaan kami atau ekspedisi pilihan klien.' },
];
const FAQ_EN = [
  { q: 'What is the minimum order quantity (MOQ)?', a: 'Our MOQ is flexible: from 30 pcs for coveralls/scrubs, 50 pcs for office shirts, and 100 pcs for polos. We can discuss smaller volumes with adjusted pricing.' },
  { q: 'How long does production take?', a: 'Standard production is 14–21 working days after sample approval, for volumes up to 500 pcs. Larger or urgent volumes get a special schedule.' },
  { q: 'Can you send samples first?', a: 'Yes. We provide free physical samples for minimum MOQ or paid samples with deduction from final PO.' },
  { q: 'Do you accept custom designs?', a: 'Of course. Our design team will create mockups based on your brief — including fabric and finishing consultation.' },
  { q: 'What is the payment scheme?', a: '50% DP at production start, 50% before delivery. For corporate clients we offer payment terms per contract.' },
  { q: 'Do you ship outside Jabodetabek?', a: 'Yes, we ship across Indonesia via our trusted couriers or your preferred carrier.' },
];

function FAQ({ t, lang }) {
  const items = lang === 'id' ? FAQ_ID : FAQ_EN;
  const [open, setOpen] = React.useState(0);
  return (
    <section id="faq" style={{padding: '120px 0'}}>
      <div className="container" style={{maxWidth: 880}}>
        <div className="section-head center">
          <div className="eyebrow">{t('faq_eyebrow')}</div>
          <h2 className="h-1" style={{fontFamily: 'system-ui'}}>{t('faq_title')}</h2>
        </div>
        <div style={{borderTop: '1px solid var(--ink-200)'}}>
          {items.map((it, i) => (
            <div key={i} style={{borderBottom: '1px solid var(--ink-200)'}}>
              <button onClick={() => setOpen(open === i ? -1 : i)} style={{
                width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '24px 0', textAlign: 'left',
                fontFamily: 'var(--font-display)', fontSize: 22,
              }}>
                <span>{it.q}</span>
                <span style={{
                  fontSize: 24, color: 'var(--green-600)',
                  transition: 'transform 0.2s',
                  transform: open === i ? 'rotate(45deg)' : 'rotate(0)',
                }}>+</span>
              </button>
              <div style={{
                maxHeight: open === i ? 200 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.3s ease, padding 0.3s ease',
                paddingBottom: open === i ? 24 : 0,
                color: 'var(--ink-700)',
                fontSize: 15,
                lineHeight: 1.6,
              }}>
                {it.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Blog, FAQ });
