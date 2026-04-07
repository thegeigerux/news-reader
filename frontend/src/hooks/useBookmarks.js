import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'news-reader-bookmarks';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setBookmarks(parsed);
          }
        }
      } catch (error) {
        console.error('Error loading bookmarks:', error);
      }
      setIsLoaded(true);
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
      } catch (error) {
        console.error('Error saving bookmarks:', error);
      }
    }
  }, [bookmarks, isLoaded]);

  const isBookmarked = useCallback((articleId) => {
    return bookmarks.some(b => b.uuid === articleId);
  }, [bookmarks]);

  const toggleBookmark = useCallback((article) => {
    if (!article || !article.uuid) return;

    setBookmarks(prev => {
      const isAlreadySaved = prev.some(b => b.uuid === article.uuid);
      
      if (isAlreadySaved) {
        // Remove bookmark
        return prev.filter(b => b.uuid !== article.uuid);
      } else {
        // Add bookmark with timestamp
        const bookmarkData = {
          ...article,
          bookmarkedAt: new Date().toISOString()
        };
        return [bookmarkData, ...prev];
      }
    });
  }, []);

  const removeBookmark = useCallback((articleId) => {
    setBookmarks(prev => prev.filter(b => b.uuid !== articleId));
  }, []);

  const clearAllBookmarks = useCallback(() => {
    if (typeof window !== 'undefined') {
      const confirmed = window.confirm('Are you sure you want to remove all saved articles?');
      if (confirmed) {
        setBookmarks([]);
      }
    }
  }, []);

  return {
    bookmarks,
    isBookmarked,
    toggleBookmark,
    removeBookmark,
    clearAllBookmarks,
    isLoaded
  };
}
