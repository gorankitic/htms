const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Молимо унесите своје име."]
    },
    email: {
        type: String,
        required: [true, "Адреса електронске поште (email) је обавезна."],
        lowercase: true,
        unique: true,
        validate: [validator.isEmail, "Молимо унесите ваљану адресу електронске поште."]
    },
    password: {
        type: String,
        required: [true, "Молимо унесите лозинку."],
        validate: [validator.isStrongPassword, "Лозинка није довољно јака."],
        select: false
    },
    role: {
        type: String,
        enum: ["admin", "employee"],
        default: "employee"
    },
    photoUrl: {
        type: String
    },
}, { timestamps: true });

// Pre-save mongoose document hook/middleware to hash password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Instance methods assigned to methods object of Mongoose schema are available on all model documents
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

const User = mongoose.model("User", userSchema);

module.exports = User;