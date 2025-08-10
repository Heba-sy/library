const express = require('express');

const { RoleCode } = require('./../utils/enum');
const { ADMIN } = RoleCode;

const {
    getCategoriesReport
    ,getNotificationsReport
    ,getOrdersReport
    ,getProductsReport
    ,getReviewsReport
    ,getStoresReport
    ,getUsersReport
} = require('../controllers/adminReportController');

const { protect, restrictTo } = require('./../middlewares/authMiddlewers');

const router = express.Router();

router.use(protect);

router.get('/products', restrictTo(ADMIN), getProductsReport);
router.get('/categories', restrictTo(ADMIN), getCategoriesReport);
router.get('/stores', restrictTo(ADMIN), getStoresReport);
router.get('/orders', restrictTo(ADMIN), getOrdersReport);
router.get('/reviews', restrictTo(ADMIN), getReviewsReport);
router.get('/users', restrictTo(ADMIN), getUsersReport);
router.get('/notifications', restrictTo(ADMIN), getNotificationsReport);

// حماية المسارات بالأدمن
/** 
 * router.get('/products',  getProductsReport);
router.get('/categories',  getCategoriesReport);
router.get('/stores', getStoresReport);
router.get('/orders',  getOrdersReport);
router.get('/reviews',  getReviewsReport);
router.get('/users',  getUsersReport);
router.get('/notifications',  getNotificationsReport); */

module.exports = router;
