import { useState } from "react";

export default function Pagination({ totalPages = 10, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (page) => {
    setCurrentPage(page);
    onPageChange?.(page);
  };

  const goPrev = () => {
    if (currentPage > 1) {
      handleClick(currentPage - 1);
    }
  };

  const goNext = () => {
    if (currentPage < totalPages) {
      handleClick(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-between mt-6 px-4 py-4 bg-slate-900/40 rounded-xl">

      {/* Info */}
      <p className="text-xs text-slate-400 uppercase tracking-widest">
        Page {currentPage} of {totalPages}
      </p>

      {/* Controls */}
      <div className="flex items-center gap-2">

        {/* Prev */}
        <button
          onClick={goPrev}
          className="px-3 py-1 rounded border border-slate-700 text-slate-400 hover:text-white"
        >
          ◀
        </button>

        {/* Pages */}
        {Array.from({ length: totalPages }).map((_, i) => {
          const page = i + 1;

          return (
            <button
              key={page}
              onClick={() => handleClick(page)}
              className={`px-3 py-1 rounded text-xs border transition
                ${
                  currentPage === page
                    ? "bg-violet-600 text-white border-violet-500"
                    : "border-slate-700 text-slate-400 hover:text-white"
                }
              `}
            >
              {page}
            </button>
          );
        })}

        {/* Next */}
        <button
          onClick={goNext}
          className="px-3 py-1 rounded border border-slate-700 text-slate-400 hover:text-white"
        >
          ▶
        </button>
      </div>
    </div>
  );
}