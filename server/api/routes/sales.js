const express = require('express');
const router = express.Router();

const SalesController = require('../controllers/sales');

router.get('/', SalesController.getSales);
router.get('/:user', SalesController.getSalesByUser);
router.post('/', SalesController.addSale);

router.put('/:id', SalesController.updateSale);
router.delete('/:id', SalesController.deleteSale);

module.exports = router;
