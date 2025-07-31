import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-4 my-8">
      <button
        onClick={handlePrev}
        disabled={currentPage <= 1}
        className="px-4 py-2 bg-cyan-600 text-white rounded disabled:bg-gray-400"
      >
        Previous
      </button>
      <span className="text-white">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        className="px-4 py-2 bg-cyan-600 text-white rounded disabled:bg-gray-400"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
