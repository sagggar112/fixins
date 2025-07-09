const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect } = require('../middlewares/auth');
const { role } = require('../middlewares/role');

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', protect, role('admin', 'shopOwner'), createProduct);
router.put('/:id', protect, role('admin', 'shopOwner'), updateProduct);
router.delete('/:id', protect, role('admin', 'shopOwner'), deleteProduct);

module.exports = router;
