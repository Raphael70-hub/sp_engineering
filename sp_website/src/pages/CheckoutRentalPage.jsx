import { Calendar, ShoppingBag } from "lucide-react";
import { Card, CardContent } from "../components/Card.jsx";
import Footer from "../sections/Footer.jsx";
import PlainNavBar from "../components/PlainNavBar.jsx";
import { useCart } from "../context/CartContext";
import {useEffect, useState} from "react";
import { API_BASE_URL } from "../constants/index.js";
import api, {getCurrentUser} from "../api/index.js";

function CheckoutRentalPage() {
    const { rentalsCart, clearRentalCart } = useCart();
    const [shippingAddress, setShippingAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const data = await getCurrentUser();
                setUser(data);
            } catch (err) {
                console.error("Failed to load user:", err);
            }
        };
        loadUser();
    }, []);


    if (!user) {
        return (
            <>
                <PlainNavBar />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <p className="text-gray-500">Loading profile...</p>
                </div>
                <Footer />
            </>
        );
    }

    const getRentalDays = (start, end) => {
        if (!start || !end) return 0;
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffTime = endDate - startDate;
        if (diffTime < 0) return 0;
        return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    };

    const rentalItems = rentalsCart || [];

    const items = rentalItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity || 1,
        price: item.rental_price_per_day,
        start_date: item.start_date,
        end_date: item.end_date,
    }));

    const rentalSubtotal = rentalItems.reduce((total, item) => {
        const days = getRentalDays(item.start_date, item.end_date);
        return total + item.rental_price_per_day * (item.quantity || 1) * days;
    }, 0);

    const shippingFee = rentalItems.reduce((total, item) => total + (item.shipping_fee || 0), 0);

    const totalPrice = rentalSubtotal + shippingFee;

    const handleCheckout = async () => {
        if (!rentalItems.length) return alert("Rental cart is empty");

        const payload = {
            user_id: user.id,
            created_by: user.id,
            email: user.email,
            type: "rental",
            status: "pending",
            shipping_address: shippingAddress,
            phone_number: phoneNumber,
            items,
        };

        try {
            setLoading(true);
            // const res = await fetch(`${API_BASE_URL}/api/payments/paystack/initiate`, {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify(payload),
            // });

            const res = await api.post(`/api/payments/paystack/initiate`, payload);
            const data = await res.data;
            if (data.authorization_url) {
                clearRentalCart();
                window.location.href = data.authorization_url;
            } else {
                alert("Error starting payment: " + (data.error || "Unknown"));
            }
        } catch (err) {
            clearRentalCart();
            console.error("Checkout failed", err);
            alert("Checkout failed");
        }
        finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

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
                                {rentalItems.length === 0 ? (
                                    <p className="text-gray-600">Your rental cart is empty.</p>
                                ) : (
                                    <div className="space-y-4">
                                        {rentalItems.map((item) => {
                                            const days = getRentalDays(item.start_date, item.end_date);
                                            const itemTotal = item.rental_price_per_day * days * (item.quantity || 1);

                                            return (
                                                <div
                                                    key={item.id}
                                                    className="flex justify-between border-b pb-2"
                                                >
                                                    <div>
                                                        <p className="font-medium">{item.name}</p>
                                                        <p className="text-sm text-gray-500">
                                                            {item.quantity || 1} × ₦{item.rental_price_per_day.toLocaleString()}/day
                                                        </p>
                                                        <p className="text-sm text-gray-500 flex items-center gap-1">
                                                            <Calendar size={14} /> {item.start_date} → {item.end_date}
                                                        </p>
                                                    </div>
                                                    <p className="font-semibold">₦{itemTotal.toLocaleString()}</p>
                                                </div>
                                            );
                                        })}

                                        {/* Totals */}
                                        <div className="mt-4 space-y-2 text-lg">
                                            <div className="flex justify-between">
                                                <span>Subtotal:</span>
                                                <span>₦{rentalSubtotal.toLocaleString()}</span>
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
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        setShowModal(true);
                                    }}
                                    className="grid grid-cols-1 gap-4"
                                >
                                    <input
                                        type="text"
                                        placeholder="Shipping Address"
                                        value={shippingAddress}
                                        onChange={(e) => setShippingAddress(e.target.value)}
                                        className="border p-3 rounded-lg col-span-2"
                                        required
                                    />

                                    <input
                                        type="text"
                                        placeholder="Phone Number"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        className="border p-3 rounded-lg col-span-2"
                                        required
                                    />

                                    <button
                                        type="submit"
                                        className="w-full bg-orange-600 text-white py-3 rounded-lg text-lg hover:bg-orange-700 disabled:bg-gray-400"
                                        disabled={rentalItems.length === 0}
                                    >
                                        Confirm & Pay ₦{totalPrice.toLocaleString()} (Paystack)
                                    </button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Custom Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/30 bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                        <h2 className="text-xl font-bold mb-4">Confirm Your Rental Order</h2>
                        <p className="mb-6">
                            Are you sure you want to pay ₦{totalPrice.toLocaleString()} for your rental order?
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    handleCheckout();
                                }}
                                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}

export default CheckoutRentalPage;
