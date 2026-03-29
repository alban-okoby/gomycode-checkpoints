const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    index: true
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative'],
    validate: {
      validator: function(v) {
        return v > 0;
      },
      message: 'Price must be greater than 0'
    }
  },
  category: {
    type: String,
    required: false,
    trim: true,
    default: 'Uncategorized',
    index: true
  },
  inStock: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add a virtual field for price in different currency (example)
productSchema.virtual('priceInUSD').get(function() {
  return this.price;
});

// Add an index for common queries
productSchema.index({ category: 1, inStock: 1 });

module.exports = mongoose.model('Product', productSchema);