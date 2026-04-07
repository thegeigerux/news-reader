import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: join(__dirname, '../.env') });

const config = {
  port: process.env.PORT || 3001,
  newsApiKey: process.env.NEWS_API_KEY,
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  newsApiUrl: 'https://api.thenewsapi.com/v1/news/all',
  defaultLimit: 3
};

// Validate required configuration
if (!config.newsApiKey) {
  console.error('ERROR: NEWS_API_KEY is required. Please set it in your .env file.');
  process.exit(1);
}

export default config;
