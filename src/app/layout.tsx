import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Selfless Advice - Life-Changing Wisdom for a Happier Life",
  description: "Discover valuable insights for life, wisdom on how to live happily, understand life's true purpose, and find genuine advice that can transform your existence.",
  keywords: ["life advice", "wisdom", "happiness", "self-improvement", "meaning of life", "personal growth"],
  authors: [{ name: "Selfless Advice" }],
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "Selfless Advice - Life-Changing Wisdom",
    description: "Transform your life with genuine wisdom and advice for true happiness",
    type: "website",
    siteName: "Selfless Advice",
  },
  twitter: {
    card: "summary_large_image",
    title: "Selfless Advice - Life-Changing Wisdom",
    description: "Transform your life with genuine wisdom and advice for true happiness",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50`}
      >
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
