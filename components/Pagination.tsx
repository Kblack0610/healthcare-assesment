'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  compact?: boolean;
}

export default function Pagination({ currentPage, totalPages, totalItems, pageSize, onPageChange, compact }: PaginationProps) {
  if (totalPages <= 1) return null;

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-300"
        >
          ←
        </button>
        <span className="text-sm font-medium text-gray-700">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-300"
        >
          →
        </button>
      </div>
    );
  }

  return (
    <div className="px-6 py-4 bg-gray-100 border-t-2 border-gray-300 flex items-center justify-between">
      <div className="text-sm font-semibold text-gray-700">
        Showing {start} to {end} of {totalItems}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-300 border border-gray-400"
        >
          ← Previous
        </button>
        <span className="px-4 py-2 text-sm font-bold text-gray-800 bg-white rounded border border-gray-400">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-300 border border-gray-400"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
