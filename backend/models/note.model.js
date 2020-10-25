const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  content: { 
    type: String 
  },
  category: { 
    type: String 
  },
  user_id: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    required: true, 
    default: Date.now
  },
  name: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;