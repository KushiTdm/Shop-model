import PromoBanner from "@/components/promo/PromoBanner";
import CountdownBar from "@/components/promo/CountdownBar";
import HomeSections from "@/components/home/HomeSections";
import Newsletter from "@/components/Newsletter";
import SeoTextBlocks from "@/components/seo/SeoTextBlocks";
import StorePickupBanner from "@/components/footer/StorePickupBanner";

export default function Home() {
  return (
    <>
      <PromoBanner />
      <CountdownBar />

      <HomeSections />

      <StorePickupBanner />
      <SeoTextBlocks />
      <Newsletter />
    </>
  );
}
