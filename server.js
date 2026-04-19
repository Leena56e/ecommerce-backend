const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
const userRoutes = require("./src/routes/userRoutes");
const productRoutes = require("./src/routes/productRoutes");
const cartRoutes = require("./src/routes/cartRoutes");
const orderRoutes = require("./src/routes/orderRoutes");

// ✅ Auth middleware
const { protect } = require("./src/middleware/authMiddleware");

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ User routes (auth)
app.use("/api/auth", userRoutes);

// ✅ Product routes
app.use("/api/products", productRoutes);

// ✅ Cart routes
app.use("/api/cart", cartRoutes);

// ✅ Order routes (checkout)
app.use("/api/orders", orderRoutes);

// ✅ Protected route (test)
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "This is a protected route",
    user: req.user
  });
});

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
