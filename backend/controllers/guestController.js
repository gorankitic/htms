const Guest = require("../models/guestModel");
const catchAsync = require("../utils/catchAsync");

exports.getGuests = catchAsync(async (req, res) => {
    const guests = await Guest.find();

    res.status(200).json(guests);
});