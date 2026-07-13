"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import type { SearchEntry } from "@/lib/searchIndex";

type Props = {
  entries: SearchEntry[];
  dict: Dictionary;
  open: boolean;
  onClose: () => void;
};

/** Accent-insensitive, case-insensitive matcher. */
function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

export default function SearchOverlay({ entries, dict, open, onClose }: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return [];
    return entries
      .filter((entry) => normalize(`${entry.title} ${entry.hint}`).includes(q))
      .slice(0, 12);
  }, [entries, query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      // Wait a tick so the input exists before focusing
      requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  if (!open) return null;

  const groups: { key: SearchEntry["group"]; label: string }[] = [
    { key: "news", label: dict.nav.news },
    { key: "teams", label: dict.nav.teams },
    { key: "pages", label: dict.search.pages },
  ];

  const flat = groups.flatMap((group) =>
    results.filter((entry) => entry.group === group.key)
  );

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") onClose();
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((current) => Math.min(current + 1, flat.length - 1));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((current) => Math.max(current - 1, 0));
    }
    if (event.key === "Enter" && flat[active]) {
      router.push(flat[active].href);
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] bg-hc-night/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={dict.search.label}
      onKeyDown={onKeyDown}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={dict.nav.close}
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center border border-white/20 text-white transition-colors hover:border-hc-red hover:bg-hc-red"
      >
        <span aria-hidden>✕</span>
      </button>

      <div className="mx-auto max-w-2xl px-4 pt-24 sm:px-6">
        <div className="flex items-center gap-4 border-b-2 border-hc-red pb-4">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-6 w-6 shrink-0 text-hc-red"
            aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={dict.search.placeholder}
            className="display-title w-full bg-transparent text-2xl text-white placeholder:text-hc-steel focus:outline-none sm:text-3xl"
          />
        </div>

        <div className="mt-6 max-h-[60vh] overflow-y-auto pb-12">
          {query.trim() !== "" && flat.length === 0 && (
            <p className="text-sm text-hc-mist">
              {dict.search.empty} «{query}»
            </p>
          )}
          {groups.map((group) => {
            const groupResults = results.filter(
              (entry) => entry.group === group.key
            );
            if (groupResults.length === 0) return null;
            return (
              <div key={group.key} className="mb-8">
                <h2 className="kicker mb-3 flex items-center gap-3 text-hc-red">
                  <span className="h-px w-8 bg-hc-red" aria-hidden />
                  {group.label}
                </h2>
                <ul>
                  {groupResults.map((entry) => {
                    const index = flat.indexOf(entry);
                    return (
                      <li key={entry.href + entry.title}>
                        <button
                          type="button"
                          onClick={() => {
                            router.push(entry.href);
                            onClose();
                          }}
                          onMouseEnter={() => setActive(index)}
                          className={`flex w-full items-baseline justify-between gap-4 border-l-2 px-4 py-3 text-left transition-colors ${
                            index === active
                              ? "border-hc-red bg-hc-ink text-white"
                              : "border-transparent text-hc-mist hover:text-white"
                          }`}
                        >
                          <span className="display-title text-lg">{entry.title}</span>
                          <span className="kicker shrink-0 text-[0.6rem] text-hc-steel">
                            {entry.hint}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
