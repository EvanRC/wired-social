const express = require('express');
const app = express();
const mongoose = require('mongoose'); // require mongoose
const { User, Thought } = require('./models');
const userRoutes = require('./routes/userRoutes');
const thoughtRoutes =  require('./routes/thoughtRoutes');
const friendRoutes = require('./routes/friendRoutes');
const reactionRoutes = require('./routes/reactionRoutes');
require('dotenv').config();

// Defined the mongoDB URI (Uniform Resoure Identifer).
const mongoDBUri = 'mongodb://localhost:27017'; // This URI specifies the location of the MongoDB server, in this case being the default port of (297017)
mongoose.connect(mongoDBUri, // Connects to the MongoDb using the mongoose.connct()
     { useNewUrlParser: true, // Tells Mogoose to use the new URl parser instead of the depricated one.
        useUnifiedTopology: true }) // opts in to using the MongoDB drivers new connection managment engine.
    
.then(() => console.log('Successfully connected to MongoDB!')) // This promis resolves if the connection is successful.
.catch(err => console.error('There was a connection error', err)); // If an error occurs, logs the error message to the console.

app.use(express.json()); // for parsing application/json
app.use('/api/users', userRoutes); // Use the user routes
app.use('/api/thoughts', thoughtRoutes); // Use the thoughts route
app.use('/api/reactions', reactionRoutes); // Use the reaction routes 
app.use('/api/friends',friendRoutes); //  Use the friends route

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });