import Image from "next/image";
import { Instagram } from "lucide-react";
import { getImageUrl } from "@/src/lib/image-utils";

export default function UGCSection({ data }: { data?: any }) {
    const title = data?.title || "Shop the Look";
    const description = data?.description || "Mention us in your posts to get featured on our gallery.";
    const instagramHandle = data?.instagramHandle || "ReadyMart";
    const posts = data?.posts || [
        { id: 1, image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80" },
        { id: 2, image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80" },
        { id: 3, image: "https://images.unsplash.com/photo-1539109132304-39981f1917a2?w=500&q=80" },
        { id: 4, image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&q=80" },
        { id: 5, image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&q=80" },
        { id: 6, image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=500&q=80" },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center space-x-2 text-orange-500 font-bold uppercase tracking-widest text-sm mb-4">
                        <Instagram size={20} />
                        <span>Follow Us @{instagramHandle}</span>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-gray-500">{description}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {posts.map((post: any, index: number) => (
                        <div key={index} className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer">
                            <Image
                                src={getImageUrl(post.image)}
                                alt={`UGC Post ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Instagram size={32} className="text-white transform scale-50 group-hover:scale-100 transition-transform duration-300" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
