import { Calendar, ShoppingBag } from "lucide-react";
import { Card, CardContent } from "../components/Card.jsx";
import Footer from "../sections/Footer.jsx";
import PlainNavBar from "../components/PlainNavBar.jsx";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { API_BASE_URL } from "../constants/index.js";

function CheckoutRentalPage() {
    const { rentalCart, clearRentalCart } = useCart();
    const [shippingAddress, setShippingAddress] = useState("");

    const getRentalDays = (start, end) => {
        if (!start || !end) return 0;
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffTime = endDate - startDate;
        if (diffTime < 0) return 0;
        return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    };

    let subtotal = 0;
    let shippingFee = 0;
    if (rentalCart) {
        const days = getRentalDays(rentalCart.start_date, rentalCart.end_date);
        subtotal = rentalCart.rental_price_per_day * days * (rentalCart.quantity || 1);
        shippingFee = rentalCart.shipping_fee || 0;
    }
    const totalPrice = subtotal + shippingFee;

    const handleCheckout = async (e) => {
        e.preventDefault();
        if (!rentalCart) return alert("Rental cart is empty");

        const items = [{
            product_id: rentalCart.id,
            quantity: rentalCart.quantity || 1,
            price: rentalCart.rental_price_per_day,
            start_date: rentalCart.start_date,
            end_date: rentalCart.end_date,
        }];

        const payload = {
            user_id: 1,
            items,
            created_by: 1,
            status: "pending",
            shipping_address: shippingAddress,
            email: "customer@example.com",
            type: "rental",
        };

        try {
            const res = await fetch(`${API_BASE_URL}/api/payments/paystack/initiate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (data.authorization_url) {
                clearRentalCart();
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
                    Checkout Rental
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Order Summary */}
                    <div className="md:col-span-1">
                        <Card>
                            <CardContent className="p-4">
                                <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                                {!rentalCart ? (
                                    <p className="text-gray-600">Your rental cart is empty.</p>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="flex justify-between border-b pb-2">
                                            <div>
                                                <p className="font-medium">{rentalCart.name}</p>
                                                <p className="text-sm text-gray-500">
                                                    {rentalCart.quantity || 1} × ₦{rentalCart.rental_price_per_day.toLocaleString()}/day
                                                </p>
                                                <p className="text-sm text-gray-500 flex items-center gap-1">
                                                    <Calendar size={14} /> {rentalCart.start_date} → {rentalCart.end_date}
                                                </p>
                                            </div>
                                            <p className="font-semibold">₦{subtotal.toLocaleString()}</p>
                                        </div>
                                        <div className="mt-4 space-y-2 text-lg">
                                            <div className="flex justify-between">
                                                <span>Subtotal:</span>
                                                <span>₦{subtotal.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Shipping:</span>
                                                <span>₦{shippingFee.toLocaleString()}</span>
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
                                        disabled={!rentalCart}
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

export default CheckoutRentalPage;
