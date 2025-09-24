import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constants";
import {Link} from "react-router-dom";

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Example: latest 4 products
                const res = await axios.get(`${API_BASE_URL}/api/products?limit=4`);
                setProducts(res.data.products || []); // assuming API returns { products: [...] }
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <section className="py-16 bg-white text-center">
                <p className="text-gray-600">Loading featured products...</p>
            </section>
        );
    }

    return (
        <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-3">
                {/* Heading */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold">Featured Products</h2>
                        <p className="text-gray-600">Quality tiles, cement, roofing, and electrical materials.</p>
                    </div>
                    <a href="/products" className="btn">Shop Now →</a>
                </div>

                {/* Product Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition transform hover:-translate-y-2"
                        >
                            {/* Product Image */}
                            <img
                                src={`${API_BASE_URL}${product.image_url}`}
                                alt={product.name}
                                className="w-full h-48 object-cover"
                            />

                            {/* Content */}
                            <div className="p-5 text-left">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    {product.name}
                                </h3>
                                <p className="text-gray-600 text-sm mb-3">
                                    {product.description.length > 50
                                        ? product.description.slice(0, 50) + '...'
                                        : product.description}
                                </p>

                                {/* Price */}
                                {product.product_type === "rental" ? (
                                    <p className="text-orange-600 font-bold">
                                        ₦{product.rental_price_per_day} / day
                                    </p>
                                ) : (
                                    <p className="text-orange-600 font-bold">
                                        ₦{product.price}
                                    </p>
                                )}

                                {/* Button */}
                                <Link
                                    to={`/product/${product.id}`}
                                    className="inline-block mt-3 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
