import { ImageResponse } from "next/og";
import { loadOgFonts, OG_CONTENT_TYPE, OG_SIZE, OgTemplate } from "@/lib/og";

export const alt = "Shop — Prints & Lightroom Presets · Manny Develops";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    (
      <OgTemplate
        title="Take a piece of the city home."
        eyebrow="Shop · Prints & Lightroom presets"
        bgPath="photos/window.jpg"
      />
    ),
    { ...size, fonts: [...(await loadOgFonts())] },
  );
}
