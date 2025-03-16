const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const CustomersModel = require("./models/Customers");
const BookingModel = require("./models/Booking");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/Customers");

// Register Route
app.post("/register", (req, res) => {
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
    console.log("📢 Received Booking Data:", req.body); // Debugging

    const { name, email, phone, courseTitle, preferredBatch, additionalInfo } = req.body;

    // Ensure all required fields are present
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



app.get("/user-bookings/:email", async (req, res) => {
    const { email } = req.params;

    try {
        const user = await CustomersModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.json({ bookings: user.bookings });
    } catch (err) {
        console.error("Error fetching user bookings:", err);
        res.status(500).json({ error: "Failed to retrieve bookings." });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
