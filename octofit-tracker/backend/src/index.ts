import express from 'express';
import { connectDatabase } from './config/database';
import { getApiUrl, getEnvironment, getServerConfig } from './config/api';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const app = express();
const serverConfig = getServerConfig();

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

// Start server
app.listen(serverConfig.port, serverConfig.host, () => {
  console.log(`\n🚀 OctoFit Tracker API`);
  console.log(`   Environment: ${serverConfig.environment}`);
  console.log(`   Port: ${serverConfig.port}`);
  console.log(`   Host: ${serverConfig.host}`);
  console.log(`   API URL: ${getApiUrl()}`);
  console.log(`   Health Check: ${getApiUrl()}/api/health\n`);
});
