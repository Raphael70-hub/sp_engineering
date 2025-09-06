import { useState, useEffect } from "react";
import {
    Plus,
    Edit,
    Trash2,
    Upload,
    Package,
    X,
    Eye,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar.jsx";
import ProductForm from "../components/ProductForm.jsx";
import { API_BASE_URL } from "../constants/index.js";

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState("");
    const [isErrorNotification, setIsErrorNotification] = useState(false);

    const [categories, setCategories] = useState([]);

    const [filterCategory, setFilterCategory] = useState("");
    const [filterType, setFilterType] = useState("");
    const [filterMinPrice, setFilterMinPrice] = useState("");
    const [filterMaxPrice, setFilterMaxPrice] = useState("");
    const [filterSearch, setFilterSearch] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/categories`);
                setCategories(res.data.categories || []);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCategories();
    }, []);

    // Pagination
    const [page, setPage] = useState(1);
    const pageSize = 5;

    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            setLoading(true);

            const params = {
                page,
                limit: pageSize,
                category_id: filterCategory || undefined,
                product_type: filterType || undefined,
                min_price: filterMinPrice || undefined,
                max_price: filterMaxPrice || undefined,
                search: filterSearch || undefined,
            };

            const res = await axios.get(`${API_BASE_URL}/api/products`, { params });
            setProducts(res.data.products || []);
        } catch (err) {
            console.error(err);
            setIsErrorNotification(true);
            showNotification("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [page, filterCategory, filterType]);


    const totalPages = Math.ceil(products.length / pageSize);
    const paginatedProducts = products.slice(
        (page - 1) * pageSize,
        page * pageSize
    );

    const showNotification = (msg) => {
        setNotification(msg);
        setTimeout(() => setNotification(""), 3000);
    };

    const handleSave = async (formData) => {
        try {
            setLoading(true);
            let response;
            if (editing) {
                // Update product
                response = await axios.put(
                    `${API_BASE_URL}/api/products/${editing.id}`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
                setIsErrorNotification(false);
                const successMessage = response?.data?.message || "Product updated successfully";
                showNotification(successMessage);
            } else {
                // Create product
                response = await axios.post(`${API_BASE_URL}/api/products`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                setIsErrorNotification(false);
                const successMessage = response?.data?.message || "Product created successfully";
                showNotification(successMessage);
            }
            setOpen(false);
            setEditing(null);
            fetchProducts();
        } catch (err) {
            console.error(err);
            setIsErrorNotification(true);
            const errorMessage =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                "An error occurred. Please try again.";

            showNotification(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );
        if (!confirmDelete) return;
        try {
            setLoading(true);
            let response = await axios.delete(`${API_BASE_URL}/api/products/${id}`);
            const message = response?.data?.message ? response.data.message:"Product deleted successfully"
            showNotification(message);
            fetchProducts();
        } catch (err) {
            console.error(err);
            setIsErrorNotification(true);
            const errorMessage =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                "An error occurred. Please try again.";

            showNotification(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );

    return (
        <div className="flex min-h-screen bg-gray-100 overflow-y-hidden">
            <Sidebar />

            <div className="w-full md:px-6 py-6 relative">
                {notification && (
                    <div className={`absolute top-4 left-1/2 z-100 -translate-x-1/2 ${isErrorNotification ? 'bg-red-500' : 'bg-green-500' } text-white px-4 py-2 rounded shadow`}>
                        {notification}
                    </div>
                )}

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold flex items-center space-x-2">
                        <Package className="w-6 h-6 text-orange-500" />
                        <span>Products</span>
                    </h1>
                    <button
                        onClick={() => setOpen(true)}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add Product</span>
                    </button>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-4 items-end bg-white shadow p-6 rounded-lg">
                    <div>
                        <label className="block text-sm font-medium">Search</label>
                        <input
                            type="text"
                            value={filterSearch}
                            onChange={(e) => setFilterSearch(e.target.value)}
                            placeholder="Search products..."
                            className="border rounded-lg p-2 shadow-sm focus:ring focus:ring-orange-300 w-40"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Category</label>
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="border rounded-lg p-2 shadow-sm focus:ring focus:ring-orange-300 w-40"
                        >
                            <option value="">All Categories</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Type</label>
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="border rounded-lg p-2 shadow-sm focus:ring focus:ring-orange-300 w-40"
                        >
                            <option value="">All Types</option>
                            <option value="product">Product</option>
                            <option value="rental">Rental</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Min Price</label>
                        <input
                            type="number"
                            value={filterMinPrice}
                            onChange={(e) => setFilterMinPrice(e.target.value)}
                            placeholder="₦0"
                            className="border rounded-lg p-2 shadow-sm focus:ring focus:ring-orange-300 w-24"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Max Price</label>
                        <input
                            type="number"
                            value={filterMaxPrice}
                            onChange={(e) => setFilterMaxPrice(e.target.value)}
                            placeholder="₦99999"
                            className="border rounded-lg p-2 shadow-sm focus:ring focus:ring-orange-300 w-24"
                        />
                    </div>

                    <button
                        onClick={() => {
                            setPage(1);
                            fetchProducts();
                        }}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
                    >
                        Apply Filters
                    </button>

                    <button
                        onClick={() => {
                            setFilterCategory("");
                            setFilterType("");
                            setFilterMinPrice("");
                            setFilterMaxPrice("");
                            setFilterSearch("");
                            setPage(1);
                            fetchProducts();
                        }}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg"
                    >
                        Reset
                    </button>
                </div>



                {/* Products Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-100 text-gray-700 text-sm">
                            <tr>
                                <th className="p-3 text-left">Image</th>
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Type</th>
                                <th className="p-3 text-left">Category</th>
                                <th className="p-3 text-left">Price</th>
                                <th className="p-3 text-left">Stock</th>
                                <th className="p-3 text-left">Details</th>
                                <th className="p-3 text-right">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {paginatedProducts.map((p) => (
                                <tr key={p.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">
                                        {p.image_url ? (
                                            <img
                                                src={`${API_BASE_URL}${p.image_url}`}
                                                alt={p.name}
                                                className="w-12 h-12 object-cover rounded-lg"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                                <Package className="w-5 h-5 text-gray-500" />
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-3 font-medium">{p.name}</td>
                                    <td className="p-3">{p.product_type}</td>
                                    <td className="p-3">{p.category_name || "-"}</td>
                                    <td className="p-3">
                                        {p.product_type === "rental"
                                            ? `₦${p.rental_price_per_day || "-"}/day`
                                            : `₦${p.price || "-"}`}
                                    </td>
                                    <td className="p-3">{p.stock}</td>
                                    <td className="p-3 text-sm text-gray-600">
                                        {p.product_details
                                            ? `${p.product_details.slice(0, 2).join(", ")}${
                                                p.product_details.length > 2 ? "..." : ""
                                            }`
                                            : "-"}
                                    </td>
                                    <td className="p-3 text-right flex justify-end space-x-3">
                                        <button
                                            className="text-blue-600 hover:text-blue-800"
                                            onClick={() => {
                                                setEditing(p);
                                                setOpen(true);
                                            }}
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            className="text-green-600 hover:text-green-800"
                                            onClick={() => navigate(`/admin/products/${p.id}`)}
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button
                                            className="text-red-600 hover:text-red-800"
                                            onClick={() => handleDelete(p.id)}
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

            {/* Add/Edit Product Modal */}
            {open && (
                <div className="fixed inset-0 bg-black/30 flex md:items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] h-[90%] relative overflow-y-scroll">
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
                            {editing ? "Edit Product" : "Add Product"}
                        </h2>
                        <ProductForm product={editing} onSave={handleSave} />
                    </div>
                </div>
            )}
        </div>
    );
}
