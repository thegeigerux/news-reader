# News Reader

A calm, curated news reader web application built with React and Node.js. Stay informed without the overwhelm.

![News Reader Screenshot](screenshot.png)

## Overview

News Reader is a full-stack portfolio application that demonstrates modern web development practices including:

- **Secure API Proxy**: Backend Express server protects API keys and proxies requests to TheNewsAPI
- **Editorial Design**: Clean, typography-focused UI inspired by premium digital magazines
- **Accessibility First**: Semantic HTML, keyboard navigation, and screen reader support
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Dark Mode**: Thoughtfully designed dark theme for comfortable reading
- **Local Persistence**: Bookmarks and theme preferences saved to localStorage

## Features

- **Curated News Feed**: 3 stories displayed for a focused reading experience
- **Category Filtering**: Browse by General, Business, Technology, Health, Sports, or Entertainment
- **Search**: Find articles by keyword across all categories
- **Bookmarks**: Save articles for later reading
- **Article Modal**: Clean reading experience with external link to full article
- **Dark Mode Toggle**: Switch between light and dark themes
- **Skeleton Loading**: Smooth loading states while fetching data
- **Error Handling**: Graceful error states with retry functionality
- **Empty States**: Helpful messaging when no results are found

## Tech Stack

### Frontend

- **React 18** - UI library with functional components and hooks
- **Vite** - Fast development server and optimized builds
- **CSS Modules** - Component-scoped styling with CSS custom properties
- **Lucide React** - Beautiful, consistent iconography
- **LocalStorage API** - Client-side persistence for bookmarks and preferences

### Backend

- **Node.js** - JavaScript runtime
- **Express** - Web framework for API routes
- **Axios** - HTTP client for external API calls
- **express-validator** - Request validation and sanitization
- **CORS** - Cross-origin resource sharing for development
- **dotenv** - Environment variable management

### External API

- **TheNewsAPI** - News aggregation service (https://www.thenewsapi.com/)

## Project Structure

```
news-reader/
├── backend/
│   ├── src/
│   │   ├── config.js           # Configuration and env validation
│   │   ├── index.js            # Express server entry point
│   │   ├── routes/
│   │   │   └── news.js         # News API routes
│   │   └── utils/
│   │       └── newsApi.js      # TheNewsAPI integration
│   ├── .env.example            # Environment variable template
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── hooks/              # Custom React hooks
│   │   ├── utils/              # API utilities
│   │   ├── App.jsx             # Main application
│   │   ├── index.css           # Global styles
│   │   └── main.jsx            # Entry point
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── vercel.json                 # Vercel deployment configuration
├── package.json                # Root package for monorepo builds
└── README.md
```

## Deployment

### Vercel (Recommended)

This project is configured for full-stack deployment on Vercel with the backend API and frontend served from the same domain.

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add the `NEWS_API_KEY` environment variable in Project Settings
4. Deploy

The `vercel.json` configuration handles:

- Building the Express backend as a serverless function
- Building the React frontend with Vite
- Routing `/api/*` requests to the backend
- Serving static assets and SPA fallback

### Manual Deployment

Build the frontend for production:

```bash
cd frontend
npm run build
```

The built files will be in `frontend/dist/`.

## Local Development

### Prerequisites

- Node.js 18+ and npm
- A free API key from [TheNewsAPI](https://www.thenewsapi.com/)

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd news-reader

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment Variables

```bash
# In the backend directory
cd backend
cp .env.example .env

# Edit .env and add your API key:
# NEWS_API_KEY=your_actual_api_key_here
```

### 3. Run the Application

```bash
# Terminal 1: Start the backend server
cd backend
npm run dev

# Terminal 2: Start the frontend dev server
cd frontend
npm run dev
```

The application will be available at:

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## API Routes

The backend provides these endpoints:

| Method | Route                          | Description            |
| ------ | ------------------------------ | ---------------------- |
| GET    | `/api/health`                  | Health check endpoint  |
| GET    | `/api/news/top`                | Get top news stories   |
| GET    | `/api/news/category/:category` | Get news by category   |
| GET    | `/api/news/search?q=query`     | Search news by keyword |

All routes return:

```json
{
  "success": true,
  "data": [...],      // Array of normalized articles
  "meta": {
    "found": 100,     // Total articles available
    "returned": 3     // Articles in this response
  }
}
```

## Security Note

**Important**: TheNewsAPI key is stored only in the backend `.env` file and is never exposed to the client. All third-party API requests flow through the Express proxy server, keeping credentials secure.

### Security Architecture

```
┌─────────────┐     ┌─────────────────┐     ┌──────────────┐
│   Browser   │────▶│  Express Proxy  │────▶│  TheNewsAPI  │
│  (no key)   │◀────│  (key in .env)  │◀────│              │
└─────────────┘     └─────────────────┘     └──────────────┘
```

## Design System

### Colors

- **Background**: #F7F5F1 (warm off-white)
- **Surface**: #FFFFFF (cards)
- **Primary Text**: #161616 (near-black)
- **Secondary Text**: #5F6368 (muted gray)
- **Accent**: #1D4ED8 (calm blue)

### Typography

- **UI Text**: Inter (weights: 400, 500, 600, 700)
- **Headlines**: Newsreader (weights: 400, 500, 600)

### Spacing

- Based on 4px grid (0.25rem increments)
- Container max-width: 1200px
- Responsive padding: 16px → 24px → 32px

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License - feel free to use this as a portfolio piece or starting point for your own projects.

---

Built with care for focused news consumption.
