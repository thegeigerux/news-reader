import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: join(__dirname, "../.env") });

const config = {
  port: process.env.PORT || 3001,
  newsApiKey: process.env.NEWS_API_KEY,
  corsOrigin: process.env.CORS_ORIGIN || "*",
  newsApiUrl: "https://api.thenewsapi.com/v1/news/all",
  defaultLimit: 3,
};

// Validate required configuration (skip in build phase)
if (!config.newsApiKey && process.env.VERCEL_ENV !== "production") {
  console.error(
    "ERROR: NEWS_API_KEY is required. Please set it in your .env file.",
  );
  if (process.env.NODE_ENV !== "production") {
    process.exit(1);
  }
}

export default config;
