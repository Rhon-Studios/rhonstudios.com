import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { routing } from "@/libs/i18n/routing";
import LinksPage from "@/components/links/LinksPage";

const SEO = {
  es: {
    title: "Rhon Studios | Enlaces",
    description:
      "Todos los enlaces de Rhon Studios en un solo lugar: Discord, redes sociales, DevBlog, oportunidades de colaboración y más.",
    ogDescription:
      "Discord, redes sociales, DevBlog y oportunidades de colaboración de Rhon Studios.",
    twitterDescription: "Todos los enlaces de Rhon Studios en un solo lugar.",
    ogLocale: "es_ES",
  },
  en: {
    title: "Rhon Studios | Links",
    description:
      "All of Rhon Studios' links in one place: Discord, social media, DevBlog, collaboration opportunities, and more.",
    ogDescription:
      "Discord, social media, DevBlog, and collaboration opportunities from Rhon Studios.",
    twitterDescription: "All of Rhon Studios' links in one place.",
    ogLocale: "en_US",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale) as
    "es" | "en";
  const seo = SEO[locale];

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: `https://rhonstudios.com/${locale}/links`,
      languages: {
        es: "https://rhonstudios.com/es/links",
        en: "https://rhonstudios.com/en/links",
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.ogDescription,
      url: `https://rhonstudios.com/${locale}/links`,
      siteName: "Rhon Studios",
      images: [
        {
          url: "https://rhonstudios.com/og/og-default.png",
          width: 1200,
          height: 630,
          alt: "Rhon Studios",
        },
      ],
      locale: seo.ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@rhonstudios",
      title: seo.title,
      description: seo.twitterDescription,
      images: ["https://rhonstudios.com/og/og-default.png"],
    },
  };
}

export default function Page() {
  return <LinksPage />;
}
