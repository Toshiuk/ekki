

const { Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Historic = sequelize.define('Historic', {
    value: DataTypes.FLOAT,
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
  }, {});

  Historic.beforeCreate((historic) => {
    console.log('oi');
    Historic.destroy({
      where: {
        value: historic.value,
        senderId: historic.senderId,
        receiverId: historic.receiverId,
        createdAt: {
          [Op.gt]: new Date(Date.now() - (2 * 60 * 1000)),
        },
      },
    });
    console.log('quale');
    return false;
  });

  Historic.deposit = async function (receiverId, value) {
    let response = '';
    await this.create({
      value,
      senderId: 0,
      receiverId,
    }).then(historic => response = historic)
      .catch(error => response = error);
    return response;
  };

  Historic.withdraw = async function (senderId, value) {
    let response = '';
    await this.create({
      value,
      senderId,
      receiverId: 0,
    }).then(historic => response = historic)
      .catch(error => response = error);
    return response;
  };

  Historic.balanceFromUserId = async function (userId) {
    const extract = await Historic.findAllFromUserId(userId);
    const convert = await extract.map(e => (e.senderId == userId ? (-1 * e.value) : (e.value)));

    const balance = await convert.reduce((acc, e) => acc + e);
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
