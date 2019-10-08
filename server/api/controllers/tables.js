const { pool } = require('../../config/pool');
const db = require('../../config/sequelize');

const Tables = db.tables;

exports.getTables = (req, res) => {
  Tables.findAll()
    .then(tables => res.json(tables))
    .catch(e => res.json({ err: e }));
};

exports.addTable = (req, res) => {
  const { code, observations } = req.body;

  const table = Tables.build({
    code: code,
    observations: observations,
  });

  table
    .save()
    .then(table => res.status(200).json(table))
    .catch(err => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.updateTable = (req, res) => {
  const id = req.params.id;
  const { code, observations } = req.body;
  Tables.update(
    {
      code: code,
      observations: observations,
    },
    {
      where: {
        id: id,
      },
    },
  )
    .then(() => {
      res.status(200).send(`Table updated with ID: ${id}`);
    })
    .catch(err => {
      res.status(500).json({
        error: err,
      });
    });
};
exports.deleteTable = (req, res) => {
  const id = req.params.id;
  Tables.destroy({
    where: {
      id: id,
    },
  })
    .then(() => res.status(200).send(`Table deleted with ID: ${id}`))
    .catch(err => {
      res.status(500).json({
        error: err,
      });
    });
};
