'use strict';
module.exports = function(sequelize, DataTypes) {
  var watchlist = sequelize.define('watchlist', {
    title: DataTypes.STRING,
    plot: DataTypes.STRING,
    rating: DataTypes.STRING,
    rated: DataTypes.STRING,
    awards: DataTypes.STRING,
    director: DataTypes.STRING,
    actors: DataTypes.STRING,
    poster: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.watchlist.belongsToMany(models.user, {through: "userwatchlist"});
        // associations can be defined here
      }
    }
  });
  return watchlist;
};
