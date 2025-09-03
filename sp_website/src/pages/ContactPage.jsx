import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Footer from "../sections/Footer.jsx";
import NavBar from "../sections/NavBar.jsx";

function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        // TODO: integrate with backend or email service
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <>
            <NavBar
                title="Get in Touch"
                subtitle="We’re here to answer your questions, discuss your project, or provide more information about our services."
                showButton={false}
            />


            <div className="container mx-auto px-6 py-12">
                <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>

                <div className="grid md:grid-cols-2 gap-10">
                    {/* Contact Form */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Send us a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                    placeholder="Write your message..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-700"
                            >
                                <Send className="w-5 h-5" />
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Company Info */}
                    <div className="bg-gray-50 p-6 rounded-2xl shadow-lg space-y-6">
                        <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                        <p className="text-gray-600">
                            Have questions about our products or services? Reach out to us
                            through the details below or fill the form. We’ll get back to you
                            quickly!
                        </p>

                        <div className="flex items-center gap-3">
                            <MapPin className="w-6 h-6 text-orange-600" />
                            <span className="text-gray-700">
                  123 Engineering Street, Tech City, Lagos, Nigeria
                </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <Phone className="w-6 h-6 text-orange-600" />
                            <span className="text-gray-700">+234 800 123 4567</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <Mail className="w-6 h-6 text-orange-600" />
                            <span className="text-gray-700">info@spengineering.com</span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ContactPage;
