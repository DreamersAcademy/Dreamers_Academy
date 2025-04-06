const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const CustomersModel = require("./models/Customers");
const BookingModel = require("./models/Booking");
require("dotenv").config();

const app = express();

// ✅ CORS Setup (fixes preflight issue)
app.use(cors({
  origin: "https://dreamers-academy-kappa.vercel.app", // Your frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// ✅ Allow preflight requests for all routes
app.options("*", cors());

// ✅ Middleware
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Your Routes
app.post("/signup", (req, res) => {
  CustomersModel.create(req.body)
    .then(customers => res.json(customers))
    .catch(err => res.json(err));
});

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

app.delete("/bookings/:email/:id", async (req, res) => {
  try {
    const { email, id } = req.params;
    const booking = await BookingModel.findOne({ _id: id, email });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found for this user" });
    }
    await BookingModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete booking", details: error.message });
  }
});

app.get("/book-seat", async (req, res) => {
  try {
    const bookings = await BookingModel.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings." });
  }
});

// ✅ Final line: Render-compatible port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
