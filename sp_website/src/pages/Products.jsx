import React from 'react'
import NavBar from "../sections/NavBar.jsx";
import HighlightServices from "../sections/HighlightServices.jsx";
import FeaturedProducts from "../sections/FeaturedProducts.jsx";
import CompanyIntro from "../sections/CompanyIntro.jsx";
import CallToAction from "../sections/CallToAction.jsx";
import Footer from "../sections/Footer.jsx";
import ProductCatalog from "../sections/ProductCatalog.jsx";

const Products = () => {
    return (
        <>
            <NavBar
                title="Browse Our Product Range"
                subtitle="High-quality materials and tools for every engineering need."
                showButton={false}
            />

            <ProductCatalog/>
            <Footer/>
        </>
    )
}
export default Products
