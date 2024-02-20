const express = require('express');
const app = express();
const mongoose = require('mongoose'); // require mongoose
const { User, Thought } = require('./models');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

// Defined the mongoDB URI (Uniform Resoure Identifer).
const mongoDBUri = 'mongodb://localhost:27017'; // This URI specifies the location of the MongoDB server, in this case being the default port of (297017)
mongoose.connect(mongoDBUri, // Connects to the MongoDb using the mongoose.connct()
     { useNewUrlParser: true, // Tells Mogoose to use the new URl parser instead of the depricated one.
        useUnifiedTopology: true }) // opts in to using the MongoDB drivers new connection managment engine.
    
.then(() => console.log('Successfully connected to MongoDB!')) // This promis resolves if the connection is successful.
.catch(err => console.error('There was a connection error', err)); // If an error occurs, logs the error message to the console.

app.use(express.json()); // for parsing application/json
app.use(userRoutes); // Use the user routes

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });