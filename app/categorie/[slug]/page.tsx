"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { useLanguage } from "@/context/LanguageContext";
import ProductCard from "@/components/product/ProductCard";
import { ChevronLeft } from "@/components/header/icons";
import type { Product } from "@/data/home";

const GENDER = new Set(["men", "women", "kids"]);

type Pred = (p: Product) => boolean;

const MENU_FILTERS: Record<string, Pred> = {
  new: (p) => !!p.isNew,
  clothing: (p) => p.category === "clothing",
  shoes: (p) => p.category === "shoes",
  accessories: (p) => p.category === "accessories",
  streetwear: (p) => p.tags.includes("streetwear"),
  luxury: (p) => p.tags.includes("luxury"),
  sport: (p) => p.tags.includes("sport"),
  care: (p) => p.tags.includes("care"),
  secondhand: (p) => !!p.secondhand,
  bargains: (p) => !!p.oldPrice,
};

const MENU_TITLE_KEY: Record<string, string> = {
  new: "menu.new",
  clothing: "menu.clothing",
  shoes: "menu.shoes",
  accessories: "menu.accessories",
  streetwear: "menu.streetwear",
  luxury: "menu.luxury",
  sport: "menu.sport",
  care: "menu.care",
  secondhand: "menu.secondhand",
  bargains: "menu.bargains",
};

/** Chips shown on gender pages to refine by product type. */
const CHIPS = ["new", "clothing", "shoes", "accessories", "bargains"];

const deslug = (s: string) => {
  const text = s.replace(/-/g, " ");
  return text.charAt(0).toUpperCase() + text.slice(1);
};

function CategoryView() {
  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const { sections, allProducts } = useStore();
  const { t, tx } = useLanguage();

  const decoded = decodeURIComponent(slug);
  const activeCat = searchParams.get("cat");

  let title = deslug(decoded);
  let products: Product[] = allProducts;
  let isGender = false;

  const section = sections.find((s) => s.id === decoded);
  if (section?.type === "carousel") {
    title = tx(section.title);
    products = section.products;
  } else if (GENDER.has(decoded)) {
    isGender = true;
    title = t(`category.${decoded}`);
    products = allProducts.filter((p) => p.gender === decoded);
    if (activeCat && MENU_FILTERS[activeCat]) products = products.filter(MENU_FILTERS[activeCat]);
  } else if (MENU_FILTERS[decoded]) {
    title = t(MENU_TITLE_KEY[decoded]);
    products = allProducts.filter(MENU_FILTERS[decoded]);
  } else if (decoded.startsWith("marque-")) {
    const brand = decoded.slice("marque-".length);
    const filtered = allProducts.filter(
      (p) => p.brand.toLowerCase() === brand.toLowerCase(),
    );
    title = deslug(brand);
    products = filtered;
  }

  return (
    <div className="w-full px-4 sm:px-8 py-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1 mb-4 text-sm text-gray-600 hover:text-black"
      >
        <ChevronLeft className="w-4 h-4" />
        {t("product.back")}
      </Link>

      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mt-1 mb-4 text-sm text-gray-500">
        {products.length} {t("category.items")}
      </p>

      {isGender && (
        <div className="mb-6 flex flex-wrap gap-2">
          <Link
            href={`/categorie/${decoded}`}
            className={`px-3 py-1.5 text-sm border transition-colors ${
              !activeCat ? "border-black bg-black text-white" : "border-gray-300 hover:border-black"
            }`}
          >
            {t("category.filterAll")}
          </Link>
          {CHIPS.map((key) => {
            const active = activeCat === key;
            return (
              <Link
                key={key}
                href={`/categorie/${decoded}?cat=${key}`}
                className={`px-3 py-1.5 text-sm border transition-colors ${
                  active ? "border-black bg-black text-white" : "border-gray-300 hover:border-black"
                }`}
              >
                {t(MENU_TITLE_KEY[key])}
              </Link>
            );
          })}
        </div>
      )}

      {products.length === 0 ? (
        <p className="py-10 text-gray-500">{t("category.empty")}</p>
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

export default function CategoryPage() {
  return (
    <Suspense>
      <CategoryView />
    </Suspense>
  );
}
