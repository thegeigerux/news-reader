import { ChevronLeft, ChevronRight } from 'lucide-react';
import './PaginationControls.css';

function PaginationControls({ 
  currentPage, 
  totalPages, 
  onPageChange,
  hasMore 
}) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && hasMore) {
      onPageChange(currentPage + 1);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  if (totalPages <= 1 && !hasMore) return null;

  return (
    <nav className="pagination" aria-label="Pagination">
      <div className="pagination-info">
        <span className="pagination-text">
          Page {currentPage}
        </span>
      </div>
      
      <div className="pagination-controls">
        <button
          className="pagination-btn"
          onClick={handlePrevious}
          disabled={currentPage <= 1}
          aria-label="Previous page"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="pagination-numbers">
          {getPageNumbers().map(page => (
            <button
              key={page}
              className={`pagination-number ${page === currentPage ? 'active' : ''}`}
              onClick={() => onPageChange(page)}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          className="pagination-btn"
          onClick={handleNext}
          disabled={!hasMore || currentPage >= totalPages}
          aria-label="Next page"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </nav>
  );
}

export default PaginationControls;
