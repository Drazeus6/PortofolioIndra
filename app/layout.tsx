import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ViewModeProvider } from '@/context/ViewModeContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

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
    <html lang="id" className={`scroll-smooth ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col bg-slate-950 text-slate-100`}>
        <ViewModeProvider>
          <ScrollProgressBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ViewModeProvider>
      </body>
    </html>
  );
}
