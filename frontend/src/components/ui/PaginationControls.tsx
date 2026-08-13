import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-6 border-t border-amber-500/10">
      {totalItems !== undefined && (
        <p className="text-sm text-slate-400">
          Showing Page <span className="font-semibold text-gold-400">{currentPage}</span> of{' '}
          <span className="font-semibold text-slate-200">{totalPages}</span> ({totalItems} total items)
        </p>
      )}

      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous Page"
          className="p-2.5 rounded-lg border border-amber-500/20 bg-navy-900 text-slate-300 hover:text-gold-400 hover:border-gold-500/40 disabled:opacity-40 disabled:pointer-events-none transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-lg font-medium text-sm transition-all ${
              currentPage === page
                ? 'bg-gold-500 text-navy-950 font-bold shadow-gold-glow'
                : 'bg-navy-900 border border-amber-500/15 text-slate-300 hover:border-amber-500/40 hover:text-gold-400'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
          className="p-2.5 rounded-lg border border-amber-500/20 bg-navy-900 text-slate-300 hover:text-gold-400 hover:border-gold-500/40 disabled:opacity-40 disabled:pointer-events-none transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
