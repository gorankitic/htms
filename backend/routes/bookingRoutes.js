
const express = require("express");
const { getBookings } = require("../controllers/bookingController");


const router = express.Router();

router.route("/")
    .get(getBookings)


module.exports = router;