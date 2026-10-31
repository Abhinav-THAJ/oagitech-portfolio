import Image from 'next/image';
import Link from 'next/link';

const PILLARS = [
  { n: '01', t: 'Inspection & Integrity', d: 'Third-party inspection · Asset integrity · QA/QC project management · Welding · Civil / structural / geotechnical', href: '/inspection' },
  { n: '02', t: 'Non-Destructive Testing', d: 'Ultrasonic · Radiographic · Magnetic particle · Penetrant · PMI · Hardness · Rope access · Advanced NDT', href: '/ndt' },
  { n: '03', t: 'Calibration', d: 'Pressure · Dimensional · Electrical · Thermal · Torque · Flow meter · Mass & volume · Gas detector · Onsite', href: '/calibration' },
  { n: '04', t: 'Training & Certification', d: 'Safety officer · Permit receiver · Rigger · Scaffolding · Work at height · Welding inspection · NDT · API · Bespoke', href: '/training' },
  { n: '05', t: 'Industrial Services & Products', d: 'Operation & maintenance · Plant machinery & vehicles · Housing · Remote services · Stabilizers · UPS · Welding consumables · PPE', href: '/services' }
];

const INDUSTRIES = [
  { code: 'IND—01', t: 'Oil & Gas', img: '/images/hero-ut-technician.jpg', alt: 'NDT technician scanning a pipeline weld', pos: '50% 30%' },
  { code: 'IND—02', t: 'Petrochemical', img: '/images/ind-petrochem.jpg', alt: 'Petrochemical process plant' },
  { code: 'IND—03', t: 'Marine', img: '/images/ind-port.jpg', alt: 'Cargo vessel moored at a Red Sea port' },
  { code: 'IND—04', t: 'Power Generation', img: '/images/ind-power.jpg', alt: 'Gas turbine hall in a power station' },
  { code: 'IND—05', t: 'Infrastructure', img: '/images/ind-bridge.jpg', alt: 'Highway bridge structure under construction' }
];

const STEPS = [
  { t: 'Scope', d: 'We review drawings, codes and client specifications, then agree methods, acceptance criteria and schedule.' },
  { t: 'Inspect & Test', d: 'Certified technicians mobilise to site or work in our facility using calibrated, traceable equipment.' },
  { t: 'Report', d: 'Clear technical reports with findings, photographs and recommendations, delivered in [X] working days.' },
  { t: 'Certify', d: 'Certificates are issued with a unique number that anyone can verify online, at any time.' }
];

const WORK = [
  { sector: 'PETROCHEMICAL', title: '[Project title — e.g. weld inspection for plant shutdown]', tags: ['UT', 'RT', '[SCOPE]'], img: '/images/proj-weld-inspection.jpg', alt: 'Weld inspection during a plant shutdown' },
  { sector: 'MARINE', title: '[Project title — e.g. rope-access thickness survey]', tags: ['ROPE ACCESS', 'UTM'], img: '/images/proj-rope-access.jpg', alt: 'Rope access technician taking thickness readings on a tank' },
  { sector: 'INFRASTRUCTURE', title: '[Project title — e.g. TPI of lifting equipment fleet]', tags: ['TPI', 'LIFTING'], img: '/images/proj-crane-tpi.jpg', alt: 'Third-party inspection of a mobile crane hook' }
];

const COURSES = [
  { t: 'Safety Officer Training & Examination', href: '/training/safety-officer' },
  { t: 'Rigger Training & Examination', href: '/training/rigger' },
  { t: 'Scaffolding Training & Certification', href: '/training/scaffolding' },
  { t: 'Welding Inspection Course', href: '/training/welding-inspection-courses' }
];

const FAQ = [
  { q: 'Do you calibrate instruments on site?', a: 'Yes. We offer onsite calibration for pressure, temperature, electrical, torque and gas detection equipment, as well as calibration in our facility, with traceable certificates for every instrument.' },
  { q: 'How quickly can a team mobilise for an inspection?', a: '[Confirm typical mobilisation time — e.g. within 24–48 hours across the Kingdom.]' },
  { q: 'Which codes and standards do you inspect to?', a: 'We inspect and report to the code your project specifies, including ASME, API, AWS and ISO standards, as well as client specifications.' },
  { q: 'Can training be delivered at our site, in Arabic?', a: 'Yes. Most courses can be run as closed batches at your site, in English or Arabic. See Bespoke Training.' },
  { q: 'How long are training certificates valid?', a: '[Confirm validity per course — e.g. 2 or 3 years.] Every certificate can be checked on our verification page.' }
];

export default function Home() {
  return (
    <>
      {/* Hero — option B, cinematic */}
      <section className="h-hero on-dark">
        <Image src="/images/ind-refinery.jpg" alt="Refinery at dusk in Saudi Arabia" fill priority sizes="100vw" style={{ objectFit: 'cover', objectPosition: '50% 60%' }} />
        <div className="h-hero-shade" />
        <div className="h-hero-cap">REFINERY TURNAROUND · YANBU</div>
        <div className="wrap">
          <div className="mono" style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 12, letterSpacing: '0.14em', color: 'var(--stone)' }}>
            <span className="dot" />INSPECTION · NDT · CALIBRATION · TRAINING
          </div>
          <h1 className="disp">Built to<br />pass inspection.</h1>
          <div className="h-hero-foot">
            <p>Independent inspection, NDT, calibration and training for the Kingdom&apos;s most demanding industrial assets.</p>
            <div className="btn-row">
              <Link href="/contact" className="btn btn-accent">Request a quote →</Link>
              <Link href="/verify" className="btn btn-line-light">Verify a certificate</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="wrap">
          <div className="stat"><div className="disp">8</div><div className="mono">DISCIPLINES</div></div>
          <div className="stat"><div className="disp">14</div><div className="mono">CERTIFIED COURSES</div></div>
          <div className="stat"><div className="disp">8</div><div className="mono">NDT METHODS</div></div>
          <div className="stat"><div className="disp">9</div><div className="mono">CALIBRATION SERVICES</div></div>
        </div>
      </section>

      <section className="accred">
        <div className="wrap">
          <div className="eyebrow" style={{ flex: '0 0 200px' }}>Accredited &amp; approved</div>
          <div className="accred-grid">
            {['[ISO 9001]', '[ISO/IEC 17025]', '[Accreditation 03]', '[Accreditation 04]'].map((a) => (
              <div key={a}><strong>{a}</strong><span className="mono" style={{ fontSize: 11, color: 'var(--label)' }}>CERT NO. [—]</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: 120, paddingBottom: 120 }}>
        <div className="sec-head">
          <div><div className="eyebrow">01 / What we do</div><h2 className="disp" style={{ fontSize: 84 }}>Five disciplines.<br />One accountable partner.</h2></div>
          <p>From the first weld inspection to the calibration certificate on the instrument that checked it — one team, one report standard.</p>
        </div>
        <div className="pillars">
          {PILLARS.map((p) => (
            <Link key={p.n} href={p.href}>
              <span className="mono" style={{ fontSize: 13, color: 'var(--label)' }}>{p.n}</span>
              <span className="disp">{p.t}</span>
              <span className="mono">{p.d}</span>
              <span className="arrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="sec ink on-dark">
        <div className="wrap">
          <div className="sec-head">
            <div><div className="eyebrow">02 / Industries</div><h2 className="disp" style={{ fontSize: 72 }}>Where we work</h2></div>
            <p>Industrial, commercial and government clients — wherever failure is not an option.</p>
          </div>
          <div className="ind-grid">
            {INDUSTRIES.map((x) => (
              <div key={x.code} className="ind-card">
                <div className="img"><Image src={x.img} alt={x.alt} fill sizes="(max-width: 820px) 100vw, 20vw" style={{ objectFit: 'cover', objectPosition: x.pos }} /></div>
                <div className="cap"><span className="mono" style={{ fontSize: 11, color: 'var(--accent)' }}>{x.code}</span><span className="disp" style={{ fontSize: 30 }}>{x.t}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: 120, paddingBottom: 120 }}>
        <div className="sec-head"><div><div className="eyebrow">03 / How we work</div><h2 className="disp" style={{ fontSize: 72 }}>From scope to certificate</h2></div></div>
        <div className="s-steps">
          {STEPS.map((s, i) => (
            <div key={s.t}><div className="step"><i />STEP 0{i + 1}</div><h3 className="disp" style={{ fontSize: 36 }}>{s.t}</h3><p>{s.d}</p></div>
          ))}
        </div>
      </section>

      <section className="sec stone">
        <div className="wrap">
          <div className="sec-head"><div><div className="eyebrow">04 / Selected work</div><h2 className="disp" style={{ fontSize: 72 }}>Field record</h2></div></div>
          <div className="work-grid">
            {WORK.map((w) => (
              <article key={w.title} className="work-card">
                <div className="img"><Image src={w.img} alt={w.alt} fill sizes="(max-width: 820px) 100vw, 33vw" style={{ objectFit: 'cover' }} /></div>
                <div className="body">
                  <div className="mono" style={{ display: 'flex', gap: 16, fontSize: 11, letterSpacing: '0.08em', color: 'var(--label)' }}><span>{w.sector}</span><span>[CITY]</span></div>
                  <h3>{w.title}</h3>
                  <div className="tagrow">{w.tags.map((t) => <span key={t}>{t}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: 120, paddingBottom: 120, display: 'flex', flexWrap: 'wrap', gap: 56 }}>
        <div style={{ flex: '1 1 340px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="eyebrow">05 / Training centre</div>
          <h2 className="disp" style={{ margin: 0, fontSize: 72 }}>Next courses</h2>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: 'var(--muted)' }}>Safety and technical courses with examination and certification. Book a seat, or ask us for a bespoke programme at your site.</p>
          <Link href="/training" className="btn btn-ink" style={{ alignSelf: 'flex-start' }}>Full calendar →</Link>
        </div>
        <div style={{ flex: '2 1 620px', minWidth: 0, overflowX: 'auto' }}>
          <table className="courses">
            <thead><tr><th>COURSE</th><th>STARTS</th><th>DURATION</th><th>SEATS</th><th /></tr></thead>
            <tbody>
              {COURSES.map((c) => (
                <tr key={c.href}>
                  <td style={{ fontWeight: 600 }}>{c.t}</td><td className="mono">[DD MMM]</td><td className="mono">[X] DAYS</td><td className="mono">[X] LEFT</td>
                  <td style={{ textAlign: 'right' }}><Link href={c.href} className="mono" style={{ fontSize: 13, color: 'var(--accent-text)' }}>ENROL →</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section style={{ background: 'var(--accent)' }}>
        <div className="wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'center', justifyContent: 'space-between', paddingTop: 72, paddingBottom: 72 }}>
          <div style={{ flex: '1 1 440px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="mono" style={{ fontSize: 12, letterSpacing: '0.14em' }}>CERTIFICATE VERIFICATION</div>
            <h2 className="disp" style={{ margin: 0, fontSize: 60 }}>Holding an Oagitech certificate?<br />Check it in seconds.</h2>
          </div>
          <form action="/verify" method="get" style={{ flex: '1 1 440px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <label htmlFor="cert-home" className="mono" style={{ fontSize: 12, letterSpacing: '0.08em' }}>CERTIFICATE NUMBER</label>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <input id="cert-home" name="no" placeholder="e.g. OAG-TR-2026-00418" className="mono" style={{ flex: '1 1 260px', minHeight: 60, border: '2px solid var(--ink)', background: 'var(--paper)', padding: '0 18px', fontSize: 16 }} />
              <button type="submit" className="btn btn-ink" style={{ minHeight: 60 }}>Verify →</button>
            </div>
          </form>
        </div>
      </section>

      <section className="wrap faq" style={{ paddingTop: 120, paddingBottom: 120, display: 'flex', flexWrap: 'wrap', gap: 56 }}>
        <div style={{ flex: '1 1 340px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="eyebrow">06 / FAQ</div>
          <h2 className="disp" style={{ margin: 0, fontSize: 72 }}>Common questions</h2>
        </div>
        <div style={{ flex: '2 1 620px', minWidth: 0, borderTop: '2px solid var(--ink)' }}>
          {FAQ.map((f, i) => (
            <details key={f.q} open={i === 0}><summary>{f.q}</summary><p>{f.a}</p></details>
          ))}
        </div>
      </section>
    </>
  );
}
