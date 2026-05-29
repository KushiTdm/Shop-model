"use client";

import Link from "next/link";
import { brandList, inspirationList } from "@/data/home";
import { useLanguage } from "@/context/LanguageContext";

export default function SeoTextBlocks() {
  const { t, tx } = useLanguage();

  return (
    <section className="w-full px-4 py-10 sm:px-8 border-t border-gray-200">
      <div className="max-w-4xl space-y-6">
        <div>
          <h2 className="text-lg font-bold mb-2">{t("seo.title")}</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{t("seo.body")}</p>
        </div>

        <div>
          <h3 className="text-base font-bold mb-2">{t("seo.brands")}</h3>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
            {brandList.map((b) => (
              <li key={b}>
                <Link
                  href={`/categorie/marque-${encodeURIComponent(b)}`}
                  className="hover:text-black hover:underline"
                >
                  {b}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-base font-bold mb-2">{t("seo.inspiration")}</h3>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
            {inspirationList.map((i) => {
              const label = tx(i);
              return (
                <li key={label}>
                  <Link
                    href={`/categorie/${encodeURIComponent(label)}`}
                    className="hover:text-black hover:underline"
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
