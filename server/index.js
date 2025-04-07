const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const CustomersModel = require("./models/Customers");
const BookingModel = require("./models/Booking");
require("dotenv").config();

const app = express();

// ✅ Force CORS Headers (for preflight and general requests)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://dreamers-academy-kappa.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  // ✅ Respond to preflight OPTIONS requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// ✅ Additional CORS Middleware (still useful for JSON requests)
app.use(cors({
  origin: "https://dreamers-academy-kappa.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// ✅ JSON Parsing Middleware
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ User Signup
app.post("/signup", (req, res) => {
  CustomersModel.create(req.body)
    .then(customers => res.json(customers))
    .catch(err => res.json(err));
});

// ✅ User Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  CustomersModel.findOne({ email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json({ message: "Success", user });
        } else {
          res.json({ message: "Password is incorrect" });
        }
      } else {
        res.json({ message: "No such user, Please register first." });
      }
    })
    .catch(err => res.json(err));
});

// ✅ Book a Seat
app.post("/book-seat", async (req, res) => {
  console.log("📢 Received Booking Data:", req.body);
  const { name, email, phone, courseTitle, preferredBatch, additionalInfo } = req.body;

  if (!name || !email || !phone || !courseTitle || !preferredBatch) {
    return res.status(400).json({ message: "Missing required fields!" });
  }

  try {
    const booking = await BookingModel.create({
      name,
      email,
      phone,
      courseTitle,
      preferredBatch,
      additionalInfo
    });
    res.json({ message: "Booking successful!", booking });
  } catch (err) {
    res.status(500).json({ error: "Failed to save booking.", details: err.message });
  }
});

// ✅ Get Bookings by User
app.get("/bookings/:email", async (req, res) => {
  try {
    const userBookings = await BookingModel.find({ email: req.params.email });
    if (!userBookings.length) {
      return res.status(404).json({ message: "No bookings found for this user" });
    }
    res.status(200).json(userBookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings", details: error.message });
  }
});

// ✅ Delete a Booking
app.delete("/bookings/:id", async (req, res) => {
  try {
    const deletedBooking = await BookingModel.findByIdAndDelete(req.params.id);
    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete booking", details: error.message });
  }
});


// ✅ Get All Bookings
app.get("/book-seat", async (req, res) => {
  try {
    const bookings = await BookingModel.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings." });
  }
});

// ✅ Final: Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
