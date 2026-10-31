import type { Metadata } from 'next';
import Link from 'next/link';
import { Crumbs, Frame } from '@/components/ui';
import TrainingCatalogue, { type Course } from '@/components/TrainingCatalogue';
import { pagesUnder } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Training & Certification',
  description: 'Safety and technical training with competency-based examination — safety officer, rigger, scaffolding, work at height, welding inspection, NDT and API courses in Saudi Arabia.',
  alternates: { canonical: '/training' }
};

export default function TrainingPage() {
  const courses: Course[] = pagesUnder('/training')
    .map((p) => ({
      code: p.code ?? '',
      cat: p.tag.replace('TRAINING · ', ''),
      t: p.crumb,
      d: p.intro,
      fmt: p.facts?.[0]?.v ?? '',
      href: p.path
    }))
    .sort((a, b) => a.code.localeCompare(b.code));

  return (
    <>
      <section className="on-dark" style={{ background: 'var(--ink)', color: 'var(--paper)', borderTop: '1px solid var(--line-dark)' }}>
        <div className="wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: 56, paddingTop: 48, paddingBottom: 80, alignItems: 'stretch' }}>
          <div style={{ flex: '1 1 560px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 26, justifyContent: 'center' }}>
            <Crumbs trail={[{ t: 'Training' }]} />
            <div className="mono" style={{ fontSize: 12, letterSpacing: '0.14em', color: 'var(--accent)' }}>DISCIPLINE 05 · TRAINING CENTRE</div>
            <h1 className="disp" style={{ margin: 0, fontSize: 'clamp(56px, calc(8 * var(--vw)), 112px)' }}>Training &amp;<br />certification</h1>
            <p style={{ margin: 0, maxWidth: 540, fontSize: 19, lineHeight: 1.6, color: 'var(--muted-dark)' }}>Safety and technical courses with practical training and competency-based examination — delivered at our centre or at your site, in English and Arabic.</p>
            <div className="btn-row">
              <a href="#catalogue" className="btn btn-accent">Browse {courses.length} courses ↓</a>
              <Link href="/training/bespoke-training" className="btn btn-line-light">Train at your site</Link>
            </div>
          </div>
          <Frame src="/images/tr-hub.jpg" alt="Trainees in a technical safety training classroom" priority style={{ flex: '1 1 440px', minWidth: 0, minHeight: 480, background: 'var(--ink-3)' }} />
        </div>
        <div style={{ borderTop: '1px solid var(--line-dark)' }}>
          <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {[[String(courses.length), 'COURSES'], ['EXAM', 'COMPETENCY-BASED'], ['EN · AR', 'LANGUAGES'], ['ONLINE', 'CERTIFICATE VERIFICATION']].map(([v, k], i) => (
              <div key={k} style={{ padding: '26px 24px', paddingLeft: i ? 24 : 0, borderRight: i < 3 ? '1px solid var(--line-dark)' : 0 }}>
                <div className="disp" style={{ fontSize: 48 }}>{v}</div>
                <div className="mono" style={{ marginTop: 6, fontSize: 11, letterSpacing: '0.12em', color: 'var(--label-dark)' }}>{k}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TrainingCatalogue courses={courses} />

      <section className="sec stone">
        <div className="wrap">
          <div className="sec-head"><div><div className="eyebrow">How it works</div><h2 className="disp">Enrol to certificate</h2></div></div>
          <div className="s-steps">
            {[['Enrol', 'Book a seat online or ask for a closed batch for your team.'], ['Train', 'Classroom theory plus practical, hands-on sessions.'], ['Examine', 'Competency-based written and practical assessment.'], ['Certify', 'Certificate issued with a number anyone can verify online.']].map(([t, d], i) => (
              <div key={t}><div className="step"><i />STEP 0{i + 1}</div><h3 className="disp">{t}</h3><p>{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--accent)' }}>
        <div className="wrap" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 32, paddingTop: 64, paddingBottom: 64 }}>
          <h2 className="disp" style={{ margin: 0, fontSize: 58 }}>Training a whole crew?<br />We come to you.</h2>
          <Link href="/training/bespoke-training" className="btn btn-ink">Bespoke training →</Link>
        </div>
      </section>
    </>
  );
}
