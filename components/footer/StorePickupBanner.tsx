"use client";

import Link from "next/link";
import { StoreIcon, ArrowRight } from "../header/icons";
import { useLanguage } from "@/context/LanguageContext";

export default function StorePickupBanner() {
  const { t } = useLanguage();

  const steps = [
    { title: t("store.step1Title"), text: t("store.step1Text") },
    { title: t("store.step2Title"), text: t("store.step2Text") },
    { title: t("store.step3Title"), text: t("store.step3Text") },
  ];

  return (
    <section id="retrait" className="w-full px-4 py-10 sm:px-8 bg-surface-gray border-t border-gray-200">
      <div className="flex items-center gap-2 mb-1">
        <StoreIcon className="w-7 h-7" />
        <h2 className="text-xl sm:text-2xl font-bold">{t("store.title")}</h2>
      </div>
      <p className="text-sm text-gray-600 mb-6">{t("store.subtitle")}</p>

      <div className="grid gap-6 sm:grid-cols-3">
        {steps.map((s) => (
          <div key={s.title} className="bg-white p-5">
            <h3 className="text-base font-bold mb-1">{s.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{s.text}</p>
          </div>
        ))}
      </div>

      <Link
        href="/compte"
        className="inline-flex items-center gap-2 mt-6 text-sm font-semibold hover:gap-3 transition-all"
      >
        {t("store.cta")}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </section>
  );
}
