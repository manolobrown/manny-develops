import { ImageResponse } from "next/og";
import { loadOgFonts, OG_CONTENT_TYPE, OG_SIZE, OgTemplate } from "@/lib/og";

export const alt = "Services & Rates · Manny Develops";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    (
      <OgTemplate
        title="Pick a package."
        eyebrow="Services & rates · Half Day · Full Day · The Story"
        bgPath="photos/wedding-5.jpg"
      />
    ),
    { ...size, fonts: [...(await loadOgFonts())] },
  );
}
