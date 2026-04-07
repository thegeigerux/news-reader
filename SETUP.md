# News Reader - Setup Guide

## Quick Start

### 1. Get an API Key

1. Visit [TheNewsAPI](https://www.thenewsapi.com/)
2. Sign up for a free account
3. Copy your API key from the dashboard

### 2. Backend Setup

```bash
cd backend
cp .env.example .env

# Edit .env and add:
# NEWS_API_KEY=your_api_key_here

npm install
npm run dev
```

The backend will start on http://localhost:3001

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on http://localhost:5173

## Environment Variables

### Backend (.env file)

```env
# Required - Get from https://www.thenewsapi.com/
NEWS_API_KEY=your_thenewsapi_key_here

# Optional - Server port (default: 3001)
PORT=3001

# Optional - Frontend URL for CORS (default: http://localhost:5173)
CORS_ORIGIN=http://localhost:5173
```

### Frontend (No environment variables needed)

The frontend uses Vite's built-in proxy configuration to route API requests to the backend during development.

## Development Workflow

### Running Both Servers

You'll need two terminal windows:

**Terminal 1 - Backend:**
```bash
cd /Users/jamesgeiger/Desktop/ZTM\ -\ Vibe\ Coding\ /news-reader/backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd /Users/jamesgeiger/Desktop/ZTM\ -\ Vibe\ Coding\ /news-reader/frontend
npm run dev
```

### Building for Production

```bash
# Build frontend
cd frontend
npm run build

# Production files will be in frontend/dist/
```

### API Key Security

⚠️ **Never commit your .env file or expose your API key in client-side code.**

The API key is only used in the backend and is never sent to the browser. All news requests go through the Express proxy server.

## Troubleshooting

### "NEWS_API_KEY is required" error
- Make sure you created the `.env` file in the `backend/` directory
- Ensure the key is spelled correctly: `NEWS_API_KEY=your_key`
- Restart the backend server after adding the key

### CORS errors
- Check that the backend is running on port 3001
- Verify `CORS_ORIGIN` in backend `.env` matches your frontend URL

### "Cannot connect to server" error
- Ensure both backend and frontend are running
- Check that ports 3001 and 5173 are not in use by other applications

## API Limitations

The free tier of TheNewsAPI has some limitations:
- 3 articles per request (enforced by this app)
- Rate limits apply
- Some categories may have fewer results

The app is designed to work gracefully within these constraints.
