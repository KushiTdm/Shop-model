"use client";

import Link from "next/link";
import { ArrowRight } from "../header/icons";
import { useLanguage } from "@/context/LanguageContext";
import { useStore } from "@/context/StoreContext";

export default function PromoBanner() {
  const { tx } = useLanguage();
  const { promo } = useStore();

  // The title supports a "|" separator to force a line break.
  const titleLines = tx(promo.title).split("|");

  return (
    <section
      className="w-full px-4 py-6 sm:px-8 sm:py-8"
      style={{
        background: "linear-gradient(180deg, #C3E024 0%, #A6BE47 100%)",
      }}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold leading-tight text-black">
            {titleLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p className="mt-1 text-sm text-black/80">{tx(promo.subtitle)}</p>
        </div>
        <Link
          href="/info/seconde-main"
          className="inline-flex items-center gap-2 text-sm font-semibold text-black hover:gap-3 transition-all"
        >
          {tx(promo.cta)}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
