'use strict';
module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define(
    'products',
    {
      name: DataTypes.TEXT,
      description: DataTypes.TEXT,
      image: DataTypes.TEXT,
      price: DataTypes.DECIMAL(13, 2),
      category: DataTypes.INTEGER,
    },
    {},
  );
  products.associate = function(models) {
    products.belongsToMany(models.sales, {
      through: 'orders',
      foreignKey: 'saleId',
      as: 'sales',
      constraints: true,
    });
  };
  return products;
};
