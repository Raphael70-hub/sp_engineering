import { useEffect, useState } from "react";
import PlainNavBar from "../components/PlainNavBar.jsx";
import Footer from "../sections/Footer.jsx";
import axios from "axios";
import { API_BASE_URL } from "../constants/index.js";

export default function ReviewsPage() {
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Pagination
    const [page, setPage] = useState(1);
    const [limit] = useState(6); // how many products per page
    const [totalPages, setTotalPages] = useState(1);

    // TODO: Replace with real logged-in user ID
    const userId = 2;

    // Fetch products from orders
    useEffect(() => {
        const fetchProductsFromOrders = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get(`${API_BASE_URL}/api/orders?page=${page}&limit=50`);
                // Extract unique products from orders
                const allItems = res.data.orders.flatMap((order) => order.items || []);
                const uniqueProducts = [];
                const productMap = new Map();

                allItems.forEach((item) => {
                    if (!productMap.has(item.product_id)) {
                        productMap.set(item.product_id, true);
                        uniqueProducts.push({
                            id: item.product_id,
                            name: item.product_name,
                            image: item.product_image || "/images/placeholder.png",
                        });
                    }
                });

                // pagination logic (local)
                const start = (page - 1) * limit;
                const end = start + limit;
                setProducts(uniqueProducts.slice(start, end));
                setTotalPages(Math.ceil(uniqueProducts.length / limit));
            } catch (err) {
                console.error(err);
                setError("Failed to load products from your orders.");
            } finally {
                setLoading(false);
            }
        };

        fetchProductsFromOrders();
    }, [page, limit]);

    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleSubmit = async () => {
        if (!rating || !review.trim()) {
            alert("Please provide a rating and a comment.");
            return;
        }

        try {
            await axios.post(`${API_BASE_URL}/api/products/${selectedProduct.id}/reviews`, {
                user_id: userId,
                rating,
                comment: review,
            });

            alert("Thank you for your review!");
            setShowModal(false);
            setRating(0);
            setReview("");
        } catch (err) {
            console.error(err);
            alert("Failed to submit review. Please try again.");
        }
    };

    return (
        <>
            <PlainNavBar />
            <div className="container mx-auto px-4 py-10">
                <h2 className="text-3xl font-bold mb-6">Ratings & Reviews</h2>

                {loading && (
                    <div className="flex justify-center items-center py-10">
                        <div className="w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
                {error && <p className="text-red-500">{error}</p>}

                {!loading && !error && (
                    <>
                        {products.length === 0 ? (
                            <p>You have no products to review yet.</p>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {products.map((product) => (
                                        <div
                                            key={product.id}
                                            className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center"
                                        >
                                            <img
                                                src={API_BASE_URL + product.image}
                                                alt={product.name}
                                                className="h-32 mb-4 rounded-lg"
                                            />
                                            <h3 className="font-semibold text-lg mb-2">
                                                {product.name}
                                            </h3>
                                            <button
                                                onClick={() => handleOpenModal(product)}
                                                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
                                            >
                                                Rate this Product
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination Controls */}
                                <div className="flex justify-center items-center mt-8 space-x-4">
                                    <button
                                        disabled={page === 1}
                                        onClick={() => setPage(page - 1)}
                                        className={`px-4 py-2 rounded-lg border ${
                                            page === 1
                                                ? "bg-gray-200 cursor-not-allowed"
                                                : "bg-white hover:bg-gray-100"
                                        }`}
                                    >
                                        Previous
                                    </button>
                                    <span>
                                        Page {page} of {totalPages}
                                    </span>
                                    <button
                                        disabled={page === totalPages}
                                        onClick={() => setPage(page + 1)}
                                        className={`px-4 py-2 rounded-lg border ${
                                            page === totalPages
                                                ? "bg-gray-200 cursor-not-allowed"
                                                : "bg-white hover:bg-gray-100"
                                        }`}
                                    >
                                        Next
                                    </button>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>

            {/* Review Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full">
                        <h3 className="text-xl font-bold mb-4">
                            Review {selectedProduct?.name}
                        </h3>

                        {/* Star Rating */}
                        <div className="flex space-x-2 mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className={`cursor-pointer text-2xl ${
                                        star <= rating
                                            ? "text-yellow-500"
                                            : "text-gray-300"
                                    }`}
                                >
                                    ★
                                </span>
                            ))}
                        </div>

                        {/* Review Input */}
                        <textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="Write your review..."
                            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            rows="4"
                        />

                        {/* Buttons */}
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 rounded-lg border border-gray-400 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}
