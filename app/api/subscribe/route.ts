import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = typeof body.email === 'string' ? body.email.trim() : '';

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // TODO: wire to ConvertKit or Mailchimp
    // const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
    // const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID;
    console.log('[subscribe] New subscriber:', email);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
