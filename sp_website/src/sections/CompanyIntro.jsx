import React from "react";
import { Shield, Award, Users, CheckCircle } from "lucide-react";

const CompanyIntro = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-6 lg:px-20 text-center">
                {/* Intro */}
                <h2 className="text-4xl font-bold mb-6 text-gray-800">
                    Why Choose <span className="text-orange-600">SP Engineering</span>?
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
                    At SP Engineering, we pride ourselves on delivering world-class
                    engineering solutions with a focus on precision, durability, and
                    innovation. With decades of experience and a commitment to excellence,
                    we’ve become a trusted partner for countless clients worldwide.
                </p>

                {/* Trust Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="flex flex-col items-center p-6 bg-white shadow rounded-2xl">
                        <Shield className="text-orange-600 w-10 h-10 mb-3" />
                        <h3 className="font-semibold text-gray-800">ISO Certified</h3>
                        <p className="text-sm text-gray-500 mt-2">
                            Meeting the highest international standards.
                        </p>
                    </div>

                    <div className="flex flex-col items-center p-6 bg-white shadow rounded-2xl">
                        <Award className="text-orange-600 w-10 h-10 mb-3" />
                        <h3 className="font-semibold text-gray-800">10+ Years Experience</h3>
                        <p className="text-sm text-gray-500 mt-2">
                            Trusted by industries worldwide.
                        </p>
                    </div>

                    <div className="flex flex-col items-center p-6 bg-white shadow rounded-2xl">
                        <Users className="text-orange-600 w-10 h-10 mb-3" />
                        <h3 className="font-semibold text-gray-800">Global Clients</h3>
                        <p className="text-sm text-gray-500 mt-2">
                            Serving customers across multiple regions.
                        </p>
                    </div>

                    <div className="flex flex-col items-center p-6 bg-white shadow rounded-2xl">
                        <CheckCircle className="text-orange-600 w-10 h-10 mb-3" />
                        <h3 className="font-semibold text-gray-800">Quality Guaranteed</h3>
                        <p className="text-sm text-gray-500 mt-2">
                            Products built to last with precision.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CompanyIntro;
