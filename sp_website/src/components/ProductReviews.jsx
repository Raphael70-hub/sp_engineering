import { useState } from "react";
import { ArrowRightIcon, X } from "lucide-react";

const ProductReviews = ({ reviews = [], avgRating = 0, loading = false }) => {
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    // Show only first 5 reviews in the summary
    const limitedReviews = reviews.slice(0, 5);

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            {loading ? (
                <div className="flex justify-center py-10">
                    <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <>
                    {/* See All Button */}
                    {reviews.length > 5 && (
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowModal(true)}
                                className="mt-4 px-6 py-2 text-orange-600 bg-transparent rounded-lg cursor-pointer flex items-center"
                            >
                                <span>See All</span>
                                <ArrowRightIcon className="ml-2 h-5 w-5 text-current" />
                            </button>
                        </div>
                    )}

                    <h2 className="text-2xl font-semibold mb-4">Verified Customer Reviews</h2>

                    <div className="flex items-center mb-6">
                        <span className="text-3xl font-bold text-orange-600 mr-3">
                            {avgRating}/5
                        </span>
                        <div className="flex text-yellow-400">
                            {Array.from({ length: 5 }, (_, i) => (
                                <span key={i}>{i < Math.round(avgRating) ? "★" : "☆"}</span>
                            ))}
                        </div>
                        <span className="ml-3 text-gray-600">({reviews.length} reviews)</span>
                    </div>

                    <div className="space-y-6">
                        {limitedReviews.map((review, idx) => (
                            <div key={idx} className="border-b pb-4 border-gray-200 last:border-none">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-semibold">{review.user_name || review.user}</h4>
                                    <div className="flex text-yellow-400">
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-600 mt-2">{review.comment}</p>
                            </div>
                        ))}
                    </div>

                    {/* Modal */}
                    {showModal && (
                        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
                            <div className="bg-white p-6 rounded-lg w-[90%] max-w-2xl max-h-[80vh] overflow-y-auto shadow-lg">
                                <div className="flex justify-between">
                                    <h3 className="text-xl font-bold mb-4">All Reviews</h3>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="text-black cursor-pointer"
                                    >
                                        <X />
                                    </button>
                                </div>

                                {/* Pagination logic */}
                                {(() => {
                                    const reviewsPerPage = 5;
                                    const totalPages = Math.ceil(reviews.length / reviewsPerPage);
                                    const startIndex = (currentPage - 1) * reviewsPerPage;
                                    const currentReviews = reviews.slice(
                                        startIndex,
                                        startIndex + reviewsPerPage
                                    );

                                    return (
                                        <>
                                            {currentReviews.map((review, index) => (
                                                <div key={index} className="border-b py-3">
                                                    <p className="font-semibold">{review.user_name || review.user}</p>
                                                    <p className="text-yellow-500">
                                                        {"★".repeat(review.rating)}{" "}
                                                        <span className="text-gray-500 text-sm">
                                                            ({review.rating}/5)
                                                        </span>
                                                    </p>
                                                    <p className="text-gray-700 mt-1">{review.comment}</p>
                                                </div>
                                            ))}

                                            {/* Pagination controls */}
                                            <div className="flex justify-center mt-4 space-x-2">
                                                <button
                                                    disabled={currentPage === 1}
                                                    onClick={() => setCurrentPage((prev) => prev - 1)}
                                                    className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300"
                                                >
                                                    Previous
                                                </button>

                                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                                    (page) => (
                                                        <button
                                                            key={page}
                                                            onClick={() => setCurrentPage(page)}
                                                            className={`px-3 py-1 rounded-md ${
                                                                currentPage === page
                                                                    ? "bg-orange-600 text-white"
                                                                    : "bg-gray-200 hover:bg-gray-300"
                                                            }`}
                                                        >
                                                            {page}
                                                        </button>
                                                    )
                                                )}

                                                <button
                                                    disabled={currentPage === totalPages}
                                                    onClick={() => setCurrentPage((prev) => prev + 1)}
                                                    className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300"
                                                >
                                                    Next
                                                </button>
                                            </div>
                                        </>
                                    );
                                })()}

                                <button
                                    onClick={() => setShowModal(false)}
                                    className="mt-6 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 w-full"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ProductReviews;
