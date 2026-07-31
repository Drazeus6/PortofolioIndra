import type { Metadata } from 'next';
import { TimelineSection } from '@/components/sections/TimelineSection';

export const metadata: Metadata = {
  title: 'Pengalaman — Indra Mulyana | Magang Peradilan & Legal-Tech',
  description:
    'Rekam jejak pengalaman Indra Mulyana: magang di Pengadilan Negeri & Agama Ciamis, riset AI hukum, dan pengembangan sistem legal-tech berbasis teknologi modern.',
  openGraph: {
    title: 'Pengalaman Kerja Indra Mulyana — Hukum & Legal-Tech',
    description:
      'Timeline karir: magang peradilan, riset cybercrime AI, dan kontribusi proyek teknologi hukum.',
    type: 'website',
  },
};

export default function ExperiencePage() {
  return (
    <div className="pt-16">
      <TimelineSection />
    </div>
  );
}
