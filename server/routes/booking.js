const express = require("express");
const router = express.Router();
const Booking = require("../modals/booking");

// POST /book-seat
router.post("/book-seat", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      courseTitle,
      preferredBatch,
      additionalInfo,
      paymentImage
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !courseTitle || !preferredBatch || !paymentImage) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    const newBooking = new Booking({
      name,
      email,
      phone,
      courseTitle,
      preferredBatch,
      additionalInfo,
      paymentImage, // ✅ Store Cloudinary URL
      createdAt: new Date()
    });

    await newBooking.save();

    res.status(201).json({ message: "Booking successful!", booking: newBooking });
  } catch (err) {
    console.error("❌ Booking Error:", err.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;
