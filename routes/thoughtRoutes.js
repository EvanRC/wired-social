const express = require('express'); 
const router = express.Router();
const { Thought, User } = require('../models/index');

// Get all thoughts
router.get('/', async (req, res) => {
    try {
        const thought = await Thought.find().select('-__v');
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get a single thought by _id
router.get('/:id', async (req, res) => {
    try { 
        const thought = await Thought.findById(req.params.id).select('-__v');
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a new thought
router.post('/', async (req, res) => {
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
router.put('/:id', async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true } // Ensures the updated document is returned and validations are run
        );
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(thought);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete a thought by an id
router.delete('/:id', async (req, res) => {
    try {
        const deletedThought = await Thought.findOneAndDelete({ _id: req.params.id });
        if (!deletedThought) {
            return res.status(404).json({ message: 'No thought found with this id' });
        }
        // remove the thought reference from the user's thought array
        await User.findByIdAndUpdate(
            deletedThought.userId,
            { $pull: { thoughts: req.params.id } },
            { new: true }
        );
        res.json({ message: 'Thought successfully deleted' });
    } catch (err) {
        console.error(err); // Log the error to see more details
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// Post a reaction to a thought
router.post('/:thoughtId/reactions', async (req,res) => {
    try {
        // Add a reaction to the reactions array of a thought by it's ID
        const reactThought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $push: { reactions:req.body } },
            { new: true, runValidators: true }
        );

        if (!reactThought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }

        res.json(reactThought);
    } catch (err) { 
        res.status(400).json(err);
    }
});

// Delete a reaction
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { new: true }
        );

        if (!updatedThought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }

        res.json(updatedThought);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;