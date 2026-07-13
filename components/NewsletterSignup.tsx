"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";

type Props = {
  dict: Dictionary;
};

export default function NewsletterSignup({ dict }: Props) {
  const [done, setDone] = useState(false);

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    // TODO: wire to an email provider (Mailchimp, Brevo, …); nothing is
    // stored yet — this only confirms the interaction client-side.
    setDone(true);
  }

  return (
    <div className="border border-white/10 bg-hc-night p-6 sm:p-8">
      <h2 className="display-title text-xl text-white sm:text-2xl">
        {dict.newsletter.title}
      </h2>
      <p className="mt-2 max-w-md text-sm text-hc-mist">{dict.newsletter.sub}</p>
      {done ? (
        <p className="kicker mt-5 text-[0.7rem] text-hc-red-bright">
          {dict.newsletter.done}
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-5 flex max-w-md gap-0">
          <label className="sr-only" htmlFor="newsletter-email">
            {dict.newsletter.emailLabel}
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder={dict.newsletter.placeholder}
            className="w-full border border-white/20 bg-hc-ink px-4 py-3 text-sm text-white placeholder:text-hc-steel focus:border-hc-red focus:outline-none"
          />
          <button
            type="submit"
            className="kicker shrink-0 bg-hc-red px-6 py-3 text-[0.7rem] text-white transition-colors hover:bg-hc-red-dark"
          >
            {dict.newsletter.cta}
          </button>
        </form>
      )}
    </div>
  );
}
