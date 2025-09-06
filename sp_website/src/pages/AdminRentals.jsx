// src/pages/AdminRentals.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constants";
import Sidebar from "../components/Sidebar";
import {Search, ChevronLeft, ChevronRight, EyeIcon, Eye} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminRentals() {
    const [rentals, setRentals] = useState([]);
    const [filters, setFilters] = useState({
        status: "",
        user_email: "",
        start_date: "",
        end_date: "",
    });
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState("");
    const [isErrorNotification, setIsErrorNotification] = useState(false);
    const navigate = useNavigate();

    const fetchRentals = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_BASE_URL}/api/rentals`, {
                params: {
                    ...filters,
                    page,
                    limit,
                },
            });
            setRentals(res.data.bookings);
            setTotal(res.data.total);
        } catch (err) {
            console.error(err);
            showNotification("Failed to fetch rentals", true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRentals();
    }, [page]);

    const showNotification = (msg, isError = false) => {
        setNotification(msg);
        setIsErrorNotification(isError);
        setTimeout(() => setNotification(""), 3000);
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const applyFilters = () => {
        setPage(1);
        fetchRentals();
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-6">
                {/* Notification */}
                {notification && (
                    <div
                        className={`absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded shadow text-white ${
                            isErrorNotification ? "bg-red-500" : "bg-green-500"
                        }`}
                    >
                        {notification}
                    </div>
                )}

                {/* Header */}
                <h1 className="text-2xl font-bold mb-6">Rental Bookings</h1>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-6 grid md:grid-cols-5 gap-3">
                    <input
                        type="email"
                        name="user_email"
                        placeholder="User Email"
                        value={filters.user_email}
                        onChange={handleFilterChange}
                        className="border rounded p-2"
                    />
                    <select
                        name="status"
                        value={filters.status}
                        onChange={handleFilterChange}
                        className="border rounded p-2"
                    >
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="completed">Completed</option>
                    </select>
                    <input
                        type="date"
                        name="start_date"
                        value={filters.start_date}
                        onChange={handleFilterChange}
                        className="border rounded p-2"
                    />
                    <input
                        type="date"
                        name="end_date"
                        value={filters.end_date}
                        onChange={handleFilterChange}
                        className="border rounded p-2"
                    />
                    <button
                        onClick={applyFilters}
                        className="bg-orange-500 hover:bg-orange-600 text-white rounded px-4 py-2 flex items-center gap-2"
                    >
                        <Search size={16} /> Apply
                    </button>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="p-3">Ref</th>
                            <th className="p-3">Product</th>
                            <th className="p-3">User</th>
                            <th className="p-3">Dates</th>
                            <th className="p-3">Quantity</th>
                            <th className="p-3">Total</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="8" className="text-center py-4">
                                    Loading...
                                </td>
                            </tr>
                        ) : rentals.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center py-4">
                                    No rentals found
                                </td>
                            </tr>
                        ) : (
                            rentals.map((rental) => (
                                <tr key={rental.id} className="border-t">
                                    <td className="p-3">{rental.ref}</td>
                                    <td className="p-3">{rental.product_name}</td>
                                    <td className="p-3">
                                        <div>
                                            <p className="font-medium">{rental.user_name}</p>
                                            <p className="text-gray-500 text-xs">
                                                {rental.user_email}
                                            </p>
                                            {rental.user_phone && (
                                                <p className="text-gray-400 text-xs">
                                                    {rental.user_phone}
                                                </p>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-3">
                                        {new Date(rental.start_date).toLocaleDateString()} -{" "}
                                        {new Date(rental.end_date).toLocaleDateString()}
                                    </td>
                                    <td className="p-3">{rental.quantity}</td>
                                    <td className="p-3">
                                        ₦{parseFloat(rental.total_amount).toLocaleString()}
                                    </td>
                                    <td className="p-3">
                      <span
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
                                    </td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => navigate(`/admin/rentals/${rental.id}`)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                        disabled={page === 1}
                        className="px-3 py-1 border rounded flex items-center gap-1 disabled:opacity-50"
                    >
                        <ChevronLeft size={16} /> Prev
                    </button>
                    <span>
            Page {page} of {Math.ceil(total / limit) || 1}
          </span>
                    <button
                        onClick={() => setPage((prev) => prev + 1)}
                        disabled={page * limit >= total}
                        className="px-3 py-1 border rounded flex items-center gap-1 disabled:opacity-50"
                    >
                        Next <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
