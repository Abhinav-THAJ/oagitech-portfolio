'use client';

import { useEffect, useState } from 'react';

type Result = { found: true; holder: string; scope: string; issued: string; validUntil: string; number: string } | { found: false };

export default function VerifyForm({ initial = '' }: { initial?: string }) {
  const [q, setQ] = useState(initial);
  const [res, setRes] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  async function check(no = q) {
    if (!no.trim()) return;
    setLoading(true);
    try {
      const r = await fetch(`/api/verify?no=${encodeURIComponent(no.trim())}`);
      setRes(await r.json());
    } catch { setRes({ found: false }); }
    setLoading(false);
  }

  // Arriving from the home page form (/verify?no=...) checks immediately
  useEffect(() => { if (initial) check(initial); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 620 }}>
      <form onSubmit={(e) => { e.preventDefault(); check(); }} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <label htmlFor="certno" className="mono" style={{ fontSize: 12, letterSpacing: '0.1em', color: 'var(--label-dark)' }}>CERTIFICATE NUMBER</label>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <input id="certno" className="mono" value={q} onChange={(e) => { setQ(e.target.value); setRes(null); }} placeholder="e.g. OAG-TR-2026-00418"
            style={{ flex: '1 1 280px', minHeight: 64, border: '2px solid var(--paper)', background: 'var(--ink-2)', color: 'var(--paper)', padding: '0 18px', fontSize: 18 }} />
          <button type="submit" className="btn btn-accent" style={{ minHeight: 64 }} disabled={loading}>{loading ? 'Checking…' : 'Verify →'}</button>
        </div>
        <span className="mono" style={{ fontSize: 12, color: 'var(--faint-dark)' }}>Try the sample: OAG-TR-2026-00418</span>
      </form>

      <div aria-live="polite">
        {res?.found && (
          <div style={{ background: 'var(--paper)', color: 'var(--ink)', borderLeft: '8px solid var(--ok)', padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <span className="disp" style={{ fontSize: 34 }}>Valid certificate</span>
              <span className="mono" style={{ fontSize: 12, background: 'var(--ok)', color: '#fff', padding: '6px 10px' }}>● VERIFIED</span>
            </div>
            <dl className="mono" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px 20px', fontSize: 13, margin: 0 }}>
              <dt style={{ color: 'var(--label)' }}>HOLDER</dt><dd style={{ margin: 0 }}>{res.holder}</dd>
              <dt style={{ color: 'var(--label)' }}>COURSE / SCOPE</dt><dd style={{ margin: 0 }}>{res.scope}</dd>
              <dt style={{ color: 'var(--label)' }}>ISSUED</dt><dd style={{ margin: 0 }}>{res.issued}</dd>
              <dt style={{ color: 'var(--label)' }}>VALID UNTIL</dt><dd style={{ margin: 0 }}>{res.validUntil}</dd>
              <dt style={{ color: 'var(--label)' }}>CERTIFICATE NO.</dt><dd style={{ margin: 0 }}>{res.number}</dd>
            </dl>
          </div>
        )}
        {res && !res.found && (
          <div style={{ background: 'var(--paper)', color: 'var(--ink)', borderLeft: '8px solid var(--accent-text)', padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span className="disp" style={{ fontSize: 34 }}>No match found</span>
            <span style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--muted)' }}>Check the number and try again, or contact us at info@oagitech.com to confirm the certificate.</span>
          </div>
        )}
      </div>
    </div>
  );
}
