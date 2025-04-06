const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const CustomersModel = require("./models/Customers");
const BookingModel = require("./models/Booking");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: ["https://dreamers-academy-kappa.vercel.app/"], // Allow Vercel frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

require("dotenv").config(); // Load environment variables

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// Register Route
app.post("/signup", (req, res) => {
    CustomersModel.create(req.body)
        .then(customers => res.json(customers))
        .catch(err => res.json(err));
});

// Login Route
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

// Booking Route
app.post("/book-seat", async (req, res) => {
    console.log("📢 Received Booking Data:", req.body); 

    const { name, email, phone, courseTitle, preferredBatch, additionalInfo } = req.body;

    if (!name || !email || !phone || !courseTitle || !preferredBatch) {
        console.error("❌ Missing required fields:", req.body);
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

        console.log("✅ Booking saved:", booking);
        res.json({ message: "Booking successful!", booking });
    } catch (err) {
        console.error("❌ Error saving booking:", err);
        res.status(500).json({ error: "Failed to save booking.", details: err.message });
    }
});

app.get("/bookings/:email", async (req, res) => {
    try {
        const { email } = req.params;

        // Fetch bookings for the specific user
        const userBookings = await BookingModel.find({ email });

        if (userBookings.length === 0) {
            return res.status(404).json({ message: "No bookings found for this user" });
        }

        console.log("✅ Retrieved bookings for:", email, userBookings);
        res.status(200).json(userBookings);
    } catch (error) {
        console.error("❌ Error fetching user bookings:", error);
        res.status(500).json({ message: "Failed to fetch bookings", details: error.message });
    }
});
app.delete("/bookings/:email/:id", async (req, res) => {
    try {
        const { email, id } = req.params;

        // Find the booking to ensure it exists for the given user
        const booking = await BookingModel.findOne({ _id: id, email });

        if (!booking) {
            return res.status(404).json({ message: "Booking not found for this user" });
        }

        // Delete the booking
        await BookingModel.findByIdAndDelete(id);

        console.log(`✅ Booking ${id} deleted successfully for ${email}`);
        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        console.error("❌ Error deleting booking:", error);
        res.status(500).json({ message: "Failed to delete booking", details: error.message });
    }
});



app.get("/book-seat", async (req, res) => {
    try {
        const bookings = await BookingModel.find();
        res.json(bookings);  // ✅ Return an array
    } catch (err) {
        console.error("❌ Error fetching bookings:", err);
        res.status(500).json({ error: "Failed to fetch bookings." });
    }
});