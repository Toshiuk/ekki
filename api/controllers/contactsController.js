const { Contact, User } = require('../models');
const { getToken } = require('../helpers/token');


const listUserContact = async function listUserContact(req, res) {
  const token = getToken(req.headers);
  let response = '';
  if (token) {
    response = await Contact.findAll({
      where: { userId: req.user.dataValues.id },
      include: [
        {
          model: User,
          as: 'contact',
          attributes: ['name', 'phone'],
        },
      ],
    });
  }
  return res.status(201).send(response) || res.status(403).send({ success: false, msg: 'Unauthorized.' });
};

const createContact = async function createContact(req, res) {
  const token = getToken(req.headers);
  let response = '';
  if (token) {
    response = await Contact.add(req.user.dataValues.id, req.body.contactId);
  }
  if (response.success) {
    const userContacts = await Contact.findAll({
      where: { userId: req.user.dataValues.id },
      include: [
        {
          model: User,
          as: 'contact',
          attributes: ['name', 'phone'],
        },
      ],
    });
    req.io.emit('contacts', userContacts);
  }
  return res.status(201).send(response) || res.status(403).send({ success: false, msg: 'Unauthorized.' });
};

const destroyContact = async function destroyContact(req, res) {
  const token = getToken(req.headers);
  let response = '';
  if (token) {
    response = await Contact.destroy(req.user.dataValues.id, req.body.contactId);
  }

  if (response.success) {
    const userContacts = await Contact.findAll({
      where: { userId: req.user.dataValues.id },
      include: [
        {
          model: User,
          as: 'contact',
          attributes: ['name', 'phone'],
        },
      ],
    });
    req.io.emit('contacts', userContacts);
  }
  return res.status(201).send(response) || res.status(403).send({ success: false, msg: 'Unauthorized.' });
};

module.exports = {
  listUserContact,
  createContact,
  destroyContact,
};
