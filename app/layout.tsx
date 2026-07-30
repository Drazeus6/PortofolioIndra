import type { Metadata } from 'next';
import './globals.css';
import { ViewModeProvider } from '@/context/ViewModeContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Indra Mulyana — Portofolio Legal-Tech & Hukum Pidana Islam',
  description:
    'Portofolio profesional Indra Mulyana, S.H., Lulusan S1 Hukum Pidana Islam UIN Sunan Gunung Djati Bandung. Ahli analisis hukum, riset AI & Cybercrime, dan administrasi peradilan.',
  keywords: [
    'Indra Mulyana',
    'Hukum Pidana Islam',
    'UIN Sunan Gunung Djati',
    'Legal Tech',
    'Cybercrime AI',
    'Deepfake UU ITE',
    'Pengadilan Negeri Ciamis',
    'Pengadilan Agama Ciamis',
  ],
  authors: [{ name: 'Indra Mulyana' }],
  openGraph: {
    title: 'Indra Mulyana — Portofolio Legal-Tech & Hukum Pidana Islam',
    description:
      'Portofolio profesional Indra Mulyana, S.H., S1 Hukum Pidana Islam UIN SGD Bandung.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" class="scroll-smooth">
      <body className="antialiased min-h-screen flex flex-col bg-slate-950 text-slate-100">
        <ViewModeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ViewModeProvider>
      </body>
    </html>
  );
}
