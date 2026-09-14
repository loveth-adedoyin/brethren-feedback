import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "The Brethren — A safe space to speak.";
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
          backgroundColor: "#1E2420",
        }}
      >
        <div style={{ fontSize: 32, color: "#B98B3E", marginBottom: 24 }}>
          The Brethren
        </div>
        <div
          style={{
            fontSize: 72,
            color: "#EFE6D8",
            lineHeight: 1.1,
            fontWeight: 600,
          }}
        >
          A safe space to speak.
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#B9C2B7",
            marginTop: 32,
            maxWidth: 900,
          }}
        >
          Share a concern, a problem, or feedback — anonymously.
        </div>
      </div>
    ),
    { ...size }
  );
}
