const express = require('express');
const router = express.Router();

const ProductsController = require('../controllers/products');
const checkAuth = require('../middlewares/auth.js');

router.get('/', ProductsController.getProducts);
router.post('/', ProductsController.addProduct);

router.put('/:id', ProductsController.updateProduct);
router.delete('/:id', ProductsController.deleteProduct);

module.exports = router;
