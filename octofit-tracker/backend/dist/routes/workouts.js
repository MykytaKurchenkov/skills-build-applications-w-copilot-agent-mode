"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Workout_1 = require("../models/Workout");
const router = express_1.default.Router();
// GET all workouts
router.get('/', async (req, res) => {
    try {
        const workouts = await Workout_1.Workout.find();
        res.json({ message: 'Get all workouts', data: workouts });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts' });
    }
});
// GET workout by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const workout = await Workout_1.Workout.findById(id);
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.json({ message: `Get workout ${id}`, data: workout });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workout' });
    }
});
// GET personalized workout suggestions for a user
router.get('/suggestions/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const suggestions = await Workout_1.Workout.find({ suggestedFor: userId });
        res.json({ message: `Get workout suggestions for user ${userId}`, data: suggestions });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workout suggestions' });
    }
});
// POST create new workout
router.post('/', async (req, res) => {
    try {
        const newWorkout = new Workout_1.Workout(req.body);
        await newWorkout.save();
        res.status(201).json({ message: 'Workout created', data: newWorkout });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create workout' });
    }
});
// PUT update workout
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedWorkout = await Workout_1.Workout.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedWorkout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.json({ message: `Workout ${id} updated`, data: updatedWorkout });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update workout' });
    }
});
// DELETE workout
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedWorkout = await Workout_1.Workout.findByIdAndDelete(id);
        if (!deletedWorkout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete workout' });
    }
});
exports.default = router;
//# sourceMappingURL=workouts.js.map