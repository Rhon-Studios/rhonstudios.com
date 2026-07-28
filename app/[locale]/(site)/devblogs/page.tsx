import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { routing } from "@/libs/i18n/routing";
import { DevBlogsIndex } from "@/components/devblogs/DevBlogsIndex";

const SEO = {
  es: {
    title: "DevBlog | Rhon Studios",
    description:
      "El diario de desarrollo de Rhon Studios: las decisiones que tomamos, los problemas que encontramos y el porqué detrás de cada elección en Afterlight, Tonkori y más.",
  },
  en: {
    title: "DevBlog | Rhon Studios",
    description:
      "Rhon Studios' development diary: the decisions we make, the problems we run into, and the reasoning behind Afterlight, Tonkori, and more.",
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
      canonical: `https://rhonstudios.com/${locale}/devblogs`,
      languages: {
        es: "https://rhonstudios.com/es/devblogs",
        en: "https://rhonstudios.com/en/devblogs",
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://rhonstudios.com/${locale}/devblogs`,
      siteName: "Rhon Studios",
      type: "website",
      images: [
        {
          url: "https://rhonstudios.com/og/og-default.png",
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@rhonstudios",
      title: seo.title,
      description: seo.description,
      images: ["https://rhonstudios.com/og/og-default.png"],
    },
  };
}

export default function DevBlogsPage() {
  return <DevBlogsIndex />;
}
