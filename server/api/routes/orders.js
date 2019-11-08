const express = require('express');
const router = express.Router();

const OrdersController = require('../controllers/orders');

router.get('/', OrdersController.getOrders);
router.post('/', OrdersController.addOrder);

router.put('/:id', OrdersController.updateOrder);
router.delete('/:id', OrdersController.deleteOrder);

module.exports = router;
