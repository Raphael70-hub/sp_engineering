import { Users, Award, ShieldCheck, Truck } from "lucide-react"
import {Card, CardContent} from "../components/Card.jsx";
import NavBar from "../sections/NavBar.jsx";
import Footer from "../sections/Footer.jsx";

function AboutUs() {
    return (
        <>
            <NavBar
                title="About Smart Precision Engineering | Nigeria Construction Experts & Smart Build Store"
                subtitle="Discover Smart Precision Engineering Limited, a Nigerian construction company trusted by Nigerians worldwide. From project management to premium building materials and worker connections, we deliver excellence."
                showButton={false}
            />

            <div className="px-6 md:px-12 lg:px-20 py-12 space-y-16">
                {/* Company History & Mission */}
                {/* About Us Section */}
                <section className=" max-w-4xl">
                    <h2 className="text-3xl font-bold mb-4">About Us</h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        <strong>Smart Precision Engineering Limited</strong> is a Nigeria-based construction company specializing in construction project management—from design and planning to construction, handoff, and maintenance. We provide seamless solutions to busy Nigerians and those in the diaspora who want to build confidently at home.
                    </p>
                    <p className="text-gray-600 text-lg leading-relaxed mt-4">
                        Our <strong>Smart Build</strong> store is one of Nigeria’s rapidly growing online markets for premium building materials, both local and imported. With nationwide delivery, homebuilders across Nigeria and abroad can purchase materials with ease.
                    </p>
                    <p className="text-gray-600 text-lg leading-relaxed mt-4">
                        We also empower clients with the <strong>Hire Workers</strong> feature, where construction professionals create portfolios, helping homeowners directly employ and manage skilled workers.
                    </p>
                </section>

                {/* Mission, Vision, Values */}
                <section className="max-w-5xl  space-y-10">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
                        <p className="text-gray-600 text-lg">To make construction seamless, transparent, and accessible for all Nigerians—home and abroad.</p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Our Vision</h2>
                        <p className="text-gray-600 text-lg">To be Nigeria’s leading construction engineering company, trusted for quality, innovation, and reliability.</p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Our Values</h2>
                        <ul className="text-gray-600 text-lg list-disc list-inside text-left max-w-xl">
                            <li><strong>Integrity</strong> – We uphold transparency and honesty in every project.</li>
                            <li><strong>Precision</strong> – Every detail matters in delivering excellence.</li>
                            <li><strong>Innovation</strong> – We leverage technology to transform construction.</li>
                            <li><strong>Commitment</strong> – Dedicated to exceeding client expectations.</li>
                        </ul>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="grid md:grid-cols-4 gap-6">
                    <Card className="text-center p-6 shadow-md hover:shadow-lg transition rounded-2xl">
                        <CardContent>
                            <ShieldCheck className="mx-auto text-orange-600 mb-3" size={40} />
                            <h3 className="font-bold text-lg">Trusted Quality</h3>
                            <p className="text-gray-600 mt-2 text-sm">
                                Every product is tested and certified to ensure reliability.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="text-center p-6 shadow-md hover:shadow-lg transition rounded-2xl">
                        <CardContent>
                            <Truck className="mx-auto text-orange-600 mb-3" size={40} />
                            <h3 className="font-bold text-lg">Fast Delivery</h3>
                            <p className="text-gray-600 mt-2 text-sm">
                                We guarantee timely delivery to keep your projects on track.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="text-center p-6 shadow-md hover:shadow-lg transition rounded-2xl">
                        <CardContent>
                            <Users className="mx-auto text-orange-600 mb-3" size={40} />
                            <h3 className="font-bold text-lg">Expert Team</h3>
                            <p className="text-gray-600 mt-2 text-sm">
                                Our engineers and specialists bring decades of experience.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="text-center p-6 shadow-md hover:shadow-lg transition rounded-2xl">
                        <CardContent>
                            <Award className="mx-auto text-orange-600 mb-3" size={40} />
                            <h3 className="font-bold text-lg">Industry Awards</h3>
                            <p className="text-gray-600 mt-2 text-sm">
                                Recognized for excellence and innovation in engineering.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                {/* Team / Leadership */}
                <section className="max-w-5xl mx-auto text-center">
                    <h2 className="text-2xl font-bold mb-6">Meet Our Leadership</h2>
                    <div className="grid md:grid-cols-3 gap-6">

                        <Card className="p-6 shadow-md hover:shadow-lg transition rounded-2xl">
                            <img
                                src="https://randomuser.me/api/portraits/men/32.jpg"
                                alt="Israel Judah"
                                className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                            />
                            <h3 className="font-semibold">Israel Judah</h3>
                            <p className="text-sm text-gray-600 mb-2">CEO & Head of Operations</p>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                An experienced Construction Site Engineer, part of landmark projects across Lagos, Abuja, and Enugu.
                            </p>
                        </Card>

                        <Card className="p-6 shadow-md hover:shadow-lg transition rounded-2xl">
                            <img
                                src="https://randomuser.me/api/portraits/men/58.jpg"
                                alt="Idowu Joshua Molenisi"
                                className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                            />
                            <h3 className="font-semibold">Idowu Joshua Molenisi</h3>
                            <p className="text-sm text-gray-600 mb-2">Vice President, Engineering</p>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                A Structural Engineer with expertise in mega-projects, including The Ark Legacy seating 110,000 in Canaanland, Lagos.
                            </p>
                        </Card>

                        <Card className="p-6 shadow-md hover:shadow-lg transition rounded-2xl">
                            <img
                                src="https://randomuser.me/api/portraits/men/72.jpg"
                                alt="Bamise Alabi"
                                className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                            />
                            <h3 className="font-semibold">Bamise Alabi</h3>
                            <p className="text-sm text-gray-600 mb-2">Vice President, Technology</p>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                An IT Expert with experience across Nigeria and the US, leading our online platforms and technology.
                            </p>
                        </Card>
                    </div>
                </section>


                {/* Certifications & Partners */}
                {/*<section className="max-w-4xl mx-auto text-center">*/}
                {/*    <h2 className="text-2xl font-bold mb-6">Certifications & Partners</h2>*/}
                {/*    <div className="flex flex-wrap justify-center gap-6">*/}
                {/*        <img src="/cert1.png" alt="Certification" className="h-12 object-contain" />*/}
                {/*        <img src="/cert2.png" alt="Certification" className="h-12 object-contain" />*/}
                {/*        <img src="/partner1.png" alt="Partner" className="h-12 object-contain" />*/}
                {/*        <img src="/partner2.png" alt="Partner" className="h-12 object-contain" />*/}
                {/*    </div>*/}
                {/*</section>*/}
            </div>
            <Footer/>
        </>
    )
}


export default AboutUs;