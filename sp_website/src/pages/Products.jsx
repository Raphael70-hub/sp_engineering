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
                title="Buy Building Materials Online in Nigeria | Smart Build Store by Smart Precision"
                subtitle="Shop quality building materials online in Nigeria with Smart Build. Tiles, roofing sheets, cement, electrical wiring, and imported specials—delivered nationwide."
                showButton={false}
            />

            <ProductCatalog/>
            <Footer/>
        </>
    )
}
export default Products
