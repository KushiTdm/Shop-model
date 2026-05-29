"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useAuth, type DeliveryMode } from "@/context/AuthContext";
import { pickupStores } from "@/data/home";
import { ChevronLeft, StoreIcon, BagIcon } from "@/components/header/icons";

const HOME_FEE = 9.9;
const FREE_OVER = 50;

type Confirmation = { mode: DeliveryMode; store: string; total: number };

function LoginBlock() {
  const { t } = useLanguage();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (!login(email, password)) setError(true);
      }}
    >
      <h2 className="text-lg font-bold">{t("checkout.loginTitle")}</h2>
      <p className="text-sm text-gray-600">{t("checkout.loginHint")}</p>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("account.email")}
        className="h-12 px-3 border border-gray-300 bg-white outline-none text-sm focus:border-black"
      />
      <input
        type="password"
        required
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setError(false);
        }}
        placeholder={t("account.password")}
        className="h-12 px-3 border border-gray-300 bg-white outline-none text-sm focus:border-black"
      />
      {error && <p className="text-sm font-semibold text-red-600">{t("account.wrong")}</p>}
      <button
        type="submit"
        className="w-full py-3 bg-black text-white text-sm font-semibold hover:bg-gray-800"
      >
        {t("checkout.loginCta")}
      </button>
    </form>
  );
}

export default function CartPage() {
  const { t, tx, price } = useLanguage();
  const { items, subtotal, setQty, remove, clear } = useCart();
  const { user } = useAuth();

  const [mode, setMode] = useState<DeliveryMode>("pickup");
  const [store, setStore] = useState(pickupStores[0]);
  const [address, setAddress] = useState({ name: "", street: "", zip: "", city: "" });
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  const shipping = mode === "pickup" || subtotal >= FREE_OVER ? 0 : HOME_FEE;
  const total = subtotal + shipping;

  const addressValid =
    mode === "pickup" ||
    (address.name.trim() && address.street.trim() && address.zip.trim() && address.city.trim());

  const confirm = () => {
    setConfirmation({ mode, store, total });
    clear();
  };

  // --- Confirmation screen ---
  if (confirmation) {
    return (
      <div className="w-full px-4 sm:px-8 py-16 max-w-xl">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#A6BE47] text-white text-xl font-bold">
            ✓
          </span>
          <h1 className="text-2xl font-bold">{t("checkout.confirmedTitle")}</h1>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          {confirmation.mode === "pickup"
            ? t("checkout.confirmedPickup")
            : t("checkout.confirmedHome")}
        </p>
        {confirmation.mode === "pickup" && (
          <p className="mt-1 flex items-center gap-2 text-sm font-semibold">
            <StoreIcon className="w-5 h-5" />
            {confirmation.store}
          </p>
        )}
        <p className="mt-4 text-lg font-bold">
          {t("checkout.total")} : {price(confirmation.total)}
        </p>
        <Link
          href="/"
          className="inline-block mt-6 px-5 py-3 bg-black text-white text-sm font-semibold hover:bg-gray-800"
        >
          {t("checkout.continueShopping")}
        </Link>
      </div>
    );
  }

  // --- Empty cart ---
  if (items.length === 0) {
    return (
      <div className="w-full px-4 sm:px-8 py-20 flex flex-col items-center text-center">
        <BagIcon className="w-12 h-12 text-gray-300" />
        <p className="mt-4 text-base font-semibold">{t("cart.empty")}</p>
        <p className="mt-1 text-sm text-gray-500">{t("cart.emptyHint")}</p>
        <Link
          href="/"
          className="mt-6 px-5 py-3 bg-black text-white text-sm font-semibold hover:bg-gray-800"
        >
          {t("cart.continue")}
        </Link>
      </div>
    );
  }

  // --- Cart + checkout ---
  return (
    <div className="w-full px-4 sm:px-8 py-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1 mb-4 text-sm text-gray-600 hover:text-black"
      >
        <ChevronLeft className="w-4 h-4" />
        {t("product.back")}
      </Link>

      <h1 className="text-2xl font-bold mb-6">{t("checkout.title")}</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Items */}
        <div className="lg:col-span-2">
          <ul className="flex flex-col divide-y divide-gray-200 border-y border-gray-200">
            {items.map((item) => (
              <li key={`${item.product.id}-${item.size}`} className="flex gap-4 py-4">
                <div className="relative w-20 h-28 shrink-0 bg-surface-gray">
                  <Image
                    src={item.product.image}
                    alt={tx(item.product.name)}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold">{item.product.brand}</p>
                  <p className="text-sm text-gray-700 line-clamp-1">{tx(item.product.name)}</p>
                  {item.size && (
                    <p className="mt-0.5 text-xs text-gray-500">
                      {t("cart.size")} {item.size}
                    </p>
                  )}
                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex items-center border border-gray-300">
                      <button
                        onClick={() => setQty(item.product.id, item.size, item.qty - 1)}
                        aria-label="-"
                        className="px-3 py-1 hover:bg-surface-gray"
                      >
                        −
                      </button>
                      <span className="px-3 text-sm">{item.qty}</span>
                      <button
                        onClick={() => setQty(item.product.id, item.size, item.qty + 1)}
                        aria-label="+"
                        className="px-3 py-1 hover:bg-surface-gray"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => remove(item.product.id, item.size)}
                      className="text-xs text-gray-500 underline hover:text-black"
                    >
                      {t("cart.remove")}
                    </button>
                  </div>
                </div>
                <span className="text-sm font-semibold whitespace-nowrap">
                  {price(item.product.price * item.qty)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Checkout column */}
        <div className="flex flex-col gap-6">
          {!user ? (
            <div className="p-4 border border-gray-200">
              <LoginBlock />
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-600">
                {t("checkout.loggedAs")} <span className="font-semibold">{user.email}</span>
              </p>

              {/* Delivery mode */}
              <div>
                <h2 className="text-lg font-bold mb-3">{t("checkout.deliveryTitle")}</h2>
                <div className="grid gap-3">
                  {(
                    [
                      { id: "pickup", title: t("checkout.pickup"), desc: t("checkout.pickupDesc") },
                      { id: "home", title: t("checkout.home"), desc: t("checkout.homeDesc") },
                    ] as { id: DeliveryMode; title: string; desc: string }[]
                  ).map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setMode(opt.id)}
                      className={`text-left p-3 border transition-colors ${
                        mode === opt.id
                          ? "border-black bg-surface-gray"
                          : "border-gray-300 hover:border-gray-500"
                      }`}
                    >
                      <span className="flex items-center gap-2 text-sm font-bold">
                        {opt.id === "pickup" && <StoreIcon className="w-5 h-5" />}
                        {opt.title}
                      </span>
                      <span className="block mt-0.5 text-xs text-gray-600">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {mode === "pickup" ? (
                <label className="flex flex-col gap-1 text-sm font-semibold">
                  {t("checkout.storeLabel")}
                  <select
                    value={store}
                    onChange={(e) => setStore(e.target.value)}
                    className="h-12 px-3 border border-gray-300 bg-white outline-none text-sm font-normal focus:border-black"
                  >
                    {pickupStores.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
              ) : (
                <div className="flex flex-col gap-3">
                  <h3 className="text-sm font-bold">{t("checkout.addressTitle")}</h3>
                  <input
                    value={address.name}
                    onChange={(e) => setAddress({ ...address, name: e.target.value })}
                    placeholder={t("checkout.fullName")}
                    className="h-11 px-3 border border-gray-300 bg-white outline-none text-sm focus:border-black"
                  />
                  <input
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    placeholder={t("checkout.address")}
                    className="h-11 px-3 border border-gray-300 bg-white outline-none text-sm focus:border-black"
                  />
                  <div className="flex gap-3">
                    <input
                      value={address.zip}
                      onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                      placeholder={t("checkout.zip")}
                      className="h-11 px-3 w-1/3 border border-gray-300 bg-white outline-none text-sm focus:border-black"
                    />
                    <input
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      placeholder={t("checkout.city")}
                      className="h-11 px-3 flex-1 border border-gray-300 bg-white outline-none text-sm focus:border-black"
                    />
                  </div>
                  <p className="text-xs text-gray-500">{t("checkout.freeOver")}</p>
                </div>
              )}

              {/* Summary */}
              <div className="p-4 bg-surface-gray">
                <h3 className="text-sm font-bold mb-3">{t("checkout.summary")}</h3>
                <div className="flex justify-between text-sm">
                  <span>{t("cart.subtotal")}</span>
                  <span>{price(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span>{mode === "pickup" ? t("checkout.pickup") : t("checkout.shipping")}</span>
                  <span>
                    {mode === "pickup"
                      ? t("checkout.pickupFree")
                      : shipping === 0
                        ? t("checkout.free")
                        : price(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold mt-3 pt-3 border-t border-gray-300">
                  <span>{t("checkout.total")}</span>
                  <span>{price(total)}</span>
                </div>
                <button
                  type="button"
                  disabled={!addressValid}
                  onClick={confirm}
                  className="mt-4 w-full py-3 bg-black text-white text-sm font-semibold hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {t("checkout.confirm")}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
