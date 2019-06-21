

const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Must be not null',
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Must be not null',
      },
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Must be not null',
      },
      validate: {
        isUnique(value, next) {
          User.findOne({
            where: { cpf: value },
          }).done((user) => {
            if (user) { return next('CPF already in use'); }

            next();
          });
        },
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Must be not null',
      },
    },
  }, {});


  User.beforeSave((user) => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
  });

  User.afterCreate((user) => {
    User.deposit(user, 1000);
  });


  User.prototype.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, (err, isMatch) => {
      if (err) {
        return cb(err);
      }
      return cb(null, isMatch);
    });
  };

  User.exist = async id => !!await User.findByPk(id);

  User.associate = (models) => {
    User.deposit = (id, value) => models.Historic.deposit(id, value);

    User.withdraw = (id, value) => models.Historic.withdraw(id, value);

    User.transfer = (sender, receiver, value) => models.Historic.transfer(sender.id, receiver, value);

    User.belongsToMany(User, {
      as: 'user',
      foreignKey: 'userId',
      through: 'Contact',
    });

    User.belongsToMany(User, {
      as: 'contact',
      foreignKey: 'contactId',
      through: 'Contact',
    });
  };


  return User;
};
