"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/lib/i18n";

type Props = {
  /** ISO datetime the countdown targets */
  target: string;
  dict: Dictionary;
};

function remaining(target: string) {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
  return {
    d: Math.floor(diff / 86_400_000),
    h: Math.floor((diff / 3_600_000) % 24),
    m: Math.floor((diff / 60_000) % 60),
    s: Math.floor((diff / 1_000) % 60),
  };
}

export default function Countdown({ target, dict }: Props) {
  // Render em-dashes until mounted so server and client HTML always match
  const [time, setTime] = useState<ReturnType<typeof remaining> | null>(null);

  useEffect(() => {
    setTime(remaining(target));
    const timer = setInterval(() => setTime(remaining(target)), 1000);
    return () => clearInterval(timer);
  }, [target]);

  const cells = [
    { value: time?.d, label: dict.matches.days },
    { value: time?.h, label: dict.matches.hours },
    { value: time?.m, label: dict.matches.minutes },
    { value: time?.s, label: dict.matches.seconds },
  ];

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      {cells.map((cell, i) => (
        <div key={cell.label} className="flex items-center gap-3 sm:gap-4">
          {i > 0 && (
            <span aria-hidden className="display-title text-xl text-hc-red">
              :
            </span>
          )}
          <div className="text-center">
            <span className="display-title block min-w-11 text-3xl text-white tabular-nums sm:text-4xl">
              {cell.value === undefined ? "—" : String(cell.value).padStart(2, "0")}
            </span>
            <span className="kicker mt-1 block text-[0.55rem] text-hc-steel">
              {cell.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
