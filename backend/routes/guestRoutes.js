const express = require("express");
const { getGuests, createGuest } = require("../controllers/guestController");

const router = express.Router();

router.route("/")
    .get(getGuests)
    .post(createGuest)

module.exports = router;