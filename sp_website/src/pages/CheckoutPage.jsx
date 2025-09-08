import { ShoppingBag } from "lucide-react";
import { Card, CardContent } from "../components/Card.jsx";
import Footer from "../sections/Footer.jsx";
import PlainNavBar from "../components/PlainNavBar.jsx";
import { useCart } from "../context/CartContext"; // Import cart context
import { useState } from "react";
import {API_BASE_URL} from "../constants/index.js";

function CheckoutPage() {
    const { cartItems } = useCart(); // Get cart items from context
    const [paymentMethod, setPaymentMethod] = useState("");

    const getRentalDays = (start, end) => {
        if (!start || !end) return 0;
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffTime = endDate - startDate;
        if (diffTime < 0) return 0;
        return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1; // include both start & end
    };

    // Subtotal (products only)
    const subtotal = cartItems.reduce((acc, item) => {
        if (item.type === "rental") {
            const days = getRentalDays(item.start_date, item.end_date);
            return acc + item.rental_price_per_day * days * item.quantity;
        } else {
            return acc + item.price * item.quantity;
        }
    }, 0);

    // Shipping total
    const shippingTotal = cartItems.reduce((acc, item) => {
        const fee = item.shipping_fee || 0;
        return acc + fee * 1.00;
    }, 0);

    const totalPrice = subtotal + shippingTotal;

    const handleCheckout = async (e) => {
        e.preventDefault();

        if (!paymentMethod) {
            alert("Please select a payment method");
            return;
        }

        // Transform cartItems → items for backend
        const items = cartItems.map(item => ({
            product_id: item.id,            // backend expects product_id
            quantity: item.quantity,        // already exists
            price: item.type === "rental"
                ? item.rental_price_per_day
                : item.price,
            start_date: item.start_date || null, // optional (only for rentals)
            end_date: item.end_date || null      // optional (only for rentals)
        }));

        const payload = {
            user_id: 1, // TODO: replace with logged-in user
            items,
            created_by: 1, // or whoever is creating it
            status: "pending",
            shipping_address: "123 Construction Site Road, Lagos",
            email: "customer@example.com", // Paystack requires email
        };

        try {
            const res = await fetch(`${API_BASE_URL}/api/payments/paystack/initiate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (data.authorization_url) {
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
            <div className="max-w-5xl mx-auto p-6">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                    <ShoppingBag className="w-8 h-8 text-blue-600" />
                    Checkout
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Order Summary */}
                    <div className="md:col-span-1">
                        <Card className="shadow-lg">
                            <CardContent className="p-4">
                                <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                                {cartItems.length === 0 ? (
                                    <p className="text-gray-600">Your cart is empty.</p>
                                ) : (
                                    <div className="space-y-4">
                                        {cartItems.map((item, index) => {
                                            const isRental = item.type === "rental";
                                            const days = isRental ? getRentalDays(item.start_date, item.end_date) : 1;
                                            const unitPrice = isRental ? item.rental_price_per_day : item.price;
                                            const lineTotal = unitPrice * days * item.quantity;
                                            const shippingCost = (item.shipping_fee || 0) * item.quantity;

                                            return (
                                                <div
                                                    key={index}
                                                    className="flex flex-col border-b pb-2"
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <p className="font-medium">{item.name}</p>
                                                            {isRental ? (
                                                                <p className="text-sm text-gray-500">
                                                                    {item.quantity} × ₦{unitPrice.toLocaleString()}/day <br />
                                                                    {item.start_date} → {item.end_date}
                                                                </p>
                                                            ) : (
                                                                <p className="text-sm text-gray-500">
                                                                    {item.quantity} × ₦{unitPrice.toLocaleString()}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <p className="font-semibold">
                                                            ₦{lineTotal.toLocaleString()}
                                                        </p>
                                                    </div>
                                                    {shippingCost > 0 && (
                                                        <p className="text-sm text-gray-500 text-right">
                                                            Shipping: ₦{shippingCost.toLocaleString()}
                                                        </p>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                                <div className="mt-6 space-y-2 text-lg">
                                    <div className="flex justify-between">
                                        <span>Subtotal:</span>
                                        <span>₦{subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping:</span>
                                        <span>₦{shippingTotal.toLocaleString()}</span>
                                    </div>
                                    <hr className="my-2" />
                                    <div className="flex justify-between font-bold text-xl">
                                        <span>Total:</span>
                                        <span>₦{totalPrice.toLocaleString()}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Billing & Shipping Info */}
                    <div className="md:col-span-2">
                        <Card className="shadow-lg">
                            <CardContent className="p-6 space-y-6">
                                <h3 className="text-xl font-semibold">Billing Information</h3>
                                <form
                                    onSubmit={handleCheckout}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                >
                                    <input
                                        type="text"
                                        placeholder="Shipping Address"
                                        className="border p-3 rounded-lg col-span-2"
                                        required
                                    />

                                    <h3 className="text-xl font-semibold col-span-2">
                                        Payment Method
                                    </h3>
                                    <div className="space-y-3 col-span-2">
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="paystack"
                                                className="h-4 w-4"
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                            />
                                            <span>Paystack</span>
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="flutterwave"
                                                className="h-4 w-4"
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                            />
                                            <span>Flutterwave</span>
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="stripe"
                                                className="h-4 w-4"
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                            />
                                            <span>Stripe</span>
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full btn text-lg col-span-2"
                                        disabled={cartItems.length === 0}
                                    >
                                        Confirm & Pay ₦{totalPrice.toLocaleString()}
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

export default CheckoutPage;
