const express = require("express");
const router = express.Router();

// Import controller functions
const { signup, login } = require("../controllers/userController");

// Register route
router.post("/signup", signup);

// Login route
router.post("/login", login);

module.exports = router;
