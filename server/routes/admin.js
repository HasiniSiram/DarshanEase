const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");
const Temple = require("../models/Temple");
const User = require("../models/User");
const Review = require("../models/Review");


// Dashboard Statistics
router.get("/dashboard", async (req, res) => {
  try {
    const totalBookings =
      await Booking.countDocuments();

    const totalTemples =
      await Temple.countDocuments();

    const totalUsers =
      await User.countDocuments();

    const totalReviews =
      await Review.countDocuments();

    const bookings = await Booking.find();

    let totalRevenue = 0;

    bookings.forEach((booking) => {
      totalRevenue += booking.amount || 0;
    });
    const templeStats = {};

bookings.forEach((booking) => {
  templeStats[booking.temple] =
    (templeStats[booking.temple] || 0) + 1;
});

let mostBookedTemple = "No Bookings";
let maxBookings = 0;

for (const temple in templeStats) {
  if (templeStats[temple] > maxBookings) {
    maxBookings = templeStats[temple];
    mostBookedTemple = temple;
  }
}

    const recentBookings = await Booking.find()
  .sort({ bookedAt: -1 })
  .limit(5);

    res.status(200).json({
      totalTemples,
      totalBookings,
      totalUsers,
      totalReviews,
      totalRevenue,
      recentBookings,
      mostBookedTemple,
maxBookings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;