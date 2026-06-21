"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const app = (0, express_1.default)();
const PORT = 8000;
const MONGODB_URI = 'mongodb://localhost:27017/octofit-tracker';
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
mongoose_1.default.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
// API URL for Codespaces-aware configuration
const getApiUrl = () => {
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
// Start server
app.listen(PORT, () => {
    console.log(`OctoFit Tracker API running on port ${PORT}`);
    console.log(`API URL: ${getApiUrl()}`);
    console.log(`Health check: ${getApiUrl()}/api/health`);
});
//# sourceMappingURL=index.js.map