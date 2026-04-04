const express = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// @route   POST /api/auth/register
router.post("/register", authController.register);

// @route   POST /api/auth/login
router.post("/login", authController.login);

// @route   GET /api/auth/me
// @access  Private - cần JWT token
router.get("/me", authMiddleware, authController.getMe);

module.exports = router;
