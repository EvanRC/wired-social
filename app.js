const express = require('express');
const app = express();
const mongoose = require('mongoose'); // require mongoose
const { User, Thought } = require('./models/index');
const userRoutes = require('./routes/userRoutes');
const thoughtRoutes =  require('./routes/thoughtRoutes');
require('dotenv').config();

// Use the mongoDB URI from your .env file or default to a MongoDB URInod
const mongoDBUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/wiredSocialDB';

// Connect mongoose to MongoDB
mongoose.connect(mongoDBUri)
.then (() => console.log('Successfully connected to MongoDB!'))
.catch(err => console.error('There was a connection error', err));

app.use(express.json()); // for parsing application/json

app.use('/api/users', userRoutes); // Use the user routes
app.use('/api/thoughts', thoughtRoutes); // Use the thoughts route

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });