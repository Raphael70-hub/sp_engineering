import { useState } from "react";
import PlainNavBar from "../components/PlainNavBar.jsx";
import Footer from "../sections/Footer.jsx";

export default function ReviewsPage() {
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");

    const products = [
        { id: 1, name: "Wireless Headphones", image: "/images/headphones.jpg" },
        { id: 2, name: "Smart Watch", image: "/images/watch.jpg" },
    ];

    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleSubmit = () => {
        console.log("Review submitted:", { product: selectedProduct, rating, review });
        setShowModal(false);
        setRating(0);
        setReview("");
        alert("Thank you for your review!");
    };

    return (
        <>
            <PlainNavBar />
            <div className="container mx-auto px-4 py-10">
                <h2 className="text-3xl font-bold mb-6">Ratings & Reviews</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center"
                        >
                            <img src={product.image} alt={product.name} className="h-32 mb-4 rounded-lg" />
                            <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                            <button
                                onClick={() => handleOpenModal(product)}
                                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
                            >
                                Rate this Product
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Review Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full">
                        <h3 className="text-xl font-bold mb-4">Review {selectedProduct?.name}</h3>

                        {/* Star Rating */}
                        <div className="flex space-x-2 mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className={`cursor-pointer text-2xl ${
                                        star <= rating ? "text-yellow-500" : "text-gray-300"
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
