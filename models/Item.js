const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mediaUrl: {
    type: String,
    required: true,
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
