// src/pages/RentalDetail.jsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PlainNavBar from "../components/PlainNavBar.jsx";
import Footer from "../sections/Footer.jsx";
import { API_BASE_URL } from "../constants/index.js";
import api from "../api/index.js";

export default function RentalDetail() {
    const { id } = useParams();
    const [rental, setRental] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRental = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await api.get(`/api/rentals/${id}`);
                setRental(response.data);
            } catch (err) {
                setError("Failed to load rental details. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchRental();
    }, [id]);

    return (
        <>
            <PlainNavBar />
            <div className="container mx-auto px-4 py-10">
                {loading && (
                    <div className="flex justify-center items-center py-10">
                        <div className="w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                {error && <p className="text-red-500">{error}</p>}

                {!loading && !error && rental && (
                    <>
                        <h2 className="text-3xl font-bold mb-6">
                             {rental.ref}
                        </h2>

                        <div className="mb-4 space-y-1">
                            {rental.items?.length ? (
                                <p>
                                    <span className="font-medium">Rental Period:</span>{" "}
                                    {(() => {
                                        // Find earliest start date and latest end date among all items
                                        const startDates = rental.items.map(i => new Date(i.start_date));
                                        const endDates = rental.items.map(i => new Date(i.end_date));
                                        const earliest = new Date(Math.min(...startDates));
                                        const latest = new Date(Math.max(...endDates));
                                        return `${earliest.toLocaleDateString()} - ${latest.toLocaleDateString()}`;
                                    })()}
                                </p>
                            ) : null}
                            <p>
                                <strong>Status:</strong> <span
                                className={`px-2 py-1 text-xs rounded-lg ${
                                    rental.status === "pending"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : rental.status === "confirmed"
                                            ? "bg-blue-100 text-blue-700"
                                            : rental.status === "completed"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                }`}
                            >
                            {rental.status}
                        </span>
                            </p>
                            <p className="font-bold">
                                Total: ₦{Number(rental.total_amount).toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-600">
                                Phone Number: {rental.phone_number}
                            </p>
                            <p className="text-sm text-gray-600">
                                Shipping Address: {rental.shipping_address}
                            </p>

                        </div>

                        <h3 className="text-xl font-semibold mb-4">Items Rented</h3>
                        <div className="space-y-3">
                            {rental.items?.map((item) => (
                                <div
                                    key={item.id}
                                    className="p-4 border rounded-lg flex justify-between items-center"
                                >
                                    <div className="flex gap-6">
                                        <div>
                                            <p className="font-medium">{item.product_name}</p>
                                            <p className="text-sm text-gray-600">
                                                Qty: {item.quantity}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Price/Day: ₦{Number(item.price_per_day).toLocaleString()}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {new Date(item.start_date).toLocaleDateString()} - {new Date(item.end_date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <Link
                                        to={`/product/${item.product_id}`}
                                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                                    >
                                        View Product
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </>
    );
}
