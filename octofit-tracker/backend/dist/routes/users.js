"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../models/User");
const router = express_1.default.Router();
// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User_1.User.find();
        res.json({ message: 'Get all users', data: users });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});
// GET user by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User_1.User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: `Get user ${id}`, data: user });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});
// POST create new user
router.post('/', async (req, res) => {
    try {
        const newUser = new User_1.User(req.body);
        await newUser.save();
        res.status(201).json({ message: 'User created', data: newUser });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create user' });
    }
});
// PUT update user
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User_1.User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: `User ${id} updated`, data: updatedUser });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update user' });
    }
});
// DELETE user
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User_1.User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});
exports.default = router;
//# sourceMappingURL=users.js.map