"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const STORAGE_KEY = "modshop_newsletter";

const prefKeys = [
  "news.pref.articles",
  "news.pref.new",
  "news.pref.brands",
  "news.pref.reco",
  "news.pref.stories",
  "news.pref.promos",
  "news.pref.surveys",
];

type Subscriber = { email: string; mode: string; prefs: string[]; date: string };

function saveSubscriber(sub: Subscriber) {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const list: Subscriber[] = raw ? JSON.parse(raw) : [];
    // De-duplicate by email, keeping the latest submission.
    const next = [...list.filter((s) => s.email !== sub.email), sub];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore storage errors */
  }
}

export default function Newsletter() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="w-full px-4 py-10 sm:px-8 bg-surface-gray">
      <div className="max-w-2xl">
        <h2 className="text-xl sm:text-2xl font-bold">{t("news.title")}</h2>
        <p className="mt-1 text-sm text-gray-600">{t("news.subtitle")}</p>

        {submitted ? (
          <p className="mt-6 text-sm font-semibold text-[#A6BE47]">{t("news.success")}</p>
        ) : (
          <form
            className="mt-6 flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const data = new FormData(form);
              saveSubscriber({
                email: String(data.get("email") ?? ""),
                mode: String(data.get("mode") ?? ""),
                prefs: data.getAll("pref").map(String),
                date: new Date().toISOString(),
              });
              setSubmitted(true);
            }}
          >
            <input
              type="email"
              name="email"
              required
              placeholder={t("news.email")}
              aria-label={t("news.email")}
              className="h-12 px-3 border border-gray-300 bg-white outline-none text-sm focus:border-black"
            />

            {/* Choix mode */}
            <fieldset>
              <legend className="text-sm font-semibold mb-2">{t("news.interestedIn")}</legend>
              <div className="flex gap-6">
                {[
                  { value: "women", label: t("news.modeWomen") },
                  { value: "men", label: t("news.modeMen") },
                ].map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="mode"
                      value={opt.value}
                      className="accent-black"
                      defaultChecked={opt.value === "men"}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Préférences */}
            <fieldset>
              <legend className="text-sm font-semibold mb-2">{t("news.prefs")}</legend>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {prefKeys.map((key) => (
                  <label key={key} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" name="pref" value={key} className="accent-black" />
                    {t(key)}
                  </label>
                ))}
              </div>
            </fieldset>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-black text-white text-sm font-semibold hover:bg-gray-800"
            >
              {t("news.submit")}
            </button>

            <p className="text-xs text-gray-500">
              {t("news.legal1")}{" "}
              <a href="#" className="underline">{t("news.legal2")}</a>
              {t("news.legal3")}
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
