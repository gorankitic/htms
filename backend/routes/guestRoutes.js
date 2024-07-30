const express = require("express");
const { getGuests, createGuest } = require("../controllers/guestController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(protect);

router.route("/")
    .get(getGuests)
    .post(createGuest)

module.exports = router;