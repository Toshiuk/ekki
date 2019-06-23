

const { Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Historic = sequelize.define('Historic', {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
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
    const convert = await extract.rows.map(e => (e.senderId === userId ? (-1 * e.value) : (e.value)));

    const balance = await convert.reduce((acc, e) => acc + e);
    return balance;
  };

  Historic.associate = (models) => {
    Historic.belongsTo(models.User, {
      as: 'sender',
      foreignKey: 'senderId',
      onDelete: 'CASCADE',
    });

    Historic.belongsTo(models.User, {
      as: 'receiver',
      foreignKey: 'receiverId',
      onDelete: 'CASCADE',
    });

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
      }).then(historic => response = { success: true, msg: 'Bank transference succeded.' })
        .catch(error => response = { success: false, msg: 'User account Error.' });
      console.log(value);
      console.log(senderId);
      console.log(receiverId);
      console.log(response);
      return response;
    };


    Historic.findAllFromUserId = async (userId, limit = null, offset = 0) => {
      let extract = [];
      const options = {
        distinct: 'Historic.id',
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
        offset,
        order: [['updatedAt', 'DESC']],
        include: [
          {
            model: models.User,
            as: 'receiver',
            required: false,
            attributes: ['id', 'name'],
          },
          {
            model: models.User,
            as: 'sender',
            required: false,
            attributes: ['id', 'name'],
          },
        ],
      };

      if (limit) { options.limit = limit; }

      await Historic.findAndCountAll(options)
        .then(async (historics) => {
          historics.rows = await historics.rows.map((e) => {
            e.dataValues.senderId == userId ? e.dataValues.positive = false : e.dataValues.positive = true;
            e.dataValues.senderId && e.dataValues.receiverId ? e.dataValues.type = 'Transfer' : (e.dataValues.senderId ? e.dataValues.type = 'Withdraw' : e.dataValues.type = 'Deposit');
            return e;
          });
          extract = historics;
        })
        .catch((error) => { console.log(error); });

      return extract;
    };
  };
  return Historic;
};
