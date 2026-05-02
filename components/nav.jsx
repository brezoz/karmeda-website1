// nav.jsx — Header with bilingual + logo
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

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    const ids = ['home', 'about', 'products', 'process', 'portfolio', 'calculator', 'blog', 'faq', 'contact'];
    const onScroll = () => {
      const y = window.scrollY + 120;
      let cur = 'home';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) cur = id;
      }
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
          <img src="assets/logo-karmeda.png" alt="Karmeda" className="nav-logo" style={{ height: 44, width: 44, objectFit: 'contain', borderRadius: 8 }} />
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
            <button className={lang === 'id' ? 'active' : ''} onClick={() => setLang('id')}>ID</button>
            <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
          </div>
          <a href="#contact" className="btn btn-primary nav-cta" style={{padding: '10px 16px', fontSize: 13}}>
            <span className="nav-cta-full">{t('nav_cta')}</span>
            <span className="nav-cta-short">Penawaran</span>
            <span className="btn-arrow">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Nav, Logo });
