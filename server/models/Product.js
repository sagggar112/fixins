const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  condition: { type: String, enum: ['new', 'used', 'refurbished'], required: true },
  image: { type: String },
  shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  isFixins: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema); 