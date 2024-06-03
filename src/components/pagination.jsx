import React from 'react';

const Pagination = ({ total, pageSize, onChange, currentPage }) => {
    const totalPages = Math.ceil(total / pageSize);

    const handlePageChange = (page) => {
        onChange(page);
    };

    const renderPaginationItems = () => {
        const paginationItems = [];

        for (let i = 1; i <= totalPages; i++) {
            paginationItems.push(
                <li
                    key={i}
                    className={`mx-1 px-3 py-2 bg-white text-gray-500 rounded-lg ${i === currentPage ? 'border-customRed border-2 text-customRed' : ''}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </li>
            );
        }

        return paginationItems;
    };

    return (
        <div className="flex justify-center space-x-4">
            <button 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1}
                className="mx-1 px-3 py-2 bg-white text-gray-500 rounded-lg"
            >
                &lt;
            </button>
            <ul className="flex justify-center space-x-4">
                {renderPaginationItems()}
            </ul>
            <button 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages}
                className="mx-1 px-3 py-2 bg-white text-gray-500 rounded-lg"
            >
                &gt;
            </button>
        </div>
    );
};

export default Pagination;