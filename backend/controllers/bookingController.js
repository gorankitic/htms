// models
const Cabin = require("../models/cabinModel");
const Booking = require("../models/bookingModel");
const Settings = require("../models/settingsModel");

// Global error handler
const AppError = require("../utils/AppError");
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

// Create a booking
// POST method
// Protected route /api/bookings
exports.createBooking = catchAsync(async (req, res, next) => {
    const { startDate, endDate, numGuests, status, hasBreakfast, observations, guestId, cabinId } = req.body;

    const settings = await Settings.find();

    // CHECK NUMBER OF NIGHTS
    // Convert the date strings to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);
    // Calculate the difference in time (milliseconds)
    const timeDifference = end - start;
    // Convert the time difference from milliseconds to days
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const numNights = timeDifference / millisecondsPerDay;

    if (numNights > settings[0].bookingLength) {
        return next(new AppError(`Дужина резервације не може бити дужа од ${settings[0].bookingLength} дана.`, 400));
    }

    const cabin = await Cabin.findById(cabinId);

    // Check number of guests
    if (numGuests > cabin.maxCapacity) {
        return next(new AppError(`Максималан број гостију за овај апартман је ${cabin.maxCapacity}.`, 400));
    }

    // Calculate total price
    let totalPrice = (cabin.regularPrice - cabin.discount) * numNights;
    if (hasBreakfast) {
        totalPrice += settings[0].breakfastPrice * numNights * numGuests;
    }

    const booking = await Booking.create({ startDate, endDate, numNights, numGuests, status, hasBreakfast, totalPrice, observations, guestId, cabinId });

    res.status(201).json(booking);
});