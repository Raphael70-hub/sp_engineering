const ProductFilters = ({ setCategory, setMaterial, setSort, setSearch }) => {
    return (
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10">
            {/* Left: Filters */}
            <div className="flex flex-wrap justify-center gap-4">
                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search products..."
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 w-60"
                />

                {/* Category Filter */}
                <div className="relative">
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        className="appearance-none px-6 py-3 pr-10 border border-gray-300 rounded-xl shadow-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                        <option value="All">All Categories</option>
                        <option value="Construction">Construction</option>
                        <option value="Industrial">Industrial</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Plumbing">Plumbing</option>
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                      ▼
                    </span>
                </div>

                {/* Material Filter */}
                <div className="relative">
                    <select
                        onChange={(e) => setMaterial(e.target.value)}
                        className="appearance-none px-6 py-3 pr-10 border border-gray-300 rounded-xl shadow-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                        <option value="All">All Materials</option>
                        <option value="Steel">Steel</option>
                        <option value="Aluminum">Aluminum</option>
                        <option value="Iron">Iron</option>
                        <option value="Copper">Copper</option>
                        <option value="PVC">PVC</option>
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                  ▼
                </span>
                </div>

                {/* Sort */}
                <div className="relative">
                    <select
                        onChange={(e) => setSort(e.target.value)}
                        className="appearance-none px-6 py-3 pr-10 border border-gray-300 rounded-xl shadow-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                        <option value="none">Sort By</option>
                        <option value="low-high">Price: Low to High</option>
                        <option value="high-low">Price: High to Low</option>
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                  ▼
                </span>
                </div>
            </div>

        </div>
    );
};

export default ProductFilters;
