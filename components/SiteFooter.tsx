import Link from 'next/link';
import { CONTACT } from '@/lib/nav';

export default function SiteFooter() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr-cta">
          <h2 className="disp">Tell us<br />what to inspect.</h2>
          <div className="btn-row">
            <Link href="/contact" className="btn btn-accent">Request a quote →</Link>
            <a href={CONTACT.whatsapp} className="btn btn-line-light">WhatsApp</a>
          </div>
        </div>
        <div className="ftr-cols">
          <div>
            <span className="disp" style={{ fontSize: 28, color: 'var(--paper)' }}>OAGITECH</span>
            <p style={{ margin: 0, lineHeight: 1.6 }}>Inspection, NDT, engineering consultancy, calibration and technical training — Yanbu, Kingdom of Saudi Arabia.</p>
          </div>
          <div>
            <span className="eyebrow">Technical</span>
            <Link href="/inspection">Inspection</Link>
            <Link href="/welding">Welding</Link>
            <Link href="/ndt">NDT</Link>
            <Link href="/civil-structural-geo">Civil / Structural / Geo</Link>
            <Link href="/calibration">Calibration</Link>
          </div>
          <div>
            <span className="eyebrow">More</span>
            <Link href="/training">Training</Link>
            <Link href="/services">Services</Link>
            <Link href="/manufacturing">Manufacturing</Link>
            <Link href="/verify">Verify a certificate</Link>
          </div>
          <div>
            <span className="eyebrow">Company</span>
            <Link href="/about">About us</Link>
            <Link href="/about/certifications">Certifications &amp; awards</Link>
            <Link href="/about/career">Career</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div>
            <span className="eyebrow">Contact</span>
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <span>{CONTACT.address}</span>
          </div>
        </div>
        <div className="ftr-bottom">
          <span>© {new Date().getFullYear()} OAGITECH. ALL RIGHTS RESERVED.</span>
          <span style={{ display: 'flex', gap: 20 }}>
            <a href="#">LINKEDIN</a><a href="#">INSTAGRAM</a><a href="#">FACEBOOK</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
