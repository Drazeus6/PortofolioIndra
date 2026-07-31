import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontak — Indra Mulyana | Rekrutmen & Kolaborasi Legal-Tech',
  description:
    'Hubungi Indra Mulyana untuk peluang karir di bidang peradilan, fullstack web development, legal officer, legal-tech, atau diskusi riset dan kolaborasi proyek.',
  openGraph: {
    title: 'Kontak Indra Mulyana — Rekrutmen & Kolaborasi',
    description:
      'Terhubung langsung via email atau WhatsApp untuk tawaran kerja, konsultasi hukum-teknologi, atau diskusi proyek.',
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
