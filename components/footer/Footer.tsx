"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "../header/icons";
import { useLanguage } from "@/context/LanguageContext";
import type { Localized } from "@/lib/i18n";

type Column = { titleKey: string; links: Localized[] };

const columns: Column[] = [
  {
    titleKey: "footer.help",
    links: [
      { fr: "Nous contacter", en: "Contact us" },
      { fr: "Suivi de commande", en: "Order tracking" },
      { fr: "Livraison & retours", en: "Delivery & returns" },
      "FAQ",
    ],
  },
  {
    titleKey: "footer.pickup",
    links: [
      { fr: "Comment ça marche", en: "How it works" },
      { fr: "Trouver une boutique", en: "Find a store" },
      { fr: "Horaires d'ouverture", en: "Opening hours" },
      "Click & Collect",
    ],
  },
  {
    titleKey: "footer.brand",
    links: [
      { fr: "À propos", en: "About" },
      { fr: "Carrières", en: "Careers" },
      { fr: "Presse", en: "Press" },
      { fr: "Développement durable", en: "Sustainability" },
    ],
  },
  {
    titleKey: "footer.delivery",
    links: [
      "Standard",
      "Express",
      { fr: "Point relais", en: "Pickup point" },
      { fr: "Retrait magasin", en: "In-store pickup" },
    ],
  },
  {
    titleKey: "footer.payment",
    links: [
      { fr: "Carte bancaire", en: "Credit card" },
      "PayPal",
      { fr: "Paiement en 3x", en: "Pay in 3" },
      { fr: "Chèques cadeaux", en: "Gift cards" },
    ],
  },
  {
    titleKey: "footer.services",
    links: [
      { fr: "Programme fidélité", en: "Loyalty program" },
      { fr: "Application mobile", en: "Mobile app" },
      { fr: "Guide des tailles", en: "Size guide" },
      { fr: "Seconde main", en: "Pre-owned" },
    ],
  },
];

const legalLinks: Localized[] = [
  { fr: "Mentions légales", en: "Legal notice" },
  { fr: "Protection des données", en: "Data protection" },
  { fr: "CGV", en: "Terms" },
  { fr: "Accessibilité", en: "Accessibility" },
  "Cookies",
];
const socials = ["TikTok", "Facebook", "Pinterest", "Instagram"];

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 md:border-none">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full py-4 md:py-0 md:mb-3 md:cursor-default"
        aria-expanded={open}
      >
        <span className="text-sm font-bold">{title}</span>
        <ChevronDown
          className={`w-5 h-5 md:hidden transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <ul className={`${open ? "block" : "hidden"} md:block pb-4 md:pb-0 space-y-2`}>
        {links.map((link) => (
          <li key={link}>
            <Link
              href={`/info/${encodeURIComponent(link)}`}
              className="text-sm text-gray-600 hover:text-black hover:underline"
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const { t, tx } = useLanguage();

  return (
    <footer className="w-full border-t border-gray-200">
      {/* Colonnes / accordéons */}
      <div className="px-4 py-6 sm:px-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-x-8">
        {columns.map((col) => (
          <FooterColumn
            key={col.titleKey}
            title={t(col.titleKey)}
            links={col.links.map((l) => tx(l))}
          />
        ))}
      </div>

      {/* App + réseaux sociaux */}
      <div className="px-4 py-6 sm:px-8 border-t border-gray-200 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div
            className="w-20 h-20 bg-white border border-gray-300 grid place-items-center text-[8px] text-gray-400"
            aria-label="QR code de téléchargement de l'application"
          >
            QR CODE
          </div>
          <div>
            <p className="text-sm font-semibold">{t("footer.appTitle")}</p>
            <div className="flex gap-2 mt-2">
              <Link href="/info/application" className="px-3 py-1.5 bg-black text-white text-xs">App Store</Link>
              <Link href="/info/application" className="px-3 py-1.5 bg-black text-white text-xs">Google Play</Link>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {socials.map((s) => (
            <Link key={s} href={`/info/${encodeURIComponent(s)}`} className="text-sm text-gray-600 hover:text-black">
              {s}
            </Link>
          ))}
        </div>
      </div>

      {/* Liens légaux */}
      <div className="px-4 py-6 sm:px-8 border-t border-gray-200">
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {legalLinks.map((link) => {
            const label = tx(link);
            return (
              <li key={label}>
                <Link
                  href={`/info/${encodeURIComponent(label)}`}
                  className="text-xs text-gray-500 hover:text-black hover:underline"
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-xs text-gray-400">
          © {new Date().getFullYear()} ModShop — {t("footer.legalNote")}
        </p>
      </div>
    </footer>
  );
}
