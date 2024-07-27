const express = require("express");
const { getBookings, createBooking, getBooking, updateBooking } = require("../controllers/bookingController");

const router = express.Router();

router.route("/")
    .get(getBookings)
    .post(createBooking)

router.route("/:bookingId")
    .get(getBooking)
    .patch(updateBooking)

module.exports = router;