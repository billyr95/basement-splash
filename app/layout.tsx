import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Basement Loading...",
  description: "Basement Bulletin Board System - A retro terminal-style blog launching soon. Sign up for early access notifications.",
  keywords: ["Basement", "Terminal Blog", "Retro Computing", "Bulletin Board System"],
  authors: [{ name: "Basement" }],
  creator: "Basement",
  publisher: "Basement",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://basementload.ing/",
    title: "Basement Loading...",
    description: "Basement Bulletin Board System - A retro terminal-style blog launching soon.",
    siteName: "Basement",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}