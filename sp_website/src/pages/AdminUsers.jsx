// src/pages/AdminUsers.jsx
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Search, Users, ToggleLeft, ToggleRight, Plus, X } from "lucide-react";
import api from "../api";
import toast from "react-hot-toast";

export default function AdminUsers() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    const [users, setUsers] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const [confirmModal, setConfirmModal] = useState({
        open: false,
        userId: null,
        newStatus: null,
    });

    const [createModal, setCreateModal] = useState(false);
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "admin",
    });

    const itemsPerPage = 5;

    // Fetch users with filters & pagination
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await api.get("/api/users", {
                params: {
                    page: currentPage,
                    limit: itemsPerPage,
                    role: roleFilter !== "all" ? roleFilter : undefined,
                    is_active:
                        statusFilter === "all"
                            ? undefined
                            : statusFilter === "Active"
                                ? true
                                : false,
                    search: searchQuery || undefined,
                },
            });
            setUsers(res.data.users);
            setTotal(res.data.total);
        } catch (err) {
            toast.error(err.response?.data?.error || "Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [currentPage, roleFilter, statusFilter, searchQuery]);

    const totalPages = Math.ceil(total / itemsPerPage);

    // Confirm status change
    const confirmToggle = async () => {
        if (!confirmModal.userId) return;
        try {
            await api.patch(`/api/users/${confirmModal.userId}/toggle`, {
                is_active: confirmModal.newStatus,
            });
            toast.success(
                `User ${confirmModal.newStatus ? "activated" : "deactivated"} successfully`
            );
            fetchUsers();
        } catch (err) {
            toast.error(err.response?.data?.error || "Failed to update status");
        } finally {
            setConfirmModal({ open: false, userId: null, newStatus: null });
        }
    };

    // Create user
    const handleCreateUser = async (e) => {
        setCreateModal(false);
        setLoading(true);
        e.preventDefault();
        try {
            await api.post("/api/users", newUser);
            setNewUser({ name: "", email: "", password: "", role: "customer" });
            fetchUsers();
            toast.success("User created successfully");
        } catch (err) {
            toast.error(err.response?.data?.error || "Failed to create user");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100 overflow-y-hidden relative">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Main Content */}
            <div className="w-full flex-1 md:px-6 py-6 relative">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Users className="text-orange-500" /> User Management
                    </h1>
                    <button
                        onClick={() => setCreateModal(true)}
                        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
                    >
                        <Plus size={18} /> New User
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-col md:flex-row md:items-center gap-4">
                    <div className="relative w-full md:w-1/3">
                        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchQuery}
                            onChange={(e) => {
                                setCurrentPage(1);
                                setSearchQuery(e.target.value);
                            }}
                            className="w-full border rounded-lg pl-10 pr-4 py-2"
                        />
                    </div>

                    <select
                        value={roleFilter}
                        onChange={(e) => {
                            setCurrentPage(1);
                            setRoleFilter(e.target.value);
                        }}
                        className="border rounded-lg px-3 py-2"
                    >
                        <option value="all">All Roles</option>
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </select>

                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setCurrentPage(1);
                            setStatusFilter(e.target.value);
                        }}
                        className="border rounded-lg px-3 py-2"
                    >
                        <option value="all">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Disabled">Disabled</option>
                    </select>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-xl shadow overflow-x-auto relative">
                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
                            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
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
                        {users.map((user) => (
                            <tr key={user.id} className="border-t">
                                <td className="px-6 py-4">{user.name}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{user.role}</td>
                                <td className="px-6 py-4">
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.is_active
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600"
                        }`}
                    >
                      {user.is_active ? "Active" : "Disabled"}
                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() =>
                                            setConfirmModal({
                                                open: true,
                                                userId: user.id,
                                                newStatus: !user.is_active,
                                            })
                                        }
                                        className="text-orange-500 hover:text-orange-700"
                                    >
                                        {user.is_active ? <ToggleLeft size={20} /> : <ToggleRight size={20} />}
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {users.length === 0 && !loading && (
                            <tr>
                                <td colSpan="5" className="text-center py-6 text-gray-500 italic">
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
                        Page {currentPage} of {totalPages || 1}
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
                            disabled={currentPage === totalPages || totalPages === 0}
                            className="px-3 py-1 border rounded-lg disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Confirm Modal */}
            {confirmModal.open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/30 bg-opacity-40 z-50">
                    <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Confirm Action</h2>
                        <p className="mb-6">
                            Are you sure you want to{" "}
                            <span className="font-semibold">
                {confirmModal.newStatus ? "activate" : "deactivate"}
              </span>{" "}
                            this user?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setConfirmModal({ open: false, userId: null, newStatus: null })}
                                className="px-4 py-2 border rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmToggle}
                                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Create User Modal */}
            {createModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/30 bg-opacity-40 z-50">
                    <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
                        <button
                            onClick={() => setCreateModal(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-lg font-bold mb-4">Create New User</h2>
                        <form onSubmit={handleCreateUser} className="flex flex-col gap-4">
                            <input
                                type="text"
                                placeholder="Name"
                                value={newUser.name}
                                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                className="border rounded-lg px-3 py-2"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={newUser.email}
                                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                className="border rounded-lg px-3 py-2"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={newUser.password}
                                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                className="border rounded-lg px-3 py-2"
                                required
                            />
                            <select
                                value={newUser.role}
                                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                className="border rounded-lg px-3 py-2"
                            >
                                <option value="customer">Customer</option>
                                <option value="admin">Admin</option>
                            </select>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
                            >
                                Create User
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
