const { User } = require("../models");

const seedDatabase = async () => {
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Seed users 
    const users =  await User.insertMany(seedUsers);

    // Seed thoughts
    const thoughts =  await Thought.insertMany(seedThoughts);

    // Create a map of usernames to user document
    const userMap = {};
    userDocs.forEach(user => {
        userMap[user.username] = user;
    });
    
    // iterate over each thought document
    for (let thought of thoughts) { 
        // Find the user document in the map using the thought's username 
        if (User[thought.username]) {
            // Push the thought's ID to the corresponding user's thoughts array 
            userMap[thought.username].thoughts.push(thought._id);
            // Save the updates user data
            await userMap[thought.username].save();
        }
    }
    console.log('Database seeded successfully!');
    await mongoose.connection.close();
};

seedDatabase().catch(console.error);