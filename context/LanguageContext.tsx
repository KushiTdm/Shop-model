"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  type Lang,
  type Localized,
  formatPrice as fmt,
  translate,
  tx as txRaw,
} from "@/lib/i18n";

type LanguageCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  /** Translate a UI dictionary key. */
  t: (key: string) => string;
  /** Resolve a Localized content value to the active language. */
  tx: (value: Localized) => string;
  /** Format a number as a currency string in the active locale. */
  price: (n: number) => string;
};

const Ctx = createContext<LanguageCtx | null>(null);
const STORAGE_KEY = "modshop_lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  // Restore the saved language on mount (client-only to avoid SSR mismatch).
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "fr" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggle = useCallback(() => setLangState((l) => (l === "fr" ? "en" : "fr")), []);
  const t = useCallback((key: string) => translate(lang, key), [lang]);
  const tx = useCallback((value: Localized) => txRaw(value, lang), [lang]);
  const price = useCallback((n: number) => fmt(n, lang), [lang]);

  return (
    <Ctx.Provider value={{ lang, setLang, toggle, t, tx, price }}>
      {children}
    </Ctx.Provider>
  );
}

export function useLanguage(): LanguageCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
