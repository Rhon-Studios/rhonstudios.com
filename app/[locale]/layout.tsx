import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LanguageProvider } from "@/libs/utils/LanguageProvider";
import { routing } from "../../libs/i18n/routing";

import {
  Rye,
  Cinzel,
  Cormorant_Garamond,
  Skranji,
  Cinzel_Decorative,
  IM_Fell_English,
  EB_Garamond,
  Amarante,
  Inter,
  Jua,
  Nunito,
} from "next/font/google";

import "@/styles/theme.css";
import "@/styles/tailwind.css";
import { Analytics } from "@vercel/analytics/next";

const rye = Rye({ subsets: ["latin"], weight: ["400"], variable: "--font-rye" });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-cormorant" });
const cinzel_decorative = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-cinzel_decorative",
});
const skranji = Skranji({ subsets: ["latin"], weight: ["400"], variable: "--font-skranji" });
const im_fell_english = IM_Fell_English({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-im-fell",
});
const eb_garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-gramond",
});
const amarante = Amarante({ weight: ["400"], subsets: ["latin"], variable: "--font-amaranz" });
const inter = Inter({ weight: ["400"], variable: "--font-inter" });
const jua = Jua({ weight: ["400"], variable: "--font-jua" });
const nunito = Nunito({ weight: ["400"], variable: "--font-nunito" });

// Contenido de metadata por idioma. Si querés, esto se puede mover a los
// JSON de /locales más adelante (ej. locales/es.json -> "seo": {...}),
// lo dejo inline por ahora para no tocar más archivos de golpe.
const metadataByLocale = {
  es: {
    title: "Rhon Studios | Estudio de Videojuegos Indie",
    description:
      "Rhon Studios es un estudio de videojuegos independiente creador de Afterlight, Tiny Care, The Observer y Tonkori. Creando mundos que se quedan contigo.",
    ogDescription:
      "Estudio independiente de videojuegos creador de Afterlight, Tiny Care, The Observer y Tonkori. Colabora con nosotros en Revenue Share.",
    twitterDescription:
      "Creadores de Afterlight, Tiny Care, The Observer y Tonkori. Estudio indie fundado por Rashri Amorós y Camilo Jumelle.",
    ogLocale: "es_ES",
    orgDescription:
      "Rhon Studios es un estudio independiente de videojuegos creador de Afterlight, Tiny Care, The Observer y Tonkori.",
    websiteDescription:
      "Estudio independiente de videojuegos. Creando mundos que se quedan contigo.",
    keywords: [
      "Rhon Studios",
      "estudio de videojuegos indie",
      "videojuegos narrativos",
      "Afterlight",
      "Tiny Care",
      "The Observer",
      "Tonkori",
      "indie game studio Spain",
      "revenue share videojuegos",
      "metroidvania indie",
      "novela visual otome",
      "juego mascotas móvil",
      "estudio indie español",
    ],
  },
  en: {
    title: "Rhon Studios | Indie Game Studio",
    description:
      "Rhon Studios is an independent game studio creating Afterlight, Tiny Care, The Observer, and Tonkori. Building worlds that stay with you.",
    ogDescription:
      "Independent game studio behind Afterlight, Tiny Care, The Observer, and Tonkori. Collaborate with us on Revenue Share.",
    twitterDescription:
      "Creators of Afterlight, Tiny Care, The Observer, and Tonkori. Indie studio founded by Rashri Amorós and Camilo Jumelle.",
    ogLocale: "en_US",
    orgDescription:
      "Rhon Studios is an independent game studio creating Afterlight, Tiny Care, The Observer, and Tonkori.",
    websiteDescription: "Independent game studio. Building worlds that stay with you.",
    keywords: [
      "Rhon Studios",
      "indie game studio",
      "narrative games",
      "Afterlight",
      "Tiny Care",
      "The Observer",
      "Tonkori",
      "indie game studio Spain",
      "revenue share game dev",
      "metroidvania indie",
      "otome visual novel",
      "mobile pet sim game",
      "spanish indie studio",
    ],
  },
} as const;

type SupportedLocale = keyof typeof metadataByLocale;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = (
    hasLocale(routing.locales, locale) ? locale : routing.defaultLocale
  ) as SupportedLocale;
  const m = metadataByLocale[l];

  return {
    metadataBase: new URL("https://rhonstudios.com"),
    title: {
      default: m.title,
      template: "%s | Rhon Studios",
    },
    description: m.description,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `https://rhonstudios.com/${l}`,
      languages: {
        es: "https://rhonstudios.com/es",
        en: "https://rhonstudios.com/en",
      },
    },
    openGraph: {
      type: "website",
      url: `https://rhonstudios.com/${l}`,
      siteName: "Rhon Studios",
      title: m.title,
      description: m.ogDescription,
      locale: m.ogLocale,
      images: [
        {
          url: "https://rhonstudios.com/og/og-default.png",
          width: 1200,
          height: 630,
          alt: m.title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@rhonstudios",
      creator: "@rhonstudios",
      title: m.title,
      description: m.twitterDescription,
      images: {
        url: "https://rhonstudios.com/og/og-default.png",
        alt: m.title,
      },
    },
    authors: [
      { name: "Rashri Amorós", url: "https://rhonstudios.com/" },
      { name: "Camilo Jumelle", url: "https://rhonstudios.com/" },
    ],
    creator: "Rhon Studios",
    publisher: "Rhon Studios",
    keywords: [...m.keywords],
    verification: {
      google: "QCjP3QXFZoS6MJYhFd4TRxcjW79x2BOjDFaWPn1hoI8",
    },
    manifest: "/manifest.webmanifest",
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const l = locale as SupportedLocale;
  const m = metadataByLocale[l];

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://rhonstudios.com/#organization",
    name: "Rhon Studios",
    url: "https://rhonstudios.com",
    logo: {
      "@type": "ImageObject",
      url: "https://rhonstudios.com/logos/RhonStudiosCircleLogo.png",
      width: 512,
      height: 512,
    },
    image: "https://rhonstudios.com/og/og-default.png",
    description: m.orgDescription,
    foundingDate: "2025",
    founders: [
      { "@type": "Person", name: "Rashri Amorós", jobTitle: "CEO & Directora de Diseño" },
      { "@type": "Person", name: "Camilo Jumelle", jobTitle: "CEO & Programador Líder" },
    ],
    sameAs: [
      "https://instagram.com/rhonstudios",
      "https://x.com/RhonStudios",
      "https://www.facebook.com/people/Rhon-Studios/61588496083607/",
      "https://www.linkedin.com/company/rhon-studios",
      "https://www.youtube.com/@RhonStudios",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: `https://rhonstudios.com/${l}#contact`,
      availableLanguage: ["Spanish", "English"],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://rhonstudios.com/#website",
    name: "Rhon Studios",
    url: "https://rhonstudios.com",
    description: m.websiteDescription,
    publisher: { "@id": "https://rhonstudios.com/#organization" },
    inLanguage: l,
  };

  const fontVars = [
    rye.variable,
    cinzel.variable,
    cormorant.variable,
    cinzel_decorative.variable,
    skranji.variable,
    im_fell_english.variable,
    eb_garamond.variable,
    amarante.variable,
    inter.variable,
    jua.variable,
    nunito.variable,
  ].join(" ");

  return (
    <html lang={l} dir="ltr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className={fontVars}>
        <NextIntlClientProvider locale={l}>
          <LanguageProvider>
            <Header />
            {children}
            <Footer />
          </LanguageProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
