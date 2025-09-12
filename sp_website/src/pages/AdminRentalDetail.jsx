// src/pages/AdminRentalDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../constants";
import Sidebar from "../components/Sidebar";
import { ArrowLeft } from "lucide-react";
import api from "../api/index.js";

export default function AdminRentalDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [rental, setRental] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState("");
    const [isErrorNotification, setIsErrorNotification] = useState(false);
    const [newStatus, setNewStatus] = useState("");

    const fetchRental = async () => {
        try {
            setLoading(true);
            // const res = await axios.get(`${API_BASE_URL}/api/rentals/${id}`);
            const res = await api.get(`/api/rentals/${id}`);
            setRental(res.data);
            setNewStatus(res.data.status);
        } catch (err) {
            console.error(err);
            alert("Failed to fetch rental");
            navigate(-1);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRental();
    }, [id]);

    const showNotification = (msg, isError = false) => {
        setNotification(msg);
        setIsErrorNotification(isError);
        setTimeout(() => setNotification(""), 3000);
    };

    const updateStatus = async () => {
        setLoading(true);
        try {
            // await axios.patch(`${API_BASE_URL}/api/rentals/${id}/status`, {
            //     status: newStatus,
            // });
            await api.post(`/api/rentals/${id}/status`, {
                status: newStatus,
            });
            showNotification("Status updated successfully");
            fetchRental();
        } catch (err) {
            console.error(err);
            showNotification("Failed to update status", true);
        }
        finally {
            setLoading(false);
        }
    };

    if (loading || !rental) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-6">
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

                {/* Rental Info */}
                <div className="flex flex-col gap-2 bg-white rounded-lg shadow-md p-6 mb-6">
                    <h1 className="text-2xl font-bold mb-4">{rental.ref}</h1>

                    {/* Rented Items */}
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold mb-2">Rented Items</h2>
                        {rental.items?.length ? (
                            rental.items.map((item, idx) => (
                                <div key={idx} className="mb-2 border-b pb-2 last:border-none last:pb-0">
                                    <p>
                                        <span className="font-medium">{item.product_name}</span> — {item.quantity} unit(s)
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {new Date(item.start_date).toLocaleDateString()} - {new Date(item.end_date).toLocaleDateString()}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p>No items found</p>
                        )}
                    </div>

                    <p>
                        <span className="font-medium">User:</span> {rental.user_name} ({rental.user_email})
                    </p>
                    {rental.phone_number && <p>Phone: {rental.phone_number}</p>}
                    {rental.shipping_address && <p>Shipping Address: {rental.shipping_address}</p>}

                    {/* Aggregate Dates for all items */}
                    {rental.items?.length ? (
                        <p>
                            <span className="font-medium">Rental Period:</span>{" "}
                            {(() => {
                                // Find earliest start date and latest end date among all items
                                const startDates = rental.items.map(i => new Date(i.start_date));
                                const endDates = rental.items.map(i => new Date(i.end_date));
                                const earliest = new Date(Math.min(...startDates));
                                const latest = new Date(Math.max(...endDates));
                                return `${earliest.toLocaleDateString()} - ${latest.toLocaleDateString()}`;
                            })()}
                        </p>
                    ) : null}

                    <p>
                        <span className="font-medium">Total Quantity:</span>{" "}
                        {rental.items?.reduce((sum, item) => sum + item.quantity, 0) || rental.quantity || 0}
                    </p>
                    <p>
                        <span className="font-medium">Total Amount:</span> ₦
                        {parseFloat(rental.total_amount).toLocaleString()}
                    </p>
                    <p>
                        <span className="font-medium">Status:</span>{" "}
                        <span
                            className={`px-2 py-1 text-xs rounded-lg ${
                                rental.status === "pending"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : rental.status === "confirmed"
                                        ? "bg-blue-100 text-blue-700"
                                        : rental.status === "completed"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                            }`}
                        >
                            {rental.status}
                        </span>
                    </p>
                </div>

                {/* Status Update */}
                {rental.status !== "completed" && rental.status !== "cancelled" && (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-semibold mb-3">Update Status</h2>
                        <select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                            className="border rounded p-2 mr-3"
                        >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="completed">Completed</option>
                        </select>
                        <button
                            onClick={updateStatus}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
                        >
                            Update
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
