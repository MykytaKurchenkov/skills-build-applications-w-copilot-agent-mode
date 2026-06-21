import express, { Request, Response } from 'express';

const router = express.Router();

// GET all activities
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Get all activities', data: [] });
});

// GET activity by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Get activity ${id}`, data: {} });
});

// POST create new activity
router.post('/', (req: Request, res: Response) => {
  res.status(201).json({ message: 'Activity logged', data: {} });
});

// PUT update activity
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Activity ${id} updated`, data: {} });
});

// DELETE activity
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(204).send();
});

export default router;
