import './SkeletonLoader.css';

function SkeletonLoader() {
  return (
    <div className="skeleton-loader">
      <div className="skeleton-layout">
        {/* Featured skeleton */}
        <div className="skeleton-featured">
          <div className="skeleton skeleton-image skeleton-featured-image" />
          <div className="skeleton-featured-content">
            <div className="skeleton skeleton-text skeleton-meta" />
            <div className="skeleton skeleton-text skeleton-title-lg" />
            <div className="skeleton skeleton-text skeleton-title-md" />
            <div className="skeleton skeleton-text skeleton-paragraph" />
            <div className="skeleton skeleton-text skeleton-paragraph-short" />
          </div>
        </div>

        {/* Secondary skeletons */}
        <div className="skeleton-secondary">
          <div className="skeleton-card-compact">
            <div className="skeleton skeleton-image skeleton-thumb" />
            <div className="skeleton-card-content">
              <div className="skeleton skeleton-text skeleton-meta" />
              <div className="skeleton skeleton-text skeleton-title-sm" />
              <div className="skeleton skeleton-text skeleton-title-xs" />
            </div>
          </div>

          <div className="skeleton-card-compact">
            <div className="skeleton skeleton-image skeleton-thumb" />
            <div className="skeleton-card-content">
              <div className="skeleton skeleton-text skeleton-meta" />
              <div className="skeleton skeleton-text skeleton-title-sm" />
              <div className="skeleton skeleton-text skeleton-title-xs" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonLoader;
