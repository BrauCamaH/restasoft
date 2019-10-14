const express = require('express');
const router = express.Router();

const CategoriesController = require('../controllers/categories');
const checkAuth = require('../middlewares/auth.js');

router.get('/', CategoriesController.getCategories);
router.post('/', CategoriesController.addCategory);

router.put('/:id', CategoriesController.updateCategory);
router.delete('/:id', CategoriesController.deleteCategory);

module.exports = router;
