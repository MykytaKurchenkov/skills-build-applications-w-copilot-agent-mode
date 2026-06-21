import express, { Request, Response } from 'express';

const router = express.Router();

// GET all teams
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Get all teams', data: [] });
});

// GET team by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Get team ${id}`, data: {} });
});

// POST create new team
router.post('/', (req: Request, res: Response) => {
  res.status(201).json({ message: 'Team created', data: {} });
});

// PUT update team
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Team ${id} updated`, data: {} });
});

// DELETE team
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(204).send();
});

export default router;
