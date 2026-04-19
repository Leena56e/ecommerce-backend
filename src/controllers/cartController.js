const Cart = require("../models/cartModel");

// Add to Cart
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        products: [{ product: productId, quantity }]
      });
    } else {
      const productIndex = cart.products.findIndex(
        p => p.product.toString() === productId
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
    }

    await cart.save();

    res.status(200).json({
      message: "Product added to cart",
      cart
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
      .populate("products.product");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove from Cart
exports.removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = cart.products.filter(
      item => item.product.toString() !== req.params.productId
    );

    await cart.save();

    res.status(200).json({
      message: "Product removed from cart",
      cart
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Quantity
exports.updateQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // check valid quantity
    if (quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1"
      });
    }

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const product = cart.products.find(
      item => item.product.toString() === productId
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not in cart"
      });
    }

    // update quantity
    product.quantity = quantity;

    await cart.save();

    res.status(200).json({
      message: "Quantity updated",
      cart
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};