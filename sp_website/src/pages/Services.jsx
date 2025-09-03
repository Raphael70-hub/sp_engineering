// src/pages/ServicesPage.jsx
import React, { useState } from "react";
import NavBar from "../sections/NavBar.jsx";
import Footer from "../sections/Footer.jsx";
import Pagination from "../components/Pagination.jsx";

const Services = () => {
    const [equipment] = useState([
        { id: 1, name: "Excavator", description: "Heavy-duty excavator for construction sites.", price: "$500/day", availability: "Available", image: "/images/excavator.jpg" },
        { id: 2, name: "Concrete Mixer", description: "Portable concrete mixer for projects.", price: "$100/day", availability: "Limited", image: "/images/mixer.jpg" },
        { id: 3, name: "Scaffolding", description: "Safe scaffolding equipment for high-rise projects.", price: "$50/day", availability: "Available", image: "/images/scaffolding.jpg" },
        { id: 4, name: "Bulldozer", description: "Powerful bulldozer for large-scale earthmoving.", price: "$700/day", availability: "Available", image: "/images/bulldozer.jpg" },
        { id: 5, name: "Cement Truck", description: "Reliable cement truck for big projects.", price: "$400/day", availability: "Limited", image: "/images/cement-truck.jpg" },
        { id: 6, name: "Forklift", description: "Compact forklift for warehouse and site lifting.", price: "$150/day", availability: "Available", image: "/images/forklift.jpg" },
    ]);


    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    // Slice the equipment list based on current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = equipment.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(equipment.length / itemsPerPage);

    // const [services] = useState([
    //     { id: 1, name: "Consulting", description: "Expert engineering consulting tailored to your project." },
    //     { id: 2, name: "Project Management", description: "End-to-end management for small and large scale projects." },
    //     { id: 3, name: "Site Inspection", description: "Professional on-site inspection to ensure quality and safety." },
    // ]);

    return (
        <>
            <NavBar
                title="Expert Services for Every Project"
                subtitle="From consulting to equipment hire, we deliver solutions that work."
                showButton={false}
            />

            <div className="min-h-screen bg-gray-50 py-12 px-6">
                <div className="max-w-6xl mx-auto space-y-16">

                    {/* Equipment Hire */}
                    <section>
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">Equipment Hire</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {currentItems.map((item) => (
                                <div key={item.id} className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-40 object-cover rounded-lg mb-4"
                                    />
                                    <h3 className="text-xl font-semibold">{item.name}</h3>
                                    <p className="text-gray-600 mt-2">{item.description}</p>
                                    <p className="text-gray-900 font-bold mt-3">{item.price}</p>
                                    <p className={`mt-1 text-sm ${item.availability === "Available" ? "text-green-600" : "text-yellow-600"}`}>
                                        {item.availability}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                        />
                    </section>

                    {/*/!* Engineering Services *!/*/}
                    {/*<section>*/}
                    {/*    <h2 className="text-3xl font-bold text-gray-800 mb-6">Engineering Services</h2>*/}
                    {/*    <div className="grid md:grid-cols-3 gap-6">*/}
                    {/*        {services.map((service) => (*/}
                    {/*            <div key={service.id} className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">*/}
                    {/*                <h3 className="text-xl font-semibold">{service.name}</h3>*/}
                    {/*                <p className="text-gray-600 mt-2">{service.description}</p>*/}
                    {/*            </div>*/}
                    {/*        ))}*/}
                    {/*    </div>*/}
                    {/*</section>*/}

                    {/* Call to Action */}
                    <section className="text-center bg-gradient-to-r from-orange-600 to-orange-800 text-white py-12 px-6 rounded-2xl shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                        <p className="mb-6 text-lg">Hire equipment or request engineering services tailored to your needs.</p>
                        <div className="space-x-4">
                            <button className="bg-white text-orange-700 px-6 py-3 rounded-xl font-semibold shadow hover:bg-gray-200">
                                Book Now
                            </button>
                        </div>
                    </section>

                </div>

            </div>
            <Footer/>
        </>
    );
};

export default Services;
