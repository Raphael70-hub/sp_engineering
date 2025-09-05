// src/pages/AdminPayments.jsx
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import {Search, CreditCard, RefreshCw, Download} from "lucide-react";

export default function AdminPayments() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [methodFilter, setMethodFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // Sample payments data
    const [payments, setPayments] = useState([
        { id: "P001", user: "John Doe", email: "john@example.com", amount: 120.5, status: "Completed", method: "Paystack", date: "2025-08-01" },
        { id: "P002", user: "Jane Smith", email: "jane@example.com", amount: 89.99, status: "Pending", method: "Stripe", date: "2025-08-02" },
        { id: "P003", user: "Mark Johnson", email: "mark@example.com", amount: 45.0, status: "Completed", method: "Flutterwave", date: "2025-08-05" },
        { id: "P004", user: "Alice Brown", email: "alice@example.com", amount: 199.99, status: "Pending", method: "Paystack", date: "2025-08-06" },
        { id: "P005", user: "David Wilson", email: "david@example.com", amount: 75.25, status: "Completed", method: "Stripe", date: "2025-08-07" },
    ]);

    const itemsPerPage = 3;

    // Filter payments
    const filteredPayments = payments.filter((payment) => {
        const matchesSearch =
            payment.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
            payment.email.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
        const matchesMethod = methodFilter === "all" || payment.method === methodFilter;

        const paymentDate = new Date(payment.date);
        const matchesStart = !startDate || paymentDate >= new Date(startDate);
        const matchesEnd = !endDate || paymentDate <= new Date(endDate);

        return matchesSearch && matchesStatus && matchesMethod && matchesStart && matchesEnd;
    });

    // Pagination
    const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
    const paginatedPayments = filteredPayments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Simulate reconciliation
    const reconcilePayment = (id) => {
        alert(`Reconciling payment ${id} with gateway... ✅`);
    };

    const downloadInvoice = (payment) => {
        // Simulate invoice download (can later fetch from backend API)
        const blob = new Blob(
            [
                `Invoice ID: ${payment.id}\nUser: ${payment.user}\nEmail: ${payment.email}\nAmount: $${payment.amount}\nStatus: ${payment.status}\nMethod: ${payment.method}\nDate: ${payment.date}`,
            ],
            { type: "text/plain" }
        );

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `invoice_${payment.id}.txt`;
        link.click();
    };


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
                            placeholder="Search by user or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full border rounded-lg pl-10 pr-4 py-2"
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    >
                        <option value="all">All Status</option>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                    </select>

                    <select
                        value={methodFilter}
                        onChange={(e) => setMethodFilter(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    >
                        <option value="all">All Methods</option>
                        <option value="Paystack">Paystack</option>
                        <option value="Flutterwave">Flutterwave</option>
                        <option value="Stripe">Stripe</option>
                    </select>

                    {/* Date Filters */}
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                        placeholder="Start Date"
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                        placeholder="End Date"
                    />
                </div>

                {/* Payments Table */}
                <div className="bg-white rounded-xl shadow overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3">Payment ID</th>
                            <th className="px-6 py-3">User</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Amount</th>
                            <th className="px-6 py-3">Method</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {paginatedPayments.map((payment) => (
                            <tr key={payment.id} className="border-t">
                                <td className="px-6 py-4">{payment.id}</td>
                                <td className="px-6 py-4">{payment.user}</td>
                                <td className="px-6 py-4">{payment.email}</td>
                                <td className="px-6 py-4 font-medium">${payment.amount.toFixed(2)}</td>
                                <td className="px-6 py-4">{payment.method}</td>
                                <td className="px-6 py-4">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                                        payment.status === "Completed"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-yellow-100 text-yellow-600"
                                    }`}
                                >
                                  {payment.status}
                                </span>
                                </td>
                                <td className="px-6 py-4">{payment.date}</td>
                                <td className="px-6 py-4 flex gap-3">
                                    {payment.status === "Pending" && (
                                        <button
                                            onClick={() => reconcilePayment(payment.id)}
                                            className="flex items-center gap-1 text-orange-500 hover:text-orange-700"
                                        >
                                            <RefreshCw size={18} /> Reconcile
                                        </button>
                                    )}
                                    <button
                                        onClick={() => downloadInvoice(payment)}
                                        className="flex items-center gap-1 text-blue-500 hover:text-blue-700"
                                    >
                                        <Download size={18} /> Invoice
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {paginatedPayments.length === 0 && (
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
            </div>
        </div>
    );
}
