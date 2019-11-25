const express = require('express');
const router = express.Router();

const SalesController = require('../controllers/sales');

router.get('/', SalesController.getSales);
router.get('/:user', SalesController.getSalesByUser);
router.get('/finished/:user', SalesController.getLatestSales);
router.get('/paginate/filter', SalesController.filterSales);
router.post('/', SalesController.addSale);
router.put('/finish/:id', SalesController.finishSale);

router.put('/:id', SalesController.updateSale);
router.delete('/:id', SalesController.deleteSale);

module.exports = router;
