import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bald.dog"),
  title: {
    default: "bald.dog ARCADE — El patio de recreo de los perros calvos",
    template: "%s | bald.dog ARCADE",
  },
  description:
    "El patio de recreo de los perros calvos. Preservación arcade de alto rendimiento en Android. Emulación NeoGeo y CPS2, leaderboards 1CC auditados por RAM y rollback netplay.",
  applicationName: "bald.dog ARCADE",
  keywords: [
    "arcade",
    "neogeo",
    "cps2",
    "android arcade",
    "emulador android",
    "1cc leaderboards",
    "perros calvos",
    "bald.dog",
    "retro gaming",
  ],
  authors: [{ name: "cjbaezilla", url: "https://github.com/balddogarcade" }],
  creator: "cjbaezilla",
  publisher: "bald.dog ARCADE",
  manifest: "/site.webmanifest",
  icons: {
    icon: "/images/mascot-portrait.jpg",
    shortcut: "/images/mascot-portrait.jpg",
    apple: "/images/mascot-portrait.jpg",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://bald.dog",
    title: "bald.dog ARCADE — El patio de recreo de los perros calvos",
    description:
      "El patio de recreo de los perros calvos. Preservación arcade en Android con emulación NeoGeo y CPS2, 1CC auditado y diseño editorial monocromático.",
    siteName: "bald.dog ARCADE",
    images: [
      {
        url: "/images/brand-logo-arcade.jpg",
        width: 1024,
        height: 1024,
        alt: "bald.dog ARCADE Logo Oficial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "bald.dog ARCADE — El patio de recreo de los perros calvos",
    description:
      "El patio de recreo de los perros calvos. Preservación arcade pura en Android. Emulación fiel, leaderboards 1CC reales y netplay cooperativo.",
    images: ["/images/brand-logo-arcade.jpg"],
    creator: "@cjbaezilla",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "bald.dog ARCADE",
  "operatingSystem": "Android 8.0+",
  "applicationCategory": "GameApplication",
  "description":
    "El patio de recreo de los perros calvos. Preservación arcade pura en Android con leaderboards 1CC auditados por RAM y rollback netplay.",
  "downloadUrl":
    "https://github.com/balddogarcade/Balddog-Android-App/releases/latest",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
  },
  "author": {
    "@type": "Organization",
    "name": "bald.dog ARCADE",
    "url": "https://bald.dog",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-obsidian text-pure-white font-sans selection:bg-arcade-magenta/30 selection:text-pure-white">
        {children}
      </body>
    </html>
  );
}
