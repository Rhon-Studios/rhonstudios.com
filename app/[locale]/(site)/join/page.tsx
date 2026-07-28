import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { routing } from "@/libs/i18n/routing";
import { JoinIndex } from "@/components/join/JoinIndex";
import joinPageEs from "@/locales/es.json";
import joinPageEn from "@/locales/en.json";

const joinPageMessages = {
  es: joinPageEs.join_page,
  en: joinPageEn.join_page,
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale) as
    "es" | "en";
  const jp = joinPageMessages[locale];

  const title = `${jp.title} | Rhon Studios`;
  const description = jp.description;

  return {
    title,
    description,
    alternates: {
      canonical: `https://rhonstudios.com/${locale}/join`,
      languages: {
        es: "https://rhonstudios.com/es/join",
        en: "https://rhonstudios.com/en/join",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://rhonstudios.com/${locale}/join`,
      siteName: "Rhon Studios",
      type: "website",
      images: [
        {
          url: `https://rhonstudios.com/og/og-join-${locale}.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@rhonstudios",
      title,
      description,
      images: [`https://rhonstudios.com/og/og-join-${locale}.png`],
    },
  };
}

export default function Page() {
  return <JoinIndex />;
}
