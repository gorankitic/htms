const express = require("express");
const { getBookings, createBooking } = require("../controllers/bookingController");

const router = express.Router();

router.route("/")
    .get(getBookings)
    .post(createBooking)

module.exports = router;