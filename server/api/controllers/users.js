const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const Joi = require('joi');

const Users = db.users;

const schema = {
  name: Joi.string().required(),
  username: Joi.string()
    .min(4)
    .required(),
  password: Joi.string()
    .min(6)
    .required(),
  type: Joi.string().required(),
};

exports.getUsers = (req, res) => {
  Users.findAll()
    .then(users => res.json(users))
    .catch(e => res.json({ err: e }));
};

exports.getUserById = (req, res) => {
  Users.findOne({ where: { id: req.params.id } })
    .then(user => {
      res.json(user);
    })
    .catch(e => {
      res.json({ err: e });
    });
};

exports.searchUsers = (req, res) => {
  const { value } = req.query;
  Users.findAll({
    order: ['id'],
  })
    .then(users =>
      res.json(
        users.filter(
          item =>
            item.name.toLowerCase().includes(value.toLowerCase()) ||
            item.username.toLowerCase().includes(value.toLowerCase()) ||
            item.type.toLowerCase().includes(value.toLowerCase())
        )
      )
    )
    .catch(e => res.json({ err: e }));
};

exports.signUp = (req, res, next) => {
  const { name, username, password, type } = req.body;

  const result = Joi.validate(req.body, schema);

  Users.findAll({ where: { username: username } }).then(user => {
    if (result.error) {
      return res.status(400).json({
        message: result.error.details[0].message,
      });
    }
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

exports.signIn = (req, res, next) => {
  const { username, password } = req.body;
  Users.findOne({ where: { username: username } })
    .then(user => {
      if (!user) {
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
              type: user.type,
              userId: user.id,
            },
            config.jwtSecret,
            {
              expiresIn: '24h',
            }
          );
          return res
            .cookie('restaToken', token, { httpOnly: true })
            .status(200)
            .json({
              userId: user.id,
            });
        } else {
          res.status(401).json({
            message: 'Auth failed',
          });
        }
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

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, username, type } = req.body;
  Users.update(
    {
      name: name,
      username: username,
      type,
    },
    {
      where: {
        id: id,
      },
    }
  )
    .then(user => {
      Users.findOne({ where: { id: req.params.id } }).then(user => {
        res.status(200).json({
          message: `Client updated with ID: ${id}`,
          user: user,
        });
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.updateProfile = (req, res) => {
  const { id } = req.params;
  const { name, username } = req.body;
  Users.update(
    {
      name: name,
      username: username,
    },
    {
      where: {
        id: id,
      },
    }
  )
    .then(user => {
      Users.findOne({ where: { id: req.params.id } }).then(user => {
        res.status(200).json({
          message: `Client updated with ID: ${id}`,
          user: user,
        });
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.updatePassword = (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  const result = Joi.validate(req.body, schema);

  if (result.error) {
    return res.status(400).json({
      message: result.error.details[0].message,
    });
  } else {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      } else {
        Users.update(
          {
            password: hash,
          },
          {
            where: {
              id: id,
            },
          }
        ).then(user => {
          res.status(200).json({
            message: `Client updated with ID: ${id}`,
            user: user,
          });
        });
      }
    });
  }
};
