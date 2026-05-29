"use client";

import SponsoredHero from "@/components/brand/SponsoredHero";
import ProductCarousel from "@/components/product/ProductCarousel";
import EditorialCarousel from "@/components/editorial/EditorialCarousel";
import AppPromo from "@/components/AppPromo";
import { useStore } from "@/context/StoreContext";

/**
 * Renders the data-driven section list from the store. The App promo is
 * injected mid-page (after the 6th section) to match the original layout.
 */
export default function HomeSections() {
  const { sections } = useStore();
  const appPromoAfter = 6;

  return (
    <>
      {sections.map((section, i) => (
        <div key={section.id}>
          {section.type === "hero" && <SponsoredHero section={section} />}
          {section.type === "carousel" && <ProductCarousel section={section} />}
          {section.type === "editorial" && <EditorialCarousel section={section} />}
          {i === appPromoAfter && <AppPromo />}
        </div>
      ))}
    </>
  );
}
