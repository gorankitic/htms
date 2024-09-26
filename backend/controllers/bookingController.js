// models
const Cabin = require("../models/cabinModel");
const Booking = require("../models/bookingModel");
const Settings = require("../models/settingsModel");

// Global error handler
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

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
    if (!cabin) {
        return next(new AppError("Тражени апартман не постоји.", 404));
    }

    // Check number of guests
    if (numGuests > cabin.maxCapacity) {
        return next(new AppError(`Максималан број гостију за овај апартман је ${cabin.maxCapacity}.`, 400));
    }

    // Calculate total price
    const cabinPrice = (cabin.regularPrice - cabin.discount) * numNights;
    let breakfastPrice = 0;
    if (hasBreakfast) {
        breakfastPrice = settings[0].breakfastPrice * numNights * numGuests;
    }
    const totalPrice = cabinPrice + breakfastPrice;

    const booking = await Booking.create({ startDate, endDate, numNights, numGuests, status, hasBreakfast, cabinPrice, breakfastPrice, totalPrice, observations, guestId, cabinId });

    console.log(booking)

    res.status(201).json(booking);
});

// Find all bookings
// GET method
// Protected route /api/bookings
exports.getBookings = catchAsync(async (req, res) => {
    // Filtering
    // Remove the fields from req.query before using it to filter Booking collection
    const queryObject = { ...req.query };
    const excludedFields = ["page", "sortBy", "sort", "limit", "fields"];
    excludedFields.forEach(el => delete queryObject[el]);
    let query = Booking.find(queryObject);

    // Sorting
    if (req.query.sortBy) {
        const sortBy = req.query.sortBy;
        const [field, order] = sortBy.split("-");
        const sortObject = { [field]: order === "desc" ? -1 : 1 };
        query = query.sort(sortObject);
    }

    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    // Check if there are more pages
    const totalDocs = await Booking.countDocuments(queryObject);
    const totalPages = Math.ceil(totalDocs / limit);
    const hasMorePages = page < totalPages;

    const bookings = await query;

    res.status(200).json({
        status: "success",
        hasMorePages,
        totalDocs,
        totalPages,
        bookings,
    });
});

// Find booking by _id
// GET method
// Protected route /api/bookings/:bookingId
exports.getBooking = catchAsync(async (req, res, next) => {
    const booking = await Booking.findById(req.params.bookingId);

    if (!booking) {
        return next(new AppError("Резервација са тим бројем не постоји!", 404));
    }

    res.status(200).json({
        status: "success",
        booking
    });
});

// Update booking
// PATCH method
// Protected route /api/bookings/:bookingId
exports.updateBooking = catchAsync(async (req, res, next) => {
    const settings = await Settings.find();
    const booking = await Booking.findById(req.params.bookingId);

    if (!booking) {
        return next(new AppError("Резервација са тим бројем не постоји!", 404));
    }

    let isPaid;
    if (!req.body.isPaid) {
        isPaid = booking.isPaid;
    } else {
        isPaid = req.body.isPaid;
    }

    let totalPrice = booking.totalPrice;
    let breakfastPrice = booking.breakfastPrice;
    let hasBreakfast = booking.hasBreakfast;
    if (req.body.hasBreakfast) {
        breakfastPrice = settings[0].breakfastPrice * booking.numNights * booking.numGuests;
        totalPrice += breakfastPrice;
        hasBreakfast = req.body.hasBreakfast;
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
        req.params.bookingId,
        { status: req.body.status, isPaid, totalPrice, breakfastPrice, hasBreakfast },
        { new: true, runValidators: true }
    );

    res.status(200).json(updatedBooking);
});

// Delete booking
// DELETE method
// Protected route /api/bookings/:bookingId
exports.deleteBooking = catchAsync(async (req, res, next) => {
    const booking = await Booking.findByIdAndDelete(req.params.bookingId);

    if (!booking) {
        return next(new AppError("Не постоји резервација са тим бројем.", 404));
    }

    res.status(204).json({
        status: "success"
    });
});

// Get latest bookings based on a specified number of days
// GET method
// Protected route /api/bookings/latest/:period
exports.getLatestBookings = catchAsync(async (req, res, next) => {

    const days = parseInt(req.params.period) || 7;
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);

    const latestBookings = await Booking.find({ createdAt: { $gte: startDate, $lte: endDate } });

    res.status(200).json({
        status: "success",
        results: latestBookings.length,
        latestBookings
    });
});

// Get latest stays based on a specified number of days 
// GET method
// Protected route /api/bookings/stays/:period
exports.getLatestStays = catchAsync(async (req, res, next) => {

    const days = parseInt(req.params.period) || 7;
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);

    const latestStays = await Booking.find({ startDate: { $gte: startDate, $lte: endDate } });

    res.status(200).json({
        status: "success",
        results: latestStays.length,
        latestStays
    });
});


// Get todays bookings for arriving and leaving guests
// GET method
// Protected route /api/bookings/activity
exports.getTodayStaysActivity = catchAsync(async (req, res, next) => {

    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0)).toISOString();
    const endOfDay = new Date(now.setHours(23, 59, 59, 999)).toISOString();

    const todayActivities = await Booking.find({
        $or: [
            { startDate: { $gte: startOfDay, $lt: endOfDay }, status: "непотврђен" },
            { endDate: { $gte: startOfDay, $lt: endOfDay }, status: "пријављен" }
        ]
    }).sort({ createdAt: -1 });

    res.status(200).json(todayActivities)
});