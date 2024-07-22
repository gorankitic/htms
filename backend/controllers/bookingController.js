const Booking = require("../models/bookingModel");
const catchAsync = require("../utils/catchAsync");


// Find all bookings
// GET method
// Protected route /api/bookings
exports.getBookings = catchAsync(async (req, res, next) => {
    const bookings = await Booking.find();

    res.status(200).json({
        status: "success",
        results: bookings.length,
        bookings
    });
});