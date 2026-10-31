import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="wrap" style={{ paddingTop: 140, paddingBottom: 140, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="eyebrow">Error 404</div>
      <h1 className="disp" style={{ margin: 0, fontSize: 'clamp(56px, calc(9 * var(--vw)), 120px)' }}>No indication<br />found.</h1>
      <p className="lead">The page you are looking for has moved or does not exist.</p>
      <div className="btn-row">
        <Link href="/" className="btn btn-ink">Back to home →</Link>
        <Link href="/contact" className="btn btn-line">Contact us</Link>
      </div>
    </section>
  );
}
