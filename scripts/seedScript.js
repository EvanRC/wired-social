const mongoose = require('mongoose');
const { User, Thought } = require("../models/index");
const seedDatabase = require('../seeds/seeds')
require('dotenv').config();

// Use the mongoDB URI from your .env file or default to a MongoDB URInod
const mongoDBUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/wiredSocialDB';
mongoose.connect(mongoDBUri)
  .then(() => {
    console.log('Successfully connected to MongoDB!');
    return seedDatabase();
  })
  .then(() => {
    return mongoose.connection.close(); 
  })
  .catch(err => {
    console.warn('There was a seeding/connection error', err);
    process.exit(1);
  });