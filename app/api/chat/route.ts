import { streamText } from 'ai';
import { createGroq } from '@ai-sdk/groq';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { AI_ASSISTANT_SYSTEM_PROMPT } from '@/lib/prompts';
import { PERSONAL_DATA } from '@/lib/data';
import { checkChatRateLimit } from '@/lib/ratelimit';

// Prompt Injection Sanitizer
function sanitizeInput(text: string): string {
  if (typeof text !== 'string') return '';
  return text
    .replace(/ignore\s+previous\s+instructions/gi, '[FILTERED]')
    .replace(/system\s+prompt:/gi, '[FILTERED]')
    .replace(/override\s+rules/gi, '[FILTERED]')
    .slice(0, 1000);
}

// Grounded Fallback Q&A Engine
function groundedFallback(query: string): string {
  const q = query.toLowerCase();
  if (q.includes('ipk') || q.includes('pendidikan') || q.includes('lulus') || q.includes('cumlaude')) {
    return `Indra Mulyana, S.H. adalah lulusan **S1 Hukum Pidana Islam** dari UIN Sunan Gunung Djati Bandung (2022–2026) berpredikat **Cumlaude dengan IPK ${PERSONAL_DATA.gpa}**. Beliau juga merupakan **Lulusan Terbaik SMK Negeri 2 Banjar** jurusan Teknik Komputer & Jaringan (Nilai: 86).`;
  }
  if (q.includes('jurnal') || q.includes('deepfake') || q.includes('riset') || q.includes('publikasi') || q.includes('klikhukum')) {
    return `Indra aktif dalam penulisan & riset hukum terakreditasi:\n1. **Jurnal Galuh Justisi (SINTA 4)**: "Sistem Pemilihan Umum di Indonesia dalam Perspektif Fiqh Siyasah" (Vol 12 No 2, Sep 2024).\n2. **Jurnal Galuh Justisi (SINTA 4)**: "Kekosongan Hukum Tindak Pidana Penipuan Deepfake AI dalam UU ITE No 1 Tahun 2024 Menurut Fiqh Jinayah" (Vol 14 No 1, Mar 2026).\n3. **Klikhukum.id**: Esai Hukum Pidana Pelaku ODGJ perspektif KUHP & KUHAP Baru (Jul 2026).`;
  }
  if (q.includes('magang') || q.includes('pengadilan') || q.includes('pengalaman')) {
    return `Indra memiliki pengalaman peradilan nyata:\n- **Pengadilan Agama Kelas 1A Ciamis** (Jan–Feb 2025): Prosedur litigasi peradilan agama, verifikasi berkas perceraian & waris, administrasi SIPP.\n- **Pengadilan Negeri Kelas 1B Ciamis** (Juli–Ags 2024): Membantu 3 kepaniteraan (Pidana, Perdata, Hukum), e-Court, & observasi langsung persidangan.`;
  }
  if (q.includes('project') || q.includes('proyek') || q.includes('web') || q.includes('ryoku') || q.includes('jinayah') || q.includes('cargo') || q.includes('sehat') || q.includes('coffee')) {
    return `Indra memiliki 5 aplikasi web live di Vercel:\n1. **Jinayah App** — React 19 + Supabase PostgreSQL.\n2. **Ryoku Anime** — Next.js App Router + Vercel Postgres.\n3. **WUS Cargo** — Next.js + Node.js + PostgreSQL.\n4. **Jejak Sehat** — React + MySQL.\n5. **Coffee Shop Web** — React + Express.js + MongoDB.`;
  }
  if (q.includes('skill') || q.includes('keahlian') || q.includes('database') || q.includes('stack') || q.includes('teknologi')) {
    return `Kompetensi Fullstack & Hukum Indra:\n- **Fullstack Web & DB**: Next.js, React 19, TypeScript, Node.js, Express, PostgreSQL, MySQL, Supabase, Prisma ORM, Tailwind CSS, Framer Motion.\n- **Legal**: Legal Analysis & Drafting, Hukum Acara Peradilan (PA & PN), Cybercrime AI & UU ITE 2024, Fiqh Jinayah & Siyasah.\n- **Sertifikasi**: MOS Word, TOAFL Arabic, English Proficiency, IBM SkillsBuild AI.`;
  }
  if (q.includes('kontak') || q.includes('email') || q.includes('wa') || q.includes('whatsapp') || q.includes('hubungi')) {
    return `Kontak langsung Indra Mulyana, S.H.:\n- **Email**: ${PERSONAL_DATA.email}\n- **WhatsApp**: ${PERSONAL_DATA.formattedWhatsapp}\n- **Lokasi**: ${PERSONAL_DATA.location}`;
  }
  if (q.includes('prestasi') || q.includes('juara') || q.includes('penghargaan') || q.includes('achievement')) {
    return `Prestasi Indra Mulyana:\n- 🏆 **Juara 1 Lomba Menulis Surat Tingkat Nasional** (100+ peserta se-Indonesia, 2025).\n- 🏅 **Lulusan Terbaik SMK Negeri 2 Banjar** jurusan Teknik Komputer & Jaringan, 2022.`;
  }
  return `Terima kasih! Saya **Indra AI Assistant**. Indra Mulyana, S.H. adalah Sarjana Hukum Cumlaude (IPK 3.71/4.00), Fullstack Web Developer, dengan 2 Jurnal SINTA 4 dan 5 aplikasi web live. Ada yang ingin Anda tanyakan lebih lanjut?`;
}

export async function POST(req: Request) {
  try {
    // 1. IP Rate Limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';
    if (!(await checkChatRateLimit(ip))) {
      return new Response(
        JSON.stringify({ error: 'Batas penggunaan tercapai. Tunggu 1 menit sebelum mengirim pesan lagi.' }),
        { status: 429, headers: { 'Content-Type': 'application/json', 'Retry-After': '60' } }
      );
    }

    // 2. Parse & Sanitize Input
    const body = await req.json();
    const { messages } = body || {};

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'Format pesan tidak valid.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const lastContent = messages[messages.length - 1]?.content || '';
    const cleanedContent = sanitizeInput(lastContent);

    const sanitizedMessages = messages.map((m: any, idx: number) => ({
      role: m.role as 'user' | 'assistant',
      content: idx === messages.length - 1 ? cleanedContent : String(m.content).slice(0, 500),
    }));

    // 3. Try Groq Streaming (Ultra Fast Llama 3.3 70B)
    const groqKey = process.env.GROQ_API_KEY;
    if (groqKey) {
      try {
        const groq = createGroq({ apiKey: groqKey });
        const result = await streamText({
          model: groq('llama-3.3-70b-versatile'),
          system: AI_ASSISTANT_SYSTEM_PROMPT,
          messages: sanitizedMessages,
          maxTokens: 800,
          temperature: 0.7,
        });
        return result.toDataStreamResponse();
      } catch (groqErr: any) {
        console.warn('Groq API Error, falling back:', groqErr?.message);
      }
    }

    // 4. Try Gemini Streaming as Fallback
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) {
      try {
        const google = createGoogleGenerativeAI({ apiKey: geminiKey });
        const result = await streamText({
          model: google('gemini-flash-latest'),
          system: AI_ASSISTANT_SYSTEM_PROMPT,
          messages: sanitizedMessages,
          maxTokens: 600,
          temperature: 0.7,
        });
        return result.toDataStreamResponse();
      } catch (geminiErr: any) {
        console.warn('Gemini API Error, falling back:', geminiErr?.message);
      }
    }

    // 5. Fallback: Grounded Q&A (when no API key or both failed)
    const fallbackReply = groundedFallback(cleanedContent);
    return new Response(JSON.stringify({ reply: fallbackReply }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Chat API Error:', error?.message);
    return new Response(
      JSON.stringify({ error: 'Gagal memproses pesan.', details: error?.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
