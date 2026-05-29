"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CloseIcon, ChevronRight, StoreIcon, UserIcon } from "./icons";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

const menuKeys = [
  "menu.new",
  "menu.clothing",
  "menu.shoes",
  "menu.accessories",
  "menu.streetwear",
  "menu.luxury",
  "menu.sport",
  "menu.care",
  "menu.secondhand",
  "menu.bargains",
];

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function BurgerMenu({ open, onClose }: Props) {
  const { t } = useLanguage();
  const { isAdmin } = useAuth();

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
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden
      />

      {/* Panneau latéral */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-[85%] max-w-sm bg-white shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-label={t("menu.title")}
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-4 h-14 border-b border-gray-200">
          <span className="text-lg font-bold">{t("menu.title")}</span>
          <button onClick={onClose} aria-label={t("menu.close")} className="p-1 hover:opacity-70">
            <CloseIcon />
          </button>
        </div>

        <nav className="overflow-y-auto h-[calc(100%-3.5rem)]">
          <ul>
            {menuKeys.map((key) => (
              <li key={key}>
                <Link
                  href={`/categorie/${key.split(".")[1]}`}
                  onClick={onClose}
                  className="flex items-center justify-between px-4 py-4 text-base border-b border-gray-100 hover:bg-surface-gray"
                >
                  <span>{t(key)}</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/compte"
                onClick={onClose}
                className="flex items-center justify-between px-4 py-4 text-base border-b border-gray-100 hover:bg-surface-gray"
              >
                <span className="flex items-center gap-2">
                  <UserIcon className="w-5 h-5" />
                  {t("menu.accountLink")}
                </span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
            </li>
            {isAdmin && (
              <li>
                <Link
                  href="/admin"
                  onClick={onClose}
                  className="flex items-center justify-between px-4 py-4 text-base border-b border-gray-100 hover:bg-surface-gray"
                >
                  <span>{t("menu.adminLink")}</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>
              </li>
            )}
          </ul>

          <div className="px-4 py-5 mt-2 bg-surface-gray">
            <a href="/#retrait" onClick={onClose} className="flex items-center gap-3 text-sm font-semibold">
              <StoreIcon className="w-6 h-6" />
              {t("pickup.title")}
            </a>
            <p className="mt-2 text-xs text-gray-600">{t("pickup.menuText")}</p>
          </div>
        </nav>
      </aside>
    </>
  );
}
