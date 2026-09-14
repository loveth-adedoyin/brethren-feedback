import type { Metadata } from "next";
import { Lora, Work_Sans } from "next/font/google";
import "./globals.css";

const display = Lora({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-display",
});

const body = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
});

// If you attach a custom domain later, update this to match.
const siteUrl = "https://brethren-feedback-2rgq.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "A Safe Space — The Brethren",
  description:
    "Share a concern, a problem, or feedback with The Brethren's leadership — anonymously. No names, no email, no tracking.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "A Safe Space — The Brethren",
    description:
      "Share a concern, a problem, or feedback with The Brethren's leadership — anonymously.",
    url: siteUrl,
    siteName: "The Brethren",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "A Safe Space — The Brethren",
    description:
      "Share a concern, a problem, or feedback with The Brethren's leadership — anonymously.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
