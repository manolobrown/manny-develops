import { ImageResponse } from "next/og";
import { loadOgFonts, OG_CONTENT_TYPE, OG_SIZE, OgTemplate } from "@/lib/og";

export const alt = "Reviews · Manny Develops";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    (
      <OgTemplate
        title="Kind words from kind people."
        eyebrow="Reviews · 2024 — 2026"
        bgPath="photos/wedding-3.jpg"
      />
    ),
    { ...size, fonts: [...(await loadOgFonts())] },
  );
}
