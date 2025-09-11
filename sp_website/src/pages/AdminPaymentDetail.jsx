// src/pages/AdminPaymentDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { ArrowLeft, CreditCard, FileText, RefreshCcw, X, RotateCcw } from "lucide-react";
import api from "../api/index.js";

export default function AdminPaymentDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [payment, setPayment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState("");
    const [isErrorNotification, setIsErrorNotification] = useState(false);
    const [confirmRefund, setConfirmRefund] = useState(false);

    const fetchPayment = async () => {
        try {
            setLoading(true);
            // const res = await axios.get(`${API_BASE_URL}/api/payments/${id}`);
            const res = await api.get(`/api/payments/${id}`);
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

    const downloadInvoice = async () => {
        if (!payment) return;

        try {
            // const response = await fetch(`${API_BASE_URL}/api/payments/${payment.id}/invoice`, {
            //     method: "GET",
            //     headers: {
            //         "Accept": "application/pdf",
            //     },
            // });
            const response = await api.get(`/api/payments/${payment.id}/invoice`);

            if (!response.ok) {
                throw new Error("Failed to download invoice");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = `invoice_${payment.id}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Error downloading invoice:", err);
            alert("Failed to download invoice. Please try again.");
        }
    };

    // const reconcilePayment = async () => {
    //     try {
    //         await axios.post(`${API_BASE_URL}/api/payments/${id}/reconcile`);
    //         showNotification("Payment reconciled successfully");
    //         fetchPayment();
    //     } catch (err) {
    //         console.error(err);
    //         showNotification("Failed to reconcile payment", true);
    //     }
    // };

    const refundPayment = async () => {
        setLoading(true);
        try {
            // await axios.post(`${API_BASE_URL}/api/payments/${id}/refund`);
            await api.post(`/api/payments/${id}/refund`);
            showNotification("Payment refunded successfully");
            setConfirmRefund(false);
            fetchPayment();
        } catch (err) {
            console.error(err);
            showNotification("Failed to refund payment", true);
        }
        finally {
            setLoading(false);
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
                    <p className="text-gray-600">Transaction Ref: {payment.transaction_ref}</p>
                    <p className="text-gray-600">Order Ref: {payment.order_ref}</p>
                    <p className="text-gray-600">Refunded Amount: ₦{parseFloat(payment.refunded_amount).toLocaleString()}</p>
                    <p className="text-lg font-semibold mt-2">
                        Amount: ₦{parseFloat(payment.amount).toLocaleString()}
                    </p>
                    <p className="text-lg font-semibold mt-2">
                        Status: <span
                        className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                            payment.status === "success"
                                ? "bg-green-100 text-green-600"
                                : payment.status === "pending"
                                    ? "bg-yellow-100 text-yellow-600"
                                    : payment.status === "refunded"
                                        ? "bg-blue-100 text-blue-600"
                                        : "bg-red-100 text-red-600"
                        }`}
                    >
                        {payment.status}
                    </span>
                    </p>

                </div>

                {/* Actions */}
                <div className="flex gap-3 flex-wrap">
                    <button
                        onClick={downloadInvoice}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center gap-2"
                    >
                        <FileText size={16} /> Download Invoice
                    </button>

                    {/*{payment.status !== "completed" && (*/}
                    {/*    <button*/}
                    {/*        onClick={reconcilePayment}*/}
                    {/*        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center gap-2"*/}
                    {/*    >*/}
                    {/*        <RefreshCcw size={16} /> Reconcile*/}
                    {/*    </button>*/}
                    {/*)}*/}

                    {payment.status === "success" && (
                        <button
                            onClick={() => setConfirmRefund(true)}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center gap-2"
                        >
                            <RotateCcw size={16} /> Refund
                        </button>
                    )}
                </div>

                {/* Refund Confirmation Modal */}
                {confirmRefund && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/30 bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                            <h2 className="text-lg font-bold mb-4">Confirm Refund</h2>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to refund this payment of ₦
                                {parseFloat(payment.amount).toLocaleString()}?
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setConfirmRefund(false)}
                                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg flex items-center gap-2"
                                >
                                    <X size={16} /> Cancel
                                </button>
                                <button
                                    onClick={refundPayment}
                                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center gap-2"
                                >
                                    <RotateCcw size={16} /> Confirm Refund
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
