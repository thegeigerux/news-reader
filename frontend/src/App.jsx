import { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import CategoryFilters from "./components/CategoryFilters";
import SearchBar from "./components/SearchBar";
import FeaturedArticle from "./components/FeaturedArticle";
import ArticleCard from "./components/ArticleCard";
import ArticleModal from "./components/ArticleModal";
import PaginationControls from "./components/PaginationControls";
import EmptyState from "./components/EmptyState";
import ErrorState from "./components/ErrorState";
import SavedArticles from "./components/SavedArticles";
import SkeletonLoader from "./components/SkeletonLoader";
import { useDarkMode } from "./hooks/useDarkMode";
import { useBookmarks } from "./hooks/useBookmarks";
import { fetchNews, searchNews, fetchByCategory } from "./utils/api";
import "./App.css";

const CATEGORIES = [
  { id: "general", label: "General" },
  { id: "business", label: "Business" },
  { id: "technology", label: "Technology" },
  { id: "health", label: "Health" },
  { id: "sports", label: "Sports" },
  { id: "entertainment", label: "Entertainment" },
];

function App() {
  // Theme
  const [isDark, toggleDarkMode] = useDarkMode();

  // Navigation
  const [currentView, setCurrentView] = useState("home"); // 'home' | 'saved'

  // News state
  const [articles, setArticles] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [secondaryArticles, setSecondaryArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters and pagination
  const [activeCategory, setActiveCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [meta, setMeta] = useState({
    found: 0,
    returned: 0,
    limit: 3,
    page: 1,
  });
  const [usingSampleData, setUsingSampleData] = useState(false);

  // Article modal
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Bookmarks
  const { bookmarks, isBookmarked, toggleBookmark } = useBookmarks();

  // Load news data
  const loadNews = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let response;

      if (searchQuery.trim()) {
        response = await searchNews(searchQuery, currentPage);
      } else if (activeCategory !== "general") {
        response = await fetchByCategory(activeCategory, currentPage);
      } else {
        response = await fetchNews(currentPage);
      }

      if (response.success) {
        const articles = response.data;
        setArticles(articles);
        setMeta(response.meta);
        setUsingSampleData(response.isSampleData || false);

        // Split into featured (1) and secondary (2) for editorial layout
        if (articles.length > 0) {
          setFeaturedArticle(articles[0]);
          setSecondaryArticles(articles.slice(1));
        } else {
          setFeaturedArticle(null);
          setSecondaryArticles([]);
        }

        // Calculate total pages (estimate based on 'found' count)
        const estimatedPages = Math.ceil(
          response.meta.found / response.meta.limit,
        );
        setTotalPages(Math.max(1, estimatedPages));
      } else {
        throw new Error(response.error || "Failed to load news");
      }
    } catch (err) {
      console.error("Error loading news:", err);
      setError(err.message || "Unable to load news. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [activeCategory, searchQuery, currentPage]);

  // Load news when dependencies change
  useEffect(() => {
    loadNews();
  }, [loadNews]);

  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setSearchQuery("");
    setCurrentPage(1);
    setCurrentView("home");
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    setActiveCategory("general");
    setCurrentPage(1);
    setCurrentView("home");
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle article click
  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedArticle(null), 300);
  };

  // Toggle bookmark from modal
  const handleToggleBookmark = (article) => {
    toggleBookmark(article);
  };

  // View saved articles
  const handleViewSaved = () => {
    setCurrentView("saved");
  };

  // View home
  const handleViewHome = () => {
    setCurrentView("home");
  };

  // Get page title
  const getPageTitle = () => {
    if (currentView === "saved") return "Saved Articles";
    if (searchQuery) return `Search: "${searchQuery}"`;
    if (activeCategory !== "general") {
      const cat = CATEGORIES.find((c) => c.id === activeCategory);
      return cat ? cat.label : activeCategory;
    }
    return "Today's Briefing";
  };

  // Get feed summary text
  const getFeedSummary = () => {
    if (loading) return null;
    if (error) return null;
    if (articles.length === 0) return null;

    if (currentView === "saved") {
      return `${bookmarks.length} saved article${bookmarks.length !== 1 ? "s" : ""}`;
    }

    const categoryLabel =
      CATEGORIES.find((c) => c.id === activeCategory)?.label || "curated";
    return `3 ${categoryLabel.toLowerCase()} stories`;
  };

  return (
    <div className="app">
      <Header
        isDark={isDark}
        onToggleDarkMode={toggleDarkMode}
        onViewSaved={handleViewSaved}
        savedCount={bookmarks.length}
        currentView={currentView}
        onViewHome={handleViewHome}
      />

      <main className="main">
        <div className="container">
          {currentView === "home" && (
            <>
              <div className="controls-section">
                <SearchBar
                  value={searchQuery}
                  onSearch={handleSearch}
                  placeholder="Search news..."
                />
                <CategoryFilters
                  categories={CATEGORIES}
                  activeCategory={searchQuery ? null : activeCategory}
                  onCategoryChange={handleCategoryChange}
                />
              </div>

              <div className="page-header">
                <h1 className="page-title">{getPageTitle()}</h1>
                {!loading && !error && (
                  <p className="page-summary">{getFeedSummary()}</p>
                )}
              </div>

              {usingSampleData && (
                <div className="sample-data-notice">
                  <span className="sample-data-icon">ℹ️</span>
                  <span>
                    Showing sample data - TheNewsAPI is temporarily unavailable
                  </span>
                </div>
              )}

              {loading && <SkeletonLoader />}

              {error && !loading && (
                <ErrorState message={error} onRetry={loadNews} />
              )}

              {!loading && !error && articles.length === 0 && (
                <EmptyState
                  type={searchQuery ? "search" : "default"}
                  searchQuery={searchQuery}
                />
              )}

              {!loading && !error && articles.length > 0 && (
                <>
                  <div className="editorial-layout">
                    {featuredArticle && (
                      <FeaturedArticle
                        article={featuredArticle}
                        onClick={() => handleArticleClick(featuredArticle)}
                        isBookmarked={isBookmarked(featuredArticle.uuid)}
                        onToggleBookmark={() =>
                          handleToggleBookmark(featuredArticle)
                        }
                      />
                    )}

                    {secondaryArticles.length > 0 && (
                      <div className="secondary-articles">
                        {secondaryArticles.map((article, index) => (
                          <ArticleCard
                            key={article.uuid}
                            article={article}
                            onClick={() => handleArticleClick(article)}
                            isBookmarked={isBookmarked(article.uuid)}
                            onToggleBookmark={() =>
                              handleToggleBookmark(article)
                            }
                            style={{ animationDelay: `${(index + 1) * 100}ms` }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </>
          )}

          {currentView === "saved" && (
            <SavedArticles
              bookmarks={bookmarks}
              onArticleClick={handleArticleClick}
              onToggleBookmark={toggleBookmark}
              onBack={handleViewHome}
            />
          )}
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p className="footer-text">News Reader - Stay informed, stay calm</p>
          <p className="footer-made">
            Made with <span className="heart-green">♡</span> © James Geiger 2026
          </p>
          <p className="footer-credit">
            Data provided by{" "}
            <a
              href="https://www.thenewsapi.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              TheNewsAPI
            </a>
          </p>
        </div>
      </footer>

      <ArticleModal
        article={selectedArticle}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isBookmarked={
          selectedArticle ? isBookmarked(selectedArticle.uuid) : false
        }
        onToggleBookmark={() =>
          selectedArticle && handleToggleBookmark(selectedArticle)
        }
      />
    </div>
  );
}

export default App;
