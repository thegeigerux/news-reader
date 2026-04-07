const API_BASE_URL = import.meta.env.VITE_API_URL || "";

import {
  getSampleArticles,
  searchSampleArticles,
  getSampleArticlesByCategory,
} from "./sampleData.js";

/**
 * Flag to enable sample data fallback when API is unavailable
 * Set to false to disable fallback and show errors instead
 */
const ENABLE_SAMPLE_FALLBACK = true;

/**
 * Generic fetch wrapper with error handling
 */
async function fetchWithErrorHandling(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`,
      );
    }

    return await response.json();
  } catch (error) {
    if (error.message === "Failed to fetch") {
      throw new Error(
        "Unable to connect to the server. Please check your connection.",
      );
    }
    throw error;
  }
}

/**
 * Fetch top news stories
 */
export async function fetchNews(page = 1) {
  try {
    return await fetchWithErrorHandling(
      `${API_BASE_URL}/api/news/top?page=${page}`,
    );
  } catch (error) {
    if (ENABLE_SAMPLE_FALLBACK) {
      console.warn("API unavailable, using sample data:", error.message);
      return getSampleArticles(page);
    }
    throw error;
  }
}

/**
 * Fetch news by category
 */
export async function fetchByCategory(category, page = 1) {
  try {
    return await fetchWithErrorHandling(
      `${API_BASE_URL}/api/news/category/${category}?page=${page}`,
    );
  } catch (error) {
    if (ENABLE_SAMPLE_FALLBACK) {
      console.warn("API unavailable, using sample data:", error.message);
      return getSampleArticlesByCategory(category, page);
    }
    throw error;
  }
}

/**
 * Search news by query
 */
export async function searchNews(query, page = 1) {
  try {
    const encodedQuery = encodeURIComponent(query);
    return await fetchWithErrorHandling(
      `${API_BASE_URL}/api/news/search?q=${encodedQuery}&page=${page}`,
    );
  } catch (error) {
    if (ENABLE_SAMPLE_FALLBACK) {
      console.warn("API unavailable, using sample data:", error.message);
      return searchSampleArticles(query, page);
    }
    throw error;
  }
}

/**
 * Format date to relative time or formatted date
 */
export function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) {
    return "Just now";
  } else if (diffMins < 60) {
    return `${diffMins}m ago`;
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else if (diffDays < 7) {
    return `${diffDays}d ago`;
  } else {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  }
}

/**
 * Truncate text to specified length
 */
export function truncateText(text, maxLength = 150) {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Get fallback image URL
 */
export function getFallbackImage() {
  // Return a data URI for a simple placeholder
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
      <rect width="400" height="300" fill="#e5e7eb"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="14" fill="#9ca3af">
        No image available
      </text>
    </svg>`,
  )}`;
}
