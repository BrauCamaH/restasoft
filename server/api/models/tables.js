'use strict';
module.exports = (sequelize, DataTypes) => {
  const tables = sequelize.define(
    'tables',
    {
      code: DataTypes.TEXT,
      observations: DataTypes.TEXT,
    },
    {},
  );
  tables.associate = function(models) {
    tables.hasMany(models.sales);
  };
  return tables;
};
