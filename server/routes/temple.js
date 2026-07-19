const express = require("express");
const router = express.Router();

const Temple = require("../models/Temple");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
});

// ==============================
// Get All Temples
// ==============================
router.get("/", async (req, res) => {
  try {
    const temples = await Temple.find().sort({ createdAt: -1 });

    res.status(200).json(temples);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ==============================
// Get Single Temple
// ==============================
router.get("/:id", async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);

    if (!temple) {
      return res.status(404).json({
        message: "Temple Not Found",
      });
    }

    res.status(200).json(temple);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ==============================
// Add Temple
// ==============================
router.post(
  "/add",
  upload.single("image"),
  async (req, res) => {
  try {
   const {
  name,
  location,
  description,
  timings,
} = req.body;

const darshanTypes = JSON.parse(
  req.body.darshanTypes
);

const image = `/uploads/${req.file.filename}`;

    // Validation
     if (
  !name ||
  !location ||
  !description ||
  !timings ||
  !req.file
){
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    // Duplicate Temple Check
    const existingTemple = await Temple.findOne({ name });

    if (existingTemple) {
      return res.status(400).json({
        message: "Temple already exists",
      });
    }

    const temple = new Temple({
      name,
      location,
      image,
      description,
      timings,
      darshanTypes,
    });

    await temple.save();

    res.status(201).json({
      message: "Temple Added Successfully",
      temple,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ==============================
// Update Temple
// ==============================
// ==============================
// Update Temple
// ==============================
router.put(
  "/:id",
  upload.single("image"),
  async (req, res) => {
    try {
      const updateData = {
        name: req.body.name,
        location: req.body.location,
        description: req.body.description,
        timings: req.body.timings,
      };

      if (req.body.darshanTypes) {
        updateData.darshanTypes = JSON.parse(
          req.body.darshanTypes
        );
      }

      if (req.file) {
        updateData.image = `/uploads/${req.file.filename}`;
      }

      const temple = await Temple.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
        }
      );

      if (!temple) {
        return res.status(404).json({
          message: "Temple Not Found",
        });
      }

      res.status(200).json({
        message: "Temple Updated Successfully",
        temple,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

// ==============================
// Delete Temple
// ==============================
router.delete("/:id", async (req, res) => {
  try {
    const temple = await Temple.findByIdAndDelete(req.params.id);

    if (!temple) {
      return res.status(404).json({
        message: "Temple Not Found",
      });
    }

    res.status(200).json({
      message: "Temple Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;