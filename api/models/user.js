

const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
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
      allowNull: false,
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
      cb(null, isMatch);
    });
  };

  User.exist = async function (id) {
    user = await User.findOne({
      where: {
        id,
      },
    });

    return !!user;
  };

  User.associate = function (models) {
    User.deposit = function (id, value) {
      return models.Historic.deposit(id, value);
    };

    User.withdraw = function (id, value) {
      return models.Historic.withdraw(id, value);
    };

    User.transfer = function (sender, receiver, value) {
      return models.Historic.transfer(sender.id, receiver, value);
    };

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
