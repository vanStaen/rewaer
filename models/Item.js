const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  mediaUrl: {
    type: String,
    required: true,
  },
  mediaUrlThumb: {
    type: String,
    required: true,
  },
  mediaUrlMedium: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: [String],
    required: false,
  },
  desc: {
    type: String,
    required: false,
  },
  colors: {
    type: [String],
    required: false,
  },
  brand: {
    type: String,
    required: false,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  favorite: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("Item", ItemSchema);
