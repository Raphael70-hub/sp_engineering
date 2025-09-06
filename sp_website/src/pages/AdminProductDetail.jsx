import { useParams, useNavigate } from "react-router-dom";
import {ArrowLeft, Edit, Trash2, Package, X} from "lucide-react";
import Sidebar from "../components/Sidebar.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constants/index.js";
import ProductForm from "../components/ProductForm.jsx";

export default function AdminProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState("");
    const [isErrorNotification, setIsErrorNotification] = useState(false);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_BASE_URL}/api/products/${id}`);
            setProduct(res.data);
        } catch (err) {
            console.error(err);
            alert("Failed to fetch product");
            navigate(-1);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const handleSave = async (formData) => {
        try {
            setLoading(true);
            let response;
            response = await axios.put(
                `${API_BASE_URL}/api/products/${product.id}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            setIsErrorNotification(false);
            const successMessage = response?.data?.message || "Product updated successfully";
            showNotification(successMessage);
            setOpen(false);
            fetchProduct()
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


    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );
        if (!confirmDelete) return;
        try {
            setLoading(true);
            let response = await axios.delete(`${API_BASE_URL}/api/products/${id}`);
            const message = response?.data?.message ? response.data.message:"Product deleted successfully"
            showNotification(message);
            navigate(-1);
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

    const showNotification = (msg) => {
        setNotification(msg);
        setTimeout(() => setNotification(""), 3000);
    };

    if (loading || !product) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-100 w-full">
            <Sidebar />

            <div className="w-full flex-1 md:px-8 py-8">
                {notification && (
                    <div className={`absolute top-4 left-1/2 z-100 -translate-x-1/2 ${isErrorNotification ? 'bg-red-500' : 'bg-green-500' } text-white px-4 py-2 rounded shadow`}>
                        {notification}
                    </div>
                )}

                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 mb-6 text-gray-600 hover:text-orange-600"
                >
                    <ArrowLeft size={18} /> Back
                </button>

                {/* Product Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
                    <img
                        src={product.image_url ? `${API_BASE_URL}${product.image_url}` : "https://via.placeholder.com/150"}
                        alt={product.name}
                        className="w-32 h-32 rounded-lg border object-cover"
                    />
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <Package className="text-orange-500" /> {product.name}
                        </h1>
                        <p className="text-gray-600">Category: {product.category_name || "-"}</p>
                        <p className="text-lg font-semibold mt-1">
                            {product.product_type === "rental"
                                ? `₦${product.rental_price_per_day}/day`
                                : `₦${product.price}`}
                        </p>
                        {product.product_type !== "rental" && <p className="text-gray-500">Stock: {product.stock}</p>}
                    </div>
                </div>

                {/* Other Images */}
                {product.other_images && product.other_images.length > 0 && (
                    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                        <h2 className="text-lg font-semibold mb-3">Other Images</h2>
                        <div className="flex gap-3 flex-wrap">
                            {product.other_images.map((img, i) => (
                                <img
                                    key={i}
                                    src={`${API_BASE_URL}${img}`}
                                    alt={`other-${i}`}
                                    className="w-24 h-24 object-cover rounded-lg border"
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Product Details */}
                {product.product_details && product.product_details.length > 0 && (
                    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                        <h2 className="text-lg font-semibold mb-3">Product Details</h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            {product.product_details.map((d, i) => (
                                <li key={i}>{d}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Delivery Information */}
                {product.delivery_info && product.delivery_info.length > 0 && (
                    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                        <h2 className="text-lg font-semibold mb-3">Delivery Information</h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            {product.delivery_info.map((d, i) => (
                                <li key={i}>{d}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={() => {
                            setOpen(true);
                        }}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center gap-2"
                    >
                        <Edit size={16} /> Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center gap-2"
                    >
                        <Trash2 size={16} /> Delete
                    </button>
                </div>
            </div>

            {open && (
                <div className="fixed inset-0 bg-black/30 flex md:items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] h-[90%] relative overflow-y-scroll">
                        <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h2 className="text-lg font-bold mb-4">
                            "Edit Product"
                        </h2>
                        <ProductForm product={product} onSave={handleSave} />
                    </div>
                </div>
            )}
        </div>
    );
}
