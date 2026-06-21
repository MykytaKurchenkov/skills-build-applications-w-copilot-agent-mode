"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const api_1 = require("./config/api");
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const app = (0, express_1.default)();
const serverConfig = (0, api_1.getServerConfig)();
// Middleware
app.use(express_1.default.json());
// CORS headers for Codespaces and local development
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
// MongoDB connection
(0, database_1.connectDatabase)()
    .catch(err => {
    console.error('Failed to connect to database:', err);
    process.exit(1);
});
// Health check endpoint with API URL info
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        apiUrl: (0, api_1.getApiUrl)(),
        environment: (0, api_1.getEnvironment)()
    });
});
// Mount route handlers
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'OctoFit Tracker API',
        version: '1.0.0',
        apiUrl: (0, api_1.getApiUrl)()
    });
});
// Start server
app.listen(serverConfig.port, serverConfig.host, () => {
    console.log(`\n🚀 OctoFit Tracker API`);
    console.log(`   Environment: ${serverConfig.environment}`);
    console.log(`   Port: ${serverConfig.port}`);
    console.log(`   Host: ${serverConfig.host}`);
    console.log(`   API URL: ${(0, api_1.getApiUrl)()}`);
    console.log(`   Health Check: ${(0, api_1.getApiUrl)()}/api/health\n`);
});
//# sourceMappingURL=index.js.map