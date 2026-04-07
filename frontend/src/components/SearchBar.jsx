import { Search, X } from 'lucide-react';
import { useState } from 'react';
import './SearchBar.css';

function SearchBar({ value, onSearch, placeholder = 'Search...' }) {
  const [inputValue, setInputValue] = useState(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue.trim());
  };

  const handleClear = () => {
    setInputValue('');
    onSearch('');
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <div className="search-input-wrapper">
        <Search className="search-icon" size={18} aria-hidden="true" />
        <input
          type="search"
          className="search-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          aria-label="Search articles"
        />
        {inputValue && (
          <button
            type="button"
            className="search-clear"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>
      <button type="submit" className="search-submit" aria-label="Search">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
