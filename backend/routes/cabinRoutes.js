const express = require("express");
// controllers
const { getCabins } = require("../controllers/cabinController");

const router = express.Router();

router.route("/")
    .get(getCabins)

module.exports = router;