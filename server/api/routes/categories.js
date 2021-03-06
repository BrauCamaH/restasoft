const express = require('express');
const router = express.Router();
const multer = require('multer');
//const upload = multer({ dest: 'uploads' });

const CategoriesController = require('../controllers/categories');
const checkAuth = require('../middlewares/auth.js');

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

router.get('/', CategoriesController.getCategories);
router.get('/search', CategoriesController.searchCategories);

router.post('/', upload.single('image'), CategoriesController.addCategory);

router.put('/:id', upload.single('image'), CategoriesController.updateCategory);
router.delete('/:id', CategoriesController.deleteCategory);

module.exports = router;
