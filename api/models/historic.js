

const { Op } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  const Historic = sequelize.define('Historic', {
    value: DataTypes.FLOAT,
    receiverId: {
      type: DataTypes.INTEGER,
      references: {
        model: sequelize.models.User,
        key: 'id',
      },
    },
    senderId: {
      type: DataTypes.INTEGER,
      references: {
        model: sequelize.models.User,
        key: 'id',
      },
    },
  }, {});


  Historic.beforeCreate((historic) => {
    Historic.destroy({
      where: {
        value: historic.value,
        senderId: historic.senderId || null,
        receiverId: historic.receiverId || null,
        createdAt: {
          [Op.gt]: new Date(Date.now() - (2 * 60 * 1000)),
        },
      },
    });
    return false;
  });

  Historic.deposit = async function (receiverId, value) {
    return Historic.transfer(null, receiverId.id, value);
  };

  Historic.withdraw = async function (senderId, value) {
    return Historic.transfer(senderId.id, null, value);
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
    Historic.transfer = async function (senderId, receiverId, value) {
      let response = '';

      if (senderId && receiverId) {
        if (!(await models.User.exist(receiverId))) { return { success: false, msg: 'User does not exist.' }; }
      }

      if (senderId) {
        const balance = await Historic.balanceFromUserId(senderId);
        if (balance - value <= -500) { return { success: false, msg: 'User account balance is insufficient.' }; }
      }
      await this.create({
        value,
        senderId,
        receiverId,
      }).then(historic => response = historic)
        .catch(error => response = error);

      return response;
    };
  };
  return Historic;
};
