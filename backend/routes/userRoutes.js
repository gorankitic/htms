const express = require("express");
const { signup, login, logout } = require("../controllers/authController");
const { updateUser } = require("../controllers/userController");
const { restrictTo, protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router
    .get("/logout", logout)

router
    .post("/signup", protect, restrictTo("admin"), signup)
    .post("/login", login)

router
    .patch("/:userId", protect, updateUser)

module.exports = router;