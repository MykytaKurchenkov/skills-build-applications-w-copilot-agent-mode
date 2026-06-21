import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const app = express();
const PORT = 8000;
const MONGODB_URI = 'mongodb://localhost:27017/octofit-tracker';

// Middleware
app.use(express.json());

// CORS headers for Codespaces and local development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// MongoDB connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// API URL for Codespaces-aware configuration
const getApiUrl = (): string => {
  if (process.env.CODESPACE_NAME) {
    return `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`;
  }
  return `http://localhost:${PORT}`;
};

// Health check endpoint with API URL info
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    apiUrl: getApiUrl(),
    environment: process.env.CODESPACE_NAME ? 'codespaces' : 'local'
  });
});

// Mount route handlers
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'OctoFit Tracker API',
    version: '1.0.0',
    apiUrl: getApiUrl()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`OctoFit Tracker API running on port ${PORT}`);
  console.log(`API URL: ${getApiUrl()}`);
  console.log(`Health check: ${getApiUrl()}/api/health`);
});
