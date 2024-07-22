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
    totalPrice: {
        type: Number,
        requred: [true, "Booking must have a total price."]
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
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

// Pre-query mongoose hook to populate booking document with guest and cabin data
bookingSchema.pre(/^find/, function (next) {
    this.populate({ path: "guestId", select: "name email" })
        .populate({ path: "cabinId", select: "name" })
    next();
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;