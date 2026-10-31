import { NextResponse } from 'next/server';

/**
 * Certificate lookup.
 * TODO (before launch): replace SAMPLE with a real database query (e.g. Supabase / Postgres table of issued certificates).
 */
const SAMPLE: Record<string, { holder: string; scope: string; issued: string; validUntil: string }> = {
  'OAG-TR-2026-00418': { holder: '[Holder name]', scope: 'Rigger Training & Examination', issued: '[DD MMM YYYY]', validUntil: '[DD MMM YYYY]' }
};

export async function GET(req: Request) {
  const no = (new URL(req.url).searchParams.get('no') ?? '').trim().toUpperCase();
  const hit = SAMPLE[no];
  if (!no || !hit) return NextResponse.json({ found: false });
  return NextResponse.json({ found: true, number: no, ...hit });
}
