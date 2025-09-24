import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const AboutPreview = () => {
    const ref = useRef();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".about-card", { y: 20, opacity: 0, duration: 0.8, stagger: 0.12 });
            gsap.from(".about-text", { y: 10, opacity: 0, duration: 0.9 });
        }, ref);

        return () => ctx.revert();
    }, []);

    return (
        <section className="py-16 bg-gray-50" ref={ref}>
            <div className="max-w-6xl mx-auto px-6 lg:px-20 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div>
                        <h2 className="text-4xl font-bold mb-4">
                            Smart Precision Engineering Limited
                        </h2>
                        <p className="text-lg text-gray-600 about-text mb-6">
                            Smart Precision Engineering Limited is a Nigeria-based construction company specializing in construction project management—from design and planning to construction, handoff, and maintenance. We provide seamless solutions to busy Nigerians and those in the diaspora who want to build confidently at home.
                        </p>

                        <p className="text-gray-600 mb-6">
                            Our Smart Build store is one of Nigeria’s rapidly growing online markets for premium building materials, both local and imported. With nationwide delivery, homebuilders across Nigeria and abroad can purchase materials with ease.
                        </p>

                        <a href="/about" className="inline-block btn mt-2">Learn More →</a>
                    </div>

                    <div className="space-y-4">
                        <div className="about-card p-6 bg-white shadow rounded-lg">
                            <h3 className="font-semibold text-gray-800">Our Mission</h3>
                            <p className="text-sm text-gray-500 mt-2">To make construction seamless, transparent, and accessible for all Nigerians—home and abroad.</p>
                        </div>

                        <div className="about-card p-6 bg-white shadow rounded-lg">
                            <h3 className="font-semibold text-gray-800">Our Vision</h3>
                            <p className="text-sm text-gray-500 mt-2">To be Nigeria’s leading construction engineering company, trusted for quality, innovation, and reliability.</p>
                        </div>

                        <div className="about-card p-6 bg-white shadow rounded-lg">
                            <h3 className="font-semibold text-gray-800">Our Values</h3>
                            <ul className="text-sm text-gray-500 mt-2 list-disc ml-5">
                                <li>Integrity</li>
                                <li>Precision</li>
                                <li>Innovation</li>
                                <li>Commitment</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutPreview;
