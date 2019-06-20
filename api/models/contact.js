module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {

  }, {});


  Contact.add = async (userId, contactId) => {
    const contact = await Contact.exist(userId, contactId);
    if (contact) {
      return { success: false, msg: 'Contact realation already exist.' };
    }
    return Contact.create({ userId, contactId });
  };

  Contact.destroy = async (userId, contactId) => {
    const contact = await Contact.exist(userId, contactId);
    if (contact) {
      contact.destroy();
      return { success: true, msg: 'Contact deleted.' };
    }
    return { success: false, msg: 'Contact realation does not exist.' };
  };

  Contact.exist = async (userId, contactId) => Contact.findOne({ where: { userId, contactId } });

  Contact.associate = function (models) {
    Contact.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    Contact.belongsTo(models.User, {
      as: 'contact',
      onDelete: 'CASCADE',
    });
  };


  return Contact;
};
