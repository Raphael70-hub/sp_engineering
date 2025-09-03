import { useState } from "react";
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend
} from "recharts";
import {
    Menu,
    X,
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    CreditCard,
    LogOutIcon,
    DollarSign,
    BarChart2, TrendingUp, LogOut
} from "lucide-react";
import Sidebar from "../components/Sidebar.jsx";

export default function AdminDashboard() {
    // Dummy data
    const weeklyStats = [
        { label: "Total Weekly Sales", value: "$15,200", icon: <DollarSign className="w-6 h-6 text-green-600" />, color: "bg-green-100" },
        { label: "Total Weekly Orders", value: "340", icon: <ShoppingCart className="w-6 h-6 text-blue-600" />, color: "bg-blue-100" },
        { label: "Active Orders", value: "28", icon: <Package className="w-6 h-6 text-orange-600" />, color: "bg-orange-100" },
        { label: "Active Users", value: "120", icon: <Users className="w-6 h-6 text-purple-600" />, color: "bg-purple-100" },
    ];

    const productData = [
        { name: "Hydraulic Pump", sales: 120 },
        { name: "Steel Bolts", sales: 90 },
        { name: "Bearings", sales: 75 },
        { name: "Gears", sales: 60 },
        { name: "Valves", sales: 50 },
    ];

    const monthlySales = [
        { month: "Jan", revenue: 4000 },
        { month: "Feb", revenue: 3200 },
        { month: "Mar", revenue: 5000 },
        { month: "Apr", revenue: 4700 },
        { month: "May", revenue: 6100 },
        { month: "Jun", revenue: 5400 },
    ];

    const revenueTable = [
        { product: "Hydraulic Pump", revenue: 5000 },
        { product: "Steel Bolts", revenue: 3500 },
        { product: "Bearings", revenue: 2800 },
        { product: "Gears", revenue: 2200 },
    ];


    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

                {/* Row 1 - Weekly Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {weeklyStats.map((stat, idx) => (
                        <div
                            key={idx}
                            className={`p-6 rounded-xl shadow-lg flex items-center space-x-4 bg-white hover:shadow-xl transition`}
                        >
                            {/* Icon */}
                            <div className={`p-3 rounded-full ${stat.color}`}>
                                {stat.icon}
                            </div>

                            {/* Text */}
                            <div>
                                <p className="text-sm text-gray-500">{stat.label}</p>
                                <h2 className="text-2xl font-bold">{stat.value}</h2>
                            </div>
                        </div>
                    ))}
                </div>


                {/* Row 2 - Charts */}
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
                            <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                                +8% growth
                            </span>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={productData}>
                                <defs>
                                    <linearGradient id="barColor" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.9} />
                                        <stop offset="95%" stopColor="#f97316" stopOpacity={0.3} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip contentStyle={{ borderRadius: "10px", backgroundColor: "#fff" }} />
                                <Bar dataKey="sales" fill="url(#barColor)" radius={[8, 8, 0, 0]} />
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
                            <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                                +12% vs last year
                              </span>
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


                {/* Row 3 - Revenue Table */}
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
                            const maxRevenue = Math.max(...revenueTable.map((r) => r.revenue));
                            const percentage = (row.revenue / maxRevenue) * 100;

                            return (
                                <tr
                                    key={idx}
                                    className={`${
                                        idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    } hover:bg-orange-50 transition`}
                                >
                                    {/* Rank */}
                                    <td className="p-3 font-bold text-gray-700">#{idx + 1}</td>

                                    {/* Product */}
                                    <td className="p-3 flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                            <Package className="w-4 h-4 text-gray-500" />
                                        </div>
                                        <span className="font-medium">{row.product}</span>
                                    </td>

                                    {/* Revenue + Progress */}
                                    <td className="p-3">
                                          <span className="font-semibold text-gray-900">
                                            ${row.revenue.toLocaleString()}
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

// Sidebar item component
function SidebarItem({ icon, label, open }) {
    return (
        <div className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg  hover:bg-gray-100 transition">
            <span className="text-orange-600">{icon}</span>
            {open && <span className="text-orange-700">{label}</span>}
        </div>
    );
}
