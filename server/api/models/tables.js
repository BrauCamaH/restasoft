'use strict';
module.exports = (sequelize, DataTypes) => {
  const tables = sequelize.define('tables', {
    code: DataTypes.TEXT,
    observations: DataTypes.TEXT
  }, {});
  tables.associate = function(models) {
    // associations can be defined here
  };
  return tables;
};