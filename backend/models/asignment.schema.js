const mongoose = require('mongoose')

const users = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
});

