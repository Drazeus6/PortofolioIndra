import type { Metadata } from 'next';
import { SkillMatrixSection } from '@/components/sections/SkillMatrixSection';

export const metadata: Metadata = {
  title: 'Skill Matrix — Indra Mulyana | Fullstack Web, Database & Hukum',
  description:
    'Matriks kompetensi Indra Mulyana: fullstack web development (React, Next.js, Node.js), database, AI/Agentic, analisis hukum, riset legal, dan administrasi peradilan.',
  openGraph: {
    title: 'Skill Matrix Indra Mulyana — Developer & Legal Expert',
    description:
      'Kompetensi teknis dan hukum: Next.js, React, Python, AI tools, analisis hukum pidana Islam, dan administrasi pengadilan.',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Skill Matrix Indra Mulyana' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.jpg'],
  },
};

export default function SkillsPage() {
  return (
    <div className="pt-16">
      <SkillMatrixSection />
    </div>
  );
}
