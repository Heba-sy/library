// استدعاء الموديلات
const Category = require('../models/categoryModel');
const Notification = require('../models/notificationModel');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const Review = require('../models/reviewModel');
const Store = require('../models/storeModel');
const User = require('../models/userModel');

// =============================
// 📊 تقرير المنتجات
// =============================
const getProductsReport = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('categoryId', 'name')
      .populate('storeId', 'name');

    res.status(200).json({
      success: true,
      total: products.length,
      data: products,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// =============================
// 📊 تقرير الأنواع
// =============================
const getCategoriesReport = async (req, res) => {
  try {
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: 'categoryId',
          as: 'products',
        },
      },
      {
        $project: {
          name: 1,
          photo: 1,
          totalProducts: { $size: '$products' },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      total: categories.length,
      data: categories,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// =============================
// 📊 تقرير المخازن
// =============================
const getStoresReport = async (req, res) => {
  try {
    const stores = await Store.find().populate('mangerId', 'name email').lean();

    for (let store of stores) {
      store.totalProducts = await Product.countDocuments({
        storeId: store._id,
      });
    }

    res.status(200).json({
      success: true,
      total: stores.length,
      data: stores,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// =============================
// 📊 تقرير الطلبات
// =============================
const getOrdersReport = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')
      .populate('cart.productId', 'name price')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: orders.length,
      data: orders,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// =============================
// 📊 تقرير المراجعات
// =============================
const getReviewsReport = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('userId', 'name email')
      .populate('productId', 'name price');

    res.status(200).json({
      success: true,
      total: reviews.length,
      data: reviews,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// =============================
// 📊 تقرير المستخدمين
// =============================
const getUsersReport = async (req, res) => {
  try {
    const users = await User.find().lean();

    for (let user of users) {
      user.totalOrders = await Order.countDocuments({ userId: user._id });
      user.totalReviews = await Review.countDocuments({ userId: user._id });
    }

    res.status(200).json({
      success: true,
      total: users.length,
      data: users,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// =============================
// 📊 تقرير الإشعارات
// =============================
const getNotificationsReport = async (req, res) => {
  try {
    const notifications = await Notification.find().populate(
      'userId',
      'name email',
    );

    res.status(200).json({
      success: true,
      total: notifications.length,
      data: notifications,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// تصدير الدوال
module.exports = {
  getProductsReport,
  getCategoriesReport,
  getStoresReport,
  getOrdersReport,
  getReviewsReport,
  getUsersReport,
  getNotificationsReport
};