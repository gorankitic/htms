const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

// Authentication middleware to protect routes from unauthenticated access
exports.protect = catchAsync(async (req, res, next) => {
    // 1. Get token and check is it exist
    const token = req.cookies.jwt;
    if (!token) {
        return next(new AppError("Пријавите се да добијете приступ.", 401));
    }
    // 2. Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // 3. Find user based on _id decoded from JWT and check if user still exist
    const user = await User.findById(decoded._id);
    if (!user) {
        return next(new AppError("Власник овог токена више не постоји.", 401));
    }
    // 4. Grant access to protected route and attach user to request object
    req.user = user;

    next();
});

// Authorization middleware to protect routes from unauthorized access
exports.restrictTo = (...roles) => {
    // roles are ["admin", "employee"]
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError("Немате дозволу за приступ.", 403));
        }
        next();
    }
}