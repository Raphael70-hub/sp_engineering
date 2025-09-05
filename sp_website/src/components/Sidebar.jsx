import {X, Menu, LayoutDashboard, Package, ShoppingCart, Users, CreditCard, LogOut} from "lucide-react";
import {Link} from "react-router-dom";
import {useState} from "react";

function SidebarItem({ icon, label, link, open }) {
    return (
        <Link to={link} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 text-white hover:text-black  cursor-pointer">
            <span className="text-orange-500">{icon}</span>
            {open && <span className="">{label}</span>}
        </Link>
    );
}

export default function Sidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navItems = [
        { icon: <LayoutDashboard />, label: "Dashboard", link: "/admin/dashboard" },
        { icon: <Package />, label: "Products", link: "/admin/products" },
        { icon: <ShoppingCart />, label: "Orders", link: "/admin/orders" },
        { icon: <Users />, label: "Users", link: "/admin/users" },
        { icon: <CreditCard />, label: "Payment", link: "/admin/payments" },
    ];

    const bottomItems = [{ icon: <LogOut />, label: "Logout", link: "/login" },];

    return (
        <div className="me-20">
            <div className={`${sidebarOpen ? "w-64" : "md:w-20 w-15"} fixed left-0 top-0 min-h-screen h-screen bg-gray-700 shadow-md transition-all`}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className={`font-bold text-lg ${sidebarOpen ? "block" : "hidden"} text-white`}>SP Engineering</h2>
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-orange-500">
                        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col">
                    {/* Top Section */}
                    <div className="p-2 space-y-4">
                        {navItems.map((item, idx) => (
                            <SidebarItem  key={idx} icon={item.icon} label={item.label} link={item.link} open={sidebarOpen} />
                        ))}
                    </div>

                    {/* Bottom Section */}
                    {bottomItems && (
                        <div className="p-4 fixed bottom-0">
                            {bottomItems.map((item, idx) => (
                                <SidebarItem key={idx} icon={item.icon} label={item.label} link={item.link} open={sidebarOpen} />
                            ))}
                        </div>
                    )}
                </nav>
            </div>
        </div>
    );
}
