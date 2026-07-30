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
    developer: `Fullstack Web Developer & Legal-Tech Specialist. Pengembang 5 aplikasi web live (Jinayah App, Ryoku, Coffee Shop Web, WUS Cargo, Jejak Sehat) menggunakan Next.js, React 19, TypeScript, Node.js, Express, Tailwind CSS, PostgreSQL, MySQL, Supabase, MongoDB, dan Prisma ORM. Berlatar belakang Lulusan Terbaik TKJ dan Sarjana Hukum Cumlaude.`,
  },
  languages: [
    { name: 'English Proficiency Test', score: 'Certified', issuer: 'PT Daily Cipta Dwipta', valid: '2026 - 2027' },
    { name: 'TOAFL (Test of Arabic as a Foreign Language)', score: 'Certified', issuer: 'Pusat Bahasa UIN SGD', valid: '2024 - 2026' },
  ],
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'jinayah-app',
    title: 'Jinayah App — Platform Analisis Hukum Pidana Islam & Cybercrime',
    category: 'legal-tech',
    description: {
      legal: 'Platform analisis yuridis normatif Hukum Pidana Islam (Fiqh Jinayah) dan studi kepatuhan norma sanksi Jarimah Ta\'zir terhadap tindak pidana biometrik sintetis Cybercrime / Deepfake AI dalam UU ITE No 1 2024.',
      developer: 'SPA modern React 19 + TypeScript + Supabase PostgreSQL untuk pemodelan data delik pidana, filtering sanksi Ta\'zir, dan arsitektur database relasional terenkripsi.',
    },
    liveUrl: 'https://jinayah-2yio.vercel.app/',
    languages: ['React 19', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3 / Tailwind'],
    database: 'PostgreSQL (Supabase)',
    stack: ['React 19', 'Vite', 'TypeScript', 'Tailwind CSS', 'Lucide Icons', 'PostgreSQL / Supabase'],
    badge: 'Legal-Tech & AI',
  },
  {
    id: 'ryoku',
    title: 'Ryoku — Anime Streaming & Information Portal',
    category: 'web-app',
    description: {
      legal: 'Media portal informasi dan katalog penyiaran konten multimedia berbasis kepatuhan hak cipta (HAKI), lisensi distribusi publik, dan regulasi konten penyiaran.',
      developer: 'Next.js 14 App Router portal streaming anime dengan ISR (Incremental Static Regeneration), Vercel Postgres DB, dan arsitektur REST API ultra cepat.',
    },
    liveUrl: 'https://ryoku-seven.vercel.app/',
    languages: ['Next.js (App Router)', 'TypeScript', 'JavaScript', 'HTML5', 'Tailwind CSS'],
    database: 'PostgreSQL (Vercel Postgres)',
    stack: ['Next.js 14', 'React', 'TypeScript', 'Tailwind CSS', 'REST API', 'PostgreSQL'],
    badge: 'Web App & Media',
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
    title: 'Coffee Shop Web App — Platform E-Commerce Cafe Digital',
    category: 'e-commerce',
    description: {
      legal: 'Sistem e-commerce transaksi bisnis digital, kepatuhan syarat & ketentuan (TOC) jual-beli konsumen, serta perlindungan hak konsumen e-commerce.',
      developer: 'E-Commerce Web App React + Node.js Express + MongoDB NoSQL database dengan cart state management dan Tailwind CSS UI.',
    },
    liveUrl: 'https://coffeshopwebsite.vercel.app/',
    languages: ['React', 'JavaScript', 'Node.js', 'Express.js', 'Tailwind CSS'],
    database: 'MongoDB & Supabase',
    stack: ['React', 'JavaScript', 'Node.js', 'Express.js', 'Tailwind CSS', 'MongoDB'],
    badge: 'E-Commerce Cafe',
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
    id: 'klikhukum-writer',
    title: 'Klikhukum.id — Penulis Esai Hukum Publik',
    role: 'Author & Writer Isu Hukum Pidana & KUHP Baru',
    period: 'Juli 2026',
    institution: 'Klikhukum.id',
    location: 'Indonesia',
    description: {
      legal: 'Menulis artikel analisis isu-isu hukum publik aktual. Karya publikasi membahas penanganan perkara pidana oleh pelaku gangguan jiwa (ODGJ) dalam perspektif KUHP baru & KUHAP, mengulas pertanggungjawaban pidana & pertimbangan hakim.',
      developer: 'Sintesis narasi hukum publik dan penyampaian wawasan perundang-undangan baru secara terstruktur untuk pembaca profesional dan masyarakat luas.',
    },
    tags: ['Klikhukum.id', 'KUHP Baru', 'Pertanggungjawaban Pidana', 'Legal Writer'],
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
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Competencies: Fullstack Web Development & Database',
    description: 'Penguasaan arsitektur web modern, frontend, backend API, dan manajemen basis data.',
    skills: [
      { name: 'Next.js (App Router) & React 18/19', level: 94, category: 'web' },
      { name: 'TypeScript & JavaScript (ES6+)', level: 92, category: 'web' },
      { name: 'Tailwind CSS & Framer Motion (Animations)', level: 95, category: 'web' },
      { name: 'Node.js, Express & RESTful API Design', level: 90, category: 'web' },
      { name: 'PostgreSQL & Relational Database Design', level: 88, category: 'web' },
      { name: 'MySQL & SQL Query Optimization', level: 89, category: 'web' },
      { name: 'Supabase & Database Authentication', level: 87, category: 'web' },
      { name: 'Prisma ORM & Data Modeling', level: 86, category: 'web' },
      { name: 'Vercel AI SDK & LLM Integration (Streaming)', level: 91, category: 'web' },
      { name: 'Git, GitHub, Vercel & CI/CD Deployment', level: 93, category: 'web' },
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

export const DECISION_TREE_GRAPH = {
  nodes: [
    {
      id: '1',
      type: 'customNode',
      data: {
        label: 'Tindak Pidana Cybercrime / Deepfake AI Detected',
        category: 'Input Peristiwa',
        badge: 'Trigger Case',
        description: 'Penyalahgunaan teknologi biometrik sintetis untuk fraud finansial / reputasi.',
      },
      position: { x: 250, y: 0 },
    },
    {
      id: '2',
      type: 'customNode',
      data: {
        label: 'Analisis Positif (UU ITE No 1 Tahun 2024)',
        category: 'Statutory Review',
        badge: 'Celah Hukum',
        description: 'Pasal 28 (1) & 45A mensyaratkan "berita bohong" & "kerugian konsumen" -> Terjadi Vakum Norma.',
      },
      position: { x: 50, y: 150 },
    },
    {
      id: '3',
      type: 'customNode',
      data: {
        label: 'Analisis Fiqh Jinayah (Hukum Pidana Islam)',
        category: 'Sharia Jurisprudence',
        badge: 'Prinsip Syariah',
        description: 'Kategori Al-Ghash & At-Tadlis parah. Melanggar Maqashid Sharia (Hifzh Al-Aql & Hifzh Al-Mal).',
      },
      position: { x: 450, y: 150 },
    },
    {
      id: '4',
      type: 'customNode',
      data: {
        label: 'Konstruksi Hukum: Jarimah Ta\'zir',
        category: 'Legal Solution',
        badge: 'Yurisprudensi',
        description: 'Penetapan sanksi Ta\'zir oleh hakim sesuai kaidah Sadd ad-Dzari\'ah untuk menutup pintu mafsadah.',
      },
      position: { x: 250, y: 320 },
    },
    {
      id: '5',
      type: 'customNode',
      data: {
        label: 'Rekomendasi Kebijakan & Relevansi Compliance',
        category: 'Final Output',
        badge: 'Verdict & Advice',
        description: 'Pembaruan regulasi khusus AI biometrik & penerapan audit kepatuhan IT berintegritas.',
      },
      position: { x: 250, y: 480 },
    },
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2', animated: true, label: 'Jalur UU ITE' },
    { id: 'e1-3', source: '1', target: '3', animated: true, label: 'Jalur Fiqh Jinayah' },
    { id: 'e2-4', source: '2', target: '4', label: 'Vakum Norma Solved' },
    { id: 'e3-4', source: '3', target: '4', label: 'Landasan Ta\'zir' },
    { id: 'e4-5', source: '4', target: '5', animated: true, label: 'Output Rekomendasi' },
  ],
};
