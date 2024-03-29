const express = require('express');
const router = express.Router();
const { Thought, User } = require('../models/index');



// Get all the users
router.get('/', async (req, res) => {
    try {
        const users = await User.find().select('-__v'); // Exclude the version key from the result
        res.json(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

// Get a single User by it's ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select('-__v')
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
router.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Update a user by _id
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body,
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
router.delete('/:id', async (req, res) => {
 try {
    // Find and delete the user by the Id
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if(!deletedUser) {
        return res.status(404).json({ message: 'No user found with this Id' });
    }

    // find all thoughts that are associated with the user
    const deletedThoughts = await Thought.deleteMany({ userId: req.params.id });

        // Send response indicating successful deletion
        res.json({
            message: 'User and associated thoughts successfully terminated!',
            deletedUser,
            deletedThoughts
        });    
 } catch (err) {
    // Handle the errors
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
 }

});

// Post to add a friend to a user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        // Add friendId to the userid's friends list
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $addToSet: { friends: req.params.friendId } }, // $addToSet will prevent duplicates
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found with this Id!' });
        }

        res.json(user);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete to remove a friend from a user's friends list 
router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        // Remove friendId from the userId's friends list
        const user =  await User.findByIdAndUpdate(
            req.params.userId,
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found with this id! '});
        }

        res.json(user);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;