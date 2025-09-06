// src/pages/AdminPayments.jsx
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import {Search, CreditCard, RefreshCw, Download, Eye} from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "../constants";
import {useNavigate} from "react-router-dom";

export default function AdminPayments() {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [methodFilter, setMethodFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [payments, setPayments] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const itemsPerPage = 5;

    const fetchPayments = async () => {
        try {
            setLoading(true);
            setError("");

            const params = {
                page: currentPage,
                limit: itemsPerPage,
            };

            if (statusFilter !== "all") params.status = statusFilter.toLowerCase();
            if (methodFilter !== "all") params.provider = methodFilter.toLowerCase();
            if (startDate) params.startDate = startDate;
            if (endDate) params.endDate = endDate;
            if (searchQuery) params.ref = searchQuery;

            const res = await axios.get(`${API_BASE_URL}/api/payments`, { params });

            setPayments(res.data.payments || []);
            setTotal(res.data.total || 0);
        } catch (err) {
            console.error("Failed to fetch payments:", err);
            setError("Failed to load payments");
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = async () => {
        setCurrentPage(1);
        fetchPayments();
    }
    useEffect(() => {
        fetchPayments();
    }, [currentPage, statusFilter, methodFilter, startDate, endDate]);

    const totalPages = Math.ceil(total / itemsPerPage);

    // const reconcilePayment = (id) => {
    //     alert(`Reconciling payment ${id} with gateway... ✅`);
    // };
    //
    // const downloadInvoice = (payment) => {
    //     // Simulated invoice download
    //     const blob = new Blob(
    //         [
    //             `Invoice ID: ${payment.id}\nOrder ID: ${payment.order_id}\nAmount: ₦${payment.amount}\nStatus: ${payment.status}\nProvider: ${payment.provider}\nTransaction Ref: ${payment.transaction_ref}\nDate: ${payment.created_at}`,
    //         ],
    //         { type: "text/plain" }
    //     );
    //
    //     const link = document.createElement("a");
    //     link.href = URL.createObjectURL(blob);
    //     link.download = `invoice_${payment.id}.txt`;
    //     link.click();
    // };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Main Content */}
            <div className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <CreditCard className="text-orange-500" /> Payment Management
                </h1>

                {/* Filters */}
                <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-col md:flex-row md:items-center gap-4">
                    <div className="relative w-full md:w-1/3">
                        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by ref..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full border rounded-lg pl-10 pr-4 py-2"
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setCurrentPage(1);
                            setStatusFilter(e.target.value);
                        }}
                        className="border rounded-lg px-3 py-2"
                    >
                        <option value="all">All Status</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                    </select>

                    <select
                        value={methodFilter}
                        onChange={(e) => {
                            setCurrentPage(1);
                            setMethodFilter(e.target.value);
                        }}
                        className="border rounded-lg px-3 py-2"
                    >
                        <option value="all">All Providers</option>
                        <option value="paystack">Paystack</option>
                        <option value="flutterwave">Flutterwave</option>
                        <option value="stripe">Stripe</option>
                    </select>

                    {/* Date Filters */}
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => {
                            setCurrentPage(1);
                            setStartDate(e.target.value);
                        }}
                        className="border rounded-lg px-3 py-2"
                        placeholder="Start Date"
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => {
                            setCurrentPage(1);
                            setEndDate(e.target.value);
                        }}
                        className="border rounded-lg px-3 py-2"
                        placeholder="End Date"
                    />
                    <button
                        onClick={() => applyFilters()}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
                    >
                        Apply
                    </button>
                </div>

                {/* Loading / Error */}
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <>
                        {/* Payments Table */}
                        <div className="bg-white rounded-xl shadow overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                                <tr>
                                    {/*<th className="px-6 py-3">ID</th>*/}
                                    {/*<th className="px-6 py-3">Order Ref</th>*/}
                                    <th className="px-6 py-3">Ref</th>
                                    <th className="px-6 py-3">Amount</th>
                                    <th className="px-6 py-3">Provider</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Date</th>
                                    <th className="px-6 py-3">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {payments.map((payment) => (
                                    <tr key={payment.id} className="border-t">
                                        {/*<td className="px-6 py-4">{payment.id}</td>*/}
                                        {/*<td className="px-6 py-4"><a href={`/admin/orders/${payment.order_id}`}>{payment.order_ref}</a></td>*/}
                                        <td className="px-6 py-4">{payment.transaction_ref}</td>
                                        <td className="px-6 py-4 font-medium">
                                            ₦{parseFloat(payment.amount).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 capitalize">{payment.provider}</td>
                                        <td className="px-6 py-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                        payment.status === "completed"
                                                            ? "bg-green-100 text-green-600"
                                                            : "bg-yellow-100 text-yellow-600"
                                                    }`}
                                                >
                                                    {payment.status}
                                                </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {new Date(payment.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 flex gap-3">
                                            <button
                                                onClick={() => navigate(`/admin/payments/${payment.id}`)}
                                                className="text-orange-600 hover:text-orange-800"
                                                title="View Details"
                                            >
                                                <Eye className="w-5 h-5" />
                                            </button>
                                            {/*{payment.status === "pending" && (*/}
                                            {/*    <button*/}
                                            {/*        onClick={() => reconcilePayment(payment.id)}*/}
                                            {/*        className="flex items-center gap-1 text-orange-500 hover:text-orange-700"*/}
                                            {/*    >*/}
                                            {/*        <RefreshCw size={18} /> Reconcile*/}
                                            {/*    </button>*/}
                                            {/*)}*/}
                                            {/*<button*/}
                                            {/*    onClick={() => downloadInvoice(payment)}*/}
                                            {/*    className="flex items-center gap-1 text-blue-500 hover:text-blue-700"*/}
                                            {/*>*/}
                                            {/*    <Download size={18} /> Invoice*/}
                                            {/*</button>*/}
                                        </td>
                                    </tr>
                                ))}

                                {payments.length === 0 && (
                                    <tr>
                                        <td colSpan="8" className="text-center py-6 text-gray-500 italic">
                                            No payments found
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-between items-center mt-6">
                                <p className="text-sm text-gray-500">
                                    Page {currentPage} of {totalPages}
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="px-3 py-1 border rounded-lg disabled:opacity-50"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-1 border rounded-lg disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
