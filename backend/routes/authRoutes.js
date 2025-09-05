const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post("/register", registerUser);

// @route   POST /api/auth/login
// @desc    Login user & return JWT token
// @access  Public
router.post("/login", loginUser);

module.exports = router;