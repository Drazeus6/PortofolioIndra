import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sertifikat Digital — Indra Mulyana | Galeri Sertifikasi',
  description:
    'Galeri sertifikat digital Indra Mulyana: IBM SkillsBuild AI, Dicoding, TOEFL, Prompt Engineering, AI Literacy, Legal AI, dan berbagai sertifikasi profesional lainnya.',
  openGraph: {
    title: 'Sertifikat Digital Indra Mulyana — AI, Hukum & Web Dev',
    description:
      'Kumpulan sertifikat profesional: IBM SkillsBuild, Dicoding, AI Interaction, Legal AI, Prompt Engineering, dan TOEFL.',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Sertifikat Indra Mulyana' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.jpg'],
  },
};

export default function CertificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
