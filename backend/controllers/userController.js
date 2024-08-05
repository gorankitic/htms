const User = require("../models/userModel");

const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");


const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) {
            newObj[el] = obj[el];
        }
    });
    return newObj;
}

// Update user profile
// PATCH method
// Protected route /api/users/:userId
exports.updateUser = catchAsync(async (req, res, next) => {
    // Throw an error if user POSTs password data
    if (req.body.password) {
        return next(new AppError("This route is not for update password.", 400));
    }
    if (req.params.userId !== req.user._id.toString()) {
        return next(new AppError("You are not authorized to update this profile.", 403));
    }

    // Filter out unwanted fields that are not allowed to be updated
    const filteredBody = filterObj(req.body, "name", "photoUrl");

    const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, { new: true, runValidators: true });

    res.status(200).json(updatedUser);
});