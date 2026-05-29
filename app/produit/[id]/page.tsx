"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { HeartIcon, StoreIcon, ChevronLeft } from "@/components/header/icons";
import ProductCard from "@/components/product/ProductCard";

const SIZES = ["XS", "S", "M", "L", "XL"];

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { allProducts } = useStore();
  const { t, tx, price } = useLanguage();
  const { add } = useCart();
  const { has, toggle } = useFavorites();
  const [added, setAdded] = useState(false);
  const [size, setSize] = useState<string | null>(null);
  const fav = has(id);

  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="px-4 sm:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold">{t("product.notFound")}</h1>
        <p className="mt-2 text-sm text-gray-600">{t("product.notFoundHint")}</p>
        <Link
          href="/"
          className="inline-block mt-6 px-5 py-3 bg-black text-white text-sm font-semibold hover:bg-gray-800"
        >
          {t("info.back")}
        </Link>
      </div>
    );
  }

  const name = tx(product.name);
  const related = allProducts.filter((p) => p.id !== product.id).slice(0, 6);

  return (
    <div className="w-full">
      <div className="px-4 sm:px-8 py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-black"
        >
          <ChevronLeft className="w-4 h-4" />
          {t("product.back")}
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:gap-8 px-4 sm:px-8">
        <div className="relative w-full md:w-1/2 aspect-[2/3] bg-surface-gray">
          <Image
            src={product.image}
            alt={`${product.brand} — ${name}`}
            fill
            sizes="(max-width: 840px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          {product.discount && (
            <span className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1">
              -{product.discount}%
            </span>
          )}
        </div>

        <div className="w-full md:w-1/2 py-6 md:py-2 flex flex-col gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide">{product.brand}</p>
            <h1 className="mt-1 text-2xl font-bold">{name}</h1>
          </div>

          <div className="flex items-baseline gap-3">
            {product.oldPrice ? (
              <>
                <span className="text-2xl text-[#A6BE47] font-semibold">
                  {price(product.price)}
                </span>
                <span className="text-base text-gray-400 line-through">
                  {price(product.oldPrice)}
                </span>
              </>
            ) : (
              <span className="text-2xl">{price(product.price)}</span>
            )}
          </div>
          {product.oldPrice && (
            <span className="-mt-3 text-xs text-gray-400">{t("product.refPrice")}</span>
          )}

          <div>
            <p className="mb-2 text-sm font-semibold">{t("product.size")}</p>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                  className={`px-4 py-2 text-sm border transition-colors ${
                    size === s ? "border-black bg-black text-white" : "border-gray-300 hover:border-black"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-2">
            <button
              onClick={() => {
                if (!size) return;
                add(product, size);
                setAdded(true);
              }}
              disabled={!size}
              className="flex-1 py-3 bg-black text-white text-sm font-semibold hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {t("product.addToCart")}
            </button>
            <button
              onClick={() => toggle(id)}
              aria-pressed={fav}
              aria-label={fav ? t("product.removeFav") : t("product.addFav")}
              className="px-4 border border-gray-300 hover:border-black"
            >
              <HeartIcon className="w-5 h-5" filled={fav} />
            </button>
          </div>
          {!size && <p className="text-sm text-gray-500">{t("product.pickSize")}</p>}
          {added && (
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm font-semibold text-[#A6BE47]">{t("product.added")}</p>
              <Link href="/panier" className="text-sm font-semibold underline hover:text-brand-orange">
                {t("cart.viewCart")}
              </Link>
            </div>
          )}

          <div className="flex items-start gap-3 mt-2 p-4 bg-surface-gray">
            <StoreIcon className="w-6 h-6 shrink-0" />
            <div>
              <p className="text-sm font-semibold">{t("cart.pickupTitle")}</p>
              <p className="text-xs text-gray-600">{t("product.pickupDesc")}</p>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="w-full py-10">
          <h2 className="px-4 sm:px-8 mb-4 text-lg font-bold">{t("product.related")}</h2>
          <div className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar snap-x px-4 sm:px-8">
            {related.map((p) => (
              <div
                key={p.id}
                className="snap-start shrink-0 w-[60%] sm:w-[33%] md:w-[200px] lg:w-[220px]"
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
