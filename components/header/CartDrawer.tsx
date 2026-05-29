"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CloseIcon, BagIcon, StoreIcon } from "./icons";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({ open, onClose }: Props) {
  const { t, tx, price } = useLanguage();
  const { items, subtotal, remove } = useCart();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden
      />

      <aside
        className={`fixed top-0 right-0 z-50 h-full w-[90%] max-w-md bg-white shadow-xl transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label={t("cart.title")}
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-4 h-14 border-b border-gray-200 shrink-0">
          <span className="text-lg font-bold">{t("cart.title")}</span>
          <button onClick={onClose} aria-label={t("menu.close")} className="p-1 hover:opacity-70">
            <CloseIcon />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 px-6 text-center">
            <BagIcon className="w-12 h-12 text-gray-300" />
            <p className="mt-4 text-base font-semibold">{t("cart.empty")}</p>
            <p className="mt-1 text-sm text-gray-500">{t("cart.emptyHint")}</p>
            <button
              onClick={onClose}
              className="mt-6 w-full py-3 bg-black text-white text-sm font-semibold hover:bg-gray-800"
            >
              {t("cart.continue")}
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-3">
              <ul className="flex flex-col gap-4">
                {items.map((item) => (
                  <li key={`${item.product.id}-${item.size}`} className="flex gap-3">
                    <div className="relative w-16 h-24 shrink-0 bg-surface-gray">
                      <Image
                        src={item.product.image}
                        alt={tx(item.product.name)}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold leading-tight">{item.product.brand}</p>
                      <p className="text-sm text-gray-700 leading-tight line-clamp-1">
                        {tx(item.product.name)}
                      </p>
                      <p className="mt-0.5 text-xs text-gray-500">
                        {item.size && `${t("cart.size")} ${item.size} · `}
                        {t("cart.qty")} {item.qty}
                      </p>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-sm font-semibold">
                          {price(item.product.price * item.qty)}
                        </span>
                        <button
                          onClick={() => remove(item.product.id, item.size)}
                          className="text-xs text-gray-500 underline hover:text-black"
                        >
                          {t("cart.remove")}
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="shrink-0 border-t border-gray-200 px-4 py-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-600">{t("cart.subtotal")}</span>
                <span className="text-lg font-bold">{price(subtotal)}</span>
              </div>
              <Link
                href="/panier"
                onClick={onClose}
                className="block w-full py-3 bg-black text-white text-sm font-semibold text-center hover:bg-gray-800"
              >
                {t("cart.checkout")}
              </Link>
            </div>
          </>
        )}

        <div className="shrink-0 px-4 py-4 mx-4 mb-4 bg-surface-gray">
          <div className="flex items-center gap-3">
            <StoreIcon className="w-6 h-6 shrink-0" />
            <div>
              <p className="text-sm font-semibold">{t("cart.pickupTitle")}</p>
              <p className="text-xs text-gray-600">{t("cart.pickupHint")}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
