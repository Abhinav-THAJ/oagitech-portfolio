import Link from 'next/link';
import type { Page } from '@/lib/content';
import Sections from './Sections';
import { Crumbs, Frame, QuoteBand, RelatedLinks } from './ui';

function titleSize(t: string) {
  const L = t.length;
  return L <= 14 ? 124 : L <= 22 ? 104 : L <= 32 ? 86 : L <= 44 ? 72 : 60;
}

export default function DetailPage({ page }: { page: Page }) {
  const trail = page.pillarHref ? [{ t: page.pillar, href: page.pillarHref }, { t: page.crumb }] : [{ t: page.crumb }];
  return (
    <>
      <div className="wrap"><Crumbs trail={trail} /></div>

      <section className="wrap d-hero">
        <div className="d-hero-copy">
          <div className="tags">
            <span className="tag-ink">{page.tag}</span>
            {page.code && <span className="tag-line">{page.code}</span>}
          </div>
          <h1 className="disp" style={{ margin: 0, fontSize: titleSize(page.title) }}>{page.title}</h1>
          <p className="lead">{page.intro}</p>
          <div className="btn-row">
            <Link href="/contact" className="btn btn-ink">{(page.cta ?? 'Request a quote')} →</Link>
            <a href="https://wa.me/966143226503" className="btn btn-line">WhatsApp an engineer</a>
          </div>
        </div>
        <Frame src={page.img} alt={page.imgAlt} tag={`${page.tag} · ${page.crumb}`} priority style={{ flex: '1 1 440px', minWidth: 0, minHeight: 500 }} />
      </section>

      {page.facts && page.facts.length > 0 && (
        <section className="facts">
          <div className="wrap">
            {page.facts.map((f) => (
              <div key={f.k} className="fact"><span>{f.k}</span><span className="disp">{f.v}</span></div>
            ))}
          </div>
        </section>
      )}

      <Sections sections={page.sections} />

      <QuoteBand label={page.tag} title={page.ctaTitle ?? 'Tell us what you need inspected.'} />

      <RelatedLinks label={page.relatedLabel ?? 'Related'} links={page.related ?? []} />
    </>
  );
}
