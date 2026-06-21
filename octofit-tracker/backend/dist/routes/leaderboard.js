"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Leaderboard_1 = require("../models/Leaderboard");
const router = express_1.default.Router();
// GET global leaderboard
router.get('/', async (req, res) => {
    try {
        const period = req.query.period || 'all-time';
        const leaderboard = await Leaderboard_1.Leaderboard.find({ period }).sort({ rank: 1 });
        res.json({ message: 'Get global leaderboard', data: leaderboard });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});
// GET team leaderboard
router.get('/team/:teamId', async (req, res) => {
    try {
        const { teamId } = req.params;
        const period = req.query.period || 'all-time';
        const leaderboard = await Leaderboard_1.Leaderboard.find({ teamId, period }).sort({ rank: 1 });
        res.json({ message: `Get leaderboard for team ${teamId}`, data: leaderboard });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch team leaderboard' });
    }
});
// GET user rank
router.get('/rank/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const period = req.query.period || 'all-time';
        const userRank = await Leaderboard_1.Leaderboard.findOne({ userId, period });
        if (!userRank) {
            return res.status(404).json({ error: 'User rank not found' });
        }
        res.json({ message: `Get rank for user ${userId}`, data: userRank });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user rank' });
    }
});
exports.default = router;
//# sourceMappingURL=leaderboard.js.map