'use strict';

module.exports = (sequelize, DataTypes) => {
  const Historic = sequelize.define('Historic', {
    value: DataTypes.FLOAT,
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER
  }, {});
  Historic.associate = function (models) {
    // associations can be defined here
  };
  return Historic;
};