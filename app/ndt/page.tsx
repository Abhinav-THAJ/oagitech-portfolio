import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Crumbs } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Non-Destructive Testing',
  description: 'Ultrasonic, radiographic, magnetic particle, penetrant, PMI, hardness, rope access and advanced NDT services across Saudi Arabia.',
  alternates: { canonical: '/ndt' }
};

const METHODS = [
  { code: 'UT', n: '02.1', t: 'Ultrasonic Testing', d: 'High-frequency sound to measure thickness and detect internal flaws in welds, plates and pipes.', href: '/ndt/ultrasonic-testing' },
  { code: 'RT', n: '02.2', t: 'Radiographic Testing', d: 'Precision imaging of welds and castings to reveal porosity, inclusions and lack of fusion.', href: '/ndt/radiographic-testing' },
  { code: 'MT', n: '02.3', t: 'Magnetic Particle', d: 'Surface and near-surface crack detection in ferromagnetic materials.', href: '/ndt/magnetic-particle-testing' },
  { code: 'PT', n: '02.4', t: 'Penetrant Testing', d: 'Dye penetrant inspection for surface-breaking defects on non-porous materials.', href: '/ndt/penetrant-testing' },
  { code: 'PMI', n: '02.5', t: 'Positive Material ID', d: 'Alloy verification on site to confirm the right material went into the right place.', href: '/ndt/positive-material-identification' },
  { code: 'HT', n: '02.6', t: 'Hardness Test', d: 'Portable hardness testing of welds, heat-affected zones and base metal.', href: '/ndt/hardness-test' },
  { code: 'IRATA', n: '02.7', t: 'Rope Access', d: 'Inspection at height and in hard-to-reach areas without scaffolding.', href: '/ndt/rope-access' },
  { code: 'PAUT · TOFD', n: '02.8', t: 'Advanced NDT', d: 'Phased array, TOFD and other advanced techniques for critical assets.', href: '/ndt/advanced-ndt-services' }
];

const P = 'primary', S = 'support', N = 'none';
const SELECTOR: { need: string; v: string[] }[] = [
  { need: 'Internal weld flaws', v: [P, P, N, N, N, P] },
  { need: 'Surface cracks', v: [S, N, P, P, N, S] },
  { need: 'Wall thickness / corrosion', v: [P, S, N, N, N, P] },
  { need: 'Material grade verification', v: [N, N, N, N, P, N] }
];
const mark = (x: string) => (x === P ? { c: 'var(--accent)', s: '●', l: 'Primary method' } : x === S ? { c: 'var(--label-dark)', s: '○', l: 'Supporting method' } : { c: '#4a525d', s: '—', l: 'Not suitable' });

export default function NdtPage() {
  return (
    <>
      <section className="on-dark" style={{ background: 'var(--ink)', color: 'var(--paper)', borderTop: '1px solid var(--line-dark)' }}>
        <div className="wrap"><Crumbs trail={[{ t: 'Non-Destructive Testing' }]} /></div>
        <div className="wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: 56, paddingTop: 64, paddingBottom: 96, alignItems: 'flex-end' }}>
          <div style={{ flex: '2 1 640px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div className="mono" style={{ fontSize: 12, letterSpacing: '0.14em', color: 'var(--accent)' }}>DISCIPLINE 02 OF 05</div>
            <h1 className="disp" style={{ margin: 0, fontSize: 'clamp(56px, calc(9 * var(--vw)), 128px)' }}>Non-destructive<br />testing</h1>
          </div>
          <div style={{ flex: '1 1 360px', display: 'flex', flexDirection: 'column', gap: 24 }}>
            <p style={{ margin: 0, fontSize: 19, lineHeight: 1.6, color: 'var(--muted-dark)' }}>We find material defects and structural flaws without damaging the component — so your plant keeps running while you learn exactly what condition it is in.</p>
            <Link href="/contact" className="btn btn-accent" style={{ alignSelf: 'flex-start' }}>Request NDT quote →</Link>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--line-dark)' }}>
          <div className="wrap mono" style={{ display: 'flex', flexWrap: 'wrap', fontSize: 12, letterSpacing: '0.08em', color: 'var(--label-dark)' }}>
            {['8 METHODS', 'ONSITE & IN-HOUSE', '[ASNT / ISO 9712] CERTIFIED PERSONNEL', 'REPORTS IN [X] WORKING DAYS'].map((t, i) => (
              <span key={t} style={{ padding: '18px 28px', paddingLeft: i === 0 ? 0 : 28, borderRight: i < 3 ? '1px solid var(--line-dark)' : 0 }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ position: 'relative', height: 560, background: 'var(--ink)' }}>
        <Image src="/images/ndt-hub.jpg" alt="NDT technician walking past welded pipelines at sunrise" fill sizes="100vw" style={{ objectFit: 'cover' }} />
        <div className="frame-tag">FIELD · PIPELINE FABRICATION YARD</div>
      </section>

      <section className="wrap" style={{ paddingTop: 112, paddingBottom: 112 }}>
        <div className="sec-head">
          <div><div className="eyebrow">Methods</div><h2 className="disp" style={{ fontSize: 72 }}>Choose a method</h2></div>
          <p>Not sure which method fits? Tell us the component, material and defect you are concerned about — we will recommend the right technique.</p>
        </div>
        <div className="card-grid">
          {METHODS.map((m) => (
            <Link key={m.href} href={m.href} className="card">
              <div className="mono" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}><span>{m.code}</span><span>{m.n}</span></div>
              <h3 className="disp" style={{ fontSize: 38 }}>{m.t}</h3>
              <p className="card-d">{m.d}</p>
              <span className="mono card-l" style={{ fontSize: 13 }}>VIEW METHOD →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="sec ink on-dark">
        <div className="wrap">
          <div className="sec-head"><div><div className="eyebrow">Method selector</div><h2 className="disp" style={{ fontSize: 72 }}>Which method finds what</h2></div></div>
          <div style={{ overflowX: 'auto', border: '1px solid var(--line-dark)' }}>
            <table className="mono" style={{ width: '100%', minWidth: 820, borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ textAlign: 'left', color: 'var(--label-dark)', letterSpacing: '0.08em' }}>
                  {['DEFECT / NEED', 'UT', 'RT', 'MT', 'PT', 'PMI', 'PAUT'].map((h, i) => (
                    <th key={h} style={{ padding: i ? '18px 12px' : '18px 20px', borderBottom: '1px solid var(--line-dark)', fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SELECTOR.map((row) => (
                  <tr key={row.need}>
                    <td style={{ padding: '16px 20px', borderBottom: '1px solid var(--line-dark)', color: 'var(--paper)' }}>{row.need}</td>
                    {row.v.map((x, i) => { const m = mark(x); return <td key={i} style={{ padding: '16px 12px', borderBottom: '1px solid var(--line-dark)', color: m.c }}><span aria-hidden="true">{m.s}</span><span className="sr-only">{m.l}</span></td>; })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mono" style={{ margin: '16px 0 0', fontSize: 12, color: 'var(--label-dark)' }}>● PRIMARY METHOD &nbsp; ○ SUPPORTING METHOD &nbsp; — NOT SUITABLE · Indicative only; final method per applicable code.</p>
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: 112, paddingBottom: 112, display: 'flex', flexWrap: 'wrap', gap: 56 }}>
        <div style={{ flex: '1 1 380px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="eyebrow">Standards we work to</div>
          <h2 className="disp" style={{ margin: 0, fontSize: 64 }}>Codes, not guesswork</h2>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: 'var(--muted)' }}>Every inspection is performed and reported against the code your project specifies.</p>
        </div>
        <div className="s-chips" style={{ flex: '2 1 560px', alignContent: 'flex-start' }}>
          {['ASME V', 'ASME VIII', 'API 1104', 'AWS D1.1', 'ISO 17640', '[CLIENT SPEC]'].map((c) => <span key={c}>{c}</span>)}
        </div>
      </section>

      <section style={{ background: 'var(--accent)' }}>
        <div className="wrap" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 32, paddingTop: 64, paddingBottom: 64 }}>
          <h2 className="disp" style={{ margin: 0, fontSize: 60 }}>Shutdown coming up?<br />Book NDT crews early.</h2>
          <Link href="/contact" className="btn btn-ink">Plan with an engineer →</Link>
        </div>
      </section>
    </>
  );
}
