import express from 'express';
import { query, validationResult } from 'express-validator';
import { fetchNews } from '../utils/newsApi.js';

const router = express.Router();

/**
 * Validation rules for news queries
 */
const newsValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer')
    .toInt(),
  query('search')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Search query must be between 2 and 100 characters'),
  query('language')
    .optional()
    .trim()
    .isLength({ min: 2, max: 2 })
    .withMessage('Language code must be 2 characters')
];

/**
 * Handle validation errors
 */
function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Invalid request parameters',
      details: errors.array().map(e => e.msg)
    });
  }
  next();
}

/**
 * GET /api/news/top
 * Get top news stories
 */
router.get('/top', newsValidation, handleValidationErrors, async (req, res) => {
  try {
    const { page = 1, search, language } = req.query;
    
    const result = await fetchNews({
      page,
      search,
      language
    });

    res.json(result);
  } catch (error) {
    console.error('Error fetching top news:', error.message);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch news'
    });
  }
});

/**
 * GET /api/news/category/:category
 * Get news by category
 */
router.get('/category/:category', newsValidation, handleValidationErrors, async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, search, language } = req.query;
    
    // Validate category
    const validCategories = [
      'general', 'business', 'technology', 'health', 
      'sports', 'entertainment', 'science', 'politics'
    ];
    
    if (!validCategories.includes(category.toLowerCase())) {
      return res.status(400).json({
        success: false,
        error: `Invalid category. Must be one of: ${validCategories.join(', ')}`
      });
    }

    const result = await fetchNews({
      category,
      page,
      search,
      language
    });

    res.json(result);
  } catch (error) {
    console.error(`Error fetching ${req.params.category} news:`, error.message);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch news'
    });
  }
});

/**
 * GET /api/news/search
 * Search news by keyword
 */
router.get('/search', [
  query('q')
    .trim()
    .notEmpty()
    .withMessage('Search query is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Search query must be between 2 and 100 characters'),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer')
    .toInt()
], handleValidationErrors, async (req, res) => {
  try {
    const { q: searchQuery, page = 1, language } = req.query;
    
    const result = await fetchNews({
      search: searchQuery,
      page,
      language
    });

    res.json(result);
  } catch (error) {
    console.error('Error searching news:', error.message);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to search news'
    });
  }
});

export default router;
