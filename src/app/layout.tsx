import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"


const roboto = Roboto({
  weight: ['100', '300', '400'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar
        closeButton={false}
        closeOnClick
      />
      <Analytics />
      <SpeedInsights />
        <body >{children}</body>
    </html>
  );
}
