'use strict';
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define(
    'orders',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      price: DataTypes.DECIMAL(13, 2),
      quantity: DataTypes.INTEGER,
    },
    {}
  );
  orders.associate = function(models) {
    orders.belongsTo(models.products, {
      foreignKey: 'product',
      as: 'productId',
      constraints: true,
    });
    orders.belongsTo(models.sales, {
      foreignKey: 'sale',
      as: 'saleId',
      constraints: true,
    });
  };
  return orders;
};
