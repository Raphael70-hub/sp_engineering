import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ShoppingCart,
    FileDown,
    ArrowLeft,
    XCircle,
} from "lucide-react";
import Sidebar from "../components/Sidebar.jsx";
import axios from "axios";
import { API_BASE_URL } from "../constants/index.js";

export default function AdminOrderDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("");
    const [updating, setUpdating] = useState(false);
    const [notification, setNotification] = useState("");
    const [isErrorNotification, setIsErrorNotification] = useState(false);

    const fetchOrder = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_BASE_URL}/api/orders/${id}`);
            setOrder(res.data);
            setStatus(res.data.status);
        } catch (err) {
            console.error("Failed to fetch order:", err);
            setIsErrorNotification(true);
            showNotification("Failed to fetch order details");
            navigate(-1);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, [id]);

    const handleDownloadInvoice = () => {
        // TODO: Replace with backend invoice endpoint
        showNotification("Invoice downloaded for Order #" + order?.ref);
    };

    const handleStatusChange = async (newStatus) => {
        if (!order || order.status === "completed" || order.status === "cancelled") {
            return;
        }
        setUpdating(true);
        try {
            const res = await axios.patch(`${API_BASE_URL}/api/orders/status/${id}`, { status: newStatus });
            setStatus(newStatus);
            setOrder({ ...order, status: newStatus });
            setIsErrorNotification(false);
            showNotification(res?.data?.message || "Order status updated successfully");
        } catch (err) {
            console.error("Failed to update status:", err);
            setIsErrorNotification(true);
            const errorMessage =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                "Failed to update order status";
            showNotification(errorMessage);
        } finally {
            setUpdating(false);
        }
    };

    const handleCancelOrder = async () => {
        if (!window.confirm("Are you sure you want to cancel this order?")) return;

        setUpdating(true);
        try {
            const res = await axios.patch(`${API_BASE_URL}/api/orders/cancel/${id}`);
            setStatus("cancelled");
            setOrder({ ...order, status: "cancelled" });
            setIsErrorNotification(false);
            showNotification(res?.data?.message || "Order cancelled successfully");
        } catch (err) {
            console.error("Failed to cancel order:", err);
            setIsErrorNotification(true);
            const errorMessage =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                "Failed to cancel order";
            showNotification(errorMessage);
        } finally {
            setUpdating(false);
        }
    };

    const showNotification = (msg) => {
        setNotification(msg);
        setTimeout(() => setNotification(""), 3000);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-600">Loading order details...</p>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-600">Order not found</p>
            </div>
        );
    }

    const isFinalized = order.status === "completed" || order.status === "cancelled";

    return (
        <div className="flex min-h-screen bg-gray-100 overflow-y-hidden">
            <Sidebar />

            <div className="flex-1 md:px-6 py-6 relative">
                {notification && (
                    <div
                        className={`absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded shadow text-white ${
                            isErrorNotification ? "bg-red-500" : "bg-green-500"
                        }`}
                    >
                        {notification}
                    </div>
                )}

                {/* Header */}
                <div>
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center space-x-2 text-orange-600 hover:text-orange-800 mb-6"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Orders</span>
                    </button>

                    <div className="flex justify-between items-center mb-6 md:min-w-full min-w-screen">
                        <h1 className="text-2xl font-bold flex items-center space-x-2">
                            <ShoppingCart className="w-6 h-6 text-orange-500" />
                            <span>{order.ref}</span>
                        </h1>
                        <button
                            onClick={handleDownloadInvoice}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                        >
                            <FileDown className="w-4 h-4" />
                            <span>Download Invoice</span>
                        </button>
                    </div>
                </div>

                {/* Order Info */}
                <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
                    {/* Customer Info */}
                    <div>
                        <h2 className="font-bold text-lg mb-2">Customer Info</h2>
                        <p><strong>Name:</strong> {order.customer_name}</p>
                        <p><strong>Email:</strong> {order.customer_email}</p>
                        {order.customer_phone && <p><strong>Phone:</strong> {order.customer_phone}</p>}
                        <p><strong>Shipping Address:</strong> {order.shipping_address}</p>
                        <p><strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
                        <p><strong>Status:</strong> <span
                            className={`px-2 py-1 text-xs rounded-lg ${
                                order.status === "pending"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : order.status === "processing"
                                        ? "bg-purple-100 text-purple-700"
                                        : order.status === "shipped"
                                            ? "bg-blue-100 text-blue-700"
                                            : order.status === "completed"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                            }`}
                        >
                        {order.status}
                      </span></p>
                    </div>

                    {/* Products */}
                    <div>
                        <h2 className="font-bold text-lg mb-2">Products</h2>
                        <table className="w-full text-sm border-collapse">
                            <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2 text-left">Product</th>
                                <th className="p-2 text-center">Qty</th>
                                <th className="p-2 text-right">Price</th>
                                <th className="p-2 text-right">Total</th>
                            </tr>
                            </thead>
                            <tbody>
                            {(order.items || []).map((item) => (
                                <tr key={item.id} className="border-b">
                                    <td className="p-2">{item.product_name}</td>
                                    <td className="p-2 text-center">{item.quantity}</td>
                                    <td className="p-2 text-right">₦{item.price}</td>
                                    <td className="p-2 text-right">
                                        ₦{(parseFloat(item.price) * item.quantity).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={3} className="p-2 text-right font-bold">Total:</td>
                                <td className="p-2 text-right font-bold">
                                    ₦{parseFloat(order.total_amount).toLocaleString()}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Status + Cancel */}
                    <div className="flex justify-between items-center">
                        {!isFinalized && (
                        <div>
                            <h2 className="font-bold text-lg mb-2">Order Status</h2>
                            <div className="flex space-x-2">
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="p-2 border rounded-lg"
                                    disabled={isFinalized || updating}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="shipped">Shipped</option>
                                    {/*<option value="delivered">Delivered</option>*/}
                                    <option value="completed">Completed</option>
                                    {/*<option value="cancelled">Cancelled</option>*/}
                                </select>
                                <button
                                    onClick={() => handleStatusChange(status)}
                                    disabled={isFinalized || updating}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                                >
                                    {updating ? "Updating..." : "Update"}
                                </button>
                            </div>
                        </div>
                        )}

                        {!isFinalized && (
                            <button
                                onClick={handleCancelOrder}
                                disabled={updating}
                                className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                            >
                                <XCircle className="w-4 h-4" />
                                <span>{updating ? "Cancelling..." : "Cancel Order"}</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
