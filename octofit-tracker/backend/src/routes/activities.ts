import express, { Request, Response } from 'express';
import { Activity } from '../models/Activity';

const router = express.Router();

// GET all activities
router.get('/', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('userId');
    res.json({ message: 'Get all activities', data: activities });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// GET activity by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id).populate('userId');
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({ message: `Get activity ${id}`, data: activity });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
});

// POST create new activity
router.post('/', async (req: Request, res: Response) => {
  try {
    const newActivity = new Activity(req.body);
    await newActivity.save();
    res.status(201).json({ message: 'Activity logged', data: newActivity });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create activity' });
  }
});

// PUT update activity
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedActivity = await Activity.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedActivity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({ message: `Activity ${id} updated`, data: updatedActivity });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update activity' });
  }
});

// DELETE activity
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedActivity = await Activity.findByIdAndDelete(id);
    if (!deletedActivity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity' });
  }
});

export default router;
