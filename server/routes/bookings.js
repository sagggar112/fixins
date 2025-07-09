const express = require('express');
const router = express.Router();
const {
  createBooking,
  getUserBookings,
  getShopBookings,
  updateBookingStatus,
  aiEstimate,
} = require('../controllers/bookingController');
const { protect } = require('../middlewares/auth');
const { role } = require('../middlewares/role');

router.post('/', protect, role('customer'), createBooking);
router.get('/user', protect, role('customer'), getUserBookings);
router.get('/shop/:shopId', protect, role('shopOwner'), getShopBookings);
router.patch('/:id/status', protect, role('shopOwner'), updateBookingStatus);
router.post('/:id/estimate', protect, role('shopOwner'), aiEstimate);

module.exports = router; 