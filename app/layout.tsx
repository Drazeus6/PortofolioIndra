import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ViewModeProvider } from '@/context/ViewModeContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar';
import { GlobalCursorGlow } from '@/components/ui/GlobalCursorGlow';

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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://portofolioindra.vercel.app');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'Indra Mulyana — Portofolio Legal-Tech & Hukum Pidana Islam',
    description:
      'Portofolio profesional Indra Mulyana, S.H., S1 Hukum Pidana Islam UIN SGD Bandung. Ahli analisis hukum, riset AI & Cybercrime, dan administrasi peradilan.',
    type: 'website',
    url: siteUrl,
    siteName: 'Portofolio Indra Mulyana',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Indra Mulyana — Legal-Tech & Fullstack Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Indra Mulyana — Portofolio Legal-Tech & Hukum Pidana Islam',
    description:
      'Portofolio profesional Indra Mulyana, S.H. — Legal-Tech, AI Hukum, Fullstack Web Developer.',
    images: ['/og-image.jpg'],
  },
};

import { LanguageProvider } from '@/context/LanguageContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`scroll-smooth ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col bg-slate-950 text-slate-100`}>
        <LanguageProvider>
          <ViewModeProvider>
            <GlobalCursorGlow />
            <ScrollProgressBar />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </ViewModeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
