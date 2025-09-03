import { Link } from "react-router-dom";
import PlainNavBar from "../components/PlainNavBar.jsx";
import Footer from "../sections/Footer.jsx";

export default function OrderHistory() {
    // Example orders (in real app, fetch from backend)
    const orders = [
        { id: 1, date: "2025-09-01", total: 350, status: "Delivered" },
        { id: 2, date: "2025-08-15", total: 120, status: "Pending" },
    ];

    return (
        <>
            <PlainNavBar/>
            <div className="container mx-auto px-4 py-10">
                <h2 className="text-3xl font-bold mb-6">Order History</h2>

                {orders.length === 0 ? (
                    <p>You have no past orders.</p>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="p-5 border rounded-xl flex justify-between items-center"
                            >
                                <div>
                                    <p className="font-semibold">Order #{order.id}</p>
                                    <p className="text-sm text-gray-600">
                                        Date: {order.date} | Status: {order.status}
                                    </p>
                                    <p className="text-lg font-bold">${order.total}</p>
                                </div>
                                <Link
                                    to={`/orders/${order.id}`}
                                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                                >
                                    View Details
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}
