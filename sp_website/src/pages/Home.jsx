import React from 'react'
import NavBar from "../sections/NavBar.jsx";
import HighlightServices from "../sections/HighlightServices.jsx";
import FeaturedProducts from "../sections/FeaturedProducts.jsx";
import CompanyIntro from "../sections/CompanyIntro.jsx";
import CallToAction from "../sections/CallToAction.jsx";
import Footer from "../sections/Footer.jsx";
import AboutPreview from "../sections/AboutPreview.jsx";
import TrustSection from "../sections/TrustSection.jsx";

const Home = () => {
    return (
        <>
            <NavBar
                title="Building the Future with Precision and Excellence"
                subtitle="Smart Precision Engineering Limited is your trusted partner in construction across Nigeria. From project design to delivery, we ensure quality, precision, and timely execution. With Smart Build, buy premium building materials online and hire skilled workers—all in one place."
                showButton={true}
            />

            <AboutPreview />
            <HighlightServices />
            <FeaturedProducts />
            <TrustSection />
            <CallToAction />
            <Footer />
        </>
    )
}
export default Home
