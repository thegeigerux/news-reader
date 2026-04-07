import './CategoryFilters.css';

function CategoryFilters({ categories, activeCategory, onCategoryChange }) {
  return (
    <nav className="category-filters" aria-label="News categories">
      <div className="category-scroll">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => onCategoryChange(category.id)}
            aria-pressed={activeCategory === category.id}
          >
            {category.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default CategoryFilters;
