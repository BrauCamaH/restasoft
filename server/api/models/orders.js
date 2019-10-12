'use strict';
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define(
    'orders',
    {
      price: DataTypes.DECIMAL(13, 2),
      quantity: DataTypes.INTEGER,
      sale: DataTypes.INTEGER,
      product: DataTypes.INTEGER,
    },
    {},
  );
  orders.associate = function(models) {
    orders.belongsTo(models.products, {
      foreignKey: 'productId',
      as: 'p',
      constraints: true,
    });

    orders.belongsTo(models.sales, {
      foreignKey: 'saleId',
      as: 's',
      constraints: true,
    });
  };
  return orders;
};
