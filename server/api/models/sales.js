'use strict';
module.exports = (sequelize, DataTypes) => {
  const sales = sequelize.define(
    'sales',
    {
      pay: DataTypes.DECIMAL(13, 2),
      total: DataTypes.DECIMAL(13, 2),
      start: DataTypes.DATE,
      finish: DataTypes.DATE,
    },
    {},
  );
  sales.associate = function(models) {
    // sales.belongsTo(models.users, {
    //   foreignKey: 'user',
    //   as: 'u',
    //   constraints: true,
    // });
    // sales.belongsTo(models.clients, {
    //   foreignKey: 'client',
    //   as: 's',
    //   constraints: true,
    // });
    // sales.belongsTo(models.tables, {
    //   foreignKey: 'table',
    //   as: 't',
    //   constraints: true,
    // });

    sales.belongsToMany(models.products, {
      through: 'orders',
      foreignKey: 'sale',
      constraints: true,
    });
  };
  return sales;
};
