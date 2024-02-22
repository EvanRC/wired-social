const express = require('express');
const router = express.Router();
const { User } = require('../models/user')

// Get all the users
router.get('./api/users', async (req, res) => {
    try {
        const users = await User.find().select('-_ _v'); // Exclude the version key from the result
        res.json(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

// Get a single User by it's ID
router.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select('-_ _v')
            .populate('thoughts')
            .populate('friends');
        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Create a new user
router.post('/api/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Update a user by _id
router.put('/api/users/:id', async (req, res) => {
    try {
        const user = await user.findByIdAndUpdate(req.params.id, req.body,
            { new: true, runValidators: true });
            if(!user) {
                return res.status(404).json({ message: 'No user found with this ID!' });
            } 
            res.json(user);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Delete a user by _id
router.delete('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: ' No user found with this id!' });
        }
        res.json({ message: 'User was successfully Terminated!' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});


module.exports = router;