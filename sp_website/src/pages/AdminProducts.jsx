import { useState } from "react";
import {
    Plus,
    Edit,
    Trash2,
    Upload,
    Package,
    X,
    LayoutDashboard,
    ShoppingCart,
    Users,
    CreditCard,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";

export default function AdminProducts() {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Cement",
            category: "Construction",
            price: 15,
            image: "",
            details: ["50kg Bag", "Grey"],
            deliveryInfo: ["2-3 days delivery"],
        },
        {
            id: 2,
            name: "Mixer",
            category: "Construction",
            price: 25,
            image: "",
            details: ["500L Capacity"],
            deliveryInfo: ["5-7 days delivery"],
        },
    ]);
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(null);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    // Pagination
    const [page, setPage] = useState(1);
    const pageSize = 5;

    const navigate = useNavigate();

    // Apply filters
    const filteredProducts = products.filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === "All" || p.category === category;
        const matchesMin = minPrice === "" || p.price >= parseFloat(minPrice);
        const matchesMax = maxPrice === "" || p.price <= parseFloat(maxPrice);
        return matchesSearch && matchesCategory && matchesMin && matchesMax;
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredProducts.length / pageSize);
    const paginatedProducts = filteredProducts.slice(
        (page - 1) * pageSize,
        page * pageSize
    );

    const handleSave = (product) => {
        if (editing) {
            setProducts(
                products.map((p) =>
                    p.id === editing.id ? { ...product, id: p.id } : p
                )
            );
        } else {
            setProducts([...products, { ...product, id: products.length + 1 }]);
        }
        setOpen(false);
        setEditing(null);
    };

    const handleDelete = (id) => setProducts(products.filter((p) => p.id !== id));



    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <div className="w-full p-6">
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
                <div className="bg-white shadow-md rounded-lg p-4 mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border rounded-lg p-2 w-full"
                    />

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border rounded-lg p-2 w-full"
                    >
                        <option value="All">All Categories</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Appliances">Appliances</option>
                    </select>

                    <input
                        type="number"
                        placeholder="Min Price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="border rounded-lg p-2 w-full"
                    />

                    <input
                        type="number"
                        placeholder="Max Price"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="border rounded-lg p-2 w-full"
                    />
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-100 text-gray-700 text-sm">
                            <tr>
                                <th className="p-3 text-left">Image</th>
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Category</th>
                                <th className="p-3 text-left">Price</th>
                                <th className="p-3 text-left">Details</th>
                                <th className="p-3 text-left">Delivery Info</th>
                                <th className="p-3 text-right">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {paginatedProducts.map((p) => (
                                <tr key={p.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">
                                        {p.image ? (
                                            <img
                                                src={p.image}
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
                                    <td className="p-3">{p.category}</td>
                                    <td className="p-3">${p.price}</td>
                                    {/* Details preview */}
                                    <td className="p-3 text-sm text-gray-600">
                                        {p.details && p.details.length > 0
                                            ? `${p.details.slice(0, 2).join(", ")}${
                                                p.details.length > 2 ? "..." : ""
                                            }`
                                            : "-"}
                                    </td>
                                    {/* Delivery preview */}
                                    <td className="p-3 text-sm text-gray-600">
                                        {p.deliveryInfo && p.deliveryInfo.length > 0
                                            ? `${p.deliveryInfo.slice(0, 2).join(", ")}${
                                                p.deliveryInfo.length > 2 ? "..." : ""
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
                <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
                        {/* Close Button */}
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

function ProductForm({ product, onSave }) {
    const [name, setName] = useState(product?.name || "");
    const [category, setCategory] = useState(product?.category || "");
    const [price, setPrice] = useState(product?.price || "");
    const [image, setImage] = useState(product?.image || "");
    const [details, setDetails] = useState(product?.details || []);
    const [deliveryInfo, setDeliveryInfo] = useState(product?.deliveryInfo || []);
    const [detailInput, setDetailInput] = useState("");
    const [deliveryInput, setDeliveryInput] = useState("");

    const addDetail = () => {
        if (detailInput.trim()) {
            setDetails([...details, detailInput]);
            setDetailInput("");
        }
    };

    const addDelivery = () => {
        if (deliveryInput.trim()) {
            setDeliveryInfo([...deliveryInfo, deliveryInput]);
            setDeliveryInput("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ name, category, price, image, details, deliveryInfo });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
                <label className="block text-sm font-medium">Product Name</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-lg"
                    placeholder="Enter product name"
                    required
                />
            </div>

            {/* Category */}
            <div>
                <label className="block text-sm font-medium">Category</label>
                <input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-lg"
                    placeholder="e.g. Toiletries"
                    required
                />
            </div>

            {/* Price */}
            <div>
                <label className="block text-sm font-medium">Price ($)</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-lg"
                    placeholder="Enter price"
                    required
                />
            </div>

            {/* Image Upload */}
            <div>
                <label className="block text-sm font-medium">Product Image</label>
                <div className="flex items-center space-x-3 mt-1">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
                        className="hidden"
                        id="upload"
                    />
                    <label
                        htmlFor="upload"
                        className="cursor-pointer px-3 py-2 border rounded-lg flex items-center space-x-2 hover:bg-gray-100"
                    >
                        <Upload className="w-4 h-4 text-gray-500" />
                        <span>Upload</span>
                    </label>
                    {image && (
                        <img
                            src={image}
                            alt="Preview"
                            className="w-12 h-12 rounded-lg object-cover"
                        />
                    )}
                </div>
            </div>

            {/* Product Details */}
            <div>
                <label className="block text-sm font-medium">Product Details</label>
                <div className="flex gap-2 mt-1">
                    <input
                        type="text"
                        value={detailInput}
                        onChange={(e) => setDetailInput(e.target.value)}
                        placeholder="Add detail..."
                        className="border rounded-lg p-2 flex-1"
                    />
                    <button
                        type="button"
                        onClick={addDetail}
                        className="px-3 py-1 bg-orange-500 text-white rounded-lg"
                    >
                        Add
                    </button>
                </div>
                <ul className="mt-2 list-disc list-inside text-gray-700">
                    {details.map((d, i) => (
                        <li key={i}>{d}</li>
                    ))}
                </ul>
            </div>

            {/* Delivery Info */}
            <div>
                <label className="block text-sm font-medium">Delivery Info</label>
                <div className="flex gap-2 mt-1">
                    <input
                        type="text"
                        value={deliveryInput}
                        onChange={(e) => setDeliveryInput(e.target.value)}
                        placeholder="Add delivery info..."
                        className="border rounded-lg p-2 flex-1"
                    />
                    <button
                        type="button"
                        onClick={addDelivery}
                        className="px-3 py-1 bg-orange-500 text-white rounded-lg"
                    >
                        Add
                    </button>
                </div>
                <ul className="mt-2 list-disc list-inside text-gray-700">
                    {deliveryInfo.map((d, i) => (
                        <li key={i}>{d}</li>
                    ))}
                </ul>
            </div>

            {/* Submit */}
            <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg"
            >
                Save Product
            </button>
        </form>
    );
}
