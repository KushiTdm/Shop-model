"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useStore } from "@/context/StoreContext";

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

function getTimeLeft(target: number): TimeLeft {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const pad = (n: number) => n.toString().padStart(2, "0");

export default function CountdownBar() {
  const { t } = useLanguage();
  const { promo } = useStore();
  // Cible calculée côté client (durée configurable depuis /admin) pour éviter le mismatch SSR.
  const [target, setTarget] = useState<number | null>(null);
  const [time, setTime] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = Date.now() + promo.countdownHours * 60 * 60 * 1000;
    setTarget(target);
    setTime(getTimeLeft(target));
  }, [promo.countdownHours]);

  useEffect(() => {
    if (target === null) return;
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const blocks: [string, number][] = [
    [t("countdown.days"), time.days],
    [t("countdown.hours"), time.hours],
    [t("countdown.minutes"), time.minutes],
    [t("countdown.seconds"), time.seconds],
  ];

  return (
    <section
      className="w-full px-4 py-3 sm:px-8 flex items-center justify-between gap-4"
      style={{ backgroundColor: "#CBD994" }}
    >
      <span className="text-sm font-semibold text-black">{t("countdown.endsIn")}</span>
      <div className="flex items-center gap-3 sm:gap-4" suppressHydrationWarning>
        {blocks.map(([unit, value]) => (
          <div key={unit} className="flex items-baseline gap-1">
            <span className="text-base sm:text-lg font-bold tabular-nums">{pad(value)}</span>
            <span className="text-xs text-black/70">{unit}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
