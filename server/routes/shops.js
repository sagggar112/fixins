const express = require('express');
const router = express.Router();
const {
  registerShop,
  getShops,
  getShopById,
  verifyShop,
} = require('../controllers/shopController');
const { protect } = require('../middlewares/auth');
const { role } = require('../middlewares/role');

router.get('/', getShops);
router.get('/:id', getShopById);
router.post('/', protect, role('shopOwner'), registerShop);
router.patch('/:id/verify', protect, role('admin'), verifyShop);

module.exports = router; 