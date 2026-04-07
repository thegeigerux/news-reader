import { useState } from 'react';
import { 
  Sun, 
  Moon, 
  Bookmark, 
  Menu, 
  X,
  Home
} from 'lucide-react';
import './Header.css';

function Header({ 
  isDark, 
  onToggleDarkMode, 
  onViewSaved, 
  savedCount,
  currentView,
  onViewHome
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = (view) => {
    setMobileMenuOpen(false);
    if (view === 'saved') {
      onViewSaved();
    } else {
      onViewHome();
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <button 
            className="logo"
            onClick={onViewHome}
            aria-label="Go to home"
          >
            <span className="logo-icon">📰</span>
            <span className="logo-text">News Reader</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="nav-desktop" aria-label="Main navigation">
            <button 
              className={`nav-link ${currentView === 'home' ? 'active' : ''}`}
              onClick={() => handleNavClick('home')}
              aria-current={currentView === 'home' ? 'page' : undefined}
            >
              <Home size={18} />
              <span>Home</span>
            </button>
            
            <button 
              className={`nav-link ${currentView === 'saved' ? 'active' : ''}`}
              onClick={() => handleNavClick('saved')}
              aria-current={currentView === 'saved' ? 'page' : undefined}
            >
              <Bookmark size={18} />
              <span>Saved</span>
              {savedCount > 0 && (
                <span className="badge">{savedCount}</span>
              )}
            </button>

            <div className="divider" />

            <button 
              className="theme-toggle"
              onClick={onToggleDarkMode}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          id="mobile-menu"
          className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}
        >
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <button 
              className={`mobile-nav-link ${currentView === 'home' ? 'active' : ''}`}
              onClick={() => handleNavClick('home')}
            >
              <Home size={20} />
              <span>Home</span>
            </button>
            
            <button 
              className={`mobile-nav-link ${currentView === 'saved' ? 'active' : ''}`}
              onClick={() => handleNavClick('saved')}
            >
              <Bookmark size={20} />
              <span>Saved Articles</span>
              {savedCount > 0 && (
                <span className="badge">{savedCount}</span>
              )}
            </button>

            <div className="mobile-divider" />

            <button 
              className="mobile-nav-link"
              onClick={() => {
                onToggleDarkMode();
                setMobileMenuOpen(false);
              }}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
              <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
