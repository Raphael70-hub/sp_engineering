// src/pages/AdminUsers.jsx
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Search, Users, ToggleLeft, ToggleRight } from "lucide-react";

export default function AdminUsers() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    // Sample user data
    const [users, setUsers] = useState([
        { id: 1, name: "John Doe", email: "john@example.com", role: "Customer", status: "Active" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Customer", status: "Disabled" },
        { id: 3, name: "Mark Johnson", email: "mark@example.com", role: "Admin", status: "Active" },
        { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Customer", status: "Active" },
        { id: 5, name: "David Wilson", email: "david@example.com", role: "Customer", status: "Disabled" },
    ]);

    const itemsPerPage = 3;

    // Filtered users
    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesRole = roleFilter === "all" || user.role === roleFilter;
        const matchesStatus = statusFilter === "all" || user.status === statusFilter;

        return matchesSearch && matchesRole && matchesStatus;
    });

    // Pagination
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Toggle status
    const toggleStatus = (id) => {
        setUsers((prev) =>
            prev.map((user) =>
                user.id === id
                    ? { ...user, status: user.status === "Active" ? "Disabled" : "Active" }
                    : user
            )
        );
    };

    return (
        <div className="flex min-h-screen bg-gray-100 overflow-y-hidden">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Main Content */}
            <div className="w-full flex-1 md:px-6 py-6">
                <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Users className="text-orange-500" /> User Management
                </h1>

                {/* Filters */}
                <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-col md:flex-row md:items-center gap-4">
                    <div className="relative w-full md:w-1/3">
                        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full border rounded-lg pl-10 pr-4 py-2"
                        />
                    </div>

                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    >
                        <option value="all">All Roles</option>
                        <option value="Customer">Customer</option>
                        <option value="Admin">Admin</option>
                    </select>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    >
                        <option value="all">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Disabled">Disabled</option>
                    </select>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-xl shadow overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Role</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {paginatedUsers.map((user) => (
                            <tr key={user.id} className="border-t">
                                <td className="px-6 py-4">{user.name}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{user.role}</td>
                                <td className="px-6 py-4">
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.status === "Active"
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600"
                        }`}
                    >
                      {user.status}
                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => toggleStatus(user.id)}
                                        className="text-orange-500 hover:text-orange-700"
                                    >
                                        {user.status === "Active" ? (
                                            <ToggleLeft size={20} />
                                        ) : (
                                            <ToggleRight size={20} />
                                        )}
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {paginatedUsers.length === 0 && (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center py-6 text-gray-500 italic"
                                >
                                    No users found
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
