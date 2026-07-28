import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { routing } from "@/libs/i18n/routing";
import { collaborators } from "@/libs/database/teamData";
import CollaboratorDetailClient from "@/components/collaborators/CollaboratorDetail";
import { BreadcrumbSchema } from "@/libs/seo/GameShema";

interface Props {
  params: Promise<{ id: string; locale: string }>;
}

const TEXT = {
  es: {
    notFound: "Colaborador no encontrado | Rhon Studios",
    titleSuffix: "Colaboradores de Rhon Studios",
    fallbackRole: "colaborador",
    descTemplate: (name: string, role: string) =>
      `${name} — ${role} en Rhon Studios. Conoce su rol, contribuciones y enlaces.`,
    home: "Inicio",
    team: "Equipo",
  },
  en: {
    notFound: "Collaborator not found | Rhon Studios",
    titleSuffix: "Rhon Studios Collaborators",
    fallbackRole: "collaborator",
    descTemplate: (name: string, role: string) =>
      `${name} — ${role} at Rhon Studios. Learn about their role, contributions, and links.`,
    home: "Home",
    team: "Team",
  },
} as const;

export async function generateStaticParams() {
  return collaborators.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale: rawLocale } = await params;
  const locale = (hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale) as
    "es" | "en";
  const text = TEXT[locale];

  const collab = collaborators.find((c) => c.id === id && c.visible);
  if (!collab) {
    return { title: text.notFound };
  }

  const title = `${collab.name} | ${text.titleSuffix}`;
  const description = text.descTemplate(collab.name, collab.role ?? text.fallbackRole);

  return {
    title,
    description,
    alternates: {
      canonical: `https://rhonstudios.com/${locale}/collaborators/${collab.id}`,
      languages: {
        es: `https://rhonstudios.com/es/collaborators/${collab.id}`,
        en: `https://rhonstudios.com/en/collaborators/${collab.id}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "profile",
      url: `https://rhonstudios.com/${locale}/collaborators/${collab.id}`,
      siteName: "Rhon Studios",
      images: [
        {
          url: collab.photo ?? "https://rhonstudios.com/og/og-default.png",
          width: 1200,
          height: 630,
          alt: collab.name,
        },
      ],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function Page({ params }: Props) {
  const { id, locale: rawLocale } = await params;
  const locale = (hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale) as
    "es" | "en";
  const text = TEXT[locale];

  const collab = collaborators.find((c) => c.id === id);

  return (
    <>
      {collab && (
        <BreadcrumbSchema
          items={[
            { name: text.home, url: `https://rhonstudios.com/${locale}` },
            { name: text.team, url: `https://rhonstudios.com/${locale}#team` },
            {
              name: collab.name,
              url: `https://rhonstudios.com/${locale}/collaborators/${collab.id}`,
            },
          ]}
        />
      )}
      <CollaboratorDetailClient />
    </>
  );
}
