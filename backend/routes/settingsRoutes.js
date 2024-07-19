const express = require("express");

const router = express.Router();

router.route("/")


router.route("/:settingsId")
    .patch()


module.exports = router;