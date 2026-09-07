import type { Metadata } from "next";
import { Baloo_2, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const display = Baloo_2({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const siteUrl = "https://trambolico3d.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "TRAMBÓLICO 3D | Impresiones 3D",
  description:
    "Productos impresos en 3D, personalizados, llaveros, fidgets, juegos y mucho más.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "TRAMBÓLICO 3D | Impresiones 3D",
    description:
      "Productos impresos en 3D, personalizados, llaveros, fidgets, juegos y mucho más.",
    url: siteUrl,
    siteName: "TRAMBÓLICO 3D",
    locale: "es_AR",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TRAMBÓLICO 3D | Impresiones 3D",
    description:
      "Productos impresos en 3D, personalizados, llaveros, fidgets, juegos y mucho más.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-AR" className={`${display.variable} ${body.variable}`}>
      <body className="font-body text-ink-900 bg-cream-100 antialiased">
        {children}
      </body>
    </html>
  );
}
