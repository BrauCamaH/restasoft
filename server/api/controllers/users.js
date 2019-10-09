const db = require('../../config/sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config');

const Users = db.users;

exports.getUsers = (req, res) => {
  Users.findAll()
    .then(tables => res.json(tables))
    .catch(e => res.json({ err: e }));
};

exports.user_signup = (req, res, next) => {
  const { name, username, password, type } = req.body;
  Users.findAll({ where: { username: username } }).then(user => {
    if (user.length >= 1) {
      return res.status(409).json({
        message: 'username exists',
      });
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        } else {
          const user = Users.build({
            username: username,
            name: name,
            password: hash,
            type: type,
          });
          user
            .save()
            .then(result => {
              console.log(result);
              res.status(201).json({
                message: 'User created',
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error: err,
              });
            });
        }
      });
    }
  });
};

exports.user_login = (req, res, next) => {
  const { username, password } = req.body;
  Users.findOne({ where: { username: username } })
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Auth failed',
        });
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth failed',
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user.username,
              userId: user.id,
            },
            config.jwtSecret,
            {
              expiresIn: '1h',
            },
          );
          return res.status(200).json({
            message: 'Auth successful',
            token: token,
          });
        }
        res.status(401).json({
          message: 'Auth failed',
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.deleteUser = (req, res, next) => {
  const id = req.params.id;
  Users.destroy({
    where: {
      id: id,
    },
  })
    .then(() => res.status(200).send(`User deleted with ID: ${id}`))
    .catch(err => {
      res.status(500).json({
        error: err,
      });
    });
};
