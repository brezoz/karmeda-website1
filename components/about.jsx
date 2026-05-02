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
    zIndex: 10,
    background: 'white',
    padding: '12px 16px',
    borderRadius: 999,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    boxShadow: 'var(--shadow)',
  }
};

const WORKSHOP_PHOTOS = [
  'assets/garmen1.jpg',
  'assets/garmen2.jpg',
  'assets/garment3.jpg',
];

function WorkshopSlider() {
  const [current, setCurrent] = React.useState(0);
  const total = WORKSHOP_PHOTOS.length;

  React.useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % total), 3500);
    return () => clearInterval(timer);
  }, []);

  // touch swipe
  const touchStart = React.useRef(null);
  function onTouchStart(e) { touchStart.current = e.touches[0].clientX; }
  function onTouchEnd(e) {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (diff > 40) setCurrent(c => (c + 1) % total);
    else if (diff < -40) setCurrent(c => (c - 1 + total) % total);
    touchStart.current = null;
  }

  return (
    <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', aspectRatio: '4/5' }}
      onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      {WORKSHOP_PHOTOS.map((src, i) => (
        <img key={i} src={src} alt={`Workshop ${i+1}`} style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          opacity: i === current ? 1 : 0,
          transition: 'opacity 0.7s ease',
        }} />
      ))}
      {/* Instagram-style dot indicators */}
      <div style={{
        position: 'absolute', bottom: 14, left: 0, right: 0,
        display: 'flex', justifyContent: 'center', gap: 6,
      }}>
        {WORKSHOP_PHOTOS.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} style={{
            width: i === current ? 20 : 7,
            height: 7,
            borderRadius: 999,
            background: i === current ? 'white' : 'rgba(255,255,255,0.5)',
            border: 'none', cursor: 'pointer', padding: 0,
            transition: 'all 0.3s ease',
          }} />
        ))}
      </div>
      {/* Prev / Next arrows */}
      <button onClick={() => setCurrent(c => (c - 1 + total) % total)} style={{
        position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
        background: 'rgba(255,255,255,0.85)', border: 'none', borderRadius: '50%',
        width: 32, height: 32, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>‹</button>
      <button onClick={() => setCurrent(c => (c + 1) % total)} style={{
        position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
        background: 'rgba(255,255,255,0.85)', border: 'none', borderRadius: '50%',
        width: 32, height: 32, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>›</button>
    </div>
  );
}

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
            <WorkshopSlider />
            <div style={aboutStyles.badge}>
              <div style={{width:36, height:36, borderRadius:'50%', background:'var(--grad-green)', display:'grid', placeItems:'center', color:'white', fontFamily:'var(--font-display)', fontSize: 16}}>20</div>
              <div>
                <div style={{fontSize: 11, color: 'var(--ink-500)', fontFamily: 'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.1em'}}>Tahun</div>
                <div style={{fontSize: 13, fontWeight: 500}}>2000 — 2020</div>
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
