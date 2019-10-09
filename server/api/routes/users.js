const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users');
//const checkAuth = require('../middlewares/auth');

router.post('/signup', UsersController.user_signup);

router.post('/login', UsersController.user_login);

router.delete('/:id', UsersController.deleteUser);

router.get('/', UsersController.getUsers);

module.exports = router;
