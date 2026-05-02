// products.jsx — Catalog with categories
const productStyles = {
  wrap: { padding: '120px 0' },
  tabs: { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 40 },
  tab: { 
    padding: '10px 18px', 
    borderRadius: 999, 
    border: '1px solid var(--ink-200)',
    background: 'white',
    fontSize: 13,
    fontWeight: 500,
    color: 'var(--ink-700)',
    transition: 'all 0.15s',
  },
  tabActive: {
    background: 'var(--ink-900)',
    color: 'white',
    borderColor: 'var(--ink-900)',
  },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 },
  pCard: { background: 'white', borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--ink-200)' },
  pImg: { aspectRatio: '4/5', borderRadius: 0 },
  pBody: { padding: 20 },
  pName: { fontFamily: 'var(--font-display)', fontSize: 22, marginBottom: 6 },
  pMeta: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 14 },
  pPrice: { fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--green-700)' },
};

const PRODUCTS = [
  { cat: 'corporate', name: 'Kemeja Tropical', en: 'Corporate PDH', desc: 'Kemeja kerja formal dengan logo bordir', en_desc: 'Formal work shirt with embroidered logo', price: '180–320rb', moq: 'MOQ 50', tone: 'green', images: ['assets/kemeja-tropical-byd.webp','assets/kemeja-modernland.webp','assets/kemeja-tropical-toyota.webp','assets/kemeja-tropical-honda.webp','assets/kemeja-tropical-1.webp','assets/kemeja-tropical-2.webp'], interval: 3000 },
  { cat: 'corporate', name: 'Polo Shirt Premium', en: 'Premium Polo Shirt', desc: 'Cotton pique 200gsm, fit tailored', en_desc: 'Cotton pique 200gsm, tailored fit', price: '95–160rb', moq: 'MOQ 100', images: ['assets/polo-formula.webp','assets/polo-tehgelas.webp','assets/polo-adaro.webp','assets/polo-ofi.webp','assets/polo-ofi-navy.webp'], interval: 3000 },
  { cat: 'industrial', name: 'Wearpack Standard', en: 'Standard Coverall', desc: 'Drill 100% cotton, double stitched', en_desc: 'Drill 100% cotton, double stitched', price: '280–420rb', moq: 'MOQ 30', tone: 'dark', images: ['assets/wearpack-ofi.webp','assets/wearpack-pesat.webp'], interval: 3000 },
  { cat: 'corporate', name: 'Blazer Wanita', en: 'Women Blazer', desc: 'Wool blend, lining premium', en_desc: 'Wool blend, premium lining', price: '450–800rb', moq: 'MOQ 30', tone: 'dark', images: ['assets/pelayan-resto1.webp','assets/pelayan-resto2.webp','assets/pelayan-resto11.webp'], interval: 3000 },
  { cat: 'school', name: 'Seragam Sekolah', en: 'School Uniform', desc: 'Bahan oxford, jahit kuat', en_desc: 'Oxford fabric, durable stitching', price: '120–180rb', moq: 'MOQ 100' },
  { cat: 'school', name: 'Baju Olahraga', en: 'Sport Uniform', desc: 'Sesuai standar Kwarnas', en_desc: 'Per Kwarnas standards', price: '95–140rb', moq: 'MOQ 50' },
  { cat: 'school', name: 'Jas', en: 'Jacket', desc: 'Drill twill, bordir custom', en_desc: 'Twill drill, custom embroidery', price: '220–380rb', moq: 'MOQ 50', tone: 'green' },
  { cat: 'industrial', name: 'Safety Vest', en: 'Safety Vest', desc: 'Reflective tape EN471', en_desc: 'EN471 reflective tape', price: '85–140rb', moq: 'MOQ 100', tone: 'green', images: ['assets/safety-vest-1.webp','assets/safety-vest-2.webp','assets/safety-vest-4.webp','assets/rompi-kantong.webp'], interval: 3000 },
  { cat: 'medical', name: 'Baju Kantor RS', en: 'Hospital Office Wear', desc: 'Seragam staf administrasi rumah sakit, formal & nyaman', en_desc: 'Hospital admin staff uniform, formal & comfortable', price: '160–260rb', moq: 'MOQ 30', images: ['assets/kemeja-rsmz.webp'], interval: 3000 },
  { cat: 'medical', name: 'Baju Perawat', en: 'Doctor & Nurse Scrub', desc: 'Scrub suit anti-bacterial, breathable, tahan cuci tinggi', en_desc: 'Anti-bacterial scrub suit, breathable, high-wash resistant', price: '150–240rb', moq: 'MOQ 30', tone: 'green', images: ['assets/perawat1.webp','assets/perawat2.webp','assets/celana-perawat2.webp','assets/celana-perawat1.webp','assets/perawat3.webp','assets/perawat4.webp'], interval: 3800 },
  { cat: 'medical', name: 'Baju Dokter & Lab', en: 'Special — Lab Coat', desc: 'Lab coat polyester-cotton, button down, saku ganda', en_desc: 'Polyester-cotton lab coat, button down, dual pocket', price: '180–280rb', moq: 'MOQ 30', tone: 'dark', images: ['assets/baju-lab1.webp','assets/baju-lab2.webp','assets/baju-lab3.webp','assets/baju-lab4.webp'], interval: 2500 },
  { cat: 'fnb', name: 'Baju Pelayan', en: 'Server / Waiter Uniform', desc: 'Seragam pelayan restoran & hospitality, rapi & tahan cuci', en_desc: 'Restaurant & hospitality server uniform, neat & wash-resistant', price: '140–220rb', moq: 'MOQ 30', images: ['assets/pelayan-resto1.webp','assets/pelayan-resto2.webp','assets/pelayan-resto11.webp','assets/polo-anekaseafood.webp'], interval: 3000 },
  { cat: 'fnb', name: 'Baju Chef', en: 'Chef Jacket', desc: 'Double-breasted, heat-resistant, katun berat premium', en_desc: 'Double-breasted, heat-resistant, premium heavy cotton', price: '220–340rb', moq: 'MOQ 20', tone: 'green', images: ['assets/baju-chef4.png','assets/baju-chef3.webp','assets/baju-chef2.webp'], interval: 3000 },
  { cat: 'fnb', name: 'Apron Chef', en: 'Asst. Chef Jacket', desc: 'Single-breasted untuk commis & line cook, ringan', en_desc: 'Single-breasted for commis & line cook, lightweight', price: '180–280rb', moq: 'MOQ 20', tone: 'dark', images: ['assets/apron-pgm.webp','assets/apron-anekaseafood.webp','assets/apron-loreng.webp'], interval: 3000 },
  { cat: 'outsourcing', name: 'Seragam Security', en: 'Security Uniform', desc: 'PDL security lengkap dengan emblem & atribut standar', en_desc: 'Full security PDL with emblem & standard attributes', price: '180–280rb', moq: 'MOQ 30', images: ['assets/satpam-1.webp','assets/satpam-2.webp'], interval: 3000 },
  { cat: 'outsourcing', name: 'Cleaning Services & Teknisi', en: 'Cleaning & Technician Uniform', desc: 'Seragam OB/cleaning & teknisi lapangan, tahan cuci, bahan kuat & fungsional', en_desc: 'OB/cleaning & technician uniform, wash-resistant, durable & functional', price: '140–300rb', moq: 'MOQ 30', tone: 'green', images: ['assets/teknisi.webp'], interval: 3000 },
  { cat: 'outsourcing', name: 'Seragam Pabrik', en: 'Factory Uniform', desc: 'Atasan kerja pabrik dengan bordir divisi & QR/ID tag', en_desc: 'Factory work shirt with division embroidery & QR/ID tag', price: '160–260rb', moq: 'MOQ 50', tone: 'dark', images: ['assets/kaos-seragam-pabrik.webp'], interval: 3000 },
];

const CATEGORIES_ID = [
  { id: 'all', label: 'Semua' },
  { id: 'corporate', label: 'Korporat' },
  { id: 'school', label: 'Sekolah' },
  { id: 'industrial', label: 'Pabrik/Outdoor' },
  { id: 'medical', label: 'Medis' },
  { id: 'fnb', label: 'F&B & Hospitality' },
  { id: 'outsourcing', label: 'Outsourcing' },
];
const CATEGORIES_EN = [
  { id: 'all', label: 'All' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'school', label: 'School' },
  { id: 'industrial', label: 'Industrial & Workshop' },
  { id: 'medical', label: 'Medical' },
  { id: 'fnb', label: 'F&B & Hospitality' },
  { id: 'outsourcing', label: 'Outsourcing' },
];

function ProductSlider({ images, style, interval }) {
  const [cur, setCur] = React.useState(0);
  const total = images.length;
  const ms = interval || 2500;
  const touchStart = React.useRef(null);

  // Reset cur when images change (e.g. category switch)
  React.useEffect(() => { setCur(0); }, [images]);

  React.useEffect(() => {
    if (total <= 1) return;
    const t = setInterval(() => setCur(c => (c + 1) % total), ms);
    return () => clearInterval(t);
  }, [ms, total]);

  function onTouchStart(e) { touchStart.current = e.touches[0].clientX; }
  function onTouchEnd(e) {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (diff > 30) setCur(c => (c + 1) % total);
    else if (diff < -30) setCur(c => (c - 1 + total) % total);
    touchStart.current = null;
  }

  // Single image — render directly, no slider UI
  if (total === 1) {
    return (
      <div style={{ ...style, overflow: 'hidden' }}>
        <img src={images[0]} alt="foto produk" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
    );
  }

  const arrowBtn = (dir) => ({
    position: 'absolute', top: '50%', transform: 'translateY(-50%)',
    [dir === 'left' ? 'left' : 'right']: 8,
    zIndex: 3,
    background: 'rgba(255,255,255,0.88)',
    border: 'none', borderRadius: '50%',
    width: 28, height: 28,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', fontSize: 15, fontWeight: 700, color: 'var(--ink-900)',
    boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
  });

  return (
    <div style={{ ...style, position: 'relative', overflow: 'hidden' }}
      onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
    >
      {images.map((src, i) => (
        <img key={i} src={src} alt={`foto ${i+1}`} style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          opacity: i === cur ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }} />
      ))}
      {/* arrows */}
      <button style={arrowBtn('left')} onClick={e => { e.stopPropagation(); setCur(c => (c - 1 + total) % total); }}>‹</button>
      <button style={arrowBtn('right')} onClick={e => { e.stopPropagation(); setCur(c => (c + 1) % total); }}>›</button>
      {/* dot indicators */}
      <div style={{ position: 'absolute', bottom: 8, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 5, zIndex: 2 }}>
        {images.map((_, i) => (
          <div key={i} onClick={e => { e.stopPropagation(); setCur(i); }} style={{
            width: i === cur ? 16 : 6, height: 6,
            borderRadius: 999,
            background: i === cur ? 'white' : 'rgba(255,255,255,0.5)',
            transition: 'all 0.3s',
            cursor: 'pointer',
          }} />
        ))}
      </div>
      {/* counter */}
      <div style={{ position: 'absolute', top: 8, right: 10, zIndex: 2, background: 'rgba(0,0,0,0.45)', color: 'white', fontSize: 10, fontFamily: 'var(--font-mono)', padding: '2px 7px', borderRadius: 999 }}>
        {cur + 1}/{total}
      </div>
    </div>
  );
}

function Products({ t, lang }) {
  const [cat, setCat] = React.useState('all');
  const [visible, setVisible] = React.useState(3);
  const cats = lang === 'id' ? CATEGORIES_ID : CATEGORIES_EN;
  const filtered = cat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);
  const isAll = cat === 'all';
  const shown = isAll ? filtered.slice(0, visible) : filtered;
  const hasMore = isAll && visible < filtered.length;

  React.useEffect(() => { setVisible(3); }, [cat]);

  return (
    <section id="products" style={productStyles.wrap}>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">{t('products_eyebrow')}</div>
          <h2 className="h-1" style={{fontFamily: 'system-ui'}}>{t('products_title')}</h2>
          <p className="lead">{t('products_sub')}</p>
        </div>
        <div style={productStyles.tabs}>
          {cats.map(c => (
            <button key={c.id} style={{...productStyles.tab, ...(cat===c.id?productStyles.tabActive:{})}} onClick={() => setCat(c.id)}>
              {c.label}
            </button>
          ))}
        </div>
        <div style={productStyles.grid} className="products-grid">
          {shown.map((p, i) => (
            <div key={i} className="card" style={productStyles.pCard}>
              {p.images
                ? <ProductSlider images={p.images} style={productStyles.pImg} interval={p.interval} />
                : <div className={`ph ${p.tone || ''}`} style={productStyles.pImg}>{(lang === 'id' ? p.name : p.en).toUpperCase()}</div>
              }
              <div style={productStyles.pBody}>
                <div style={productStyles.pName}>{lang === 'id' ? p.name : p.en}</div>
                <div style={{fontSize: 14, color: 'var(--ink-500)'}}>{lang === 'id' ? p.desc : p.en_desc}</div>
                <div style={productStyles.pMeta}>
                  <div>
                    <div style={{fontSize: 10, fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--ink-400)'}}>{p.moq}</div>
                    <div style={productStyles.pPrice}>Rp {p.price}/pc</div>
                  </div>
                  <a href="#contact" style={{fontSize: 12, color: 'var(--ink-700)', textDecoration: 'underline', textUnderlineOffset: 4}}>
                    {t('products_view')} →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        {hasMore && (
          <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            gap: 16, marginTop: 48, flexWrap: 'wrap',
          }}>
            <button
              onClick={() => setVisible(v => v + 3)}
              className="btn btn-ghost"
              style={{minWidth: 200, justifyContent: 'center'}}
            >
              {lang === 'id' ? 'Tampilkan lebih banyak' : 'Show more'}
              <span style={{
                marginLeft: 10,
                fontSize: 11,
                fontFamily: 'var(--font-mono)',
                color: 'var(--ink-500)',
              }}>+{Math.min(3, filtered.length - visible)}</span>
            </button>

            <div style={{
              position: 'relative',
              display: 'inline-flex', alignItems: 'center',
            }}>
              <select
                value=""
                onChange={(e) => {
                  if (e.target.value) setCat(e.target.value);
                }}
                style={{
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  padding: '14px 44px 14px 18px',
                  borderRadius: 999,
                  border: '1px solid var(--ink-200)',
                  background: 'white',
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'var(--ink-900)',
                  cursor: 'pointer',
                  minWidth: 200,
                  fontFamily: 'inherit',
                }}
              >
                <option value="">
                  {lang === 'id' ? 'Lompat ke kategori…' : 'Jump to category…'}
                </option>
                {cats.filter(c => c.id !== 'all').map(c => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
              <span style={{
                position: 'absolute',
                right: 18, top: '50%', transform: 'translateY(-50%)',
                pointerEvents: 'none',
                fontSize: 11,
                fontFamily: 'var(--font-mono)',
                color: 'var(--ink-500)',
              }}>▾</span>
            </div>

            <div style={{
              fontSize: 11, fontFamily: 'var(--font-mono)',
              color: 'var(--ink-400)', letterSpacing: '0.1em',
            }}>
              {visible} / {filtered.length}
            </div>
          </div>
        )}
      </div>

    </section>
  );
}

Object.assign(window, { Products });
