import { Link } from "react-router-dom";

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input
                            type="text"
                            className="w-full mt-1 p-3 border rounded-xl focus:ring focus:ring-blue-200"
                            placeholder="John Doe"
                            required
                        />
                    </div>

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
                        Register
                    </button>
                </form>

                <p className="text-sm text-center mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-orange-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
