"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth, type DeliveryMode } from "@/context/AuthContext";
import { pickupStores } from "@/data/home";
import { StoreIcon } from "@/components/header/icons";

function LoginForm() {
  const { t } = useLanguage();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  return (
    <form
      className="mt-6 flex flex-col gap-4 max-w-sm"
      onSubmit={(e) => {
        e.preventDefault();
        if (!login(email, password)) setError(true);
      }}
    >
      <label className="flex flex-col gap-1 text-sm font-semibold">
        {t("account.email")}
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="exemple@modshop.fr"
          className="h-12 px-3 border border-gray-300 bg-white outline-none text-sm font-normal focus:border-black"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm font-semibold">
        {t("account.password")}
        <input
          type="password"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          className="h-12 px-3 border border-gray-300 bg-white outline-none text-sm font-normal focus:border-black"
        />
      </label>

      {error && <p className="text-sm font-semibold text-red-600">{t("account.wrong")}</p>}

      <button
        type="submit"
        className="w-full py-3 bg-black text-white text-sm font-semibold hover:bg-gray-800"
      >
        {t("account.login")}
      </button>
      <p className="text-xs text-gray-500">{t("account.hint")}</p>
    </form>
  );
}

function DeliveryPanel() {
  const { t } = useLanguage();
  const { user, updateDelivery } = useAuth();
  const [mode, setMode] = useState<DeliveryMode>(user!.delivery.mode);
  const [store, setStore] = useState(user!.delivery.store || pickupStores[0]);
  const [saved, setSaved] = useState(false);

  const options: { id: DeliveryMode; title: string; desc: string }[] = [
    { id: "home", title: t("account.optHome"), desc: t("account.optHomeDesc") },
    { id: "pickup", title: t("account.optPickup"), desc: t("account.optPickupDesc") },
  ];

  return (
    <div className="mt-8 max-w-xl">
      <h2 className="text-lg font-bold">{t("account.deliveryTitle")}</h2>
      <p className="text-sm text-gray-600">{t("account.deliverySubtitle")}</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => {
              setMode(opt.id);
              setSaved(false);
            }}
            className={`text-left p-4 border transition-colors ${
              mode === opt.id ? "border-black bg-surface-gray" : "border-gray-300 hover:border-gray-500"
            }`}
          >
            <span className="flex items-center gap-2 text-sm font-bold">
              {opt.id === "pickup" && <StoreIcon className="w-5 h-5" />}
              {opt.title}
            </span>
            <span className="block mt-1 text-xs text-gray-600">{opt.desc}</span>
          </button>
        ))}
      </div>

      {mode === "pickup" && (
        <label className="mt-4 flex flex-col gap-1 text-sm font-semibold">
          {t("account.storeLabel")}
          <select
            value={store}
            onChange={(e) => {
              setStore(e.target.value);
              setSaved(false);
            }}
            className="h-12 px-3 border border-gray-300 bg-white outline-none text-sm font-normal focus:border-black"
          >
            {pickupStores.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      )}

      <button
        type="button"
        onClick={() => {
          updateDelivery({ mode, store: mode === "pickup" ? store : "" });
          setSaved(true);
        }}
        className="mt-5 px-6 py-3 bg-black text-white text-sm font-semibold hover:bg-gray-800"
      >
        {t("account.save")}
      </button>
      {saved && <p className="mt-3 text-sm font-semibold text-[#A6BE47]">{t("account.saved")}</p>}
    </div>
  );
}

export default function AccountPage() {
  const { t } = useLanguage();
  const { user, logout, ready } = useAuth();

  return (
    <div className="w-full px-4 py-10 sm:px-8">
      {!ready ? null : !user ? (
        <>
          <h1 className="text-2xl font-bold">{t("account.title")}</h1>
          <p className="mt-1 text-sm text-gray-600">{t("account.subtitle")}</p>
          <LoginForm />
        </>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl font-bold">
              {t("account.welcome")}, {user.email}
            </h1>
            <button
              onClick={logout}
              className="px-4 py-2 border border-gray-300 text-sm font-semibold hover:bg-surface-gray"
            >
              {t("account.logout")}
            </button>
          </div>

          {user.isAdmin && (
            <Link
              href="/admin"
              className="inline-block mt-4 px-5 py-2.5 bg-brand-orange text-white text-sm font-semibold hover:opacity-90"
            >
              {t("account.adminCta")}
            </Link>
          )}

          <DeliveryPanel />
        </>
      )}
    </div>
  );
}
