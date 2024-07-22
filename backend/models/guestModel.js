const mongoose = require("mongoose");

const guestSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "You must provide a guest name."],
    },
    email: {
        type: String,
        required: [true, "You must provide a guest email."],
    },
    nationalId: {
        type: String,
        required: [true, "You must provide a guest nationalId."]
    },
    nationality: {
        type: String,
        required: [true, "You must provide a guest nationality."]
    },
    countryFlag: {
        type: String
    }
}, { timestamps: true });

const Guest = mongoose.model("Guest", guestSchema);

module.exports = Guest;