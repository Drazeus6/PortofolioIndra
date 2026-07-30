import { NextResponse } from 'next/server';
import { AI_ASSISTANT_SYSTEM_PROMPT } from '@/lib/prompts';
import { PERSONAL_DATA, EXPERIENCES, PROJECTS, ACHIEVEMENTS } from '@/lib/data';

// Simple In-Memory Rate Limiter (IP-based)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userRate = rateLimitMap.get(ip);

  if (!userRate) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }

  if (now - userRate.lastReset > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }

  if (userRate.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  userRate.count += 1;
  return true;
}

// Prompt Injection Sanitizer
function sanitizeInput(text: string): string {
  if (typeof text !== 'string') return '';
  return text
    .replace(/ignore\s+previous\s+instructions/gi, '[FILTERED]')
    .replace(/system\s+prompt:/gi, '[FILTERED]')
    .replace(/override\s+rules/gi, '[FILTERED]')
    .slice(0, 1000); // Max length limit
}

export async function POST(req: Request) {
  try {
    // 1. IP Rate Limiting Check
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Batas penggunaan tercapai. Silakan tunggu 1 menit sebelum mengirim pesan lagi.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      );
    }

    // 2. Parse & Sanitize Request
    const body = await req.json();
    const { messages } = body || {};

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Format pesan tidak valid.' }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1]?.content || '';
    const cleanPrompt = sanitizeInput(lastMessage);
    const query = cleanPrompt.toLowerCase();

    // 3. Optional External LLM Integration (Gemini / OpenAI API)
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              system_instruction: {
                parts: [{ text: AI_ASSISTANT_SYSTEM_PROMPT }],
              },
              contents: messages.map((m: any) => ({
                role: m.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: m.content }],
              })),
            }),
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const aiReply = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (aiReply) {
            return NextResponse.json({ reply: aiReply });
          }
        }
      } catch (err) {
        console.warn('Gemini API call fallback to grounded knowledge:', err);
      }
    }

    // 4. Robust Grounded Knowledge Response Engine
    let reply = '';

    if (query.includes('ipk') || query.includes('pendidikan') || query.includes('lulus') || query.includes('cumlaude')) {
      reply = `Indra Mulyana, S.H. adalah lulusan **S1 Hukum Pidana Islam** dari UIN Sunan Gunung Djati Bandung (2022–2026) berpredikat **Cumlaude dengan IPK ${PERSONAL_DATA.gpa}**. Beliau juga merupakan **Lulusan Terbaik SMK Negeri 2 Banjar** jurusan Teknik Komputer & Jaringan (Nilai: 86).`;
    } else if (query.includes('jurnal') || query.includes('deepfake') || query.includes('riset') || query.includes('publikasi') || query.includes('klikhukum')) {
      reply = `Indra aktif dalam penulisan & riset hukum terakreditasi:\n1. **Jurnal Galuh Justisi (SINTA 4)**: "Sistem Pemilihan Umum di Indonesia dalam Perspektif Fiqh Siyasah" (Vol 12 No 2).\n2. **Jurnal Galuh Justisi (SINTA 4)**: "Kekosongan Hukum Tindak Pidana Penipuan Deepfake AI dalam UU ITE No 1 Tahun 2024 Menurut Fiqh Jinayah" (Vol 14 No 1).\n3. **Klikhukum.id**: Esai Hukum Pidana Pelaku Gangguan Jiwa (ODGJ) Perspektif KUHP & KUHAP Baru.`;
    } else if (query.includes('magang') || query.includes('pengadilan') || query.includes('pengalaman')) {
      reply = `Indra memiliki pengalaman peradilan nyata:\n- **Pengadilan Agama Kelas 1A Ciamis** (Jan-Feb 2025): Prosedur litigasi peradilan agama, verifikasi berkas, & administrasi SIPP.\n- **Pengadilan Negeri Kelas 1B Ciamis** (Juli-Ags 2024): Membantu 3 kepaniteraan (Panitera Pidana, Panitera Perdata, Panitera Hukum), PTSP, & e-Court.`;
    } else if (query.includes('project') || query.includes('proyek') || query.includes('web') || query.includes('ryoku') || query.includes('jinayah') || query.includes('cargo') || query.includes('sehat')) {
      reply = `Indra telah mengoperasikan 5 aplikasi web live di Vercel:\n1. **Jinayah App** (https://jinayah-2yio.vercel.app/) - React 19, Supabase PostgreSQL.\n2. **Ryoku Anime** (https://ryoku-seven.vercel.app/) - Next.js App Router, Vercel Postgres.\n3. **WUS Cargo** (https://wuscargo.vercel.app/) - Next.js, Node.js, PostgreSQL.\n4. **Jejak Sehat** (https://jejaksehat.vercel.app/) - React, MySQL, PostgreSQL.\n5. **Coffee Shop Web** (https://coffeshopwebsite.vercel.app/) - React, Express, MongoDB.`;
    } else if (query.includes('skill') || query.includes('keahlian') || query.includes('database') || query.includes('stack')) {
      reply = `Kompetensi Fullstack & Hukum Indra Mulyana:\n- **Fullstack Web & DB**: Next.js, React 19, TypeScript, Node.js, Express, PostgreSQL, MySQL, Supabase, Prisma ORM, Tailwind CSS.\n- **Legal**: Legal Analysis & Drafting, Hukum Acara Peradilan (PA & PN), Cybercrime AI & UU ITE 2024, Fiqh Jinayah & Siyasah.\n- **Sertifikasi**: MOS Word, TOAFL Arabic, English Proficiency, IBM SkillsBuild AI.`;
    } else if (query.includes('kontak') || query.includes('email') || query.includes('wa') || query.includes('whatsapp')) {
      reply = `Kontak langsung Indra Mulyana, S.H.:\n- **Email**: ${PERSONAL_DATA.email}\n- **WhatsApp**: ${PERSONAL_DATA.formattedWhatsapp}\n- **Lokasi**: ${PERSONAL_DATA.location}`;
    } else {
      reply = `Terima kasih! Saya Indra AI Assistant. Indra Mulyana, S.H. adalah Sarjana Hukum Cumlaude (IPK 3.71) & Fullstack Web Developer yang menguasai Next.js, PostgreSQL, Legal Drafting, serta memiliki 5 aplikasi web live dan 2 publikasi Jurnal SINTA 4. Ada informasi spesifik yang ingin Anda tanyakan?`;
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Gagal memproses pesan AI.', details: error.message },
      { status: 500 }
    );
  }
}
