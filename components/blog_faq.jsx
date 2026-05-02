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
  { date: '5 Mar 2025', cat: 'Panduan', title: 'Cara Memilih Vendor Konveksi Seragam Perusahaan yang Tepat', excerpt: '7 kriteria wajib sebelum menandatangani kontrak dengan konveksi — dari kapasitas produksi hingga garansi cacat.', tone: 'green', href: 'blog/cara-memilih-vendor-konveksi-seragam.html' },
  { date: '18 Feb 2025', cat: 'Biaya & Anggaran', title: 'Panduan Harga Seragam Karyawan 2025: Estimasi & Tips Hemat', excerpt: 'Tabel harga realistis per jenis seragam — kemeja, polo, wearpack, scrub — plus formula kalkulasi anggaran.', tone: '', href: 'blog/harga-seragam-karyawan-2025.html' },
  { date: '28 Jan 2025', cat: 'Jenis Produk', title: '7 Jenis Seragam Kantor Profesional untuk Perusahaan Anda', excerpt: 'Dari kemeja PDH hingga wearpack industri — panduan memilih seragam paling tepat untuk industri dan fungsi kerja Anda.', tone: 'dark', href: 'blog/7-jenis-seragam-kantor-profesional.html' },
];
const POSTS_EN = [
  { date: '5 Mar 2025', cat: 'Guide', title: 'How to Choose the Right Corporate Uniform Manufacturer', excerpt: '7 must-check criteria before signing a contract — from production capacity to defect guarantees.', tone: 'green', href: 'blog/cara-memilih-vendor-konveksi-seragam.html' },
  { date: '18 Feb 2025', cat: 'Cost & Budget', title: 'Employee Uniform Pricing Guide 2025: Cost Estimates & Saving Tips', excerpt: 'Realistic price table per uniform type — shirts, polos, coveralls, scrubs — plus budget calculation formula.', tone: '', href: 'blog/harga-seragam-karyawan-2025.html' },
  { date: '28 Jan 2025', cat: 'Product Types', title: '7 Professional Office Uniform Types for Your Company', excerpt: 'From PDH shirts to industrial coveralls — a guide to choosing the right uniform for your industry.', tone: 'dark', href: 'blog/7-jenis-seragam-kantor-profesional.html' },
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
                <div className={`ph ${p.tone}`} style={blogStyles.img}>{p.cat.toUpperCase()}</div>
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
