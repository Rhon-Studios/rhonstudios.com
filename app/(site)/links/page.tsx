import type { Metadata } from "next";
import LinksPage from "@/components/links/LinksPage";

export const metadata: Metadata = {
    title: "Rhon Studios | Enlaces",
    description:
        "Todos los enlaces de Rhon Studios en un solo lugar: Discord, redes sociales, DevBlog, oportunidades de colaboración y más.",
    alternates: {
        canonical: "https://rhonstudios.com/links",
    },
    openGraph: {
        title: "Rhon Studios | Enlaces",
        description: "Discord, redes sociales, DevBlog y oportunidades de colaboración de Rhon Studios.",
        url: "https://rhonstudios.com/links",
        siteName: "Rhon Studios",
        images: [
            {
                url: "https://rhonstudios.com/og/og-default.png",
                width: 1200,
                height: 630,
                alt: "Rhon Studios",
            },
        ],
        locale: "es_ES",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        site: "@rhonstudios",
        title: "Rhon Studios | Enlaces",
        description: "Todos los enlaces de Rhon Studios en un solo lugar.",
        images: ["https://rhonstudios.com/og/og-default.png"],
    },
};

export default function Page() {
    return <LinksPage />;
}