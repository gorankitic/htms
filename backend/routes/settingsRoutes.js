const express = require("express");
const { getSettings, updateSettings } = require("../controllers/settingsController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(protect);

router.route("/")
    .get(getSettings)

router.route("/:settingsId")
    .patch(updateSettings)

module.exports = router;