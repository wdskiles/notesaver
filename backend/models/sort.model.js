const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sortSchema = new Schema({
  sort_number: {
    type: Number,
    default: 1
  },
  user_id: { 
    type: String, 
    required: true 
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Sort', sortSchema);;