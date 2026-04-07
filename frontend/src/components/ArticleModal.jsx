import { useEffect } from 'react';
import { X, ExternalLink, Bookmark, Clock, Share2 } from 'lucide-react';
import { formatDate, getFallbackImage } from '../utils/api';
import './ArticleModal.css';

function ArticleModal({ 
  article, 
  isOpen, 
  onClose, 
  isBookmarked, 
  onToggleBookmark 
}) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!article) return null;

  const imageUrl = article.image_url || getFallbackImage();
  const description = article.description || article.snippet || '';

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: description,
          url: article.url
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(article.url);
    }
  };

  return (
    <div 
      className={`modal-overlay ${isOpen ? 'open' : ''}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
    >
      <article 
        className={`article-modal ${isOpen ? 'open' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="modal-close"
          onClick={onClose}
          aria-label="Close article"
        >
          <X size={24} />
        </button>

        <div className="modal-scroll">
          <div className="modal-image-container">
            <img 
              src={imageUrl} 
              alt={article.title}
              className="modal-image"
              onError={(e) => {
                e.target.src = getFallbackImage();
              }}
            />
          </div>

          <div className="modal-content">
            <div className="modal-meta">
              <span className="modal-source">{article.source}</span>
              <span className="modal-dot">·</span>
              <span className="modal-time">
                <Clock size={14} />
                {formatDate(article.published_at)}
              </span>
            </div>

            <h2 id="article-modal-title" className="modal-title">
              {article.title}
            </h2>

            {description && (
              <p className="modal-description">{description}</p>
            )}

            {article.snippet && article.snippet !== description && (
              <p className="modal-snippet">{article.snippet}</p>
            )}

            <div className="modal-actions">
              <a 
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary modal-read-btn"
              >
                Read Full Article
                <ExternalLink size={16} />
              </a>

              <div className="modal-secondary-actions">
                <button
                  className={`btn btn-secondary ${isBookmarked ? 'active' : ''}`}
                  onClick={onToggleBookmark}
                  aria-pressed={isBookmarked}
                >
                  <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
                  {isBookmarked ? 'Saved' : 'Save'}
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={handleShare}
                  aria-label="Share article"
                >
                  <Share2 size={18} />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default ArticleModal;
