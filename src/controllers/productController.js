const Product = require("../models/productModel");

// Add Product
exports.addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();

    res.status(201).json({
      message: "Product added successfully",
      product
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Product updated successfully",
      product
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Product deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};