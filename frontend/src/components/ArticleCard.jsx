import { Bookmark, Clock } from 'lucide-react';
import { formatDate, truncateText, getFallbackImage } from '../utils/api';
import './ArticleCard.css';

function ArticleCard({ 
  article, 
  variant = 'default', 
  onClick, 
  isBookmarked, 
  onToggleBookmark,
  style 
}) {
  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    onToggleBookmark();
  };

  const imageUrl = article.image_url || getFallbackImage();
  const description = article.description || article.snippet || '';

  return (
    <article 
      className={`article-card card card-hover animate-fade-in ${variant}`}
      onClick={onClick}
      style={style}
    >
      <div className="article-card-image-container">
        <img 
          src={imageUrl} 
          alt={article.title}
          className="article-card-image"
          onError={(e) => {
            e.target.src = getFallbackImage();
          }}
          loading="lazy"
        />
        <button
          className={`article-bookmark-btn ${isBookmarked ? 'active' : ''}`}
          onClick={handleBookmarkClick}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
          aria-pressed={isBookmarked}
        >
          <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>
      
      <div className="article-card-content">
        <div className="article-card-meta">
          <span className="article-source">{article.source}</span>
          <span className="article-dot" aria-hidden="true">·</span>
          <span className="article-time">
            <Clock size={12} aria-hidden="true" />
            {formatDate(article.published_at)}
          </span>
        </div>
        
        <h3 className="article-card-title">{article.title}</h3>
        
        {description && variant !== 'compact' && (
          <p className="article-card-description">
            {truncateText(description, 120)}
          </p>
        )}
      </div>
    </article>
  );
}

export default ArticleCard;
