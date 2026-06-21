import express, { Request, Response } from 'express';
import { Leaderboard } from '../models/Leaderboard';

const router = express.Router();

// GET global leaderboard
router.get('/', async (req: Request, res: Response) => {
  try {
    const period = (req.query.period as string) || 'all-time';
    const leaderboard = await Leaderboard.find({ period }).sort({ rank: 1 });
    res.json({ message: 'Get global leaderboard', data: leaderboard });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// GET team leaderboard
router.get('/team/:teamId', async (req: Request, res: Response) => {
  try {
    const { teamId } = req.params;
    const period = (req.query.period as string) || 'all-time';
    const leaderboard = await Leaderboard.find({ teamId, period }).sort({ rank: 1 });
    res.json({ message: `Get leaderboard for team ${teamId}`, data: leaderboard });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team leaderboard' });
  }
});

// GET user rank
router.get('/rank/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const period = (req.query.period as string) || 'all-time';
    const userRank = await Leaderboard.findOne({ userId, period });
    if (!userRank) {
      return res.status(404).json({ error: 'User rank not found' });
    }
    res.json({ message: `Get rank for user ${userId}`, data: userRank });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user rank' });
  }
});

export default router;
