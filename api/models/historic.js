

const { Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Historic = sequelize.define('Historic', {
    value: {
      type: DataTypes.FLOAT,
      allowNull: {
        args: false,
        msg: 'Must be not null',
      },
      validate: {
        min: {
          args: 1,
          msg: 'Must be higher or equal than one',
        },
      },
    },
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

  Historic.deposit = async (receiverId, value) => Historic.transfer(null, receiverId.id, value);

  Historic.withdraw = async (senderId, value) => Historic.transfer(senderId.id, null, value);

  Historic.balanceFromUserId = async (userId) => {
    const extract = await Historic.findAllFromUserId(userId);
    const convert = await extract.map(e => (e.senderId === userId ? (-1 * e.value) : (e.value)));

    const balance = await convert.reduce((acc, e) => acc + e);
    return balance;
  };

  Historic.findAllFromUserId = async (userId) => {
    let extract = [];
    await Historic.findAll({
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


  Historic.associate = (models) => {
    Historic.transfer = async (senderId, receiverId, value) => {
      let response = '';

      if (senderId && receiverId) {
        if (!(await models.User.exist(receiverId))) { return { success: false, msg: 'User does not exist.' }; }
      }

      if (senderId) {
        const balance = await Historic.balanceFromUserId(senderId);
        if (balance - value <= -500) { return { success: false, msg: 'User account balance is insufficient.' }; }
      }
      await Historic.create({
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
