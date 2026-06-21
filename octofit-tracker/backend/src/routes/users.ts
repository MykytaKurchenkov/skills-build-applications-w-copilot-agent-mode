import express, { Request, Response } from 'express';

const router = express.Router();

// GET all users
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Get all users', data: [] });
});

// GET user by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Get user ${id}`, data: {} });
});

// POST create new user
router.post('/', (req: Request, res: Response) => {
  res.status(201).json({ message: 'User created', data: {} });
});

// PUT update user
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `User ${id} updated`, data: {} });
});

// DELETE user
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(204).send();
});

export default router;
