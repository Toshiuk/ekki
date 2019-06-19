

const { Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Historic = sequelize.define('Historic', {
    value: DataTypes.FLOAT,
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
  }, {});


  Historic.deposit = function (receiverId, value) {
    this.create({
      value,
      senderId: 0,
      receiverId,
    });
  };

  Historic.withdraw = function (senderId, value) {
    this.create({
      value,
      senderId,
      receiverId: 0,
    });
  };

  Historic.balanceFromUserId = async function (userId) {
    const extract = await Historic.findAllFromUserId(userId);
    const balance = await extract.reduce((acc, historic) => {
      if (acc.value) {
        return historic.senderId == userId ? acc.value * -1 : acc.value;
      }
      if (historic.senderId == userId) {
        acc -= parseFloat(historic.value);
      } else {
        acc += parseFloat(historic.value);
      }

      return acc;
    });
    console.log(balance);
    return balance;
  };

  Historic.findAllFromUserId = async function (userId) {
    let extract = [];
    await this.findAll({
      where: {
        [Op.or]: [
          {
            senderId: userId,
          },
          {
            receiverId: userId,
          },
        ],
      },
    })
      .then((historics) => {
        extract = historics;
      })
      .catch((error) => { console.log(error); });
    return extract;
  };


  Historic.associate = function (models) {
    // associations can be defined here
  };
  return Historic;
};
