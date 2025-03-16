const mongoose = require("mongoose");

const CustomersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    bookings: [
        {
            courseTitle: { type: String, required: true },
            preferredBatch: { type: String, required: true },
            additionalInfo: { type: String }
        }
    ]
});

const CustomersModel = mongoose.model("customers", CustomersSchema);
module.exports = CustomersModel;
