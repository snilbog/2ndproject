'use strict';
module.exports = function(sequelize, DataTypes) {
  var favorite = sequelize.define('favorite', {
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    ratingImgUrl: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(model) {
        model.favorite.belongsTo(model.user);
      }
    }
  });
  return favorite;
};