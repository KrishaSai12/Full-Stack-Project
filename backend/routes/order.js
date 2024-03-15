const express = require('express');
const { neworder, getSingleOrder, myOrders, orders, updateOrder, deleteOrder } = require('../controllers/orderController');
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles} = require('../middlewars/authenticate');

router.route('/order/newOrder').post( isAuthenticatedUser, neworder);
router.route('/order/:id').get(isAuthenticatedUser , getSingleOrder);
router.route('/myorders').get(isAuthenticatedUser, myOrders);

// Admin routes for orders 
router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles('admin'), orders);
router.route('/admin/order/:id').put(isAuthenticatedUser , authorizeRoles('admin'),updateOrder);
router.route('/admin/order/:id').delete(isAuthenticatedUser , authorizeRoles('admin'),deleteOrder);
module.exports = router;