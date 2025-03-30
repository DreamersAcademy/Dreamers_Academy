const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    courseTitle: { type: String, required: true },
    preferredBatch: { type: String, required: true },
    additionalInfo: { type: String }
}, { timestamps: true });


const BookingModel = mongoose.model("bookings", BookingSchema);
module.exports = BookingModel;
