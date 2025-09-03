import PlainNavBar from "../components/PlainNavBar.jsx";
import Footer from "../sections/Footer.jsx";
import { Link } from "react-router-dom";
import {User} from "lucide-react";

export default function ProfilePage() {
    const user = {
        name: "John Doe",
        email: "john@example.com",
        phone: "+1 555-123-4567",
        address: "123 Industrial Ave, Lagos, Nigeria",
    };

    return (
        <>
            <PlainNavBar />
            <div className="flex-col items-center mx-auto px-4 py-10">
                <h2 className="text-3xl font-bold mb-6">My Profile</h2>

                <div className="bg-white shadow-lg rounded-2xl p-6 w-full">
                    {/* User Info */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    value={user.name}
                                    disabled
                                    className="mt-1 block w-full rounded-lg p-2 border-gray-300 shadow-sm bg-gray-100 cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    value={user.email}
                                    disabled
                                    className="mt-1 block w-full rounded-lg p-2 border-gray-300 shadow-sm bg-gray-100 cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <input
                                    type="text"
                                    value={user.phone}
                                    disabled
                                    className="mt-1 block w-full rounded-lg p-2 border-gray-300 shadow-sm bg-gray-100 cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <input
                                    type="text"
                                    value={user.address}
                                    disabled
                                    className="mt-1 block w-full rounded-lg p-2 border-gray-300 shadow-sm bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                        </div>

                    </div>

                    {/* Links */}
                    <div className="space-y-4">
                        <Link
                            to="/reset-password"
                            className="block text-orange-600 font-medium hover:underline"
                        >
                            🔑 Reset Password
                        </Link>

                        <Link
                            to="/orders"
                            className="block text-orange-600 font-medium hover:underline"
                        >
                            📦 View Order History
                        </Link>

                        <Link
                            to="/reviews"
                            className="block text-orange-600 font-medium hover:underline"
                        >
                            ⭐ Ratings & Reviews
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
