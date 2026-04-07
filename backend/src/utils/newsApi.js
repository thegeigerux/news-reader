import axios from 'axios';
import config from '../config.js';

/**
 * Normalize article data from TheNewsAPI response
 * Ensures consistent field names and handles missing data gracefully
 */
export function normalizeArticle(article) {
  if (!article || typeof article !== 'object') {
    return null;
  }

  return {
    uuid: article.uuid || '',
    title: article.title || 'Untitled Article',
    description: article.description || '',
    snippet: article.snippet || article.description || '',
    url: article.url || '#',
    image_url: article.image_url || null,
    published_at: article.published_at || new Date().toISOString(),
    source: article.source || 'Unknown Source',
    categories: Array.isArray(article.categories) ? article.categories : [],
    locale: article.locale || 'en',
    language: article.language || 'en'
  };
}

/**
 * Normalize API response metadata
 */
export function normalizeMeta(meta) {
  return {
    found: meta?.found || 0,
    returned: meta?.returned || 0,
    limit: meta?.limit || config.defaultLimit,
    page: meta?.page || 1
  };
}

/**
 * Build query parameters for TheNewsAPI
 */
export function buildQueryParams({ search, category, page = 1, language = 'en' }) {
  const params = {
    api_token: config.newsApiKey,
    limit: config.defaultLimit,
    page: page
  };

  // Add search query if provided
  if (search && search.trim()) {
    params.search = search.trim();
  }

  // Add category filter if provided
  if (category && category.trim() && category !== 'general') {
    params.categories = category.trim().toLowerCase();
  }

  // Language parameter
  if (language) {
    params.language = language;
  }

  return params;
}

/**
 * Fetch news from TheNewsAPI
 */
export async function fetchNews(params) {
  try {
    const queryParams = buildQueryParams(params);
    
    const response = await axios.get(config.newsApiUrl, {
      params: queryParams,
      timeout: 10000,
      headers: {
        'Accept': 'application/json'
      }
    });

    const data = response.data;

    // Validate response structure
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid API response format');
    }

    // Normalize articles
    const articles = Array.isArray(data.data) 
      ? data.data.map(normalizeArticle).filter(Boolean)
      : [];

    return {
      success: true,
      data: articles,
      meta: normalizeMeta(data.meta)
    };

  } catch (error) {
    // Handle axios errors
    if (error.response) {
      // API returned an error response
      const status = error.response.status;
      const message = error.response.data?.message || error.message;
      
      if (status === 401) {
        throw new Error('API authentication failed. Please check your API key.');
      } else if (status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else if (status >= 500) {
        throw new Error('News API service is temporarily unavailable.');
      } else {
        throw new Error(`API error: ${message}`);
      }
    } else if (error.request) {
      // Network error
      throw new Error('Unable to reach news service. Please check your connection.');
    } else {
      // Other errors
      throw new Error(error.message || 'Failed to fetch news');
    }
  }
}
