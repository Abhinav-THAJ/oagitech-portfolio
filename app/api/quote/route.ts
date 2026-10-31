import { NextResponse } from 'next/server';

/**
 * Receives quote requests from /contact.
 * TODO (before launch): send the request by email (e.g. Resend, SMTP) or store it in a CRM.
 * Right now it validates and logs the request so the form works end to end.
 */
export async function POST(req: Request) {
  let body: Record<string, string>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid request' }, { status: 400 }); }

  const name = (body.name ?? '').trim();
  const email = (body.email ?? '').trim();
  const phone = (body.phone ?? '').trim();
  if (!name || (!email && !phone)) {
    return NextResponse.json({ error: 'Name and an email or phone number are required' }, { status: 422 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Email address looks invalid' }, { status: 422 });
  }

  const ref = `OAG-Q-${Date.now().toString(36).toUpperCase()}`;
  console.log('[quote]', ref, { service: body.service, location: body.location, scope: body.scope, date: body.date, company: body.company, name, email, phone });

  return NextResponse.json({ ok: true, ref });
}
