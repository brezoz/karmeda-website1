// nav.jsx — Header with bilingual + logo
import React from 'react'
function Logo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="lg1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5FD672"/>
          <stop offset="100%" stopColor="#1F7A2E"/>
        </linearGradient>
      </defs>
      <path d="M22 78 L42 28 L62 78 Z" fill="url(#lg1)" stroke="white" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M38 78 L58 28 L78 78 Z" fill="url(#lg1)" opacity="0.85" stroke="white" strokeWidth="3" strokeLinejoin="round"/>
    </svg>
  );
}

function Nav({ lang, setLang, t }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState('home');
  const shortcutsRef = React.useRef(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // IntersectionObserver — no offsetTop reads, zero forced reflow
  React.useEffect(() => {
    const ids = ['home', 'about', 'products', 'process', 'portfolio', 'calculator', 'blog', 'faq', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the topmost intersecting section
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: '-10% 0px -80% 0px', threshold: 0 }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Auto-scroll shortcut bar — batched in rAF to avoid forced layout
  React.useEffect(() => {
    if (!shortcutsRef.current) return;
    const rafId = requestAnimationFrame(() => {
      const activeBtn = shortcutsRef.current?.querySelector('.nav-shortcut-btn.active');
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });
    return () => cancelAnimationFrame(rafId);
  }, [active]);

  const links = [
    { id: 'about', label: t('nav_about') },
    { id: 'products', label: t('nav_products') },
    { id: 'process', label: t('nav_process') },
    { id: 'portfolio', label: t('nav_portfolio') },
    { id: 'calculator', label: t('nav_calculator') },
    { id: 'blog', label: t('nav_blog') },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: t('nav_contact') },
  ];

  return (
    <div className={`nav-wrap ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav">
        <a href="#home" className="brand">
          <img src="assets/logo-karmeda-small.webp" alt="Karmeda" className="nav-logo" width="44" height="44" style={{ height: 44, width: 44, objectFit: 'contain' }} />
          <div>
            <div className="brand-name" style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em' }}>PT. KARMEDA</div>
            <div className="brand-sub nav-sub-hide">Karuna Metta Ananda</div>
          </div>
        </a>
        <nav className="nav-links">
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`} className={active === l.id ? 'active' : ''}>{l.label}</a>
          ))}
        </nav>
        <div className="nav-right">
          <div className="lang-toggle">
            <button aria-label="Bahasa Indonesia" className={lang === 'id' ? 'active' : ''} onClick={() => setLang('id')}>ID</button>
            <button aria-label="English" className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
          </div>
          <a href="#contact" className="btn btn-primary nav-cta" style={{padding: '10px 16px', fontSize: 13}}>
            <span className="nav-cta-full">{t('nav_cta')}</span>
            <span className="nav-cta-short">Penawaran</span>
            <span className="btn-arrow">→</span>
          </a>
        </div>
      </div>

      {/* Mobile shortcut bar — horizontal scroll chips, hidden on desktop */}
      <div className="nav-shortcuts" ref={shortcutsRef}>
        {links.map(l => (
          <a key={l.id} href={`#${l.id}`} className={`nav-shortcut-btn${active === l.id ? ' active' : ''}`}>
            {l.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export { Logo };
export default Nav;
