const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  removeUser,
  getAllShops,
  removeShop,
  getAllProducts,
  removeProduct,
} = require('../controllers/adminController');
const { protect } = require('../middlewares/auth');
const { role } = require('../middlewares/role');

router.get('/users', protect, role('admin'), getAllUsers);
router.delete('/users/:id', protect, role('admin'), removeUser);
router.get('/shops', protect, role('admin'), getAllShops);
router.delete('/shops/:id', protect, role('admin'), removeShop);
router.get('/products', protect, role('admin'), getAllProducts);
router.delete('/products/:id', protect, role('admin'), removeProduct);

module.exports = router; 