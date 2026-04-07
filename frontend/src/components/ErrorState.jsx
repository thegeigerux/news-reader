import { AlertCircle, RefreshCw } from 'lucide-react';
import './ErrorState.css';

function ErrorState({ message, onRetry }) {
  return (
    <div className="error-state" role="alert">
      <div className="error-icon">
        <AlertCircle size={48} strokeWidth={1.5} />
      </div>
      <h3 className="error-title">Something went wrong</h3>
      <p className="error-message">{message}</p>
      {onRetry && (
        <button 
          className="btn btn-primary error-retry"
          onClick={onRetry}
        >
          <RefreshCw size={18} />
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorState;
