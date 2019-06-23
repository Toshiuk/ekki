module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {

  }, {});

  Contact.add = async (userId, contactId) => {
    const contact = await Contact.exist(userId, contactId);
    if (contact) {
      return { success: false, msg: 'Contact realation already exist.' };
    }
    await Contact.create({ userId, contactId });
    return { success: true, msg: 'Contact Add.' };
  };

  Contact.destroy = async (userId, contactId) => {
    const contact = await Contact.exist(userId, contactId);
    if (contact) {
      await contact.destroy();
      return { success: true, msg: 'Contact deleted.' };
    }
    return { success: false, msg: 'Contact realation does not exist.' };
  };

  Contact.exist = async (userId, contactId) => Contact.findOne({ where: { userId, contactId } });

  Contact.associate = (models) => {
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
