const User = require('../models/User');
const Shop = require('../models/Shop');
const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (admin)
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private (admin)
const removeUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get all shops
// @route   GET /api/admin/shops
// @access  Private (admin)
const getAllShops = asyncHandler(async (req, res) => {
  const shops = await Shop.find().populate('owner', 'name email');
  res.json(shops);
});

// @desc    Delete shop
// @route   DELETE /api/admin/shops/:id
// @access  Private (admin)
const removeShop = asyncHandler(async (req, res) => {
  const shop = await Shop.findById(req.params.id);
  if (shop) {
    await shop.remove();
    res.json({ message: 'Shop removed' });
  } else {
    res.status(404);
    throw new Error('Shop not found');
  }
});

// @desc    Get all products
// @route   GET /api/admin/products
// @access  Private (admin)
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().populate('shop');
  res.json(products);
});

// @desc    Delete product
// @route   DELETE /api/admin/products/:id
// @access  Private (admin)
const removeProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

module.exports = {
  getAllUsers,
  removeUser,
  getAllShops,
  removeShop,
  getAllProducts,
  removeProduct,
}; 