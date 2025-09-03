import { Link, useParams } from "react-router-dom";
import PlainNavBar from "../components/PlainNavBar.jsx";
import Footer from "../sections/Footer.jsx";

export default function OrderDetail() {
    const { orderId } = useParams();

    // Example order (in real app, fetch order by ID from backend)
    const order = {
        id: orderId,
        date: "2025-09-01",
        status: "Delivered",
        total: 350,
        items: [
            {
                id: 1,
                name: "Hydraulic Pump",
                price: 200,
                qty: 1,
                image: "/images/mixer.jpg"
            },
            {
                id: 2,
                name: "Steel Bolts (Pack)",
                price: 150,
                qty: 2,
                image: "/images/steel.jpg"
            },
        ],
    };

    return (
        <>
            <PlainNavBar/>
            <div className="container mx-auto px-4 py-10">
                <h2 className="text-3xl font-bold mb-6">Order #{order.id} Details</h2>

                <div className="mb-4">
                    <p>Date: {order.date}</p>
                    <p>Status: {order.status}</p>
                    <p className="font-bold">Total: ${order.total}</p>
                </div>

                <h3 className="text-xl font-semibold mb-4">Items</h3>
                <div className="space-y-3">
                    {order.items.map((item) => (
                        <div
                            key={item.id}
                            className="p-4 border rounded-lg flex justify-between items-center"
                        >
                            <div className="flex gap-6">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded-md border"
                                />
                                <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                                    <p className="text-sm text-gray-600">Price: ${item.price}</p>
                                </div>
                            </div>
                            <Link
                                to={`/product/${item.id}`}
                                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                            >
                                Buy Again
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}
