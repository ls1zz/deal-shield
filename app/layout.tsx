import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DealShield | AI-Powered Due Diligence for Luxury Asset Brokers",
  description: "Investigate companies, individuals, and assets across 9 global registries in under 60 seconds. Built for aircraft brokers, luxury auto dealers, and high-value transactions.",
  keywords: ["due diligence", "aircraft broker", "luxury assets", "company verification", "background checks", "AI due diligence"],
  authors: [{ name: "DealShield" }],
  openGraph: {
    title: "DealShield | AI-Powered Due Diligence",
    description: "Verify high-value deals in minutes, not weeks. 9 global registries, 60-second reports.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}