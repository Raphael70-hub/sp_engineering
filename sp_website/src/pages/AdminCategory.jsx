import { useState, useEffect } from "react";
import {Plus, Edit, Trash2, X, ChevronLeft, ChevronRight, Tags} from "lucide-react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar.jsx";
import { API_BASE_URL } from "../constants/index.js";

export default function AdminCategory() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [notification, setNotification] = useState("");
    const [isErrorNotification, setIsErrorNotification] = useState(false);
    const [filterSearch, setFilterSearch] = useState("");

    const [page, setPage] = useState(1);
    const pageSize = 5;
    const [totalPages, setTotalPages] = useState(1);

    // const navigate = useNavigate();

    // Fetch categories with pagination and search
    const fetchCategories = async () => {
        try {
            setLoading(true);
            const params = {
                page,
                limit: pageSize,
                search: filterSearch || undefined,
            };
            const res = await axios.get(`${API_BASE_URL}/api/categories`, { params });
            setCategories(res.data.categories || []);
            setTotalPages(Math.ceil(res.data.total / pageSize) || 1);
        } catch (err) {
            console.error(err);
            showNotification("Failed to fetch categories", true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [page]);

    const showNotification = (msg, isError = false) => {
        setNotification(msg);
        setIsErrorNotification(isError);
        setTimeout(() => setNotification(""), 3000);
    };

    const handleSave = async (formData) => {
        try {
            setLoading(true);
            let response;
            if (editing) {
                // Update category
                response = await axios.patch(
                    `${API_BASE_URL}/api/categories/${editing.id}`,
                    formData
                );
                showNotification(response?.data?.message || "Category updated successfully");
            } else {
                // Create category
                response = await axios.post(`${API_BASE_URL}/api/categories`, formData);
                showNotification(response?.data?.message || "Category created successfully");
            }
            setOpen(false);
            setEditing(null);
            fetchCategories();
        } catch (err) {
            console.error(err);
            const errorMessage =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                "An error occurred. Please try again.";
            showNotification(errorMessage, true);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this category?");
        if (!confirmDelete) return;
        try {
            setLoading(true);
            await axios.delete(`${API_BASE_URL}/api/categories/${id}`);
            showNotification("Category deleted successfully");
            fetchCategories();
        } catch (err) {
            const errorMessage =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                "An error occurred. Please try again.";

            showNotification(errorMessage, true);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-100 overflow-y-hidden">
            <Sidebar />

            <div className="w-full md:px-6 py-6 relative">
                {notification && (
                    <div
                        className={`absolute top-4 left-1/2 z-100 -translate-x-1/2 ${
                            isErrorNotification ? "bg-red-500" : "bg-green-500"
                        } text-white px-4 py-2 rounded shadow`}
                    >
                        {notification}
                    </div>
                )}

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold flex items-center space-x-2">
                        <Tags className="w-6 h-6 text-orange-500" />
                        <span>Categories</span>
                    </h1>
                    <button
                        onClick={() => setOpen(true)}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add Category</span>
                    </button>
                </div>

                {/* Search Filter */}
                <div className="flex gap-4 mb-4 items-end bg-white shadow p-4 rounded-lg">
                    <div>
                        <label className="block text-sm font-medium">Search</label>
                        <input
                            type="text"
                            value={filterSearch}
                            onChange={(e) => setFilterSearch(e.target.value)}
                            placeholder="Search categories..."
                            className="border rounded-lg p-2 shadow-sm focus:ring focus:ring-orange-300 w-64"
                        />
                    </div>
                    <button
                        onClick={() => {
                            setPage(1);
                            fetchCategories();
                        }}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
                    >
                        Apply
                    </button>
                    <button
                        onClick={() => {
                            setFilterSearch("");
                            setPage(1);
                            fetchCategories();
                        }}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg"
                    >
                        Reset
                    </button>
                </div>

                {/* Categories Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-100 text-gray-700 text-sm">
                            <tr>
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Description</th>
                                <th className="p-3 text-left">Created At</th>
                                <th className="p-3 text-left">Modified At</th>
                                <th className="p-3 text-right">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {categories.map((cat) => (
                                <tr key={cat.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3 font-medium">{cat.name}</td>
                                    <td className="p-3">{cat.description}</td>
                                    <td className="p-3">{new Date(cat.created_at).toLocaleString()}</td>
                                    <td className="p-3">{cat.modified_at ? new Date(cat.modified_at).toLocaleString() : "-"}</td>
                                    <td className="p-3 text-right flex justify-end space-x-3">
                                        <button
                                            className="text-blue-600 hover:text-blue-800"
                                            onClick={() => {
                                                setEditing(cat);
                                                setOpen(true);
                                            }}
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            className="text-red-600 hover:text-red-800"
                                            onClick={() => handleDelete(cat.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className="flex justify-between items-center p-4 border-t">
                            <button
                                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                disabled={page === 1}
                                className="px-3 py-1 flex items-center gap-1 border rounded-lg disabled:opacity-50"
                            >
                                <ChevronLeft size={16} /> Prev
                            </button>

                            <span>
                                Page {page} of {totalPages}
                            </span>

                            <button
                                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={page === totalPages}
                                className="px-3 py-1 flex items-center gap-1 border rounded-lg disabled:opacity-50"
                            >
                                Next <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add/Edit Category Modal */}
            {open && (
                <div className="fixed inset-0 bg-black/30 flex md:items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-lg relative">
                        <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                            onClick={() => {
                                setOpen(false);
                                setEditing(null);
                            }}
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h2 className="text-lg font-bold mb-4">
                            {editing ? "Edit Category" : "Add Category"}
                        </h2>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = {
                                    name: e.target.name.value,
                                    description: e.target.description.value,
                                    created_by: 1, // replace with logged-in user ID
                                    modified_by: editing ? 1 : undefined,
                                };
                                handleSave(formData);
                            }}
                            className="flex flex-col gap-4"
                        >
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={editing?.name || ""}
                                    required
                                    className="border rounded-lg p-2 w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    name="description"
                                    defaultValue={editing?.description || ""}
                                    className="border rounded-lg p-2 w-full"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
                            >
                                {editing ? "Update" : "Create"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
