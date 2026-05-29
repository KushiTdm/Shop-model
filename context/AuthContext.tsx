"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type DeliveryMode = "home" | "pickup";

export type DeliveryPrefs = {
  mode: DeliveryMode;
  store: string;
};

export type User = {
  email: string;
  isAdmin: boolean;
  delivery: DeliveryPrefs;
};

type AuthCtx = {
  user: User | null;
  /** Mock login: any email with password "123456". admin@modshop.fr is an admin. */
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateDelivery: (prefs: DeliveryPrefs) => void;
  isAdmin: boolean;
  ready: boolean;
};

const Ctx = createContext<AuthCtx | null>(null);
const STORAGE_KEY = "modshop_user";

/** The single mock password accepted in this demo. */
export const MOCK_PASSWORD = "123456";
const ADMIN_EMAIL = "admin@modshop.fr";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setUser(JSON.parse(saved));
    } catch {
      /* ignore corrupted storage */
    }
    setReady(true);
  }, []);

  const persist = (u: User | null) => {
    setUser(u);
    if (u) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else window.localStorage.removeItem(STORAGE_KEY);
  };

  const login = useCallback((email: string, password: string) => {
    if (password !== MOCK_PASSWORD) return false;
    const normalized = email.trim().toLowerCase();
    persist({
      email: normalized,
      isAdmin: normalized === ADMIN_EMAIL,
      delivery: { mode: "pickup", store: "" },
    });
    return true;
  }, []);

  const logout = useCallback(() => persist(null), []);

  const updateDelivery = useCallback((prefs: DeliveryPrefs) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, delivery: prefs };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return (
    <Ctx.Provider
      value={{ user, login, logout, updateDelivery, isAdmin: !!user?.isAdmin, ready }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAuth(): AuthCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
