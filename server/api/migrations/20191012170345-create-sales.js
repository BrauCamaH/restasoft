'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pay: {
        type: Sequelize.DECIMAL(13,2)
      },
      total: {
        type: Sequelize.DECIMAL(13,2)
      },
      start: {
        type: Sequelize.DATE
      },
      finish: {
        type: Sequelize.DATE
      },
      user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         
          model: 'users',
          key: 'id'
        }
      },
      client: {
        type: Sequelize.INTEGER,
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         
          model: 'clients',
          key: 'id'
        }
      },
      table: {
        type: Sequelize.INTEGER,
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         
          model: 'tables',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('sales');
  }
};