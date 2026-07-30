import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

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

    // 3. Email Dispatch via Resend SDK
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const { error: resendError } = await resend.emails.send({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: ['indramulyanaa674@gmail.com'],
          replyTo: email,
          subject: `[Portfolio Inquiry] ${subject} — dari ${name}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
              <h2 style="color: #1e40af; margin-top: 0;">📨 Pesan Baru dari Portofolio</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #6b7280; width: 100px;">Nama</td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
                <tr><td style="padding: 8px 0; color: #6b7280;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #6b7280;">Subjek</td><td style="padding: 8px 0; font-weight: 600;">${subject}</td></tr>
              </table>
              <div style="margin-top: 16px; padding: 16px; background: #f8fafc; border-left: 4px solid #3b82f6; border-radius: 4px;">
                <p style="margin: 0; white-space: pre-wrap; color: #1e293b;">${message}</p>
              </div>
              <p style="margin-top: 16px; font-size: 12px; color: #9ca3af;">Dikirim pada: ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB</p>
            </div>
          `,
        });

        if (resendError) {
          console.warn('Resend error:', resendError);
        } else {
          return NextResponse.json({
            success: true,
            message: 'Pesan Anda telah berhasil terkirim! Indra akan segera merespons.',
          });
        }
      } catch (err) {
        console.warn('Resend SDK error:', err);
      }
    }

    // 4. Fallback log if no Resend key
    console.log('Contact Submission:', { name, email, subject, message, timestamp: new Date().toISOString() });

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
