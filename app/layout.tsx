import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ToastProvider";

export const metadata: Metadata = {
  title: "Email Footprint — Discover your digital trail",
  description:
    "Discover which sites may be linked to your email using breach data and public sources. No signup required. Session-only. Privacy-first.",
  keywords: ["email footprint", "breach check", "privacy", "digital trail", "data breach"],
  openGraph: {
    title: "Email Footprint",
    description: "Discover your digital trail. No signup. Privacy-first.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="noise-bg min-h-screen flex flex-col">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
