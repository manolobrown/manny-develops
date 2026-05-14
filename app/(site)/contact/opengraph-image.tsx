import { ImageResponse } from "next/og";
import { loadOgFonts, OG_CONTENT_TYPE, OG_SIZE, OgTemplate } from "@/lib/og";

export const alt = "Get in Touch · Manny Develops";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    (
      <OgTemplate
        title="Let's make something."
        eyebrow="Contact · Replies in 48 hours"
        bgPath="photos/steam.jpg"
      />
    ),
    { ...size, fonts: [...(await loadOgFonts())] },
  );
}
