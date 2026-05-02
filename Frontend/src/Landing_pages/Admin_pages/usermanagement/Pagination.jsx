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
    <div className="flex items-center justify-between mt-6 px-4 py-4 bg-white dark:bg-[#13151a] border border-slate-200 dark:border-white/5 rounded-xl transition-colors">

      {/* Info */}
      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold">
        Page {currentPage} of {totalPages}
      </p>

      {/* Controls */}
      <div className="flex items-center gap-2">

        {/* Prev */}
        <button
          onClick={goPrev}
          className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
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
              className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors
                ${
                  currentPage === page
                    ? "bg-purple-600 text-white border-purple-500"
                    : "border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
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
          className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          ▶
        </button>
      </div>
    </div>
  );
}