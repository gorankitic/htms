const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

// Reusable function for creating and sending JWT in cookie and sending user in response object
const createSendToken = (user, statusCode, res) => {
    const { _id } = user;
    // Create (sign) JWT
    const token = jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    // Send JWT as cookie
    const cookieOptions = {
        httpOnly: true,
        SameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
        maxAge: 1000 * 60 * 60 * 24   // 1d
    };
    res.cookie("jwt", token, cookieOptions);
    // Send user in response object
    res.status(statusCode).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        photoUrl: user.photoUrl
    });
}

// Sign up user
// POST method
// Protected and restricted route /api/users/signup
exports.signup = catchAsync(async (req, res, next) => {
    const { name, email, password } = req.body;
    // Create a new user (by default employee) - user password is hashed in pre save mongoose hook in User model
    const user = await User.create({ name, email, password });
    // Send response
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        photoUrl: user.photoUrl
    });
});

// Log in user
// POST method
// Public route /api/users/login
exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    // Check if email and password exists
    if (!email || !password) {
        return next(new AppError("Please provide email and password.", 400));
    }
    // Check if user with this email exist and is password correct?
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError("Неисправна емаил адреса или лозинка.", 401));
    }
    // Create JWT and send it in cookie and send response
    createSendToken(user, 200, res);
});

// Log out user
// GET method
// Protected route /api/users/logout
exports.logout = catchAsync(async (req, res, next) => {
    res.clearCookie("jwt", { httpOnly: true });
    res.status(200).json({ message: "Корисник је одјављен." });
});
