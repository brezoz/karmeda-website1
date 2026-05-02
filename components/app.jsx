// app.jsx — Root composition + Tweaks panel
const TWEAK_DEFAULS = /*EDITMODE-BEGIN*/{
  "heroVariant": "split",
  "primaryColor": "#36B54C",
  "accent": "warm",
  "darkMode": false
}/*EDITMODE-END*/;

function App() {
  const [lang, setLang] = React.useState(() => localStorage.getItem('km_lang') || 'id');
  const [tweaks, setTweaks] = React.useState(TWEAK_DEFAULS);
  const [tweaksOpen, setTweaksOpen] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);

  const t = (key) => {
    const val = window.I18N[lang][key];
    return val !== undefined ? val : key;
  };

  React.useEffect(() => { localStorage.setItem('km_lang', lang); }, [lang]);

  // Apply primary color
  React.useEffect(() => {
    const c = tweaks.primaryColor;
    document.documentElement.style.setProperty('--green-500', c);
    // derive light/dark variants by mixing
    const mix = (hex, mix) => {
      const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
      const mr = Math.round(r + (255-r)*mix), mg = Math.round(g + (255-g)*mix), mb = Math.round(b + (255-b)*mix);
      return `rgb(${mr},${mg},${mb})`;
    };
    const dark = (hex, mix) => {
      const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
      return `rgb(${Math.round(r*(1-mix))},${Math.round(g*(1-mix))},${Math.round(b*(1-mix))})`;
    };
    document.documentElement.style.setProperty('--green-50', mix(c, 0.92));
    document.documentElement.style.setProperty('--green-100', mix(c, 0.78));
    document.documentElement.style.setProperty('--green-200', mix(c, 0.55));
    document.documentElement.style.setProperty('--green-400', mix(c, 0.18));
    document.documentElement.style.setProperty('--green-600', dark(c, 0.18));
    document.documentElement.style.setProperty('--green-700', dark(c, 0.35));
  }, [tweaks.primaryColor]);

  // Edit mode protocol — DISABLED (Tweaks toggle hidden from toolbar)
  // React.useEffect(() => {
  //   const handler = (e) => {
  //     if (e.data?.type === '__activate_edit_mode') { setEditMode(true); setTweaksOpen(true); }
  //     if (e.data?.type === '__deactivate_edit_mode') { setEditMode(false); setTweaksOpen(false); }
  //   };
  //   window.addEventListener('message', handler);
  //   window.parent.postMessage({type: '__edit_mode_available'}, '*');
  //   return () => window.removeEventListener('message', handler);
  // }, []);

  const updateTweak = (key, val) => {
    const next = {...tweaks, [key]: val};
    setTweaks(next);
    window.parent.postMessage({type: '__edit_mode_set_keys', edits: {[key]: val}}, '*');
  };

  return (
    <>
      <Nav lang={lang} setLang={setLang} t={t}/>
      <Hero variant={tweaks.heroVariant} t={t} lang={lang}/>
      <Marquee t={t}/>
      <About t={t}/>
      <Process t={t}/>
      <Portfolio t={t} lang={lang}/>
      <Products t={t} lang={lang}/>
      <Calculator t={t} lang={lang}/>
      <Measurement t={t} lang={lang}/>
      <Blog t={t} lang={lang}/>
      <FAQ t={t} lang={lang}/>
      <Contact t={t} lang={lang}/>
      <Footer t={t}/>

      {/* WhatsApp float */}
      <a href={`https://wa.me/628170012500?text=${encodeURIComponent('Halo pak Marchel - PT. Karmeda saya dapat info dari Web, mau tanya tentang seragam ............')}`} target="_blank" rel="noreferrer" className="wa-float">
        <svg viewBox="0 0 24 24" fill="white"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.4-.3.3-1 .9-1 2.3 0 1.4 1 2.7 1.2 2.9.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3z"/><path d="M12 2C6.5 2 2 6.5 2 12c0 1.7.5 3.4 1.3 4.8L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.2.8.9-3.1-.2-.3C4.4 14.7 4 13.4 4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8z"/></svg>
        Chat
      </a>

      {/* Tweaks panel */}
      <div className={`tweaks ${tweaksOpen ? 'open' : ''}`}>
        <h4>Tweaks</h4>
        <div className="row">
          <label>Hero layout</label>
          <div className="seg">
            {[['split','Editorial'],['full','Full-bleed'],['catalog','Katalog']].map(([k,l])=>(
              <button key={k} className={tweaks.heroVariant===k?'active':''} onClick={()=>updateTweak('heroVariant', k)}>{l}</button>
            ))}
          </div>
        </div>
        <div className="row">
          <label>Warna brand</label>
          <input type="color" value={tweaks.primaryColor} onChange={e=>updateTweak('primaryColor', e.target.value)}/>
        </div>
        <div className="row">
          <label>Preset cepat</label>
          <div className="seg" style={{flexWrap:'wrap'}}>
            {[['#36B54C','Hijau'],['#1E63D9','Biru'],['#CC2E2E','Merah'],['#0F1411','Hitam']].map(([c,l])=>(
              <button key={c} className={tweaks.primaryColor===c?'active':''} onClick={()=>updateTweak('primaryColor', c)} style={{display:'flex', alignItems:'center', gap:6}}>
                <span style={{width:10, height:10, borderRadius:'50%', background:c, border: '1px solid rgba(255,255,255,0.2)'}}/>
                {l}
              </button>
            ))}
          </div>
        </div>
        <div style={{fontSize: 10, color: 'var(--ink-400)', marginTop: 8, fontFamily: 'var(--font-mono)'}}>
          Toggle Tweaks dari toolbar atas
        </div>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
