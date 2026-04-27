// process.jsx — Production process steps + Portfolio
const processStyles = {
  wrap: { padding: '120px 0', background: 'var(--ink-900)', color: 'var(--paper)' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 56 },
  step: {
    padding: 32,
    background: '#1A201C',
    border: '1px solid #2A3230',
    borderRadius: 'var(--radius)',
    display: 'flex',
    gap: 24,
    transition: 'all 0.2s'
  },
  stepNum: {
    fontFamily: 'var(--font-display)',
    fontSize: 56,
    color: 'var(--green-400)',
    lineHeight: 1,
    flexShrink: 0,
    width: 64
  },
  stepTitle: { fontFamily: 'var(--font-display)', fontSize: 26, marginBottom: 8 },
  stepDesc: { fontSize: 14, color: 'var(--ink-300)' }
};

function Process({ t }) {
  const steps = t('process_steps');
  return (
    <section id="process" style={processStyles.wrap}>
      <div className="container">
        <div className="section-head">
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
    height: 120,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
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
              ? <img src={c.logo} alt={c.label} style={{ maxWidth: '100%', maxHeight: 88, objectFit: 'contain', display: 'block' }} />
              : c}
          </div>
          )}
        </div>
        <div style={portfolioStyles.caseGrid} className="case-grid">
          {CASES.map((c, i) =>
          <div key={i} className="card" style={portfolioStyles.caseCard}>
              <div className={`ph ${c.tone || ''}`} style={{ ...(c.tall ? portfolioStyles.caseImgTall : portfolioStyles.caseImg), backgroundSize: "cover" }}>
                {c.client.toUpperCase()}
              </div>
              <div style={portfolioStyles.caseBody}>
                <div className="pill" style={{ marginBottom: 12 }}><span className="dot" />{c.tag}</div>
                <div style={portfolioStyles.caseTitle}>{c.client}</div>
                <div style={{ fontSize: 14, color: 'var(--ink-500)', marginBottom: 14 }}>{c.what}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--green-700)' }}>{c.n} delivered</div>
              </div>
            </div>
          )}
        </div>
        <div style={portfolioStyles.testimonial} className="testimonial">
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, lineHeight: 1.2, color: 'var(--ink-900)' }}>
              <em style={{ color: 'var(--green-600)' }}>"</em>
              {lang === 'id' ?
              'Karmeda mengantarkan 1.200 wearpack tepat waktu untuk launching pabrik baru kami. Quality control mereka rapi — zero reject batch.' :
              'Karmeda delivered 1,200 wearpack on time for our new factory launch. Their QC is tight — zero reject batch.'
              }
              <em style={{ color: 'var(--green-600)' }}>"</em>
            </div>
            <div style={{ marginTop: 24, fontSize: 13, color: 'var(--ink-500)' }}>
              <div style={{ fontWeight: 600, color: 'var(--ink-900)', marginBottom: 2 }}>Budi Santoso</div>
              Procurement Manager · PT. ORANG TUA GROUP
            </div>
          </div>
          <a href="#portfolio" className="btn btn-primary" style={{ flexShrink: 0 }}>
            {t('portfolio_view_all')}
            <span className="btn-arrow">→</span>
          </a>
        </div>
      </div>
    </section>);

}

Object.assign(window, { Process, Portfolio });