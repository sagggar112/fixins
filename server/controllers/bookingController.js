const Booking = require('../models/Booking');
const asyncHandler = require('express-async-handler');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private (customer)
const createBooking = asyncHandler(async (req, res) => {
  const { shop, product, description, image } = req.body;
  const booking = new Booking({
    user: req.user._id,
    shop,
    product,
    description,
    image,
    status: 'pending',
  });
  const createdBooking = await booking.save();
  res.status(201).json(createdBooking);
});

// @desc    Get bookings for user
// @route   GET /api/bookings/user
// @access  Private (customer)
const getUserBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate('shop product');
  res.json(bookings);
});

// @desc    Get bookings for shop
// @route   GET /api/bookings/shop/:shopId
// @access  Private (shopOwner)
const getShopBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ shop: req.params.shopId }).populate('user product');
  res.json(bookings);
});

// @desc    Update booking status
// @route   PATCH /api/bookings/:id/status
// @access  Private (shopOwner)
const updateBookingStatus = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (booking) {
    booking.status = req.body.status;
    await booking.save();
    res.json(booking);
  } else {
    res.status(404);
    throw new Error('Booking not found');
  }
});

// @desc    AI repair estimate (mock)
// @route   POST /api/bookings/:id/estimate
// @access  Private (shopOwner)
const aiEstimate = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (booking) {
    // Mock AI estimate
    booking.estimate = Math.floor(Math.random() * 5000) + 1000;
    await booking.save();
    res.json({ estimate: booking.estimate });
  } else {
    res.status(404);
    throw new Error('Booking not found');
  }
});

module.exports = {
  createBooking,
  getUserBookings,
  getShopBookings,
  updateBookingStatus,
  aiEstimate,
}; 