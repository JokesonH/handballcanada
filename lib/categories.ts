import type { NewsCategory } from "@/lib/content";

/**
 * Visual identity per news category: gradient used when an article has no
 * photo, so cards stay branded instead of falling back to a grey box.
 */
export const categoryStyles: Record<
  NewsCategory,
  { gradient: string; watermark: string }
> = {
  "national-teams": {
    gradient: "from-hc-navy via-hc-navy-deep to-hc-night",
    watermark: "CAN",
  },
  beach: {
    gradient: "from-hc-red-dark via-hc-navy-deep to-hc-night",
    watermark: "BEACH",
  },
  federation: {
    gradient: "from-hc-navy-soft via-hc-ink to-hc-night",
    watermark: "HC",
  },
  competitions: {
    gradient: "from-hc-red via-hc-red-dark to-hc-ink",
    watermark: "CUP",
  },
  development: {
    gradient: "from-hc-navy via-hc-ink to-hc-night",
    watermark: "DEV",
  },
};
