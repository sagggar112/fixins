const express = require('express');
const router = express.Router();
const {
  sendMessage,
  getShopMessages,
  getUserMessages,
} = require('../controllers/messageController');
const { protect } = require('../middlewares/auth');

router.post('/', protect, sendMessage);
router.get('/shop/:shopId', protect, getShopMessages);
router.get('/user/:userId', protect, getUserMessages);

module.exports = router; 