import type { Metadata } from 'next';
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans_Arabic } from 'next/font/google';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import './globals.css';

const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-archivo', display: 'swap' });
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-mono', display: 'swap' });
const plexArabic = IBM_Plex_Sans_Arabic({ subsets: ['arabic'], weight: ['500'], variable: '--font-ar', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://oagitech.com'),
  title: { default: 'OAGITECH — Inspection, NDT, Calibration & Training in Saudi Arabia', template: '%s · OAGITECH' },
  description: 'Independent inspection, non-destructive testing, calibration and safety training for oil & gas, petrochemical, marine, power and infrastructure operators across Saudi Arabia.',
  openGraph: { siteName: 'OAGITECH', type: 'website', images: ['/images/ind-refinery.jpg'] }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable} ${plexArabic.variable}`}>
      <body>
        <a href="#main" className="sr-only">Skip to content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
