// process.jsx — Production process steps + Portfolio
const processStyles = {
  wrap: { padding: '64px 0', background: 'var(--ink-900)', color: 'var(--paper)' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 32 },
  step: {
    padding: '20px 24px',
    background: '#1A201C',
    border: '1px solid #2A3230',
    borderRadius: 'var(--radius)',
    display: 'flex',
    gap: 16,
    transition: 'all 0.2s'
  },
  stepNum: {
    fontFamily: 'var(--font-display)',
    fontSize: 40,
    color: 'var(--green-400)',
    lineHeight: 1,
    flexShrink: 0,
    width: 48
  },
  stepTitle: { fontFamily: 'var(--font-display)', fontSize: 22, marginBottom: 4 },
  stepDesc: { fontSize: 13, color: 'var(--ink-300)' }
};

function Process({ t }) {
  const steps = t('process_steps');
  return (
    <section id="process" style={processStyles.wrap}>
      <div className="container">
        <div className="section-head" style={{ marginBottom: 0 }}>
          <div className="eyebrow on-dark">{t('process_eyebrow')}</div>
          <h2 className="h-1" style={{ color: 'white' }}>{t('process_title')}</h2>
        </div>
        <div style={processStyles.grid} className="process-grid">
          {steps.map((s, i) =>
          <div key={i} style={processStyles.step}>
              <div style={processStyles.stepNum}>{String(i + 1).padStart(2, '0')}</div>
              <div>
                <div style={processStyles.stepTitle}>{s.t}</div>
                <div style={processStyles.stepDesc}>{s.d}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

const portfolioStyles = {
  wrap: { padding: '120px 0' },
  clientGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: 1,
    background: 'var(--ink-200)',
    border: '1px solid var(--ink-200)',
    borderRadius: 'var(--radius)',
    overflow: 'hidden',
    marginTop: 56
  },
  clientCell: {
    background: 'white',
    width: '100%',
    height: 160,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    boxSizing: 'border-box',
    border: '1px solid var(--ink-100)',
    borderRadius: 8,
    transition: 'all 0.2s'
  },
  caseGrid: { display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 20, marginTop: 80 },
  caseCard: { background: 'white', borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--ink-200)' },
  caseImg: { aspectRatio: '4/3', borderRadius: 0 },
  caseImgTall: { aspectRatio: '4/5', borderRadius: 0 },
  caseBody: { padding: 24 },
  caseTitle: { fontFamily: 'var(--font-display)', fontSize: 24, marginBottom: 8 },
  testimonial: {
    background: 'var(--paper-2)',
    padding: 48,
    borderRadius: 'var(--radius-lg)',
    marginTop: 80,
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: 48,
    alignItems: 'center'
  }
};

const CLIENTS = [
{ label: 'Orang Tua Group', logo: 'assets/Logo-Orang-Tua.png' },
{ label: 'Astra Group', logo: 'assets/images.png' },
{ label: 'Bank Mandiri', logo: 'assets/bank-mandiri.png' },
{ label: 'BPJS', logo: 'assets/Logo-Adaro-Andalan-Indonesia-Color.png' },
{ label: 'Pertamina', logo: 'assets/pt_aplus_pacific_logo.png' },
{ label: 'PLN', logo: 'assets/Andhana-Kirana-Yasa-16Feb.png' },
{ label: 'RS Premier', logo: 'assets/images (2).png' },
{ label: 'SMA Tarakanita', logo: 'assets/unnamed.png' },
{ label: 'Universitas Pelita', logo: 'assets/olamindonesia_logo.png' },
{ label: 'Telkom', logo: 'assets/images (1).png' },
{ label: 'Indofood', logo: 'assets/LOGO+FORMULA.png' },
{ label: 'Garuda', logo: 'assets/Logo_Wafer_Tango.png' }];

const CASES = [
{ client: 'Bank Mandiri Cabang Tangerang', n: '320 pcs', what: 'PDH + Polo · Bordir custom logo divisi', tag: 'Korporat', tone: 'green' },
{ client: 'RS Premier Bintaro', n: '180 pcs', what: 'Scrub suit + lab coat 3 divisi', tag: 'Medis' },
{ client: 'Astra Workshop Group', n: '450 pcs', what: 'Wearpack heavy-duty multi-pocket', tag: 'Industri', tone: 'dark' }];


function Portfolio({ t, lang }) {
  return (
    <section id="portfolio" style={portfolioStyles.wrap}>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">{t('portfolio_eyebrow')}</div>
          <h2 className="h-1">{t('portfolio_title')}</h2>
        </div>
        <div style={portfolioStyles.clientGrid} className="client-grid">
          {CLIENTS.map((c, i) =>
          <div key={i} style={portfolioStyles.clientCell}>
            {typeof c === 'object' && c.logo
              ? <img src={c.logo} alt={c.label} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
              : c}
          </div>
          )}
        </div>
        <div style={portfolioStyles.caseGrid} className="case-grid">
          {[]}
        </div>

        {/* Testimoni Slider */}
        <TestiSlider lang={lang} />

      </div>
    </section>);

}

const TESTIMONI = [
  { quote: 'Sudah 3 tahun kami pakai Karmeda untuk seragam karyawan. Kualitasnya konsisten, jahitannya kuat, dan tim mereka responsif banget kalau ada revisi.', name: 'Dewi Hartanti', role: 'HRD Manager', company: 'Modernland Tbk' },
  { quote: 'Karmeda bantu kami bikin seragam guru dan staf sekolah dengan desain yang elegan. Tepat waktu, bahan nyaman dipakai seharian, dan harganya masuk akal.', name: 'Pak Suherman', role: 'Kepala Sekolah', company: 'Sekolah Harapan Bangsa' },
  { quote: 'Pesanan 800 pcs selesai lebih cepat dari jadwal. Quality control-nya ketat, dari 800 pcs tidak ada satu pun yang reject. Kami sangat puas.', name: 'Rina Kusumawati', role: 'Procurement Officer', company: 'UPP (Orang Tua Group)' },
  { quote: 'Kami butuh seragam pabrik yang tahan lama dan nyaman untuk shift panjang. Karmeda kasih solusi bahan yang pas, dan pengiriman tepat waktu.', name: 'Agus Firmansyah', role: 'GA Manager', company: 'BT Cocoa' },
  { quote: 'Komunikasi lancar dari awal sampai selesai. Sampelnya langsung oke di percobaan pertama, jadi tidak perlu bolak-balik revisi. Hemat waktu banget.', name: 'Sari Nuraini', role: 'Admin & Procurement', company: 'AKY' },
  { quote: 'Sudah coba beberapa vendor sebelumnya, tapi Karmeda yang paling detail dalam memahami kebutuhan kami. Hasilnya rapi dan sesuai standar perusahaan.', name: 'Budi Prasetyo', role: 'Purchasing Manager', company: 'Aplus' },
  { quote: 'Seragam untuk tim outlet kami dibuat Karmeda — hasilnya profesional, karyawan senang pakainya, dan pelanggan pun berikan komentar positif soal penampilan tim kami.', name: 'Linda Setiawati', role: 'Operations Supervisor', company: 'Lotte' },
  { quote: 'Karmeda mengerti standar seragam medis dengan baik. Bahan yang dipilih breathable dan mudah dicuci, sangat cocok untuk kebutuhan rumah sakit kami.', name: 'dr. Mira Anggraeni', role: 'Kepala Keperawatan', company: 'RS MZ' },
  { quote: 'Harga bersaing tapi kualitas tidak murahan. Untuk perusahaan kami yang pesan rutin tiap semester, Karmeda jadi mitra yang bisa diandalkan.', name: 'Hendro Santoso', role: 'Direktur Operasional', company: 'Modernland Tbk' },
  { quote: 'Proses dari desain sampai terima barang sangat smooth. Tim Karmeda proaktif kasih update, jadi kami tidak perlu terus-terus tanya progress pesanan.', name: 'Yuliana Putri', role: 'Finance & GA', company: 'Lotte' },
];

function TestiSlider({ lang }) {
  const [cur, setCur] = React.useState(0);
  const total = TESTIMONI.length;
  const touchStart = React.useRef(null);

  React.useEffect(() => {
    const t = setInterval(() => setCur(c => (c + 1) % total), 4000);
    return () => clearInterval(t);
  }, []);

  function onTouchStart(e) { touchStart.current = e.touches[0].clientX; }
  function onTouchEnd(e) {
    if (!touchStart.current) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (diff > 40) setCur(c => (c + 1) % total);
    else if (diff < -40) setCur(c => (c - 1 + total) % total);
    touchStart.current = null;
  }

  const testi = TESTIMONI[cur];

  return (
    <div style={{ marginTop: 64 }} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div style={{
        background: 'var(--paper-2)', padding: '48px 48px 36px', borderRadius: 'var(--radius-lg)',
        position: 'relative', overflow: 'hidden', minHeight: 200,
      }}>
        {/* Quote */}
        <div style={{ fontSize: 22, lineHeight: 1.55, color: 'var(--ink-900)', fontStyle: 'italic', maxWidth: '80%' }}>
          <em style={{ color: 'var(--green-500)', fontSize: 32, fontStyle: 'normal' }}>"</em>
          {testi.quote}
          <em style={{ color: 'var(--green-500)', fontSize: 32, fontStyle: 'normal' }}>"</em>
        </div>
        {/* Author */}
        <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--ink-900)', fontSize: 15 }}>{testi.name}</div>
            <div style={{ fontSize: 13, color: 'var(--ink-500)', marginTop: 2 }}>{testi.role} · {testi.company}</div>
          </div>
          <a href="#contact" className="btn btn-primary" style={{ flexShrink: 0, fontSize: 13, padding: '10px 18px' }}>
            {lang === 'id' ? 'Minta Penawaran' : 'Get a Quote'}
            <span className="btn-arrow">→</span>
          </a>
        </div>
        {/* Nav arrows */}
        <button onClick={() => setCur(c => (c - 1 + total) % total)} style={{
          position: 'absolute', top: 20, right: 56,
          background: 'white', border: '1px solid var(--ink-200)', borderRadius: '50%',
          width: 32, height: 32, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>‹</button>
        <button onClick={() => setCur(c => (c + 1) % total)} style={{
          position: 'absolute', top: 20, right: 16,
          background: 'white', border: '1px solid var(--ink-200)', borderRadius: '50%',
          width: 32, height: 32, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>›</button>
      </div>
      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 16 }}>
        {TESTIMONI.map((_, i) => (
          <button key={i} onClick={() => setCur(i)} style={{
            width: i === cur ? 20 : 7, height: 7, borderRadius: 999, border: 'none', cursor: 'pointer', padding: 0,
            background: i === cur ? 'var(--green-500)' : 'var(--ink-200)',
            transition: 'all 0.3s',
          }} />
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Process, Portfolio });