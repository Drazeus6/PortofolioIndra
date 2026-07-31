import type { Metadata } from 'next';
import { ProjectsSection } from '@/components/sections/ProjectsSection';

export const metadata: Metadata = {
  title: 'Proyek — Indra Mulyana | Legal-Tech & Fullstack Web Development',
  description:
    'Portofolio proyek Indra Mulyana: aplikasi AI hukum (Jinayah App), website try out CPNS (Ryoku), website kafe, dan berbagai proyek fullstack web lainnya.',
  openGraph: {
    title: 'Proyek Indra Mulyana — Legal-Tech & Web Developer',
    description:
      'Kumpulan proyek nyata: Jinayah App (AI hukum pidana), Ryoku CPNS, Coffeeshop, dan lebih banyak lagi.',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Proyek Indra Mulyana' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.jpg'],
  },
};

export default function ProjectsPage() {
  return (
    <div className="pt-16">
      <ProjectsSection />
    </div>
  );
}
