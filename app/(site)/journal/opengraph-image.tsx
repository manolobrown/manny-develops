import { ImageResponse } from "next/og";
import { loadOgFonts, OG_CONTENT_TYPE, OG_SIZE, OgTemplate } from "@/lib/og";

export const alt = "Field Notes · The Manny Develops Journal";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    (
      <OgTemplate
        title="Field notes."
        eyebrow="Journal · Weddings · Fitness · Events · Tips · BTS"
        bgPath="photos/wedding.jpg"
      />
    ),
    { ...size, fonts: [...(await loadOgFonts())] },
  );
}
