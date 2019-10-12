'use strict';
module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define(
    'categories',
    {
      image: DataTypes.TEXT,
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {},
  );
  categories.associate = function(models) {
    categories.hasMany(models.products);
  };
  return categories;
};
