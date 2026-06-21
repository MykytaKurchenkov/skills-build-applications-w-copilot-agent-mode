import express, { Express } from 'express';
import { connectDatabase } from './config/database';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const app: Express = express();
const PORT = 8000;

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
connectDatabase()
  .catch(err => {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  });

/**
 * Build API URL based on environment
 * Uses CODESPACE_NAME when available for Codespaces environment
 * Falls back to localhost for local development
 */
const getApiUrl = (): string => {
  const codespaceName = process.env.CODESPACE_NAME;
  if (codespaceName) {
    // Codespaces: https://{CODESPACE_NAME}-8000.app.github.dev
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  // Local development: http://localhost:8000
  return `http://localhost:${PORT}`;
};

const getEnvironment = (): 'codespaces' | 'local' => {
  return process.env.CODESPACE_NAME ? 'codespaces' : 'local';
};

// Health check endpoint with API URL info
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    apiUrl: getApiUrl(),
    environment: getEnvironment()
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

// Export server and utilities for testing and external use
export { app, PORT, getApiUrl, getEnvironment };

// Start server if this is the main module
if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🚀 OctoFit Tracker API`);
    console.log(`   Environment: ${getEnvironment()}`);
    console.log(`   Port: ${PORT}`);
    console.log(`   API URL: ${getApiUrl()}`);
    console.log(`   Health Check: ${getApiUrl()}/api/health\n`);
  });
}
