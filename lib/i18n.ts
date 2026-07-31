import { Language } from '@/context/LanguageContext';

export const UI_TRANSLATIONS = {
  nav: {
    hero: { id: 'Beranda', en: 'Home' },
    projects: { id: 'Proyek', en: 'Projects' },
    experience: { id: 'Pengalaman', en: 'Experience' },
    skills: { id: 'Keahlian', en: 'Skills' },
    certifications: { id: 'Sertifikasi', en: 'Certifications' },
    contact: { id: 'Kontak', en: 'Contact' },
    playground: { id: 'Playground', en: 'Playground' },
  },
  hero: {
    badgeDev: { id: 'Agentic AI & Systems Analyst', en: 'Agentic AI & Systems Analyst' },
    badgeLegal: { id: 'S1 Hukum Pidana Islam (Cumlaude 3.71)', en: 'B.H. Islamic Criminal Law (Cumlaude 3.71)' },
    greeting: { id: 'Halo, Saya', en: 'Hello, I am' },
    ctaPlayground: { id: 'Playground AI & Simulator', en: 'AI Playground & Simulator' },
    ctaExperience: { id: 'Timeline & Riset', en: 'Timeline & Research' },
    sealDev: { id: 'AI LOGIC', en: 'AI LOGIC' },
    sealLegal: { id: 'CUMLAUDE SEAL', en: 'CUMLAUDE SEAL' },
    gpaLabel: { id: 'Predikat IPK', en: 'GPA Honor' },
    researchLabel: { id: 'Publikasi Riset', en: 'Research Publications' },
    cvDownload: { id: 'CV ATS PDF', en: 'CV ATS PDF' },
  },
  projects: {
    badge: { id: 'Live Deployed Applications', en: 'Live Deployed Applications' },
    titlePrefix: { id: 'Portofolio', en: 'Portfolio' },
    titleSuffix: { id: 'Project Web & Database', en: 'Web Projects & Database' },
    sub: {
      id: 'Kumpulan 5 proyek aplikasi web interaktif live ter-deploy di Vercel, dikembangkan dengan teknologi modern & integrasi basis data SQL / NoSQL.',
      en: 'Collection of 5 live interactive web application projects deployed on Vercel, built with modern technologies & SQL/NoSQL database integration.',
    },
    allBtn: { id: 'Semua Proyek', en: 'All Projects' },
    visitBtn: { id: 'Kunjungi Website Live', en: 'Visit Live Website' },
  },
  timeline: {
    badge: { id: 'Jejak Karir & Riset', en: 'Career & Research Track' },
    titlePrefix: { id: 'Pengalaman', en: 'Experience' },
    titleSuffix: { id: 'Peradilan & Riset', en: 'Judiciary & Research' },
    sub: {
      id: 'Timeline interaktif: Klik kartu di bawah untuk membuka pratinjau foto dokumentasi, sertifikat peradilan, atau publikasi jurnal ilmiah.',
      en: 'Interactive timeline: Click cards below to open documentation photos, judicial certificates, or scientific journal publications.',
    },
    detailDoc: { id: 'Detail Dokumen', en: 'Document Details' },
    photosDoc: { id: 'Foto & Dokumen', en: 'Photos & Docs' },
    closeBtn: { id: 'Tutup', en: 'Close' },
    openPdf: { id: 'Buka PDF Jurnal', en: 'Open Journal PDF' },
    taskDesc: { id: 'Deskripsi Tugas & Prosedur:', en: 'Task Description & Procedure:' },
    abstractHeader: { id: 'Abstrak Jurnal:', en: 'Journal Abstract:' },
    photosHeader: { id: 'Dokumentasi Foto Magang', en: 'Internship Photos' },
    viewGallery: { id: 'Lihat Galeri Foto', en: 'View Photo Gallery' },
    photosCount: { id: 'foto', en: 'photos' },
    viewDetail: { id: 'Lihat Detail', en: 'View Details' },
  },
  skills: {
    badge: { id: 'Matriks Kompetensi', en: 'Competency Matrix' },
    sub: {
      id: 'Keahlian pengembangan web modern (Next.js, Node.js, SQL/NoSQL Database), analisis hukum normatif, dan soft skill profesional.',
      en: 'Modern web development skills (Next.js, Node.js, SQL/NoSQL Database), normative legal analysis, and professional soft skills.',
    },
    subWeb: {
      id: 'Penguasaan arsitektur web modern, bahasa pemrograman fullstack (TypeScript, React, Next.js, Python), backend REST API, dan tata kelola basis data SQL & NoSQL.',
      en: 'Mastery of modern web architecture, fullstack programming (TypeScript, React, Next.js, Python), backend REST APIs, and SQL & NoSQL database management.',
    },
    subTech: {
      id: 'Penguasaan software perkantoran profesional (MOS Certified Word/Excel/PowerPoint), Prompt Engineering AI, infrastruktur jaringan TKJ, dan sistem peradilan digital (SIPP & e-Court).',
      en: 'Mastery of professional office software (MOS Certified Word/Excel/PowerPoint), AI Prompt Engineering, network infrastructure, and digital court systems (SIPP & e-Court).',
    },
    subLegal: {
      id: 'Kapabilitas utama dalam riset hukum normatif, legal drafting naskah akademik, penerapan Hukum Acara Peradilan (PA & PN), dan analisis regulasi Cybercrime AI.',
      en: 'Core capabilities in normative legal research, academic legal drafting, court procedure enforcement (Religious & District Courts), and AI Cybercrime regulation analysis.',
    },
    subSoft: {
      id: 'Keterampilan interpersonal unggulan, berpikir kritis-analitis, detail-oriented, integritas etika profesi hukum, serta kepemimpinan kerja tim.',
      en: 'Outstanding interpersonal skills, critical-analytical thinking, detail orientation, legal professional ethics integrity, and teamwork leadership.',
    },
    titleDev: { id: 'Fullstack Web & DB', en: 'Fullstack Web & DB' },
    titleTech: { id: 'AI & Office IT', en: 'AI & Office IT' },
    titleLegal: { id: 'Legal & Litigation', en: 'Legal & Litigation' },
    titleSoft: { id: 'Professional Soft', en: 'Professional Soft' },
    titleAll: { id: 'Competency', en: 'Competency' },
  },
  certifications: {
    badge: { id: 'Sertifikasi & Lisensi Resmi', en: 'Official Licenses & Certifications' },
    titlePrefix: { id: 'Terminal', en: 'CLI Terminal' },
    titleSuffix: { id: 'Kredensial Sertifikat', en: 'Certificate Credentials' },
    sub: {
      id: 'Konsol CLI interaktif: Ketik perintah terminal "ls" atau "cat certs/<name>.cert" untuk menampilkan sertifikat resmi.',
      en: 'Interactive CLI Console: Type terminal commands "ls" or "cat certs/<name>.cert" to inspect official certificates.',
    },
    allBtn: { id: 'Semua Sertifikat', en: 'All Certificates' },
    downloadBtn: { id: 'Unduh / Lihat PDF Sertifikat', en: 'Download / View PDF Certificate' },
    issuerLabel: { id: 'Penerbit:', en: 'Issuer:' },
  },
  contact: {
    badge: { id: 'Kemitraan & Karir', en: 'Career & Partnership' },
    titlePrefix: { id: 'Hubungi', en: 'Contact' },
    titleSuffix: { id: 'Indra Mulyana', en: 'Indra Mulyana' },
    sub: {
      id: 'Terbuka untuk tawaran karir profesional, posisi Fullstack Web Developer, Paralegal / Legal Officer, maupun riset Legal-Tech.',
      en: 'Open for professional career offers, Fullstack Web Developer roles, Paralegal / Legal Officer positions, and Legal-Tech research.',
    },
    formName: { id: 'Nama Lengkap *', en: 'Full Name *' },
    formEmail: { id: 'Email Kontak *', en: 'Contact Email *' },
    formSubject: { id: 'Subjek *', en: 'Subject *' },
    formMessage: { id: 'Pesan *', en: 'Message *' },
    formSubmit: { id: 'Kirim Pesan (Verify Backend)', en: 'Send Message (Verify Backend)' },
    formSubmitting: { id: 'Mengirim Backend...', en: 'Sending Backend...' },
    successHeader: { id: 'Pesan Terkirim!', en: 'Message Sent!' },
    successSub: { id: 'Terima kasih telah menghubungi. Pesan Anda telah terverifikasi backend dan akan dibalas secepatnya.', en: 'Thank you for reaching out. Your message has been verified and will be responded to promptly.' },
  },
  playground: {
    badge: { id: 'Interactive Playground', en: 'Interactive Playground' },
    titlePrefix: { id: 'AI Assistant &', en: 'AI Assistant &' },
    titleSuffix: { id: 'Legal & Deepfake AI Flow Simulator', en: 'Legal & Deepfake AI Flow Simulator' },
    sub: {
      id: 'Eksplorasi interaktif dua modul utama: Tanya jawab cerdas berbasis profil Indra Mulyana dan simulasi interaktif arsitektur Langflow RAG 9 Node asli di balik engine analisis hukum & AI.',
      en: 'Interactive exploration of two core modules: Intelligent Q&A based on Indra Mulyana\'s profile and an interactive simulation of the authentic 9-Node Langflow RAG architecture behind the legal & AI engine.',
    },
    chatSectionHeader: { id: 'AI Chat Assistant (LLM Agentic)', en: 'AI Chat Assistant (LLM Agentic)' },
    flowSectionHeader: { id: 'Legal & Deepfake AI Flow Simulator (Langflow RAG)', en: 'Legal & Deepfake AI Flow Simulator (Langflow RAG)' },
    flowTitle: { id: 'Langflow RAG Architecture Flow Simulator (9-Node Pipeline)', en: 'Langflow RAG Architecture Flow Simulator (9-Node Pipeline)' },
    flowSub: {
      id: 'Alur pipelines RAG Hukum AI — Klik node untuk pratinjau detail Developer View & Legal View.',
      en: 'AI Legal RAG pipeline workflow — Click nodes to preview Developer View & Legal View details.',
    },
    resetFit: { id: 'Reset Fit', en: 'Reset Fit' },
    graphView: { id: 'Graph View', en: 'Graph View' },
    textMode: { id: 'Text Mode', en: 'Text Mode' },
    textAltTitle: { id: 'Daftar Modul RAG Pipeline LangkahHukum AI (Text Alternative):', en: 'List of RAG Pipeline Modules (Text Alternative):' },
    devViewHeader: { id: '💻 Developer View (Teknis Systems Analyst):', en: '💻 Developer View (Technical Systems Analyst):' },
    legalViewHeader: { id: '⚖️ Legal View (Fungsi & Dampak Hukum):', en: '⚖️ Legal View (Function & Legal Impact):' },
    paramsHeader: { id: 'Parameter Konfigurasi Langflow:', en: 'Langflow Configuration Parameters:' },
    closeBtn: { id: 'Tutup', en: 'Close' },
    mobileHint: { id: 'Klik node untuk detail • Geser/cubit layar untuk navigasi', en: 'Click nodes for details • Pan/pinch screen for navigation' },
    chatWelcome: {
      id: 'Halo! Saya **Indra AI Assistant** — didukung Groq Llama 3.3 (70B). Tanya mengenai kualifikasi hukum, riset peradilan, keahlian Fullstack Web/Database, atau riwayat magang Indra Mulyana, S.H.',
      en: 'Hello! I am **Indra AI Assistant** — powered by Groq Llama 3.3 (70B). Ask about legal qualifications, judicial research, Fullstack Web/Database skills, or internship history of Indra Mulyana, S.H.',
    },
    chatPlaceholder: { id: 'Tanya Indra AI tentang profil, keahlian, atau proyek...', en: 'Ask Indra AI about profile, skills, or projects...' },
    chatStreaming: { id: '● Generating response...', en: '● Generating response...' },
    chatIdle: { id: '● Groq Llama 3.3 70B — Ultra Fast Streaming', en: '● Groq Llama 3.3 70B — Ultra Fast Streaming' },
  },
  footer: {
    rights: { id: 'All rights reserved.', en: 'All rights reserved.' },
  },
};

export function getTranslation(keyPath: string, lang: Language): string {
  const parts = keyPath.split('.');
  let current: any = UI_TRANSLATIONS;
  for (const part of parts) {
    if (current && current[part] !== undefined) {
      current = current[part];
    } else {
      return keyPath;
    }
  }
  if (typeof current === 'object' && current[lang] !== undefined) {
    return current[lang];
  }
  return keyPath;
}
