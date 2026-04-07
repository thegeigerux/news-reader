import { ArrowLeft, Trash2, Bookmark } from 'lucide-react';
import ArticleCard from './ArticleCard';
import './SavedArticles.css';

function SavedArticles({ bookmarks, onArticleClick, onToggleBookmark, onBack }) {
  return (
    <div className="saved-articles animate-fade-in">
      <div className="saved-header">
        <button 
          className="back-btn"
          onClick={onBack}
          aria-label="Go back to news feed"
        >
          <ArrowLeft size={20} />
          <span>Back to News</span>
        </button>
      </div>

      <div className="page-header">
        <h1 className="page-title">Saved Articles</h1>
        {bookmarks.length > 0 && (
          <p className="page-summary">
            {bookmarks.length} article{bookmarks.length !== 1 ? 's' : ''} saved for later
          </p>
        )}
      </div>

      {bookmarks.length === 0 ? (
        <div className="saved-empty">
          <div className="saved-empty-icon">
            <Bookmark size={48} />
          </div>
          <h3 className="saved-empty-title">No saved articles yet</h3>
          <p className="saved-empty-text">
            Bookmark articles you want to read later. They'll appear here.
          </p>
          <button className="btn btn-primary" onClick={onBack}>
            Browse News
          </button>
        </div>
      ) : (
        <>
          <div className="saved-grid">
            {bookmarks.map((article, index) => (
              <ArticleCard
                key={article.uuid}
                article={article}
                onClick={() => onArticleClick(article)}
                isBookmarked={true}
                onToggleBookmark={() => onToggleBookmark(article)}
                style={{ animationDelay: `${index * 50}ms` }}
              />
            ))}
          </div>
          
          <div className="saved-footer-actions">
            <button 
              className="btn btn-secondary danger"
              onClick={() => {
                const confirmed = window.confirm('Clear all saved articles?');
                if (confirmed) {
                  bookmarks.forEach(b => onToggleBookmark(b));
                }
              }}
            >
              <Trash2 size={18} />
              Clear All Saved
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default SavedArticles;
