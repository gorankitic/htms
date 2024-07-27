const express = require("express");
const { getBookings, createBooking, getBooking } = require("../controllers/bookingController");

const router = express.Router();

router.route("/")
    .get(getBookings)
    .post(createBooking)

router.route("/:bookingId")
    .get(getBooking)

module.exports = router;