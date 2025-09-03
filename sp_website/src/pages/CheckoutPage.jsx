import { ShoppingBag } from "lucide-react";
import {Card, CardContent} from "../components/Card.jsx";
import Footer from "../sections/Footer.jsx";
import PlainNavBar from "../components/PlainNavBar.jsx";


function CheckoutPage() {
    const cartItems =[
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
    ];

    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <>
            <PlainNavBar/>
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
                                <div className="space-y-4">
                                    {cartItems.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center border-b pb-2"
                                        >
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
                                </div>
                                <div className="flex justify-between mt-6 text-lg font-bold">
                                    <span>Total:</span>
                                    <span>₦{totalPrice.toLocaleString()}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Billing & Shipping Info */}
                    <div className="md:col-span-2">
                        <Card className="shadow-lg">
                            <CardContent className="p-6 space-y-6">
                                <h3 className="text-xl font-semibold">Billing Information</h3>
                                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="border p-3 rounded-lg"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="border p-3 rounded-lg"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Phone Number"
                                        className="border p-3 rounded-lg"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Address"
                                        className="border p-3 rounded-lg col-span-2"
                                    />
                                </form>

                                <h3 className="text-xl font-semibold">Payment Method</h3>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="payment" className="h-4 w-4" />
                                        <span>Paystack</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="payment" className="h-4 w-4" />
                                        <span>Flutterwave</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="payment" className="h-4 w-4" />
                                        <span>Stripe</span>
                                    </label>
                                </div>

                                <button className="w-full btn text-lg">
                                    Confirm & Pay ₦{totalPrice.toLocaleString()}
                                </button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default CheckoutPage;