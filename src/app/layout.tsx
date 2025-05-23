

"use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import "./styles/style.css";
import { SessionProvider } from "next-auth/react"; // Import SessionProvider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Healthcare App",
//   description: "Created by Asabuodu Innocent",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Wrap children inside SessionProvider */}
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
