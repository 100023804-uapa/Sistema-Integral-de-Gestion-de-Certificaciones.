import type {Metadata} from 'next';
import {Montserrat, Poppins} from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700'],
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'SIGCE - Sistema Integral de Gestión de Certificaciones',
  description: 'Plataforma de gestión de certificaciones',
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es" className={`${montserrat.variable} ${poppins.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
