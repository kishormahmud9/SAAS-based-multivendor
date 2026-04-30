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
import { marketingService } from "@/src/services/marketing.service";

export default async function Home() {
    let settings = [];
    try {
        const res = await marketingService.getUiSettings();
        settings = res.success ? res.data : [];
    } catch (error) {
        console.error("Failed to fetch UI settings:", error);
    }
    
    const lookbookData = settings?.find((s: any) => s.key === 'lookbook')?.value || null;
    const featureData = settings?.find((s: any) => s.key === 'feature_highlight')?.value || null;
    const ugcData = settings?.find((s: any) => s.key === 'ugc')?.value || null;

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
