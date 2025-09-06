// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";
import {
    Package, ShoppingCart, Users, DollarSign, BarChart2, TrendingUp
} from "lucide-react";
import Sidebar from "../components/Sidebar.jsx";
import { API_BASE_URL } from "../constants";

export default function AdminDashboard() {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchDashboard = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_BASE_URL}/api/dashboard/`);
            setDashboard(res.data);
        } catch (err) {
            console.error("Failed to fetch dashboard:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    if (loading || !dashboard) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const { weeklyStats, topProducts, monthlySales, revenueTable } = dashboard;

    const weeklyStatsCards = [
        { label: "Total Weekly Sales", value: `₦${parseFloat(weeklyStats.total_weekly_sales).toLocaleString()}`, icon: <DollarSign className="w-6 h-6 text-green-600" />, color: "bg-green-100" },
        { label: "Total Weekly Orders", value: weeklyStats.total_weekly_orders, icon: <ShoppingCart className="w-6 h-6 text-blue-600" />, color: "bg-blue-100" },
        { label: "Active Orders", value: weeklyStats.active_orders, icon: <Package className="w-6 h-6 text-orange-600" />, color: "bg-orange-100" },
        { label: "Active Users", value: weeklyStats.active_users, icon: <Users className="w-6 h-6 text-purple-600" />, color: "bg-purple-100" },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100 min-w-screen overflow-y-hidden">
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

                {/* Weekly Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {weeklyStatsCards.map((stat, idx) => (
                        <div
                            key={idx}
                            className="p-6 rounded-xl shadow-lg flex items-center space-x-4 bg-white hover:shadow-xl transition"
                        >
                            <div className={`p-3 rounded-full ${stat.color}`}>{stat.icon}</div>
                            <div>
                                <p className="text-sm text-gray-500">{stat.label}</p>
                                <h2 className="text-2xl font-bold">{stat.value}</h2>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Most Purchased Products */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold flex items-center space-x-2">
                <span className="bg-orange-100 p-2 rounded-full">
                  <BarChart2 className="w-5 h-5 text-orange-600" />
                </span>
                                <span>Most Purchased Products</span>
                            </h2>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={topProducts}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip contentStyle={{ borderRadius: "10px", backgroundColor: "#fff" }} />
                                <Bar dataKey="sales" fill="#f97316" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Monthly Sales */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold flex items-center space-x-2">
                <span className="bg-orange-100 p-2 rounded-full">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                </span>
                                <span>Monthly Sales</span>
                            </h2>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={monthlySales}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip contentStyle={{ borderRadius: "10px", backgroundColor: "#fff" }} />
                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#f97316"
                                    strokeWidth={3}
                                    dot={{ r: 5, fill: "#f97316" }}
                                    activeDot={{ r: 8, fill: "#f97316" }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Revenue Table */}
                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                    <h2 className="text-lg font-semibold mb-6 flex items-center space-x-2">
            <span className="bg-purple-100 p-2 rounded-full">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </span>
                        <span>Top Products by Revenue</span>
                    </h2>

                    <table className="w-full text-left border-collapse">
                        <thead>
                        <tr className="text-gray-600 text-sm border-b">
                            <th className="p-2">Rank</th>
                            <th className="p-2">Product</th>
                            <th className="p-2">Revenue</th>
                        </tr>
                        </thead>
                        <tbody>
                        {revenueTable.map((row, idx) => {
                            const maxRevenue = Math.max(...revenueTable.map((r) => parseFloat(r.revenue)));
                            const percentage = (parseFloat(row.revenue) / maxRevenue) * 100;

                            return (
                                <tr
                                    key={idx}
                                    className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-orange-50 transition`}
                                >
                                    <td className="p-3 font-bold text-gray-700">#{idx + 1}</td>
                                    <td className="p-3 flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                            <Package className="w-4 h-4 text-gray-500" />
                                        </div>
                                        <span className="font-medium">{row.product}</span>
                                    </td>
                                    <td className="p-3">
                      <span className="font-semibold text-gray-900">
                        ₦{parseFloat(row.revenue).toLocaleString()}
                      </span>
                                        <div className="bg-gray-200 rounded-full h-2 mt-2 overflow-hidden">
                                            <div
                                                className="h-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-700"
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
