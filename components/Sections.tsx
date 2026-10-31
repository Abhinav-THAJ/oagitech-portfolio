import Link from 'next/link';
import { itemOf, type Section, type Tone } from '@/lib/content';

const pad = (n: number) => String(n).padStart(2, '0');

export default function Sections({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((s, i) => {
        const tone: Tone = s.tone ?? (i % 2 ? 'stone' : 'paper');
        const items = (s.items ?? []).map(itemOf);
        return (
          <section key={i} className={`sec ${tone}`}>
            <div className="wrap">
              <div className="sec-head">
                <div>
                  <div className="eyebrow">{pad(i + 1)} / {s.eyebrow ?? 'Details'}</div>
                  <h2 className="disp">{s.heading}</h2>
                </div>
                {s.body && <p>{s.body}</p>}
              </div>

              {s.kind === 'index' && (
                <div className="s-index">
                  {items.map((it, j) => (
                    <Link key={j} href={it.href ?? '#'}>
                      <span className="mono" style={{ fontSize: 13 }}>{pad(j + 1)}</span>
                      <span className="disp t">{it.t}</span>
                      <span className="d">{it.d}</span>
                      <span className="arrow" aria-hidden="true">→</span>
                    </Link>
                  ))}
                </div>
              )}

              {s.kind === 'list' && (
                <div className="s-list">
                  {items.map((it, j) => (
                    <div key={j}>
                      <span className="num">{pad(j + 1)}</span>
                      <div><strong>{it.t}</strong>{it.d && <p>{it.d}</p>}</div>
                    </div>
                  ))}
                </div>
              )}

              {s.kind === 'grid' && (
                <div className="s-grid">
                  {items.map((it, j) => (
                    <div key={j}>
                      <span className="num" style={{ fontSize: 12 }}>{pad(j + 1)}</span>
                      <h3 className="disp">{it.t}</h3>
                      {it.d && <p>{it.d}</p>}
                    </div>
                  ))}
                </div>
              )}

              {s.kind === 'steps' && (
                <div className="s-steps">
                  {items.map((it, j) => (
                    <div key={j}>
                      <div className="step"><i />STEP {pad(j + 1)}</div>
                      <h3 className="disp">{it.t}</h3>
                      {it.d && <p>{it.d}</p>}
                    </div>
                  ))}
                </div>
              )}

              {s.kind === 'chips' && (
                <div className="s-chips">{items.map((it, j) => <span key={j}>{it.t}</span>)}</div>
              )}

              {s.kind === 'report' && (
                <div className="s-report">
                  <ul>{items.map((it, j) => <li key={j}><span className="num">{pad(j + 1)}</span>{it.t}</li>)}</ul>
                  <figure className="report-sheet">
                    <div className="rh">
                      <span className="disp" style={{ fontSize: 22 }}>OAGITECH</span>
                      <span className="mono" style={{ fontSize: 10, textAlign: 'right', color: 'var(--label)' }}>TEST REPORT<br />REPORT NO. [SAMPLE]</span>
                    </div>
                    <div className="mono" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px', fontSize: 11, color: 'var(--muted)' }}>
                      <span>CLIENT: [—]</span><span>CODE: ASME V</span><span>COMPONENT: [—]</span><span>MATERIAL: [—]</span>
                    </div>
                    <table>
                      <thead><tr><th>JOINT</th><th>INDICATION</th><th>RESULT</th></tr></thead>
                      <tbody>
                        <tr><td>W-01</td><td>NRI</td><td>ACCEPT</td></tr>
                        <tr><td>W-02</td><td>[—]</td><td style={{ color: 'var(--accent-text)' }}>REVIEW</td></tr>
                        <tr><td>W-03</td><td>NRI</td><td>ACCEPT</td></tr>
                      </tbody>
                    </table>
                    <figcaption className="mono" style={{ fontSize: 11, color: 'var(--label)' }}>Sample report layout — illustrative</figcaption>
                  </figure>
                </div>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}
