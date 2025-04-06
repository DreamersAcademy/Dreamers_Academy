const express = require('express');
const router = express.Router();
const upload = require('../utils/cloudinaryUploader');
const Booking = require('../modals/booking');

// POST route with image upload
router.post('/book-seat', upload.single('screenshot'), async (req, res) => {
  try {
    const { name, phone, email, course } = req.body;
    const screenshotUrl = req.file.path;

    const booking = new Booking({
      name,
      phone,
      email,
      course,
      screenshot: screenshotUrl,
    });

    await booking.save();

    res.status(200).json({ message: 'Booking successful', booking });
  } catch (err) {
    res.status(500).json({ error: 'Booking failed', details: err.message });
  }
});

module.exports = router;
