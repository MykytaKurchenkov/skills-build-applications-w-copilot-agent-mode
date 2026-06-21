"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// GET all teams
router.get('/', (req, res) => {
    res.json({ message: 'Get all teams', data: [] });
});
// GET team by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Get team ${id}`, data: {} });
});
// POST create new team
router.post('/', (req, res) => {
    res.status(201).json({ message: 'Team created', data: {} });
});
// PUT update team
router.put('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Team ${id} updated`, data: {} });
});
// DELETE team
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.status(204).send();
});
exports.default = router;
//# sourceMappingURL=teams.js.map