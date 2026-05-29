"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "../header/icons";
import type { EditorialSection } from "@/data/home";
import { useLanguage } from "@/context/LanguageContext";

export default function EditorialCarousel({ section }: { section: EditorialSection }) {
  const { tx } = useLanguage();

  return (
    <section className="w-full py-6 sm:py-8">
      <div className="flex items-end justify-between px-4 sm:px-8 mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold leading-tight">{tx(section.title)}</h2>
          {section.subtitle && (
            <p className="text-sm text-gray-600">{tx(section.subtitle)}</p>
          )}
        </div>
        {section.cta && (
          <Link
            href={`/categorie/${encodeURIComponent(tx(section.title))}`}
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold hover:gap-2 transition-all"
          >
            {tx(section.cta)}
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      <div className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth px-4 sm:px-8">
        {section.items.map((item) => {
          const title = tx(item.title);
          return (
            <Link
              key={item.id}
              href={`/categorie/${encodeURIComponent(title)}`}
              className="group snap-start shrink-0 w-[70%] sm:w-[45%] md:w-[300px]"
            >
              <div className="relative aspect-square w-full bg-surface-gray overflow-hidden">
                <Image
                  src={item.image}
                  alt={title}
                  fill
                  sizes="(max-width: 600px) 70vw, 300px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-3 left-3 text-white text-lg font-bold">
                  {title}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
