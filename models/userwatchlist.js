'use strict';
module.exports = function(sequelize, DataTypes) {
  var userwatchlist = sequelize.define('userwatchlist', {
    userId: DataTypes.INTEGER,
    watchlistId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return userwatchlist;
};