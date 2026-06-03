import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mahdi Créations – Agence Création Site Web & Référencement Google au Maroc",
  description:
    "Mahdi Créations, agence web à Marrakech spécialisée dans la création de sites web professionnels, le référencement naturel SEO et le marketing digital au Maroc.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                const originalError = console.error;
                console.error = function(...args) {
                  const msg = args.join(' ');
                  if (msg.includes('bis_skin_checked') || msg.includes('bis_register')) {
                    return;
                  }
                  originalError.apply(console, args);
                };
              }
            `
          }}
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-dark text-text-white font-body selection:bg-gold selection:text-dark"
        suppressHydrationWarning
      >
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
