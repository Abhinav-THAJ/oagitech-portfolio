import Image from 'next/image';
import Link from 'next/link';

export function Frame({ src, alt, tag, priority, style, sizes = '(max-width: 820px) 100vw, 50vw' }: {
  src: string; alt: string; tag?: string; priority?: boolean; style?: React.CSSProperties; sizes?: string;
}) {
  return (
    <div className="frame" style={style}>
      <Image src={src} alt={alt} fill sizes={sizes} className="frame-img" priority={priority} />
      <i /><i /><i /><i />
      {tag && <div className="frame-tag">{tag}</div>}
    </div>
  );
}

export function Crumbs({ trail }: { trail: { t: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="crumbs">
      <Link href="/">Home</Link>
      {trail.map((c, i) => (
        <span key={i} style={{ display: 'contents' }}>
          <span aria-hidden="true">/</span>
          {c.href ? <Link href={c.href}>{c.t}</Link> : <span aria-current="page">{c.t}</span>}
        </span>
      ))}
    </nav>
  );
}

export function QuoteBand({ label, title }: { label: string; title: string }) {
  return (
    <section className="qband">
      <div className="wrap">
        <div style={{ flex: '1 1 460px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="mono" style={{ fontSize: 12, letterSpacing: '0.14em' }}>{label} · QUICK QUOTE</div>
          <h2 className="disp">{title}</h2>
        </div>
        <form action="/contact" method="get">
          <label>COMPANY<input name="company" autoComplete="organization" /></label>
          <label>PHONE / WHATSAPP<input name="phone" type="tel" autoComplete="tel" /></label>
          <button type="submit" className="btn btn-ink">Send request →</button>
        </form>
      </div>
    </section>
  );
}

export function RelatedLinks({ label, links }: { label: string; links: { t: string; href: string }[] }) {
  if (!links.length) return null;
  return (
    <section className="wrap related">
      <div className="eyebrow">{label}</div>
      <div className="related-grid">
        {links.map((r) => (
          <Link key={r.href + r.t} href={r.href}>
            <span className="disp">{r.t}</span><span aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
