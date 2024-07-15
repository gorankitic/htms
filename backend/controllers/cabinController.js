const Cabin = require("../models/cabinModel");
const catchAsync = require("../utils/catchAsync");

// Find all cabins
// GET method
// Protected route /api/cabins
exports.getCabins = catchAsync(async (req, res, next) => {

    const cabins = Cabin.find().sort({ name: 1 });

    res.status(200).json({
        status: "success",
        results: cabins.length,
        cabins
    });
});