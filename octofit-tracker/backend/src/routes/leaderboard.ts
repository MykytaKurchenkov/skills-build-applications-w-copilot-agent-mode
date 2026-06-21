import express, { Request, Response } from 'express';

const router = express.Router();

// GET global leaderboard
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Get global leaderboard', data: [] });
});

// GET team leaderboard
router.get('/team/:teamId', (req: Request, res: Response) => {
  const { teamId } = req.params;
  res.json({ message: `Get leaderboard for team ${teamId}`, data: [] });
});

// GET user rank
router.get('/rank/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;
  res.json({ message: `Get rank for user ${userId}`, data: {} });
});

export default router;
