import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

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
        <Script id="ascii-art" strategy="beforeInteractive">
          {`
console.log(\`
 BBBS   _    _       _  _     _      _     _    _  RFC
 ______／ ＼__／ ＼  ___／ ＼／ ＼___／ ＼ ___／ ＼___／ ＼__／ ＼____
／  _  __ ／＼  _ ＼／  ___／＼  ___＼  ˇ  ／＼  ___＼    ＼__    ＼
＼_／／  __ ＼／  ＼  ＼___  ＼／  __／  ＼／  ＼／  __／   ／ ／ ／ ／＼_／
   ＼__   ／＼   ＼_／  ___／___  ＼__／   ／___  ＼__／  ＼／  ＼  
 20   ＼_／  ＼__／ ＼_／       ＼_／  ＼__／    ＼_／  ＼__／＼__／ 26
            Basement Bulletin Board System
                   [WEBSITE LOADING]
\`);
          `}
        </Script>
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}