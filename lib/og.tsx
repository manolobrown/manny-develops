/* Shared helpers for next/og ImageResponse generation.
 * Used by every opengraph-image.tsx file in the app tree.
 */

import { readFileSync } from "node:fs";
import path from "node:path";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

/* Load Newsreader + JetBrains Mono from Google Fonts as TTFs (satori-compatible).
 * Trick: send an old browser User-Agent so Google Fonts serves TTF rather
 * than WOFF2 (which satori doesn't support).
 */
type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export async function loadOgFonts() {
  async function loadFamily(family: string, weight: FontWeight, name: string) {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&display=swap`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36",
        },
      },
    ).then((r) => r.text());
    const match = css.match(/src: url\((.+?)\) format\('truetype'\)/);
    if (!match) throw new Error(`Couldn't extract TTF URL for ${name} ${weight}`);
    const data = await fetch(match[1]).then((r) => r.arrayBuffer());
    return { name, data, weight, style: "normal" as const };
  }

  const [serifLight, serifReg, mono] = await Promise.all([
    loadFamily("Newsreader", 300, "Newsreader"),
    loadFamily("Newsreader", 500, "Newsreader"),
    loadFamily("JetBrains+Mono", 500, "JetBrains Mono"),
  ]);

  return [serifLight, serifReg, mono];
}

/* Read an image from /public/ as a base64 data URL.
 * Works at build time and request time without needing the dev server. */
export function publicImageDataUrl(relativeFromPublic: string): string {
  const buf = readFileSync(
    path.join(process.cwd(), "public", relativeFromPublic),
  );
  const ext = relativeFromPublic.split(".").pop()?.toLowerCase() ?? "jpg";
  const mime =
    ext === "png"
      ? "image/png"
      : ext === "jpg" || ext === "jpeg"
      ? "image/jpeg"
      : "image/jpeg";
  return `data:${mime};base64,${buf.toString("base64")}`;
}

type TemplateProps = {
  title: string;
  bgPath?: string; // path under /public, e.g. "photos/night-4.jpg"
  eyebrow?: string;
};

/* JSX template for an OG card. Returns a React node satori renders.
 * Layout: full-bleed photo bg with dark gradient overlay, brand mark top-left,
 * eyebrow + serif title bottom. Pure-monochrome to match the site.
 */
export function OgTemplate({ title, bgPath, eyebrow }: TemplateProps) {
  const bgSrc = bgPath ? publicImageDataUrl(bgPath) : undefined;
  const onPhoto = Boolean(bgSrc);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        background: onPhoto ? "#0a0a0a" : "#fafafa",
        color: onPhoto ? "#fafafa" : "#0a0a0a",
        position: "relative",
        fontFamily: "Newsreader",
      }}
    >
      {bgSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={bgSrc}
          alt=""
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.55,
          }}
        />
      )}
      {bgSrc && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)",
          }}
        />
      )}

      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontFamily: "JetBrains Mono",
          fontSize: 20,
          fontWeight: 500,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          opacity: onPhoto ? 0.95 : 0.7,
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: 6,
            background: onPhoto ? "#fafafa" : "#0a0a0a",
          }}
        />
        <span>Manny Develops</span>
      </div>

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div
          style={{
            fontFamily: "JetBrains Mono",
            fontSize: 20,
            fontWeight: 500,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        >
          {eyebrow ?? "Manuel Peña — Photographer · Manhattan, NYC"}
        </div>
        <div
          style={{
            fontFamily: "Newsreader",
            fontWeight: 300,
            fontSize: 108,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            maxWidth: 980,
            display: "flex",
          }}
        >
          {title}
        </div>
      </div>
    </div>
  );
}
