const mongoose = require("mongoose");

const refreshToken = mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  expire: {
    type: Date,
    default: Date.now() +  60 * 60 * 24 * 7 * 1000 ,
    index: { expires: '7d' },
  },
});

module.exports = mongoose.model("Token", refreshToken);