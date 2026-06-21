"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// GET all activities
router.get('/', (req, res) => {
    res.json({ message: 'Get all activities', data: [] });
});
// GET activity by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Get activity ${id}`, data: {} });
});
// POST create new activity
router.post('/', (req, res) => {
    res.status(201).json({ message: 'Activity logged', data: {} });
});
// PUT update activity
router.put('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Activity ${id} updated`, data: {} });
});
// DELETE activity
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.status(204).send();
});
exports.default = router;
//# sourceMappingURL=activities.js.map