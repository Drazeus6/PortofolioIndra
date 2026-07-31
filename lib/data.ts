export interface ExperienceItem {
  id: string;
  title: string;
  role: string;
  period: string;
  institution: string;
  location: string;
  description: {
    legal: string;
    developer: string;
  };
  tags: string[];
  certificateImg?: string;
  journalPdfUrl?: string;
  abstract?: string;
  photos?: { src: string; alt: string }[];
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    level: number; // 0-100
    category: 'legal' | 'tech' | 'web' | 'soft';
  }[];
}

export interface CertificationItem {
  id: string;
  filename: string;
  title: string;
  issuer: string;
  year: string;
  pdfUrl?: string;
  description: string;
  commandName: string;
}

export interface AchievementItem {
  title: string;
  event: string;
  year: string;
  description: string;
  badge: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'legal-tech' | 'web-app' | 'e-commerce' | 'logistics' | 'healthcare';
  description: {
    legal: string;
    developer: string;
  };
  liveUrl: string;
  languages: string[];
  database: string;
  stack: string[];
  badge: string;
}

export const PERSONAL_DATA = {
  name: 'Indra Mulyana, S.H.',
  title: {
    legal: 'Sarjana Hukum Cumlaude (IPK 3.71) — Specialist Peradilan, Legal Drafting & Riset',
    developer: 'Fullstack Web Developer & Legal-Tech Systems Analyst — S1 Hukum Pidana Islam (Cumlaude)',
  },
  location: 'Dusun Bojonghurip, Kepel, Cisaga, Kab. Ciamis, Jawa Barat',
  shortLocation: 'Ciamis, Jawa Barat, Indonesia',
  email: 'indramulyanaa674@gmail.com',
  whatsapp: '081395701071',
  formattedWhatsapp: '0813 9570 1071',
  gpa: '3.71 / 4.00 (Cumlaude)',
  university: 'UIN Sunan Gunung Djati Bandung',
  degree: 'S1 Hukum Pidana Islam',
  gradYear: '2022 - 2026',
  smk: 'SMK Negeri 2 Banjar (Teknik Komputer & Jaringan - Lulusan Terbaik)',
  avatar: '/Foto-Indra-2.jpeg',
  bios: {
    legal: `Sarjana Hukum berpredikat Cumlaude (IPK 3.71) dari UIN Sunan Gunung Djati Bandung. Memiliki pengalaman praktis di Pengadilan Agama Kelas 1A Ciamis & Pengadilan Negeri Kelas 1B Ciamis (kepaniteraan Pidana, Perdata, & Hukum). Teruji dalam publikasi 2 Jurnal Ilmiah SINTA 4 tentang Cybercrime Deepfake AI & Fiqh Siyasah Pemilu, serta penulisan isu-isu hukum di Klikhukum.id. Memadukan analisis kritis peradilan dengan ketelitian legal drafting.`,
    developer: `Fullstack Web Developer & Legal-Tech Specialist. Pengembang 5 aplikasi web live (Jinayah App - AI Komparasi Hukum Pidana, Ryoku - Try Out CPNS, Coffee Shop Web - Informational Showcase Cafe, WUS Cargo, Jejak Sehat) menggunakan Next.js, React 19, TypeScript, Node.js, Express, Tailwind CSS, PostgreSQL, MySQL, Supabase, MongoDB, dan Prisma ORM. Berlatar belakang Lulusan Terbaik TKJ dan Sarjana Hukum Cumlaude.`,
  },
  languages: [
    { name: 'English Proficiency Test', score: 'Certified', issuer: 'PT Daily Cipta Dwipta', valid: '2026 - 2027' },
    { name: 'TOAFL (Test of Arabic as a Foreign Language)', score: 'Certified', issuer: 'Pusat Bahasa UIN SGD', valid: '2024 - 2026' },
  ],
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'jinayah-app',
    title: 'Jinayah App — AI Komparasi Hukum Pidana Umum & Hukum Pidana Islam',
    category: 'legal-tech',
    description: {
      legal: 'Platform AI komparatif untuk membandingkan secara akurat norma Hukum Pidana Umum (KUHP / UU ITE No 1 2024) dengan Hukum Pidana Islam (Fiqh Jinayah - Jarimah Hudud, Qisas, & Ta\'zir).',
      developer: 'Platform AI Legal-Tech berbasis React 19 + TypeScript + Supabase PostgreSQL yang mengintegrasikan engine kecerdasan buatan untuk komparasi delik pasal KUHP vs doktrin Fiqh Jinayah.',
    },
    liveUrl: 'https://jinayah-2yio.vercel.app/',
    languages: ['React 19', 'TypeScript', 'JavaScript (ES6+)', 'AI Engine', 'Tailwind CSS'],
    database: 'PostgreSQL (Supabase)',
    stack: ['React 19', 'Vite', 'TypeScript', 'Tailwind CSS', 'AI Engine', 'PostgreSQL / Supabase'],
    badge: 'AI Legal-Tech & Komparasi',
  },
  {
    id: 'ryoku',
    title: 'Ryoku — Platform Try Out & Simulasi Ujian CPNS',
    category: 'web-app',
    description: {
      legal: 'Platform edutech & Try Out CPNS berbasis kepatuhan standar ujian CAT ASN (Badan Kepegawaian Negara), transparansi akuntabilitas nilai passing grade, dan evaluasi hasil ujian.',
      developer: 'Web App Try Out CPNS interaktif berbasis Next.js 14 App Router + Vercel Postgres DB untuk simulasi ujian CAT (TWK, TIU, TKP), timer otomatis, sistem pembobotan nilai, dan analisis hasil real-time.',
    },
    liveUrl: 'https://ryoku-seven.vercel.app/',
    languages: ['Next.js (App Router)', 'TypeScript', 'JavaScript', 'HTML5', 'Tailwind CSS'],
    database: 'PostgreSQL (Vercel Postgres)',
    stack: ['Next.js 14', 'React', 'TypeScript', 'Tailwind CSS', 'REST API', 'PostgreSQL'],
    badge: 'Try Out CPNS & EduTech',
  },
  {
    id: 'wus-cargo',
    title: 'WUS Cargo — Logistics & Cargo Tracking System',
    category: 'logistics',
    description: {
      legal: 'Sistem kepatuhan pengiriman barang, legalitas manifes logistik ekspedisi, transparansi klausula nomor resi konsumen, dan mitigasi risiko sengketa pengangkutan.',
      developer: 'Fullstack Logistics tracking engine berbasis Next.js + Node.js REST API dengan DB relasional PostgreSQL dan integrasi Supabase Auth.',
    },
    liveUrl: 'https://wuscargo.vercel.app/',
    languages: ['Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'Tailwind CSS'],
    database: 'PostgreSQL & Supabase',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js REST API', 'PostgreSQL'],
    badge: 'Logistics & Tracking',
  },
  {
    id: 'jejak-sehat',
    title: 'Jejak Sehat — Platform Manajemen Kesehatan & Rekam Medis',
    category: 'healthcare',
    description: {
      legal: 'Platform digital rekam medis dan kepatuhan privasi data kesehatan pasien (KPRS) sesuai ketentuan Undang-Undang Kesehatan Nomor 17 Tahun 2023.',
      developer: 'Healthcare Web App React + Express.js + MySQL relasional DB dengan kalkulator indikator vital dan arsitektur komponen modular.',
    },
    liveUrl: 'https://jejaksehat.vercel.app/',
    languages: ['React', 'TypeScript', 'JavaScript', 'Node.js', 'Tailwind CSS'],
    database: 'MySQL & PostgreSQL',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'REST API', 'MySQL'],
    badge: 'Healthcare Tech',
  },
  {
    id: 'coffee-shop',
    title: 'Coffee Shop Web — Informational Showcase Cafe Digital',
    category: 'web-app',
    description: {
      legal: 'Website portal informasi profil usaha kafe, penyajian deskripsi kafe, katalog menu kuliner, suasana/ambiance lokasi kafe, serta transparansi informasi konsumen.',
      developer: 'Informational Showcase Web App React + Node.js Express + MongoDB untuk menampilkan deskripsi kafe, katalog menu interaktif, galeri foto suasana tempat, dan lokasi kafe.',
    },
    liveUrl: 'https://coffeshopwebsite.vercel.app/',
    languages: ['React', 'JavaScript', 'Node.js', 'Express.js', 'Tailwind CSS'],
    database: 'MongoDB & Supabase',
    stack: ['React', 'JavaScript', 'Node.js', 'Express.js', 'Tailwind CSS', 'MongoDB'],
    badge: 'Informational Cafe Web',
  },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    title: 'Juara 1 Lomba Menulis Surat Tingkat Nasional',
    event: 'Lomba Menulis Surat Nasional "Dari Aku Yang Merindukanmu"',
    year: '2025',
    description: 'Berhasil meraih Juara 1 Nasional mengalahkan lebih dari 100 peserta dari berbagai perguruan tinggi dan instansi se-Indonesia.',
    badge: 'Juara 1 Nasional',
  },
  {
    title: 'Lulusan Terbaik SMK Negeri 2 Banjar',
    event: 'Kelulusan Kompetensi Keahlian Teknik Komputer & Jaringan',
    year: '2022',
    description: 'Dianugerahi predikat Lulusan Terbaik pada jurusan Teknik Komputer dan Jaringan dengan rata-rata nilai 86.',
    badge: 'Lulusan Terbaik',
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'pa-ciamis',
    title: 'Pengadilan Agama Kelas 1A Ciamis',
    role: 'Magang Internship Peradilan & Administrasi Kepaniteraan',
    period: 'Januari 2025 – Februari 2025',
    institution: 'Pengadilan Agama Kelas 1A Ciamis',
    location: 'Kab. Ciamis, Jawa Barat',
    description: {
      legal: 'Mengikuti magang peradilan di Pengadilan Agama Kelas 1A Ciamis. Menangani perkara kewenangan peradilan agama, verifikasi kelengkapan administrasi berkas perceraian & waris, digitalisasi arsip hukum, serta menyaksikan langsung proses persidangan di ruang sidang.',
      developer: 'Melakukan pemetaan alur sistem informasi manajemen perkara (SIPP), pengolahan data berkas digital peradilan agama, dan efisiensi alur administrasi panitera.',
    },
    tags: ['Hukum Acara Agama', 'Administrasi Peradilan', 'Kepaniteraan PA 1A', 'Digitalisasi Berkas'],
    certificateImg: '/Sertifikat-PA.jpg',
    photos: [
      {
        src: '/pa-ciamis-1-pembukaan.jpeg',
        alt: 'Pembukaan program magang kerja peradilan di Pengadilan Agama Ciamis',
      },
      {
        src: '/pa-ciamis-2-briefing.jpeg',
        alt: 'Sesi pengarahan dengan pegawai Pengadilan Agama Ciamis',
      },
      {
        src: '/pa-ciamis-3-diskusi.jpeg',
        alt: 'Diskusi kelompok bersama pejabat Pengadilan Agama Ciamis',
      },
      {
        src: '/pa-ciamis-4-penutupan.jpeg',
        alt: 'Penutupan program magang kerja peradilan Pengadilan Agama Ciamis',
      },
      {
        src: '/pa-ciamis-5-depan-gedung.jpeg',
        alt: 'Foto bersama di depan Pengadilan Agama Ciamis',
      },
    ],
  },
  {
    id: 'jurnal-galuh-1',
    title: 'Publikasi Jurnal Galuh Justisi (SINTA 4)',
    role: 'Author & Penulis Riset Hukum Tata Negara / Siyasah',
    period: 'September 2024',
    institution: 'Jurnal Ilmiah Galuh Justisi - Universitas Galuh',
    location: 'Ciamis, Jawa Barat',
    description: {
      legal: 'Riset normatif: "Sistem Pemilihan Umum di Indonesia dalam Perspektif Fiqh Siyasah" (Vol 12 No 2). Menganalisis relevansi sistem ahlul halli wal aqdi & shura dengan pemilu langsung serta kewenangan penyelesaian sengketa di Mahkamah Konstitusi.',
      developer: 'Pemodelan konsep komparatif sistem voting & penyelesaian sengketa konstitusional dengan metode penelitian kualitatif berbasis literatur digital.',
    },
    tags: ['SINTA 4', 'Fiqh Siyasah', 'Hukum Tata Negara', 'Sengketa Pemilu MK'],
    journalPdfUrl: 'https://jurnal.unigal.ac.id/galuhjustisi/article/view/14168/pdf',
    abstract: `Penelitian menguji relevansi sistem pemilu di Indonesia dengan fiqh siyasah (ahlul halli wal aqdi) serta mekanisme peradilan sengketa di Mahkamah Konstitusi.`,
  },
  {
    id: 'jurnal-galuh-2',
    title: 'Publikasi Jurnal Galuh Justisi (SINTA 4) - AI Deepfake',
    role: 'Author & Penulis Riset Cybercrime AI & Fiqh Jinayah',
    period: 'Maret 2026',
    institution: 'Jurnal Ilmiah Galuh Justisi - Universitas Galuh',
    location: 'Ciamis, Jawa Barat',
    description: {
      legal: 'Riset hukum Cybercrime: "Kekosongan Hukum Mengenai Tindak Pidana Penipuan Deepfake Dalam UU ITE Nomor 1 Tahun 2024 Menurut Perspektif Hukum Pidana Islam" (Vol 14 No 1). Menganalisis celah norma Pasal 28 & 45A UU ITE serta sanksi Jarimah Ta\'zir (Al-Ghash & At-Tadlis).',
      developer: 'Analisis mutakhir mengenai fenomena biometrik sintetis Deepfake AI, celah hukum UU ITE No 1 2024 (Pasal 28 & 45A), dan formulasi Sadd ad-Dzari\'ah untuk penegakan hukum AI.',
    },
    tags: ['SINTA 4', 'Cybercrime AI', 'Deepfake Fraud', 'UU ITE 2024', 'Fiqh Jinayah'],
    journalPdfUrl: 'https://jurnal.unigal.ac.id/galuhjustisi/article/view/23344/pdf',
    abstract: `Mengkaji vakum norma UU ITE 2024 terkait rekayasa biometrik Deepfake dan rekonstruksi sanksi berbasis Jarimah Ta'zir & Maqashid Sharia.`,
  },

  {
    id: 'pn-ciamis',
    title: 'Pengadilan Negeri Kelas 1B Ciamis',
    role: 'Magang Internship Kepaniteraan Pidana, Perdata & Hukum',
    period: 'Juli 2024 – Agustus 2024',
    institution: 'Pengadilan Negeri Kelas 1B Ciamis',
    location: 'Kab. Ciamis, Jawa Barat',
    description: {
      legal: 'Magang di Pengadilan Negeri Ciamis Kelas 1B. Membantu 3 kepaniteraan utama: Panitera Pidana, Panitera Perdata, dan Panitera Hukum. Mengelola administrasi berkas perkara, pengarsipan peradilan, serta mengamati langsung persidangan pidana & perdata.',
      developer: 'Pemeriksaan alur kerja persidangan fisik vs e-Court, manajemen registrasi berkas umum, serta verifikasi kelayakan dokumen persidangan.',
    },
    tags: ['Kepaniteraan Pidana', 'Kepaniteraan Perdata', 'Kepaniteraan Hukum', 'e-Court'],
    certificateImg: '/Sertifikat-PN.jpg',
    photos: [
      {
        src: '/pn-ciamis-1.jpg',
        alt: 'Serah terima plakat kenang-kenangan di lobi Pengadilan Negeri Ciamis Kelas 1B bersama pembimbing dan rekan magang',
      },
      {
        src: '/pn-ciamis-2.jpg',
        alt: 'Indra Mulyana melakukan stempel dan verifikasi berkas administrasi kepaniteraan di Pengadilan Negeri Ciamis',
      },
      {
        src: '/pn-ciamis-3.jpg',
        alt: 'Suasana pengamatan langsung persidangan pidana di ruang sidang Pengadilan Negeri Ciamis Kelas 1B',
      },
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Competencies: Fullstack Web Development & Database',
    description: 'Penguasaan arsitektur web modern, bahasa pemrograman fullstack, frontend, backend API, dan basis data.',
    skills: [
      { name: 'TypeScript & JavaScript (ES6+)', level: 94, category: 'web' },
      { name: 'HTML5 & CSS3 (Semantic & Layouts)', level: 96, category: 'web' },
      { name: 'SQL (PostgreSQL & MySQL Database Querying)', level: 90, category: 'web' },
      { name: 'Python (Scripting & Automation)', level: 85, category: 'web' },
      { name: 'PHP (Server-Side Web Development)', level: 82, category: 'web' },
      { name: 'Bash / Shell (CLI & Scripting)', level: 88, category: 'web' },
      { name: 'Next.js (App Router) & React 18/19', level: 94, category: 'web' },
      { name: 'Tailwind CSS & Framer Motion (Animations)', level: 95, category: 'web' },
      { name: 'Node.js, Express & RESTful API Design', level: 90, category: 'web' },
      { name: 'Supabase, Prisma ORM & Database Auth', level: 88, category: 'web' },
      { name: 'Vercel AI SDK & LLM Integration (Streaming)', level: 91, category: 'web' },
      { name: 'Git, GitHub & CI/CD Deployment', level: 93, category: 'web' },
    ],
  },
  {
    category: 'Competencies: Legal & Litigation',
    description: 'Kapabilitas utama dalam analisis norma peradilan, drafting, dan kepatuhan.',
    skills: [
      { name: 'Legal Analysis & Riset Hukum Normatif', level: 96, category: 'legal' },
      { name: 'Legal Drafting & Naskah Akademik', level: 92, category: 'legal' },
      { name: 'Hukum Acara Peradilan (PA & PN)', level: 94, category: 'legal' },
      { name: 'Riset Regulasi Cybercrime & AI (UU ITE 2024)', level: 90, category: 'legal' },
      { name: 'Fiqh Jinayah & Fiqh Siyasah', level: 95, category: 'legal' },
      { name: 'Legal Writing & Article Publishing', level: 91, category: 'legal' },
    ],
  },
  {
    category: 'Competencies: IT & Office Systems',
    description: 'Penguasaan perangkat lunak administrasi modern dan teknologi AI.',
    skills: [
      { name: 'Microsoft Word (MOS Certified)', level: 98, category: 'tech' },
      { name: 'Microsoft Excel & Data Management', level: 90, category: 'tech' },
      { name: 'Microsoft PowerPoint & Presentation', level: 92, category: 'tech' },
      { name: 'Artificial Intelligence (AI) & Prompt Engineering', level: 88, category: 'tech' },
      { name: 'Teknik Komputer & Jaringan (TKJ)', level: 88, category: 'tech' },
      { name: 'Sistem Informasi Peradilan (SIPP & e-Court)', level: 90, category: 'tech' },
      { name: 'Adobe Photoshop & Digital Design', level: 84, category: 'tech' },
      { name: 'Copywriting & Content Editing', level: 86, category: 'tech' },
    ],
  },
  {
    category: 'Professional Soft Skills',
    description: 'Keterampilan interpersonal, integritas peradilan, dan kepemimpinan.',
    skills: [
      { name: 'Berpikir Kritis & Problem Solving', level: 96, category: 'soft' },
      { name: 'Detail-Oriented & Ketelitian Dokumen', level: 98, category: 'soft' },
      { name: 'Integritas & Etika Profesi Hukum', level: 99, category: 'soft' },
      { name: 'Komunikasi Efektif & Public Speaking', level: 92, category: 'soft' },
      { name: 'Manajemen Waktu & Kerja Tim', level: 94, category: 'soft' },
    ],
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'mos-word',
    filename: 'mos_word_certified.cert',
    title: 'Microsoft Office Specialist: Word',
    issuer: 'Lumina Eka Optima & PTIPD UIN SGD',
    year: '2024',
    pdfUrl: '/Sertifikat-SkillsBuild.pdf',
    description: 'Sertifikasi penguasaan Microsoft Word tingkat profesional (Certified MOS) untuk penyusunan naskah hukum, format dokumen resmi, dan pengolahan teks kompleks.',
    commandName: 'cat certs/mos_word.cert',
  },
  {
    id: 'ai-dicoding',
    filename: 'belajar_dasar_ai.cert',
    title: 'Dicoding: Belajar Dasar AI',
    issuer: 'Dicoding Indonesia',
    year: '2025',
    pdfUrl: '/Sertifikat-Belajar-Dasar-AI.pdf',
    description: 'Kurikulum pemahaman konsep AI, Machine Learning fundamentals, Etika AI, dan penerapan AI untuk analisis data.',
    commandName: 'cat certs/ai_dicoding.cert',
  },
  {
    id: 'prompt-eng',
    filename: 'prompt_engineering.cert',
    title: 'Prompt Engineering for AI',
    issuer: 'Dicoding / Course Certification',
    year: '2025',
    pdfUrl: '/Sertifikat-Prompt-Engineering.pdf',
    description: 'Teknik formulasi prompt canggih untuk LLM, otomasi analisis dokumen hukum, dan sintesis data terstruktur.',
    commandName: 'cat certs/prompt_eng.cert',
  },
  {
    id: 'ibm-ai-literacy',
    filename: 'ibm_ai_literacy.cert',
    title: 'IBM SkillsBuild: AI Literacy & Legal Ethics',
    issuer: 'IBM SkillsBuild',
    year: '2026',
    pdfUrl: '/Sertifikat-SkillsBuild-AI-Legal.pdf',
    description: 'Studi komprehensif mengenai regulasi AI, privasi data, kewajiban etis, dan implikasi hukum kecerdasan buatan.',
    commandName: 'cat certs/ibm_ai_literacy.cert',
  },
  {
    id: 'ibm-ai-interaction',
    filename: 'ibm_ai_interaction.cert',
    title: 'IBM SkillsBuild: AI Interaction',
    issuer: 'IBM SkillsBuild',
    year: '2026',
    pdfUrl: '/Sertifikat-SkillsBuild-AI-Interaction.pdf',
    description: 'Spesialisasi interaksi manusia-komputer dan penerapan agen cerdas dalam dunia profesional.',
    commandName: 'cat certs/ibm_ai_interaction.cert',
  },
  {
    id: 'english-test',
    filename: 'english_proficiency.cert',
    title: 'English Proficiency Test (Certified)',
    issuer: 'PT Daily Cipta Dwipta',
    year: '2026 - 2027',
    pdfUrl: '/Sertifikat-SkillsBuild-Bary.pdf',
    description: 'Tes kemampuan bahasa Inggris profesional untuk komunikasi bisnis dan akademik.',
    commandName: 'cat certs/english_test.cert',
  },
  {
    id: 'toafl-arabic',
    filename: 'toafl_arabic.cert',
    title: 'Test of Arabic as a Foreign Language (TOAFL)',
    issuer: 'Pusat Pengembangan Bahasa UIN Sunan Gunung Djati',
    year: '2024 - 2026',
    pdfUrl: '/TOEFL-Indra.pdf',
    description: 'Sertifikasi kemahiran Bahasa Arab akademik & studi teks literatur hukum pidana Islam.',
    commandName: 'cat certs/toafl_arabic.cert',
  },
  {
    id: 'financial-literacy',
    filename: 'financial_literacy.cert',
    title: 'Introduction to Financial Literacy',
    issuer: 'Certification Course',
    year: '2024',
    pdfUrl: '/Sertifikat-Introduction-to-Financial-Literacy.pdf',
    description: 'Pemahaman dasar manajemen keuangan instansi, tata kelola finansial, dan analisa kepatuhan transaksi.',
    commandName: 'cat certs/financial_literacy.cert',
  },
];

export interface RagPipelineNodeData {
  label: string;
  category: 'input' | 'loader' | 'parser' | 'chunker' | 'embedding' | 'vectorstore' | 'converter' | 'template' | 'llm' | 'output' | 'note';
  badge: string;
  developerDesc: string;
  legalDesc: string;
  params?: Record<string, string>;
  files?: string[];
}

export const RAG_PIPELINE_GRAPH = {
  nodes: [
    {
      id: 'chat-input',
      type: 'customNode',
      data: {
        label: 'Chat Input',
        category: 'input',
        badge: 'User Query',
        developerDesc: 'Input stream interface yang menerima prompt/kueri pengguna dalam format string real-time.',
        legalDesc: 'Titik awal di mana pengguna/klien menginput pertanyaan hukum, studi kasus, atau isu Cybercrime Deepfake AI.',
      },
      position: { x: 0, y: 220 },
    },
    {
      id: 'read-file',
      type: 'customNode',
      data: {
        label: 'Read File',
        category: 'loader',
        badge: 'Doc Loader',
        files: ['Rangkuman UU No 1 2024 (6.47 MB)', 'Ringkasan KUHP Baru (3.81 MB)'],
        developerDesc: 'File loader component yang membaca naskah PDF/TXT perundang-undangan dan menyediakannya untuk parser.',
        legalDesc: 'Pengunggahan dan pembacaan naskah otentik UU ITE No 1 Tahun 2024 dan KUHP Baru sebagai sumber hukum normatif.',
      },
      position: { x: 320, y: 40 },
    },
    {
      id: 'parser',
      type: 'customNode',
      data: {
        label: 'Parser',
        category: 'parser',
        badge: 'Text Extractor',
        params: { Mode: 'Parser (JSON or Table)', Output: 'Parsed Text' },
        developerDesc: 'Ekstraksi struktur dokumen mentah menjadi teks tertata yang siap dipotong (chunking).',
        legalDesc: 'Proses penyaringan naskah hukum agar ayat, pasal, dan pertimbangan akademis dapat dibaca bersih oleh AI.',
      },
      position: { x: 640, y: 40 },
    },
    {
      id: 'split-text',
      type: 'customNode',
      data: {
        label: 'Split Text',
        category: 'chunker',
        badge: 'Text Chunker',
        params: { 'Chunk Size': '1000', 'Chunk Overlap': '200', Separator: '\\n' },
        developerDesc: 'Mengubah dokumen masif menjadi segmen 1000 karakter dengan overlap 200 karakter untuk presisi pencarian.',
        legalDesc: 'Segmentasi naskah hukum menjadi pasal-pasal ringkas agar memudahkan rujukan silang saat komparasi pidana.',
      },
      position: { x: 960, y: 40 },
    },
    {
      id: 'cohere-embeddings',
      type: 'customNode',
      data: {
        label: 'Cohere Embeddings',
        category: 'embedding',
        badge: 'Embedding Engine',
        params: { Model: 'embed-multilingual-v3.0' },
        developerDesc: 'Engine representasi vektor dwibahasa (Bahasa Indonesia & Arab) untuk pencarian semantik berdimensi tinggi.',
        legalDesc: 'Mengubah terminologi hukum (seperti Al-Ghash, At-Tadlis, Ta\'zir) menjadi vektor makna semantik.',
      },
      position: { x: 320, y: 420 },
    },
    {
      id: 'chroma-db',
      type: 'customNode',
      data: {
        label: 'Chroma DB',
        category: 'vectorstore',
        badge: 'Vector Store',
        params: { Collection: 'dokumen_hukum', Directory: '.chroma_db' },
        developerDesc: 'Database vektor lokal berkinerja tinggi tempat penyimpanan dan pencarian kueri kemiripan kosinus.',
        legalDesc: 'Gudang data hukum digital terenkripsi yang memuat rujukan yurisprudensi dan UU secara terstruktur.',
      },
      position: { x: 960, y: 340 },
    },
    {
      id: 'legacy-dataframe',
      type: 'customNode',
      data: {
        label: 'Legacy (Parse DataFrame)',
        category: 'converter',
        badge: 'Context Formatter',
        params: { Input: 'Table Data', Output: 'Formatted Text' },
        developerDesc: 'Konversi hasil kuery tabel DataFrame dari Chroma DB menjadi blok teks konteks pendukung prompt.',
        legalDesc: 'Penyusunan ringkasan pasal-pasal relevan yang ditemukan dari basis data untuk dilampirkan ke draf analisis.',
      },
      position: { x: 1280, y: 420 },
    },
    {
      id: 'prompt-template',
      type: 'customNode',
      data: {
        label: 'Prompt Template',
        category: 'template',
        badge: 'System Persona',
        params: { Persona: 'LangkahHukum Asisten Paralegal Virtual', Style: 'Empatik, tegas, ahli Hukum Pidana & Perdata' },
        developerDesc: 'Menggabungkan persona sistem (System Prompt), konteks dokumen pencarian (RAG), dan kueri user (berita_user).',
        legalDesc: 'Formulasi instruksi profesional yang memastikan AI menjawab berdasarkan integritas akademis dan kaidah hukum sah.',
      },
      position: { x: 1600, y: 140 },
    },
    {
      id: 'groq-llm',
      type: 'customNode',
      data: {
        label: 'Groq LLM Engine',
        category: 'llm',
        badge: 'Inference Engine',
        params: { Model: 'llama-3.1-8b-instant', Engine: 'Ultra-fast LPU' },
        developerDesc: 'Engine inferensi LLM LPU bertaraf enterprise yang mengeksekusi analisis hukum dan penyusunan argumen.',
        legalDesc: 'Pemroses kecerdasan buatan utama yang menalar perbandingan pasal KUHP vs doktrin Fiqh Jinayah secara cermat.',
      },
      position: { x: 1920, y: 140 },
    },
    {
      id: 'chat-output',
      type: 'customNode',
      data: {
        label: 'Chat Output',
        category: 'output',
        badge: 'Final Response',
        developerDesc: 'Output stream interface yang menyajikan jawaban akhir AI secara real-time ke UI.',
        legalDesc: 'Penyajikan jawaban analisis komparatif sanksi Ta\'zir dan rekomendasi kepatuhan hukum kepada pengguna.',
      },
      position: { x: 2240, y: 220 },
    },
    {
      id: 'author-note',
      type: 'customNode',
      data: {
        label: 'Author Profile',
        category: 'note',
        badge: 'Architect',
        params: { NAMA: 'Indra Mulyana, S.H.', ASAL: 'UIN Sunan Gunung Djati Bandung' },
        developerDesc: 'Metadata identitas pengembang dan perancang arsitektur RAG Langkah Hukum AI.',
        legalDesc: 'Profil perancang sistem: Sarjana Hukum Cumlaude UIN SGD Bandung & Legal-Tech Developer.',
      },
      position: { x: 320, y: 640 },
    },
  ],
  edges: [
    { id: 'e-input-template', source: 'chat-input', target: 'prompt-template', animated: true, label: 'berita_user' },
    { id: 'e-file-parser', source: 'read-file', target: 'parser', animated: true, label: 'Files' },
    { id: 'e-parser-split', source: 'parser', target: 'split-text', animated: true, label: 'Parsed Text' },
    { id: 'e-split-chroma', source: 'split-text', target: 'chroma-db', animated: true, label: 'Chunks' },
    { id: 'e-embed-chroma', source: 'cohere-embeddings', target: 'chroma-db', animated: true, label: 'Embeddings' },
    { id: 'e-chroma-legacy', source: 'chroma-db', target: 'legacy-dataframe', animated: true, label: 'Table' },
    { id: 'e-legacy-template', source: 'legacy-dataframe', target: 'prompt-template', animated: true, label: 'konteks' },
    { id: 'e-template-groq', source: 'prompt-template', target: 'groq-llm', animated: true, label: 'Prompt' },
    { id: 'e-groq-output', source: 'groq-llm', target: 'chat-output', animated: true, label: 'Model Response' },
  ],
};

