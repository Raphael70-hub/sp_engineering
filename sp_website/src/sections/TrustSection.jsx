import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {Globe, Hammer, Home, Package, Users} from "lucide-react";


const TrustSection = () => {
    const ref = useRef();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".trust-item", { y: 10, opacity: 0, duration: 0.7, stagger: 0.12 });
        }, ref);
        return () => ctx.revert();
    }, []);

    return (
        <section className="py-12 bg-white" ref={ref}>
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h3 className="text-2xl font-bold mb-3">Trusted by Nigerians at Home and Abroad</h3>
                <p className="text-gray-600 mb-8">Seamless, reliable, and transparent construction solutions.</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="trust-item p-4 bg-gray-50 rounded shadow text-center">
                        {/*<img src="/images/client1.png" alt="client" className="mx-auto h-12 mb-2" />*/}
                        <Globe className="text-orange-600 w-10 h-10 mb-3 mx-auto" />
                        <p className="text-sm text-gray-600">Diaspora Clients</p>
                    </div>
                    <div className="trust-item p-4 bg-gray-50 rounded shadow text-center">
                        {/*<img src="/images/client2.png" alt="client" className="mx-auto h-12 mb-2" />*/}
                        <Hammer className="text-orange-600 w-10 h-10 mb-3 mx-auto" />
                        <p className="text-sm text-gray-600">Local Builders</p>
                    </div>
                    <div className="trust-item p-4 bg-gray-50 rounded shadow text-center">
                        {/*<img src="/images/client3.png" alt="client" className="mx-auto h-12 mb-2" />*/}
                        <Package className="text-orange-600 w-10 h-10 mb-3 mx-auto" />
                        <p className="text-sm text-gray-600">Suppliers</p>
                    </div>
                    <div className="trust-item p-4 bg-gray-50 rounded shadow text-center">
                        {/*<img src="/images/client4.png" alt="client" className="mx-auto h-12 mb-2" />*/}
                        <Home className="text-orange-600 w-10 h-10 mb-3 mx-auto" />
                        <p className="text-sm text-gray-600">Homeowners</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
