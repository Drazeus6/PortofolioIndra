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
