import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { routing } from "@/libs/i18n/routing";
import { getDevBlogBySlug, devBlogPosts } from "@/libs/database/devblogsData";
import DevBlogPageClient from "@/components/devblogs/DevBlogPage";
import devblogEs from "@/locales/devblogs/es.json";
import devblogEn from "@/locales/devblogs/en.json";

const devblogMessages = { es: devblogEs, en: devblogEn } as const;

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  return devBlogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale: rawLocale } = await params;
  const locale = (hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale) as
    "es" | "en";

  const post = getDevBlogBySlug(slug);
  if (!post) {
    return {
      title:
        locale === "en" ? "Post not found | Rhon Studios" : "Post no encontrado | Rhon Studios",
    };
  }

  const localizedPost = devblogMessages[locale][post.id as keyof typeof devblogEs];

  const title = `${post.metaTitle ?? localizedPost?.title ?? post.project} | DevBlog Rhon Studios`;
  const description =
    post.metaDescription ??
    localizedPost?.excerpt ??
    (locale === "en"
      ? `Rhon Studios development diary about ${post.project}.`
      : `Diario de desarrollo de Rhon Studios sobre ${post.project}.`);

  return {
    title,
    description,
    alternates: {
      canonical: `https://rhonstudios.com/${locale}/devblogs/${post.slug}`,
      languages: {
        es: `https://rhonstudios.com/es/devblogs/${post.slug}`,
        en: `https://rhonstudios.com/en/devblogs/${post.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://rhonstudios.com/${locale}/devblogs/${post.slug}`,
      publishedTime: new Date(post.publishedAt).toISOString(),
      images: [
        {
          url: post.coverImage ?? `https://rhonstudios.com/og/og-devblogs-${locale}.png`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function Page() {
  return <DevBlogPageClient />;
}
