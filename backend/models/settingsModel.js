const mongoose = require("mongoose");

const settingsSchema = mongoose.Schema({
    bookingLength: {
        type: Number,
        required: [true, "You must provide booking length."],
        min: [1, "Minimim booking length is 1 day."],
        max: [30, "Maximum booking length is 30 days."]
    },
    maxGuestPerBooking: {
        type: Number,
        default: 10
    },
    breakfastPrice: {
        type: Number,
        default: 10,
    }
}, { timestamps: true });

const Settings = mongoose.Model("Settings", settingsSchema);

module.exports = Settings;