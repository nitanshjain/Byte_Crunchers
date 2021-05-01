const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  company: {
    type: String
  },
  location: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  aadharCard: {
    type: String,
    unique: true,
    default: Date.now
  }
});

module.exports = mongoose.model('profile', ProfileSchema);