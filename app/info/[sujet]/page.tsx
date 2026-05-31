"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { getInfoArticle } from "@/lib/infoContent";

const deslug = (s: string) => {
  const text = s.replace(/-/g, " ");
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export default function InfoPage() {
  const { sujet } = useParams<{ sujet: string }>();
  const { t, tx } = useLanguage();
  const topic = decodeURIComponent(sujet);
  const article = getInfoArticle(topic);

  // Repli : sujet non répertorié → page de démonstration générique (jamais de 404 vide).
  if (!article) {
    return (
      <div className="w-full px-4 sm:px-8 py-16 max-w-2xl">
        <p className="text-sm uppercase tracking-wide text-gray-500">{t("info.demoTitle")}</p>
        <h1 className="mt-2 text-2xl font-bold">{deslug(topic)}</h1>
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

  return (
    <div className="w-full px-4 sm:px-8 py-16 max-w-2xl">
      <p className="text-sm uppercase tracking-wide text-gray-500">{tx(article.eyebrow)}</p>
      <h1 className="mt-2 text-2xl font-bold">{tx(article.title)}</h1>

      <div className="mt-6 space-y-6">
        {article.blocks.map((block, i) => (
          <div key={i} className="space-y-2">
            {block.heading && (
              <h2 className="text-base font-semibold">{tx(block.heading)}</h2>
            )}
            {block.paragraphs?.map((p, j) => (
              <p key={j} className="text-sm leading-relaxed text-gray-600">
                {tx(p)}
              </p>
            ))}
            {block.bullets && (
              <ul className="list-disc pl-5 space-y-1 text-sm leading-relaxed text-gray-600">
                {block.bullets.map((b, j) => (
                  <li key={j}>{tx(b)}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {article.cta && (
          <Link
            href={article.cta.href}
            className="inline-block px-5 py-3 bg-black text-white text-sm font-semibold hover:bg-gray-800"
          >
            {tx(article.cta.label)}
          </Link>
        )}
        <Link
          href="/"
          className="inline-block px-5 py-3 border border-gray-300 text-sm font-semibold hover:border-black"
        >
          {t("info.back")}
        </Link>
      </div>
    </div>
  );
}
