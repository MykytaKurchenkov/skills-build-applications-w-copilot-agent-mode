"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// GET all workouts
router.get('/', (req, res) => {
    res.json({ message: 'Get all workouts', data: [] });
});
// GET workout by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Get workout ${id}`, data: {} });
});
// GET personalized workout suggestions for a user
router.get('/suggestions/:userId', (req, res) => {
    const { userId } = req.params;
    res.json({ message: `Get workout suggestions for user ${userId}`, data: [] });
});
// POST create new workout
router.post('/', (req, res) => {
    res.status(201).json({ message: 'Workout created', data: {} });
});
// PUT update workout
router.put('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Workout ${id} updated`, data: {} });
});
// DELETE workout
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.status(204).send();
});
exports.default = router;
//# sourceMappingURL=workouts.js.map