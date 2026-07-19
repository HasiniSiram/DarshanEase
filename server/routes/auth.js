const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register User
router.post("/register", async (req, res) => {
  console.log("Register API Called");
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "User Registered Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
// Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    // Create JWT Token
    const token = jwt.sign(
      { id: user._id },
      "darshanease_secret_key",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      name: user.name,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
// Get User Profile
router.get("/profile/:email", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.params.email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;