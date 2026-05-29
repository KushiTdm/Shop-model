"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const deslug = (s: string) => {
  const text = s.replace(/-/g, " ");
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export default function InfoPage() {
  const { sujet } = useParams<{ sujet: string }>();
  const { t } = useLanguage();
  const topic = deslug(decodeURIComponent(sujet));

  return (
    <div className="w-full px-4 sm:px-8 py-16 max-w-2xl">
      <p className="text-sm uppercase tracking-wide text-gray-500">{t("info.demoTitle")}</p>
      <h1 className="mt-2 text-2xl font-bold">{topic}</h1>
      <p className="mt-4 text-sm leading-relaxed text-gray-600">{t("info.demoBody")}</p>
      <Link
        href="/"
        className="inline-block mt-6 px-5 py-3 bg-black text-white text-sm font-semibold hover:bg-gray-800"
      >
        {t("info.back")}
      </Link>
    </div>
  );
}
