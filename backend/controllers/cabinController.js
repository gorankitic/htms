const Cabin = require("../models/cabinModel");

// Find all cabins
// GET method
// Protected route /api/cabins
exports.getCabins = async (req, res, next) => {

    const cabins = Cabin.find().sort({ name: 1 });

    res.status(200).json({
        status: "success",
        results: cabins.length,
        cabins
    });
}