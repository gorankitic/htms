
const Settings = require("../models/settingsModel");
const catchAsync = require("../utils/catchAsync");

// Get settings
// GET method
// Protected route /api/settings
exports.getSettings = catchAsync(async (req, res) => {
    const settings = await Settings.find();

    res.status(200).json({
        status: "success",
        settings: settings[0]
    });
});

// Update settings
// PATCH method
// Protected route /api/settings/:settingsId
exports.updateSettings = catchAsync(async (req, res) => {

    const updatedSettings = await Settings.findByIdAndUpdate(req.params.settingsId, { ...req.body }, { new: true, runValidators: true });

    res.status(200).json(updatedSettings);
});