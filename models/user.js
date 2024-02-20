const mongoose = require('mongoose'); // Imports the mongoose package to interat with MongoDb
const { Schema } = mongoose; // Destructure the schema constructor from the mongoose object.


// Define a new schema for the User model. The schema represents the structure of the data in MongDB
const userSchema = new Schema({
    // Define's a username field for the user model. The schema representsthe structure of the document (data) in MongoDB.
  username: {
    type: String, // Data type is a string
    unique: true, // ensures usernames are inique across the collection.
    required: true, // Makes the field mandatory
    trim: true // Removes leading and trailing whitespace from the username.
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // Uses a regular expression (regEX) to validate the email format.
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  // Defines a 'thoughts' field, as an array of ObjectID references
  thoughts: [
    {
      type: Schema.Types.ObjectId, // Specifies the type as ObjectID, MongoDB's unique identifier for documents.
      ref: 'Thought' // Establishes a reference to the 'THought model, allowing for population of thought documents.
    }
  ],
  // Defines a 'friends' field, similar to 'thoughts, but references 'User' modelitself to create a self-referencing relationship
  friends: [
    {
      type: Schema.Types.ObjectId, // type is ObjectId
      ref: 'User' // References the 'User' model for friend connections
    }
  ]
}, {
  toJSON: {
    virtuals: true, // Enables virtuals to be included in toJSOn output.
    // Virtuals are fields that are not stored in the the database but calculated using other fields.
  },
  id: false // Prevents the virtual 'Id' field from being added to documant outputs, since MongDb already uses '_id'.
});

// Define a virtual property ' friendCount' that is not stored in MongoDb.
userSchema.virtual('friendCount').get(function() {
  return this.friends.length; // Calculates the number of friends by returning the length of the 'friends' array
});

// Compile and export the 'User' model from the schema.
const User = mongoose.model('User', userSchema);

// Exports the user model to be used in other parts of the app.
module.exports = User;