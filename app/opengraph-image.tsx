import { ImageResponse } from "next/og";

export const alt =
  "Current Automations: find what could be running without you, then we build it.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated rather than shipped as a PNG so the card copy stays in the repo and
// cannot drift from the site the way a hand-exported image does.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(150deg, #04091a 0%, #081424 58%, #0b2136 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 999,
              background: "linear-gradient(140deg, #8cf0e0 0%, #4fd0ad 52%, #2e8fd6 100%)",
              display: "flex",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 25,
                fontWeight: 700,
                letterSpacing: "0.2em",
                color: "#ffffff",
              }}
            >
              CURRENT
            </span>
            <span
              style={{
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: "0.28em",
                color: "rgba(255,255,255,0.62)",
              }}
            >
              AUTOMATIONS
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 74,
              fontWeight: 700,
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              color: "#ffffff",
              maxWidth: 960,
              display: "flex",
            }}
          >
            Find what could be running without you.
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 30,
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.72)",
              maxWidth: 900,
              display: "flex",
            }}
          >
            A free walkthrough, then we build the system that fixes it and run it for you.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.16)",
            paddingTop: 26,
          }}
        >
          <span style={{ fontSize: 24, color: "#4fd0ad", fontWeight: 600 }}>
            currentautomations.ca
          </span>
          <span style={{ fontSize: 22, color: "rgba(255,255,255,0.55)" }}>
            Ontario, Canada
          </span>
        </div>
      </div>
    ),
    size
  );
}
