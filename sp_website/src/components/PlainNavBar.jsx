import React, { useState } from "react";
import {Menu, ShoppingCart, X} from "lucide-react";
import { NavLink } from "react-router-dom";
import AccountMenu from "./AccountMenu.jsx";

const PlainNavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="sticky top-0 z-50 bg-white shadow-md py-6"
        >
            {/* Navbar */}
            <div className="relative flex pt-6 px-10 justify-between items-center text-orange-500">
                <p className="text-3xl font-bold">Sp Engineering</p>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-6">
                    <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>
                        Home
                    </NavLink>

                    <NavLink to="/services" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>
                        Services
                    </NavLink>

                    <NavLink to="/products" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>
                        Products
                    </NavLink>

                    <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>
                        Contact
                    </NavLink>

                    <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>
                        About
                    </NavLink>
                    <NavLink
                        to="/cart"
                        className={({ isActive }) =>
                            isActive ? "nav-link active-link" : "nav-link"
                        }
                    >
                        <ShoppingCart className="w-6 h-6 inline-flex mx-3" />
                        Cart
                    </NavLink>
                    <AccountMenu/>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} className="text-orange-500" />}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="md:hidden z-40 absolute top-20 left-0 w-full bg-white/95 shadow-md text-black flex flex-col items-center space-y-6 py-6">
                    <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>
                        Home
                    </NavLink>

                    <NavLink to="/services" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>
                        Services
                    </NavLink>

                    <NavLink to="/products" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>
                        Products
                    </NavLink>

                    <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>
                        Contact
                    </NavLink>

                    <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>
                        About
                    </NavLink>
                    <NavLink
                        to="/cart"
                        className={({ isActive }) =>
                            isActive ? "nav-link active-link" : "nav-link"
                        }
                    >
                        <ShoppingCart className="w-6 h-6 inline-flex mx-3" />
                        Cart
                    </NavLink>
                    <AccountMenu/>
                </div>
            )}
        </div>
    );
};

export default PlainNavBar;
