import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const maxVisible = 5;

    const getPageNumbers = () => {
        let pages = [];
        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(totalPages, start + maxVisible - 1);

        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    const pages = getPageNumbers();

    return (
        <div className="flex justify-center mt-10 space-x-2">
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded-lg hover:bg-blue-100 disabled:opacity-50"
            >
                Previous
            </button>

            {/* First Page */}
            {pages[0] > 1 && (
                <>
                    <button
                        onClick={() => onPageChange(1)}
                        className={`px-3 py-1 border rounded-lg ${
                            currentPage === 1 ? "bg-orange-500 text-white" : "hover:bg-orange-100"
                        }`}
                    >
                        1
                    </button>
                    {pages[0] > 2 && <span className="px-2">...</span>}
                </>
            )}

            {/* Middle Pages */}
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-1 border rounded-lg ${
                        page === currentPage
                            ? "bg-orange-500 text-white"
                            : "hover:bg-blue-100"
                    }`}
                >
                    {page}
                </button>
            ))}

            {/* Last Page */}
            {pages[pages.length - 1] < totalPages && (
                <>
                    {pages[pages.length - 1] < totalPages - 1 && (
                        <span className="px-2">...</span>
                    )}
                    <button
                        onClick={() => onPageChange(totalPages)}
                        className={`px-3 py-1 border rounded-lg ${
                            currentPage === totalPages
                                ? "bg-orange-500 text-white"
                                : "hover:bg-blue-100"
                        }`}
                    >
                        {totalPages}
                    </button>
                </>
            )}

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded-lg hover:bg-blue-100 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
