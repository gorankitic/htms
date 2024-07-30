const express = require("express");
// controllers
const { getCabins, deleteCabin, createCabin, updateCabin } = require("../controllers/cabinController");
const { protect, restrictTo } = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(protect);

router.route("/")
    .get(getCabins)
    .post(restrictTo("admin"), createCabin)

router.use(restrictTo("admin"));

router.route("/:cabinId")
    .patch(updateCabin)
    .delete(deleteCabin)

module.exports = router;