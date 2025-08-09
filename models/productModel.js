const mongoose = require('mongoose');
const productSchema = new mongoose.Schema(
  {
    // <creating-property-schema />
    minQuntity: {
      type: Number,
      required: [true, 'Please enter minQuntity'],
    },
    quantity: {
      type: Number,
      required: [true, 'Please enter quantity'],
    },
    storeId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Store',
      required: [true, 'Please enter store'],
    },
    categoryId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'Please enter category'],
    },
    image: {
      type: String,
      required: [true, 'Please enter price'],
    },

    price: {
      type: Number,
      required: [true, 'Please enter price'],
    },
    description: {
      type: String,
      required: [true, 'Please enter description'],
    },
    name: {
      type: String,
      required: [true, 'Please enter name'],
      unique: true,
    },
  },
  { timestamps: true, versionKey: false },
);
// <creating-function-schema />

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'storeId',
    select: '-_id',
  });
  next();
});
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'categoryId',
    select: '-_id',
  });
  next();
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
