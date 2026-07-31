import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Playground — Indra Mulyana | AI Assistant & Legal Flow Simulator',
  description:
    'Coba langsung: AI Assistant berbasis profil Indra Mulyana dan Decision Tree Simulator sanksi Ta\'zir pada kekosongan hukum AI — interaktif, real-time, dan berbasis React Flow.',
  openGraph: {
    title: 'AI Playground Indra Mulyana — Chat & Legal Decision Tree',
    description:
      'Eksplorasi interaktif: tanya jawab AI tentang profil Indra & simulasi flowchart keputusan hukum pidana Islam secara visual.',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'AI Playground Indra Mulyana' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.jpg'],
  },
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
