import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { owner, stats } from "@/lib/data";

export const alt = `${owner.name} — ${owner.headlineTechnical}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Palette mirrors the light-theme tokens in globals.css.
const INK = "#1a1917";
const BG = "#faf8f3";
const LIME = "#a3e635";
const LIME_STRONG = "#84cc16";
const MUTED_INK = "#6b6659";
const BORDER = "#e4ded0";

const font = (name: string) => readFile(join(process.cwd(), "src/app/_fonts", name));

export default async function Image() {
  const [bold, medium] = await Promise.all([
    font("SpaceGrotesk-Bold.ttf"),
    font("SpaceGrotesk-Medium.ttf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          color: INK,
          padding: "68px 72px",
          fontFamily: "Space Grotesk",
          position: "relative",
        }}
      >
        {/* Tilted lime slab, echoing the hero photo backdrop. */}
        <div
          style={{
            position: "absolute",
            top: -150,
            right: -130,
            width: 460,
            height: 460,
            background: LIME,
            borderRadius: 72,
            transform: "rotate(18deg)",
            opacity: 0.9,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: MUTED_INK,
              fontWeight: 500,
            }}
          >
            <div style={{ width: 52, height: 3, background: LIME_STRONG }} />
            {owner.location}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 88,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.05,
              marginTop: 34,
            }}
          >
            {owner.name}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              marginTop: 24,
              fontSize: 44,
              fontWeight: 700,
              color: INK,
            }}
          >
            <span
              style={{
                background: LIME,
                color: "#243305",
                padding: "6px 22px 12px",
                borderRadius: 999,
              }}
            >
              {owner.headlineTechnical}
            </span>
            <span style={{ color: MUTED_INK }}>{owner.headlineSub}</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `2px solid ${BORDER}`,
            paddingTop: 30,
          }}
        >
          <div style={{ display: "flex", gap: 52 }}>
            {stats.slice(0, 3).map((s) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 42, fontWeight: 700 }}>{s.value}</div>
                <div
                  style={{
                    fontSize: 19,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    color: MUTED_INK,
                    fontWeight: 500,
                    marginTop: 4,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", fontSize: 26, fontWeight: 700, color: MUTED_INK }}>
            edo-bagus.my.id
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Space Grotesk", data: bold, weight: 700, style: "normal" },
        { name: "Space Grotesk", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
