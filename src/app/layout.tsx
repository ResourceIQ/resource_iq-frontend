import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Albert_Sans } from "next/font/google";
import { AuthGuard } from "@/components/auth/auth-guard";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
  //weight: ["400", "700"],
});


export const metadata = {
  title: "ResourceIQ | Intelligent Engineering Resource Optimization",
  description: "Optimize your engineering efforts with real-time analytics, intelligent task allocation, and predictive resource modeling.",
  icons: {
    icon: [
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon_io/apple-touch-icon.png" },
    ],
    // This handles Android/Chrome specifically
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/favicon_io/apple-touch-icon.png',
      },
    ],
  },
  manifest: "/favicon_io/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${albertSans.variable} antialiased`}
      >
        <AuthGuard>
          {children}
        </AuthGuard>

      </body>
    </html>
  );
}