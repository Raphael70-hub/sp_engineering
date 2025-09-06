// src/pages/AdminPaymentDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constants";
import Sidebar from "../components/Sidebar";
import {ArrowLeft, CreditCard, FileText, RefreshCcw, X} from "lucide-react";

export default function AdminPaymentDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [payment, setPayment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState("");
    const [isErrorNotification, setIsErrorNotification] = useState(false);

    const fetchPayment = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_BASE_URL}/api/payments/${id}`);
            setPayment(res.data);
        } catch (err) {
            console.error(err);
            alert("Failed to fetch payment details");
            navigate(-1);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayment();
    }, [id]);

    const showNotification = (msg, isError = false) => {
        setNotification(msg);
        setIsErrorNotification(isError);
        setTimeout(() => setNotification(""), 3000);
    };

    const downloadInvoice = () => {
        if (!payment) return;
        const blob = new Blob(
            [
                `Invoice\n\nPayment ID: ${payment.id}\nOrder Ref: ${payment.order?.ref}\nAmount: ₦${payment.amount}\nStatus: ${payment.status}\nProvider: ${payment.provider}\nTransaction Ref: ${payment.transaction_ref}\nDate: ${new Date(payment.created_at).toLocaleString()}`
            ],
            { type: "text/plain" }
        );

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `invoice_${payment.id}.txt`;
        link.click();
    };

    const reconcilePayment = async () => {
        try {
            await axios.post(`${API_BASE_URL}/api/payments/${id}/reconcile`);
            showNotification("Payment reconciled successfully");
            fetchPayment();
        } catch (err) {
            console.error(err);
            showNotification("Failed to reconcile payment", true);
        }
    };


    if (loading || !payment) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-100 w-full">
            <Sidebar />

            <div className="flex-1 md:px-8 py-8">
                {/* Notification */}
                {notification && (
                    <div
                        className={`absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded shadow text-white ${
                            isErrorNotification ? "bg-red-500" : "bg-green-500"
                        }`}
                    >
                        {notification}
                    </div>
                )}

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 mb-6 text-gray-600 hover:text-orange-600"
                >
                    <ArrowLeft size={18} /> Back
                </button>

                {/* Payment Header */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h1 className="text-2xl font-bold flex items-center gap-2 mb-2">
                        <CreditCard className="text-orange-500" /> Payment Details
                    </h1>
                    <p className="text-gray-600">Provider: {payment.provider}</p>
                    <p className="text-gray-600">
                        Transaction Ref: {payment.transaction_ref}
                    </p>
                    <p className="text-lg font-semibold mt-2">
                        ₦{parseFloat(payment.amount).toLocaleString()}
                    </p>
                    <span
                        className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                            payment.status === "completed"
                                ? "bg-green-100 text-green-600"
                                : "bg-yellow-100 text-yellow-600"
                        }`}
                    >
            {payment.status}
          </span>
                </div>

                {/* Order Information */}
                {payment.order && (
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <h2 className="text-lg font-semibold mb-3">Order Information</h2>
                        <p>
                            <span className="font-medium">Order Ref:</span>{" "}
                            {payment.order.ref}
                        </p>
                        <p>
                            <span className="font-medium">Status:</span>{" "}
                            <span
                                className={`px-2 py-1 text-xs rounded-lg ${
                                    payment.order.status === "pending"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : payment.order.status === "processing"
                                            ? "bg-purple-100 text-purple-700"
                                            : payment.order.status === "shipped"
                                                ? "bg-blue-100 text-blue-700"
                                                : payment.order.status === "completed"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                }`}
                            >
                        {payment.order.status}
                      </span>
                        </p>
                        <p>
                            <span className="font-medium">Total Amount:</span> ₦
                            {parseFloat(payment.order.total_amount).toLocaleString()}
                        </p>
                        <p>
                            <span className="font-medium">Created At:</span>{" "}
                            {new Date(payment.order.created_at).toLocaleString()}
                        </p>

                        {/* Order Items */}
                        <div className="mt-4">
                            <h3 className="font-medium mb-2">Items</h3>
                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                {payment.order.items.map((item, i) => (
                                    <li key={i}>
                                        {item.product_name} — {item.quantity} × ₦
                                        {parseFloat(item.price).toLocaleString()}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={downloadInvoice}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center gap-2"
                    >
                        <FileText size={16} /> Download Invoice
                    </button>

                    {payment.status != "completed" && (
                        <button
                            onClick={reconcilePayment}
                            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center gap-2"
                        >
                            <RefreshCcw size={16} /> Reconcile
                        </button>
                    )}

                </div>
            </div>
        </div>
    );
}
