import React from 'react'
import NavBar from "../sections/NavBar.jsx";
import HighlightServices from "../sections/HighlightServices.jsx";
import FeaturedProducts from "../sections/FeaturedProducts.jsx";
import CompanyIntro from "../sections/CompanyIntro.jsx";
import CallToAction from "../sections/CallToAction.jsx";
import Footer from "../sections/Footer.jsx";

const Home = () => {
    return (
        <>
            <NavBar
                title="Building with Precision"
                subtitle="Quality materials & engineering solutions"
                showButton={true}
            />

            <HighlightServices/>
            <FeaturedProducts />
            <CompanyIntro/>
            <CallToAction/>
            <Footer/>
        </>
    )
}
export default Home
