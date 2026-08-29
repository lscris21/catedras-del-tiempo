import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cátedras del Tiempo | Memoria viva de Nicaragua',
  description: 'Una plataforma para preservar y compartir los saberes, oficios y tradiciones de Nicaragua.',
  openGraph: {
    title: 'Cátedras del Tiempo | Memoria viva de Nicaragua',
    description: 'Una plataforma para preservar y compartir los saberes, oficios y tradiciones de Nicaragua.',
    images: [{ url: '/og.png', width: 1792, height: 1024, alt: 'Cátedras del Tiempo · Memoria viva de Nicaragua' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cátedras del Tiempo | Memoria viva de Nicaragua',
    description: 'Una plataforma para preservar y compartir los saberes, oficios y tradiciones de Nicaragua.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
