'use strict';
module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define(
    'products',
    {
      name: DataTypes.TEXT,
      description: DataTypes.TEXT,
      image: DataTypes.TEXT,
      price: DataTypes.DECIMAL(13, 2),
    },
    {},
  );

  products.associate = function(models) {
    // products.belongsTo(models.categories, {
    //   foreignKey: 'category',
    //   constraints: true,
    // });
    products.belongsToMany(models.sales, {
      through: 'orders',
      foreignKey: 'product',
      constraints: true,
    });
  };
  return products;
};
