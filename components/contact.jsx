// contact.jsx — RFQ form + Footer
const contactStyles = {
  wrap: { padding: '120px 0', background: 'var(--ink-900)', color: 'var(--paper)' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80, alignItems: 'flex-start' },
  form: { background: '#1A201C', borderRadius: 'var(--radius-lg)', padding: '28px 32px', border: '1px solid #2A3230' },
  row: { display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 },
  label: { fontSize: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-400)' },
  input: { padding: '10px 12px', background: 'var(--ink-900)', border: '1px solid #2A3230', borderRadius: 6, color: 'white', fontSize: 14 },
  twoCol: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  contactCard: {
    background: '#1A201C',
    border: '1px solid #2A3230',
    borderRadius: 'var(--radius)',
    padding: 24,
    display: 'flex', alignItems: 'center', gap: 16,
    transition: 'all 0.15s',
  },
  iconCircle: {
    width: 48, height: 48, borderRadius: '50%',
    background: 'var(--green-700)',
    display: 'grid', placeItems: 'center',
    flexShrink: 0,
  },
};

function Contact({ t, lang }) {
  const [sent, setSent] = React.useState(false);
  const [form, setForm] = React.useState({ name:'', company:'', email:'', phone:'', type:'', qty:'', deadline:'', message:'' });

  const submit = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Halo Karmeda, RFQ baru:\n\n` +
      `Nama: ${form.name}\nPerusahaan: ${form.company}\nEmail: ${form.email}\nWA: ${form.phone}\n` +
      `Jenis: ${form.type}\nQty: ${form.qty}\nDeadline: ${form.deadline}\n\nDetail:\n${form.message}`
    );
    window.open(`https://wa.me/628170012500?text=${text}`, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" style={contactStyles.wrap}>
      <div className="container">
        <div style={contactStyles.grid} className="contact-grid">
          <div>
            <div className="eyebrow on-dark">{t('rfq_eyebrow')}</div>
            <h2 className="h-1" style={{color:'white', marginTop: 20, marginBottom: 20}}>{t('rfq_title')}</h2>
            <p style={{color:'var(--ink-300)', marginBottom: 40, fontSize: 17}}>{t('rfq_sub')}</p>
            
            <div style={{display:'flex', flexDirection:'column', gap: 12}}>
              <a href={`https://wa.me/628170012500?text=${encodeURIComponent('Halo pak Marchel - PT. Karmeda saya dapat info dari Web, mau tanya tentang seragam ............')}`} target="_blank" rel="noreferrer" style={contactStyles.contactCard}>
                <div style={{...contactStyles.iconCircle, background: '#25D366'}}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.4-.3.3-1 .9-1 2.3 0 1.4 1 2.7 1.2 2.9.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3z"/><path d="M12 2C6.5 2 2 6.5 2 12c0 1.7.5 3.4 1.3 4.8L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.2.8.9-3.1-.2-.3C4.4 14.7 4 13.4 4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8z"/></svg>
                </div>
                <div>
                  <div style={{fontSize: 11, color: 'var(--ink-400)', fontFamily: 'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.1em'}}>WhatsApp</div>
                  <div style={{fontSize: 17, fontWeight: 500, marginTop: 2}}>+62 817-001-2500</div>
                </div>
              </a>
              <a href="mailto:marchel.adisastra@gmail.com" style={contactStyles.contactCard}>
                <div style={contactStyles.iconCircle}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
                </div>
                <div>
                  <div style={{fontSize: 11, color: 'var(--ink-400)', fontFamily: 'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.1em'}}>Email</div>
                  <div style={{fontSize: 15, fontWeight: 500, marginTop: 2, wordBreak: 'break-all'}}>marchel.adisastra@gmail.com</div>
                </div>
              </a>
              <a href="https://www.instagram.com/karmeda_seragam/" target="_blank" rel="noreferrer" style={contactStyles.contactCard}>
                <div style={contactStyles.iconCircle}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="white"/></svg>
                </div>
                <div>
                  <div style={{fontSize: 11, color: 'var(--ink-400)', fontFamily: 'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.1em'}}>Instagram</div>
                  <div style={{fontSize: 17, fontWeight: 500, marginTop: 2}}>@karmeda_seragam</div>
                </div>
              </a>
              <div style={contactStyles.contactCard}>
                <div style={contactStyles.iconCircle}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                </div>
                <div>
                  <div style={{fontSize: 11, color: 'var(--ink-400)', fontFamily: 'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.1em'}}>Workshop</div>
                  <div style={{fontSize: 17, fontWeight: 500, marginTop: 2}}>Tangerang, Banten</div>
                </div>
              </div>
            </div>
          </div>

          <form style={contactStyles.form} onSubmit={submit}>
            <div style={contactStyles.twoCol}>
              <div style={contactStyles.row}>
                <div style={contactStyles.label}>{t('rfq_name')}</div>
                <input style={contactStyles.input} required value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
              </div>
              <div style={contactStyles.row}>
                <div style={contactStyles.label}>{t('rfq_company')}</div>
                <input style={contactStyles.input} required value={form.company} onChange={e=>setForm({...form, company:e.target.value})}/>
              </div>
            </div>
            <div style={contactStyles.twoCol}>
              <div style={contactStyles.row}>
                <div style={contactStyles.label}>{t('rfq_email')}</div>
                <input type="email" style={contactStyles.input} required value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
              </div>
              <div style={contactStyles.row}>
                <div style={contactStyles.label}>{t('rfq_phone')}</div>
                <input style={contactStyles.input} required placeholder="+62" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})}/>
              </div>
            </div>
            <div style={contactStyles.twoCol}>
              <div style={contactStyles.row}>
                <div style={contactStyles.label}>{t('rfq_type')}</div>
                <select style={contactStyles.input} value={form.type} onChange={e=>setForm({...form, type:e.target.value})}>
                  <option value="">—</option>
                  <option>PDH / PDL</option>
                  <option>Polo Shirt</option>
                  <option>Wearpack</option>
                  <option>Sekolah / Almamater</option>
                  <option>Medis</option>
                  <option>F&B / Hospitality</option>
                </select>
              </div>
              <div style={contactStyles.row}>
                <div style={contactStyles.label}>{t('rfq_qty')}</div>
                <input style={contactStyles.input} placeholder="50 - 1000+" value={form.qty} onChange={e=>setForm({...form, qty:e.target.value})}/>
              </div>
            </div>
            <div style={contactStyles.row}>
              <div style={contactStyles.label}>{t('rfq_deadline')}</div>
              <input type="date" style={contactStyles.input} value={form.deadline} onChange={e=>setForm({...form, deadline:e.target.value})}/>
            </div>
            <div style={contactStyles.row}>
              <div style={contactStyles.label}>{t('rfq_message')}</div>
              <textarea rows="4" style={{...contactStyles.input, resize: 'vertical'}} value={form.message} onChange={e=>setForm({...form, message:e.target.value})}/>
            </div>
            <button type="submit" className="btn btn-green" style={{width:'100%', justifyContent:'center', marginTop: 8}}>
              {sent ? '✓ Mengarahkan ke WhatsApp...' : t('rfq_send')} →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer({ t }) {
  return (
    <footer style={{background:'#0A0E0B', color:'var(--ink-300)', padding: '64px 0 32px'}}>
      <div className="container">
        <div className="footer-grid" style={{display:'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 40, paddingBottom: 48, borderBottom: '1px solid #1A201C'}}>
          <div>
            <div className="brand" style={{color:'white', marginBottom: 16}}>
              <div className="brand-mark"><Logo size={22}/></div>
              <div>
                <div className="brand-name">Karmeda</div>
                <div className="brand-sub" style={{color:'var(--ink-400)'}}>PT Karuna Metta Ananda</div>
              </div>
            </div>
            <p style={{maxWidth: 320, fontSize: 14}}>{t('footer_tagline')}</p>
          </div>
          <div>
            <div style={{fontSize: 11, fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.1em', color: 'var(--green-200)', marginBottom: 16}}>{t('footer_explore')}</div>
            <div style={{display:'flex', flexDirection:'column', gap: 10, fontSize: 14}}>
              <a href="#about">{t('nav_about')}</a>
              <a href="#products">{t('nav_products')}</a>
              <a href="#process">{t('nav_process')}</a>
              <a href="#portfolio">{t('nav_portfolio')}</a>
            </div>
          </div>
          <div>
            <div style={{fontSize: 11, fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.1em', color: 'var(--green-200)', marginBottom: 16}}>Tools</div>
            <div style={{display:'flex', flexDirection:'column', gap: 10, fontSize: 14}}>
              <a href="#calculator">{t('nav_calculator')}</a>
              <a href="#measure">Form Ukur</a>
              <a href="#blog">{t('nav_blog')}</a>
              <a href="#faq">FAQ</a>
            </div>
          </div>
          <div>
            <div style={{fontSize: 11, fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.1em', color: 'var(--green-200)', marginBottom: 16}}>Area Layanan</div>
            <div style={{display:'flex', flexDirection:'column', gap: 10, fontSize: 14}}>
              <a href="lokasi/konveksi-seragam-tangerang.html">Tangerang</a>
              <a href="lokasi/konveksi-seragam-tangerang-selatan.html">Tangerang Selatan</a>
              <a href="lokasi/konveksi-seragam-jakarta.html">Jakarta</a>
              <a href="lokasi/konveksi-seragam-bekasi.html">Bekasi</a>
              <a href="lokasi/konveksi-seragam-bogor.html">Bogor</a>
              <a href="lokasi/konveksi-seragam-depok.html">Depok</a>
            </div>
          </div>
          <div>
            <div style={{fontSize: 11, fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.1em', color: 'var(--green-200)', marginBottom: 16}}>{t('footer_contact')}</div>
            <div style={{display:'flex', flexDirection:'column', gap: 10, fontSize: 14}}>
              <a href={`https://wa.me/628170012500?text=${encodeURIComponent('Halo pak Marchel - PT. Karmeda saya dapat info dari Web, mau tanya tentang seragam ............')}`}>+62 817-001-2500</a>
              <a href="mailto:marchel.adisastra@gmail.com">Email</a>
              <a href="https://www.instagram.com/karmeda_seragam/">Instagram</a>
              <span>{t('footer_address')}</span>
            </div>
          </div>
        </div>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop: 32, fontSize: 12, fontFamily:'var(--font-mono)', color: 'var(--ink-500)'}}>
          <span>{t('footer_rights')}</span>
          <span>seragamrapih.com</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Contact, Footer });
