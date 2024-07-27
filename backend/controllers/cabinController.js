const Cabin = require("../models/cabinModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

// Find all cabins
// GET method
// Protected route /api/cabins
exports.getCabins = catchAsync(async (req, res) => {
    const cabins = await Cabin.find();

    res.status(200).json({
        status: "success",
        results: cabins.length,
        cabins
    });
});

// Create a new cabin
// POST method
// Protected route /api/cabins
exports.createCabin = catchAsync(async (req, res) => {
    const { name, maxCapacity, regularPrice, discount, description, imageUrl } = req.body;

    const cabin = await Cabin.create({ name, maxCapacity, regularPrice, discount, description, imageUrl });

    res.status(201).json({
        _id: cabin._id,
        name: cabin.name,
        maxCapacity: cabin.maxCapacity,
        regularPrice: cabin.regularPrice,
        discount: cabin.discount,
        description: cabin.description,
        imageUrl: cabin.imageUrl
    });
});

// Update cabin
// PATCH method
// Protected route /api/cabins/:cabinId
exports.updateCabin = catchAsync(async (req, res) => {
    const { name, maxCapacity, regularPrice, discount, description, imageUrl } = req.body;

    const updatedCabin = await Cabin.findByIdAndUpdate(req.params.cabinId,
        { name, maxCapacity, regularPrice, discount, description, imageUrl },
        { new: true, runValidators: true }
    );

    if (!updatedCabin) {
        return next(new AppError("There is no cabin with that id.", 404));
    }

    res.status(200).json(updatedCabin);
});

// Delete cabin
// DELETE method
// Protected route /api/cabins/:cabinId
exports.deleteCabin = catchAsync(async (req, res, next) => {
    const cabin = await Cabin.findByIdAndDelete(req.params.cabinId);

    if (!cabin) {
        return next(new AppError("There is no cabin with that id.", 404));
    }

    res.status(204).json({
        status: "success"
    });
});