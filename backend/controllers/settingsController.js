
const Settings = require("../models/settingsModel");
const catchAsync = require("../utils/catchAsync");

// Get settings
// GET method
// Protected route /api/settings
exports.getSettings = catchAsync(async (req, res) => {
    const settings = await Settings.find();

    console.log(settings[0]);

    res.status(200).json({
        status: "success",
        settings: settings[0]
    });
});