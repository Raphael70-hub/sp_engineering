// src/pages/ServicesPage.jsx
import React, { useState, useEffect, useCallback } from "react";
import NavBar from "../sections/NavBar.jsx";
import Footer from "../sections/Footer.jsx";
import Pagination from "../components/Pagination.jsx";
import axios from "axios";
import debounce from "lodash.debounce"; // npm install lodash.debounce
import { API_BASE_URL } from "../constants/index.js";
import {Link} from "react-router-dom";

const Services = () => {
    const [equipment, setEquipment] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    // Filters
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [category, setCategory] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [debouncedMinPrice, setDebouncedMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [debouncedMaxPrice, setDebouncedMaxPrice] = useState("");

    // Categories
    const [categories, setCategories] = useState([]);

    // Debounce handlers (500ms)
    const debouncedSearchHandler = useCallback(
        debounce((value) => {
            setDebouncedSearch(value);
            setCurrentPage(1);
        }, 500),
        []
    );

    const debouncedMinPriceHandler = useCallback(
        debounce((value) => {
            setDebouncedMinPrice(value);
            setCurrentPage(1);
        }, 500),
        []
    );

    const debouncedMaxPriceHandler = useCallback(
        debounce((value) => {
            setDebouncedMaxPrice(value);
            setCurrentPage(1);
        }, 500),
        []
    );

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/categories/all`);
                setCategories([{ id: "All", name: "All Categories" }, ...res.data.categories]);
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };
        fetchCategories();
    }, []);

    // Fetch rental products
    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                setLoading(true);

                const queryParams = new URLSearchParams({
                    page: currentPage,
                    limit: itemsPerPage,
                    product_type: "rental",
                });

                if (debouncedSearch) queryParams.append("search", debouncedSearch);
                if (category) queryParams.append("category_id", category);
                if (debouncedMinPrice) queryParams.append("min_price", debouncedMinPrice);
                if (debouncedMaxPrice) queryParams.append("max_price", debouncedMaxPrice);

                const res = await axios.get(`${API_BASE_URL}/api/products?${queryParams.toString()}`);

                setEquipment(res.data.products || []);
                setTotal(res.data.total || 0);
            } catch (err) {
                console.error("Error fetching rental equipment:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchEquipment();
    }, [currentPage, debouncedSearch, category, debouncedMinPrice, debouncedMaxPrice]);

    const totalPages = Math.ceil(total / itemsPerPage);

    return (
        <>
            <NavBar
                title="Expert Services for Every Project"
                subtitle="From consulting to equipment hire, we deliver solutions that work."
                showButton={false}
            />

            <div className="min-h-screen bg-gray-50 py-12 px-6">
                <div className="max-w-6xl mx-auto space-y-16">

                    {/* Filters */}
                    <section className="bg-white shadow p-6 rounded-xl">
                        <h3 className="text-xl font-bold mb-4 text-gray-800">Filter Equipment</h3>
                        <div className="grid md:grid-cols-4 gap-4">
                            {/* Search */}
                            <input
                                type="text"
                                placeholder="Search..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    debouncedSearchHandler(e.target.value);
                                }}
                                className="border rounded-lg px-3 py-2 w-full"
                            />

                            {/* Category */}
                            <select
                                value={category}
                                onChange={(e) => {
                                    setCategory(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="border rounded-lg px-3 py-2 w-full"
                            >
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>

                            {/* Min Price */}
                            <input
                                type="number"
                                placeholder="Min Price"
                                value={minPrice}
                                onChange={(e) => {
                                    setMinPrice(e.target.value);
                                    debouncedMinPriceHandler(e.target.value);
                                }}
                                className="border rounded-lg px-3 py-2 w-full"
                            />

                            {/* Max Price */}
                            <input
                                type="number"
                                placeholder="Max Price"
                                value={maxPrice}
                                onChange={(e) => {
                                    setMaxPrice(e.target.value);
                                    debouncedMaxPriceHandler(e.target.value);
                                }}
                                className="border rounded-lg px-3 py-2 w-full"
                            />
                        </div>
                    </section>

                    {/* Equipment Hire */}
                    <section>
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">Equipment Hire</h2>

                        {loading ? (
                            <p className="text-gray-600">Loading equipment...</p>
                        ) : equipment.length === 0 ? (
                            <p className="text-gray-600">No equipment available for rental.</p>
                        ) : (
                            <div className="grid md:grid-cols-3 gap-6">
                                {equipment.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition"
                                    >
                                        <img
                                            src={API_BASE_URL + item.image_url}
                                            alt={item.name}
                                            className="w-full h-40 object-cover rounded-lg mb-4"
                                        />
                                        <h3 className="text-xl font-semibold">{item.name}</h3>
                                        <p className="text-gray-600 mt-2">{item.description}</p>

                                        {/* Show rental price if available */}
                                        {item.product_type === "rental" && item.rental_price_per_day ? (
                                            <p className="text-gray-900 font-bold mt-3">
                                                ₦{item.rental_price_per_day}/day
                                            </p>
                                        ) : (
                                            <p className="text-gray-900 font-bold mt-3">
                                                ₦{item.price}
                                            </p>
                                        )}

                                        {/* Stock availability */}
                                        <p
                                            className={`mt-1 text-sm ${
                                                item.stock > 0 ? "text-green-600" : "text-red-600"
                                            }`}
                                        >
                                            {item.stock > 0 ? "Available" : "Out of Stock"}
                                        </p>
                                        <Link
                                            to={`/product/${item.id}`}
                                            className="inline-block mt-3 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                        />
                    </section>

                    {/* Call to Action */}
                    <section className="text-center bg-gradient-to-r from-orange-600 to-orange-800 text-white py-12 px-6 rounded-2xl shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                        <p className="mb-6 text-lg">
                            Hire equipment or request engineering services tailored to your needs.
                        </p>
                        <div className="space-x-4">
                            {/*<button className="bg-white text-orange-700 px-6 py-3 rounded-xl font-semibold shadow hover:bg-gray-200">*/}
                            {/*    Book Now*/}
                            {/*</button>*/}
                        </div>
                    </section>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Services;
