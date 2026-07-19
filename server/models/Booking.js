const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    unique: true,
    default: () =>
      "DE" + Math.random().toString(36).substring(2, 8).toUpperCase(),
  },

  userEmail: {
    type: String,
    required: true,
  },

  temple: {
    type: String,
    required: true,
  },
  image: {
  type: String,
},

  darshanType: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  timeSlot: {
    type: String,
    required: true,
  },

  persons: {
    type: Number,
    required: true,
  },

  mobile: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    default: "Confirmed",
  },

  bookedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Booking", BookingSchema);