import { Link } from "react-router-dom";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>

                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            className="w-full mt-1 p-3 border rounded-xl focus:ring focus:ring-blue-200"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <input
                            type="password"
                            className="w-full mt-1 p-3 border rounded-xl focus:ring focus:ring-blue-200"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-orange-600 text-white py-3 rounded-xl hover:bg-orange-700 transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-sm text-center mt-6">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-orange-600 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
