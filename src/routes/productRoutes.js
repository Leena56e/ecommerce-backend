const express = require("express");
const router = express.Router();

const { addProduct, getProducts, updateProduct, deleteProduct } = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");

// protected route
router.post("/", protect, addProduct);

// public route
router.get("/", getProducts);

// update product
router.put("/:id", protect, updateProduct);

// delete product
router.delete("/:id", protect, deleteProduct);

module.exports = router;