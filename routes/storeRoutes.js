const storeController = require('../controllers/storeController');
const { protect, restrictTo } = require('./../middlewares/authMiddlewers');
const { RoleCode } = require('./../utils/enum');
const { USER, ADMIN, EMP } = RoleCode;
const express = require('express');
const router = express.Router();
router.use(protect);
router
  .route('/')
  .get(restrictTo(ADMIN, EMP), storeController.getAllStore)
  .post(restrictTo(ADMIN), storeController.createStore);
router
  .route('/:id')
  .get(restrictTo(ADMIN, EMP), storeController.getStore)
  .patch(restrictTo(ADMIN, EMP), storeController.updateStore)
  .delete(restrictTo(ADMIN), storeController.deleteStore);
module.exports = router;
