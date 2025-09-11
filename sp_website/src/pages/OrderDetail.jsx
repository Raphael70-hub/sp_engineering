import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PlainNavBar from "../components/PlainNavBar.jsx";
import Footer from "../sections/Footer.jsx";
import { API_BASE_URL } from "../constants/index.js";
import api from "../api/index.js";

export default function OrderDetail() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await api.get(`/api/orders/${id}`);
                setOrder(response.data);
            } catch (err) {
                setError("Failed to load order details. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    return (
        <>
            <PlainNavBar />
            <div className="container mx-auto px-4 py-10">
                {loading && (
                    <div className="flex justify-center items-center py-10">
                        <div className="w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                {error && <p className="text-red-500">{error}</p>}

                {!loading && !error && order && (
                    <>
                        <h2 className="text-3xl font-bold mb-6">
                            Order {order.ref} Details
                        </h2>

                        <div className="mb-4 space-y-1">
                            <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
                            <p>Status: {order.status}</p>
                            <p className="font-bold">
                                Total: ₦{Number(order.total_amount).toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-600">
                                Customer: {order.customer_name} ({order.customer_email})
                            </p>
                        </div>

                        <h3 className="text-xl font-semibold mb-4">Items</h3>
                        <div className="space-y-3">
                            {order.items?.map((item) => (
                                <div
                                    key={item.id}
                                    className="p-4 border rounded-lg flex justify-between items-center"
                                >
                                    <div className="flex gap-6">
                                        <img
                                            src={API_BASE_URL + item.product_image || "/images/placeholder.png"}
                                            alt={item.name}
                                            className="w-20 h-20 object-cover rounded-md border"
                                        />
                                        <div>
                                            <p className="font-medium">{item.product_name}</p>
                                            <p className="text-sm text-gray-600">
                                                Qty: {item.quantity}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Price: ₦{Number(item.price).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                    <Link
                                        to={`/product/${item.product_id}`}
                                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                                    >
                                        Buy Again
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </>
    );
}
