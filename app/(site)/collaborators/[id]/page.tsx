import type { Metadata } from "next";
import { collaborators } from "@/libs/database/teamData";
import CollaboratorDetailClient from "@/components/collaborators/CollaboratorDetail";
import { BreadcrumbSchema } from "@/libs/seo/GameShema";

interface Props {
    params: { id: string };
}

export async function generateStaticParams() {
    return collaborators.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const collab = collaborators.find((c) => c.id === params.id && c.visible);
    if (!collab) return { title: "Colaborador no encontrado | Rhon Studios" };

    const title = `${collab.name} | Colaboradores de Rhon Studios`;
    const description = `${collab.name} — ${collab.role ?? "colaborador"} en Rhon Studios. Conoce su rol, contribuciones y enlaces.`;

    return {
        title,
        description,
        alternates: { canonical: `https://rhonstudios.com/collaborators/${collab.id}` },
        openGraph: {
            title, description, type: "profile",
            url: `https://rhonstudios.com/collaborators/${collab.id}`,
            siteName: "Rhon Studios",
            images: [{
                url: collab.photo ?? "https://rhonstudios.com/og/og-default.png",
                width: 1200, height: 630, alt: collab.name,
            }],
        },
        twitter: { card: "summary_large_image", title, description },
    };
}

export default function Page({ params }: Props) {
    const collab = collaborators.find((c) => c.id === params.id);
    return (
        <>
            {collab && (
                <BreadcrumbSchema
                    items={[
                        { name: "Inicio", url: "https://rhonstudios.com" },
                        { name: "Equipo", url: "https://rhonstudios.com/#team" },
                        { name: collab.name, url: `https://rhonstudios.com/collaborators/${collab.id}` },
                    ]}
                />
            )}
            <CollaboratorDetailClient />
        </>
    );
}