const express = require('express');
const router = express.Router();

const db = require('../models');
const Users = db.users;
const checkAuth = require('../middlewares/auth');

router.delete('/sign-out', checkAuth, (req, res) => {
  res.clearCookie('restaToken', { path: '/' }, { httpOnly: true });
  res.status(200).json({
    user: req.userData,
  });
});

router.get('/checkToken', checkAuth, (req, res) => {
  Users.findOne({ where: { id: req.userData.userId } }).then(user => {
    res.status(200).json({
      user: user,
    });
  });
});

module.exports = router;
