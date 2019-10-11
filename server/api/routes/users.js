const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users');
//const checkAuth = require('../middlewares/auth');

router.post('/sign-up', UsersController.signUp);

router.post('/sign-in', UsersController.signIn);

router.delete('/:id', UsersController.deleteUser);

router.get('/', UsersController.getUsers);

module.exports = router;
