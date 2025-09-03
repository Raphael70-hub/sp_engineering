import {useEffect, useState} from "react";
import PlainNavBar from "../components/PlainNavBar.jsx";
import Footer from "../sections/Footer.jsx";
import {Link, useParams} from "react-router-dom";
import ProductReviews from "../components/ProductReviews.jsx";

export default function ProductDetail() {

    const products = [
        {
            id: 1,
            name: "Steel Pipe",
            category: "Construction",
            description: "High-quality steel pipe suitable for construction.",
            price: 50,
            images: [
                "/images/steel.jpg",
                "/images/mixer.jpg",
            ],
            details: [
                "Material: Steel",
                "Length: 6m",
                "Diameter: 10cm",
                "Standard: ISO certified",
            ],
            delivery: [
                "Free delivery within 5-7 business days",
                "Cash on delivery available",
                "Returns accepted within 14 days",
            ],
            reviews: [
                { user: "John D.", rating: 5, comment: "Excellent quality product!" },
                { user: "Sarah K.", rating: 4, comment: "Very durable, worth the price." },
                { user: "Mike T.", rating: 3, comment: "Good, but shipping was delayed." },
            ],
        },
        {
            id: 2,
            name: "Aluminum Sheet",
            category: "Construction",
            description: "Durable aluminum sheet for roofing.",
            price: 80,
            images: [
                "/images/helmet.jpg",
                "/images/cement.jpg",
            ],
            details: [
                "Material: Steel",
                "Length: 6m",
                "Diameter: 10cm",
                "Standard: ISO certified",
            ],
            delivery: [
                "Free delivery within 5-7 business days",
                "Cash on delivery available",
                "Returns accepted within 14 days",
            ],
            reviews: [
                { user: "John D.", rating: 5, comment: "Excellent quality product!" },
                { user: "Sarah K.", rating: 4, comment: "Very durable, worth the price." },
                { user: "Mike T.", rating: 3, comment: "Good, but shipping was delayed." },
                { user: "Mike T.", rating: 3, comment: "Good, but shipping was delayed." },
                { user: "Mike T.", rating: 3, comment: "Good, but shipping was delayed." },
                { user: "Mike T.", rating: 3, comment: "Good, but shipping was delayed." },
            ],
        },
        {
            id: 3,
            name: "PVC Pipe",
            category: "Plumbing",
            description: "Lightweight PVC pipe for water systems.",
            price: 20,
            images: [
                "/images/steel.jpg",
                "/images/mixer.jpg",
            ],
        },
        {
            id: 4,
            name: "Iron Rod",
            category: "Construction",
            description: "Strong iron rod for building structures.",
            price: 60,
            images: [
                "/images/steel.jpg",
                "/images/mixer.jpg",
            ],
            details: [
                "Material: Steel",
                "Length: 6m",
                "Diameter: 10cm",
                "Standard: ISO certified",
            ],
            delivery: [
                "Free delivery within 5-7 business days",
                "Cash on delivery available",
                "Returns accepted within 14 days",
            ],
            reviews: [
                { user: "John D.", rating: 5, comment: "Excellent quality product!" },
                { user: "Sarah K.", rating: 4, comment: "Very durable, worth the price." },
                { user: "Mike T.", rating: 3, comment: "Good, but shipping was delayed." },
            ],
        },
    ];


    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [related, setRelated] = useState([]);
    const [avgRating, setAvgRating] = useState(0);


    useEffect(() => {
        const selected = products.find((p) => p.id === parseInt(id));
        setProduct(selected);
        setSelectedImage(selected.images[0]);

        if (selected) {
            // Get related products (same category, exclude current product)
            const relatedItems = products.filter(
                (p) => p.category === selected.category && p.id !== selected.id
            ).slice(0, 4);;
            setRelated(relatedItems);

            if (selected.reviews && selected.reviews.length > 0) {
                const avg =
                    selected.reviews.reduce((sum, r) => sum + r.rating, 0) /
                    selected.reviews.length;
                setAvgRating(avg.toFixed(1));
            }
        }
    }, [id]);

    if (!product) return <div className="p-10">Product not found</div>;

    return (
        <>
            <PlainNavBar/>

            <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
                {/* Left: Product Images */}
                <div>
                    <img
                        src={selectedImage}
                        alt={product.name}
                        className="w-full h-[400px] object-cover rounded-xl shadow-md"
                    />
                    <div className="flex gap-3 mt-4">
                        {product.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition 
                ${
                                    selectedImage === img
                                        ? "border-orange-500"
                                        : "border-transparent"
                                }`}
                                onClick={() => setSelectedImage(img)}
                            />
                        ))}
                    </div>
                </div>

                {/* Right: Product Info */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        {product.name}
                    </h1>
                    <p className="text-gray-600 mb-6">{product.description}</p>
                    <p className="text-2xl font-semibold text-orange-600 mb-6">
                        ${product.price}
                    </p>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3 mb-6">
                        <span className="font-medium">Quantity:</span>
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="px-3 py-1 border rounded-lg"
                        >
                            -
                        </button>
                        <span className="px-4">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="px-3 py-1 border rounded-lg"
                        >
                            +
                        </button>
                    </div>

                    {/* Add to CartPage */}
                    <button className="w-full bg-orange-600 text-white py-3 rounded-xl shadow-md hover:bg-orange-700 transition">
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Product Details */}
            <div className="max-w-6xl mx-auto px-6 py-8">
                <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    {product.details?.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                    ))}
                </ul>
            </div>

            {/* Delivery Information */}
            <div className="max-w-6xl mx-auto px-6 py-8 bg-gray-50 rounded-xl shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">Delivery Information</h2>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    {product.delivery?.map((info, idx) => (
                        <li key={idx}>{info}</li>
                    ))}
                </ul>
            </div>

            {/* Reviews Section */}
            <ProductReviews product={product} avgRating={avgRating} />

            {/* Related Products */}
            {related.length > 0 && (
                <div className="px-12 py-6">
                    <h2 className="text-2xl font-semibold mb-6">Related Products</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {related.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition"
                            >
                                <img
                                    src={item.images[0]}
                                    alt={item.name}
                                    className="rounded-md mb-3"
                                />
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                <p className="text-gray-600">${item.price}</p>
                                <Link
                                    to={`/product/${item.id}`}
                                    className="inline-block mt-3 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
                                >
                                    View Details
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <Footer/>
        </>

    );
}
