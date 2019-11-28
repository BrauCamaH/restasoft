const db = require('../models');

const Sales = db.sales;
const Clients = db.clients;
const Tables = db.tables;

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
exports.getSales = (req, res) => {
  Sales.findAll()
    .then(Sale => res.json(Sale))
    .catch(e => res.json({ err: e }));
};

exports.getSalesByUser = (req, res) => {
  Sales.findAll({
    order: ['id'],
    where: {
      user: req.params.user,
      finish: null,
    },
  })
    .then(Sale => res.json(Sale))
    .catch(e => res.json({ err: e }));
};

exports.getLatestSales = (req, res) => {
  db.sequelize
    .query(
      'SELECT finish, count(total), sum(total) FROM sales WHERE finish IS NOT NULL GROUP BY sales.finish ORDER BY finish'
    )
    .then(([results]) => {
      res.status(200).json({
        rows: results,
      });
    });
};

exports.filterSales = (req, res) => {
  const { page, pageSize } = req.query;
  const from = decodeURIComponent(req.query.from);
  const to = decodeURIComponent(req.query.to);
  const offset = (page - 1) * pageSize;
  const limit = offset + pageSize;

  Clients.findAll().then(clients => {
    Tables.findAll().then(tables => {
      Sales.findAndCountAll({
        order: ['createdAt'],
        offset: offset,
        limit: limit,
        where: {
          finish: {
            [Op.between]: [
              new Date(new Date(from) - 24 * 60 * 60 * 1000),
              new Date(to),
            ],
          },
        },
      })
        .then(sales =>
          res.json({
            rows: sales.rows.map(sale => ({
              id: sale.id,
              finish: sale.finish,
              client: clients.find(client => client.id === sale.client),
              table: tables.find(table => table.id === sale.table),
              total: sale.total,
            })),
            totalCount: sales.count,
            page: page,
          })
        )
        .catch(e => res.json({ err: e }));
    });
  });
};

exports.finishSale = (req, res) => {
  const { total, pay, finish } = req.body;
  const id = req.params.id;
  Sales.update(
    {
      total: total,
      pay: pay,
      finish: finish,
    },
    {
      where: {
        id: id,
      },
    }
  )
    .then(() => {
      res.status(200).send(`Sale finished with ID: ${id}`);
    })
    .catch(err => {
      res.status(500).json({
        error: err,
      });
    });
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
    }
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
