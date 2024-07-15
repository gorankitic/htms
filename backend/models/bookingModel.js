const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    startDate: {
        type: Date,
        required: [true, "Reservation must have a start date."]
    },
    endDate: {
        type: Date,
        required: [true, "Reservation must have a end date."]
    },
    numNights: Number,
    numGuests: Number,
    cabinPrice: {
        type: Number,
        required: [true, "Booking must have a cabin price."],
    },
    extraPrice: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ["unconfirmed", "check-in", "check-out"],
        default: "unconfirmed",
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    observations: String,
    guestId: {
        type: mongoose.Schema.ObjectId,
        ref: "Guest",
        required: [true, "Booking must have a guestId."]
    },
    cabinId: {
        type: mongoose.Schema.ObjectId,
        ref: "Cabin",
        required: [true, "Booking must have a cabinId."]
    }
}, { timestamps: true });

const Booking = mongoose.Model("Booking", bookingSchema);

module.exports = Booking;