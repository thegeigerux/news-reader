import { Bookmark, ExternalLink, Clock } from 'lucide-react';
import { formatDate, truncateText, getFallbackImage } from '../utils/api';
import './FeaturedArticle.css';

function FeaturedArticle({ article, onClick, isBookmarked, onToggleBookmark }) {
  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    onToggleBookmark();
  };

  const imageUrl = article.image_url || getFallbackImage();
  const description = article.description || article.snippet || '';

  return (
    <article 
      className="featured-article card card-hover animate-fade-in"
      onClick={onClick}
    >
      <div className="featured-image-container">
        <img 
          src={imageUrl} 
          alt={article.title}
          className="featured-image"
          onError={(e) => {
            e.target.src = getFallbackImage();
          }}
          loading="lazy"
        />
        <div className="featured-overlay">
          <button
            className={`bookmark-btn-large ${isBookmarked ? 'active' : ''}`}
            onClick={handleBookmarkClick}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
            aria-pressed={isBookmarked}
          >
            <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
      
      <div className="featured-content">
        <div className="featured-meta">
          <span className="featured-source">{article.source}</span>
          <span className="featured-dot" aria-hidden="true">·</span>
          <span className="featured-time">
            <Clock size={14} aria-hidden="true" />
            {formatDate(article.published_at)}
          </span>
        </div>
        
        <h2 className="featured-title">{article.title}</h2>
        
        {description && (
          <p className="featured-description">
            {truncateText(description, 200)}
          </p>
        )}
        
        <div className="featured-actions">
          <span className="read-more">
            Read article
            <ExternalLink size={14} aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  );
}

export default FeaturedArticle;
