import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { collaborators } from "@/libs/database/teamData";
import { loadGoogleFont } from "@/libs/og/loadGoogleFonts";
import ourteamEs from "@/locales/ourteam/es.json";
import ourteamEn from "@/locales/ourteam/en.json";

export const runtime = "nodejs";

const WIDTH = 1192;
const HEIGHT = 630;

const ourteamMessages = { es: ourteamEs, en: ourteamEn } as const;
const FALLBACK_TAGLINE = { es: "Colaborador", en: "Collaborator" } as const;

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const locale = searchParams.get("locale") === "en" ? "en" : "es";

  const collab = collaborators.find((c) => c.id === id);
  const localizedCollab =
    ourteamMessages[locale].collaborators[id as keyof typeof ourteamEs.collaborators];

  const name = collab?.name ?? "Rhon Studios";

  const subtitle = localizedCollab?.tagline || localizedCollab?.role || FALLBACK_TAGLINE[locale];

  const [bgBuffer, ryeFont, garamondFont] = await Promise.all([
    readFile(path.join(process.cwd(), "public/og/og-collaborator-template.png")),
    loadGoogleFont("Rye", 400, name),
    loadGoogleFont("Cormorant Garamond", 400, subtitle),
  ]);

  const bgSrc = `data:image/png;base64,${bgBuffer.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: WIDTH,
        height: HEIGHT,
        display: "flex",
        position: "relative",
      }}
    >
      <img
        src={bgSrc}
        width={WIDTH}
        height={HEIGHT}
        style={{ position: "absolute", top: 0, left: 0 }}
      />

      <div
        style={{
          position: "absolute",
          left: 128,
          top: 218,
          width: 760,
          display: "flex",
        }}
      >
        <span
          style={{
            fontFamily: "Rye",
            fontSize: 64.1,
            color: "#FFFFFF",
            lineHeight: 1.1,
            letterSpacing: "0.02em",
          }}
        >
          {name}
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          left: 128,
          top: 358,
          width: 700,
          display: "flex",
        }}
      >
        <span
          style={{
            fontFamily: "Cormorant Garamond",
            fontSize: 30.2,
            color: "#FFFFFF",
          }}
        >
          {subtitle}
        </span>
      </div>
    </div>,
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        { name: "Rye", data: ryeFont, style: "normal", weight: 400 },
        { name: "Cormorant Garamond", data: garamondFont, style: "normal", weight: 400 },
      ],
    }
  );
}
