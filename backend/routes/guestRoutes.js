
const express = require("express");
const { getGuests } = require("../controllers/guestController");

const router = express.Router();

router.route("/")
    .get(getGuests)

module.exports = router;