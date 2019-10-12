'use strict';
module.exports = (sequelize, DataTypes) => {
  const sales = sequelize.define(
    'sales',
    {
      pay: DataTypes.DECIMAL(13, 2),
      total: DataTypes.DECIMAL(13, 2),
      start: DataTypes.DATE,
      finish: DataTypes.DATE,
      user: DataTypes.INTEGER,
      client: DataTypes.INTEGER,
      table: DataTypes.INTEGER,
    },
    {},
  );
  sales.associate = function(models) {
    sales.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'u',
      constraints: true,
    });
    sales.belongsTo(models.clients, {
      foreignKey: 'clientId',
      as: 's',
      constraints: true,
    });
    sales.belongsTo(models.tables, {
      foreignKey: 'tableId',
      as: 't',
      constraints: true,
    });

    sales.belongsToMany(models.products, {
      through: 'orders',
      foreignKey: 'productId',
      as: 'products',
      constraints: true,
    });
  };
  return sales;
};
