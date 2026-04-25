// about.jsx — About + values section
const aboutStyles = {
  wrap: { padding: '120px 0', background: 'var(--paper-2)' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'flex-start' },
  values: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginTop: 48 },
  valCard: { 
    background: 'white',
    padding: 24,
    borderRadius: 'var(--radius)',
    border: '1px solid var(--ink-200)',
  },
  valNum: {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    color: 'var(--green-600)',
    letterSpacing: '0.1em',
    marginBottom: 12,
  },
  valTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 22,
    marginBottom: 8,
  },
  valDesc: {
    fontSize: 14,
    color: 'var(--ink-500)',
  },
  imageStack: {
    position: 'relative',
    paddingBottom: 60,
  },
  imageMain: { aspectRatio: '4/5', borderRadius: 'var(--radius-lg)' },
  imageOverlay: { 
    position: 'absolute',
    bottom: 0, right: 0,
    width: '55%',
    aspectRatio: '4/3',
    borderRadius: 'var(--radius)',
    border: '6px solid var(--paper-2)',
  },
  badge: {
    position: 'absolute',
    top: 24, left: 24,
    background: 'white',
    padding: '12px 16px',
    borderRadius: 999,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    boxShadow: 'var(--shadow)',
  }
};

function About({ t }) {
  const values = [
    { n: '01', t: t('about_value_1_t'), d: t('about_value_1_d') },
    { n: '02', t: t('about_value_2_t'), d: t('about_value_2_d') },
    { n: '03', t: t('about_value_3_t'), d: t('about_value_3_d') },
    { n: '04', t: t('about_value_4_t'), d: t('about_value_4_d') },
  ];

  return (
    <section id="about" style={aboutStyles.wrap}>
      <div className="container">
        <div style={aboutStyles.grid} className="about-grid">
          <div style={aboutStyles.imageStack}>
            <div className="ph" style={aboutStyles.imageMain}>
              WORKSHOP INTERIOR · WIDE
            </div>
            <div className="ph green" style={aboutStyles.imageOverlay}>
              CLOSE-UP STITCH
            </div>
            <div style={aboutStyles.badge}>
              <div style={{width:36, height:36, borderRadius:'50%', background:'var(--grad-green)', display:'grid', placeItems:'center', color:'white', fontFamily:'var(--font-display)', fontSize: 16}}>25</div>
              <div>
                <div style={{fontSize: 11, color: 'var(--ink-500)', fontFamily: 'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.1em'}}>Tahun</div>
                <div style={{fontSize: 13, fontWeight: 500}}>2000 — 2025</div>
              </div>
            </div>
          </div>
          <div>
            <div className="eyebrow">{t('about_eyebrow')}</div>
            <h2 className="h-1" style={{marginTop: 20, marginBottom: 28, fontFamily: 'system-ui'}}>{t('about_title')}</h2>
            <p style={{marginBottom: 20, color: 'var(--ink-700)', fontSize: 16}}>{t('about_p1')}</p>
            <p style={{color: 'var(--ink-700)', fontSize: 16}}>{t('about_p2')}</p>
            <div style={aboutStyles.values}>
              {values.map(v => (
                <div key={v.n} style={aboutStyles.valCard}>
                  <div style={aboutStyles.valNum}>— {v.n}</div>
                  <div style={aboutStyles.valTitle}>{v.t}</div>
                  <div style={aboutStyles.valDesc}>{v.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { About });
