const express = require('express');
const router = express.Router();

const ProductsController = require('../controllers/products');
const checkAuth = require('../middlewares/auth.js');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.get('/', ProductsController.getProducts);
router.get('/:category', ProductsController.getProductsByCategory);
router.post('/', upload.single('image'), ProductsController.addProduct);

router.put('/:id', upload.single('image'), ProductsController.updateProduct);
router.delete('/:id', ProductsController.deleteProduct);

module.exports = router;
