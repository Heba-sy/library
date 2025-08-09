const notificationController = require('../controllers/notificationController');
const { protect, restrictTo } = require('./../middlewares/authMiddlewers');
const { addQuery } = require('./../middlewares/dynamicMiddleware');
const { RoleCode } = require('./../utils/enum');
const { USER, ADMIN, EMP } = RoleCode;
const express = require('express');
const router = express.Router();
router.use(protect);
router
  .route('/')
  .get(
    restrictTo(USER, ADMIN, EMP),
    addQuery('userId', 'userId'),
    notificationController.getAllNotification,
  )
  .post(restrictTo(), notificationController.createNotification);
router
  .route('/:id')
  .get(restrictTo(USER, ADMIN, EMP), notificationController.getNotification)
  .patch(restrictTo(), notificationController.updateNotification)
  .delete(restrictTo(), notificationController.deleteNotification);
module.exports = router;
