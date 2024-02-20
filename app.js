const mongoose = require('mongoose'); // require mongoose

const mongoDBUri = 'mongodb://localhost:27017';
mongoose.connect(mongoDBUri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Successfully connected to MongoDB!'))
.catch(err => console.error('There was a connection error', err));