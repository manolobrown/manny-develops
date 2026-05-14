import { ImageResponse } from "next/og";
import { loadOgFonts, OG_CONTENT_TYPE, OG_SIZE, OgTemplate } from "@/lib/og";

export const alt = "Manny Develops · Manuel Peña — Photographer, NYC";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    (
      <OgTemplate
        title="Pictures that last."
        bgPath="photos/night-4.jpg"
      />
    ),
    { ...size, fonts: [...(await loadOgFonts())] },
  );
}
