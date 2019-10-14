const db = require('../models');

const Categories = db.categories;

exports.getCategories = (req, res) => {
  Categories.findAll()
    .then(Category => res.json(Category))
    .catch(e => res.json({ err: e }));
};

exports.addCategory = (req, res) => {
  const { image, name, description } = req.body;

  const Category = Categories.build({
    image: image,
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
  const { image, name, description } = req.body;
  Categories.update(
    {
      image: image,
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
      res.status(200).send(`Category updated with ID: ${id}`);
    })
    .catch(err => {
      res.status(500).json({
        error: err,
      });
    });
};
exports.deleteCategory = (req, res) => {
  const id = req.params.id;
  Categories.destroy({
    where: {
      id: id,
    },
  })
    .then(() => res.status(200).send(`Category deleted with ID: ${id}`))
    .catch(err => {
      res.status(500).json({
        error: err,
      });
    });
};
