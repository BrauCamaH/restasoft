const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users');
const checkAuth = require('../middlewares/auth');

router.post('/sign-up', UsersController.signUp);

router.post('/sign-in', UsersController.signIn);

router.delete('/:id', UsersController.deleteUser);

router.get('/', UsersController.getUsers);

router.get('/user/:id', UsersController.getUserById);

router.get('/checkToken', checkAuth, (req, res) => {
  res.status(200).json({
    user: req.userData
  });
});

module.exports = router;
