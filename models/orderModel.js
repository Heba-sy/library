const { methodePayment } = require('../utils/enum');
const User = require('./userModel');
const Product = require('./productModel');
const Notification = require('./notificationModel');
const { statusOrder } = require('../utils/enum');
const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema(
  {
    // <creating-property-schema />
    methodePayment: {
      type: String,
      enum: Object.values(methodePayment),
    },
    status: {
      type: String,
      enum: Object.values(statusOrder),
      default: statusOrder.wating,
    },
    total: {
      type: Number,
      required: [true, 'Please enter total'],
    },
    address: {
      // <creating-property-object-address />
      descreption: {
        type: String,
        required: [true, 'Please enter descreption'],
      },
      street: {
        type: String,
        required: [true, 'Please enter street'],
      },
      region: {
        type: String,
        required: [true, 'Please enter region'],
      },
    },
    cart: [
      {
        // <creating-property-object-cart />
        amount: {
          type: Number,
          required: [true, 'Please enter amount'],
        },
        price: {
          type: Number,
          required: [true, 'Please enter price'],
        },
        productId: {
          type: mongoose.Schema.ObjectId,
          ref: 'Product',
          required: [true, 'Please enter product'],
        },
      },
    ],
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Please enter user'],
    },
  },
  { timestamps: true, versionKey: false },
);
// <creating-function-schema />

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'cart.productId',
    select: '-_id',
  });
  next();
});

orderSchema.post('save', function (doc, next) {
  if (doc) {
    doc.cart.forEach(async (item) => {
      const product = await Product.findById(item.productId).populate({
        path: 'storeId',
      });
      product.quantity -= item.amount;
      await product.save();
      if (product.quantity <= product.minQuntity) {
        const admin = await User.findOne({ role: 'ADMIN' });
        await Notification.create({
          userId: admin._id,
          message: `الطلب في المركز ${product.storeId.name} اصبح اقل من القيمة الدنية`,
        });
      }
    });
  }
  next();
});

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'userId',
    select: '-_id',
  });
  next();
});
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
