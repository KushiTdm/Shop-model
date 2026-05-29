"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useStore, type ProductLocation } from "@/context/StoreContext";
import type { Localized } from "@/lib/i18n";
import type { Product } from "@/data/home";

/** Coerce any Localized value into an editable { fr, en } pair. */
const pair = (v: Localized): { fr: string; en: string } =>
  typeof v === "string" ? { fr: v, en: v } : { fr: v.fr, en: v.en };

const inputCls =
  "px-2 py-1.5 border border-gray-300 bg-white outline-none text-sm focus:border-black w-full";

/* ------------------------------- Promo tab ------------------------------- */

function PromoEditor() {
  const { t } = useLanguage();
  const { promo, updatePromo } = useStore();
  const [title, setTitle] = useState(pair(promo.title));
  const [subtitle, setSubtitle] = useState(pair(promo.subtitle));
  const [cta, setCta] = useState(pair(promo.cta));
  const [hours, setHours] = useState(promo.countdownHours);
  const [saved, setSaved] = useState(false);

  const field = (
    label: string,
    value: { fr: string; en: string },
    set: (v: { fr: string; en: string }) => void,
  ) => (
    <div>
      <label className="block text-sm font-semibold mb-1">{label}</label>
      <div className="grid grid-cols-2 gap-2">
        <input
          className={inputCls}
          placeholder="FR"
          value={value.fr}
          onChange={(e) => {
            set({ ...value, fr: e.target.value });
            setSaved(false);
          }}
        />
        <input
          className={inputCls}
          placeholder="EN"
          value={value.en}
          onChange={(e) => {
            set({ ...value, en: e.target.value });
            setSaved(false);
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl space-y-4">
      <h2 className="text-lg font-bold">{t("admin.promoHeading")}</h2>
      <p className="text-xs text-gray-500">FR / EN — utilisez « | » dans le titre pour un retour à la ligne.</p>
      {field(t("admin.promoTitle"), title, setTitle)}
      {field(t("admin.promoSubtitle"), subtitle, setSubtitle)}
      {field(t("admin.promoCta"), cta, setCta)}
      <div>
        <label className="block text-sm font-semibold mb-1">{t("admin.countdownHours")}</label>
        <input
          type="number"
          min={1}
          className={`${inputCls} max-w-[160px]`}
          value={hours}
          onChange={(e) => {
            setHours(Number(e.target.value));
            setSaved(false);
          }}
        />
      </div>
      <button
        onClick={() => {
          updatePromo({ title, subtitle, cta, countdownHours: hours });
          setSaved(true);
        }}
        className="px-6 py-3 bg-black text-white text-sm font-semibold hover:bg-gray-800"
      >
        {t("admin.save")}
      </button>
      {saved && <p className="text-sm font-semibold text-[#A6BE47]">{t("admin.saved")}</p>}
    </div>
  );
}

/* ------------------------------ Articles tab ----------------------------- */

function ArticleRow({ product }: { product: ProductLocation }) {
  const { t } = useLanguage();
  const { updateProduct, deleteProduct } = useStore();
  const name = pair(product.name);
  const [draft, setDraft] = useState({
    brand: product.brand,
    nameFr: name.fr,
    nameEn: name.en,
    price: product.price,
    oldPrice: product.oldPrice ?? "",
    discount: product.discount ?? "",
  });

  const save = () =>
    updateProduct(product.id, {
      brand: draft.brand,
      name: { fr: draft.nameFr, en: draft.nameEn },
      price: Number(draft.price) || 0,
      oldPrice: draft.oldPrice === "" ? undefined : Number(draft.oldPrice),
      discount: draft.discount === "" ? undefined : Number(draft.discount),
    });

  return (
    <tr className="border-b border-gray-100 align-top">
      <td className="p-2">
        <input
          className={inputCls}
          value={draft.brand}
          onChange={(e) => setDraft({ ...draft, brand: e.target.value })}
        />
      </td>
      <td className="p-2">
        <input
          className={`${inputCls} mb-1`}
          placeholder="FR"
          value={draft.nameFr}
          onChange={(e) => setDraft({ ...draft, nameFr: e.target.value })}
        />
        <input
          className={inputCls}
          placeholder="EN"
          value={draft.nameEn}
          onChange={(e) => setDraft({ ...draft, nameEn: e.target.value })}
        />
      </td>
      <td className="p-2">
        <input
          type="number"
          step="0.01"
          className={`${inputCls} max-w-[90px]`}
          value={draft.price}
          onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })}
        />
      </td>
      <td className="p-2">
        <input
          type="number"
          step="0.01"
          className={`${inputCls} max-w-[90px]`}
          value={draft.oldPrice}
          onChange={(e) => setDraft({ ...draft, oldPrice: e.target.value })}
        />
      </td>
      <td className="p-2">
        <input
          type="number"
          className={`${inputCls} max-w-[70px]`}
          value={draft.discount}
          onChange={(e) => setDraft({ ...draft, discount: e.target.value })}
        />
      </td>
      <td className="p-2 whitespace-nowrap">
        <button
          onClick={save}
          className="px-3 py-1.5 bg-black text-white text-xs font-semibold hover:bg-gray-800"
        >
          {t("admin.save")}
        </button>
        <button
          onClick={() => deleteProduct(product.id)}
          className="ml-2 px-3 py-1.5 border border-gray-300 text-xs font-semibold hover:bg-surface-gray"
        >
          {t("admin.delete")}
        </button>
      </td>
    </tr>
  );
}

function ArticlesEditor() {
  const { t } = useLanguage();
  const { allProducts, addProduct } = useStore();

  const handleAdd = () => {
    const id = `new-${Date.now()}`;
    const product: Product = {
      id,
      brand: "ModShop",
      name: { fr: "Nouvel article", en: "New article" },
      price: 19.99,
      image: `https://picsum.photos/seed/${id}/600/870`,
      category: "clothing",
      gender: "men",
      tags: [],
      isNew: true,
    };
    addProduct(product);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-lg font-bold">{t("admin.articlesHeading")}</h2>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-brand-orange text-white text-sm font-semibold hover:opacity-90"
        >
          + {t("admin.addArticle")}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse min-w-[720px]">
          <thead>
            <tr className="text-left border-b-2 border-black">
              <th className="p-2 font-bold">{t("admin.colBrand")}</th>
              <th className="p-2 font-bold">{t("admin.colName")}</th>
              <th className="p-2 font-bold">{t("admin.colPrice")}</th>
              <th className="p-2 font-bold">{t("admin.colOldPrice")}</th>
              <th className="p-2 font-bold">{t("admin.colDiscount")}</th>
              <th className="p-2 font-bold">{t("admin.colActions")}</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((p) => (
              <ArticleRow key={p.id} product={p} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ------------------------------- Reset tab ------------------------------- */

function ResetPanel() {
  const { t } = useLanguage();
  const { reset } = useStore();
  const [done, setDone] = useState(false);

  return (
    <div className="max-w-xl space-y-3">
      <h2 className="text-lg font-bold">{t("admin.resetHeading")}</h2>
      <p className="text-sm text-gray-600">{t("admin.resetText")}</p>
      <button
        onClick={() => {
          reset();
          setDone(true);
        }}
        className="px-6 py-3 border border-red-500 text-red-600 text-sm font-semibold hover:bg-red-50"
      >
        {t("admin.resetBtn")}
      </button>
      {done && <p className="text-sm font-semibold text-[#A6BE47]">{t("admin.saved")}</p>}
    </div>
  );
}

/* ------------------------------- Page shell ------------------------------ */

type Tab = "promo" | "articles" | "reset";

export default function AdminPage() {
  const { t } = useLanguage();
  const { isAdmin, ready } = useAuth();
  const [tab, setTab] = useState<Tab>("promo");

  if (!ready) return null;

  if (!isAdmin) {
    return (
      <div className="w-full px-4 py-10 sm:px-8">
        <h1 className="text-2xl font-bold">{t("admin.title")}</h1>
        <p className="mt-2 text-sm text-gray-600">{t("admin.denied")}</p>
        <Link
          href="/compte"
          className="inline-block mt-4 px-5 py-3 bg-black text-white text-sm font-semibold hover:bg-gray-800"
        >
          {t("admin.goLogin")}
        </Link>
      </div>
    );
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "promo", label: t("admin.tabPromo") },
    { id: "articles", label: t("admin.tabArticles") },
    { id: "reset", label: t("admin.tabReset") },
  ];

  return (
    <div className="w-full px-4 py-10 sm:px-8">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">{t("admin.title")}</h1>
          <p className="mt-1 text-sm text-gray-600">{t("admin.subtitle")}</p>
        </div>
        <Link href="/" className="text-sm font-semibold hover:underline">
          ← {t("admin.backHome")}
        </Link>
      </div>

      <div className="mt-6 flex gap-1 border-b border-gray-200">
        {tabs.map((tb) => (
          <button
            key={tb.id}
            onClick={() => setTab(tb.id)}
            className={`px-4 py-2 text-sm transition-colors ${
              tab === tb.id
                ? "font-bold border-b-2 border-black text-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            {tb.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "promo" && <PromoEditor />}
        {tab === "articles" && <ArticlesEditor />}
        {tab === "reset" && <ResetPanel />}
      </div>
    </div>
  );
}
