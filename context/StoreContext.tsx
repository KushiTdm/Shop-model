"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  type CarouselSection,
  type PromoConfig,
  type Product,
  type Section,
  defaultPromo,
  extraProducts,
  sections as seedSections,
} from "@/data/home";

export type ProductLocation = Product & { sectionId: string; sectionTitle: Product["name"] };

type StoreState = { promo: PromoConfig; sections: Section[] };

type StoreCtx = {
  promo: PromoConfig;
  sections: Section[];
  /** All products across every carousel, tagged with their section. */
  allProducts: ProductLocation[];
  updatePromo: (patch: Partial<PromoConfig>) => void;
  updateProduct: (id: string, patch: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  /** Add a product to a carousel section (defaults to the first one). */
  addProduct: (product: Product, sectionId?: string) => void;
  reset: () => void;
};

const Ctx = createContext<StoreCtx | null>(null);
const STORAGE_KEY = "modshop_store";

// Deep clone so edits never mutate the imported seed module.
const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v));
const seed = (): StoreState => ({ promo: clone(defaultPromo), sections: clone(seedSections) });

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StoreState>(seed);

  // Hydrate from localStorage after mount (initial render stays equal to the
  // server-rendered seed, avoiding hydration mismatches).
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setState(JSON.parse(saved));
    } catch {
      /* ignore corrupted storage */
    }
  }, []);

  const commit = useCallback((next: StoreState) => {
    setState(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const updatePromo = useCallback(
    (patch: Partial<PromoConfig>) =>
      setState((prev) => {
        const next = { ...prev, promo: { ...prev.promo, ...patch } };
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      }),
    [],
  );

  const updateProduct = useCallback(
    (id: string, patch: Partial<Product>) =>
      setState((prev) => {
        const next = {
          ...prev,
          sections: prev.sections.map((s) =>
            s.type === "carousel"
              ? { ...s, products: s.products.map((p) => (p.id === id ? { ...p, ...patch } : p)) }
              : s,
          ),
        };
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      }),
    [],
  );

  const deleteProduct = useCallback(
    (id: string) =>
      setState((prev) => {
        const next = {
          ...prev,
          sections: prev.sections.map((s) =>
            s.type === "carousel"
              ? { ...s, products: s.products.filter((p) => p.id !== id) }
              : s,
          ),
        };
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      }),
    [],
  );

  const addProduct = useCallback(
    (product: Product, sectionId?: string) =>
      setState((prev) => {
        const target =
          sectionId ?? prev.sections.find((s): s is CarouselSection => s.type === "carousel")?.id;
        const next = {
          ...prev,
          sections: prev.sections.map((s) =>
            s.type === "carousel" && s.id === target
              ? { ...s, products: [product, ...s.products] }
              : s,
          ),
        };
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      }),
    [],
  );

  const reset = useCallback(() => commit(seed()), [commit]);

  const allProducts = useMemo<ProductLocation[]>(
    () => [
      ...state.sections.flatMap((s) =>
        s.type === "carousel"
          ? s.products.map((p) => ({ ...p, sectionId: s.id, sectionTitle: s.title }))
          : [],
      ),
      ...extraProducts.map((p) => ({ ...p, sectionId: p.gender, sectionTitle: p.name })),
    ],
    [state.sections],
  );

  return (
    <Ctx.Provider
      value={{
        promo: state.promo,
        sections: state.sections,
        allProducts,
        updatePromo,
        updateProduct,
        deleteProduct,
        addProduct,
        reset,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useStore(): StoreCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used within a StoreProvider");
  return ctx;
}
