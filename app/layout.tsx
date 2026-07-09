import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getAppUrl } from "@/lib/utils";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Date With Me ❤️",
    template: "%s | Date With Me",
  },
  description:
    "A cute, romantic date invitation - will you go on a date with me?",
  metadataBase: new URL(getAppUrl()),
  openGraph: {
    title: "Date With Me ❤️",
    description: "Someone special has a question for you...",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Date With Me ❤️",
    description: "Someone special has a question for you...",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <ThemeToggle />
          <main className="flex min-h-dvh items-center justify-center px-4 py-12">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
