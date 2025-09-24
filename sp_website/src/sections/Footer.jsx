import React from "react";
import {Facebook, Twitter, Linkedin, Mail, Instagram} from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-orange-900 text-gray-200 pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <img src="images/favicon.png" className="w-16 h-auto" alt="logo" />
                    <p className="text-sm text-gray-400 mt-3">Delivering quality engineering materials and solutions you can trust.</p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/" className="hover:text-orange-400">Home</a></li>
                        <li><a href="/about" className="hover:text-orange-400">About Us</a></li>
                        <li><a href="/products" className="hover:text-orange-400">Products</a></li>
                        <li><a href="/contact" className="hover:text-orange-400">Contact</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
                    <p className="text-sm">[Insert Full Address]</p>
                    <p className="text-sm">Lagos, Nigeria</p>
                    <p className="text-sm my-2">Email: smartprecisionengineering@gmail.com</p>
                    <p className="text-sm">Phone: +234 [Insert Phone Number]</p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-orange-400"><Facebook /></a>
                        <a href="#" className="hover:text-orange-400"><Twitter /></a>
                        <a href="#" className="hover:text-orange-400"><Linkedin /></a>
                        <a href="#" className="hover:text-orange-400"><Instagram /></a>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
                © {new Date().getFullYear()} Smart Precision Engineering. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
