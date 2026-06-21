"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// GET all users
router.get('/', (req, res) => {
    res.json({ message: 'Get all users', data: [] });
});
// GET user by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Get user ${id}`, data: {} });
});
// POST create new user
router.post('/', (req, res) => {
    res.status(201).json({ message: 'User created', data: {} });
});
// PUT update user
router.put('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `User ${id} updated`, data: {} });
});
// DELETE user
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.status(204).send();
});
exports.default = router;
//# sourceMappingURL=users.js.map