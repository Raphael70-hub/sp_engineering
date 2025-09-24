import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const CallToAction = () => {
    const ref = useRef();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(ref.current.querySelectorAll(".cta-btn"), { y: 10, opacity: 0, duration: 0.8, stagger: 0.12 });
        }, ref);
        return () => ctx.revert();
    }, []);

    return (
        <div className="relative py-16 px-6 md:px-20 text-center bg-gradient-to-r from-orange-50 to-white" ref={ref}>
            <div className="relative max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold mb-4 text-orange-600">Ready to build with confidence?</h2>
                <p className="text-lg mb-8 text-gray-700">Start your project, shop materials, or hire skilled workers — all in one place.</p>

                <div className="flex flex-col md:flex-row justify-center gap-4">
                    <NavLink to="/products" className="cta-btn btn-dark px-6 py-3 rounded-md">Start Your Project</NavLink>
                    <NavLink to="/products" className="cta-btn btn-dark px-6 py-3 rounded-md">Shop Smart Build</NavLink>
                    <NavLink to="/services" className="cta-btn btn-dark px-6 py-3 rounded-md">Hire Skilled Workers</NavLink>
                </div>
            </div>
        </div>
    );
};

export default CallToAction;
