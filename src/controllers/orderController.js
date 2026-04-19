const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

// Create Order (Checkout)
exports.createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
      .populate("products.product");

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total price
    let total = 0;

    cart.products.forEach(item => {
  if (item.product && item.product.price) {
    total += item.product.price * item.quantity;
  }
});

    // Create order
    const order = new Order({
      user: req.user.id,
      products: cart.products,
      totalPrice: total
    });

    await order.save();

    // Clear cart
    cart.products = [];
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully",
      order
    });

  } catch (error) {
   console.error("ORDER ERROR:", error);
res.status(500).json({ error: error.message });
  }
};

// ✅ Get My Orders (Order History)
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("products.product");

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};