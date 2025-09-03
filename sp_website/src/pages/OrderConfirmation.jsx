import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../sections/Footer.jsx";
import PlainNavBar from "../components/PlainNavBar.jsx";

function OrderConfirmation() {
    return (
        <>
            <PlainNavBar/>
            <div className="max-w-2xl mx-auto text-center py-20 px-6">
                <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-4">Thank You for Your Order!</h2>
                <p className="text-gray-600 mb-6">
                    Your order has been placed successfully. We’ll send you an email with the details shortly.
                </p>
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