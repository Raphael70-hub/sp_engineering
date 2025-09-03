const FeaturedProducts = () => {
    const products = [
        {
            name: "Premium Cement",
            desc: "Durable and high-strength cement for all your projects.",
            price: "$12 / bag",
            img: "/images/cement.jpg",
        },
        {
            name: "Steel Rods",
            desc: "High-grade steel rods for structural reinforcement.",
            price: "$500 / ton",
            img: "/images/steel.jpg",
        },
        {
            name: "Concrete Mixer",
            desc: "Heavy-duty mixer available for purchase or rent.",
            price: "$1,200",
            img: "/images/mixer.jpg",
        },
        {
            name: "Safety Helmets",
            desc: "Protective gear for construction workers.",
            price: "$25 each",
            img: "/images/helmet.jpg",
        },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-6 text-center">
                {/* Heading */}
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Featured Products
                </h2>
                <p className="text-lg text-gray-600 mb-12">
                    Hand-picked products trusted by professionals
                </p>

                {/* Product Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition transform hover:-translate-y-2"
                        >
                            {/* Product Image */}
                            <img
                                src={product.img}
                                alt={product.name}
                                className="w-full h-48 object-cover"
                            />

                            {/* Content */}
                            <div className="p-5 text-left">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    {product.name}
                                </h3>
                                <p className="text-gray-600 text-sm mb-3">{product.desc}</p>
                                <p className="text-orange-600 font-bold">{product.price}</p>

                                {/* Button */}
                                <button className="btn">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
