const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users');
const checkAuth = require('../middlewares/auth');

router.post('/sign-up', UsersController.signUp);
router.post('/sign-in', UsersController.signIn);

router.delete('/delete/', checkAuth, (req, res) => {
  res.clearCookie('restaToke ');
  res.status(200).json({
    user: req.userData,
  });
});
router.delete('/:id', UsersController.deleteUser);

router.get('/', UsersController.getUsers);
router.get('/user/:id', UsersController.getUserById);
router.get('/search', UsersController.searchUsers);

router.put('/:id', UsersController.updateUser);
router.put('/profile/:id', UsersController.updateProfile);
router.put('/profile/:id', UsersController.updateProfile);
router.put('/password/:id', UsersController.updatePassword);

module.exports = router;
