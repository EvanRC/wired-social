const express = require('express'); 
const router = express.Router();
const { Thought, User } = require('../models');

// Get all thoughts
router.get('/api/thoughts', async (req, res) => {
    try {
        const thought = await Thought.find().select('-_ _v');
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get a single thought by _id
router.get('/api/thoughts/:id', async (req, res) => {
    try { 
        const thought = await Thought.findById(req.params.id).select('-_ _v');
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a new thought
router.post('/api/thoughts', async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        await User.findByIdAndUpdate(
            req.body.userId,
            { $push: { thoughts: thought._id } },
            { new: true }
        );
        res.status(201).json(thought);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update a thought b it's id
router.put('/api/thoughts/:id', async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.id);
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id!' }); 
        }
        res.json(thought);
    } catch (err) {
    res.status(400).json(err);
    }
});

// Delete a thought by an id
router.delete('/api/thoughts/:id', async (req, res) => {
    try {
        const thought = await Thought.findByIdAndRemove(req.params.id);
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id' });
        }
        // remove the thought reference from the user's thought array
        await User.findByIdAndUpdate(
            thought.userId,
            { $pull: { thoughts: req.params.id } },
            { new: true }
        );
        res.json({ message: 'Thought successfully deleted' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;