const mongoose = require("mongoose");

const DarshanTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },
});

const TempleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    timings: {
      type: String,
      required: true,
      trim: true,
    },

    darshanTypes: {
      type: [DarshanTypeSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Temple", TempleSchema);