import type { Metadata } from 'next';
import { Crumbs, Frame } from '@/components/ui';
import VerifyForm from '@/components/VerifyForm';

export const metadata: Metadata = {
  title: 'Verify a Certificate',
  description: 'Check any Oagitech training, inspection or calibration certificate online.',
  alternates: { canonical: '/verify' }
};

export default async function VerifyPage({ searchParams }: { searchParams: Promise<{ no?: string }> }) {
  const { no } = await searchParams;
  return (
    <>
      <section className="on-dark" style={{ background: 'var(--ink)', color: 'var(--paper)', borderTop: '1px solid var(--line-dark)' }}>
        <div className="wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: 56, paddingTop: 48, paddingBottom: 96, alignItems: 'stretch' }}>
          <div style={{ flex: '1.1 1 520px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 28 }}>
            <Crumbs trail={[{ t: 'Verify certificate' }]} />
            <div className="mono" style={{ fontSize: 12, letterSpacing: '0.14em', color: 'var(--accent)' }}>CERTIFICATE VERIFICATION</div>
            <h1 className="disp" style={{ margin: 0, fontSize: 'clamp(56px, calc(7 * var(--vw)), 104px)' }}>Is this certificate<br />genuine?</h1>
            <p style={{ margin: 0, maxWidth: 520, fontSize: 18, lineHeight: 1.6, color: 'var(--muted-dark)' }}>Check any Oagitech training, inspection or calibration certificate in seconds. Enter the number printed on the certificate or scan its QR code.</p>
            <VerifyForm initial={no ?? ''} />
          </div>
          <Frame src="/images/verify.jpg" alt="Supervisor scanning a worker's training ID card at a plant gate" priority style={{ flex: '1 1 420px', minWidth: 0, minHeight: 520, background: 'var(--ink-3)' }} />
        </div>
      </section>
      <section className="sec paper">
        <div className="wrap s-steps" style={{ borderTop: 0 }}>
          {[['Training certificates', "Confirm a worker's course, result and expiry before site entry."], ['Inspection reports', 'Check the report number, scope and inspector on file.'], ['Calibration certificates', 'See the instrument, calibration date and next due date.']].map(([t, d], i) => (
            <div key={t}><span className="num">0{i + 1}</span><h2 className="disp" style={{ margin: 0, fontSize: 28 }}>{t}</h2><p>{d}</p></div>
          ))}
        </div>
      </section>
    </>
  );
}
