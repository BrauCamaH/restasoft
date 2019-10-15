const db = require('../models');

const Categories = db.categories;
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

exports.getCategories = (req, res) => {
  Categories.findAll()
    .then(Category => res.json(Category))
    .catch(e => res.json({ err: e }));
};

exports.addCategory = (req, res) => {
  const { name, description } = req.body;
  //console.log(req.file);

  const Category = Categories.build({
    image: req.file.path,
    name: name,
    description: description,
  });

  Category.save()
    .then(Category => res.status(200).json(Category))
    .catch(err => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.updateCategory = (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;

  let imagePath = '';

  Categories.findOne({ where: { id: id } }).then(product => {
    if (!req.file) {
      imagePath = product.image;
    } else {
      deleteImageByPath(product.image);
      imagePath = req.file.path;
    }
    Categories.update(
      {
        image: imagePath,
        name: name,
        description: description,
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
  });
};
exports.deleteCategory = (req, res) => {
  const id = req.params.id;
  Categories.findOne({ where: { id: id } }).then(category => {
    deleteImageByPath(category.image);
  });
  Categories.destroy({
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
