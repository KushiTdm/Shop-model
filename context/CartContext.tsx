"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/data/home";

export type CartItem = {
  product: Product;
  size: string | null;
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  /** Total number of units across all lines. */
  count: number;
  /** Sum of price × qty for every line. */
  subtotal: number;
  add: (product: Product, size?: string | null, qty?: number) => void;
  setQty: (id: string, size: string | null, qty: number) => void;
  remove: (id: string, size: string | null) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const STORAGE_KEY = "modshop_cart";

const sameLine = (i: CartItem, id: string, size: string | null) =>
  i.product.id === id && i.size === size;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {
      /* ignore corrupted storage */
    }
  }, []);

  const commit = useCallback((next: CartItem[]) => {
    setItems(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const add = useCallback(
    (product: Product, size: string | null = null, qty = 1) =>
      setItems((prev) => {
        const existing = prev.find((i) => sameLine(i, product.id, size));
        const next = existing
          ? prev.map((i) => (sameLine(i, product.id, size) ? { ...i, qty: i.qty + qty } : i))
          : [...prev, { product, size, qty }];
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      }),
    [],
  );

  const setQty = useCallback(
    (id: string, size: string | null, qty: number) =>
      setItems((prev) => {
        const next = prev
          .map((i) => (sameLine(i, id, size) ? { ...i, qty } : i))
          .filter((i) => i.qty > 0);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      }),
    [],
  );

  const remove = useCallback(
    (id: string, size: string | null) =>
      setItems((prev) => {
        const next = prev.filter((i) => !sameLine(i, id, size));
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      }),
    [],
  );

  const clear = useCallback(() => commit([]), [commit]);

  const count = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.qty, 0),
    [items],
  );

  return (
    <Ctx.Provider value={{ items, count, subtotal, add, setQty, remove, clear }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart(): CartCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
