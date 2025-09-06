import { useEffect, useState } from "react";
import axios from "axios";
import ProductFilters from "../components/ProductFilters.jsx";
import Pagination from "../components/Pagination.jsx";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../constants/index.js";

function ProductCatalog() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState("none");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const itemsPerPage = 15;

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500); // wait 500ms after user stops typing

        return () => clearTimeout(timer);
    }, [search]);

    // Fetch products
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const params = {
                page: currentPage,
                limit: itemsPerPage,
                search: debouncedSearch || undefined,
                product_type: "product"
            };
            if (category !== "All") params.category_id = category;

            const response = await axios.get(`${API_BASE_URL}/api/products`, { params });

            setProducts(response.data.products);
            setTotalPages(Math.ceil(response.data.total / itemsPerPage));
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    // Refetch when debounced search, category, or page changes
    useEffect(() => {
        fetchProducts();
    }, [debouncedSearch, category, currentPage]);

    // Sorting logic
    const sortedProducts = [...products];
    if (sort === "low-high") {
        sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sort === "high-low") {
        sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    return (
        <section className="py-16 px-6 bg-gray-50">
            <h2 className="text-3xl font-bold text-center mb-10 text-orange-500">Product Catalog</h2>

            <ProductFilters
                setCategory={setCategory}
                setSort={setSort}
                setSearch={setSearch}
            />

            {/* Product Grid */}
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sortedProducts.length === 0 ? (
                        <p className="text-center col-span-full text-gray-500">No products found.</p>
                    ) : (
                        sortedProducts.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition"
                            >
                                <img
                                    src={API_BASE_URL + product.image_url}
                                    alt={product.name}
                                    className="w-full h-40 object-cover rounded-lg mb-4"
                                />
                                <h3 className="text-xl font-semibold">{product.name}</h3>
                                <p className="text-gray-600">{product.category_name}</p>
                                <p className="text-lg font-bold mt-2">₦{product.price}</p>
                                <Link
                                    to={`/product/${product.id}`}
                                    className="inline-block mt-3 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
                                >
                                    View Details
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Pagination */}
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </section>
    );
}

export default ProductCatalog;
