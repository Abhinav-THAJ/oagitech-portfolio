'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { CONTACT, MENUS, menuKeyFor } from '@/lib/nav';
import Logo from './Logo';

export default function SiteHeader() {
  const pathname = usePathname() || '/';
  const active = menuKeyFor(pathname);
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close menus whenever the route changes
  useEffect(() => { setOpen(null); setMobile(false); }, [pathname]);

  // Escape closes any open dropdown
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const enter = (key: string) => { if (closeTimer.current) clearTimeout(closeTimer.current); setOpen(key); };
  const leave = () => { closeTimer.current = setTimeout(() => setOpen(null), 120); };

  return (
    <header className="hdr">
      <div className="hdr-top">
        <div className="wrap">
          <span>YANBU · KINGDOM OF SAUDI ARABIA</span>
          <span className="hdr-top-links">
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <Link href="/verify">VERIFY CERTIFICATE</Link>
            <a href="#" lang="ar" className="hdr-ar">العربية</a>
          </span>
        </div>
      </div>

      <div className="wrap hdr-main">
        <Logo />
        <div className="btn-row">
          <Link href="/contact" className="btn btn-accent hdr-cta" style={{ minHeight: 46, fontSize: 13 }}>Request a quote →</Link>
          <button
            type="button"
            className="hdr-burger"
            aria-label={mobile ? 'Close menu' : 'Open menu'}
            aria-expanded={mobile}
            onClick={() => setMobile((v) => !v)}
          >
            <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">
              {mobile
                ? <path d="M3 1l14 12M17 1L3 13" stroke="currentColor" strokeWidth="2" />
                : <path d="M0 1h20M0 7h20M0 13h20" stroke="currentColor" strokeWidth="2" />}
            </svg>
          </button>
        </div>
      </div>

      <nav aria-label="Main" className={`nav${mobile ? ' is-mobile-open' : ''}`}>
        <div className="wrap">
          <div className={`nav-item${active === 'home' ? ' is-active' : ''}`}>
            <div className="nav-head">
              <Link href="/" className="nav-link nav-link-solo" aria-current={active === 'home' ? 'page' : undefined}>Home</Link>
            </div>
          </div>
          {MENUS.map((m) => {
            const isOpen = open === m.key;
            const panelId = `menu-${m.key}`;
            return (
              <div
                key={m.key}
                className={`nav-item${active === m.key ? ' is-active' : ''}${isOpen ? ' is-open' : ''}`}
                onMouseEnter={() => enter(m.key)}
                onMouseLeave={leave}
              >
                <div className="nav-head">
                  <Link href={m.href} className="nav-link" aria-current={active === m.key ? 'page' : undefined}>{m.label}</Link>
                  <button
                    type="button"
                    className="nav-chev"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    aria-label={`Show ${m.label} menu`}
                    onClick={() => setOpen(isOpen ? null : m.key)}
                  >
                    <svg width="12" height="8" viewBox="0 0 10 7" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
                  </button>
                </div>
                {isOpen && (
                  <div id={panelId} className={`panel${m.alignRight ? ' right' : ''}`} style={{ width: m.width }}>
                    <div className="panel-head">
                      <span>{m.eyebrow}</span>
                      <Link href={m.href}>VIEW ALL →</Link>
                    </div>
                    <div className="panel-grid" style={{ gridTemplateColumns: `repeat(${m.cols}, minmax(0, 1fr))` }}>
                      {m.items.map((it) => (
                        <Link key={it.code + it.t} href={it.href} className="panel-link">
                          <span className="panel-code">{it.code}</span>
                          <span className="panel-t">{it.t}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          <Link href="/contact" className="btn btn-accent nav-cta">Request a quote →</Link>
        </div>
      </nav>
    </header>
  );
}
