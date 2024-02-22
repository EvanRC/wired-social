const mongoose = require('mongoose');
const { User, Thought } = require('../models/index');

mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

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
        Reations: [
            {
                thoughtText: "Kinda overcomplicating life again man.",
                username: 'Tommy'
            }
        ]
    },
    {
        thoughtText: "A basic thought once agian from Tommy...",
        username: 'Tommy',
        reactions: [
            {
                thoughtText: "Maybe you need to overcomplicate life more!",
                username: 'Jermey'
            }
        ]
    },
    {
        thoughtText: "My dogs are everything and make the world a better place!",
        username: 'Chloe',
        reactions: [
            {
                thoughtText: "Wish I could slow down and just enjoy the simple things in life like you!",
                username: 'Jeremy',
                reactions: [
                    {
                     thoughtText: "I thought you told me to just overcomplicate my life! @Jeremy",
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
    console.log('Seeded the user successfully!');
};

//Function to seed Thought data
const seedThoughtData = async () => {
    await seedUserData();
    await seedThoughtData();
    console.log ('Seeded thoughts succesfully!');
};

const seedDatabase = async () => {
    await seedUserData();
    await seedThoughtData();
    mongoose.connection.close();
};

seedDatabase();