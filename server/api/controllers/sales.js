const db = require('../models');

const Sales = db.sales;

exports.getSales = (req, res) => {
  Sales.findAll()
    .then(Sale => res.json(Sale))
    .catch(e => res.json({ err: e }));
};

exports.addSale = (req, res) => {
  const { pay, total, start, finish, user, client, table } = req.body;

  const Sale = Sales.build({
    pay: pay,
    total: total,
    start: start,
    finish: finish,
    user: user,
    client: client,
    table: table,
  });

  Sale.save()
    .then(Sale => res.status(200).json(Sale))
    .catch(err => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.updateSale = (req, res) => {
  const id = req.params.id;
  const { pay, total, start, finish, user, client, table } = req.body;
  Sales.update(
    {
      pay: pay,
      total: total,
      start: start,
      finish: finish,
      user: user,
      client: client,
      table: table,
    },
    {
      where: {
        id: id,
      },
    },
  )
    .then(() => {
      res.status(200).send(`Sale updated with ID: ${id}`);
    })
    .catch(err => {
      res.status(500).json({
        error: err,
      });
    });
};
exports.deleteSale = (req, res) => {
  const id = req.params.id;
  Sales.destroy({
    where: {
      id: id,
    },
  })
    .then(() => res.status(200).send(`Sale deleted with ID: ${id}`))
    .catch(err => {
      res.status(500).json({
        error: err,
      });
    });
};
