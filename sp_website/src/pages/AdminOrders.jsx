import { useState, useEffect } from "react";
import {
    ShoppingCart,
    Eye,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar.jsx";
import { API_BASE_URL } from "../constants/index.js";

export default function AdminOrders() {
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState("");
    const [isErrorNotification, setIsErrorNotification] = useState(false);

    const [statusFilter, setStatusFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [page, setPage] = useState(1);
    const [limit] = useState(5);
    const [totalPages, setTotalPages] = useState(1);

    // Fetch orders from API
    const fetchOrders = async () => {
        try {
            setLoading(true);
            const params = {
                page,
                limit,
                status: statusFilter !== "All" ? statusFilter.toLowerCase() : undefined,
                startDate: startDate || undefined,
                endDate: endDate || undefined,
                ref: search || undefined,
            };
            const res = await axios.get(`${API_BASE_URL}/api/orders`, { params });
            setOrders(res.data.orders || []);
            setTotalPages(Math.ceil(res.data.total / limit) || 1);
        } catch (err) {
            console.error(err);
            showNotification("Failed to fetch orders", true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [page, statusFilter, startDate, endDate]);

    const showNotification = (msg, isError = false) => {
        setNotification(msg);
        setIsErrorNotification(isError);
        setTimeout(() => setNotification(""), 3000);
    };

    // // Update order status
    // const updateStatus = async (orderId, status) => {
    //     try {
    //         await axios.put(`${API_BASE_URL}/api/orders/status/${orderId}`, { status });
    //         showNotification("Order status updated successfully");
    //         fetchOrders();
    //     } catch (err) {
    //         console.error(err);
    //         showNotification("Failed to update order status", true);
    //     }
    // };

    // Cancel order
    // const cancelOrder = async (orderId) => {
    //     const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
    //     if (!confirmCancel) return;
    //
    //     try {
    //         await axios.put(`${API_BASE_URL}/api/orders/cancel/${orderId}`);
    //         showNotification("Order cancelled successfully");
    //         fetchOrders();
    //     } catch (err) {
    //         console.error(err);
    //         showNotification("Failed to cancel order", true);
    //     }
    // };

    const applyFilters = async () => {
        setPage(1);
        fetchOrders();
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen min-w-screen overflow-y-hidden">
            <Sidebar />

            <div className="w-full md:px-6 py-6">
                {notification && (
                    <div
                        className={`absolute top-4 left-1/2 z-50 -translate-x-1/2 ${
                            isErrorNotification ? "bg-red-500" : "bg-green-500"
                        } text-white px-4 py-2 rounded shadow`}
                    >
                        {notification}
                    </div>
                )}

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold flex items-center space-x-2">
                        <ShoppingCart className="w-6 h-6 text-orange-500" />
                        <span>Order Management</span>
                    </h1>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search by Ref..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="p-2 border rounded-lg w-64"
                    />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="p-2 border rounded-lg"
                    >
                        <option>All</option>
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                    </select>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    />
                    <button
                        onClick={() => applyFilters()}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
                    >
                        Apply
                    </button>
                    <button
                        onClick={() => {
                            setStatusFilter("All");
                            setSearch("");
                            setStartDate("");
                            setEndDate("");
                            setPage(1);
                        }}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg"
                    >
                        Reset
                    </button>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-100 text-gray-700 text-sm">
                            <tr>
                                <th className="p-3 text-left">Order Ref</th>
                                <th className="p-3 text-left">Customer</th>
                                <th className="p-3 text-left">Total Amount</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="p-3 text-left">Date</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map((o) => (
                                <tr key={o.ref} className="border-b hover:bg-gray-50">
                                    <td className="p-3 font-medium">{o.ref}</td>
                                    <td className="p-3">{o.customer_name}</td>
                                    <td className="p-3">
                                        {new Intl.NumberFormat('en-NG', {
                                        style: 'currency',
                                        currency: 'NGN',
                                        minimumFractionDigits: 2,
                                    }).format(o.total_amount).replace('NGN', '').trim()}
                                    </td>
                                    <td className="p-3">
                      <span
                          className={`px-2 py-1 text-xs rounded-lg ${
                              o.status === "pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : o.status === "processing"
                                      ? "bg-purple-100 text-purple-700"
                                      : o.status === "shipped"
                                          ? "bg-blue-100 text-blue-700"
                                          : o.status === "completed"
                                              ? "bg-green-100 text-green-700"
                                              : "bg-red-100 text-red-700"
                          }`}
                      >
                        {o.status}
                      </span>
                                    </td>
                                    <td className="p-3">{new Date(o.created_at).toLocaleDateString()}</td>
                                    <td className="p-3 flex space-x-2">
                                        <button
                                            onClick={() => navigate(`/admin/orders/${o.id}`)}
                                            className="text-orange-600 hover:text-orange-800"
                                            title="View Details"
                                        >
                                            <Eye className="w-5 h-5" />
                                        </button>
                                        {/*{o.status !== "cancelled" && (*/}
                                        {/*    <>*/}
                                        {/*        <button*/}
                                        {/*            onClick={() => updateStatus(o.id, "shipped")}*/}
                                        {/*            className="text-blue-600 hover:text-blue-800 text-sm px-2 py-1 border rounded"*/}
                                        {/*        >*/}
                                        {/*            Mark Shipped*/}
                                        {/*        </button>*/}
                                        {/*        <button*/}
                                        {/*            onClick={() => cancelOrder(o.id)}*/}
                                        {/*            className="text-red-600 hover:text-red-800 text-sm px-2 py-1 border rounded"*/}
                                        {/*        >*/}
                                        {/*            Cancel*/}
                                        {/*        </button>*/}
                                        {/*    </>*/}
                                        {/*)}*/}
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="p-4 text-center text-gray-500">
                                        No orders found
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className={`flex items-center space-x-1 px-3 py-1 border rounded-lg ${
                            page === 1
                                ? "text-gray-400 border-gray-300"
                                : "text-orange-600 border-orange-400 hover:bg-orange-50"
                        }`}
                    >
                        <ChevronLeft className="w-4 h-4" /> <span>Prev</span>
                    </button>
                    <span className="text-sm">
            Page {page} of {totalPages}
          </span>
                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                        className={`flex items-center space-x-1 px-3 py-1 border rounded-lg ${
                            page === totalPages
                                ? "text-gray-400 border-gray-300"
                                : "text-orange-600 border-orange-400 hover:bg-orange-50"
                        }`}
                    >
                        <span>Next</span> <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
