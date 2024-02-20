// Imprting mongoose and extracting the Schema contructor for defining schemas
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Defing a schema for reaction. It represents a reaction to a thought.
const reactionSchema = new Schema({
   // unique identifiers for the reaction, automatucally generated
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },
  // Text content of the reaction, limited to 280 characters
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },

  // The username of the iser who posted the reaction. required.
  username: {
    type: String,
    required: true
  },

  // Timestamp created for when the reaction was made, defualts tot he current date and time.
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => new Date(timestamp).toISOString()
  }
}, {
  toJSON: {
    getters: true // Ensures getters are applied when converting the document to JSON
  },
  id: false // Disables virtual 'Id' field/
});

// Defining a schema for THought. It represents a thought/postby a user.
const thoughtSchema = new Schema({
    // Text content of the thought, required, with a length between1 and 280 characters.
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },

  // Timestamp for when the thought was posted
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => new Date(timestamp).toISOString()
  },

 // The username of the user who posted the thought, required.
  username: {
    type: String,
    required: true
  },
  // Array of the reactions to the thought, using the reactionSchema.
  reactions: [reactionSchema]
}, {
  toJSON: { 
    virtuals: true, // enables virtual properties in JSON output
    getters: true // Apply getters wen converting document to JSON.
  },
  id: false // Disables ID virtual field
});

// Adding a virtial property to 'reactionCountdown' to count the number of reactions.
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// Compiling the 'Thought' model from the 'thoughtSchema'
const Thought = mongoose.model('Thought', thoughtSchema);

// Exporting the thought model to be used elseware in the app.
module.exports = Thought;