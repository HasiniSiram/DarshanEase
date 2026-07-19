const express = require("express");
const router = express.Router();

const Review = require("../models/Review");

// ==========================
// Add Review
// ==========================
router.post("/add", async (req, res) => {
  try {
    const {
      templeId,
      userEmail,
      rating,
      comment,
    } = req.body;

    if (
      !templeId ||
      !userEmail ||
      !rating ||
      !comment
    ) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    const review = new Review({
      templeId,
      userEmail,
      rating,
      comment,
    });

    await review.save();

    res.status(201).json({
      message: "Review Added Successfully",
      review,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ==========================
// Get Reviews by Temple
// ==========================
router.get("/:templeId", async (req, res) => {
  try {
    const reviews = await Review.find({
      templeId: req.params.templeId,
    }).sort({ createdAt: -1 });

    res.status(200).json(reviews);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;