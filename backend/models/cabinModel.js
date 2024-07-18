const mongoose = require("mongoose");

const cabinSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "You must provide a cabin name."]
    },
    maxCapacity: {
        type: Number,
        required: [true, "You must provide cabin maximum capacity."],
    },
    regularPrice: {
        type: Number,
        required: [true, "You must provide cabin price."],
    },
    discount: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: [true, "You must provide a cabin description."]
    },
    imageUrl: {
        type: String
    }
}, { timestamps: true });

const Cabin = mongoose.model("Cabin", cabinSchema);

module.exports = Cabin;