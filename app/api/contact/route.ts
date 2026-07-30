import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import { checkContactRateLimit } from '@/lib/ratelimit';

// Contact Form Schema
const contactSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter').max(100, 'Nama maksimal 100 karakter'),
  email: z.string().email('Format email tidak valid'),
  subject: z.string().min(3, 'Subjek minimal 3 karakter').max(150, 'Subjek maksimal 150 karakter'),
  message: z.string().min(10, 'Pesan minimal 10 karakter').max(2000, 'Pesan maksimal 2000 karakter'),
});

export async function POST(req: Request) {
  try {
    // 1. IP Rate Limiting Check
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';
    if (!(await checkContactRateLimit(ip))) {
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

    if (!resendApiKey) {
      console.error('CRITICAL: RESEND_API_KEY is not set in Environment Variables!');
      return NextResponse.json(
        { error: 'Gagal mengirim pesan: Server email (RESEND_API_KEY) belum dikonfigurasi di Vercel Production.' },
        { status: 500 }
      );
    }

    try {
      const resend = new Resend(resendApiKey);
      
      const emailHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px; background-color: #ffffff;">
          <h2 style="color: #1e40af; margin-top: 0; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">📨 Pesan Baru dari Portofolio Indra Mulyana</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr><td style="padding: 8px 0; color: #4b5563; width: 120px; font-weight: bold;">Pengirim:</td><td style="padding: 8px 0; color: #111827;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #4b5563; font-weight: bold;">Email Reply:</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #4b5563; font-weight: bold;">Subjek:</td><td style="padding: 8px 0; color: #111827; font-weight: 600;">${subject}</td></tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background-color: #f8fafc; border-left: 4px solid #3b82f6; border-radius: 4px;">
            <p style="margin: 0; font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: bold; letter-spacing: 0.05em; margin-bottom: 8px;">Isi Pesan:</p>
            <p style="margin: 0; white-space: pre-wrap; color: #1e293b; font-size: 14px; line-height: 1.6;">${message}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #9ca3af; text-align: center; border-top: 1px solid #f1f5f9; padding-top: 12px;">
            Dikirim melalui Portofolio Website Indra Mulyana, S.H. pada ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB
          </p>
        </div>
      `;

      // Send to verified account email for onboarding@resend.dev (or both)
      let resendResponse = await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: ['indratea80@gmail.com'],
        replyTo: email,
        subject: `[Portfolio Inquiry] ${subject} — dari ${name}`,
        html: emailHtml,
      });

      if (resendResponse.error) {
        console.error('Resend Dispatch Error:', resendResponse.error);
        return NextResponse.json(
          { error: `Gagal mengirim email: ${resendResponse.error.message}` },
          { status: 500 }
        );
      }

      console.log('Resend Dispatch Success ID:', resendResponse.data?.id);
      return NextResponse.json({
        success: true,
        message: 'Pesan Anda telah berhasil terkirim! Indra Mulyana akan segera merespons ke email Anda.',
        emailId: resendResponse.data?.id,
      });

    } catch (err: any) {
      console.error('Resend Exception:', err?.message || err);
      return NextResponse.json(
        { error: `Terjadi kesalahan saat pengiriman email: ${err?.message || 'Unknown error'}` },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error('Contact Form System Error:', error?.message || error);
    return NextResponse.json(
      { error: 'Gagal memproses formulir kontak.', details: error.message },
      { status: 500 }
    );
  }
}
