'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

export type Course = { code: string; cat: string; t: string; d: string; fmt: string; href: string };

const CATS = ['ALL', 'SAFETY', 'TECHNICAL', 'PROFESSIONAL'];

export default function TrainingCatalogue({ courses }: { courses: Course[] }) {
  const [cat, setCat] = useState('ALL');
  const shown = useMemo(() => (cat === 'ALL' ? courses : courses.filter((c) => c.cat === cat)), [cat, courses]);

  return (
    <section id="catalogue" className="wrap" style={{ paddingTop: 100, paddingBottom: 100 }}>
      <div className="sec-head" style={{ marginBottom: 36 }}>
        <div><div className="eyebrow">Course catalogue</div><h2 className="disp" style={{ fontSize: 68 }}>Find your course</h2></div>
        <div className="filters" role="group" aria-label="Filter courses by category">
          {CATS.map((k) => {
            const n = k === 'ALL' ? courses.length : courses.filter((c) => c.cat === k).length;
            return (
              <button key={k} type="button" aria-pressed={cat === k} onClick={() => setCat(k)}>
                {k} · {n}
              </button>
            );
          })}
        </div>
      </div>
      <div className="card-grid">
        {shown.map((c) => (
          <Link key={c.href} href={c.href} className="card">
            <div className="mono" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, letterSpacing: '0.1em' }}>
              <span>{c.code}</span><span className="card-l">{c.cat}</span>
            </div>
            <h3 className="disp">{c.t}</h3>
            <p className="card-d">{c.d}</p>
            <div className="mono" style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 12 }}>
              <span>{c.fmt}</span><span className="card-l">VIEW COURSE →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
