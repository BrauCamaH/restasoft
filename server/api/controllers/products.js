const db = require('../models');

const Products = db.products;
const fs = require('fs');

function deleteImageByPath(path) {
  try {
    fs.unlinkSync(path);
    //file removed
    console.log(`File Removed with path ${path}`);
  } catch (err) {
    console.error(err);
  }
}

exports.getProducts = (req, res) => {
  Products.findAll()
    .then(Product => res.json(Product))
    .catch(e => res.json({ err: e }));
};

exports.searchProducts = (req, res) => {
  const { value } = req.params;
  Sales.findAll({
    order: ['id'],
    where: { category: req.params.category },
  })
    .then(products =>
      res.json(
        products.filter(
          item =>
            item.name.toLowerCase().includes(value.toLowerCase()) ||
            item.description.toLowerCase().includes(value.toLowerCase())
        )
      )
    )
    .catch(e => res.json({ err: e }));
};

exports.getProductsByCategory = (req, res) => {
  category = Products.findAll({ where: { category: req.params.category } })
    .then(product => res.json(product))
    .catch(e => res.json({ err: e }));
};

exports.addProduct = (req, res) => {
  const { name, description, price, category } = req.body;

  const imagePath = req.file ? req.file.path : '';

  const Product = Products.build({
    name: name,
    description: description,
    image: imagePath,
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
  const { name, description, price, category } = req.body;

  let imagePath = '';

  Products.findOne({ where: { id: id } }).then(product => {
    if (!req.file) {
      imagePath = product.image;
    } else {
      if (product.image == '' || product.image === null) {
        imagePath = product.image;
      } else {
        deleteImageByPath(product.image);
      }
      imagePath = req.file.path;
    }

    Products.update(
      {
        name: name,
        description: description,
        image: imagePath,
        price: price,
        category: category,
      },
      {
        where: {
          id: id,
        },
      }
    )
      .then(() => {
        res.status(200).json({
          message: `Product updated with ID: ${id}`,
          image: imagePath,
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err,
        });
      });
  });
};
exports.deleteProduct = (req, res) => {
  const id = req.params.id;
  Products.findOne({ where: { id: id } }).then(product => {
    deleteImageByPath(product.image);
  });
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
