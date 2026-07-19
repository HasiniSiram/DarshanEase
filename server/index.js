const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const bookingRoutes = require("./routes/booking");
const adminRoutes = require("./routes/admin");
const templeRoutes = require("./routes/temple");
const reviewRoutes = require("./routes/review");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/temple", templeRoutes);
app.use("/api/review", reviewRoutes);
// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Error:", err);
  });

// Test Route
app.get("/", (req, res) => {
  res.send("DarshanEase Server is Running...");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});