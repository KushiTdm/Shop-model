"use client";

import Link from "next/link";
import { ArrowRight } from "./header/icons";
import { useLanguage } from "@/context/LanguageContext";

export default function AppPromo() {
  const { t } = useLanguage();

  return (
    <section className="w-full px-4 py-8 sm:px-8 sm:py-10 bg-black text-white">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">{t("app.title")}</h2>
          <p className="mt-1 text-sm text-white/70">{t("app.text")}</p>
        </div>
        <Link
          href="/info/application"
          className="inline-flex items-center gap-2 px-5 py-3 bg-white text-black text-sm font-semibold hover:bg-gray-100 w-fit"
        >
          {t("app.download")}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
