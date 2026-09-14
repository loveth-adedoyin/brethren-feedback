import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "The Brethren — Admin sign-in.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#2A1F1A",
        }}
      >
        <div style={{ fontSize: 32, color: "#B5493D", marginBottom: 24 }}>
          The Brethren — Admin
        </div>
        <div
          style={{
            fontSize: 64,
            color: "#EFE6D8",
            lineHeight: 1.1,
            fontWeight: 600,
          }}
        >
          Private dashboard
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#B9C2B7",
            marginTop: 32,
          }}
        >
          Not for sharing — sign-in required.
        </div>
      </div>
    ),
    { ...size }
  );
}
