const mongoose = require('mongoose')

const users = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: true
  },
  contact: {
    type: Number,
  },
  password: {
    type: String,
    required: true
  }
});

const USER = mongoose.model("USER", users);

module.exports = { USER }