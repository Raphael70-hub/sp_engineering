import { useState } from "react";
import ProductFilters from "../components/ProductFilters.jsx";
import Pagination from "../components/Pagination.jsx";
import { Link } from "react-router-dom";


const products = [
    { id: 1, name: "Steel Beam", price: 500, category: "Construction", material: "Steel", image: "/images/steel.jpg" },
    { id: 2, name: "Aluminum Sheet", price: 300, category: "Construction", material: "Aluminum", image: "/images/helmet.jpg" },
    { id: 3, name: "Iron Rod", price: 200, category: "Industrial", material: "Iron", image: "/images/cement.jpg" },
    { id: 4, name: "Copper Wire", price: 150, category: "Electrical", material: "Copper", image: "/images/steel.jpg" },
    { id: 5, name: "PVC Pipe", price: 100, category: "Plumbing", material: "PVC", image: "/images/mixer.jpg" },
];

function ProductCatalog() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [material, setMaterial] = useState("All");
    const [sort, setSort] = useState("none");
    const [currentPage, setCurrentPage] = useState(1);
    // const itemsPerPage = 2;

    // Filter logic
    let filtered = products.filter(
        (p) =>
            (category === "All" || p.category === category) &&
            (material === "All" || p.material === material)
    );

    // Sort logic
    if (sort === "low-high") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "high-low") {
        filtered.sort((a, b) => b.price - a.price);
    }

    return (
        <section className="py-16 px-6 bg-gray-50">
            <h2 className="text-3xl font-bold text-center mb-10 text-orange-500">Product Catalog</h2>

            <ProductFilters
                setCategory={setCategory}
                setMaterial={setMaterial}
                setSort={setSort}
                setSearch={setSearch}

            />

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-xl font-semibold">{product.name}</h3>
                        <p className="text-gray-600">{product.category} • {product.material}</p>
                        <p className="text-lg font-bold mt-2">${product.price}</p>
                        <Link
                            to={`/product/${product.id}`}
                            className="inline-block mt-3 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
                        >
                            View Details
                        </Link>
                    </div>
                ))}

            </div>

            {/* Pagination */}
            <Pagination
                totalPages={100}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
            />

        </section>
    );
}


export default ProductCatalog;
