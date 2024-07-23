const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    startDate: {
        type: Date,
        required: [true, "Резервација мора имати дефинисан почетни дан."]
    },
    endDate: {
        type: Date,
        required: [true, "Резервација мора имати дефинисан задњи дан."]
    },
    numNights: {
        type: Number,
        required: [true, "Резервација мора имати дефинисан број ноћења."]
    },
    numGuests: {
        type: Number,
        required: [true, "Резервација мора имати дефинисан број гостију."],
    },
    totalPrice: {
        type: Number,
        requred: [true, "Резервација мора имати дефинисану коначну цијену."]
    },
    status: {
        type: String,
        enum: ["непотврђен", "пријављен", "одјављен"],
        default: "непотврђен",
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    hasBreakfast: {
        type: Boolean,
        default: false
    },
    observations: String,
    guestId: {
        type: mongoose.Schema.ObjectId,
        ref: "Guest",
        required: [true, "Резервација мора садржати госта."]
    },
    cabinId: {
        type: mongoose.Schema.ObjectId,
        ref: "Cabin",
        required: [true, "Резервација мора садржати апартман."]
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