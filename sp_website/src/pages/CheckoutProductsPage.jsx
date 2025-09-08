import { ShoppingBag } from "lucide-react";
import { Card, CardContent } from "../components/Card.jsx";
import Footer from "../sections/Footer.jsx";
import PlainNavBar from "../components/PlainNavBar.jsx";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { API_BASE_URL } from "../constants/index.js";

function CheckoutProductsPage() {
    const { productsCart, clearProductsCart } = useCart();
    const [shippingAddress, setShippingAddress] = useState("");

    const productsSubtotal = productsCart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const productsShipping = productsCart.reduce(
        (acc, item) => acc + (item.shipping_fee || 0),
        0
    );
    const totalPrice = productsSubtotal + productsShipping;


    const handleCheckout = async (e) => {
        e.preventDefault();
        if (!productsCart.length) return alert("Your product cart is empty");

        const items = productsCart.map((item) => ({
            product_id: item.id,
            quantity: item.quantity,
            price: item.price,
            start_date: null,
            end_date: null,
        }));

        const payload = {
            user_id: 1,
            items,
            created_by: 1,
            status: "pending",
            shipping_address: shippingAddress,
            email: "customer@example.com",
            type: "product",
        };

        try {
            const res = await fetch(`${API_BASE_URL}/api/payments/paystack/initiate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (data.authorization_url) {
                clearProductsCart();
                window.location.href = data.authorization_url;
            } else {
                alert("Error starting payment: " + (data.error || "Unknown"));
            }
        } catch (err) {
            console.error("Checkout failed", err);
            alert("Checkout failed");
        }
    };

    return (
        <>
            <PlainNavBar />
            <div className="max-w-6xl mx-auto p-4 md:p-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
                    <ShoppingBag className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                    Checkout Products
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Order Summary */}
                    <div className="md:col-span-1">
                        <Card>
                            <CardContent className="p-4">
                                <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                                {productsCart.length === 0 ? (
                                    <p className="text-gray-600">Your product cart is empty.</p>
                                ) : (
                                    <div className="space-y-4">
                                        {productsCart.map((item, index) => (
                                            <div key={index} className="flex justify-between border-b pb-2">
                                                <div>
                                                    <p className="font-medium">{item.name}</p>
                                                    <p className="text-sm text-gray-500">
                                                        {item.quantity} × ₦{item.price.toLocaleString()}
                                                    </p>
                                                </div>
                                                <p className="font-semibold">
                                                    ₦{(item.price * item.quantity).toLocaleString()}
                                                </p>
                                            </div>
                                        ))}
                                        <div className="mt-4 space-y-2 text-lg">
                                            <div className="flex justify-between">
                                                <span>Subtotal:</span>
                                                <span>₦{productsSubtotal.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Shipping:</span>
                                                <span>₦{productsShipping.toLocaleString()}</span>
                                            </div>
                                            <hr className="my-2" />
                                            <div className="flex justify-between font-bold text-xl">
                                                <span>Total:</span>
                                                <span>₦{totalPrice.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Billing Info */}
                    <div className="md:col-span-2">
                        <Card>
                            <CardContent className="p-6 space-y-6">
                                <form onSubmit={handleCheckout} className="grid grid-cols-1 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Shipping Address"
                                        value={shippingAddress}
                                        onChange={(e) => setShippingAddress(e.target.value)}
                                        className="border p-3 rounded-lg col-span-2"
                                        required
                                    />

                                    <button
                                        type="submit"
                                        className="w-full bg-orange-600 text-white py-3 rounded-lg text-lg hover:bg-orange-700 disabled:bg-gray-400"
                                        disabled={productsCart.length === 0}
                                    >
                                        Confirm & Pay ₦{totalPrice.toLocaleString()} (Paystack)
                                    </button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CheckoutProductsPage;
