import express, { Request, Response } from 'express';
import { Workout } from '../models/Workout';

const router = express.Router();

// GET all workouts
router.get('/', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find();
    res.json({ message: 'Get all workouts', data: workouts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

// GET workout by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({ message: `Get workout ${id}`, data: workout });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
});

// GET personalized workout suggestions for a user
router.get('/suggestions/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const suggestions = await Workout.find({ suggestedFor: userId });
    res.json({ message: `Get workout suggestions for user ${userId}`, data: suggestions });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout suggestions' });
  }
});

// POST create new workout
router.post('/', async (req: Request, res: Response) => {
  try {
    const newWorkout = new Workout(req.body);
    await newWorkout.save();
    res.status(201).json({ message: 'Workout created', data: newWorkout });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create workout' });
  }
});

// PUT update workout
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedWorkout = await Workout.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedWorkout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({ message: `Workout ${id} updated`, data: updatedWorkout });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update workout' });
  }
});

// DELETE workout
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedWorkout = await Workout.findByIdAndDelete(id);
    if (!deletedWorkout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workout' });
  }
});

export default router;
