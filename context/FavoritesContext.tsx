"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type FavoritesCtx = {
  ids: string[];
  count: number;
  has: (id: string) => boolean;
  toggle: (id: string) => void;
  remove: (id: string) => void;
};

const Ctx = createContext<FavoritesCtx | null>(null);
const STORAGE_KEY = "modshop_favorites";

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setIds(JSON.parse(saved));
    } catch {
      /* ignore corrupted storage */
    }
  }, []);

  const persist = useCallback(
    (next: string[]) => {
      setIds(next);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    },
    [],
  );

  const toggle = useCallback(
    (id: string) =>
      setIds((prev) => {
        const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      }),
    [],
  );

  const remove = useCallback(
    (id: string) =>
      setIds((prev) => {
        const next = prev.filter((x) => x !== id);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      }),
    [],
  );

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  return (
    <Ctx.Provider value={{ ids, count: ids.length, has, toggle, remove }}>
      {children}
    </Ctx.Provider>
  );
}

export function useFavorites(): FavoritesCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useFavorites must be used within a FavoritesProvider");
  return ctx;
}
