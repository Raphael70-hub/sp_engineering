import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function AccountMenu() {
    const [open, setOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login");
    };

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2"
            >
                <User className="h-6 w-6" />
                <span>Account</span>
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-48 z-10 bg-white shadow-lg rounded-xl p-2 text-black">
                    {!isLoggedIn ? (
                        <Link
                            to="/login"
                            className="block px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                            onClick={() => setOpen(false)}
                        >
                            Login / Register
                        </Link>
                    ) : (
                        <>
                            <Link
                                to="/profile"
                                className="block px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                                onClick={() => setOpen(false)}
                            >
                                Profile
                            </Link>
                            <Link
                                to="/orders"
                                className="block px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                                onClick={() => setOpen(false)}
                            >
                                Order History
                            </Link>
                            <Link
                                to="/rentals"
                                className="block px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                                onClick={() => setOpen(false)}
                            >
                                Rental History
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-lg"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
