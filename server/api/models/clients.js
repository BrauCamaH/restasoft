'use strict';
module.exports = (sequelize, DataTypes) => {
  const clients = sequelize.define(
    'clients',
    {
      rfc: DataTypes.STRING,
      name: DataTypes.TEXT,
      city: DataTypes.STRING,
      address: DataTypes.STRING,
      zipcode: DataTypes.STRING,
      colony: DataTypes.STRING,
      phone: DataTypes.STRING,
    },
    {},
  );
  clients.associate = function(models) {
    clients.hasMany(models.sales);
  };
  return clients;
};
