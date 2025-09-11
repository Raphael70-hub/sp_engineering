import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api";

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await api.post("/api/users/login", { email, password });

            // Save token and user
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            toast.success("Login successful!");

            // Redirect by role
            if (res.data.user.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/");
            }
        } catch (err) {
            toast.error(err.response?.data?.error || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Welcome Back
                </h2>

                <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-1 p-3 border rounded-xl focus:ring focus:ring-orange-200"
                            placeholder="you@example.com"
                            required
                        />
                    </div>


                    <div>
                        <div className="flex justify-between">
                            <label className="block text-sm font-medium text-gray-700">Password</label>

                            <Link to={"/forgot-password"} >
                                <span className="text-orange-500 text-sm hover:text-orange-700">Forgot Password?</span>
                            </Link>
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-1 p-3 border rounded-xl focus:ring focus:ring-orange-200"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-orange-600 text-white py-3 rounded-xl hover:bg-orange-700 transition disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-sm text-center mt-6 text-gray-600">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-orange-600 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
