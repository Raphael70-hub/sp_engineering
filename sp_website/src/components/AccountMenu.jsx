import { useState } from "react";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

export default function AccountMenu() {
    const [open, setOpen] = useState(false);

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
                    <Link
                        to="/login"
                        className="block px-4 py-2 rounded-lg cursor-pointer btn"
                    >
                        Login / Register
                    </Link>

                    <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                    >
                        Profile
                    </Link>
                    <Link
                        to="/orders"
                        className="block px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                    >
                        Order History
                    </Link>

                </div>
            )}
        </div>
    );
}
