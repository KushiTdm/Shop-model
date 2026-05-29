"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const categories = [
  { id: "men", key: "category.men" },
  { id: "women", key: "category.women" },
  { id: "kids", key: "category.kids" },
] as const;

export default function CategorySwitch() {
  const { t } = useLanguage();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1" role="tablist" aria-label={t("category.aria")}>
      {categories.map((cat) => {
        const href = `/categorie/${cat.id}`;
        const active = pathname === href;
        return (
          <Link
            key={cat.id}
            href={href}
            role="tab"
            aria-selected={active}
            className={`px-3 py-1 text-sm transition-colors ${
              active
                ? "font-bold border-b-2 border-black text-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            {t(cat.key)}
          </Link>
        );
      })}
    </div>
  );
}
