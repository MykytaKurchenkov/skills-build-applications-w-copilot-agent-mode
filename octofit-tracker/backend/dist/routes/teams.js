"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Team_1 = require("../models/Team");
const router = express_1.default.Router();
// GET all teams
router.get('/', async (req, res) => {
    try {
        const teams = await Team_1.Team.find();
        res.json({ message: 'Get all teams', data: teams });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch teams' });
    }
});
// GET team by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const team = await Team_1.Team.findById(id);
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json({ message: `Get team ${id}`, data: team });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch team' });
    }
});
// POST create new team
router.post('/', async (req, res) => {
    try {
        const newTeam = new Team_1.Team(req.body);
        await newTeam.save();
        res.status(201).json({ message: 'Team created', data: newTeam });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create team' });
    }
});
// PUT update team
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTeam = await Team_1.Team.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedTeam) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json({ message: `Team ${id} updated`, data: updatedTeam });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update team' });
    }
});
// DELETE team
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTeam = await Team_1.Team.findByIdAndDelete(id);
        if (!deletedTeam) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete team' });
    }
});
exports.default = router;
//# sourceMappingURL=teams.js.map