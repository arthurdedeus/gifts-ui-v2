import { ToastContainer } from 'react-toastify';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import { StyledComponentsRegistry } from '@/ServerStyleSheet';

import './globals.css';

const roboto = Roboto({
  weight: ['100', '300', '400'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Presentes Carthur',
  description: 'Lista de presentes do casamento de Carla e Arthur',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <StyledComponentsRegistry>
          <ToastContainer
            position="bottom-left"
            autoClose={2000}
            hideProgressBar
            closeButton={false}
            closeOnClick
          />
          <Analytics />
          <SpeedInsights />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
