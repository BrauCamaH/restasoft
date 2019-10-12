'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      name: DataTypes.STRING,
      username: DataTypes.TEXT,
      password: DataTypes.STRING,
      type: DataTypes.STRING,
    },
    {},
  );
  users.associate = function(models) {
    users.hasMany(models.sales);
  };
  return users;
};
