// calculator.jsx — Price estimator + Measurement form
const calcStyles = {
  wrap: { padding: '120px 0', background: 'var(--paper-2)' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginTop: 56, alignItems: 'flex-start' },
  card: { background: 'white', borderRadius: 'var(--radius-lg)', padding: 40, border: '1px solid var(--ink-200)' },
  row: { display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 },
  label: { fontSize: 11, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-500)' },
  input: { padding: '12px 14px', border: '1px solid var(--ink-200)', borderRadius: 8, fontSize: 14, background: 'var(--paper)' },
  segGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 },
  segBtn: { padding: '12px', border: '1px solid var(--ink-200)', borderRadius: 8, background: 'white', fontSize: 13, textAlign: 'left', transition: 'all 0.15s' },
  segActive: { borderColor: 'var(--green-500)', background: 'var(--green-50)', color: 'var(--green-700)' },
  checkbox: { display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', border: '1px solid var(--ink-200)', borderRadius: 8, cursor: 'pointer', fontSize: 13 },
  checkActive: { borderColor: 'var(--green-500)', background: 'var(--green-50)' },
  totalCard: { 
    background: 'var(--ink-900)',
    color: 'white',
    padding: 40,
    borderRadius: 'var(--radius-lg)',
    position: 'sticky', top: 100,
  },
  totalLabel: { fontSize: 12, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--green-200)' },
  totalNum: { fontFamily: 'var(--font-display)', fontSize: 64, lineHeight: 1, marginTop: 8 },
};

const PRICE_TABLE = {
  id: {
    types: [
      { id: 'pdh', label: 'PDH / PDL', base: 220 },
      { id: 'polo', label: 'Polo Shirt', base: 95 },
      { id: 'wearpack', label: 'Wearpack', base: 320 },
      { id: 'school', label: 'Sekolah', base: 130 },
      { id: 'medical', label: 'Scrub / Lab Coat', base: 180 },
      { id: 'almamater', label: 'Almamater', base: 280 },
    ],
    fabrics: [
      { id: 'standard', label: 'Standard', mult: 1.0 },
      { id: 'premium', label: 'Premium', mult: 1.35 },
      { id: 'luxury', label: 'Luxury', mult: 1.7 },
    ],
  },
  en: {
    types: [
      { id: 'pdh', label: 'Office Shirt', base: 220 },
      { id: 'polo', label: 'Polo Shirt', base: 95 },
      { id: 'wearpack', label: 'Coverall', base: 320 },
      { id: 'school', label: 'School', base: 130 },
      { id: 'medical', label: 'Scrub / Lab Coat', base: 180 },
      { id: 'almamater', label: 'Univ. Jacket', base: 280 },
    ],
    fabrics: [
      { id: 'standard', label: 'Standard', mult: 1.0 },
      { id: 'premium', label: 'Premium', mult: 1.35 },
      { id: 'luxury', label: 'Luxury', mult: 1.7 },
    ],
  }
};

function Calculator({ t, lang }) {
  const data = PRICE_TABLE[lang];
  const [type, setType] = React.useState('pdh');
  const [qty, setQty] = React.useState(100);
  const [fabric, setFabric] = React.useState('premium');
  const [extras, setExtras] = React.useState({ emb: true, print: false, name: true, pack: false });
  const EXTRA_PRICE = { emb: 15, print: 12, name: 8, pack: 5 };

  const baseType = data.types.find(x => x.id === type);
  const fab = data.fabrics.find(x => x.id === fabric);
  const extraTotal = Object.entries(extras).reduce((sum, [k, v]) => sum + (v ? EXTRA_PRICE[k] : 0), 0);
  const perPc = Math.round(baseType.base * fab.mult + extraTotal);
  const volumeDiscount = qty >= 2000 ? 0.75 : qty >= 500 ? 0.85 : qty >= 200 ? 0.92 : qty >= 100 ? 0.97 : 1;

  // Non-linear slider: position 0..1 -> qty. 0->30, 0.5->2000, 1->10000
  const posToQty = (p) => {
    if (p <= 0.5) {
      const t = p / 0.5;
      return Math.round(30 + (2000 - 30) * t);
    } else {
      const t = (p - 0.5) / 0.5;
      return Math.round(2000 + (10000 - 2000) * t);
    }
  };
  const qtyToPos = (q) => {
    if (q <= 2000) return ((q - 30) / (2000 - 30)) * 0.5;
    return 0.5 + ((q - 2000) / (10000 - 2000)) * 0.5;
  };
  const stepQty = (rawPos) => {
    const q = posToQty(rawPos);
    // snap to 10
    return Math.round(q / 10) * 10;
  };
  const finalPerPc = Math.round(perPc * volumeDiscount);
  const total = finalPerPc * qty;

  const fmt = n => 'Rp ' + (n * 1000).toLocaleString('id-ID');

  const waText = encodeURIComponent(
    `Halo Karmeda, saya dapat estimasi dari kalkulator:\n\n` +
    `Jenis: ${baseType.label}\nKain: ${fab.label}\nJumlah: ${qty} pcs\n` +
    `Add-on: ${Object.entries(extras).filter(([_,v])=>v).map(([k])=>k).join(', ') || 'tidak ada'}\n` +
    `Estimasi: ${fmt(finalPerPc)}/pc · Total ${fmt(total)}\n\nMohon kirim quotation final.`
  );

  return (
    <section id="calculator" style={calcStyles.wrap}>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">{t('calc_eyebrow')}</div>
          <h2 className="h-1" style={{fontFamily: 'system-ui'}}>{t('calc_title')}</h2>
          <p className="lead" style={{fontSize: 15}}>{t('calc_sub')}</p>
        </div>
        <PromoBanner lang={lang} />

        <div style={calcStyles.grid} className="calc-grid">
          <div style={calcStyles.card}>
            <div style={calcStyles.row}>
              <div style={calcStyles.label}>{t('calc_type')}</div>
              <div style={{...calcStyles.segGrid, gridTemplateColumns: 'repeat(3, 1fr)'}}>
                {data.types.map(ty => (
                  <button key={ty.id} style={{...calcStyles.segBtn, ...(type===ty.id?calcStyles.segActive:{})}} onClick={()=>setType(ty.id)}>
                    {ty.label}
                  </button>
                ))}
              </div>
            </div>
            <div style={calcStyles.row}>
              <div style={calcStyles.label}>{t('calc_qty')}: <span style={{color:'var(--green-600)', fontSize:14}}>{qty} pcs</span></div>
              <input type="range" min="0" max="1000" step="1" value={Math.round(qtyToPos(qty) * 1000)} onChange={e=>setQty(stepQty(+e.target.value / 1000))} style={{accentColor:'var(--green-500)', width:'100%', display:'block'}}/>
              <div style={{position:'relative', height: 18, fontSize: 11, fontFamily:'var(--font-mono)', color:'var(--ink-400)', marginTop: 4}}>
                {[
                  [30, '30'],
                  [1000, '1000'],
                  [2000, '2000'],
                  [5000, '5000'],
                  [7500, '7500'],
                  [10000, '10.000+'],
                ].map(([val, lbl], i, arr) => {
                  const pct = qtyToPos(val) * 100;
                  const isFirst = i === 0;
                  const isLast = i === arr.length - 1;
                  return (
                    <span key={val} style={{
                      position:'absolute',
                      left: `${pct}%`,
                      transform: isFirst ? 'translateX(0)' : isLast ? 'translateX(-100%)' : 'translateX(-50%)',
                      whiteSpace: 'nowrap',
                    }}>{lbl}</span>
                  );
                })}
              </div>
            </div>
            <div style={calcStyles.row}>
              <div style={calcStyles.label}>{t('calc_fabric')}</div>
              <div style={{...calcStyles.segGrid, gridTemplateColumns:'repeat(3, 1fr)'}}>
                {data.fabrics.map(f => (
                  <button key={f.id} style={{...calcStyles.segBtn, ...(fabric===f.id?calcStyles.segActive:{})}} onClick={()=>setFabric(f.id)}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
            <div style={calcStyles.row}>
              <div style={calcStyles.label}>{t('calc_extras')}</div>
              <div style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap: 8}}>
                {[
                  ['emb', t('calc_extra_emb')],
                  ['print', t('calc_extra_print')],
                  ['name', t('calc_extra_name')],
                  ['pack', t('calc_extra_pack')],
                ].map(([k, l]) => (
                  <div key={k} style={{...calcStyles.checkbox, ...(extras[k]?calcStyles.checkActive:{})}} onClick={()=>setExtras({...extras, [k]:!extras[k]})}>
                    <div style={{width:18, height:18, borderRadius: 4, border: '1.5px solid '+(extras[k]?'var(--green-500)':'var(--ink-300)'), background: extras[k]?'var(--green-500)':'transparent', display:'grid', placeItems:'center', color:'white', fontSize: 11}}>
                      {extras[k] ? '✓' : ''}
                    </div>
                    {l} <span style={{marginLeft:'auto', color:'var(--ink-400)', fontFamily:'var(--font-mono)', fontSize: 11}}>+Rp {(EXTRA_PRICE[k]*1000).toLocaleString('id-ID')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={calcStyles.totalCard}>
            {qty > 5000 ? (
              <SpecialPriceCard lang={lang} qty={qty} />
            ) : (
              <>
                <div style={calcStyles.totalLabel}>{t('calc_total')}</div>
                {volumeDiscount < 1 ? (
                  <>
                    <div style={{
                      fontFamily:'var(--font-mono)', fontSize: 16,
                      color:'var(--ink-400)', textDecoration:'line-through',
                      textDecorationColor: 'var(--ink-400)',
                      marginTop: 6, marginBottom: 2,
                    }}>{fmt(perPc * qty)}</div>
                    <div style={{...calcStyles.totalNum, color:'var(--green-500)'}}>{fmt(total)}</div>
                    <div style={{
                      display:'inline-flex', alignItems:'center', gap: 6,
                      marginTop: 6, padding:'4px 10px',
                      background:'var(--green-50)',
                      borderRadius: 999,
                      fontSize: 11, fontFamily:'var(--font-mono)',
                      color:'var(--green-700)', fontWeight: 600,
                    }}>
                      {lang === 'id' ? 'Hemat' : 'Save'} {fmt((perPc - finalPerPc) * qty)} · −{Math.round((1-volumeDiscount)*100)}%
                    </div>
                  </>
                ) : (
                  <div style={calcStyles.totalNum}>{fmt(total)}</div>
                )}
                <div style={{display:'flex', gap: 24, marginTop: 24, paddingTop:24, borderTop: '1px solid var(--ink-700)'}}>
                  <div>
                    <div style={{fontSize:11, color:'var(--ink-400)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.1em'}}>Per pc</div>
                    {volumeDiscount < 1 ? (
                      <div style={{marginTop: 4}}>
                        <span style={{
                          fontFamily:'var(--font-mono)', fontSize: 13,
                          color:'var(--ink-400)', textDecoration:'line-through',
                          marginRight: 8,
                        }}>{fmt(perPc)}</span>
                        <span style={{fontFamily:'var(--font-display)', fontSize: 28, color:'var(--green-500)'}}>{fmt(finalPerPc)}</span>
                      </div>
                    ) : (
                      <div style={{fontFamily:'var(--font-display)', fontSize: 28, marginTop: 4}}>{fmt(finalPerPc)}</div>
                    )}
                  </div>
                  <div>
                    <div style={{fontSize:11, color:'var(--ink-400)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.1em'}}>Quantity</div>
                    <div style={{fontFamily:'var(--font-display)', fontSize: 28, marginTop: 4}}>{qty} pcs</div>
                  </div>
                  {volumeDiscount < 1 && (
                    <div>
                      <div style={{fontSize:11, color:'var(--ink-400)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.1em'}}>Disc</div>
                      <div style={{fontFamily:'var(--font-display)', fontSize: 28, marginTop: 4, color:'var(--green-500)'}}>{Math.round((1-volumeDiscount)*100)}%</div>
                    </div>
                  )}
                </div>
                <a href={`https://wa.me/628170012500?text=${waText}`} target="_blank" rel="noreferrer" className="btn btn-green" style={{marginTop: 32, width: '100%', justifyContent: 'center'}}>
                  {t('calc_send')} →
                </a>
                <div style={{marginTop: 16, fontSize: 11, color: 'var(--ink-400)', textAlign:'center', fontFamily:'var(--font-mono)', lineHeight: 1.6}}>
                  {lang==='id' ? (
                    <>* estimasi · belum termasuk PPN<br/>* Harga belum termasuk discount up to 30% + voucher belanja</>
                  ) : (
                    <>* estimate · excl. VAT<br/>* Excluding discount up to 30% + shopping voucher</>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        <CalcNotes lang={lang} />
      </div>
    </section>
  );
}

function SpecialPriceCard({ lang, qty }) {
  const txt = lang === 'id' ? {
    badge: 'VOLUME 5000+ PCS',
    title: 'Special Price',
    body: 'Untuk pesanan dalam jumlah besar, kami menawarkan harga khusus yang disesuaikan dengan kebutuhan Anda — termasuk konsultasi material, skema pembayaran fleksibel, dan layanan dedicated account manager.',
    hint: 'Silakan hubungi kami untuk penawaran terbaik.',
    cta: 'Hubungi Tim Karmeda',
    qtyLabel: 'Quantity',
  } : {
    badge: 'VOLUME 5000+ PCS',
    title: 'Special Pricing',
    body: 'For large-volume orders, we offer tailored pricing with material consultation, flexible payment terms, and a dedicated account manager.',
    hint: 'Please contact us for the best offer.',
    cta: 'Contact Karmeda team',
    qtyLabel: 'Quantity',
  };
  const waText = encodeURIComponent(
    lang === 'id'
      ? `Halo Karmeda, saya ingin meminta penawaran khusus untuk pesanan ${qty} pcs. Mohon info lebih lanjut. Terima kasih.`
      : `Hi Karmeda, I'd like to request a special quote for ${qty} pcs. Please share more details. Thanks.`
  );
  return (
    <>
      <div style={{
        display: 'inline-block',
        fontSize: 10,
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.14em',
        color: 'var(--green-300)',
        padding: '6px 10px',
        border: '1px solid var(--green-500)',
        borderRadius: 999,
        marginBottom: 20,
      }}>{txt.badge}</div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 44,
        lineHeight: 1.05,
        letterSpacing: '-0.02em',
        color: 'white',
        marginBottom: 20,
      }}>{txt.title}</div>
      <div style={{
        fontSize: 14,
        lineHeight: 1.6,
        color: 'var(--ink-300)',
        marginBottom: 16,
      }}>{txt.body}</div>
      <div style={{
        fontSize: 14,
        color: 'var(--green-300)',
        marginBottom: 24,
        fontWeight: 500,
      }}>{txt.hint}</div>
      <div style={{
        paddingTop: 20,
        borderTop: '1px solid var(--ink-700)',
        display: 'flex',
        gap: 24,
        marginBottom: 24,
      }}>
        <div>
          <div style={{fontSize:11, color:'var(--ink-400)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.1em'}}>{txt.qtyLabel}</div>
          <div style={{fontFamily:'var(--font-display)', fontSize: 28, marginTop: 4, color:'white'}}>{qty} pcs</div>
        </div>
      </div>
      <a href={`https://wa.me/628170012500?text=${waText}`} target="_blank" rel="noreferrer" className="btn btn-green" style={{width:'100%', justifyContent:'center'}}>
        {txt.cta} →
      </a>
    </>
  );
}

function CalcNotes({ lang }) {
  const txt = lang === 'id' ? {
    title: 'Keterangan',
    items: [
      <>Harga di atas adalah <b>estimasi</b>, belum termasuk <b>diskon hingga 30%</b> dan <b>bonus voucher belanja</b>.</>,
      <>Untuk detail harga terbaik, silakan <a href="#contact" style={{color:'var(--green-700)', textDecoration:'underline', textUnderlineOffset:3}}>hubungi tim kami</a> atau chat langsung via WhatsApp.</>,
      <>Estimasi belum termasuk PPN dan biaya pengiriman ke luar Jabodetabek.</>,
    ],
    cta: 'Chat WhatsApp untuk harga final',
  } : {
    title: 'Notes',
    items: [
      <>Prices above are <b>estimates</b>, excluding <b>up to 30% discount</b> and <b>bonus shopping voucher</b>.</>,
      <>For the best final pricing, please <a href="#contact" style={{color:'var(--green-700)', textDecoration:'underline', textUnderlineOffset:3}}>contact our team</a> or chat directly via WhatsApp.</>,
      <>Estimate excludes VAT and shipping costs outside Jabodetabek.</>,
    ],
    cta: 'Chat WhatsApp for final pricing',
  };
  return (
    <div style={{
      marginTop: 32,
      padding: '24px 28px',
      background: 'white',
      border: '1px solid var(--ink-200)',
      borderLeft: '3px solid var(--green-500)',
      borderRadius: 'var(--radius)',
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gap: 32,
      alignItems: 'center',
    }} className="calc-notes">
      <div>
        <div style={{
          fontSize: 11, fontFamily: 'var(--font-mono)',
          textTransform: 'uppercase', letterSpacing: '0.12em',
          color: 'var(--green-700)', marginBottom: 12,
        }}>{txt.title}</div>
        <ul style={{listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap: 8}}>
          {txt.items.map((it, i) => (
            <li key={i} style={{
              display: 'flex', gap: 10, alignItems: 'flex-start',
              fontSize: 14, color: 'var(--ink-700)', lineHeight: 1.55,
            }}>
              <span style={{
                flexShrink: 0, marginTop: 8,
                width: 5, height: 5, borderRadius: '50%',
                background: 'var(--green-500)',
              }}/>
              <span>{it}</span>
            </li>
          ))}
        </ul>
      </div>
      <a href={`https://wa.me/628170012500?text=${encodeURIComponent('Halo pak Marchel - PT. Karmeda saya dapat info dari Web, mau tanya tentang seragam ............')}`} target="_blank" rel="noreferrer" className="btn btn-green" style={{flexShrink: 0}}>
        {txt.cta} →
      </a>
    </div>
  );
}
const measureStyles = {
  wrap: { padding: '72px 0' },
  grid: { display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 40, alignItems: 'flex-start' },
  diagram: { background: 'var(--paper-2)', borderRadius: 'var(--radius-lg)', padding: 60, aspectRatio: '4/3', display: 'grid', placeItems: 'center', position:'relative' },
  measureTbl: { 
    background: 'white',
    border: '1px solid var(--ink-200)',
    borderRadius: 'var(--radius)',
    overflow: 'hidden',
    marginTop: 24,
    fontSize: 13,
  },
  measureRow: { display: 'grid', gridTemplateColumns: '1fr auto', padding: '12px 16px', borderBottom: '1px solid var(--ink-100)' },
};

// Helpers: pick recommended size by weight (kg)
function getRecommendedShirt(kg) {
  // returns {nomor, size, chest, length}
  // Source: size chart karmeda
  const table = [
    { max: 34,  nomor: '13',   size: '4XS', chest: '42 cm', length: '64 cm' },
    { max: 39,  nomor: '13,5', size: '3XS', chest: '44 cm', length: '66 cm' },
    { max: 45,  nomor: '14',   size: 'XXS', chest: '46 cm', length: '66 cm' },
    { max: 52,  nomor: '14,5', size: 'XS',  chest: '48 cm', length: '68 cm' },
    { max: 60,  nomor: '15',   size: 'S',   chest: '50 cm', length: '68 cm' },
    { max: 70,  nomor: '15,5', size: 'M',   chest: '52 cm', length: '70 cm' },
    { max: 80,  nomor: '16',   size: 'L',   chest: '54 cm', length: '72 cm' },
    { max: 90,  nomor: '16,5', size: 'XL',  chest: '56 cm', length: '74 cm' },
    { max: 100, nomor: '17',   size: '2XL', chest: '58 cm', length: '76 cm' },
    { max: 110, nomor: '17,5', size: '3XL', chest: '60 cm', length: '78 cm' },
    { max: 120, nomor: '18',   size: '4XL', chest: '62 cm', length: '80 cm' },
    { max: 130, nomor: '18,5', size: '5XL', chest: '64 cm', length: '80 cm' },
    { max: 140, nomor: '19',   size: '6XL', chest: '66 cm', length: '81 cm' },
    { max: 150, nomor: '19,5', size: '7XL', chest: '68 cm', length: '81 cm' },
    { max: 160, nomor: '20',   size: '8XL', chest: '70 cm', length: '81 cm' },
    { max: 170, nomor: '22',   size: '9XL', chest: '72 cm', length: '82 cm' },
  ];
  for (const r of table) if (kg <= r.max) return r;
  return table[table.length - 1];
}
function getRecommendedPant(kg) {
  const table = [
    { max: 45,  size: '26', waist: '66 cm',  length: '100 cm' },
    { max: 52,  size: '28', waist: '71 cm',  length: '101 cm' },
    { max: 60,  size: '30', waist: '76 cm',  length: '101 cm' },
    { max: 70,  size: '32', waist: '81 cm',  length: '101 cm' },
    { max: 80,  size: '34', waist: '86 cm',  length: '102 cm' },
    { max: 90,  size: '36', waist: '91 cm',  length: '102 cm' },
    { max: 100, size: '38', waist: '97 cm',  length: '102 cm' },
    { max: 110, size: '40', waist: '102 cm', length: '102 cm' },
    { max: 120, size: '42', waist: '107 cm', length: '102 cm' },
    { max: 130, size: '44', waist: '112 cm', length: '102 cm' },
    { max: 140, size: '46', waist: '117 cm', length: '102 cm' },
    { max: 150, size: '48', waist: '122 cm', length: '102 cm' },
    { max: 160, size: '50', waist: '127 cm', length: '102 cm' },
    { max: 170, size: '52', waist: '132 cm', length: '102 cm' },
  ];
  for (const r of table) if (kg <= r.max) return r;
  return table[table.length - 1];
}

function SizeFinder({ lang }) {
  const [weight, setWeight] = React.useState('');
  const kg = parseFloat(weight);
  const valid = !isNaN(kg) && kg > 0 && kg <= 200;
  const shirt = valid ? getRecommendedShirt(kg) : null;
  const pant  = valid ? getRecommendedPant(kg)  : null;

  const txt = lang === 'id' ? {
    title: 'Kalkulator Ukuran Cepat',
    sub: 'Masukkan berat badan Anda — kami rekomendasikan ukuran baju & celana yang paling cocok.',
    label: 'Berat Badan (kg)',
    placeholder: 'Contoh: 88',
    shirt: 'Baju / Kemeja',
    pant: 'Celana',
    num: 'Nomor',
    size: 'Size',
    chest: 'Lebar dada',
    pantSize: 'Ukuran',
    waist: 'Lingkar pinggang',
    length: 'Panjang',
    disclaimer: 'Rekomendasi berbasis berat badan, ukuran pasti bisa berbeda tergantung tinggi & postur. Toleransi 2 cm max.',
    empty: 'Isi berat badan untuk melihat rekomendasi',
  } : {
    title: 'Quick Size Calculator',
    sub: 'Enter your weight — we\'ll recommend your best-fit shirt & pants size.',
    label: 'Weight (kg)',
    placeholder: 'Example: 88',
    shirt: 'Shirt',
    pant: 'Pants',
    num: 'Number',
    size: 'Size',
    chest: 'Chest width',
    pantSize: 'Size',
    waist: 'Waist',
    length: 'Length',
    disclaimer: 'Recommendation based on weight; exact size may vary by height & build. Tolerance 2 cm max.',
    empty: 'Enter your weight to see recommendation',
  };

  return (
    <div style={{
      marginTop: 16,
      background: 'linear-gradient(135deg, var(--green-50) 0%, white 50%)',
      border: '1px solid var(--green-200)',
      borderRadius: 'var(--radius-lg)',
      padding: '18px 20px',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }} className="size-finder-grid">
        {/* LEFT: title + input */}
        <div>
          <div style={{
            display:'inline-flex', alignItems:'center', gap: 8,
            fontSize: 10, fontFamily:'var(--font-mono)',
            textTransform:'uppercase', letterSpacing:'0.1em',
            color:'var(--green-700)', marginBottom: 8,
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
            </svg>
            {lang === 'id' ? 'Kalkulator Ukuran Cepat' : 'Quick Size Calculator'}
          </div>
          <h3 style={{
            fontSize: 22, fontWeight: 700, margin: 0,
            fontFamily:'system-ui', lineHeight: 1.2,
            color:'var(--ink-900)', marginBottom: 6,
          }}>
            {lang === 'id' ? 'Berat badan Anda?' : 'Your weight?'}
          </h3>
          <p style={{
            fontSize: 13, color:'var(--ink-500)', margin: '0 0 14px 0',
            lineHeight: 1.5,
          }}>{txt.sub}</p>

          <div style={{position:'relative'}}>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={txt.placeholder}
              min="20" max="200" step="1"
              style={{
                width: '100%',
                padding: '14px 56px 14px 18px',
                fontSize: 22,
                fontWeight: 700,
                border: '2px solid var(--green-500)',
                borderRadius: 'var(--radius)',
                background: 'white',
                fontFamily: 'system-ui',
                outline: 'none',
                color: 'var(--ink-900)',
              }}
            />
            <span style={{
              position:'absolute', right: 16, top: '50%', transform:'translateY(-50%)',
              fontSize: 14, color:'var(--ink-500)', fontFamily:'var(--font-mono)',
              pointerEvents:'none', fontWeight: 600,
            }}>kg</span>
          </div>
        </div>

        {/* RIGHT: results */}
        <div style={{
          minHeight: 132,
          display:'flex', alignItems:'stretch',
        }}>
          {!valid ? (
            <div style={{
              flex: 1,
              display:'flex', alignItems:'center', justifyContent:'center',
              border:'1.5px dashed var(--ink-200)',
              borderRadius:'var(--radius)',
              background:'rgba(255,255,255,0.6)',
              fontSize: 13, color:'var(--ink-400)',
              fontFamily:'var(--font-mono)',
              padding: 16, textAlign:'center',
              minHeight: 132,
            }}>← {txt.empty}</div>
          ) : (
            <div style={{
              display:'grid',
              gridTemplateColumns:'1fr 1fr',
              gap: 14, flex: 1,
            }} className="size-finder-results">
              {/* Shirt card */}
              <div style={{
                border:'1.5px solid var(--green-500)',
                background:'white',
                borderRadius:'var(--radius)',
                padding: '14px 18px',
                display:'grid',
                gridTemplateColumns:'auto 1fr',
                columnGap: 16,
                alignItems:'center',
              }}>
                <div>
                  <div style={{
                    fontSize: 9, fontFamily:'var(--font-mono)',
                    textTransform:'uppercase', letterSpacing:'0.12em',
                    color:'var(--green-700)', marginBottom: 4,
                  }}>👔 {txt.shirt}</div>
                  <div style={{
                    fontSize: 38, fontWeight: 700, lineHeight: 1,
                    color:'var(--ink-900)', fontFamily:'system-ui',
                  }}>{shirt.size}</div>
                  <div style={{
                    fontSize: 11, color:'var(--ink-500)',
                    fontFamily:'var(--font-mono)', marginTop: 4,
                  }}>No. {shirt.nomor}</div>
                </div>
                <div style={{
                  fontSize: 11, color:'var(--ink-700)', lineHeight: 1.7,
                  borderLeft:'1px dashed var(--ink-200)', paddingLeft: 14,
                }}>
                  <div style={{color:'var(--ink-400)', fontFamily:'var(--font-mono)', fontSize:9, textTransform:'uppercase', letterSpacing:'0.08em'}}>{txt.chest}</div>
                  <div style={{fontWeight:600, marginBottom: 6, fontSize: 13}}>{shirt.chest}</div>
                  <div style={{color:'var(--ink-400)', fontFamily:'var(--font-mono)', fontSize:9, textTransform:'uppercase', letterSpacing:'0.08em'}}>{txt.length}</div>
                  <div style={{fontWeight:600, fontSize: 13}}>{shirt.length}</div>
                </div>
              </div>

              {/* Pant card */}
              <div style={{
                border:'1.5px solid var(--green-500)',
                background:'white',
                borderRadius:'var(--radius)',
                padding: '14px 18px',
                display:'grid',
                gridTemplateColumns:'auto 1fr',
                columnGap: 16,
                alignItems:'center',
              }}>
                <div>
                  <div style={{
                    fontSize: 9, fontFamily:'var(--font-mono)',
                    textTransform:'uppercase', letterSpacing:'0.12em',
                    color:'var(--green-700)', marginBottom: 4,
                  }}>👖 {txt.pant}</div>
                  <div style={{
                    fontSize: 38, fontWeight: 700, lineHeight: 1,
                    color:'var(--ink-900)', fontFamily:'system-ui',
                  }}>{pant.size}</div>
                  <div style={{
                    fontSize: 11, color:'var(--ink-500)',
                    fontFamily:'var(--font-mono)', marginTop: 4,
                  }}>{txt.pantSize}</div>
                </div>
                <div style={{
                  fontSize: 11, color:'var(--ink-700)', lineHeight: 1.7,
                  borderLeft:'1px dashed var(--ink-200)', paddingLeft: 14,
                }}>
                  <div style={{color:'var(--ink-400)', fontFamily:'var(--font-mono)', fontSize:9, textTransform:'uppercase', letterSpacing:'0.08em'}}>{txt.waist}</div>
                  <div style={{fontWeight:600, marginBottom: 6, fontSize: 13}}>{pant.waist}</div>
                  <div style={{color:'var(--ink-400)', fontFamily:'var(--font-mono)', fontSize:9, textTransform:'uppercase', letterSpacing:'0.08em'}}>{txt.length}</div>
                  <div style={{fontWeight:600, fontSize: 13}}>{pant.length}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {valid && (
        <p style={{
          marginTop: 14, fontSize: 11, lineHeight: 1.6,
          color:'var(--ink-500)', fontFamily:'var(--font-mono)',
          margin: '14px 0 0 0',
        }}>* {txt.disclaimer}</p>
      )}
    </div>
  );
}

function Measurement({ t, lang }) {
  const [garment, setGarment] = React.useState('shirt');

  // Size Chart Kemeja (Standart KARMEDA)
  // [Nomor, Size, Lebar Dada, Panjang Baju, Rek. Berat Badan]
  const SHIRT_SIZES = [
    ['13',   '4XS', '42 cm', '64 cm', '< 35 kg'],
    ['13,5', '3XS', '44 cm', '66 cm', '< 40 kg'],
    ['14',   'XXS', '46 cm', '66 cm', '40 – 45 kg'],
    ['14,5', 'XS',  '48 cm', '68 cm', '46 – 52 kg'],
    ['15',   'S',   '50 cm', '68 cm', '53 – 60 kg'],
    ['15,5', 'M',   '52 cm', '70 cm', '61 – 70 kg'],
    ['16',   'L',   '54 cm', '72 cm', '71 – 80 kg'],
    ['16,5', 'XL',  '56 cm', '74 cm', '81 – 90 kg'],
    ['17',   '2XL', '58 cm', '76 cm', '91 – 100 kg'],
    ['17,5', '3XL', '60 cm', '78 cm', '101 – 110 kg'],
    ['18',   '4XL', '62 cm', '80 cm', '111 – 120 kg'],
    ['18,5', '5XL', '64 cm', '80 cm', '121 – 130 kg'],
    ['19',   '6XL', '66 cm', '81 cm', '131 – 140 kg'],
    ['19,5', '7XL', '68 cm', '81 cm', '141 – 150 kg'],
    ['20',   '8XL', '70 cm', '81 cm', '151 – 160 kg'],
    ['22',   '9XL', '72 cm', '82 cm', '161 – 170 kg'],
  ];
  // Size Chart Celana KARMEDA
  // [Ukuran, Lingkar Pinggang, Panjang Celana, Rek. Berat Badan]
  const PANT_SIZES = [
    ['26', '66 cm',  '100 cm', '40 – 45 kg'],
    ['28', '71 cm',  '101 cm', '46 – 52 kg'],
    ['30', '76 cm',  '101 cm', '53 – 60 kg'],
    ['32', '81 cm',  '101 cm', '61 – 70 kg'],
    ['34', '86 cm',  '102 cm', '71 – 80 kg'],
    ['36', '91 cm',  '102 cm', '81 – 90 kg'],
    ['38', '97 cm',  '102 cm', '91 – 100 kg'],
    ['40', '102 cm', '102 cm', '101 – 110 kg'],
    ['42', '107 cm', '102 cm', '111 – 120 kg'],
    ['44', '112 cm', '102 cm', '121 – 130 kg'],
    ['46', '117 cm', '102 cm', '131 – 140 kg'],
    ['48', '122 cm', '102 cm', '141 – 150 kg'],
    ['50', '127 cm', '102 cm', '151 – 160 kg'],
    ['52', '132 cm', '102 cm', '161 – 170 kg'],
  ];

  const isShirt = garment === 'shirt';
  const sizes = isShirt ? SHIRT_SIZES : PANT_SIZES;
  const headers = isShirt
    ? (lang === 'id'
        ? ['Nomor', 'Size', 'Lebar Dada', 'Panjang Baju', 'Rek. Berat']
        : ['Number', 'Size', 'Chest Width', 'Length', 'Rec. Weight'])
    : (lang === 'id'
        ? ['Ukuran', 'Lingkar Pinggang', 'Panjang Celana', 'Rek. Berat']
        : ['Size', 'Waist', 'Length', 'Rec. Weight']);

  const tabLabel = lang === 'id'
    ? { shirt: 'Baju / Atasan', pant: 'Celana Kerja' }
    : { shirt: 'Shirt / Top', pant: 'Work Pants' };

  return (
    <section id="measure" style={measureStyles.wrap}>
      <div className="container">
        <div style={measureStyles.grid} className="measure-grid">
          <div>
            <div style={measureStyles.diagram}>
              {isShirt ? <BodyDiagram /> : <PantDiagram />}
            </div>
            <SizeFinder lang={lang} />
          </div>
          <div>
            <div className="eyebrow">{t('measure_eyebrow')}</div>
            <h2 className="h-1" style={{marginTop: 12, marginBottom: 10, fontFamily: 'system-ui'}}>{t('measure_title')}</h2>
            <p style={{color:'var(--ink-700)', marginBottom: 14, fontSize: 14}}>{t('measure_sub')}</p>

            {/* Garment toggle */}
            <div style={{
              display:'inline-flex', gap: 0, padding: 4,
              background: 'var(--paper-2)', border: '1px solid var(--ink-200)',
              borderRadius: 999, marginBottom: 14,
            }}>
              {[['shirt', tabLabel.shirt], ['pant', tabLabel.pant]].map(([k,l]) => (
                <button key={k} onClick={() => setGarment(k)} style={{
                  padding: '10px 18px',
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 500,
                  background: garment === k ? 'var(--ink-900)' : 'transparent',
                  color: garment === k ? 'white' : 'var(--ink-500)',
                  transition: 'all 0.15s',
                }}>{l}</button>
              ))}
            </div>

            <div style={{display:'flex', gap: 10, flexWrap:'wrap', marginBottom: 4}}>
              <a href="#" className="btn btn-primary" style={{padding:'10px 16px', fontSize:13}}>{t('measure_download')}</a>
              <a href="#contact" className="btn btn-ghost" style={{padding:'10px 16px', fontSize:13}}>{t('measure_form')}</a>
            </div>
            <div style={{
              ...measureStyles.measureTbl,
              fontSize: 13,
              maxHeight: 320,
              overflowY: 'auto',
              marginTop: 16,
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${headers.length}, 1fr)`,
                padding: '12px 16px',
                borderBottom: '1px solid var(--ink-100)',
                background: 'var(--paper-2)',
                fontFamily:'var(--font-mono)', fontSize: 11,
                textTransform:'uppercase', letterSpacing:'0.08em',
                color:'var(--ink-500)',
                gap: 8,
                position: 'sticky', top: 0, zIndex: 1,
              }}>
                {headers.map(h => <span key={h}>{h}</span>)}
              </div>
              {sizes.map((row, ri) => (
                <div key={ri} style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${headers.length}, 1fr)`,
                  padding: '10px 16px',
                  borderBottom: '1px solid var(--ink-100)',
                  gap: 8,
                }}>
                  {row.map((c, i) => (
                    <span key={i} style={{
                      fontWeight: (isShirt && i <= 1) || (!isShirt && i === 0) ? 600 : 400,
                      fontFamily: ((isShirt && i <= 1) || (!isShirt && i === 0)) ? 'inherit' : 'var(--font-mono)',
                      color: ((isShirt && i <= 1) || (!isShirt && i === 0)) ? 'var(--ink-900)' : 'var(--ink-500)',
                      fontSize: ((isShirt && i <= 1) || (!isShirt && i === 0)) ? 13 : 12,
                    }}>{c}</span>
                  ))}
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 10, fontSize: 11,
              fontFamily: 'var(--font-mono)', color: 'var(--ink-500)',
              lineHeight: 1.55,
            }}>
              {lang === 'id' ? (
                <>* Toleransi size <strong style={{color:'var(--ink-900)'}}>2 cm max</strong> · Rekomendasi berat badan adalah acuan · Custom size tersedia atas permintaan</>
              ) : (
                <>* Size tolerance <strong style={{color:'var(--ink-900)'}}>2 cm max</strong> · Weight recommendation is a guideline · Custom size available on request</>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function PantDiagram() {
  return (
    <svg viewBox="0 0 240 300" style={{width: '60%', height: 'auto'}}>
      {/* Pants outline */}
      <path d="M70 30 L170 30 L178 80 L172 290 L132 290 L122 130 L118 130 L108 290 L68 290 L62 80 Z"
        fill="white" stroke="var(--ink-700)" strokeWidth="1.5" strokeLinejoin="round"/>
      {/* waist */}
      <line x1="70" y1="40" x2="170" y2="40" stroke="var(--green-500)" strokeWidth="1" strokeDasharray="4 3"/>
      <text x="120" y="25" fontSize="9" fontFamily="JetBrains Mono" fill="var(--green-700)" textAnchor="middle">LINGKAR PINGGANG</text>
      {/* length */}
      <line x1="55" y1="40" x2="55" y2="290" stroke="var(--green-500)" strokeWidth="1" strokeDasharray="4 3"/>
      <text x="45" y="170" fontSize="9" fontFamily="JetBrains Mono" fill="var(--green-700)" textAnchor="middle" transform="rotate(-90 45 170)">PANJANG CELANA</text>
      <circle cx="70" cy="40" r="3" fill="var(--green-500)"/>
      <circle cx="170" cy="40" r="3" fill="var(--green-500)"/>
      <circle cx="65" cy="80" r="3" fill="var(--green-500)"/>
      <circle cx="175" cy="80" r="3" fill="var(--green-500)"/>
      <circle cx="68" cy="290" r="3" fill="var(--green-500)"/>
    </svg>
  );
}

function BodyDiagram() {
  return (
    <svg viewBox="0 0 240 300" style={{width: '70%', height: 'auto'}}>
      {/* Simple shirt outline */}
      <path d="M60 60 L40 80 L40 110 L60 100 L60 240 L180 240 L180 100 L200 110 L200 80 L180 60 L150 50 L150 40 Q120 30 90 40 L90 50 Z" 
        fill="white" stroke="var(--ink-700)" strokeWidth="1.5" strokeLinejoin="round"/>
      {/* Measurement lines */}
      <line x1="60" y1="120" x2="180" y2="120" stroke="var(--green-500)" strokeWidth="1" strokeDasharray="4 3"/>
      <text x="125" y="115" fontSize="9" fontFamily="JetBrains Mono" fill="var(--green-700)" textAnchor="middle">LEBAR DADA</text>
      
      {/* Panjang baju: dari kerah (atas) sampai bawah baju */}
      <line x1="30" y1="40" x2="30" y2="240" stroke="var(--green-500)" strokeWidth="1.2" strokeDasharray="4 3"/>
      {/* End caps */}
      <line x1="25" y1="40" x2="35" y2="40" stroke="var(--green-500)" strokeWidth="1.2"/>
      <line x1="25" y1="240" x2="35" y2="240" stroke="var(--green-500)" strokeWidth="1.2"/>
      <text x="22" y="140" fontSize="9" fontFamily="JetBrains Mono" fill="var(--green-700)" textAnchor="middle" transform="rotate(-90 22 140)">PANJANG BAJU</text>
      
      <circle cx="60" cy="120" r="3" fill="var(--green-500)"/>
      <circle cx="180" cy="120" r="3" fill="var(--green-500)"/>
      <circle cx="30" cy="40" r="3" fill="var(--green-500)"/>
      <circle cx="30" cy="240" r="3" fill="var(--green-500)"/>
    </svg>
  );
}

function PromoBanner({ lang }) {
  const [copied, setCopied] = React.useState(false);
  const code = 'KARMEDA1';
  const copy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const txt = lang === 'id' ? {
    badge: 'Promo pelanggan pertama',
    title: 'Diskon hingga 30% + Voucher belanja',
    sub: 'Khusus customer pertama. Tunjukkan kode di bawah saat konsultasi pemesanan seragam pertama Anda di Karmeda.',
    label: 'Kode promo',
    copy: copied ? '✓ Tersalin' : 'Salin kode',
    note: '* Berlaku untuk PO pertama · tidak dapat digabung dengan promo lain · S&K berlaku',
  } : {
    badge: 'First-customer promo',
    title: 'Up to 30% off + Shopping voucher',
    sub: 'For first-time customers only. Show this code during consultation for your first uniform order at Karmeda.',
    label: 'Promo code',
    copy: copied ? '✓ Copied' : 'Copy code',
    note: '* Valid for first PO only · cannot be combined with other promos · T&C apply',
  };
  return (
    <div style={{
      marginBottom: 40,
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      background: 'linear-gradient(120deg, var(--green-700) 0%, var(--green-500) 60%, var(--green-400) 100%)',
      color: 'white',
      position: 'relative',
    }}>
      {/* decorative stripes */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 24px)',
        pointerEvents: 'none',
      }}/>
      <div style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: 32,
        alignItems: 'center',
        padding: '32px 40px',
      }} className="promo-grid">
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '5px 12px',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(4px)',
            fontSize: 11, fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase', letterSpacing: '0.12em',
            marginBottom: 14,
          }}>
            <span style={{display:'inline-block', width:6, height:6, borderRadius:'50%', background:'var(--accent-amber)', boxShadow:'0 0 0 4px rgba(232,181,63,0.25)'}}/>
            {txt.badge}
          </div>
          <h3 style={{
            fontFamily: 'system-ui',
            fontSize: 'clamp(24px, 3vw, 36px)',
            lineHeight: 1.15,
            fontWeight: 600,
            marginBottom: 10,
            letterSpacing: '-0.01em',
          }}>{txt.title}</h3>
          <p style={{
            fontSize: 15,
            color: 'rgba(255,255,255,0.88)',
            maxWidth: 540,
            marginBottom: 4,
          }}>{txt.sub}</p>
          <div style={{
            fontSize: 11, fontFamily: 'var(--font-mono)',
            color: 'rgba(255,255,255,0.7)',
            marginTop: 14,
          }}>{txt.note}</div>
        </div>
        <div style={{
          background: 'rgba(15,20,17,0.4)',
          backdropFilter: 'blur(8px)',
          border: '1px dashed rgba(255,255,255,0.3)',
          borderRadius: 'var(--radius)',
          padding: '20px 24px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
          minWidth: 220,
        }}>
          <div style={{
            fontSize: 10, fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase', letterSpacing: '0.18em',
            color: 'rgba(255,255,255,0.7)',
          }}>{txt.label}</div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 32,
            fontWeight: 500,
            letterSpacing: '0.08em',
            color: 'white',
          }}>{code}</div>
          <button onClick={copy} style={{
            padding: '8px 16px',
            borderRadius: 999,
            background: 'white',
            color: 'var(--green-700)',
            fontSize: 12,
            fontWeight: 600,
            fontFamily: 'var(--font-sans)',
            transition: 'all 0.15s',
          }}>{txt.copy}</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Calculator, Measurement, PromoBanner, PantDiagram });
