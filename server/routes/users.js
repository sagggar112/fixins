const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const { protect } = require('../middlewares/auth');
const { role } = require('../middlewares/role');

router.get('/', protect, role('admin'), getUsers);
router.get('/:id', protect, role('admin'), getUserById);
router.put('/:id', protect, role('admin'), updateUser);
router.delete('/:id', protect, role('admin'), deleteUser);

module.exports = router; 