import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get("id") ?? "someone-special";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #fff1f2 0%, #fce7f3 50%, #ffe4e6 100%)",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 20 }}>💌</div>
        <div
          style={{
            fontSize: 48,
            fontWeight: "bold",
            color: "#be123c",
            textAlign: "center",
            maxWidth: "80%",
          }}
        >
          Will you go on a date with me?
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#f43f5e",
            marginTop: 16,
          }}
        >
          ❤️ Someone special is waiting for your answer
        </div>
        <div
          style={{
            fontSize: 16,
            color: "#fb7185",
            marginTop: 32,
            opacity: 0.7,
          }}
        >
          datewithme.app/invite/{id.slice(0, 20)}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
