const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "You must provide a name."]
    },
    email: {
        type: String,
        required: [true, "You must provide a email."],
        lowercase: true,
        unique: true,
        validate: [validator.isEmail, " Please provide a valid email"]
    },
    password: {
        type: String,
        required: [true, "You must provide a password."],
        validate: [validator.isStrongPassword, "Password is not strong enough."],
        select: false
    },
    photoUrl: {
        type: String
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;