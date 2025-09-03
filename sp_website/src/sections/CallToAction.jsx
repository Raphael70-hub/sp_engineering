import React from "react";
import {NavLink} from "react-router-dom";

const CallToAction = () => {
    return (
        <div className="relative  py-16 px-6 md:px-20 text-center">
            {/*/!* Overlay for depth *!/*/}
            {/*<div className="absolute inset-0 bg-black/40"></div>*/}

            {/* Content */}
            <div className="relative max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold mb-4 text-orange-500">
                    Ready to Build with Precision?
                </h2>
                <p className="text-lg mb-8">
                    Get premium materials and engineering solutions tailored for your
                    project. Take the next step today.
                </p>

                <div className="flex flex-col md:flex-row justify-center gap-6">
                    <NavLink to="/products" className="btn">Shop Now</NavLink>
                </div>
            </div>
        </div>
    );
};

export default CallToAction;
