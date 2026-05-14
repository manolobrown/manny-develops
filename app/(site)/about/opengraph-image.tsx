import { ImageResponse } from "next/og";
import { loadOgFonts, OG_CONTENT_TYPE, OG_SIZE, OgTemplate } from "@/lib/og";

export const alt = "About · Manuel Peña, Photographer in Manhattan";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    (
      <OgTemplate
        title="Manhattan-based. Always looking."
        eyebrow="About · 9 years · 280,515 photos · 1,159 five-star"
        bgPath="headshot.jpg"
      />
    ),
    { ...size, fonts: [...(await loadOgFonts())] },
  );
}
