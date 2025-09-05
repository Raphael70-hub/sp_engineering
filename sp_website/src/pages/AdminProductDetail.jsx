import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, Trash2, Package } from "lucide-react";
import Sidebar from "../components/Sidebar.jsx";

export default function AdminProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Dummy product data (in real app, fetch by ID)
    const product = {
        id,
        name: "Laptop",
        category: "Electronics",
        price: 1200,
        image: "https://via.placeholder.com/150",
        details: ["16GB RAM", "512GB SSD", "Intel i7 Processor"],
        deliveryInfo: [
            "Free delivery within 3-5 business days",
            "Express shipping available",
        ],
    };

    return (
        <div className="flex min-h-screen bg-gray-100 w-full">
            <Sidebar />

            <div className="w-full flex-1 md:px-8 py-8">
                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 mb-6 text-gray-600 hover:text-orange-600"
                >
                    <ArrowLeft size={18} /> Back
                </button>

                {/* Product Header */}
                <div className="flex items-center gap-4 mb-6">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-32 h-32 rounded-lg border"
                    />
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <Package className="text-orange-500" /> {product.name}
                        </h1>
                        <p className="text-gray-600">Category: {product.category}</p>
                        <p className="text-lg font-semibold mt-1">${product.price}</p>
                    </div>
                </div>

                {/* Product Details */}
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-lg font-semibold mb-3">Product Details</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {product.details.map((d, i) => (
                            <li key={i}>{d}</li>
                        ))}
                    </ul>
                </div>

                {/* Delivery Information */}
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-lg font-semibold mb-3">Delivery Information</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {product.deliveryInfo.map((d, i) => (
                            <li key={i}>{d}</li>
                        ))}
                    </ul>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center gap-2">
                        <Edit size={16} /> Edit
                    </button>
                    <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center gap-2">
                        <Trash2 size={16} /> Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
