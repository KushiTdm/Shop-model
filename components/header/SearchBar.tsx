"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BurgerIcon, SearchIcon } from "./icons";
import { useLanguage } from "@/context/LanguageContext";

type Props = {
  onBurgerClick: () => void;
};

export default function SearchBar({ onBurgerClick }: Props) {
  const { t } = useLanguage();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (q) router.push(`/recherche?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="flex items-center gap-3 px-4 py-2 border-t border-gray-200">
      <button
        onClick={onBurgerClick}
        aria-label={t("menu.open")}
        className="shrink-0 p-1 hover:opacity-70"
      >
        <BurgerIcon />
      </button>

      <form
        className="flex items-center flex-1 h-11 px-3 border border-gray-300 bg-transparent"
        onSubmit={submit}
        role="search"
      >
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("search.placeholder")}
          aria-label={t("search.placeholder")}
          className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-500"
        />
        <button type="submit" aria-label={t("search.run")} className="shrink-0 hover:opacity-70">
          <SearchIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
