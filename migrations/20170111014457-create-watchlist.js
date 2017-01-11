'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('watchlists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      plot: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.STRING
      },
      rated: {
        type: Sequelize.STRING
      },
      awards: {
        type: Sequelize.STRING
      },
      director: {
        type: Sequelize.STRING
      },
      actors: {
        type: Sequelize.STRING
      },
      poster: {
        type: Sequelize.STRING
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
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('watchlists');
  }
};