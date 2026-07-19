const mongoose = require("mongoose");
require("dotenv").config();

const Temple = require("./models/Temple");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected");

    await Temple.deleteMany();

    await Temple.insertMany([
      {
        name: "Tirumala Tirupati",
        location: "Tirupati, Andhra Pradesh",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/9/9e/Tirumala_Venkateswara_Temple.jpg",
        description:
          "Sri Venkateswara Swamy Temple is one of the most sacred Hindu temples dedicated to Lord Venkateswara.",
        timings: "6:00 AM - 10:00 PM",
        darshanTypes: [
          { name: "Sarva Darshan", price: 0 },
          { name: "Special Entry Darshan", price: 300 },
          { name: "Divya Darshan", price: 0 },
          { name: "VIP Break Darshan", price: 500 },
        ],
      },
      {
        name: "Yadadri",
        location: "Yadadri Bhuvanagiri, Telangana",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/6/67/Yadadri_Temple.jpg",
        description:
          "Sri Lakshmi Narasimha Swamy Temple is one of Telangana's most famous pilgrimage destinations.",
        timings: "4:00 AM - 9:30 PM",
        darshanTypes: [
          { name: "General Darshan", price: 0 },
          { name: "Special Darshan", price: 150 },
          { name: "Seegra Darshan", price: 300 },
        ],
      },
      {
        name: "Srisailam",
        location: "Nandyal, Andhra Pradesh",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/f/fd/Srisailam_Temple.jpg",
        description:
          "Srisailam is one of the twelve Jyotirlingas dedicated to Lord Mallikarjuna Swamy.",
        timings: "5:00 AM - 10:00 PM",
        darshanTypes: [
          { name: "General Darshan", price: 0 },
          { name: "Ati Seegra Darshan", price: 300 },
          { name: "Sparsha Darshan", price: 500 },
        ],
      },
      {
        name: "Bhadrachalam",
        location: "Bhadradri Kothagudem, Telangana",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/2/2d/Bhadrachalam_Temple.jpg",
        description:
          "Sri Seetha Ramachandra Swamy Temple is one of the most important Lord Rama temples in India.",
        timings: "5:30 AM - 9:00 PM",
        darshanTypes: [
          { name: "General Darshan", price: 0 },
          { name: "Special Darshan", price: 100 },
          { name: "Archana Seva", price: 250 },
        ],
      },
    ]);

    console.log("✅ Temples Seeded Successfully");

    process.exit();
  })
  .catch((err) => {
    console.log(err);
  });