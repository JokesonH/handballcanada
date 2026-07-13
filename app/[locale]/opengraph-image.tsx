import { ImageResponse } from "next/og";
import { getDictionary, isLocale } from "@/lib/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Handball Canada";

const leafPath =
  "M0 -100 L12 -62 L38 -80 L30 -42 L68 -54 L48 -18 L88 -8 L52 10 L66 40 L26 28 L6 34 L6 86 L-6 86 L-6 34 L-26 28 L-66 40 L-52 10 L-88 -8 L-48 -18 L-68 -54 L-30 -42 L-38 -80 L-12 -62 Z";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(isLocale(locale) ? locale : "en");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "linear-gradient(135deg, #9e111b 0%, #4f0910 45%, #0e0b0c 100%)",
          padding: 64,
          position: "relative",
        }}
      >
        <svg
          width="560"
          height="546"
          viewBox="-100 -105 200 195"
          style={{ position: "absolute", right: -80, top: 40, opacity: 0.25 }}
        >
          <path d={leafPath} fill="none" stroke="#ffffff" strokeWidth="2.5" />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 14,
            background: "#eb2c2f",
          }}
        />
        <div
          style={{
            fontSize: 110,
            fontWeight: 700,
            color: "#ffffff",
            textTransform: "uppercase",
            letterSpacing: -2,
            lineHeight: 0.95,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Handball</span>
          <span style={{ color: "#eb2c2f" }}>Canada</span>
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 30,
            color: "#d9d1cc",
            maxWidth: 700,
          }}
        >
          {dict.meta.tagline}
        </div>
      </div>
    ),
    size
  );
}
