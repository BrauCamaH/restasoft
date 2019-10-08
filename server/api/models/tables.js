module.exports = (sequelize, DataTypes) => {
  const tables = sequelize.define('tables', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    observations: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  return tables;
};
