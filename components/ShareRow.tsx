"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";

type Props = {
  /** Absolute URL of the page being shared */
  url: string;
  title: string;
  dict: Dictionary;
};

export default function ShareRow({ url, title, dict }: Props) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context); ignore
    }
  }

  const linkClass =
    "kicker border border-white/15 px-4 py-2.5 text-[0.65rem] text-hc-mist transition-colors hover:border-hc-red hover:text-white";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="kicker text-[0.65rem] text-hc-steel">
        {dict.share.label}
      </span>
      <a
        href={`https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        X
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        Facebook
      </a>
      <button type="button" onClick={copy} className={linkClass}>
        {copied ? dict.share.copied : dict.share.copy}
      </button>
    </div>
  );
}
