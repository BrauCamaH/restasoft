const express = require('express');
const router = express.Router();

//const UsersController = require('../controllers/users');
const checkAuth = require('../middlewares/auth');

router.delete('/sign-out', checkAuth, (req, res) => {
  res.clearCookie('restaToken', { path: '/' }, { httpOnly: true });
  res.status(200).json({
    user: req.userData,
  });
});

router.get('/checkToken', checkAuth, (req, res) => {
  res.status(200).json({
    user: req.userData,
  });
});

module.exports = router;
