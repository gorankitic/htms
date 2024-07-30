const express = require("express");
const { getSettings, updateSettings } = require("../controllers/settingsController");
const { protect, restrictTo } = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(protect, restrictTo("admin"));

router.route("/")
    .get(getSettings)

router.route("/:settingsId")
    .patch(updateSettings)

module.exports = router;