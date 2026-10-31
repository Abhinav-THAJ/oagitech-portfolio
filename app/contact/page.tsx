import type { Metadata } from 'next';
import Image from 'next/image';
import QuoteForm from '@/components/QuoteForm';
import { Crumbs } from '@/components/ui';
import { CONTACT } from '@/lib/nav';

export const metadata: Metadata = {
  title: 'Contact & Request a Quote',
  description: 'Request a quote for inspection, NDT, calibration or training. Oagitech, Yanbu, Kingdom of Saudi Arabia.',
  alternates: { canonical: '/contact' }
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ company?: string; phone?: string }> }) {
  const sp = await searchParams;
  return (
    <>
      <div className="wrap"><Crumbs trail={[{ t: 'Contact' }]} /></div>
      <section className="wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: 56, paddingTop: 48, paddingBottom: 96, alignItems: 'flex-start' }}>
        <div style={{ flex: '1 1 400px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div className="mono" style={{ fontSize: 12, letterSpacing: '0.14em', color: 'var(--accent-text)' }}>CONTACT · REQUEST A QUOTE</div>
          <h1 className="disp" style={{ margin: 0, fontSize: 'clamp(56px, calc(7 * var(--vw)), 104px)' }}>Tell us what<br />to inspect.</h1>
          <p className="lead" style={{ maxWidth: 460 }}>Answer three quick questions and an engineer replies within [X] working hours with scope, schedule and price.</p>
          <div style={{ position: 'relative', height: 300, background: 'var(--line)' }}>
            <Image src="/images/contact.jpg" alt="Oagitech office and workshop building in Yanbu" fill sizes="(max-width: 820px) 100vw, 40vw" style={{ objectFit: 'cover' }} />
            <div className="frame-tag">YANBU 46436 · AL RABIE DISTRICT</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))', borderTop: '2px solid var(--ink)' }}>
            {[
              { k: 'PHONE', v: CONTACT.phone, href: CONTACT.phoneHref },
              { k: 'EMAIL', v: CONTACT.email, href: `mailto:${CONTACT.email}` },
              { k: 'WHATSAPP', v: 'Chat with an engineer', href: CONTACT.whatsapp },
              { k: 'HOURS', v: '[Sun–Thu · 8:00–17:00]' }
            ].map((c) => {
              const body = (<><span className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', color: 'var(--label)' }}>{c.k}</span><span style={{ fontSize: 20, fontWeight: 700 }}>{c.v}</span></>);
              const st = { padding: '20px 16px 20px 0', borderBottom: '1px solid var(--line)', display: 'flex', flexDirection: 'column' as const, gap: 6 };
              return c.href ? <a key={c.k} href={c.href} style={st}>{body}</a> : <div key={c.k} style={st}>{body}</div>;
            })}
          </div>
        </div>
        <QuoteForm initialCompany={sp.company ?? ''} initialPhone={sp.phone ?? ''} />
      </section>
    </>
  );
}
