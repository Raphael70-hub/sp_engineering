import React from "react";

const FinalBanner = () => {
    return (
        <section className="relative bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 text-white py-16 px-6 overflow-hidden">
            {/* Background overlay pattern */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"></div>

            <div className="relative max-w-5xl mx-auto text-center">
                <h2 className="text-4xl font-extrabold mb-4">
                    Built on <span className="text-yellow-400">Trust</span>, Powered by{" "}
                    <span className="text-yellow-400">Excellence</span>
                </h2>
                <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-6">
                    We deliver not just products, but lasting value. Join the growing
                    community of customers who trust us to bring innovation and quality
                    every step of the way.
                </p>
                <button className="px-8 py-3 rounded-lg bg-yellow-400 text-blue-900 font-semibold hover:bg-yellow-500 transition">
                    Discover More
                </button>
            </div>
        </section>
    );
};

export default FinalBanner;
