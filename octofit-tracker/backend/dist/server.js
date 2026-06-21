"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvironment = exports.getApiUrl = exports.PORT = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const app = (0, express_1.default)();
exports.app = app;
const PORT = 8000;
exports.PORT = PORT;
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
/**
 * Build API URL based on environment
 * Uses CODESPACE_NAME when available for Codespaces environment
 * Falls back to localhost for local development
 */
const getApiUrl = () => {
    const codespaceName = process.env.CODESPACE_NAME;
    if (codespaceName) {
        // Codespaces: https://{CODESPACE_NAME}-8000.app.github.dev
        return `https://${codespaceName}-8000.app.github.dev`;
    }
    // Local development: http://localhost:8000
    return `http://localhost:${PORT}`;
};
exports.getApiUrl = getApiUrl;
const getEnvironment = () => {
    return process.env.CODESPACE_NAME ? 'codespaces' : 'local';
};
exports.getEnvironment = getEnvironment;
// Health check endpoint with API URL info
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        apiUrl: getApiUrl(),
        environment: getEnvironment()
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
        apiUrl: getApiUrl()
    });
});
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
//# sourceMappingURL=server.js.map