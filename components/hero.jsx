// hero.jsx — 3 hero variants toggleable via Tweaks
const heroStyles = {
  // Variant A: Editorial split
  splitWrap: { padding: '60px 0 100px', overflow: 'hidden' },
  splitGrid: { display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 64, alignItems: 'center' },
  splitTitle: { marginTop: 28, marginBottom: 28 },
  splitItalic: { fontStyle: 'italic', color: 'var(--green-600)' },
  splitSub: { marginBottom: 36, fontSize: 19 },
  splitCtaRow: { display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' },
  splitMedia: { aspectRatio: '4/5', borderRadius: 'var(--radius-lg)' },

  // Full-bleed
  fullWrap: { padding: '0 0 0', position: 'relative' },
  fullStage: { 
    position: 'relative',
    minHeight: '88vh',
    display: 'flex', alignItems: 'flex-end',
    overflow: 'hidden',
    color: 'white',
  },
  fullBg: { 
    position: 'absolute', inset: 0,
    backgroundImage: 'linear-gradient(180deg, rgba(15,20,17,0) 0%, rgba(15,20,17,0.85) 100%), repeating-linear-gradient(135deg, #1F2622 0, #1F2622 18px, #161B18 18px, #161B18 36px)',
  },
  fullContent: { position: 'relative', padding: '0 0 80px', width: '100%' },
  fullTitle: { color: 'white', maxWidth: '14ch' },
  fullSub: { color: 'rgba(255,255,255,0.75)', marginTop: 24, marginBottom: 36, fontSize: 19 },

  // Catalog grid
  catWrap: { padding: '60px 0 100px' },
  catTop: { display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'end', marginBottom: 48 },
  catGrid: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 },
  catTile: { aspectRatio: '3/4', borderRadius: 'var(--radius)' },
};

function Hero({ variant, t, lang }) {
  if (variant === 'split') return <HeroSplit t={t} />;
  if (variant === 'full') return <HeroFull t={t} />;
  return <HeroCatalog t={t} />;
}

function HeroSplit({ t }) {
  return (
    <section id="home" style={heroStyles.splitWrap}>
      <div className="container">
        <div style={heroStyles.splitGrid} className="hero-split-grid">
          <div>
            <div className="eyebrow">{t('hero_eyebrow')}</div>
            <h1 className="h-display" style={{...heroStyles.splitTitle, fontFamily: 'system-ui'}}>
              {t('hero_title_a')} <em style={heroStyles.splitItalic}>{t('hero_title_b')}</em><br/>
              {t('hero_title_c')}.
            </h1>
            <p className="lead" style={heroStyles.splitSub}>{t('hero_sub')}</p>
            <div style={heroStyles.splitCtaRow}>
              <a href="#contact" className="btn btn-primary">
                {t('hero_cta_primary')}
                <span className="btn-arrow">→</span>
              </a>
              <a href="#products" className="btn btn-ghost">{t('hero_cta_secondary')}</a>
            </div>
            <HeroStats t={t} />
          </div>
          <img src="assets/hero-photo.jpeg" alt="Tim Karmeda" style={{ ...heroStyles.splitMedia, width: '100%', maxWidth: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block' }} />
        </div>
      </div>
    </section>
  );
}

function HeroFull({ t }) {
  return (
    <section id="home" style={heroStyles.fullWrap}>
      <div style={heroStyles.fullStage}>
        <div style={heroStyles.fullBg}>
          <div className="ph dark" style={{position:'absolute', inset: 0, borderRadius: 0, fontSize: 14}}>
            FULL-BLEED HERO PHOTO · WORKSHOP / FACTORY FLOOR
          </div>
          <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(15,20,17,0.3) 0%, rgba(15,20,17,0.85) 100%)'}}/>
        </div>
        <div className="container" style={heroStyles.fullContent}>
          <div className="eyebrow on-dark">{t('hero_eyebrow')}</div>
          <h1 className="h-display" style={{...heroStyles.fullTitle, marginTop: 24}}>
            {t('hero_title_a')} <em style={{color:'var(--green-400)', fontStyle:'italic'}}>{t('hero_title_b')}</em> {t('hero_title_c')}.
          </h1>
          <p className="lead" style={heroStyles.fullSub}>{t('hero_sub')}</p>
          <div style={heroStyles.splitCtaRow}>
            <a href="#contact" className="btn btn-green">
              {t('hero_cta_primary')}
              <span className="btn-arrow" style={{background:'rgba(255,255,255,0.2)'}}>→</span>
            </a>
            <a href="#products" className="btn btn-ghost on-dark">{t('hero_cta_secondary')}</a>
          </div>
        </div>
      </div>
      <div style={{background: 'var(--ink-900)', color:'white', padding: '32px 0', borderTop: '1px solid #2a3230'}}>
        <div className="container">
          <HeroStats t={t} dark />
        </div>
      </div>
    </section>
  );
}

function HeroCatalog({ t }) {
  return (
    <section id="home" style={heroStyles.catWrap}>
      <div className="container">
        <div style={heroStyles.catTop} className="hero-cat-top">
          <div>
            <div className="eyebrow">{t('hero_eyebrow')}</div>
            <h1 className="h-display" style={{marginTop: 20, maxWidth: '14ch'}}>
              {t('hero_title_a')} <em style={{color:'var(--green-600)', fontStyle:'italic'}}>{t('hero_title_b')}</em> {t('hero_title_c')}.
            </h1>
          </div>
          <div style={{maxWidth: 360}}>
            <p style={{color:'var(--ink-700)', marginBottom: 24}}>{t('hero_sub')}</p>
            <div style={heroStyles.splitCtaRow}>
              <a href="#contact" className="btn btn-primary">
                {t('hero_cta_primary')}
                <span className="btn-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
        <div style={heroStyles.catGrid} className="hero-cat-grid">
          <div className="ph green" style={heroStyles.catTile}>
            CORPORATE
          </div>
          <div className="ph" style={heroStyles.catTile}>SCHOOL</div>
          <div className="ph dark" style={heroStyles.catTile}>WORKWEAR</div>
          <div className="ph" style={heroStyles.catTile}>MEDICAL</div>
          <div className="ph" style={heroStyles.catTile}>F&B</div>
        </div>
        <div style={{marginTop: 56}}>
          <HeroStats t={t} />
        </div>
      </div>
    </section>
  );
}

function HeroStats({ t, dark }) {
  const stats = [
    { n: '20+', l: t('stat_years') },
    { n: '50', l: t('stat_employees') },
    { n: '200+', l: t('stat_clients') },
    { n: '15K', l: t('stat_pieces') },
  ];
  return (
    <div className="hero-stats-grid" style={{
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24,
      marginTop: 56,
      paddingTop: 32,
      borderTop: dark ? '1px solid #2a3230' : '1px solid var(--ink-200)',
    }}>
      {stats.map((s, i) => (
        <div key={i}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 56px)',
            lineHeight: 1,
            color: dark ? 'var(--green-400)' : 'var(--green-600)',
          }}>{s.n}</div>
          <div style={{
            marginTop: 8,
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: dark ? 'var(--ink-400)' : 'var(--ink-500)',
          }}>{s.l}</div>
        </div>
      ))}
    </div>
  );
}

// Marquee
function Marquee({ t }) {
  const trackRef = React.useRef(null);
  const isDragging = React.useRef(false);
  const startX = React.useRef(0);
  const scrollLeft = React.useRef(0);
  const animPaused = React.useRef(false);

  function pauseAnim() {
    if (trackRef.current && !animPaused.current) {
      trackRef.current.style.animationPlayState = 'paused';
      animPaused.current = true;
    }
  }
  function resumeAnim() {
    if (trackRef.current) {
      trackRef.current.style.animationPlayState = 'running';
      animPaused.current = false;
    }
  }

  function onPointerDown(e) {
    isDragging.current = true;
    startX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    scrollLeft.current = trackRef.current.parentElement.scrollLeft;
    pauseAnim();
    e.currentTarget.setPointerCapture && e.currentTarget.setPointerCapture(e.pointerId);
  }
  function onPointerMove(e) {
    if (!isDragging.current) return;
    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const diff = startX.current - x;
    trackRef.current.parentElement.scrollLeft = scrollLeft.current + diff;
  }
  function onPointerUp() {
    isDragging.current = false;
    resumeAnim();
  }

  const items = t('marquee').split(' · ');

  return (
    <div
      style={{
        background: 'var(--ink-900)',
        color: 'var(--paper)',
        padding: '20px 0',
        overflowX: 'scroll',
        overflowY: 'hidden',
        borderTop: '1px solid var(--ink-700)',
        borderBottom: '1px solid var(--ink-700)',
        cursor: 'grab',
        userSelect: 'none',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <style>{`.marquee-track::-webkit-scrollbar { display: none; }`}</style>
      <div
        ref={trackRef}
        className="marquee-track"
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          animation: 'scroll-left 40s linear infinite',
          gap: 64,
        }}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} style={{ display: 'flex', gap: 64, fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.1em', color: 'var(--green-200)' }}>
            {items.map((w, j) => (
              <a key={j} href="#products" style={{ color: 'var(--green-200)', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => e.target.style.color = 'var(--green-400)'}
                onMouseLeave={e => e.target.style.color = 'var(--green-200)'}
              >
                {w}<span style={{ color: 'var(--ink-500)', marginLeft: 64 }}>◆</span>
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Hero, Marquee, HeroStats });
