import express from 'express';
import cors from 'cors';
import config from './config.js';
import newsRoutes from './routes/news.js';

const app = express();

// Enable CORS for frontend
app.use(cors({
  origin: config.corsOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON bodies
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// News API routes
app.use('/api/news', newsRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message
  });
});

// Start server
app.listen(config.port, () => {
  console.log(`🚀 News Reader API server running on port ${config.port}`);
  console.log(`📰 Proxying requests to TheNewsAPI`);
  console.log(`🌐 CORS enabled for: ${config.corsOrigin}`);
});

export default app;
