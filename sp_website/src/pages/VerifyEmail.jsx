// src/pages/VerifyEmail.jsx
import { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {API_BASE_URL} from "../constants/index.js";

const VerifyEmail = () => {
    const { token } = useParams();
    const [status, setStatus] = useState("loading"); // loading | success | error
    const [message, setMessage] = useState("");

    useEffect(() => {
        const verifyAccount = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/users/verify/${token}`);
                setStatus("success");
                setMessage(res.data.message || "Email verified successfully! You can now login.");
            } catch (err) {
                setStatus("error");
                setMessage(err.response?.data?.error || "Invalid or expired token.");
            }
        };
        verifyAccount();
    }, [token]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
                {status === "loading" && (
                    <div>
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mx-auto mb-4"></div>
                        <h2 className="text-lg font-semibold text-gray-700">
                            Verifying your email...
                        </h2>
                    </div>
                )}

                {status === "success" && (
                    <div>
                        <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-orange-100">
                            <svg
                                className="w-10 h-10 text-orange-500"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Success!</h2>
                        <p className="text-gray-600 mb-6">{message}</p>
                        <Link
                            to="/login"
                            className="inline-block bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition"
                        >
                            Go to Login
                        </Link>
                    </div>
                )}

                {status === "error" && (
                    <div>
                        <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-red-100">
                            <svg
                                className="w-10 h-10 text-red-500"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Error</h2>
                        <p className="text-gray-600">{message}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;
