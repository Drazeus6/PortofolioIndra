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
    category: 'legal' | 'tech' | 'soft';
    iconName?: string;
  }[];
}

export interface CertificationItem {
  id: string;
  filename: string;
  title: string;
  issuer: string;
  year: string;
  pdfUrl?: string;
  imgUrl?: string;
  description: string;
  commandName: string;
}

export const PERSONAL_DATA = {
  name: 'Indra Mulyana',
  title: {
    legal: 'S1 Hukum Pidana Islam — Specialist Hukum, Riset & Administrasi',
    developer: 'Legal-Tech Enthusiast & Systems Analyst — S1 Hukum Pidana Islam',
  },
  location: 'Ciamis, Jawa Barat, Indonesia',
  email: 'indramulyanaa674@gmail.com',
  whatsapp: '081395701071',
  formattedWhatsapp: '0813 9570 1071',
  gpa: '3.71 / 4.00',
  university: 'UIN Sunan Gunung Djati Bandung',
  degree: 'S1 Hukum Pidana Islam',
  gradYear: '2022 - 2026',
  avatar: '/Foto.indra2.jpeg',
  bios: {
    legal: `Lulusan S1 Hukum Pidana Islam dari UIN Sunan Gunung Djati Bandung dengan IPK 3.71 (Sangat Memuaskan). Memiliki pengalaman magang peradilan di Pengadilan Negeri Ciamis & Pengadilan Agama Ciamis, serta mempublikasikan 2 Jurnal Ilmiah Hukum di Galuh Justisi. Ahli dalam prosedur peradilan, analisis normatif, drafting, dan administrasi kepatuhan.`,
    developer: `Pakar gabungan Hukum Pidana & Digital Technologies. Berlatar belakang Teknik Komputer & Jaringan (SMKN 2 Banjar) serta Hukum Pidana Islam (UIN Sunan Gunung Djati). Berfokus pada analisis regulasi AI/ITE, penelitian kekosongan hukum Cybercrime/Deepfake, otomatisasi riset hukum, dan sistem informasi peradilan.`,
  },
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'pa-ciamis',
    title: 'Pengadilan Agama Ciamis',
    role: 'Magang Peradilan & Administrasi',
    period: 'Januari 2025 – Februari 2025',
    institution: 'Pengadilan Agama Ciamis',
    location: 'Ciamis, Jawa Barat',
    description: {
      legal: 'Mempelajari & mengimplementasikan prosedur peradilan agama, penanganan berkas perkara perceraian & waris, digitalisasi arsip hukum, serta verifikasi kelengkapan berkas administrasi kepaniteraan.',
      developer: 'Melakukan pemetaan alur sistem informasi manajemen perkara (SIPP), pengolahan data berkas digital peradilan, dan efisiensi alur administrasi panitera.',
    },
    tags: ['Hukum Acara Agama', 'Administrasi Peradilan', 'Digitalisasi Berkas', 'SIPP'],
    certificateImg: '/Sertifikat.PA.jpg',
  },
  {
    id: 'jurnal-galuh-1',
    title: 'Jurnal Galuh Justisi (Vol 12 No 2)',
    role: 'Author & Penulis Riset Hukum',
    period: 'September 2024',
    institution: 'Jurnal Galuh Justisi - Universitas Galuh',
    location: 'Ciamis, Jawa Barat',
    description: {
      legal: 'Riset normatif & komparatif: "Sistem Pemilihan Umum di Indonesia dalam Perspektif Fiqh Siyasah". Menganalisis relevansi sistem ahlul halli wal aqdi & shura dengan pemilu langsung serta kewenangan MK.',
      developer: 'Pemodelan konsep komparatif sistem voting & penyelesaian sengketa konstitusional dengan metode penelitian kualitatif berbasis literatur digital.',
    },
    tags: ['Fiqh Siyasah', 'Hukum Tata Negara', 'Riset Akademik', 'Sengketa Pemilu'],
    journalPdfUrl: 'https://jurnal.unigal.ac.id/galuhjustisi/article/view/14168/pdf',
    abstract: `Penelitian menguji relevansi sistem pemilu di Indonesia dengan fiqh siyasah (ahlul halli wal aqdi) serta mekanisme peradilan sengketa di Mahkamah Konstitusi.`,
  },
  {
    id: 'jurnal-galuh-2',
    title: 'Jurnal Galuh Justisi (Vol 14 No 1)',
    role: 'Author & Penulis Riset AI & Cybercrime',
    period: 'Maret 2026',
    institution: 'Jurnal Galuh Justisi - Universitas Galuh',
    location: 'Ciamis, Jawa Barat',
    description: {
      legal: 'Riset hukum Cybercrime: "Kekosongan Hukum Mengenai Tindak Pidana Penipuan Deepfake Dalam UU ITE Nomor 1 Tahun 2024 Menurut Perspektif Hukum Pidana Islam". Menganalisis Jarimah Ta\'zir & Al-Ghash.',
      developer: 'Analisis mutakhir mengenai fenomena biometrik sintetis Deepfake AI, celah hukum UU ITE No 1 2024 (Pasal 28 & 45A), dan formulasi Sadd ad-Dzari\'ah untuk penegakan hukum AI.',
    },
    tags: ['Cybercrime AI', 'Deepfake Fraud', 'UU ITE 2024', 'Fiqh Jinayah', 'AI Ethics'],
    journalPdfUrl: 'https://jurnal.unigal.ac.id/galuhjustisi/article/view/23344/pdf',
    abstract: `Mengkaji vakum norma UU ITE 2024 terkait rekayasa biometrik Deepfake dan rekonstruksi sanksi berbasis Jarimah Ta'zir & Maqashid Sharia.`,
  },
  {
    id: 'pn-ciamis',
    title: 'Pengadilan Negeri Ciamis',
    role: 'Magang Peradilan Pidana & Perdata',
    period: 'Juli 2024 – Agustus 2024',
    institution: 'Pengadilan Negeri Ciamis',
    location: 'Ciamis, Jawa Barat',
    description: {
      legal: 'Observasi langsung persidangan perkara pidana & perdata, membantu penyusunan berita acara persidangan, pengarsipan berkas perkara umum, dan pelayanan publik hukum di PTSP.',
      developer: 'Pemeriksaan alur kerja persidangan fisik vs e-Court, manajemen registrasi berkas umum, serta verifikasi kelayakan dokumen persidangan.',
    },
    tags: ['Hukum Acara Pidana', 'Hukum Acara Perdata', 'PTSP', 'e-Court'],
    certificateImg: '/Sertifikat.PN.jpg',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Keahlian Hukum & Analisis',
    description: 'Kapabilitas utama dalam riset, litigasi, dan kepatuhan hukum.',
    skills: [
      { name: 'Analisis Hukum Normatif & Jinayah', level: 95, category: 'legal' },
      { name: 'Legal Drafting & Naskah Akademik', level: 90, category: 'legal' },
      { name: 'Hukum Acara Peradilan (PA & PN)', level: 92, category: 'legal' },
      { name: 'Riset Regulasi Cybercrime & AI (UU ITE)', level: 88, category: 'legal' },
      { name: 'Kepatuhan & Etika Peradilan', level: 94, category: 'legal' },
    ],
  },
  {
    category: 'Keahlian IT & Administrasi Modern',
    description: 'Penguasaan perangkat lunak, sistem informasi, dan teknologi administrasi.',
    skills: [
      { name: 'Microsoft Word (Certified MOS)', level: 96, category: 'tech' },
      { name: 'Microsoft Excel & Data Management', level: 88, category: 'tech' },
      { name: 'PowerPoint & Presentation Design', level: 90, category: 'tech' },
      { name: 'Dasar Artificial Intelligence & Prompting', level: 85, category: 'tech' },
      { name: 'Teknik Komputer & Jaringan (TKJ)', level: 86, category: 'tech' },
      { name: 'Sistem Informasi Peradilan (SIPP & e-Court)', level: 89, category: 'tech' },
    ],
  },
  {
    category: 'Professional Soft Skills',
    description: 'Keterampilan interpersonal dan manajemen profesional.',
    skills: [
      { name: 'Berpikir Kritis & Problem Solving', level: 95, category: 'soft' },
      { name: 'Detail-Oriented & Ketelitian Dokumen', level: 96, category: 'soft' },
      { name: 'Integritas & Etika Profesi', level: 98, category: 'soft' },
      { name: 'Komunikasi Efektif & Negosiasi', level: 90, category: 'soft' },
      { name: 'Manajemen Waktu & Kerja Tim', level: 92, category: 'soft' },
    ],
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'mos-word',
    filename: 'mos_word_certified.cert',
    title: 'Microsoft Office Specialist Word',
    issuer: 'PTIPD UIN SGD Bandung & Lumina Eka Optima',
    year: '2024',
    pdfUrl: '/Completion Certificate _ SkillsBuild.pdf',
    description: 'Sertifikasi internasional penguasaan Microsoft Word profesional untuk penyusunan naskah hukum, format dokumen resmi, dan pengolahan teks kompleks.',
    commandName: 'cat certs/mos_word.cert',
  },
  {
    id: 'ai-dicoding',
    filename: 'belajar_dasar_ai.cert',
    title: 'Sertifikasi Dasar Artificial Intelligence',
    issuer: 'Dicoding Indonesia',
    year: '2024',
    pdfUrl: '/sertifikat Belajar Dasar AI.pdf',
    description: 'Kurikulum pemahaman konsep AI, Machine Learning fundamentals, Etika AI, dan penerapan AI untuk analisis data.',
    commandName: 'cat certs/ai_dicoding.cert',
  },
  {
    id: 'prompt-eng',
    filename: 'prompt_engineering.cert',
    title: 'Prompt Engineering for AI',
    issuer: 'Dicoding / Course Certification',
    year: '2024',
    pdfUrl: '/sertifikat prompt enginering.pdf',
    description: 'Teknik formulasi prompt canggih untuk LLM, otomasi analisis dokumen hukum, dan sintesis data terstruktur.',
    commandName: 'cat certs/prompt_eng.cert',
  },
  {
    id: 'ibm-ai-legal',
    filename: 'ibm_ai_legal.cert',
    title: 'IBM SkillsBuild: AI Legal & Ethics',
    issuer: 'IBM SkillsBuild',
    year: '2024',
    pdfUrl: '/Completion Certificate _ SkillsBuild AI Legal.pdf',
    description: 'Studi komprehensif mengenai regulasi AI, privasi data, kewajiban etis, dan implikasi hukum kecerdasan buatan.',
    commandName: 'cat certs/ibm_ai_legal.cert',
  },
  {
    id: 'ibm-ai-interaction',
    filename: 'ibm_ai_interaction.cert',
    title: 'IBM SkillsBuild: AI Interaction & Prompting',
    issuer: 'IBM SkillsBuild',
    year: '2024',
    pdfUrl: '/Completion Certificate _ SkillsBuild AI Interaction.pdf',
    description: 'Spesialisasi interaksi manusia-komputer dan penerapan agen cerdas dalam dunia profesional.',
    commandName: 'cat certs/ibm_ai_interaction.cert',
  },
  {
    id: 'financial-literacy',
    filename: 'financial_literacy.cert',
    title: 'Introduction to Financial Literacy',
    issuer: 'Certification Course',
    year: '2024',
    pdfUrl: '/sertifikat Introduction to Financial Literacy.pdf',
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
