const db = require('../models');

const Products = db.products;

exports.getProducts = (req, res) => {
  Products.findAll()
    .then(Product => res.json(Product))
    .catch(e => res.json({ err: e }));
};


exports.addProduct = (req, res) => {
  const { name, description, image, price, category } = req.body;

  const Product = Products.build({
    name: description,
    image: image,
    price: price,
    category: category,
  });

  Product.save()
    .then(Product => res.status(200).json(Product))
    .catch(err => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.updateProduct = (req, res) => {
  const id = req.params.id;
  const { name, description, image, price, category } = req.body;
  Products.update(
    {
      name: description,
      image: image,
      price: price,
      category: category,
    },
    {
      where: {
        id: id,
      },
    },
  )
    .then(() => {
      res.status(200).send(`Product updated with ID: ${id}`);
    })
    .catch(err => {
      res.status(500).json({
        error: err,
      });
    });
};
exports.deleteProduct = (req, res) => {
  const id = req.params.id;
  Products.destroy({
    where: {
      id: id,
    },
  })
    .then(() => res.status(200).send(`Product deleted with ID: ${id}`))
    .catch(err => {
      res.status(500).json({
        error: err,
      });
    });
};
