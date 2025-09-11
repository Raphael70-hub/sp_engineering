import {CheckCircle, XCircle} from "lucide-react";
import {Link, useLocation} from "react-router-dom";
import Footer from "../sections/Footer.jsx";
import PlainNavBar from "../components/PlainNavBar.jsx";

function OrderConfirmation() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get("status");
    const order_ref = queryParams.get("order_ref");

    return (
        <>
            <PlainNavBar/>
            <div className="max-w-2xl mx-auto text-center py-20 px-6">
                {status === "success" ? (
                    <div>
                        <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
                        <h2 className="text-3xl font-bold mb-4">Thank You for Your Order!</h2>
                        <p className="text-gray-600 mb-6">
                            Your order has been placed successfully. We’ll send you an email with the details shortly. Order Ref: {order_ref}
                        </p>
                    </div>

                )
                :
                (
                    <div>
                        <XCircle className="w-20 h-20 text-red-600 mx-auto mb-6" />
                        <h2 className="text-3xl font-bold mb-4 text-red-700">Order Failed</h2>
                        <p className="text-gray-600 mb-6">
                            Something went wrong while processing your order. Please check your payment details and try again. If the issue persists, contact our support team.
                        </p>
                    </div>
                )
                }

                <Link
                    to="/products"
                    className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700"
                >
                    Continue Shopping
                </Link>
            </div>
            <Footer />
        </>
    );
}

export default OrderConfirmation;