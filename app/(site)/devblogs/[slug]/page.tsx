import type { Metadata } from "next";
import { getDevBlogBySlug, devBlogPosts } from "@/libs/database/devblogsData";
import DevBlogPageClient from "@/components/devblogs/DevBlogPage";
import { BreadcrumbSchema } from "@/libs/seo/GameShema";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
    return devBlogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = getDevBlogBySlug(params.slug);
    if (!post) return { title: "Post no encontrado | Rhon Studios" };

    const title = `${post.metaTitle ?? post.project} | DevBlog Rhon Studios`;
    const description = post.metaDescription ?? `Diario de desarrollo de Rhon Studios sobre ${post.project}.`;

    return {
        title,
        description,
        alternates: { canonical: `https://rhonstudios.com/devblogs/${post.slug}` },
        openGraph: {
            title, description, type: "article",
            url: `https://rhonstudios.com/devblogs/${post.slug}`,
            publishedTime: new Date(post.publishedAt).toISOString(),
            images: [{ url: post.coverImage ?? "https://rhonstudios.com/og/og-default.png", width: 1200, height: 630 }],
        },
        twitter: { card: "summary_large_image", title, description },
    };
}

export default function Page() {
    return <DevBlogPageClient />;
}