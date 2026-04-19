const express = require("express");
const router = express.Router();

const { createOrder, getMyOrders } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

// Checkout
router.post("/checkout", protect, createOrder);

// ✅ Order History
router.get("/my-orders", protect, getMyOrders);

module.exports = router;