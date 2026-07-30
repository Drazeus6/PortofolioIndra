import { NextResponse } from 'next/server';
import { AI_ASSISTANT_SYSTEM_PROMPT } from '@/lib/prompts';
import { PERSONAL_DATA, EXPERIENCES, SKILL_CATEGORIES } from '@/lib/data';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1]?.content || '';
    const query = lastMessage.toLowerCase();

    let reply = '';

    if (query.includes('ipk') || query.includes('pendidikan') || query.includes('lulus')) {
      reply = `Indra Mulyana adalah lulusan **S1 Hukum Pidana Islam** dari UIN Sunan Gunung Djati Bandung (angkatan 2022-2026) dengan IPK **${PERSONAL_DATA.gpa}** (Sangat Memuaskan). Sebelum itu, beliau menempuh studi di SMKN 2 Banjar jurusan Teknik Komputer dan Jaringan.`;
    } else if (query.includes('jurnal') || query.includes('deepfake') || query.includes('riset') || query.includes('publikasi')) {
      reply = `Indra telah mempublikasikan 2 Jurnal Ilmiah Hukum di Galuh Justisi:\n1. **"Sistem Pemilihan Umum di Indonesia dalam Perspektif Fiqh Siyasah"** (Vol 12 No 2 Sep 2024).\n2. **"Kekosongan Hukum Mengenai Tindak Pidana Penipuan Deepfake dalam UU ITE No 1 Tahun 2024 Menurut Perspektif Fiqh Jinayah"** (Vol 14 No 1 Mar 2026).\n\nPenelitian ini berfokus pada evaluasi celah hukum biometrik sintetis AI dan penetapan sanksi Ta'zir berbasis Sadd ad-Dzari'ah.`;
    } else if (query.includes('magang') || query.includes('pengadilan') || query.includes('pengalaman')) {
      reply = `Indra memiliki pengalaman peradilan nyata:\n- **Pengadilan Agama Ciamis** (Jan-Feb 2025): Penanganan berkas perceraian/waris, administrasi panitera, & SIPP.\n- **Pengadilan Negeri Ciamis** (Juli-Ags 2024): Observasi persidangan pidana/perdata, PTSP, e-Court, dan manajemen arsip perkara.`;
    } else if (query.includes('skill') || query.includes('keahlian') || query.includes('sertifikat') || query.includes('word')) {
      reply = `Keahlian Indra meliputi:\n- **Legal**: Analisis Hukum Normatif & Jinayah, Legal Drafting, Cybercrime AI & UU ITE 2024.\n- **Tech & Admin**: Microsoft Word (MOS Certified), MS Excel, PowerPoint, Dasar AI & Prompt Engineering (Dicoding & IBM SkillsBuild).\n- **Soft Skills**: Berpikir Kritis, Detail-Oriented, & Communication.`;
    } else if (query.includes('kontak') || query.includes('email') || query.includes('wa') || query.includes('whatsapp')) {
      reply = `Anda dapat menghubungi Indra Mulyana secara langsung:\n- **Email**: ${PERSONAL_DATA.email}\n- **WhatsApp**: ${PERSONAL_DATA.formattedWhatsapp}\n- **Lokasi**: ${PERSONAL_DATA.location}`;
    } else {
      reply = `Terima kasih atas pertanyaannya! Indra Mulyana, S.H. adalah lulusan S1 Hukum Pidana Islam (IPK 3.71) dengan pengalaman magang di Pengadilan Negeri & Pengadilan Agama Ciamis, serta penulis 2 jurnal ilmiah tentang Hukum Siyasah & Cybercrime Deepfake AI. Ada informasi spesifik yang ingin Anda ketahui lebih jauh?`;
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Gagal memproses pesan AI.', details: error.message },
      { status: 500 }
    );
  }
}
