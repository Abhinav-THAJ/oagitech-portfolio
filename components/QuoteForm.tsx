'use client';

import { useState } from 'react';

const SERVICES = [
  ['insp', 'Inspection'], ['weld', 'Welding'], ['ndt', 'NDT'], ['civil', 'Civil / Structural'],
  ['train', 'Training'], ['cal', 'Calibration'], ['svc', 'Industrial services'], ['mfg', 'Products']
] as const;

type Form = { service: string; location: string; scope: string; date: string; notes: string; name: string; company: string; email: string; phone: string };

export default function QuoteForm({ initialCompany = '', initialPhone = '' }: { initialCompany?: string; initialPhone?: string }) {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [ref, setRef] = useState('');
  const [f, setF] = useState<Form>({ service: 'ndt', location: '', scope: '', date: '', notes: '', name: '', company: initialCompany, email: '', phone: initialPhone });
  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });
  const label = SERVICES.find(([k]) => k === f.service)?.[1] ?? '';

  async function submit() {
    if (!f.name || !(f.email || f.phone)) { setStatus('error'); return; }
    setStatus('sending');
    try {
      const res = await fetch('/api/quote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setRef(data.ref); setStatus('done'); setStep(4);
    } catch { setStatus('error'); }
  }

  const steps = ['SERVICE', 'DETAILS', 'CONTACT'];

  return (
    <div style={{ flex: '1.2 1 520px', minWidth: 0, background: '#fff', border: '1px solid var(--line)', boxShadow: '14px 14px 0 var(--stone)' }}>
      <ol style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', borderBottom: '1px solid var(--line)', margin: 0, padding: 0, listStyle: 'none' }}>
        {steps.map((s, i) => (
          <li key={s} className="mono" aria-current={step === i + 1 ? 'step' : undefined}
            style={{ padding: '16px 18px', fontSize: 12, letterSpacing: '0.08em', background: step >= i + 1 ? 'var(--ink)' : 'var(--paper)', color: step >= i + 1 ? 'var(--paper)' : 'var(--label)' }}>
            0{i + 1} · {s}
          </li>
        ))}
      </ol>
      <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
        {step === 1 && (
          <fieldset style={{ border: 0, margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <legend className="disp" style={{ fontSize: 40, marginBottom: 18 }}>What do you need?</legend>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: 10 }}>
              {SERVICES.map(([k, l]) => (
                <button key={k} type="button" aria-pressed={f.service === k} onClick={() => setF({ ...f, service: k })}
                  style={{ minHeight: 58, textAlign: 'left', padding: '0 16px', cursor: 'pointer', fontSize: 16, fontWeight: f.service === k ? 600 : 500,
                    background: f.service === k ? 'var(--ink)' : 'var(--paper)', color: f.service === k ? 'var(--paper)' : 'var(--ink)', border: `1px solid ${f.service === k ? 'var(--ink)' : 'var(--line)'}` }}>
                  {l}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h2 className="disp" style={{ margin: 0, fontSize: 40 }}>Job details · {label}</h2>
            <label className="fld-label">SITE LOCATION<input className="fld" value={f.location} onChange={set('location')} placeholder="e.g. Yanbu Industrial City" /></label>
            <div className="grid-2">
              <label className="fld-label">QUANTITY / SCOPE<input className="fld" value={f.scope} onChange={set('scope')} placeholder="e.g. 120 weld joints" /></label>
              <label className="fld-label">NEEDED BY<input className="fld" type="date" value={f.date} onChange={set('date')} /></label>
            </div>
            <label className="fld-label">NOTES<textarea className="fld" rows={4} value={f.notes} onChange={set('notes')} placeholder="Codes, standards, access constraints…" /></label>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h2 className="disp" style={{ margin: 0, fontSize: 40 }}>Where should we reply?</h2>
            <div className="grid-2">
              <label className="fld-label">FULL NAME *<input className="fld" value={f.name} onChange={set('name')} autoComplete="name" required /></label>
              <label className="fld-label">COMPANY<input className="fld" value={f.company} onChange={set('company')} autoComplete="organization" /></label>
              <label className="fld-label">EMAIL<input className="fld" type="email" value={f.email} onChange={set('email')} autoComplete="email" /></label>
              <label className="fld-label">PHONE / WHATSAPP<input className="fld" type="tel" value={f.phone} onChange={set('phone')} autoComplete="tel" /></label>
            </div>
            {status === 'error' && <p role="alert" style={{ margin: 0, color: 'var(--accent-text)', fontSize: 15 }}>Please add your name and an email or phone number, then try again.</p>}
          </div>
        )}

        {step === 4 && (
          <div role="status" style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '12px 0' }}>
            <div className="mono" style={{ fontSize: 12, letterSpacing: '0.14em', color: 'var(--accent-text)' }}>REQUEST RECEIVED · REF {ref}</div>
            <h2 className="disp" style={{ margin: 0, fontSize: 48 }}>Thank you. An engineer will call you shortly.</h2>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: 'var(--muted)' }}>For urgent jobs, call +966 14 322 6503.</p>
          </div>
        )}

        {step < 4 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, borderTop: '1px solid var(--line)', paddingTop: 20 }}>
            {step > 1 ? <button type="button" className="btn btn-line" onClick={() => setStep(step - 1)}>← Back</button> : <span />}
            {step < 3
              ? <button type="button" className="btn btn-accent" onClick={() => setStep(step + 1)}>Continue →</button>
              : <button type="button" className="btn btn-accent" onClick={submit} disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send request →'}</button>}
          </div>
        )}
      </div>
    </div>
  );
}
