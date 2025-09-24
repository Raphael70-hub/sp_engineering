import {Link} from "react-router-dom";

const HighlightServices = () => {
    const services = [
        {
            title: "Smart Build Online Store",
            desc: "High-quality cement, steel, and aggregates delivered on time.",
            img: "/images/materials.jpg",
            link: "/products",
            // price: "$50",
        },
        {
            title: "Equipment Hire",
            desc: "Affordable heavy equipment rental for construction projects.",
            img: "/images/equipment.jpg",
            link: "/services",
            // price: "$150",
        },
        {
            title: "Construction Project Management",
            desc: "Expert consultation and project management solutions.",
            img: "/images/engineering.jpg",
            link: "/contact",
            // price: "$200",
        },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-6 text-center">
                {/* Heading */}
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Our Core Services
                </h2>
                <p className="text-lg text-gray-600 mb-12">
                    Delivering precision and quality across every project
                </p>

                {/* Services Grid */}
                <div className="grid md:grid-cols-3 gap-10">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-orange-50 overflow-hidden shadow-md hover:shadow-xl transition transform hover:-translate-y-2"
                        >
                            {/* Service Image */}
                            <img
                                src={service.img}
                                alt={service.title}
                                className="w-full h-56 object-cover"
                            />

                            {/* Content */}
                            <div className="p-6 text-left">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 mb-4">{service.desc}</p>
                                {/*<p className="text-yellow-600 font-semibold">*/}
                                {/*    Starts from {service.price}*/}
                                {/*</p>*/}
                                <Link to={service.link}><span className="text-orange-600 font-semibold">Learn more →</span></Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HighlightServices;
