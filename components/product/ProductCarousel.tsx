"use client";

import { useRef } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight, ArrowRight } from "../header/icons";
import type { CarouselSection } from "@/data/home";
import { useLanguage } from "@/context/LanguageContext";

export default function ProductCarousel({ section }: { section: CarouselSection }) {
  const { t, tx } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="w-full py-6 sm:py-8">
      {/* En-tête de section */}
      <div className="flex items-end justify-between px-4 sm:px-8 mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold leading-tight">{tx(section.title)}</h2>
          {section.subtitle && (
            <p className="text-sm text-gray-600">{tx(section.subtitle)}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          {section.cta && (
            <Link
              href={`/categorie/${section.id}`}
              className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold hover:gap-2 transition-all"
            >
              {tx(section.cta)}
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              aria-label={t("carousel.prev")}
              className="p-2 border border-gray-300 hover:bg-surface-gray"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label={t("carousel.next")}
              className="p-2 border border-gray-300 hover:bg-surface-gray"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Piste scrollable */}
      <div
        ref={trackRef}
        className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth px-4 sm:px-8"
      >
        {section.products.map((p) => (
          <div
            key={p.id}
            className="snap-start shrink-0 w-[60%] sm:w-[33%] md:w-[200px] lg:w-[220px]"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
