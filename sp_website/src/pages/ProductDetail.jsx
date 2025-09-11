import { useEffect, useState } from "react";
import PlainNavBar from "../components/PlainNavBar.jsx";
import Footer from "../sections/Footer.jsx";
import { Link, useParams } from "react-router-dom";
import ProductReviews from "../components/ProductReviews.jsx";
import axios from "axios";
import { API_BASE_URL } from "../constants/index.js";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
    const { id } = useParams();
    const { addProductToCart, addRentalToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [related, setRelated] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [avgRating, setAvgRating] = useState(0);
    const [loadingProduct, setLoadingProduct] = useState(true);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [error, setError] = useState("");
    const [notification, setNotification] = useState("");
    const [isErrorNotification, setIsErrorNotification] = useState(false);

    // Rental dates
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoadingProduct(true);
                const response = await axios.get(`${API_BASE_URL}/api/products/${id}`);
                const data = response.data;

                setProduct(data);
                setSelectedImage(data.image_url);
                setAvgRating(data.average_rating || 0);

                // Related products
                const relatedResponse = await axios.get(`${API_BASE_URL}/api/products`, {
                    params: { category_id: data.category_id, limit: 4 }
                });
                setRelated(relatedResponse.data.products.filter(p => p.id !== data.id));
            } catch (err) {
                console.error(err);
                setError("Failed to load product. Please try again.");
            } finally {
                setLoadingProduct(false);
            }
        };

        const fetchReviews = async () => {
            try {
                setLoadingReviews(true);
                const response = await axios.get(`${API_BASE_URL}/api/products/${id}/reviews`, {
                    params: { page: 1, limit: 5 }
                });
                setReviews(response.data.reviews || []);
                setAvgRating(response.data.average_rating || 0);
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingReviews(false);
            }
        };

        fetchProduct();
        fetchReviews();
    }, [id]);

    const handleAddToCart = () => {
        const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0];

        if (product.product_type === "rental") {
            if (!startDate || !endDate) {
                setIsErrorNotification(true);
                setNotification("Please select rental start and end dates");
                setTimeout(() => setNotification(""), 3000);
                return;
            }

            if (startDate < tomorrow) {
                setIsErrorNotification(true);
                setNotification("Start date must be from tomorrow onward");
                setTimeout(() => setNotification(""), 3000);
                return;
            }

            if (endDate < startDate) {
                setIsErrorNotification(true);
                setNotification("End date must be after start date");
                setTimeout(() => setNotification(""), 3000);
                return;
            }

            addRentalToCart({
                id: product.id,
                name: product.name,
                image: API_BASE_URL + product.image_url,
                type: "rental",
                quantity: quantity,
                stock: product.stock,
                rental_price_per_day: product.rental_price_per_day,
                start_date: startDate,
                end_date: endDate,
                shipping_fee: parseFloat(product.shipping_fee),
            });


            setIsErrorNotification(false);
            setNotification("Added to cart!");
        }
        else{
            addProductToCart({
                id: product.id,
                name: product.name,
                image: API_BASE_URL + product.image_url,
                type: product.product_type,
                quantity,
                stock: product.stock,
                shipping_fee: parseFloat(product.shipping_fee),
                price: product.price,
                rental_price_per_day: product.rental_price_per_day,
                start_date: product.product_type === "rental" ? startDate : null,
                end_date: product.product_type === "rental" ? endDate : null,
            });

            setIsErrorNotification(false);
            setNotification("Added to cart!");
        }


        setTimeout(() => setNotification(""), 3000);
    };


    if (loadingProduct)
        return (
            <div className="flex justify-center items-center py-20">
                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );

    if (error) return <div className="p-10 text-center text-red-500">{error}</div>;
    if (!product) return <div className="p-10">Product not found</div>;

    const otherImages = product.other_images ? product.other_images : [];

    return (
        <>
            <PlainNavBar />

            {/* Notification */}
            {notification && (
                <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 ${isErrorNotification ?"bg-red-600" : "bg-green-600"} text-white px-6 py-3 rounded-lg shadow-lg z-50`}>
                    {notification}
                </div>
            )}

            <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
                {/* Left: Product Images */}
                <div>
                    <img
                        src={API_BASE_URL + selectedImage}
                        alt={product.name}
                        className="w-full h-[400px] object-cover rounded-xl shadow-md"
                    />
                    <div className="flex gap-3 mt-4">
                        {[product.image_url, ...otherImages].map((img, index) => (
                            <img
                                key={index}
                                src={API_BASE_URL + img}
                                alt={`Thumbnail ${index + 1}`}
                                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition ${
                                    selectedImage === img ? "border-orange-500" : "border-transparent"
                                }`}
                                onClick={() => setSelectedImage(img)}
                            />
                        ))}
                    </div>
                </div>

                {/* Right: Product Info */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
                    <p className="text-gray-600 mb-6">{product.description}</p>
                    {product.product_type === "rental" ? (
                        <p className="text-2xl font-semibold text-orange-600 mb-6">
                            ₦{product.rental_price_per_day}/day
                        </p>
                    ) : (
                        <p className="text-2xl font-semibold text-orange-600 mb-6">
                            ₦{product.price}
                        </p>
                    )}

                    {/* Rental Dates */}
                    {product.product_type === "rental" && (
                        <div className="mb-6">
                            <label className="block mb-2 font-medium">Select Rental Dates:</label>
                            <div className="flex gap-4">
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="border rounded-lg px-3 py-2"
                                    min={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0]} // tomorrow
                                />
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="border rounded-lg px-3 py-2"
                                    min={startDate || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0]} // same as or after start
                                />
                            </div>
                        </div>
                    )}

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
                            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                            disabled={quantity >= product.stock}
                            className={`px-3 py-1 border rounded-lg ${quantity >= product.stock ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            +
                        </button>
                        <p className="px-3 text-sm text-orange-500">Available Units: {product.stock}</p>
                    </div>

                    {product.stock > 0 ? (
                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-orange-600 text-white py-3 rounded-xl shadow-md hover:bg-orange-700 transition"
                        >
                            Add to Cart
                        </button>
                    )
                    :
                    (
                        <p className="text-sm text-red-600">Out of stock</p>
                    )}


                </div>
            </div>

            {/* Product Details */}
            {product.product_details?.length > 0 && (
                <div className="max-w-6xl mx-auto px-6 py-8">
                    <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                        {product.product_details.map((detail, idx) => (
                            <li key={idx}>{detail}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Delivery Information */}
            {product.delivery_info?.length > 0 && (
                <div className="max-w-6xl mx-auto px-6 py-8 bg-gray-50 rounded-xl shadow-sm">
                    <h2 className="text-2xl font-semibold mb-4">Delivery Information</h2>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                        {product.delivery_info.map((info, idx) => (
                            <li key={idx}>{info}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Reviews Section */}
            <ProductReviews
                product={product}
                reviews={reviews}
                avgRating={avgRating}
                loading={loadingReviews}
            />

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
                                    src={API_BASE_URL + item.image_url}
                                    alt={item.name}
                                    className="rounded-md mb-3"
                                />
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                <p className="text-gray-600">₦{item.price}</p>
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

            <Footer />
        </>
    );
}
