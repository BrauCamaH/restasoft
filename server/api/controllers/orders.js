const db = require("../models");

const Orders = db.orders;

exports.getOrders = (req, res) => {
  Orders.findAll()
    .then(Order => res.json(Order))
    .catch(e => res.json({ err: e }));
};

exports.getOrdersBySale = (req, res) => {
  Orders.findAll({
    order: ["id"],
    where: {
      sale: req.params.sale
    }
  })
    .then(Order => res.json(Order))
    .catch(e => res.json({ err: e }));
};

exports.addOrder = (req, res) => {
  const { price, quantity, sale, product } = req.body;

  const Order = Orders.build({
    price: price,
    quantity: quantity,
    sale: sale,
    product: product
  });

  Order.save()
    .then(Order => res.status(200).json(Order))
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.updateOrder = (req, res) => {
  const id = req.params.id;
  const { price, quantity, sale, product } = req.body;
  Orders.update(
    {
      price: price,
      quantity: quantity,
      sale: sale,
      product: product
    },
    {
      where: {
        id: id
      }
    }
  )
    .then(() => {
      res.status(200).send(`Order updated with ID: ${id}`);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
exports.deleteOrder = (req, res) => {
  const id = req.params.id;
  Orders.destroy({
    where: {
      id: id
    }
  })
    .then(() => res.status(200).send(`Order deleted with ID: ${id}`))
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
