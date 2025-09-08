import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PlainNavBar from "../components/PlainNavBar.jsx";
import Footer from "../sections/Footer.jsx";
import axios from "axios";
import { API_BASE_URL } from "../constants/index.js";

export default function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Pagination
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 10;

    // Filters
    const [status, setStatus] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(
                    `${API_BASE_URL}/api/orders?page=${page}&limit=${limit}&status=${status}&startDate=${startDate}&endDate=${endDate}`
                );

                setOrders(response.data.orders || []);
                setTotal(response.data.total || 0);
            } catch (err) {
                setError("Failed to fetch orders. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [page, status, startDate, endDate]);

    const totalPages = Math.ceil(total / limit);

    return (
        <>
            <PlainNavBar />
            <div className="container mx-auto px-4 py-10">
                <h2 className="text-3xl font-bold mb-6">Order History</h2>

                {/* Filters */}
                <div className="bg-white shadow-md rounded-lg p-4 mb-6 flex flex-wrap gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border rounded px-3 py-2"
                        >
                            <option value="">All</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="shipped">Shipped</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Start Date</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="border rounded px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">End Date</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="border rounded px-3 py-2"
                        />
                    </div>

                    <button
                        onClick={() => {
                            setPage(1); // reset to first page when filters change
                        }}
                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                    >
                        Apply
                    </button>
                </div>

                {/* Loading Spinner */}
                {loading && (
                    <div className="flex justify-center items-center py-10">
                        <div className="w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="ml-3 text-gray-700 font-medium">Loading orders...</span>
                    </div>
                )}

                {error && <p className="text-red-500">{error}</p>}

                {!loading && !error && (
                    <>
                        {orders.length === 0 ? (
                            <p>You have no orders matching the filters.</p>
                        ) : (
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="p-5 border rounded-xl flex justify-between items-center"
                                    >
                                        <div>
                                            <p className="font-semibold">
                                                Order {order.ref}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Date:{" "}
                                                {new Date(order.created_at).toLocaleDateString()} | Status:{" "}
                                                {order.status}
                                            </p>
                                            <p className="text-lg font-bold">
                                                ₦{Number(order.total_amount).toLocaleString()}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Customer: {order.customer_name} (
                                                {order.customer_email})
                                            </p>
                                        </div>
                                        <Link
                                            to={`/orders/${order.id}`}
                                            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center space-x-4 mt-6">
                                <button
                                    disabled={page === 1}
                                    onClick={() => setPage((prev) => prev - 1)}
                                    className={`px-4 py-2 rounded-lg ${
                                        page === 1
                                            ? "bg-gray-300 cursor-not-allowed"
                                            : "bg-orange-600 text-white hover:bg-orange-700"
                                    }`}
                                >
                                    Previous
                                </button>
                                <span className="px-3 py-2">
                                    Page {page} of {totalPages}
                                </span>
                                <button
                                    disabled={page === totalPages}
                                    onClick={() => setPage((prev) => prev + 1)}
                                    className={`px-4 py-2 rounded-lg ${
                                        page === totalPages
                                            ? "bg-gray-300 cursor-not-allowed"
                                            : "bg-orange-600 text-white hover:bg-orange-700"
                                    }`}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
            <Footer />
        </>
    );
}
