import { Truck, ShieldCheck, Headphones, RotateCcw } from "lucide-react";

const features = [
    {
        icon: Truck,
        title: "Free Shipping",
        description: "Free shipping on all orders over $100",
        delay: "0"
    },
    {
        icon: ShieldCheck,
        title: "Secure Payment",
        description: "100% secure payment processing",
        delay: "100"
    },
    {
        icon: Headphones,
        title: "24/7 Support",
        description: "Dedicated support team anytime",
        delay: "200"
    },
    {
        icon: RotateCcw,
        title: "Easy Returns",
        description: "30-day money back guarantee",
        delay: "300"
    }
];

export default function TrustSection() {
    return (
        <section className="py-16 bg-white border-y border-gray-100">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div 
                                key={index} 
                                className="flex items-start space-x-4 p-6 rounded-2xl hover:bg-gray-50 transition-colors duration-300 group"
                            >
                                <div className="bg-orange-100 p-3 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                                    <Icon size={24} className="text-orange-600 group-hover:text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
