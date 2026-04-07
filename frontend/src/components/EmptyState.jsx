import { FileX } from 'lucide-react';
import './EmptyState.css';

function EmptyState({ type = 'default', searchQuery }) {
  const content = {
    default: {
      icon: '📭',
      title: 'No articles found',
      message: 'Try adjusting your filters or search terms to find what you\'re looking for.'
    },
    search: {
      icon: '🔍',
      title: `No results for "${searchQuery}"`,
      message: 'Try a different search term or check your spelling.'
    },
    category: {
      icon: '📂',
      title: 'No articles in this category',
      message: 'Check back later for new stories in this section.'
    }
  };

  const { icon, title, message } = content[type] || content.default;

  return (
    <div className="empty-state">
      <div className="empty-icon" role="img" aria-label="No content">
        {type === 'default' ? <FileX size={48} strokeWidth={1.5} /> : icon}
      </div>
      <h3 className="empty-title">{title}</h3>
      <p className="empty-message">{message}</p>
    </div>
  );
}

export default EmptyState;
