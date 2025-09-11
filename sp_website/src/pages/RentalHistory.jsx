// src/pages/RentalHistory.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PlainNavBar from "../components/PlainNavBar.jsx";
import Footer from "../sections/Footer.jsx";
import { API_BASE_URL } from "../constants/index.js";
import api, {getCurrentUser} from "../api/index.js";

export default function RentalHistory() {

    const loadUser = async () => {
        try {
            const data = await getCurrentUser();
            return data;
        } catch (err) {
            console.error("Failed to load user:", err);
        }
    };

    const [rentals, setRentals] = useState([]);
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
        const fetchRentals = async () => {
            setLoading(true);
            setError(null);

            const user = await loadUser();

            try {
                const response = await api.get(
                    `/api/rentals?user_id=${user.id}&page=${page}&limit=${limit}&status=${status}&startDate=${startDate}&endDate=${endDate}`
                );

                setRentals(response.data.bookings || []);
                setTotal(response.data.total || 0);
            } catch (err) {
                setError("Failed to fetch rentals. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchRentals();
    }, [page, status, startDate, endDate]);

    const totalPages = Math.ceil(total / limit);

    return (
        <>
            <PlainNavBar />
            <div className="container mx-auto px-4 py-10">
                <h2 className="text-3xl font-bold mb-6">Rental History</h2>

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
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="completed">Completed</option>
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
                            setPage(1); // reset page on filter change
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
                        <span className="ml-3 text-gray-700 font-medium">Loading rentals...</span>
                    </div>
                )}

                {error && <p className="text-red-500">{error}</p>}

                {!loading && !error && (
                    <>
                        {rentals.length === 0 ? (
                            <p>You have no rentals matching the filters.</p>
                        ) : (
                            <div className="space-y-4">
                                {rentals.map((rental) => (
                                    <div
                                        key={rental.id}
                                        className="p-5 border rounded-xl flex justify-between items-center"
                                    >
                                        <div>
                                            <p className="font-semibold">
                                                Rental {rental.ref}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Dates:{" "}
                                                {(() => {
                                                    // Find earliest start date and latest end date among all items
                                                    const startDates = rental.items.map(i => new Date(i.start_date));
                                                    const endDates = rental.items.map(i => new Date(i.end_date));
                                                    const earliest = new Date(Math.min(...startDates));
                                                    const latest = new Date(Math.max(...endDates));
                                                    return `${earliest.toLocaleDateString()} - ${latest.toLocaleDateString()}`;
                                                })()} | Status:{" "}
                                                <span>
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
                                                </span>
                                            </p>
                                            <p className="text-lg font-bold">
                                                ₦{Number(rental.total_amount).toLocaleString()}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Rented by: {rental.user_name} ({rental.user_email})
                                            </p>
                                        </div>
                                        <Link
                                            to={`/rentals/${rental.id}`}
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
