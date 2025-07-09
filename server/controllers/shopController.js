const Shop = require('../models/Shop');
const asyncHandler = require('express-async-handler');

// @desc    Register a new shop
// @route   POST /api/shops
// @access  Private (shopOwner)
const registerShop = asyncHandler(async (req, res) => {
  const { name, address, location, services } = req.body;
  const shop = new Shop({
    name,
    owner: req.user._id,
    address,
    location,
    services,
    verified: false,
  });
  const createdShop = await shop.save();
  res.status(201).json(createdShop);
});

// @desc    Get all shops
// @route   GET /api/shops
// @access  Public
const getShops = asyncHandler(async (req, res) => {
  const shops = await Shop.find().populate('owner', 'name email');
  res.json(shops);
});

// @desc    Get shop by ID
// @route   GET /api/shops/:id
// @access  Public
const getShopById = asyncHandler(async (req, res) => {
  const shop = await Shop.findById(req.params.id).populate('owner', 'name email');
  if (shop) {
    res.json(shop);
  } else {
    res.status(404);
    throw new Error('Shop not found');
  }
});

// @desc    Verify shop (admin only)
// @route   PATCH /api/shops/:id/verify
// @access  Private (admin)
const verifyShop = asyncHandler(async (req, res) => {
  const shop = await Shop.findById(req.params.id);
  if (shop) {
    shop.verified = true;
    await shop.save();
    res.json({ message: 'Shop verified' });
  } else {
    res.status(404);
    throw new Error('Shop not found');
  }
});

module.exports = {
  registerShop,
  getShops,
  getShopById,
  verifyShop,
}; 