const Message = require('../models/Message');
const asyncHandler = require('express-async-handler');

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
const sendMessage = asyncHandler(async (req, res) => {
  const { receiver, shop, content } = req.body;
  const message = new Message({
    sender: req.user._id,
    receiver,
    shop,
    content,
  });
  const createdMessage = await message.save();
  res.status(201).json(createdMessage);
});

// @desc    Get messages for a shop
// @route   GET /api/messages/shop/:shopId
// @access  Private
const getShopMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({ shop: req.params.shopId })
    .populate('sender receiver', 'name email')
    .sort({ createdAt: 1 });
  res.json(messages);
});

// @desc    Get messages between two users
// @route   GET /api/messages/user/:userId
// @access  Private
const getUserMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({
    $or: [
      { sender: req.user._id, receiver: req.params.userId },
      { sender: req.params.userId, receiver: req.user._id },
    ],
  })
    .populate('sender receiver', 'name email')
    .sort({ createdAt: 1 });
  res.json(messages);
});

module.exports = {
  sendMessage,
  getShopMessages,
  getUserMessages,
}; 