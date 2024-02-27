const mongoose = require('mongoose');
const { User, Thought } = require('../models/index');
const { watch } = require('../models/user');
require('dotenv').config();

// Use the mongoDB URI from your .env file or default to a MongoDB URInod
const mongoDBUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/wiredSocialDB';

// // Connect mongoose to MongoDB
// mongoose.connect(mongoDBUri)
// .then (() => console.log('Successfully connected to MongoDB!'))
// .catch(err => console.error('There was a connection error', err));

const seedUsers = [ // Array of users to seed the mongoDB for testing purposes
    {
        username: 'Jeremy',
        email: 'Jeremy@gmail.com',
        thoughts: [], // This will be populated with thoughtIds after seeding thoughts
        friends: [] // This will be populated with users after seeding users 
    },
    {
        username: 'Tommy',
        email: 'TommyTime@yahoo.net',
        thoughts: [],
        friends: []
    },
    
    {
        username: 'Chloe',
        email: 'ChloeLovesDogs@outlook.net',
        thoughts: [],
        friends: []
    },
];

const seedThoughts = [
    {
        thoughtText: "An introspective thought by one Jeremy...",
        username: 'Jeremy',
        reactions: [
            {
                reactionBody: "Kinda overcomplicating life again man.",
                username: 'Tommy'
            }
        ]
    },
    {
        thoughtText: "A basic thought once agian from Tommy...",
        username: 'Tommy',
        reactions: [
            {
                reactionBody: "Maybe you need to overcomplicate life more!",
                username: 'Jeremy'
            }
        ]
    },
    {
        thoughtText: "My dogs are everything and make the world a better place!",
        username: 'Chloe',
        reactions: [
            {
                reactionBody: "Wish I could slow down and just enjoy the simple things in life like you!",
                username: 'Jeremy',
                reactions: [
                    {
                     reactionBody: "I thought you told me to just overcomplicate my life! @Jeremy",
                     username: 'Tommy'
                    }
                ]
            }
        ]
    }



];

// Function to see User data
const seedUserData = async () => {
    await User.deleteMany({});
    await User.insertMany(seedUsers);
    console.log('Seeded users successfully!');
};

//Function to seed Thought data
const seedThoughtData = async () => {
    await Thought.insertMany(seedThoughts);
    console.log ('Seeded thoughts succesfully!');
};

const seedDatabase = async () => {
    try {
        await seedUserData();
        await seedThoughtData();
        console.log('Database was seeded successfully!');
    } catch (err) {
        console.error(' An error occured while seeding the database...:', err)
    } finally {
        await mongoose.connection.close();
        console.log('Mongoose connection disconnected');
    }
};

module.exports = seedDatabase;