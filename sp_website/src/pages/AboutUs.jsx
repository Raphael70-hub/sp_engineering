import { Users, Award, ShieldCheck, Truck } from "lucide-react"
import {Card, CardContent} from "../components/Card.jsx";
import NavBar from "../sections/NavBar.jsx";
import Footer from "../sections/Footer.jsx";

function AboutUs() {
    return (
        <>
            <NavBar
                title="Trusted Engineering Partner"
                subtitle="Decades of experience, commitment to quality, and innovation in every project."
                showButton={false}
            />

            <div className="px-6 md:px-12 lg:px-20 py-12 space-y-16">
                {/* Company History & Mission */}
                <section className="text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">About Us</h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Founded in 2010, <span className="font-semibold">Our Company</span> has been a trusted leader in
                        industrial equipment and engineering solutions for over a decade.
                        Our mission is to provide high-quality products, exceptional service,
                        and innovative solutions that empower businesses to grow and succeed.
                    </p>
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
                                alt="CEO"
                                className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                            />
                            <h3 className="font-semibold">John Smith</h3>
                            <p className="text-sm text-gray-600">Chief Executive Officer</p>
                        </Card>
                        <Card className="p-6 shadow-md hover:shadow-lg transition rounded-2xl">
                            <img
                                src="https://randomuser.me/api/portraits/women/44.jpg"
                                alt="CTO"
                                className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                            />
                            <h3 className="font-semibold">Sarah Johnson</h3>
                            <p className="text-sm text-gray-600">Chief Technology Officer</p>
                        </Card>
                        <Card className="p-6 shadow-md hover:shadow-lg transition rounded-2xl">
                            <img
                                src="https://randomuser.me/api/portraits/men/68.jpg"
                                alt="COO"
                                className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                            />
                            <h3 className="font-semibold">Michael Lee</h3>
                            <p className="text-sm text-gray-600">Chief Operating Officer</p>
                        </Card>
                    </div>
                </section>

                {/* Certifications & Partners */}
                <section className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl font-bold mb-6">Certifications & Partners</h2>
                    <div className="flex flex-wrap justify-center gap-6">
                        <img src="/cert1.png" alt="Certification" className="h-12 object-contain" />
                        <img src="/cert2.png" alt="Certification" className="h-12 object-contain" />
                        <img src="/partner1.png" alt="Partner" className="h-12 object-contain" />
                        <img src="/partner2.png" alt="Partner" className="h-12 object-contain" />
                    </div>
                </section>
            </div>
            <Footer/>
        </>
    )
}


export default AboutUs;