const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");

// ===================================
// Book Ticket
// ===================================
router.post("/add", async (req, res) => {
  try {
   const {
  userEmail,
  temple,
  image,
  darshanType,
  date,
  timeSlot,
  persons,
  mobile,
  amount,
} = req.body;
    console.log("Booking Data:", req.body);

    if (
      !userEmail ||
      !temple ||
      !darshanType ||
      !date ||
      !timeSlot ||
      !persons ||
      !mobile
    ) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    if (mobile.length !== 10) {
      return res.status(400).json({
        message: "Enter valid mobile number",
      });
    }

    const booking = new Booking({
      userEmail,
      temple,
        image,
      darshanType,
      date,
      timeSlot,
      persons,
      mobile,
      amount,
    });

    await booking.save();

    res.status(201).json({
      message: "Ticket Booked Successfully",
      bookingId: booking.bookingId,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ===================================
// Get All Bookings (Admin)
// ===================================
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({
      bookedAt: -1,
    });

    res.status(200).json(bookings);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ===================================
// Get User Bookings
// ===================================
router.get("/:email", async (req, res) => {
  try {
    const bookings = await Booking.find({
      userEmail: req.params.email,
    }).sort({
      bookedAt: -1,
    });

    res.status(200).json(bookings);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ===================================
// Cancel Booking
// ===================================
router.delete("/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Booking Cancelled Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;