import HeroCarousel from "@/components/home/HeroCarousel";
import CategorySection from "@/components/home/CategorySection";
import OfferSection from "@/components/home/OfferSection";
import ProductSection from "@/components/home/ProductSection";
import TrustSection from "@/components/home/TrustSection";
import TrendingSection from "@/components/home/TrendingSection";
import LookbookSection from "@/components/home/LookbookSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import UGCSection from "@/components/home/UGCSection";
import FeatureHighlight from "@/components/home/FeatureHighlight";

import { prisma } from "@/lib/prisma";

export default async function Home() {
    const settings = await prisma.uiSetting.findMany();
    const lookbookData = settings.find((s: any) => s.key === 'lookbook')?.value as any;
    const featureData = settings.find((s: any) => s.key === 'feature_highlight')?.value as any;
    const ugcData = settings.find((s: any) => s.key === 'ugc')?.value as any;

    return (
        <div className="flex flex-col">
            <HeroCarousel />
            <TrustSection />
            <CategorySection />
            <TrendingSection />
            <OfferSection />
            <LookbookSection data={lookbookData} />
            <ProductSection />
            <FeatureHighlight data={featureData} />
            <UGCSection data={ugcData} />
            <NewsletterSection />
        </div>
    );
}
