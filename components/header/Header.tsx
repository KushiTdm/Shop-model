"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import CategorySwitch from "./CategorySwitch";
import SearchBar from "./SearchBar";
import BurgerMenu from "./BurgerMenu";
import CartDrawer from "./CartDrawer";
import { GlobeIcon, UserIcon, HeartIcon, BagIcon } from "./icons";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";

function Badge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-brand-orange text-white text-[10px] font-bold leading-none">
      {count > 9 ? "9+" : count}
    </span>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { lang, toggle, t } = useLanguage();
  const { user } = useAuth();
  const { count: cartCount } = useCart();
  const { count: favCount } = useFavorites();

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        {/* Première ligne : logo + icônes */}
        <div className="flex items-center justify-between px-4 h-14">
          <Logo />

          <div className="hidden sm:block">
            <CategorySwitch />
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggle}
              aria-label={t("nav.language")}
              className="flex items-center gap-1 hover:opacity-70"
            >
              <span className="hidden md:inline text-sm font-semibold uppercase">{lang}</span>
              <GlobeIcon className="w-6 h-6" />
            </button>
            <Link
              href="/compte"
              aria-label={t("nav.account")}
              className={`hover:opacity-70 ${user ? "text-brand-orange" : ""}`}
            >
              <UserIcon className="w-6 h-6" />
            </Link>
            <Link
              href="/favoris"
              aria-label={t("nav.favorites")}
              className="relative hover:opacity-70"
            >
              <HeartIcon className="w-6 h-6" />
              <Badge count={favCount} />
            </Link>
            <button
              aria-label={t("nav.cart")}
              onClick={() => setCartOpen(true)}
              className="relative hover:opacity-70"
            >
              <BagIcon className="w-6 h-6" />
              <Badge count={cartCount} />
            </button>
          </div>
        </div>

        {/* Switch catégorie sur mobile */}
        <div className="sm:hidden flex justify-center pb-2">
          <CategorySwitch />
        </div>

        {/* Deuxième ligne : burger + recherche */}
        <SearchBar onBurgerClick={() => setMenuOpen(true)} />
      </header>

      <BurgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
