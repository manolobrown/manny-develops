import { ImageResponse } from "next/og";
import { loadOgFonts, OG_CONTENT_TYPE, OG_SIZE, OgTemplate } from "@/lib/og";

export const alt = "Manuel Peña — Bio Links";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    (
      <OgTemplate
        title="Manuel Peña."
        eyebrow="Bio links · Book · Free presets · Shop · Journal"
        bgPath="headshot.jpg"
      />
    ),
    { ...size, fonts: [...(await loadOgFonts())] },
  );
}
