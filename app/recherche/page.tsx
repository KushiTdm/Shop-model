"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { useLanguage } from "@/context/LanguageContext";
import ProductCard from "@/components/product/ProductCard";
import { ChevronLeft } from "@/components/header/icons";

function SearchView() {
  const searchParams = useSearchParams();
  const { allProducts } = useStore();
  const { t, tx } = useLanguage();

  const q = (searchParams.get("q") ?? "").trim();
  const needle = q.toLowerCase();

  const results = q
    ? allProducts.filter((p) => {
        const name =
          typeof p.name === "string" ? p.name : `${p.name.fr} ${p.name.en}`;
        return (
          p.brand.toLowerCase().includes(needle) ||
          name.toLowerCase().includes(needle) ||
          tx(p.name).toLowerCase().includes(needle)
        );
      })
    : [];

  // De-duplicate identical products that repeat across carousels.
  const seen = new Set<string>();
  const unique = results.filter((p) => {
    const key = `${p.brand}|${typeof p.name === "string" ? p.name : p.name.fr}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return (
    <div className="w-full px-4 sm:px-8 py-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1 mb-4 text-sm text-gray-600 hover:text-black"
      >
        <ChevronLeft className="w-4 h-4" />
        {t("product.back")}
      </Link>

      <h1 className="text-2xl font-bold">
        {t("search.resultsFor")} « {q} »
      </h1>
      <p className="mt-1 mb-6 text-sm text-gray-500">
        {unique.length} {t("search.results")}
      </p>

      {unique.length === 0 ? (
        <div className="py-10">
          <p className="text-base font-semibold">{t("search.noResults")}</p>
          <p className="mt-1 text-sm text-gray-500">{t("search.noResultsHint")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {unique.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchView />
    </Suspense>
  );
}
