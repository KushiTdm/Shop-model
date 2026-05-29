"use client";

import Image from "next/image";
import Link from "next/link";
import { HeartIcon } from "../header/icons";
import type { Product } from "@/data/home";
import { useLanguage } from "@/context/LanguageContext";
import { useFavorites } from "@/context/FavoritesContext";

export default function ProductCard({ product }: { product: Product }) {
  const { t, tx, price: formatPrice } = useLanguage();
  const { has, toggle } = useFavorites();
  const fav = has(product.id);
  const name = tx(product.name);

  return (
    <article className="group relative flex flex-col">
      <Link href={`/produit/${product.id}`} className="flex flex-col">
        <div className="relative aspect-[2/3] w-full bg-surface-gray overflow-hidden">
          <Image
            src={product.image}
            alt={`${product.brand} — ${name}`}
            fill
            sizes="(max-width: 600px) 50vw, (max-width: 840px) 33vw, 200px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {product.discount && (
            <span className="absolute top-2 left-2 bg-black text-white text-xs px-1.5 py-0.5">
              -{product.discount}%
            </span>
          )}
        </div>

        <div className="mt-2 flex flex-col gap-0.5">
          <span className="text-sm font-bold leading-tight">{product.brand}</span>
          <span className="text-sm text-gray-700 leading-tight line-clamp-1">{name}</span>
          <div className="mt-0.5 flex items-baseline gap-2">
            {product.oldPrice ? (
              <>
                <span className="text-base text-[#A6BE47] font-semibold">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xs text-gray-400 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              </>
            ) : (
              <span className="text-base">{formatPrice(product.price)}</span>
            )}
          </div>
          {product.oldPrice && (
            <span className="text-[11px] text-gray-400">{t("product.refPrice")}</span>
          )}
        </div>
      </Link>

      <button
        onClick={() => toggle(product.id)}
        aria-label={fav ? t("product.removeFav") : t("product.addFav")}
        aria-pressed={fav}
        className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-white"
      >
        <HeartIcon className="w-5 h-5" filled={fav} />
      </button>
    </article>
  );
}
