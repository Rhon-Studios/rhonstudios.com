export async function loadGoogleFont(
  fontFamily: string,
  weight: number,
  text: string
): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    fontFamily
  )}:wght@${weight}&text=${encodeURIComponent(text)}`;

  const css = await (await fetch(url)).text();
  const match = css.match(/src: url\(([^)]+)\) format\('(opentype|truetype)'\)/);

  if (match) {
    const fontResponse = await fetch(match[1]);
    if (fontResponse.ok) {
      return fontResponse.arrayBuffer();
    }
  }

  throw new Error(`No se pudo cargar la fuente: ${fontFamily}`);
}
