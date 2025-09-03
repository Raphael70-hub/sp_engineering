// src/pages/AdminOrderDetail.jsx
import { useState } from "react";
import {Package, ShoppingCart, Users, CreditCard, LayoutDashboard, LogOut, FileDown, X, ArrowLeft} from "lucide-react";
import Sidebar from "../components/Sidebar.jsx";
import {useNavigate} from "react-router-dom";

export default function AdminOrderDetail() {
    // const { id } = useParams();
    const navigate = useNavigate();

    // Example order (replace with API later)
    const order = {
        id: 1,
        customer: "John Doe",
        email: "john@example.com",
        status: "Pending",
        date: "2025-09-01",
        products: [
            { id: 1, name: "Cement", qty: 2, price: 15 },
            { id: 2, name: "Mixer", qty: 1, price: 25 },
        ],
        total: 55,
        address: "123 Main Street, Lagos, Nigeria"
    };

    const [status, setStatus] = useState(order.status);

    const handleDownloadInvoice = () => {
        // Later connect to backend
        alert("Invoice downloaded for Order #" + order.id);
    };

    return (
        <>
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="flex-1 p-6">
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
                                <span>Order #{order.id}</span>
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
                    <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
                        <div>
                            <h2 className="font-bold text-lg mb-2">Customer Info</h2>
                            <p><strong>Name:</strong> {order.customer}</p>
                            <p><strong>Email:</strong> {order.email}</p>
                            <p><strong>Address:</strong> {order.address}</p>
                            <p><strong>Date:</strong> {order.date}</p>
                        </div>

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
                                {order.products.map((prod) => (
                                    <tr key={prod.id} className="border-b">
                                        <td className="p-2">{prod.name}</td>
                                        <td className="p-2 text-center">{prod.qty}</td>
                                        <td className="p-2 text-right">${prod.price}</td>
                                        <td className="p-2 text-right">${prod.qty * prod.price}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={3} className="p-2 text-right font-bold">Total:</td>
                                    <td className="p-2 text-right font-bold">${order.total}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <div>
                            <h2 className="font-bold text-lg mb-2">Order Status</h2>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="p-2 border rounded-lg"
                            >
                                <option>Pending</option>
                                <option>Shipped</option>
                                <option>Delivered</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
