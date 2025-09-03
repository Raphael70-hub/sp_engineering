import { useState } from "react";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import PlainNavBar from "../components/PlainNavBar.jsx";
import Footer from "../sections/Footer.jsx";

function CartPage() {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Steel Pipe",
            price: 120,
            quantity: 2,
            image: "/images/steel.jpg"
        },
        {
            id: 2,
            name: "Welding Machine",
            price: 500,
            quantity: 1,
            image: "/images/mixer.jpg"
        }
    ]);

    const updateQuantity = (id, type) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id
                    ? {
                        ...item,
                        quantity:
                            type === "increase" ? item.quantity + 1 : Math.max(1, item.quantity - 1)
                    }
                    : item
            )
        );
    };

    const removeItem = id => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <>
            <PlainNavBar/>

            <div className="max-w-6xl mx-auto px-6 py-12">
                <h2 className="text-3xl font-bold mb-6">
                    <ShoppingCart className="w-8 h-8 text-orange-600 inline-flex mx-3" />
                    Cart
                </h2>

                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <ShoppingCart className="w-16 h-16 text-gray-400 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Your cart is empty!</h3>
                        <p className="text-gray-600 mb-6">
                            Browse our categories and discover our best deals!
                        </p>
                        <Link to="/products">
                            <button className="btn">
                                Start Shopping
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* CartPage Items */}
                        <div className="md:col-span-2 bg-white shadow-md rounded-lg p-6">
                            {cartItems.map(item => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between border-b py-4"
                                >
                                    <div className="flex items-center space-x-4">
                                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                        <div>
                                            <h4 className="font-semibold">{item.name}</h4>
                                            <p className="text-gray-600">${item.price}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <button
                                            onClick={() => updateQuantity(item.id, "decrease")}
                                            className="p-2 border rounded hover:bg-gray-100"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, "increase")}
                                            className="p-2 border rounded hover:bg-gray-100"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                            <p className="flex justify-between mb-2">
                                <span>Subtotal</span> <span>${subtotal.toFixed(2)}</span>
                            </p>
                            <p className="flex justify-between mb-2">
                                <span>Shipping</span> <span>$20.00</span>
                            </p>
                            <hr className="my-3" />
                            <p className="flex justify-between font-bold text-lg">
                                <span>Total</span> <span>${(subtotal + 20).toFixed(2)}</span>
                            </p>

                            <Link
                                to="/checkout"
                                className="block mt-4 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700"
                            >
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
}

export default CartPage;
