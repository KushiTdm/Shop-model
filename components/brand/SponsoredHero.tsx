"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, InfoIcon } from "../header/icons";
import type { HeroSection } from "@/data/home";
import { useLanguage } from "@/context/LanguageContext";

export default function SponsoredHero({ section }: { section: HeroSection }) {
  const { tx } = useLanguage();
  const title = tx(section.title);

  return (
    <section className="w-full bg-surface-gray">
      <div className="flex flex-col md:flex-row md:items-stretch">
        {/* Texte */}
        <div className="flex flex-col justify-center gap-3 px-4 py-8 md:w-1/2 md:px-12 md:py-12 order-2 md:order-1">
          {section.label && (
            <span className="flex items-center gap-1 text-xs text-gray-500">
              {tx(section.label)}
              <InfoIcon className="w-3.5 h-3.5" />
            </span>
          )}
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{title}</h2>
          {section.subtitle && (
            <p className="text-base text-gray-700 max-w-md">{tx(section.subtitle)}</p>
          )}
          <Link
            href={`/categorie/marque-${encodeURIComponent(section.brand)}`}
            className="inline-flex items-center gap-2 mt-2 text-sm font-semibold hover:gap-3 transition-all"
          >
            {tx(section.cta)}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Image */}
        <div className="relative w-full aspect-[4/3] md:w-1/2 md:aspect-auto md:min-h-[420px] order-1 md:order-2">
          <Image
            src={section.image}
            alt={title}
            fill
            sizes="(max-width: 840px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
