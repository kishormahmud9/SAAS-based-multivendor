import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LookbookSection({ data }: { data?: any }) {
    const sectionTitle = data?.title || "Curated Collections";
    const sectionDescription = data?.description || "Handpicked styles for every occasion.";
    const collections = data?.items || [
        {
            title: "Summer Collection",
            subtitle: "Linen & Cottons",
            image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80",
            link: "/shop?category=summer",
            className: "md:col-span-2 md:row-span-2"
        },
        {
            title: "Premium Suits",
            subtitle: "The Elite Class",
            image: "https://images.unsplash.com/photo-1594932224030-9404506f688e?w=800&q=80",
            link: "/shop?category=suits",
            className: "md:col-span-1 md:row-span-1"
        },
        {
            title: "Accessories",
            subtitle: "Details Matter",
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
            link: "/shop?category=accessories",
            className: "md:col-span-1 md:row-span-1"
        }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-2">{sectionTitle}</h2>
                        <p className="text-gray-600">{sectionDescription}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                    {collections.map((item: any, index: number) => (
                        <div 
                            key={index} 
                            className={`group relative overflow-hidden rounded-3xl shadow-lg ${item.className}`}
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <p className="text-orange-400 font-bold text-sm uppercase tracking-widest mb-2">{item.subtitle}</p>
                                <h3 className="text-3xl font-bold text-white mb-4">{item.title}</h3>
                                <Link 
                                    href={item.link}
                                    className="inline-flex items-center space-x-2 text-white font-semibold hover:text-orange-400 transition-colors group/link"
                                >
                                    <span>Explore Now</span>
                                    <ArrowRight size={20} className="transform group-hover/link:translate-x-2 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
