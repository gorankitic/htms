const Guest = require("../models/guestModel");
const catchAsync = require("../utils/catchAsync");


// Find all guests
// GET method
// Protected route /api/guests
exports.getGuests = catchAsync(async (req, res) => {
    const guests = await Guest.find();

    res.status(200).json(guests);
});

// Create a guest
// POST method
// Protected route /api/guests
exports.createGuest = catchAsync(async (req, res) => {
    const { name, email, nationalId, nationality } = req.body;

    const guest = await Guest.create({ name, email, nationalId, nationality });

    res.status(201).json({
        _id: guest._id,
        name: guest.name,
        email: guest.email,
        nationalId: guest.nationalId,
        nationality: guest.nationality
    });
});