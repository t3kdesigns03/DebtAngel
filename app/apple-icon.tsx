import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
// Required so the icon pre-renders to a static PNG under `output: export`.
export const dynamic = "force-static";

const mark = `
<svg width="150" height="150" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F3E7BE"/>
      <stop offset="45%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#C9A227"/>
    </linearGradient>
  </defs>
  <circle cx="32" cy="31" r="22" fill="none" stroke="#0D8A5C" stroke-width="3" opacity="0.4"/>
  <circle cx="32" cy="31" r="21" fill="none" stroke="url(#g)" stroke-width="2.4" opacity="0.6"/>
  <path d="M31 40 C22 28 15 25 5 25 C12 28 13 31 11 35 C17 33 18 36 18 40 C23 37 27 38 31 43 Z" fill="url(#g)"/>
  <path d="M33 40 C42 28 49 25 59 25 C52 28 51 31 53 35 C47 33 46 36 46 40 C41 37 37 38 33 43 Z" fill="url(#g)"/>
  <text x="32" y="34" text-anchor="middle" dominant-baseline="central" font-family="Georgia, serif" font-weight="700" font-size="26" fill="url(#g)">$</text>
</svg>`;

export default function AppleIcon() {
  const markSrc = `data:image/svg+xml;utf8,${encodeURIComponent(mark)}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0A0A",
          borderRadius: 40,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={markSrc} width={150} height={150} alt="" />
      </div>
    ),
    { ...size },
  );
}
