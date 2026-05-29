"use client";

import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useLanguage } from "@/context/LanguageContext";
import ProductCard from "@/components/product/ProductCard";
import { ChevronLeft, HeartIcon } from "@/components/header/icons";

export default function FavoritesPage() {
  const { allProducts } = useStore();
  const { ids } = useFavorites();
  const { t } = useLanguage();

  const seen = new Set<string>();
  const products = allProducts.filter((p) => {
    if (!ids.includes(p.id) || seen.has(p.id)) return false;
    seen.add(p.id);
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

      <h1 className="text-2xl font-bold">{t("fav.title")}</h1>
      <p className="mt-1 mb-6 text-sm text-gray-500">
        {products.length} {t("fav.count")}
      </p>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <HeartIcon className="w-12 h-12 text-gray-300" />
          <p className="mt-4 text-base font-semibold">{t("fav.empty")}</p>
          <p className="mt-1 text-sm text-gray-500">{t("fav.emptyHint")}</p>
          <Link
            href="/"
            className="mt-6 px-5 py-3 bg-black text-white text-sm font-semibold hover:bg-gray-800"
          >
            {t("cart.continue")}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
