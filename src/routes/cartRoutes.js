const express = require("express");
const router = express.Router();

const { addToCart, getCart, removeFromCart } = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");
const { updateQuantity } = require("../controllers/cartController");

router.put("/update", protect, updateQuantity);

// add to cart
router.post("/", protect, addToCart);

// get cart
router.get("/", protect, getCart);

// ✅ ADD THIS (IMPORTANT)
router.delete("/:productId", protect, removeFromCart);

module.exports = router;