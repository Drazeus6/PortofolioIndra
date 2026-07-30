import { NextResponse } from 'next/server';
import { z } from 'zod';

// Contact Form Schema
const contactSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter').max(100, 'Nama maksimal 100 karakter'),
  email: z.string().email('Format email tidak valid'),
  subject: z.string().min(3, 'Subjek minimal 3 karakter').max(150, 'Subjek maksimal 150 karakter'),
  message: z.string().min(10, 'Pesan minimal 10 karakter').max(2000, 'Pesan maksimal 2000 karakter'),
});

// In-Memory Rate Limiter for Contact Form (5 requests per 10 mins)
const contactRateLimitMap = new Map<string, { count: number; lastReset: number }>();
const CONTACT_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_CONTACT_REQUESTS = 5;

function checkContactRateLimit(ip: string): boolean {
  const now = Date.now();
  const userRate = contactRateLimitMap.get(ip);

  if (!userRate) {
    contactRateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }

  if (now - userRate.lastReset > CONTACT_LIMIT_WINDOW_MS) {
    contactRateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }

  if (userRate.count >= MAX_CONTACT_REQUESTS) {
    return false;
  }

  userRate.count += 1;
  return true;
}

export async function POST(req: Request) {
  try {
    // 1. IP Rate Limiting Check
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';
    if (!checkContactRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Terlalu banyak pengiriman pesan. Silakan tunggu 10 menit sebelum mencoba lagi.' },
        { status: 429 }
      );
    }

    // 2. Body Parsing & Server-side Zod Validation
    const body = await req.json();
    const validation = contactSchema.safeParse(body);

    if (!validation.success) {
      const firstError = validation.error.issues[0]?.message || 'Data input tidak valid.';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { name, email, subject, message } = validation.data;

    // 3. Email Dispatch Integration (Resend API if key is present)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'Portfolio Inquiry <onboarding@resend.dev>',
            to: ['indramulyanaa674@gmail.com'],
            subject: `[Portfolio Inquiry] ${subject} - ${name}`,
            html: `
              <h3>Pesan Baru dari Portofolio Website</h3>
              <p><strong>Nama:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subjek:</strong> ${subject}</p>
              <p><strong>Pesan:</strong></p>
              <blockquote style="background: #f4f4f4; padding: 12px; border-left: 4px solid #0066ff;">${message}</blockquote>
            `,
          }),
        });

        if (resendRes.ok) {
          return NextResponse.json({
            success: true,
            message: 'Pesan Anda telah berhasil terkirim melalui Resend API!',
          });
        }
      } catch (err) {
        console.warn('Resend API delivery failed, fallback to local log:', err);
      }
    }

    // 4. Default Success Response
    console.log('Contact Submission Received:', { name, email, subject, message, timestamp: new Date().toISOString() });

    return NextResponse.json({
      success: true,
      message: 'Pesan Anda telah berhasil diterima dan akan dibalas secepatnya ke email Anda.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Gagal memproses pesan formulir kontak.', details: error.message },
      { status: 500 }
    );
  }
}
