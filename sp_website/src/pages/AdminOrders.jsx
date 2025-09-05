import { useState } from "react";
import {
    Package,
    LayoutDashboard,
    ShoppingCart,
    Users,
    CreditCard,
    LogOut,
    Eye,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";

export default function AdminOrders() {
    const navigate = useNavigate();

    const [orders] = useState([
        {
            id: 1,
            customer: "John Doe",
            products: [
                { name: "Cement", qty: 5 },
                { name: "Bricks", qty: 50 },
                { name: "Iron Rods", qty: 10 },
            ],
            status: "Pending",
            date: "2025-09-01"
        },
        {
            id: 2,
            customer: "Jane Smith",
            products: [{ name: "Mixer", qty: 1 }],
            status: "Shipped",
            date: "2025-09-02"
        },
        {
            id: 3,
            customer: "Samuel Green",
            products: [
                { name: "Cement", qty: 10 },
                { name: "Iron Rods", qty: 20 },
                { name: "Sand", qty: 3 },
                { name: "Tiles", qty: 40 },
            ],
            status: "Delivered",
            date: "2025-09-03"
        },
    ]);

    // Filters
    const [statusFilter, setStatusFilter] = useState("All");
    const [search, setSearch] = useState("");

    // Pagination
    const [page, setPage] = useState(1);
    const pageSize = 5;

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // Filter logic (by customer OR product name)
    const filteredOrders = orders.filter((o) => {
        const matchesStatus =
            statusFilter === "All" ? true : o.status === statusFilter;

        const matchesSearch =
            o.customer.toLowerCase().includes(search.toLowerCase()) ||
            o.products.some((p) =>
                p.name.toLowerCase().includes(search.toLowerCase())
            );

        const date = new Date(o.date);
        const matchesStart = !startDate || date >= new Date(startDate);
        const matchesEnd = !endDate || date <= new Date(endDate);


        return matchesStatus && matchesSearch && matchesStart && matchesEnd;
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredOrders.length / pageSize);
    const paginatedOrders = filteredOrders.slice(
        (page - 1) * pageSize,
        page * pageSize
    );

    return (
        <div className="flex min-h-screen min-w-screen overflow-y-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="w-full md:px-6 py-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold flex items-center space-x-2">
                        <ShoppingCart className="w-6 h-6 text-orange-500" />
                        <span>Order Management</span>
                    </h1>
                </div>

                {/* Filters */}
                <div className="flex items-center space-x-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search..."
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
                        <option>Shipped</option>
                        <option>Delivered</option>
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

                {/* Orders Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-100 text-gray-700 text-sm">
                            <tr>
                                <th className="p-3 text-left">Order ID</th>
                                <th className="p-3 text-left">Customer</th>
                                <th className="p-3 text-left">Products</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="px-6 py-3 text-left">Date</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {paginatedOrders.map((o) => (
                                <tr key={o.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3 font-medium">#{o.id}</td>
                                    <td className="p-3">{o.customer}</td>
                                    <td className="p-3 text-sm text-gray-700">
                                        {o.products.slice(0, 2).map((p, i) => (
                                            <span key={i} className="mr-2">
                                                {p.qty}x {p.name}
                                              </span>
                                                            ))}
                                                            {o.products.length > 2 && (
                                                                <span className="text-gray-500">
                                                +{o.products.length - 2} more...
                                              </span>
                                                            )}
                                                        </td>
                                                        <td className="p-3">
                                            <span
                                                className={`px-2 py-1 text-xs rounded-lg ${
                                                    o.status === "Pending"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : o.status === "Shipped"
                                                            ? "bg-blue-100 text-blue-700"
                                                            : "bg-green-100 text-green-700"
                                                }`}
                                            >
                                              {o.status}
                                            </span>
                                    </td>
                                    <td className="px-6 py-4">{o.date}</td>
                                    <td className="p-3 text-left">
                                        <button
                                            onClick={() => navigate(`/admin/orders/${o.id}`)}
                                            className="text-orange-600 hover:text-orange-800"
                                            title="View Details"
                                        >
                                            <Eye className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {paginatedOrders.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="p-4 text-center text-gray-500">
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
