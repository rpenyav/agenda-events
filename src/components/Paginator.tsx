import React from "react";

interface PaginatorProps {
  page: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (pageNumber: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({
  page,
  totalPages,
  nextPage,
  prevPage,
  goToPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="d-flex justify-content-between align-items-center mt-4">
      <button
        onClick={prevPage}
        disabled={page <= 1}
        className="btn btn-primary"
      >
        Previous
      </button>

      <div className="pagination-numbers">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => goToPage(pageNumber)}
            className={`btn ${
              page === pageNumber ? "btn-secondary" : "btn-light"
            }`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button
        onClick={nextPage}
        disabled={page >= totalPages}
        className="btn btn-primary"
      >
        Next
      </button>
    </div>
  );
};

export default Paginator;
