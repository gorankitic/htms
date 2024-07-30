const express = require("express");
// controllers
const { getCabins, deleteCabin, createCabin, updateCabin } = require("../controllers/cabinController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(protect);

router.route("/")
    .get(getCabins)
    .post(createCabin,)

router.route("/:cabinId")
    .patch(updateCabin)
    .delete(deleteCabin)

module.exports = router;